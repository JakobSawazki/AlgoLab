const test = require("node:test");
const assert = require("node:assert/strict");
const content = require("../learning-path.js");
const engine = require("../progress.js")(content);
const nagold = require("../nagold.js")(content);
const overview = require("../class-overview.js")(content, engine, nagold);

function learner(name, className, completedCount, extra = {}) {
  const state = engine.empty();
  state.profile = { name, className };
  for (const unit of content.units.slice(0, completedCount)) {
    for (const task of unit.tasks) task.type === "code" ? engine.completeCode(state, unit.id, task.id, true) : engine.answer(state, unit.id, task.id, task.correct);
    engine.finish(state, unit.id);
  }
  Object.assign(state.selfcheck, extra.selfcheck || {});
  for (const id of extra.solved || []) engine.completePractice(state, id, true);
  const payload = engine.payload(state);
  if (extra.exportedAt) payload.exportedAt = extra.exportedAt;
  return JSON.stringify(payload);
}

test("Valid backups become rows with recomputed points; broken files are reported, not imported", () => {
  const ok = overview.readFile(learner("ada.lov", "J2 INF1", 3, { solved: ["mitglied-pruefen", "nsd-binaer"], selfcheck: { "L1-2.10": 1, "L1-2.11": 3 } }), "ada.json");
  assert.equal(ok.ok, true);
  assert.deepEqual({ name: ok.row.name, className: ok.row.className, completed: ok.row.completed, current: ok.row.current, points: ok.row.points, programs: ok.row.programs, structograms: ok.row.structograms }, { name: "ada.lov", className: "J2 INF1", completed: 3, current: "L1.4", points: 300, programs: 1, structograms: 1 });
  assert.equal(ok.row.nagold, 15, "je abgeschlossener Einheit 5 NAGOLD");
  assert.deepEqual(ok.row.selfcheck, { sure: 1, ok: 0, notYet: 1 });
  const forged = JSON.parse(learner("bob.mal", "J2 INF1", 0));
  forged.state.completed = ["L1.1", "L1.2"]; forged.state.points = 9999;
  assert.equal(overview.readFile(JSON.stringify(forged)).row.completed, 0, "Abschlüsse ohne gelöste Aufgaben zählen nicht");
  assert.equal(overview.readFile("{kein json", "kaputt.json").ok, false);
  const foreign = overview.readFile(JSON.stringify({ app: "Excel-Lab", formatVersion: 1, state: {} }), "excel.json");
  assert.equal(foreign.ok, false); assert.match(foreign.error, /AlgoLab/);
});

test("Duplicates keep the newest backup and the class aggregate highlights uncertain statements", () => {
  const rows = overview.merge([
    overview.readFile(learner("ada.lov", "J2 INF1", 2, { exportedAt: "2026-10-01T08:00:00Z", selfcheck: { "L1-2.10": 1 } })).row,
    overview.readFile(learner("ada.lov", "J2 INF1", 4, { exportedAt: "2026-10-15T08:00:00Z", selfcheck: { "L1-2.10": 1 } })).row,
    overview.readFile(learner("cem.yil", "J2 INF2", 1, { selfcheck: { "L1-2.10": 1, "L1-2.12": 1 } })).row
  ]);
  assert.equal(rows.length, 2);
  assert.equal(rows.find(row => row.name === "ada.lov").completed, 4);
  const summary = overview.aggregate(rows);
  assert.equal(summary.count, 2);
  assert.deepEqual(summary.classes, ["J2 INF1", "J2 INF2"]);
  assert.equal(summary.unitProgress.find(unit => unit.id === "L1.1").done, 2);
  assert.equal(summary.unitProgress.find(unit => unit.id === "L1.3").done, 1);
  assert.equal(summary.uncertain[0].id, "L1-2.10");
  assert.equal(summary.uncertain[0].notYet, 2);
  assert.equal(summary.averageCompleted, 2.5);
});

test("CSV export uses semicolons, quotes special characters and starts with a BOM for Excel", () => {
  const row = overview.readFile(learner("x;y", "J2 \"INF1\"", 1)).row;
  const csv = overview.toCsv([row]);
  assert.ok(csv.startsWith("﻿Kürzel;Klasse;"));
  assert.match(csv, /"x;y";"J2 ""INF1""";1\/19;L1\.2;100;5;0\/17;0\/9/);
});
