const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require(process.env.ALGOLAB_PLAYWRIGHT_MODULE || "playwright");

const base = process.env.ALGOLAB_TEST_URL || "http://127.0.0.1:4175/";
const artifacts = path.join(__dirname, "../../.tmp/storage-tabs");
fs.mkdirSync(artifacts, { recursive: true });

async function storedState(page) {
  return page.evaluate(() => JSON.parse(localStorage.getItem("algolab-v1")));
}

async function exportTab(page) {
  const waiting = page.waitForEvent("download");
  await page.keyboard.press("Alt+s");
  const download = await waiting;
  return JSON.parse(fs.readFileSync(await download.path(), "utf8"));
}

async function closeNotebook(page) {
  await page.locator("#notebook-dialog form button").click();
}

async function sketchLine(page) {
  await page.locator('[data-notebook-view="sketch"]').click();
  const bounds = await page.locator("#notebook-canvas").boundingBox();
  const y = bounds.y + bounds.height * 0.5;
  await page.mouse.move(bounds.x + bounds.width * 0.2, y);
  await page.mouse.down();
  await page.mouse.move(bounds.x + bounds.width * 0.8, y, { steps: 8 });
  await page.mouse.up();
}

async function verifyConflict(browser, width) {
  const context = await browser.newContext({
    viewport: { width, height: 900 },
    acceptDownloads: true
  });
  try {
    const first = await context.newPage();
    const second = await context.newPage();
    const errors = [];
    let acceptReload = false;
    for (const page of [first, second]) {
      page.on("pageerror", error => errors.push(error.message));
    }
    second.on("dialog", dialog => acceptReload ? dialog.accept() : dialog.dismiss());
    await first.goto(base);
    await second.goto(base);

    await first.evaluate(() => localStorage.setItem("algolab-theme-v1", "light"));
    await second.waitForTimeout(100);
    assert.equal(await second.locator("#storage-warning").isVisible(), false);

    await first.locator("#notebook-open").click();
    await first.locator("#notebook-text").fill("Notiz aus Tab A");
    await sketchLine(first);
    await closeNotebook(first);
    await second.locator("#storage-warning").waitFor();

    await second.locator("#notebook-open").click();
    await second.locator("#notebook-text").fill("Lokale Idee in Tab B");
    await second.locator("#notebook-status").filter({ hasText: "Im Tab verfügbar" }).waitFor();
    await closeNotebook(second);
    assert.equal((await storedState(second)).study.notes.general.text, "Notiz aus Tab A");
    assert.equal((await exportTab(second)).state.study.notes.general.text, "Lokale Idee in Tab B");
    await second.locator("#storage-warning").screenshot({
      path: path.join(artifacts, "conflict-" + width + ".png")
    });

    await second.locator("#storage-reload").click();
    assert.equal((await exportTab(second)).state.study.notes.general.text, "Lokale Idee in Tab B");
    acceptReload = true;
    await second.locator("#storage-reload").click();
    assert.equal(await second.locator("#storage-warning").isVisible(), false);
    await second.locator("#notebook-open").click();
    assert.equal(await second.locator("#notebook-text").inputValue(), "Notiz aus Tab A");
    await second.locator('[data-notebook-view="sketch"]').click();
    const alpha = await second.locator("#notebook-canvas").evaluate(canvas =>
      canvas.getContext("2d").getImageData(450, 270, 1, 1).data[3]
    );
    assert.ok(alpha);

    await second.locator('[data-notebook-view="text"]').click();
    await second.locator("#notebook-text").fill("Tab B nach bewusstem Laden");
    await closeNotebook(second);
    const latest = await storedState(second);
    assert.equal(latest.study.notes.general.text, "Tab B nach bewusstem Laden");
    assert.equal(latest.study.notes.general.strokes.length, 1);

    await first.locator("#storage-warning").waitFor();
    await first.locator("#notebook-open").click();
    await first.locator("#notebook-text").fill("Eigener Entwurf A");
    await closeNotebook(first);
    assert.equal((await exportTab(first)).state.study.notes.general.text, "Eigener Entwurf A");
    assert.equal((await storedState(first)).study.notes.general.text, "Tab B nach bewusstem Laden");

    await first.evaluate(() => localStorage.setItem("algolab-v1", "{kaputt"));
    await second.locator("#storage-warning").waitFor();
    await second.locator("#storage-reload").click();
    await second.locator("#storage-warning-message").filter({
      hasText: "konnte nicht geladen"
    }).waitFor();
    assert.equal((await exportTab(second)).state.study.notes.general.text, "Tab B nach bewusstem Laden");

    await first.evaluate(() => localStorage.removeItem("algolab-v1"));
    await second.locator("#storage-reload").click();
    await second.locator("#storage-warning-message").filter({ hasText: "entfernt" }).waitFor();
    assert.equal((await exportTab(second)).state.study.notes.general.strokes.length, 1);
    assert.equal(await second.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    assert.deepEqual(errors, []);
    console.log(width + "px: conflict, separate backups, cancel, reload, drawing and damaged storage passed.");
  } finally {
    await context.close();
  }
}

async function verifyDelayedEvent(browser) {
  const context = await browser.newContext();
  try {
    const first = await context.newPage();
    const second = await context.newPage();
    // Model a save made before the other tab's storage event has been delivered.
    await second.addInitScript(() =>
      window.addEventListener("storage", event => event.stopImmediatePropagation())
    );
    await first.goto(base);
    await second.goto(base);
    await first.locator("#notebook-open").click();
    await first.locator("#notebook-text").fill("Neuester Stand");
    assert.equal(await second.locator("#storage-warning").isVisible(), false);
    await second.locator("#notebook-open").click();
    await second.locator("#notebook-text").fill("Verspäteter Tab");
    assert.equal((await storedState(second)).study.notes.general.text, "Neuester Stand");
    await closeNotebook(second);
    await second.locator("#storage-warning").waitFor();
    console.log("Save comparison before storage event delivery passed.");
  } finally {
    await context.close();
  }
}

(async () => {
  const options = {};
  if (process.env.ALGOLAB_BROWSER) options.channel = process.env.ALGOLAB_BROWSER;
  const browser = await chromium.launch(options);
  try {
    for (const width of [1365, 375]) await verifyConflict(browser, width);
    await verifyDelayedEvent(browser);
  } finally {
    await browser.close();
  }
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
