const test = require("node:test");
const assert = require("node:assert/strict");
const content = require("../learning-path.js");

test("Glossary terms are unique, explained and linked to existing units", () => {
  const ids = new Set(content.units.map(unit => unit.id));
  const names = content.glossary.map(item => item.name.toLocaleLowerCase("de"));
  assert.equal(new Set(names).size, names.length);
  assert.ok(content.glossary.length >= 50);
  for (const item of content.glossary) {
    assert.ok(item.text.length >= 20 && item.text.length <= 260, item.name);
    assert.ok(item.units.length, item.name);
    for (const unitId of item.units) assert.ok(ids.has(unitId), `${item.name} → ${unitId}`);
  }
});

test("Every learning progression and the BPE 7.3 tree terms are covered", () => {
  const covered = new Set(content.glossary.flatMap(item => item.units.map(unitId => unitId.split(".")[0])));
  for (const module of content.modules) assert.ok(covered.has(module.id), module.id);
  const names = content.glossary.map(item => item.name);
  for (const required of ["Anker", "Knoten", "Zeiger", "geordnet", "voll", "vollständig", "Binärbaum", "Bubble Sort", "Selection Sort", "Lineare Suche", "Binäre Suche", "Index"]) assert.ok(names.includes(required), required);
});
