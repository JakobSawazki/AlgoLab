const test = require("node:test");
const assert = require("node:assert/strict");
const trace = require("../analysis-model.js");
test("Training trace accumulates each value once and divides only at the end", () => {
  const steps = trace([18, 42, 0, 30, 12, 24]);
  assert.deepEqual(steps.slice(1, -1).map(s => s.sum), [18, 60, 60, 90, 102, 126]);
  assert.deepEqual(steps.slice(1, -1).map(s => s.min), [18, 18, 0, 0, 0, 0]);
  assert.deepEqual(steps.slice(1, -1).map(s => s.max), [18, 42, 42, 42, 42, 42]);
  assert.equal(steps.slice(0, -1).every(s => s.average === null), true);
  assert.equal(steps.at(-1).average, 21); assert.equal(steps.at(-1).done, true);
});
test("Analysis trace covers negative values, equal values and singleton without mutating inputs", () => {
  const negative = [-8, -3, -11, -3], copy = negative.slice();
  const result = trace(negative).at(-1);
  assert.deepEqual([result.min, result.max, result.average], [-11, -3, -6.25]);
  assert.deepEqual(negative, copy);
  for (const values of [[9, 9, 9], [6], [0, 0]]) {
    const last = trace(values).at(-1);
    assert.deepEqual([last.min, last.max, last.average], [values[0], values[0], values[0]]);
  }
});
test("Empty input stops before index access and does not invent an average", () => {
  const steps = trace([]);
  assert.equal(steps.length, 1); assert.equal(steps[0].done, true);
  assert.deepEqual([steps[0].min, steps[0].max, steps[0].average], [null, null, null]);
});
