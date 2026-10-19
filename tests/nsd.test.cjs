const test = require("node:test");
const assert = require("node:assert/strict");
const content = require("../learning-path.js");

const texts = blocks => blocks.flatMap(block => [block.s || block.loop || block.if, ...texts(block.body || []), ...texts(block.yes || []), ...texts(block.no || [])]);
const operator = /^((Zuweisung|Deklaration und Initialisierung|Aufruf|Ausgabe|Rückgabe|Einlesen): |Wiederhole (solange|von) )/;

test("Example Struktogramme use the operator list notation", () => {
  const diagrams = content.units.flatMap(unit => (unit.examples || []).filter(example => example.nsd).map(example => [unit.id, example.nsd]));
  assert.ok(diagrams.length >= 3);
  for (const [unitId, nsd] of diagrams) {
    assert.ok(nsd.title, unitId);
    for (const block of nsd.blocks) assert.ok(block.s || block.loop || block.if, unitId);
    for (const text of texts(nsd.blocks)) assert.ok(operator.test(text) || /[<>=!]=?/.test(text), `${unitId}: ${text}`);
  }
});
