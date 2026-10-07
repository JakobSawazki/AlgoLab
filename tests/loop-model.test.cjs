const test = require("node:test");
const assert = require("node:assert/strict");
const trace = require("../loop-model.js");
test("Loop trace visits each valid index once, then ends before the length", () => {
  const names = ["Mila", "Jonas", "Sam"];
  const steps = trace(names);
  assert.deepEqual(steps.map(s => s.index), [null, 0, 1, 2, null]);
  assert.deepEqual(steps.map(s => s.output), [[], ["Mila"], ["Mila", "Jonas"], names, names]);
  assert.equal(steps.at(-1).done, true);
  steps.at(-1).output.push("Changed"); assert.equal(names.length, 3);
});
test("Empty and singleton traces do not invent an index at the upper bound", () => {
  assert.deepEqual(trace([]).map(s => s.index), [null, null]);
  assert.deepEqual(trace([]).at(-1).output, []);
  assert.deepEqual(trace(["Solo"]).map(s => s.index), [null, 0, null]);
});
