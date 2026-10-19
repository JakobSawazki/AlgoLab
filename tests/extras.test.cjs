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
const task = (unitId, taskId) => content.units.find(unit => unit.id === unitId).extras.find(item => item.id === taskId);
// Ersetzt die Platzhalterkommentare samt pass im Starter durch den Funktionskörper.
const fill = (item, body) => item.starter.replace(/(    # [^\n]*\n)+(    pass\n)?/, body.replace(/\n?$/, "\n"));
const allPass = (item, body) => assert.deepEqual(check(fill(item, body), item), item.checks.map(() => true));

test("Kapitalrechner: Zinsstaffel Jahr für Jahr, None bis 50.000 €", () => {
  const item = task("L1.3", "kapital");
  allPass(item, "    if betrag <= 50000:\n        return None\n    for i in range(laufzeit):\n        betrag = betrag + betrag * zinssatz[i] / 100\n    return betrag");
  const flat = check(fill(item, "    if betrag <= 50000:\n        return None\n    return betrag + betrag * zinssatz[0] / 100 * laufzeit"), item);
  assert.equal(flat[0], false);
});

test("Wetterstation and duplicate-free prize draw", () => {
  allPass(task("L1.4", "wetter"), "    hoechste = temperaturen[0]\n    niedrigste = temperaturen[0]\n    summe = 0\n    for i in range(len(temperaturen)):\n        if temperaturen[i] > hoechste:\n            hoechste = temperaturen[i]\n        if temperaturen[i] < niedrigste:\n            niedrigste = temperaturen[i]\n        summe = summe + temperaturen[i]\n    return hoechste, niedrigste, summe / len(temperaturen), hoechste - niedrigste");
  const draw = task("L1.4", "gewinnlose");
  allPass(draw, "    while len(gewinnlose) < anzahl:\n        nummer = 1000000 + random.randint(1, 500)\n        if nummer not in gewinnlose:\n            gewinnlose.append(nummer)");
  const duplicates = check(fill(draw, "    for i in range(anzahl):\n        gewinnlose.append(1000000 + random.randint(1, 500))"), draw);
  assert.equal(duplicates[1], false);
});

test("Word cipher and members per year", () => {
  allPass(task("L2.5", "wort"), "    for zeichen in wort:\n        neu = zeichen\n        for k in range(len(alphabet_klar)):\n            if alphabet_klar[k] == zeichen:\n                neu = alphabet_geheim[k]\n        geheimtext = geheimtext + neu");
  allPass(task("L2.8", "jahrgaenge"), "    max_jahrgang = 2000\n    for i in range(len(jahrgang)):\n        if jahrgang[i] > max_jahrgang:\n            max_jahrgang = jahrgang[i]\n    for jahr in range(2000, max_jahrgang + 1):\n        anzahl = 0\n        for j in range(len(jahrgang)):\n            if jahrgang[j] == jahr:\n                anzahl = anzahl + 1\n        ergebnis.append((jahr, anzahl))");
});

test("Bracket check with a stack and tree height with a queue", () => {
  const brackets = task("L3.2", "klammern");
  assert.deepEqual(check(brackets.starter.replace("    # Öffnende Klammern: PUSH. Schließende: oben prüfen und POP.\n    return False", '    auf, zu = "([{", ")]}"\n    for zeichen in text:\n        if zeichen in auf:\n            stapel.append(zeichen)\n        elif zeichen in zu:\n            if not stapel or stapel[-1] != auf[zu.index(zeichen)]:\n                return False\n            stapel.pop()\n    return not stapel'), brackets), brackets.checks.map(() => true));
  const counting = check(brackets.starter.replace("    # Öffnende Klammern: PUSH. Schließende: oben prüfen und POP.\n    return False", '    return text.count("(") == text.count(")") and text.count("[") == text.count("]")'), brackets);
  assert.equal(counting[1], false);
  const height = task("L3.4", "hoehe");
  assert.deepEqual(check(height.starter.replace("    # Solange die Schlange nicht leer ist: vorne entnehmen, Kinder hinten anhängen.\n", "    while schlange:\n        index, ebene = schlange.pop(0)\n        if ebene > groesste:\n            groesste = ebene\n        for kind in (baum[index][1], baum[index][2]):\n            if kind is not None:\n                schlange.append((kind, ebene + 1))\n"), height), height.checks.map(() => true));
});
