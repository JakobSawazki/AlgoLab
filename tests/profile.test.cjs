const test = require("node:test");
const assert = require("node:assert/strict");
const content = require("../learning-path.js");
const engine = require("../progress.js")(content);
const nagold = require("../nagold.js")(content);
const row = (changes = {}) => ({ date: "2026-10-19", time: "10:30", purpose: "Mitarbeit", points: 3, ...changes });

test("Complete profile JSON roundtrip preserves NAGOLD, negative points, code and reflections", () => {
  const state = engine.empty();
  state.profile = { name: "jak.saw", className: "WGW J2" };
  state.nagoldEntries = [row(), row({ purpose: "Korrektur", points: -10 })];
  state.work = { "L1.1": { definition: "Meine Erklärung" }, "L1.2": { teamcode: "print('Entwurf')" } };
  assert.deepEqual(engine.readPayload(JSON.parse(JSON.stringify(engine.payload(state)))), state);
  assert.equal(nagold.total(state), -7);
  assert.equal(engine.total(state), 0);
  assert.equal(engine.unlocked(state, "L1.2"), false);
});

test("Old AlgoLab exports migrate completed lessons once without invented dates", () => {
  const state = engine.empty();
  for (const task of content.units[0].tasks) engine.answer(state, "L1.1", task.id, task.correct);
  engine.finish(state, "L1.1");
  delete state.profile; delete state.nagoldEntries;
  const restored = engine.readPayload({ app: "AlgoLab", formatVersion: 1, state });
  assert.equal(restored.nagoldEntries.length, 1);
  assert.equal(restored.nagoldEntries[0].date, "");
  assert.equal(restored.nagoldEntries[0].lessonId, "L1.1");
  assert.equal(nagold.total(restored), 5);
  assert.deepEqual(engine.readPayload(engine.payload(restored)), restored);
  assert.equal(engine.finish(restored, "L1.1"), false);
  assert.equal(restored.nagoldEntries.length, 1);
});

test("Completion awards NAGOLD exactly once and an explicitly deleted row stays deleted", () => {
  const state = engine.empty();
  for (const task of content.units[0].tasks) engine.answer(state, "L1.1", task.id, task.correct);
  assert.equal(engine.finish(state, "L1.1"), true);
  assert.equal(engine.finish(state, "L1.1"), false);
  assert.equal(nagold.total(state), 5);
  assert.match(state.nagoldEntries[0].purpose, /^L1\.1 · /);
  state.nagoldEntries = [];
  assert.deepEqual(engine.readPayload(engine.payload(state)).nagoldEntries, []);
});

test("Invalid imports are rejected as a whole, including damaged NAGOLD rows", () => {
  const payload = engine.payload(engine.empty());
  for (const invalid of [null, [], { app: "Excel-Lab", state: {} }, { ...payload, formatVersion: 99 }]) assert.throws(() => engine.readPayload(invalid));
  for (const changes of [{ points: 0 }, { points: 6 }, { points: -11 }, { points: 1.5 }, { date: "2026-02-30" }, { time: "24:00" }, { purpose: "" }, { purpose: "a".repeat(161) }]) {
    assert.throws(() => engine.readPayload({ ...payload, state: { ...payload.state, nagoldEntries: [row(changes)] } }));
  }
  assert.throws(() => engine.readPayload({ ...payload, state: { ...payload.state, nagoldEntries: {} } }));
  assert.throws(() => engine.readPayload({ ...payload, state: { ...payload.state, profile: [] } }));
});

test("School year starts in August, duplicate start capital and lesson entries are rejected", () => {
  assert.equal(nagold.schoolYear("2026-07-31"), "2025/26");
  assert.equal(nagold.schoolYear("2026-08-01"), "2026/27");
  const payload = engine.payload(engine.empty());
  const entries = [row({ purpose: "Startkapital", points: 5 }), row({ date: "2027-01-12", purpose: "Startkapital", points: 5 })];
  assert.throws(() => engine.readPayload({ ...payload, state: { ...payload.state, nagoldEntries: entries } }), /Startkapital/);
  assert.throws(() => engine.readPayload({ ...payload, state: { ...payload.state, nagoldEntries: [row({ lessonId: "L1.1" }), row({ lessonId: "L1.1" })] } }), /doppelte/);
  assert.equal(nagold.attendancePoints, 2);
});
