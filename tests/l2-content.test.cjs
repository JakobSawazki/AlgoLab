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
const selectionBody = (op, name) => `    laenge = len(zahlen)\n    for akt_idx in range(laenge - 1):\n        ${name} = akt_idx\n        for j in range(akt_idx + 1, laenge):\n            if zahlen[j] ${op} zahlen[${name}]:\n                ${name} = j\n        if akt_idx != ${name}:\n            zwischenspeicher = zahlen[akt_idx]\n            zahlen[akt_idx] = zahlen[${name}]\n            zahlen[${name}] = zwischenspeicher`;

test("L2.1 Kfz-Steuer: correct rounding and CO2 allowance pass, truncation and negative CO2 fail", () => {
  const item = task("L2.1", "kfzcode");
  allPass(item, '    einheiten = (hubraum + 99) // 100\n    satz = 9.5 if antrieb == "Diesel" else 2.0\n    co2_anteil = (co2 - 95) * 2 if co2 > 95 else 0\n    return einheiten * satz + co2_anteil');
  const truncated = check(fill(item, '    satz = 9.5 if antrieb == "Diesel" else 2.0\n    return hubraum // 100 * satz + (co2 - 95) * 2'), item);
  assert.equal(truncated[0], false); assert.equal(truncated[2], false);
});

test("L2.2 Bubble Sort and optimized variant accept reference solutions and reject built-ins", () => {
  const sortTask = task("L2.2", "bubblecode");
  assert.deepEqual(check(sortTask.starter.replace("    laenge = len(zahlen)\n    # Äußere Schleife: Bubble-Phasen. Innere Schleife: Nachbarn vergleichen und tauschen.\n    pass", bubbleBody), sortTask), sortTask.checks.map(() => true));
  assert.equal(check(sortTask.starter.replace("    pass", "    zahlen.sort()"), sortTask)[3], false);
  const optTask = task("L2.2", "bubbleopt");
  const optimized = optTask.starter.replace("    # Solange getauscht wurde: neue Phase, Merker zurücksetzen, Nachbarn vergleichen.\n    pass", "    while tausch and bubble_phasen < len(zahlen) - 1:\n        tausch = False\n        bubble_phasen = bubble_phasen + 1\n        for j in range(len(zahlen) - bubble_phasen):\n            if zahlen[j] > zahlen[j + 1]:\n                zwischenspeicher = zahlen[j]\n                zahlen[j] = zahlen[j + 1]\n                zahlen[j + 1] = zwischenspeicher\n                tausch = True");
  assert.deepEqual(check(optimized, optTask), optTask.checks.map(() => true));
});

test("L2.3 Selection Sort ascending and descending", () => {
  const asc = task("L2.3", "selectioncode");
  assert.deepEqual(check(asc.starter.replace("    laenge = len(zahlen)\n    # Für jeden akt_idx: min_idx suchen, dann tauschen.\n    pass", selectionBody("<", "min_idx")), asc), asc.checks.map(() => true));
  const desc = task("L2.3", "absteigendcode");
  allPass(desc, selectionBody(">", "max_idx"));
  assert.equal(check(fill(desc, "    zahlen.sort(reverse=True)"), desc)[2], false);
});

test("L2.4 Kader sorting and repaired descending Bubble Sort", () => {
  const kader = task("L2.4", "kadercode");
  allPass(kader, selectionBody("<", "min_idx").replaceAll("zahlen", "kader"));
  const repair = task("L2.4", "fehlercode");
  assert.equal(check(repair.starter, repair)[0], false);
  const fixed = repair.starter.replace("range(0, laenge)", "range(1, laenge)").replace("zahlenreihe[zaehler1 + 1]", "zahlenreihe[zaehler2 + 1]").replace("zahlenreihe[zaehler2 + 1] = zahlenreihe[zaehler2]\n", "zahlenreihe[zaehler2 + 1] = merker\n");
  assert.deepEqual(check(fixed, repair), repair.checks.map(() => true));
});

test("L2.5 Linear search: member check and substitution cipher", () => {
  const member = task("L2.5", "mitgliedcode");
  allPass(member, "    for i in range(len(mnr)):\n        if mnr[i] == nummer:\n            gefunden = True");
  assert.equal(check(fill(member, "    gefunden = nummer in mnr"), member)[2], false);
  const earlyFalse = check(fill(member, "    for i in range(len(mnr)):\n        if mnr[i] == nummer:\n            return True\n        else:\n            return False"), member);
  assert.equal(earlyFalse[0], false);
  const cipher = task("L2.5", "geheimcode");
  allPass(cipher, "    geheim = buchstabe\n    for i in range(len(alphabet_klar)):\n        if alphabet_klar[i] == buchstabe:\n            geheim = alphabet_geheim[i]\n    return geheim");
  assert.equal(check(fill(cipher, "    return alphabet_geheim[alphabet_klar.index(buchstabe)]"), cipher)[3], false);
});

test("L2.6 Binary search passes; linear scan and endless loops are rejected", () => {
  const item = task("L2.6", "binaercode");
  const binaryBody = "    while gefunden == False and index_anfang <= index_ende:\n        index_mitte = (index_anfang + index_ende) // 2\n        if ln_gewinne[index_mitte] == losnr:\n            gefunden = True\n        elif ln_gewinne[index_mitte] > losnr:\n            index_ende = index_mitte - 1\n        else:\n            index_anfang = index_mitte + 1";
  allPass(item, binaryBody);
  const linearScan = check(fill(item, "    for i in range(len(ln_gewinne)):\n        if ln_gewinne[i] == losnr:\n            gefunden = True"), item);
  assert.equal(linearScan[0], true); assert.equal(linearScan[3], false);
  const usesIn = check(fill(item, "    gefunden = losnr in ln_gewinne"), item);
  assert.equal(usesIn[4], false);
});

test("L2.7 Divisibility filter and comparison counter", () => {
  const filter = task("L2.7", "teilbarcode");
  allPass(filter, "    for zaehler in range(len(zahlen)):\n        rest = zahlen[zaehler] % teiler\n        if rest == 0:\n            teilbar.append(zahlen[zaehler])");
  const counter = task("L2.7", "zaehlcode");
  allPass(counter, "    for i in range(len(liste)):\n        linear = linear + 1\n        if liste[i] == gesucht:\n            break\n    anfang, ende = 0, len(liste) - 1\n    while anfang <= ende:\n        mitte = (anfang + ende) // 2\n        binaer = binaer + 1\n        if liste[mitte] == gesucht:\n            break\n        elif liste[mitte] > gesucht:\n            ende = mitte - 1\n        else:\n            anfang = mitte + 1");
});

test("L2.8 Name-based swap, removal and frequency count", () => {
  allPass(task("L2.8", "namenstausch"), "    for i in range(len(spieler)):\n        if spieler[i] == name1:\n            idx1 = i\n        if spieler[i] == name2:\n            idx2 = i\n    zwischenspeicher = spieler[idx1]\n    spieler[idx1] = spieler[idx2]\n    spieler[idx2] = zwischenspeicher");
  const remove = task("L2.8", "nameentfernen");
  allPass(remove, "    gefunden = False\n    for i in range(len(kader)):\n        if kader[i] == name:\n            idx_spieler = i\n            gefunden = True\n    if not gefunden:\n        return False\n    for i in range(idx_spieler, len(kader) - 1):\n        kader[i] = kader[i + 1]\n    kader.pop()\n    return True");
  const builtin = check(fill(remove, "    if name in kader:\n        kader.remove(name)\n        return True\n    return False"), remove);
  assert.equal(builtin[3], false);
  allPass(task("L2.8", "haeufigkeit"), "    for i in range(len(wuerfe)):\n        if wuerfe[i] == gesucht:\n            anzahl = anzahl + 1");
});
