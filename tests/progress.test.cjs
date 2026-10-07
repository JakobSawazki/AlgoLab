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
test("Locked units cannot earn points or complete", () => {
  const state = engine.empty(); solve(state, "L1.1"); engine.finish(state, "L1.1");
  assert.equal(engine.answer(state, "L1.3", "fake", 0), false);
  assert.equal(engine.finish(state, "L1.3"), false);
});

test("Both L1.3 programs and both checks are required before L1.4 unlocks", () => {
  const state = engine.empty(); solve(state, "L1.1"); engine.finish(state, "L1.1");
  solve(state, "L1.2"); engine.completeCode(state, "L1.2", "teamcode", true); engine.finish(state, "L1.2");
  solve(state, "L1.3");
  assert.equal(engine.earned(state, "L1.3"), 40);
  engine.completeCode(state, "L1.3", "platzcode", true);
  assert.equal(engine.finish(state, "L1.3"), false);
  engine.completeCode(state, "L1.3", "kadercode", true);
  assert.equal(engine.unlocked(state, "L1.4"), false);
  state.work["L1.3"] = { kadercode: "def zeige_liste(namen): pass", schleifentest: "0, 1, 2" };
  assert.equal(engine.finish(state, "L1.3"), true);
  assert.equal(engine.unlocked(state, "L1.4"), true);
  assert.deepEqual(engine.normalize(state), state);
  assert.equal(engine.total(state), 300);
});

test("L1.2 requires correct code as well as all three checks; drafts survive restore", () => {
  const state = engine.empty();
  assert.equal(engine.completeCode(state, "L1.2", "teamcode", true), false);
  solve(state, "L1.1"); engine.finish(state, "L1.1");
  const unit = engine.byId("L1.2");
  for (const task of unit.tasks.filter(task => task.type !== "code")) engine.answer(state, unit.id, task.id, task.correct);
  assert.equal(engine.earned(state, "L1.2"), 60);
  assert.equal(engine.finish(state, "L1.2"), false);
  assert.equal(engine.completeCode(state, "L1.2", "teamcode", false), false);
  assert.equal(engine.completeCode(state, "L1.2", "teamcode", true), true);
  assert.equal(engine.completeCode(state, "L1.2", "teamcode", true), true);
  assert.equal(engine.earned(state, "L1.2"), 100);
  assert.equal(engine.unlocked(state, "L1.3"), false);
  state.work = { "L1.1": { definition: "Meine Erklärung" }, "L1.2": { teamcode: "punkte = [12, 11, 15, 9, 7]" } };
  assert.equal(engine.finish(state, "L1.2"), true);
  assert.equal(engine.unlocked(state, "L1.3"), true);
  assert.deepEqual(engine.normalize(JSON.parse(JSON.stringify(state))), state);
  assert.equal(engine.total(state), 200);
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
