const test = require("node:test");
const assert = require("node:assert/strict");
const ds = require("../ds-model.js");
const shopping = [["K1", "Milch"], ["K2", "Brot"], ["K3", "Käse"]];
const end = trace => trace.steps.at(-1).structure;

test("Linked list insert, delete and wrong pointer order", () => {
  assert.deepEqual(ds.chain(end(ds.listInsert(shopping, "K2", "K4", "Eier"))), ["K1", "K2", "K4", "K3"]);
  assert.deepEqual(ds.chain(end(ds.listInsert(shopping, null, "K0", "Leergut"))), ["K0", "K1", "K2", "K3"]);
  assert.deepEqual(ds.chain(end(ds.listInsert(shopping, "K3", "K9", "Tee"))), ["K1", "K2", "K3", "K9"]);
  assert.deepEqual(ds.chain(end(ds.listInsertWrong(shopping, "K1", "K4", "Eier"))), ["K1", "K4"]);
  assert.deepEqual(ds.chain(end(ds.listDelete(shopping, "K1"))), ["K2", "K3"]);
  assert.deepEqual(ds.chain(end(ds.listDelete(shopping, "K2"))), ["K1", "K3"]);
  assert.deepEqual(ds.chain(end(ds.listDelete([["K1", "x"]], "K1"))), []);
});

test("Stack and queue follow LIFO and FIFO", () => {
  const keys = [..."Alh", "⌫", ..."gh", "⌫", ..."oryh", "⌫", "⌫", ..."itmh", "⌫", "⌫", ..."hmig", "⌫", "k"];
  assert.equal(end(ds.typing(keys)).items.join(""), "Algorithmik");
  assert.deepEqual(end(ds.stack(["X"], [["pop"], ["pop"]])).out, ["X"]);
  const taxis = end(ds.queue(["T085", "T432"], [["enqueue", "T021"], ["enqueue", "T099"], ["dequeue"], ["dequeue"], ["dequeue"], ["enqueue", "T123"], ["dequeue"], ["enqueue", "T525"], ["enqueue", "T456"]]));
  assert.deepEqual(taxis.items, ["T123", "T525", "T456"]);
  assert.deepEqual(taxis.out, ["T085", "T432", "T021", "T099"]);
});

test("Tree analysis matches the material's definitions", () => {
  const table = rows => ds.analyseTree(ds.fromTable(rows));
  const home = table([{ inhalt: "Home", links: 1, rechts: 2 }, { inhalt: "Schule", links: null, rechts: null }, { inhalt: "Privat", links: 3, rechts: 4 }, { inhalt: "Bilder", links: null, rechts: null }, { inhalt: "Videos", links: null, rechts: null }]);
  assert.deepEqual([home.binary, home.full, home.complete, home.height], [true, true, false, 3]);
  assert.deepEqual(home.leaves, ["Schule", "Bilder", "Videos"]);
  const bst = table([{ inhalt: 50, links: 1, rechts: 2 }, { inhalt: 30, links: 3, rechts: 4 }, { inhalt: 70, links: 5, rechts: 6 }, { inhalt: 20, links: null, rechts: null }, { inhalt: 40, links: null, rechts: null }, { inhalt: 60, links: null, rechts: null }, { inhalt: 80, links: null, rechts: null }]);
  assert.deepEqual([bst.binary, bst.full, bst.complete, bst.sorted], [true, true, true, true]);
  const single = table([{ inhalt: 2, links: 1, rechts: 2 }, { inhalt: 1, links: null, rechts: null }, { inhalt: 5, links: null, rechts: 3 }, { inhalt: 7, links: null, rechts: null }]);
  assert.deepEqual([single.full, single.complete, single.sorted], [false, false, true]);
  const general = ds.analyseTree({ inhalt: "M", kinder: [{ inhalt: "A", kinder: [] }, { inhalt: "B", kinder: [] }, { inhalt: "C", kinder: [] }] });
  assert.equal(general.binary, false); assert.match(general.reasons.binary, /3 Kinder/);
});
