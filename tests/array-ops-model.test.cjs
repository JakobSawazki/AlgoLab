const test = require("node:test");
const assert = require("node:assert/strict");
const models = require("../array-ops-model.js");
const last = trace => trace.steps.at(-1);

test("Swap keeps both values; swapping without helper loses one", () => {
  assert.deepEqual(last(models.swap(["A", "B", "C", "D"], 1, 3)).values, ["A", "D", "C", "B"]);
  assert.deepEqual(last(models.swapWithoutHelper(["A", "B", "C", "D"], 1, 3)).values, ["A", "B", "C", "B"]);
});
test("Insert and remove keep the order of all other elements", () => {
  assert.deepEqual(last(models.insert(["M", "S", "F", "K"], "E", 2)).values, ["M", "S", "E", "F", "K"]);
  assert.deepEqual(last(models.insert(["B", "C"], "A", 0)).values, ["A", "B", "C"]);
  assert.deepEqual(last(models.insert(["A", "B"], "C", 2)).values, ["A", "B", "C"]);
  assert.deepEqual(last(models.remove(["M", "S", "E", "F", "K"], 1)).values, ["M", "E", "F", "K"]);
  assert.deepEqual(last(models.remove(["A", "B", "C"], 2)).values, ["A", "B"]);
});
test("Reverse, sorting and search models reach correct results", () => {
  assert.deepEqual(last(models.reverse([3, 8, 1, 9, 4])).values, [4, 9, 1, 8, 3]);
  const data = [7, 3, 9, 1, 5, 3];
  assert.deepEqual(last(models.bubbleSort(data)).values, [1, 3, 3, 5, 7, 9]);
  assert.deepEqual(last(models.selectionSort(data)).values, [1, 3, 3, 5, 7, 9]);
  assert.deepEqual(last(models.selectionSortDescending(data)).values, [9, 7, 5, 3, 3, 1]);
  assert.equal(last(models.linearSearch(data, 1)).marks[3], "done");
  assert.match(last(models.linearSearch(data, 4)).explanation, /nicht vor/);
  const sorted = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
  for (const [index, value] of sorted.entries()) assert.equal(last(models.binarySearch(sorted, value)).marks[index], "done", String(value));
  assert.match(last(models.binarySearch(sorted, 40)).explanation, /nicht vor/);
});
test("Every step ends exactly once and points to an existing code line", () => {
  const traces = [models.swap([1, 2], 0, 1), models.insert([1], 2, 0), models.remove([1, 2], 0), models.bubbleSort([3, 2, 1]), models.selectionSort([3, 1, 2]), models.linearSearch([1, 2], 2), models.linearSearchAll([1, 2, 1], 1), models.countOccurrences([1, 2, 1], 1), models.bubbleSortOptimized([2, 1, 3]), models.selectionSortDescending([1, 3, 2]), models.binarySearch([1, 2, 3], 3), models.binarySearch([1, 2, 3], 4), models.reverse([1, 2, 3])];
  for (const trace of traces) {
    assert.equal(trace.steps.filter(step => step.done).length, 1);
    assert.equal(trace.steps.at(-1).done, true);
    for (const step of trace.steps) assert.ok(step.line === null || (step.line >= 0 && step.line < trace.code.length));
  }
});
test("Counting visits every element and reports the number of hits", () => {
  const trace = models.countOccurrences([60, 20, 1, 60, 40, 60, 20], 60);
  assert.deepEqual(trace.steps.at(-1).vars, [["anzahl", 3]]);
  assert.equal(trace.steps.length, 9);
  assert.equal(last(models.bubbleSortOptimized([10, 1, 2, 3, 4, 5, 6, 7, 8, 9])).vars[0][1], 2);
});

test("Every model has a Struktogramm whose blocks cover all highlighted code lines", () => {
  const samples = { swap: [[1, 2, 3], 0, 2], swapWithoutHelper: [[1, 2], 0, 1], insert: [[1, 2, 3], 9, 1], remove: [[1, 2, 3], 1], reverse: [[1, 2, 3, 4]], bubbleSort: [[3, 1, 2]], bubbleSortOptimized: [[3, 1, 2]], selectionSort: [[3, 1, 2]], selectionSortDescending: [[1, 3, 2]], linearSearch: [[4, 5, 6], 6], linearSearchAll: [[4, 5, 4], 4], binarySearch: [[1, 3, 5, 7, 9], 7], countOccurrences: [[1, 2, 1], 1] };
  const lines = blocks => blocks.flatMap(block => [...(block.l || []), ...lines(block.body || []), ...lines(block.yes || []), ...lines(block.no || [])]);
  for (const [name, args] of Object.entries(samples)) {
    const trace = models[name](...args);
    assert.ok(trace.nsd && trace.nsd.title && trace.nsd.blocks.length, name);
    const covered = new Set(lines(trace.nsd.blocks));
    for (const line of covered) assert.ok(line >= 0 && line < trace.code.length, `${name}: Zeile ${line}`);
    for (const step of trace.steps) if (step.line !== null) assert.ok(covered.has(step.line), `${name}: Schritt mit Zeile ${step.line} ohne Block`);
  }
  for (const binary of [models.binarySearch([1, 3, 5, 7, 9], 1), models.binarySearch([1, 3, 5], 4)]) {
    const covered = new Set(lines(binary.nsd.blocks));
    for (const step of binary.steps) if (step.line !== null) assert.ok(covered.has(step.line));
  }
});

test("Struktogramm texts follow the Baden-Württemberg operator list", () => {
  const texts = blocks => blocks.flatMap(block => [block.s || block.loop || block.if, ...texts(block.body || []), ...texts(block.yes || []), ...texts(block.no || [])]);
  for (const [name, build] of Object.entries(models.diagrams)) {
    for (const text of texts(build().blocks)) {
      assert.ok(/^((Zuweisung|Deklaration und Initialisierung|Aufruf): |Wiederhole (solange|von) )/.test(text) || !/^(Zuweisung|Deklaration|Aufruf|Wiederhole)/.test(text) && /[<>=!]=?|AND/.test(text), `${name}: ${text}`);
    }
  }
});
