const test = require("node:test");
const assert = require("node:assert/strict");
const content = require("../learning-path.js");

test("Each class has its own results document with a valid https link", () => {
  const docs = content.resultDocuments();
  assert.deepEqual(docs.map(doc => doc.label), ["J2 INF1", "J2 INF2"]);
  for (const doc of docs) assert.match(doc.url, /^https:\/\/1drv\.ms\/w\//, doc.label);
  assert.notEqual(docs[0].url, docs[1].url);
});

test("The profile class selects the matching results document", () => {
  const labels = className => content.resultDocuments(className).map(doc => doc.label);
  assert.deepEqual(labels("J2 INF1"), ["J2 INF1"]);
  assert.deepEqual(labels("j2 inf 2"), ["J2 INF2"]);
  assert.deepEqual(labels("J2-INF2"), ["J2 INF2"]);
  for (const className of ["", "WGW J2", "J2 INF12", "INF1 INF2"]) assert.deepEqual(labels(className), ["J2 INF1", "J2 INF2"], className);
});

test("Results documents without a valid https link stay hidden", () => {
  const saved = content.results.documents.map(doc => doc.url);
  try {
    for (const url of ["", "kein Link", "http://example.org/doc", "javascript:alert(1)"]) {
      content.results.documents[0].url = url;
      assert.deepEqual(content.resultDocuments().map(doc => doc.label), ["J2 INF2"], url);
      assert.deepEqual(content.resultDocuments("J2 INF1").map(doc => doc.label), ["J2 INF2"], url);
    }
    content.results.documents.forEach(doc => { doc.url = ""; });
    assert.deepEqual(content.resultDocuments("J2 INF1"), []);
  } finally { content.results.documents.forEach((doc, index) => { doc.url = saved[index]; }); }
});

test("Each unit names its sections in the shared results document", () => {
  const byId = id => content.units.find(unit => unit.id === id);
  assert.deepEqual(content.resultSections(byId("L1.3")), ["Lernfortschritt 1 → Aufgabe 3.1.1", "Lernfortschritt 1 → Aufgabe 3.1.2"]);
  assert.deepEqual(content.resultSections(byId("L1.5")), ["Lernfortschritt 1 → Aufgabe 3.4"]);
  for (const unit of content.units) assert.ok(content.resultSections(unit).length > 0, unit.id);
  assert.deepEqual(content.resultSections(byId("L2.1")), ["Lernfortschritt 2 → Aufgabe 1"]);
  assert.deepEqual(content.resultSections(byId("L3.4")), ["Lernfortschritt 3 → Aufgabe 4.1", "Lernfortschritt 3 → Aufgabe 4.2"]);
});

test("Section hints are unique across all learning progressions", () => {
  const all = content.units.flatMap(unit => content.resultSections(unit));
  assert.equal(new Set(all).size, all.length);
});
