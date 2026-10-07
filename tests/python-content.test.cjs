const test = require("node:test");
const assert = require("node:assert/strict");
const { execFileSync } = require("node:child_process");
const content = require("../learning-path.js");
const task = content.units.find(unit => unit.id === "L1.2").tasks.find(task => task.type === "code");
function check(code, selectedTask = task) {
  const script = `import sys,json,io,contextlib
data=json.loads(sys.argv[1]); scope={}; output=io.StringIO()
try:
 with contextlib.redirect_stdout(output): exec(data['code'],scope)
except Exception:
 print(json.dumps([False for _ in data['checks']]))
 sys.exit(0)
scope['__algolab_source__']=data['code']; scope['__algolab_output__']=output.getvalue().rstrip()
exec(data['setup'],scope)
results=[]
for expression in data['checks']:
 try: results.append(bool(eval(expression,scope)))
 except Exception: results.append(False)
print(json.dumps(results))`;
  return JSON.parse(execFileSync(process.env.ALGOLAB_PYTHON || (process.platform === "win32" ? "python" : "python3"), ["-c", script, JSON.stringify({ code, setup: require('../python-checks.js'), checks: selectedTask.checks.map(check => check.expression) })], { encoding: "utf8" }));
}
test("The team task accepts a working program with index operations, append, len and output", () => {
  const results = check("punkte = [12, 8, 15, 9]\nerster = punkte[0]\npunkte[1] = 11\npunkte.append(7)\nanzahl = len(punkte)\nprint(punkte)\nprint(erster)\nprint(anzahl)");
  assert.equal(results.length, 7); assert.equal(results.every(Boolean), true);
});
test("Hardcoded final values and correct-looking output do not satisfy the required operations", () => {
  const results = check("punkte = [12, 11, 15, 9, 7]\nerster = 12\nanzahl = 5\nprint(punkte)\nprint(erster)\nprint(anzahl)");
  assert.equal(results.slice(0, 3).every(Boolean), true);
  assert.equal(results.slice(3, 6).every(value => value === false), true);
});
test("A runnable program with the wrong field changed fails the result criterion", () => {
  const results = check("punkte = [12, 8, 15, 9]\nerster = punkte[0]\npunkte[2] = 11\npunkte.append(7)\nanzahl = len(punkte)\nprint(punkte)\nprint(erster)\nprint(anzahl)");
  assert.equal(results[0], false); assert.equal(results.at(-1), false);
});

const loops = content.units.find(unit => unit.id === "L1.3");
const rankTask = loops.tasks.find(task => task.id === "platzcode");
const rosterTask = loops.tasks.find(task => task.id === "kadercode");
test("Rank function handles first, last and singleton positions with new data", () => {
  const code = rankTask.starter.replace("    pass", "    return platzierungen[platz - 1]");
  assert.equal(check(code, rankTask).every(Boolean), true);
  const hardcoded = rankTask.starter.replace("    pass", '    return ["Mila", "Jonas", "Sam"][platz - 1]');
  assert.equal(check(hardcoded, rankTask)[1], false);
  const wrongIndex = rankTask.starter.replace("    pass", "    return platzierungen[platz % len(platzierungen)]");
  assert.equal(check(wrongIndex, rankTask).every(Boolean), false);
});
test("Roster function handles new names, empty and singleton lists without leaking check output", () => {
  const code = rosterTask.starter.replace("    pass", "    for i in range(len(namen)):\n        print(namen[i])").replace("# Lege hier kader an.", "kader = start + ersatz");
  assert.equal(check(code, rosterTask).every(Boolean), true);
  const fixedLength = code.replace("range(len(namen))", "range(3)");
  assert.equal(check(fixedLength, rosterTask)[2], false);
  assert.equal(check(fixedLength, rosterTask)[3], false);
});
test("Missing last elements and hardcoded output cannot pass roster checks", () => {
  const incomplete = rosterTask.starter.replace("    pass", "    for i in range(len(namen) - 1):\n        print(namen[i])").replace("# Lege hier kader an.", "kader = start + ersatz");
  const results = check(incomplete, rosterTask);
  assert.equal(results[1], false); assert.equal(results[2], false); assert.equal(results[3], false);
  const hardcoded = rosterTask.starter.replace("    pass", '    print("Mila\\nJonas\\nSam")').replace("# Lege hier kader an.", "kader = start + ersatz");
  assert.equal(check(hardcoded, rosterTask).at(-1), false);
});

const analysis = content.units.find(unit => unit.id === "L1.4");
const collectTask = analysis.tasks.find(task => task.id === "losecode");
const analyseTask = analysis.tasks.find(task => task.id === "analysecode");
const collectCode = collectTask.starter.replace("    pass", "    lose = []\n    for i in range(len(gezogen)):\n        lose.append(gezogen[i])\n    return lose");
const analyseCode = analyseTask.starter.replace("    pass", "    kleinster = werte[0]\n    groesster = werte[0]\n    summe = 0\n    for i in range(len(werte)):\n        wert = werte[i]\n        if wert < kleinster:\n            kleinster = wert\n        if wert > groesster:\n            groesster = wert\n        summe = summe + wert\n    return kleinster, groesster, summe / len(werte)");
test("Collecting preserves order, duplicates and inputs and handles empty lists", () => {
  assert.equal(check(collectCode, collectTask).every(Boolean), true);
});
test("Returning the input itself or a literal list cannot pass the collecting task", () => {
  assert.equal(check(collectTask.starter.replace("    pass", "    return gezogen"), collectTask)[0], false);
  const literal = collectTask.starter.replace("    pass", "    return [125, 48, 302, 91, 214]");
  assert.equal(check(literal, collectTask)[1], false);
  assert.equal(check(literal, collectTask)[2], false);
});
test("Analysis accepts full traversal and the optimized variant starting at index 1", () => {
  assert.equal(check(analyseCode, analyseTask).every(Boolean), true);
  const optimized = analyseCode.replace("summe = 0", "summe = werte[0]").replace("range(len(werte))", "range(1, len(werte))");
  assert.equal(check(optimized, analyseTask).every(Boolean), true);
});
test("Analysis rejects incorrect initial values, double counting and integer division", () => {
  assert.equal(check(analyseCode.replace("kleinster = werte[0]", "kleinster = 0"), analyseTask)[1], false);
  assert.equal(check(analyseCode.replace("groesster = werte[0]", "groesster = 0"), analyseTask)[2], false);
  assert.equal(check(analyseCode.replace("summe = 0", "summe = werte[0]"), analyseTask)[0], false);
  assert.equal(check(analyseCode.replace("summe / len(werte)", "summe // len(werte)"), analyseTask)[1], false);
});
test("Builtin-only analysis and input sorting fail the stated algorithm requirements", () => {
  const builtin = analyseTask.starter.replace("    pass", "    return min(werte), max(werte), sum(werte) / len(werte)");
  assert.equal(check(builtin, analyseTask).slice(0, 4).every(Boolean), true);
  assert.equal(check(builtin, analyseTask)[4], false);
  const sorted = analyseCode.replace("    kleinster = werte[0]", "    werte.sort()\n    kleinster = werte[0]");
  assert.equal(check(sorted, analyseTask)[0], false);
});
