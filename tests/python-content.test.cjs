const test = require("node:test");
const assert = require("node:assert/strict");
const { execFileSync } = require("node:child_process");
const content = require("../learning-path.js");
const task = content.units.find(unit => unit.id === "L1.2").tasks.find(task => task.type === "code");
function check(code) {
  const script = `import sys,json,io,contextlib
data=json.loads(sys.argv[1]); scope={}; output=io.StringIO()
with contextlib.redirect_stdout(output): exec(data['code'],scope)
scope['__algolab_source__']=data['code']; scope['__algolab_output__']=output.getvalue().rstrip()
print(json.dumps([bool(eval(expression,scope)) for expression in data['checks']]))`;
  return JSON.parse(execFileSync(process.env.ALGOLAB_PYTHON || (process.platform === "win32" ? "python" : "python3"), ["-c", script, JSON.stringify({ code, checks: task.checks.map(check => check.expression) })], { encoding: "utf8" }));
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
