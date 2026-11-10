const test = require("node:test");
const assert = require("node:assert/strict");
const content = require("../learning-path.js");
const engine = require("../progress.js")(content);

const marker = { block: "abc:0", start: 0, end: 6, quote: "Stapel", color: "mint" };
const stroke = { tool: "pen", color: "#235fa1", width: 7, points: [[30, 100], [400, 200]] };

test("Notebook pages and highlights survive a JSON backup without changing learning points", () => {
  const state = engine.empty();
  state.study = {
    highlights: { home: [marker], "unit/L1.1": [{ ...marker, color: "yellow" }] },
    notes: { general: { text: "Merksatz", strokes: [] }, "L1.1": { text: "Skizze", strokes: [stroke] } }
  };
  const backup = JSON.parse(JSON.stringify(engine.payload(state)));
  const restored = engine.readPayload(backup);
  assert.equal(backup.formatVersion, 1);
  assert.deepEqual(restored.study, state.study);
  assert.equal(engine.total(restored), 0);
});

test("Imported study data keeps valid entries and rejects invalid anchors, strokes and page keys", () => {
  const backup = engine.payload(engine.empty());
  backup.state.study = {
    highlights: {
      "unit/L1.1": [marker, { ...marker, color: "url(evil)" }, { ...marker, start: -1 }, { ...marker, end: 5 }],
      "unit/unknown": [marker]
    },
    notes: {
      general: { text: "A", strokes: [stroke, { ...stroke, points: [[1001, 1]] }, { ...stroke, tool: "image" }] },
      unknown: { text: "B", strokes: [] }
    }
  };
  assert.deepEqual(engine.readPayload(backup).study, {
    highlights: { "unit/L1.1": [marker] },
    notes: { general: { text: "A", strokes: [stroke] } }
  });
});
