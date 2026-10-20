const test = require("node:test");
const assert = require("node:assert/strict");
const practice = require("../practice.js");
const content = require("../learning-path.js");
const engine = require("../progress.js")(content);

const operator = /^((Zuweisung|Deklaration und Initialisierung|Deklaration und Einlesen|Aufruf|Ausgabe|Rückgabe|Einlesen): |Wiederhole (solange|von) |Wenn )/;
const gapsIn = blocks => blocks.flatMap(block => [block.s, block.loop, block.if].filter(value => value && typeof value === "object").map(value => value.slot).concat(gapsIn(block.body || []), gapsIn(block.yes || []), gapsIn(block.no || [])));
const textsIn = blocks => blocks.flatMap(block => [block.s, block.loop, block.if].filter(value => typeof value === "string").concat(textsIn(block.body || []), textsIn(block.yes || []), textsIn(block.no || [])));

test("Every training item is consistent: one gap per slot, answers among the options", () => {
  const ids = new Set(content.units.map(unit => unit.id));
  assert.equal(new Set(practice.structograms.map(item => item.id)).size, practice.structograms.length);
  for (const item of practice.structograms) {
    assert.ok(ids.has(item.unit) && practice.levels.includes(item.level) && practice.topics.includes(item.topic), item.id);
    assert.ok(item.instructions.length >= 3, item.id);
    if (item.type === "order") continue;
    const gaps = gapsIn(item.diagram.blocks);
    assert.deepEqual([...gaps].sort(), Object.keys(item.slots).sort(), item.id);
    for (const [id, slot] of Object.entries(item.slots)) {
      assert.ok(slot.options.includes(slot.answer), `${item.id}/${id}`);
      assert.equal(new Set(slot.options).size, slot.options.length, `${item.id}/${id}`);
      assert.ok(slot.options.length >= 3 && slot.hint, `${item.id}/${id}`);
    }
  }
});

test("Struktogramm texts and options follow the Baden-Württemberg operator list", () => {
  for (const item of practice.structograms) {
    const texts = item.type === "order" ? item.blocks.map(block => block.text) : [...textsIn(item.diagram.blocks), ...Object.values(item.slots).flatMap(slot => slot.options)];
    for (const text of texts) assert.ok(operator.test(text) || /[<>=!]=?/.test(text), `${item.id}: ${text}`);
  }
});

test("Checking marks right, wrong and empty gaps and only passes when everything is right", () => {
  const item = practice.structograms.find(entry => entry.id === "nsd-bubble");
  const right = Object.fromEntries(Object.entries(item.slots).map(([id, slot]) => [id, slot.answer]));
  assert.deepEqual(practice.checkStructogram(item, { answers: right }), { passed: true, slots: { innen: "right", vergleich: "right" } });
  const wrong = practice.checkStructogram(item, { answers: { innen: right.innen, vergleich: "zahlen[j] < zahlen[j + 1]" } });
  assert.equal(wrong.passed, false); assert.equal(wrong.slots.vergleich, "wrong");
  assert.deepEqual(practice.checkStructogram(item, {}).slots, { innen: "empty", vergleich: "empty" });
  for (const entry of practice.structograms.filter(entry => entry.type === "slots")) {
    const answers = Object.fromEntries(Object.entries(entry.slots).map(([id, slot]) => [id, slot.answer]));
    assert.equal(practice.checkStructogram(entry, { answers }).passed, true, entry.id);
  }
});

test("Ordering accepts any order inside a group but not a wrong sequence; the start order is not solved", () => {
  const item = practice.structograms.find(entry => entry.type === "order");
  assert.equal(practice.checkStructogram(item, {}).passed, false, "Ausgangsreihenfolge darf nicht schon stimmen");
  assert.equal(practice.checkStructogram(item, { order: ["antrieb", "hubraum", "co2ein", "einheiten", "grund", "co2", "ausgabe"] }).passed, true);
  assert.equal(practice.checkStructogram(item, { order: ["co2ein", "antrieb", "hubraum", "einheiten", "grund", "co2", "ausgabe"] }).passed, true);
  assert.equal(practice.checkStructogram(item, { order: ["antrieb", "hubraum", "einheiten", "co2ein", "grund", "co2", "ausgabe"] }).passed, false);
  assert.equal(practice.checkStructogram(item, { order: ["antrieb", "hubraum", "co2ein", "einheiten", "co2", "grund", "ausgabe"] }).passed, false);
  assert.equal(practice.orderCorrect(item.expected, ["antrieb"]), false);
});

test("Solved Struktogramm trainings are stored like programming exercises", () => {
  const state = engine.empty();
  assert.equal(engine.completePractice(state, "nsd-binaer", true), true);
  assert.equal(engine.savePracticeDraft(state, "nsd-binaer", JSON.stringify({ answers: { mitte: "x" } })), true);
  const restored = engine.readPayload(JSON.parse(JSON.stringify(engine.payload(state))));
  assert.equal(restored.practice.solved["nsd-binaer"], true);
  assert.match(restored.practice.drafts["nsd-binaer"], /mitte/);
});
