const test = require("node:test");
const assert = require("node:assert/strict");
const content = require("../learning-path.js");
const { buildIndex, search } = require("../site-search.js");
const index = buildIndex(content);

test("The search indexes public summaries and links for all five content types", () => {
  const count = group => index.filter(item => item.group === group).length;
  assert.equal(count("unit"), content.units.length);
  assert.equal(count("glossary"), content.glossary.length);
  assert.equal(count("python"), content.practice.exercises.length);
  assert.equal(count("structogram"), content.practice.structograms.length);
  assert.equal(count("exam"), content.exam.exams.length);
  assert.equal(new Set(index.map(item => item.href)).size, index.length);
  assert.ok(index.every(item => item.href.startsWith("#") && !Object.hasOwn(item, "starter") && !Object.hasOwn(item, "tasks")));
});

test("Unit codes, umlaut variants, aliases and combined terms find the expected first result", () => {
  for (const [query, href] of [
    ["L2.6", "#unit/L2.6"],
    ["Binäre Suche", "#unit/L2.6"],
    ["suche BINAERE", "#unit/L2.6"],
    ["Queue", "#glossar/Warteschlange"],
    ["teamnummer", "#programmieren/fehler-teamposition"],
    ["struktogramm tauschen", "#struktogramme/nsd-tauschen"],
    ["uebungsklausur b", "#klausur/sortieren"]
  ]) assert.equal(search(index, query)[0]?.href, href, query);
});

test("A content filter narrows results and blank or unmatched queries return none", () => {
  const results = search(index, "binaere suche", "structogram");
  assert.deepEqual(results.map(item => item.href), ["#struktogramme/nsd-binaer"]);
  assert.deepEqual(search(index, ""), []);
  assert.deepEqual(search(index, "<>&"), []);
  assert.deepEqual(search(index, "unmoegliches-stichwort"), []);
});
