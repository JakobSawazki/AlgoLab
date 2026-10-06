const test = require("node:test");
const assert = require("node:assert/strict");
const content = require("../learning-path.js");
const createEngine = require("../progress.js");
const engine = createEngine(content);
function solve(state, id) { const unit = engine.byId(id); for (const task of unit.tasks) engine.answer(state, id, task.id, task.correct); }

test("Developer access opens every valid unit without changing progress or completion rules", () => {
  const state = engine.empty();
  const before = JSON.stringify(state);
  for (const unit of content.units) assert.equal(engine.accessible(state, unit.id, true), true);
  assert.equal(engine.accessible(state, "missing", true), false);
  assert.equal(JSON.stringify(state), before);
  assert.equal(engine.total(state), 0);
  assert.equal(engine.finish(state, "L3.4"), false);
  assert.equal(engine.accessible(state, "L3.4", false), false);
  assert.equal(engine.accessible(state, "L1.1", false), true);
  assert.deepEqual(engine.normalize({ ...state, developerMode: true }).completed, []);
});

test("A new learner can access only L1.1, including direct routes", () => {
  const state = engine.empty();
  assert.equal(engine.unlocked(state, "L1.1"), true);
  for (const unit of content.units.slice(1)) assert.equal(engine.unlocked(state, unit.id), false);
  assert.equal(engine.unlocked(state, "missing"), false);
});
test("Wrong answers and partial points do not unlock another unit", () => {
  const state = engine.empty();
  engine.answer(state, "L1.1", "struktur", 1);
  assert.equal(engine.total(state), 0);
  engine.answer(state, "L1.1", "struktur", 0);
  assert.equal(engine.total(state), 25);
  assert.equal(engine.finish(state, "L1.1"), false);
  assert.equal(engine.unlocked(state, "L1.2"), false);
});
test("All points plus explicit completion unlock exactly the next unit", () => {
  const state = engine.empty(); solve(state, "L1.1");
  assert.equal(engine.total(state), 100);
  assert.equal(engine.unlocked(state, "L1.2"), false);
  assert.equal(engine.finish(state, "L1.1"), true);
  assert.equal(engine.unlocked(state, "L1.2"), true);
  assert.equal(engine.unlocked(state, "L1.3"), false);
  assert.equal(engine.finish(state, "L1.1"), false);
  solve(state, "L1.1"); assert.equal(engine.total(state), 100);
});
test("Preparation units cannot earn points or complete", () => {
  const state = engine.empty(); solve(state, "L1.1"); engine.finish(state, "L1.1");
  assert.equal(engine.answer(state, "L1.2", "fake", 0), false);
  assert.equal(engine.finish(state, "L1.2"), false);
});
test("Restore derives points and rejects unknown or disconnected completions", () => {
  const state = engine.empty(); solve(state, "L1.1"); engine.finish(state, "L1.1");
  assert.deepEqual(engine.normalize(JSON.parse(JSON.stringify(state))), state);
  const forged = engine.normalize({ xp: 99999, completed: ["L1.1", "L1.2", "L2.1", "unknown"], answers: { "L1.1": { struktur: -1 }, "L2.1": { fake: 0 } } });
  assert.deepEqual(forged.completed, []); assert.equal(engine.total(forged), 0);
  assert.equal(engine.unlocked(forged, "L2.1"), false);
});
test("Progression carries across all module boundaries without spending points", () => {
  // Test the full chain using executable fixtures, without enabling unfinished app content.
  const fixture = { units: content.units.map(unit => ({ ...unit, ready: true, tasks: [{ id: "check", points: 100, options: ["yes", "no"], correct: 0 }] })) };
  const chain = createEngine(fixture); const state = chain.empty();
  fixture.units.forEach((unit, index) => {
    assert.equal(chain.unlocked(state, unit.id), true);
    if (fixture.units[index + 1]) assert.equal(chain.unlocked(state, fixture.units[index + 1].id), false);
    chain.answer(state, unit.id, "check", 0); chain.finish(state, unit.id);
    assert.equal(chain.total(state), (index + 1) * 100);
  });
  assert.equal(chain.total(state), 1900);
});
