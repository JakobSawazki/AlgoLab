const test = require("node:test");
const assert = require("node:assert/strict");
const exam = require("../exam.js");

const task = (examId, taskId) => exam.exams.find(item => item.id === examId).tasks.find(item => item.id === taskId);
const solutionAnswer = item => {
  const spec = item.answer;
  if (spec.type === "fields") return Object.fromEntries(spec.fields.map(field => [field.id, Array.isArray(field.solution) ? field.solution.join(", ") : String(field.solution)]));
  if (spec.type === "table") return { cells: spec.solution.map(row => row.map(String)), ...Object.fromEntries((spec.fields || []).map(field => [field.id, String(field.solution)])) };
  if (spec.type === "rows") return { rows: spec.solution.map(row => row.join(", ")) };
  if (spec.type === "choice") return { choice: spec.correct };
  if (spec.type === "order") return { order: spec.correct };
  if (spec.type === "custom") return { value: spec.example };
  return { revealed: true, criteria: spec.criteria.map((criterion, index) => index) };
};

test("Every practice exam has 30 BE, consistent criteria and full points for the model answers", () => {
  assert.equal(exam.exams.length, 3);
  for (const item of exam.exams) {
    assert.equal(exam.examMax(item), 30, item.id);
    assert.equal(new Set(item.tasks.map(entry => entry.id)).size, item.tasks.length);
    for (const entry of item.tasks) {
      assert.ok(["I", "II", "III"].includes(entry.afb), entry.id);
      // Trennbare Verben: „Stellen Sie … dar“ gehört zum Operator „darstellen“.
      const stem = { darstellen: "stellen sie" }[entry.op.toLowerCase()] || entry.op.toLowerCase().split(" ")[0];
      assert.ok(entry.prompt.toLowerCase().includes(stem), `Operator steht in der Aufgabe ${entry.id}`);
      const result = exam.checkTask(entry, solutionAnswer(entry));
      assert.equal(result.points, entry.be, `${item.id}.${entry.id}`);
      if (entry.answer.type === "open") assert.equal(entry.answer.criteria.reduce((sum, criterion) => sum + criterion.be, 0), entry.be);
    }
  }
  const keys = exam.taskKeys().map(entry => entry.key);
  assert.equal(new Set(keys).size, keys.length);
});

test("Model solutions match a simulation of the Struktogramme in exam A", () => {
  const punkte = [4, 7, 2, 9, 5];
  assert.equal(task("arrays", "ausgabe").answer.fields[0].solution, punkte.reduce((a, b) => a + b, 0));
  assert.equal(task("arrays", "ausgabe").answer.fields[1].solution, punkte.map(value => value > 4 ? "+" : "-").join(""));
  const run = n => { let wert = 1, summe = 0; const rows = []; for (let i = 1; i <= n; i++) { wert *= 2; summe += wert; rows.push([i, i, wert, summe]); } return { rows, summe }; };
  assert.deepEqual(task("arrays", "trace").answer.solution, run(4).rows);
  const n = [...Array(20).keys()].find(value => run(value).summe === 126);
  assert.equal(task("arrays", "rueckwaerts").answer.fields[0].solution, n);
  const hitze = values => values.filter(value => value >= 30).length;
  for (const testCase of task("arrays", "hitzetage").answer.python.check.cases) assert.equal(hitze(testCase.input.split(" ").map(Number)), testCase.expected);
  const endnote = values => (values.reduce((a, b) => a + b, 0) - Math.max(...values) - Math.min(...values)) / 3;
  for (const testCase of task("arrays", "endnote").answer.python.check.cases) assert.ok(Math.abs(endnote(testCase.input.split(" ").map(Number)) - testCase.expected) < 0.001);
  const namen = ["Ada", "Ben", "Cem", "Dana", "Eli"];
  for (let links = 0, rechts = namen.length - 1; links < rechts; links++, rechts--) [namen[links], namen[rechts]] = [namen[rechts], namen[links]];
  assert.deepEqual(task("arrays", "umkehr-ausgabe").answer.fields[0].solution, namen);
  const versand = wert => wert >= 20 ? 2.9 : wert >= 50 ? 0 : 4.9;
  assert.equal(task("arrays", "versand-ausgabe").answer.fields[0].solution, versand(80));
});

test("Sorting and searching solutions in exam B follow the algorithms", () => {
  const phases = values => { const sorter = exam.bubblePhase(values); return [0, 1, 2].map(phase => sorter.run(phase)); };
  assert.deepEqual(task("sortieren", "bubble-phasen").answer.solution, phases([6, 3, 8, 2, 5]));
  const names = ["Mia", "Ben", "Zoe", "Ida", "Tom"], swaps = [];
  let comparisons = 0;
  for (let phase = 0; phase < names.length - 1; phase++) for (let j = 0; j < names.length - 1 - phase; j++) {
    comparisons++;
    if (names[j].localeCompare(names[j + 1]) > 0) { [names[j], names[j + 1]] = [names[j + 1], names[j]]; swaps.push([...names]); }
  }
  assert.deepEqual(task("sortieren", "bubble-tabelle").answer.solution, swaps);
  assert.deepEqual(task("sortieren", "bubble-zaehlen").answer.fields.map(field => field.solution), [comparisons, swaps.length]);
  const selection = values => { const result = [...values], rows = []; for (let akt = 0; akt < result.length - 1; akt++) { let min = akt; for (let j = akt + 1; j < result.length; j++) if (result[j] < result[min]) min = j; [result[akt], result[min]] = [result[min], result[akt]]; rows.push([...result]); } return rows; };
  assert.deepEqual(task("sortieren", "selection-phasen").answer.solution, selection([7, 4, 9, 1, 6]).slice(0, 3));
  const search = (values, target) => { const rows = []; let links = 0, rechts = values.length - 1, durchlauf = 0; while (links <= rechts) { const mitte = Math.floor((links + rechts) / 2); rows.push([++durchlauf, links, rechts, mitte, values[mitte]]); if (values[mitte] === target) return { rows, index: mitte }; if (target > values[mitte]) links = mitte + 1; else rechts = mitte - 1; } return { rows, index: -1 }; };
  const zahlen = [3, 8, 12, 17, 21, 26, 30, 34, 41];
  const found = search(zahlen, 34);
  assert.deepEqual(task("sortieren", "binaer-tabelle").answer.solution, found.rows);
  assert.equal(task("sortieren", "binaer-tabelle").answer.fields[0].solution, found.index);
  assert.equal(task("sortieren", "binaer-fehlt").answer.fields[0].solution, search(zahlen, 5).rows.length);
  assert.equal(task("sortieren", "suche-vergleich").answer.fields[1].solution, Math.floor(Math.log2(1000)) + 1);
});

test("Bubble design and stack commands are checked by simulation", () => {
  const design = task("sortieren", "bubble-entwurf");
  assert.equal(exam.checkTask(design, { value: "2, 3, 1, 4, 5" }).points, 2);
  assert.match(exam.checkTask(design, { value: "1 3 2 5 4" }).message, /Phase 1 .* sortiert/);
  assert.match(exam.checkTask(design, { value: "5, 4, 3, 2, 1" }).message, /Phase 2 .* unsortiert/);
  assert.match(exam.checkTask(design, { value: "1, 2" }).message, /genau fünf/);
  const stack = task("datenstrukturen", "stapel-befehle");
  assert.equal(exam.checkTask(stack, { value: "push(\"Cola\")\nstapel.push('Wasser')\npush(Saft)" }).points, 2);
  assert.equal(exam.checkTask(stack, { value: "push(\"Saft\")\npush(\"Wasser\")\npush(\"Cola\")" }).points, 0);
  assert.match(exam.checkTask(stack, { value: "pop()" }).message, /leeren Stapel/);
  assert.match(exam.checkTask(stack, { value: "add(Cola)" }).message, /kenne ich nicht/);
});

test("Queue, stack, linked list and tree answers in exam C follow the rules", () => {
  const events = task("datenstrukturen", "queue-person").events, queues = { TK: [], LK: [] }, served = {}, violations = [], waiting = {};
  for (const [time, command] of events) {
    const [, name, action, value] = command.match(/^(\w+)\.(enqueue|dequeue)\("?([^")]*)"?\)$/);
    if (action === "enqueue") queues[name].push(value);
    else { if (name === "LK" && queues.TK.length) violations.push(time); served[time] = queues[name].shift(); }
    waiting[time] = [...queues.LK];
  }
  assert.equal(task("datenstrukturen", "queue-person").answer.fields[0].solution, served["9:14"]);
  assert.deepEqual(task("datenstrukturen", "queue-warten").answer.fields[0].solution, waiting["9:18"]);
  const choice = task("datenstrukturen", "queue-pruefen").answer;
  assert.deepEqual(violations, ["9:12"]);
  assert.match(choice.options[choice.correct], /9:12/);
  const stack = [], popped = [];
  for (const command of ["push Rot", "push Blau", "push Grün", "pop", "push Gelb", "push Weiß", "pop", "pop"]) { const [action, value] = command.split(" "); if (action === "push") stack.push(value); else popped.push(stack.pop()); }
  assert.deepEqual(task("datenstrukturen", "stapel-entnahme").answer.fields[0].solution, popped);
  assert.deepEqual(task("datenstrukturen", "stapel-inhalt").answer.fields[0].solution, [...stack].reverse());
  const nodes = Object.fromEntries(task("datenstrukturen", "liste-zeiger").answer.solution.map(([address, content, next]) => [address, { content, next }]));
  const order = [];
  for (let address = "A1"; address !== "null"; address = nodes[address].next) order.push(nodes[address].content);
  assert.deepEqual(order, ["Intro", "Strophe", "Refrain", "Outro"]);
  const tree = task("datenstrukturen", "baum-eigenschaften").tree;
  const kids = node => [node.links, node.rechts].filter(Boolean);
  const all = node => [node, ...kids(node).flatMap(all)];
  const leaves = (node, depth = 0) => kids(node).length ? kids(node).flatMap(kid => leaves(kid, depth + 1)) : [depth];
  const sorted = (node, low = -Infinity, high = Infinity) => node.inhalt > low && node.inhalt < high && (!node.links || sorted(node.links, low, node.inhalt)) && (!node.rechts || sorted(node.rechts, node.inhalt, high));
  const voll = all(tree).every(node => kids(node).length !== 1);
  const expected = { voll: voll ? "ja" : "nein", vollstaendig: voll && new Set(leaves(tree)).size === 1 ? "ja" : "nein", sortiert: sorted(tree) ? "ja" : "nein" };
  assert.deepEqual(Object.fromEntries(task("datenstrukturen", "baum-eigenschaften").answer.fields.map(field => [field.id, field.solution])), expected);
  const values = [5, 12, 18, 23, 31, 40, 47], levels = [[values[3]], [values[1], values[5]], [values[0], values[2], values[4], values[6]]];
  assert.deepEqual(task("datenstrukturen", "baum-entwurf").answer.fields.map(field => field.solution), levels);
});

test("Answers are compared tolerantly and scored as in an exam", () => {
  const output = task("arrays", "ausgabe");
  assert.equal(exam.checkTask(output, { a: " 27 ", b: "„-+-++“" }).points, 3);
  assert.equal(exam.checkTask(output, { a: "27", b: "+-+--" }).points, 1);
  const trace = task("arrays", "trace");
  assert.equal(exam.checkTask(trace, { cells: [[1, 1, 2, 2], [2, 2, 4, 6], [3, 3, 8, 14], [4, 4, 16, 31]].map(row => row.map(String)) }).points, 3);
  const list = task("datenstrukturen", "liste-zeiger");
  assert.equal(exam.checkTask(list, { cells: [["", "", "A4"], ["", "", "kein"], ["", "", "a2"], ["", "", " A3 "]] }).points, 4);
  const rows = task("sortieren", "bubble-tabelle");
  const answer = solutionAnswer(rows);
  assert.equal(exam.checkTask(rows, { rows: [...answer.rows, "Ben, Ida, Mia, Tom, Zoe"] }).points, 3, "Eine zusätzliche Zeile kostet einen Punkt");
  assert.equal(exam.checkTask(rows, { rows: answer.rows.map(row => row.replaceAll(",", " ")) }).points, 4, "Leerzeichen trennen ebenfalls");
  const open = task("arrays", "hitzetage");
  assert.equal(exam.checkTask(open, { criteria: [0, 1, 2, 3, 4] }).points, 0, "Erst nach dem Aufdecken des Erwartungshorizonts zählen Punkte");
  assert.equal(exam.checkTask(open, { revealed: true, criteria: [0, 1] }).points, 3);
  assert.deepEqual(exam.parseSeq("[Eli, Dana] "), ["Eli", "Dana"]);
  assert.equal(exam.sameSeq("2 3 5 6 8", [2, 3, 5, 6, 8]), true);
});

test("Points map to the linear Abitur scale and every operator has an AFB", () => {
  assert.equal(exam.notenpunkte(100), 15);
  assert.equal(exam.notenpunkte(95), 15);
  assert.equal(exam.notenpunkte(94.9), 14);
  assert.equal(exam.notenpunkte(50), 6);
  assert.equal(exam.notenpunkte(33), 3);
  assert.equal(exam.notenpunkte(19.9), 0);
  assert.ok(exam.operators.every(entry => entry.afb && entry.meaning && entry.example));
  for (const item of exam.operatorQuiz) assert.ok(item.correct >= 0 && item.correct < item.options.length && item.why);
  assert.ok(exam.strategy.length >= 6 && exam.format.length === 4);
});
