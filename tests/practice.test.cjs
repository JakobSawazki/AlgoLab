const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");
const practice = require("../practice.js");
const checker = require("../practice-check.js");
const setup = require("../python-checks.js");

// Derselbe input()-Vorspann wie im Browser-Worker.
const worker = fs.readFileSync(path.join(__dirname, "..", "python-worker.js"), "utf8");
const prelude = worker.match(/const inputPrelude = `([\s\S]*?)`;/)[1];
const harness = `import sys, json, io, contextlib
sys.stdin.reconfigure(encoding="utf-8"); sys.stdout.reconfigure(encoding="utf-8")
data = json.loads(sys.stdin.read())
g = {"__algolab_inputs__": list(data["inputs"]), "__algolab_echo__": False}
exec(data["prelude"], g)
out = io.StringIO(); res = {}
try:
    with contextlib.redirect_stdout(out):
        exec(data["code"], g)
    g["__algolab_source__"] = data["code"]; g["__algolab_output__"] = out.getvalue().rstrip()
    exec(data["setup"], g)
    if data["testCode"]:
        try:
            with contextlib.redirect_stdout(io.StringIO()):
                exec(data["testCode"], g)
        except AssertionError as error:
            res["assertion"] = str(error)
except Exception as error:
    res["error"] = type(error).__name__ + ": " + str(error)
res["output"] = out.getvalue()
print(json.dumps(res))`;
const python = process.env.ALGOLAB_PYTHON || (process.platform === "win32" ? "python" : "python3");
const lines = text => text ? text.replace(/\r\n?/g, "\n").replace(/\n$/, "").split("\n") : [];
function run(code, input, testCode = "") {
  return JSON.parse(execFileSync(python, ["-c", harness], { input: JSON.stringify({ code, inputs: lines(input), testCode, setup, prelude }), encoding: "utf8", env: { ...process.env, PYTHONIOENCODING: "utf-8" } }));
}
const byId = id => practice.exercises.find(item => item.id === id);
// Endet der Startcode mit einer Ausgabe (z. B. print(zahlen)), gehört die Lösung davor.
const fill = (exercise, body) => {
  const starterLines = exercise.starter.trimEnd().split("\n");
  if (/^print\(/.test(starterLines.at(-1))) return `${starterLines.slice(0, -1).join("\n")}\n${body}\n${starterLines.at(-1)}\n`;
  return `${exercise.starter}\n${body}\n`;
};
function verdicts(exercise, code) {
  return exercise.check.cases.map(testCase => checker.evaluateCase(exercise.check, testCase, run(code, testCase.input, exercise.check.testCode)));
}
const passesAll = (id, body) => {
  const exercise = byId(id);
  const results = verdicts(exercise, fill(exercise, body));
  results.forEach((result, index) => assert.equal(result.passed, true, `${id} Fall ${index + 1}: ${result.message}`));
};
const failsWith = (id, body, pattern) => {
  const exercise = byId(id);
  const results = verdicts(exercise, fill(exercise, body));
  assert.ok(results.some(result => !result.passed && pattern.test(result.message)), `${id}: ${results.map(r => r.message).join(" | ")}`);
};

const reference = {
  "noten-durchschnitt": "for i in range(5):\n    noten.append(float(input(\"Note: \")))\nsumme = 0\nfor i in range(len(noten)):\n    summe = summe + noten[i]\nprint(\"Durchschnitt:\", summe / len(noten))",
  "namen-rueckwaerts": "for i in range(n):\n    namen.append(input(\"Name: \"))\nfor i in range(len(namen) - 1, -1, -1):\n    print(namen[i])",
  "positionen-tauschen": "zwischenspeicher = spieler[position_b - 1]\nspieler[position_b - 1] = spieler[position_a - 1]\nspieler[position_a - 1] = zwischenspeicher\nstartaufstellung_ausgeben()",
  "spieler-einfuegen": "kader.append(spielername)\nfor i in range(len(kader) - 1, index, -1):\n    zwischenspeicher = kader[i - 1]\n    kader[i - 1] = kader[i]\n    kader[i] = zwischenspeicher\nkader_ausgeben()",
  "spieler-entfernen": "for i in range(index, len(kader) - 1):\n    kader[i] = kader[i + 1]\nkader.pop()\nkader_ausgeben()",
  "trainingsanalyse": "for i in range(6):\n    wuerfe.append(int(input(\"Wurf: \")))\nbester = wuerfe[0]\nschwaechster = wuerfe[0]\nsumme = 0\nfor i in range(len(wuerfe)):\n    if wuerfe[i] > bester:\n        bester = wuerfe[i]\n    if wuerfe[i] < schwaechster:\n        schwaechster = wuerfe[i]\n    summe = summe + wuerfe[i]\nprint(\"Bester Wurf:\", bester)\nprint(\"Schwächster Wurf:\", schwaechster)\nprint(\"Durchschnitt:\", summe / len(wuerfe))",
  "kfz-steuer": "einheiten = (hubraum + 99) // 100\nif antrieb == \"Diesel\":\n    steuer = einheiten * 9.5\nelse:\n    steuer = einheiten * 2\nif co2 > 95:\n    steuer = steuer + (co2 - 95) * 2\nprint(\"Kfz-Steuer:\", steuer, \"EUR\")",
  "bubble-zahlenreihe": "for i in range(5):\n    zahlen.append(int(input(\"Zahl: \")))\nlaenge = len(zahlen)\nfor i in range(1, laenge):\n    for j in range(laenge - i):\n        if zahlen[j] > zahlen[j + 1]:\n            zwischenspeicher = zahlen[j]\n            zahlen[j] = zahlen[j + 1]\n            zahlen[j + 1] = zwischenspeicher\nfor i in range(laenge):\n    print(zahlen[i])",
  "selection-absteigend": "for i in range(8):\n    zahlen.append(int(input(\"Zahl: \")))\nlaenge = len(zahlen)\nfor akt_idx in range(laenge - 1):\n    max_idx = akt_idx\n    for j in range(akt_idx + 1, laenge):\n        if zahlen[j] > zahlen[max_idx]:\n            max_idx = j\n    if akt_idx != max_idx:\n        zwischenspeicher = zahlen[akt_idx]\n        zahlen[akt_idx] = zahlen[max_idx]\n        zahlen[max_idx] = zwischenspeicher",
  "namen-alphabetisch": "for i in range(n):\n    namen.append(input(\"Name: \"))\nfor i in range(1, len(namen)):\n    for j in range(len(namen) - i):\n        if namen[j] > namen[j + 1]:\n            zwischenspeicher = namen[j]\n            namen[j] = namen[j + 1]\n            namen[j + 1] = zwischenspeicher\nfor i in range(len(namen)):\n    print(namen[i])",
  "mitglied-pruefen": "gefunden = False\nfor i in range(len(mnr)):\n    if mnr[i] == nummer:\n        gefunden = True\nif gefunden:\n    print(\"Zutritt gewährt\")\nelse:\n    print(\"Zutritt verweigert\")",
  "buchstabe-verschluesseln": "for i in range(len(alphabet_klar)):\n    if buchstabe_klar == alphabet_klar[i]:\n        buchstabe_geheim = alphabet_geheim[i]\nprint(\"Geheimbuchstabe:\", buchstabe_geheim)",
  "spieler-suchen": "while gefunden == False and zaehler < len(kader):\n    if spielername == kader[zaehler]:\n        gefunden = True\n    else:\n        zaehler = zaehler + 1\nif gefunden:\n    print(\"Spieler ist im Mannschaftskader\")\nelse:\n    print(\"Spieler ist nicht im Mannschaftskader\")",
  "gewinnlos-binaer": "while gefunden == False and index_anfang <= index_ende:\n    index_mitte = (index_anfang + index_ende) // 2\n    if ln_gewinne[index_mitte] == losnr:\n        gefunden = True\n    elif ln_gewinne[index_mitte] > losnr:\n        index_ende = index_mitte - 1\n    else:\n        index_anfang = index_mitte + 1\nif gefunden:\n    print(\"Sie haben gewonnen :-)\")\nelse:\n    print(\"Sie haben leider nicht gewonnen :-(\")",
  "wuerfe-zaehlen": "for i in range(len(wuerfe)):\n    if wuerfe[i] == gesucht:\n        anzahl = anzahl + 1\nprint(\"Sie haben\", anzahl, \"Mal die Punktzahl\", gesucht, \"geworfen.\")",
  "editor-rueckgaengig": "while True:\n    befehl = input(\"Befehl: \")\n    if befehl == \"ENDE\":\n        break\n    if befehl.startswith(\"TIPPE \"):\n        stapel.append(befehl[6:])\n    elif befehl == \"ZURÜCK\" and stapel:\n        stapel.pop()\nif stapel:\n    print(\" \".join(stapel))\nelse:\n    print(\"(leer)\")",
  "drucker-warteschlange": "while True:\n    befehl = input(\"Befehl: \")\n    if befehl == \"ENDE\":\n        break\n    if befehl.startswith(\"NEU \"):\n        warteschlange.append(befehl[4:])\n    elif befehl == \"DRUCKEN\":\n        if warteschlange:\n            print(\"Drucke\", warteschlange.pop(0))\n        else:\n            print(\"Keine Aufträge\")\nif warteschlange:\n    print(\"Wartend:\", \", \".join(warteschlange))\nelse:\n    print(\"Wartend: keine\")"
};

test("The catalogue is complete, unique and linked to existing units", () => {
  const content = require("../learning-path.js");
  const ids = practice.exercises.map(item => item.id);
  assert.equal(new Set(ids).size, ids.length);
  assert.deepEqual(Object.keys(reference).sort(), [...ids].sort());
  for (const exercise of practice.exercises) {
    assert.ok(content.units.some(unit => unit.id === exercise.unit), exercise.id);
    assert.ok(practice.levels.includes(exercise.level) && practice.topics.includes(exercise.topic), exercise.id);
    assert.ok(exercise.check.cases.length >= 2, `${exercise.id}: mindestens zwei Testfälle`);
    assert.ok(exercise.instructions.length >= 3 && exercise.hints.length >= 3, exercise.id);
  }
  for (const topic of practice.topics) assert.ok(practice.exercises.some(item => item.topic === topic), topic);
});

test("Every reference solution passes all test cases", () => {
  for (const [id, body] of Object.entries(reference)) passesAll(id, body);
});

test("The unchanged starter code does not pass any exercise", () => {
  for (const exercise of practice.exercises) {
    const results = verdicts(exercise, exercise.starter);
    assert.ok(results.some(result => !result.passed), exercise.id);
  }
});

test("Built-in shortcuts and typical mistakes are rejected with a helpful message", () => {
  failsWith("mitglied-pruefen", "if nummer in mnr:\n    print(\"Zutritt gewährt\")\nelse:\n    print(\"Zutritt verweigert\")", /lineare Suche selbst/);
  failsWith("bubble-zahlenreihe", "for i in range(5):\n    zahlen.append(int(input()))\nfor z in sorted(zahlen):\n    print(z)", /selbst/);
  failsWith("positionen-tauschen", "spieler[position_a - 1], spieler[position_b - 1] = spieler[position_b - 1], spieler[position_a - 1]\nstartaufstellung_ausgeben()", /zwischenspeicher/);
  failsWith("namen-rueckwaerts", "for i in range(n):\n    namen.append(input())\nfor name in namen[::-1]:\n    print(name)", /Slicing/);
  failsWith("gewinnlos-binaer", "for i in range(len(ln_gewinne)):\n    if ln_gewinne[i] == losnr:\n        gefunden = True\nprint(\"Sie haben gewonnen :-)\" if gefunden else \"Sie haben leider nicht gewonnen :-(\")", /index_mitte/);
  failsWith("kfz-steuer", "print(\"Kfz-Steuer:\", hubraum // 100 * 9.5 + (co2 - 95) * 2, \"EUR\")", /letzter Zahlenwert/);
  failsWith("spieler-entfernen", "kader.pop(index)\nkader_ausgeben()", /pop\(\) ohne Index/);
  failsWith("drucker-warteschlange", "while True:\n    befehl = input()\n    if befehl == \"ENDE\":\n        break\n    if befehl.startswith(\"NEU \"):\n        warteschlange.append(befehl[4:])\n    elif befehl == \"DRUCKEN\":\n        print(\"Drucke\", warteschlange.pop() if warteschlange else \"\")\nprint(\"Wartend:\", \", \".join(warteschlange) or \"keine\")", /Ausgabezeile|pop\(0\)/);
});

test("Missing input lines produce an understandable EOF diagnostic", () => {
  const exercise = byId("noten-durchschnitt");
  const result = run(fill(exercise, reference["noten-durchschnitt"]), "2\n3");
  assert.match(result.error, /EOFError/);
  assert.match(checker.diagnostic(result.error), /Eingabe/);
});

test("Comments mentioning forbidden words do not trigger the syntax-tree rules", () => {
  const exercise = byId("bubble-zahlenreihe");
  const code = fill(exercise, "# Wir sortieren ohne sorted() – Bubble Sort\n" + reference["bubble-zahlenreihe"]);
  for (const result of verdicts(exercise, code)) assert.equal(result.passed, true, result.message);
});

test("Tolerant output matching ignores case and punctuation but names the wrong line", () => {
  assert.equal(checker.outputMatches("zutritt GEWÄHRT!", "Zutritt gewährt"), true);
  assert.equal(checker.outputMatches("Durchschnitt: 2,4", "Durchschnitt: 2.4"), true);
  assert.equal(checker.outputMatches("Armin\nSven", "Armin\nBatu"), false);
  assert.match(checker.mismatch("Armin\nSven", "Armin\nBatu"), /Ausgabezeile 2/);
  assert.match(checker.mismatch("Armin", "Armin\nBatu"), /2 nichtleere Ausgabezeilen/);
  assert.equal(checker.lastNumber("Kfz-Steuer: 348.0 EUR"), 348);
  const hints = checker.hints({ starter: "x = 1\n", instructions: ["A", "B", "C"], hints: ["eins", "zwei", "drei"], numericInput: true }, "if x > 1\n    pass\nz = input()", "", 2);
  assert.ok(hints.some(hint => /Doppelpunkt/.test(hint)));
  assert.ok(hints.length <= 3);
});
