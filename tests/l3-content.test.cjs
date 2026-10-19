const test = require("node:test");
const assert = require("node:assert/strict");
const { execFileSync } = require("node:child_process");
const content = require("../learning-path.js");
const setup = require("../python-checks.js");

function check(code, task) {
  const script = `import sys,json,io,contextlib
data=json.loads(sys.stdin.read()); scope={}; output=io.StringIO()
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
  const python = process.env.ALGOLAB_PYTHON || (process.platform === "win32" ? "python" : "python3");
  return JSON.parse(execFileSync(python, ["-c", script], { input: JSON.stringify({ code, setup, checks: task.checks.map(item => item.expression) }), encoding: "utf8", env: { ...process.env, PYTHONIOENCODING: "utf-8" } }));
}
const task = (unitId, taskId) => content.units.find(unit => unit.id === unitId).tasks.find(item => item.id === taskId);
// Ersetzt die Platzhalterkommentare samt pass im Starter durch den Funktionskörper.
const fill = (item, body) => item.starter.replace(/(    # [^\n]*\n)+(    pass\n)?/, body.replace(/\n?$/, "\n"));
const allPass = (item, body) => assert.deepEqual(check(fill(item, body), item), item.checks.map(() => true));

const bubbleBody = "    laenge = len(zahlen)\n    for i in range(1, laenge):\n        for j in range(laenge - i):\n            if zahlen[j] > zahlen[j + 1]:\n                zwischenspeicher = zahlen[j]\n                zahlen[j] = zahlen[j + 1]\n                zahlen[j + 1] = zwischenspeicher";

test("L3.1 Linked list traversal follows pointers and insertion keeps the rest reachable", () => {
  const walk = task("L3.1", "durchlaufcode");
  allPass(walk, "    aktuell = anker\n    while aktuell is not None:\n        daten.append(knoten[aktuell][0])\n        aktuell = knoten[aktuell][1]");
  const dictOrder = check(fill(walk, "    for eintrag in knoten.values():\n        daten.append(eintrag[0])"), walk);
  assert.equal(dictOrder[0], false); assert.equal(dictOrder[3], false);
  const insert = task("L3.1", "einfuegecode");
  allPass(insert, "    knoten[neu] = [daten, knoten[vorgaenger][1]]\n    knoten[vorgaenger][1] = neu");
  const wrongOrder = check(fill(insert, "    knoten[vorgaenger][1] = neu\n    knoten[neu] = [daten, knoten[vorgaenger][1]]"), insert);
  assert.equal(wrongOrder[0], false);
});

test("L3.2 Backspace stack produces the word and ignores pops on an empty stack", () => {
  const item = task("L3.2", "backspacecode");
  allPass(item, '    for taste in tasten:\n        if taste == "⌫":\n            if stapel:\n                stapel.pop()\n        else:\n            stapel.append(taste)');
  const unsafe = check(fill(item, '    for taste in tasten:\n        if taste == "⌫":\n            stapel.pop()\n        else:\n            stapel.append(taste)'), item);
  assert.equal(unsafe[0], true); assert.equal(unsafe[1], false);
});

test("L3.3 Queue simulation and FIFO violation detection", () => {
  const queueTask = task("L3.3", "abfertigencode");
  allPass(queueTask, '    for befehl in befehle:\n        teile = befehl.split()\n        if teile[0] == "ENQUEUE":\n            schlange.append(teile[1])\n        elif schlange:\n            abgefahren.append(schlange.pop(0))');
  const lifo = check(fill(queueTask, '    for befehl in befehle:\n        teile = befehl.split()\n        if teile[0] == "ENQUEUE":\n            schlange.append(teile[1])\n        elif schlange:\n            abgefahren.append(schlange.pop())'), queueTask);
  assert.equal(lifo[0], false);
  const fifo = task("L3.3", "fifocode");
  assert.deepEqual(check(fifo.starter.replace("    # Jede Ausfahrt mit dem Taxi vergleichen, das nach FIFO an der Reihe wäre.\n    return None", "    for k in range(len(ausfahrten)):\n        if ausfahrten[k] != einfahrten[k]:\n            return ausfahrten[k]\n    return None"), fifo), fifo.checks.map(() => true));
});

test("L3.4 Tree table: leaves and fullness", () => {
  const leaves = task("L3.4", "blattcode");
  allPass(leaves, "    for zeile in baum:\n        if zeile[1] is None and zeile[2] is None:\n            ergebnis.append(zeile[0])");
  const oneChild = check(fill(leaves, "    for zeile in baum:\n        if zeile[1] is None or zeile[2] is None:\n            ergebnis.append(zeile[0])"), leaves);
  assert.equal(oneChild[1], false);
  const full = task("L3.4", "vollcode");
  assert.deepEqual(check(full.starter.replace("    # Gibt es einen Knoten mit genau einem Kind?\n    return True", "    for zeile in baum:\n        if (zeile[1] is None) != (zeile[2] is None):\n            return False\n    return True"), full), full.checks.map(() => true));
});
