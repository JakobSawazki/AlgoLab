const test = require("node:test");
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { join } = require("node:path");
const { execFileSync } = require("node:child_process");

const worker = readFileSync(join(__dirname, "..", "python-worker.js"), "utf8");
const prelude = worker.match(/const tracePrelude = `([\s\S]*?)`;/)[1];
const python = process.env.ALGOLAB_PYTHON || (process.platform === "win32" ? "python" : "python3");
const harness = `import json, sys
sys.stdin.reconfigure(encoding="utf-8")
sys.stdout.reconfigure(encoding="utf-8")
data = json.load(sys.stdin)
exec(data["prelude"])
print(json.dumps(__algolab_trace__(data["code"], {}, data["limit"])))`;
const trace = (code, limit = 300) => JSON.parse(execFileSync(python, ["-c", harness], {
  input: JSON.stringify({ prelude, code, limit }), encoding: "utf8"
}));

test("Function and caller changes keep their own source lines", () => {
  const result = trace("x = 1\ndef double(n):\n    local = n * 2\n    return local\nresult = double(4)\ndel x");
  assert.deepEqual(result, [[[1, "x = 1"], [3, "local = 8"], [5, "result = 8"], [6, "x entfernt"]], false, ""]);
});

test("Recursive calls keep separate values and report the failing inner line", () => {
  const [rows, cut, error] = trace("def visit(n):\n    value = n\n    if n:\n        visit(n - 1)\n    result = 1 // value\nvisit(2)");
  assert.deepEqual(rows.slice(0, 3), [[2, "value = 2"], [2, "value = 1"], [2, "value = 0"]]);
  assert.match(error, /^ZeroDivisionError:/);
  assert.deepEqual(rows.at(-1), [5, error]);
  assert.equal(cut, false);
});

test("Syntax errors keep a line number and a capped trace keeps its final error", () => {
  const [syntax] = trace("x = 2\nif x\n    x = 3");
  assert.equal(syntax[0][0], 2);
  assert.match(syntax[0][1], /^SyntaxError:/);
  const [rows, cut, error] = trace("for i in range(8):\n    value = i\nresult = 1 // 0", 2);
  assert.equal(rows.length, 3);
  assert.equal(cut, true);
  assert.deepEqual(rows.at(-1), [3, error]);
});
