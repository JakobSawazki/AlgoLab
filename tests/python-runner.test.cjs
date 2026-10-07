const test = require("node:test");
const assert = require("node:assert/strict");
const createRunner = require("../python-runner.js");
function fixture(options = {}) {
  const workers = [];
  const runner = createRunner({ ...options, makeWorker: () => {
    const worker = { terminated: false, sent: [], postMessage(message) { this.sent.push(message); }, terminate() { this.terminated = true; }, send(data) { this.onmessage({ data }); } };
    workers.push(worker); return worker;
  } });
  return { runner, workers };
}
test("Runs await initialization, ignore unrelated results and reuse a ready worker", async () => {
  const { runner, workers } = fixture();
  const first = runner.run("print(1)"); const worker = workers[0];
  assert.equal(worker.sent.length, 0);
  worker.send({ type: "ready" });
  worker.send({ type: "result", requestId: 999, output: "wrong" });
  worker.send({ type: "result", requestId: worker.sent[0].requestId, output: "1" });
  assert.equal((await first).output, "1");
  const second = runner.run("print(2)");
  assert.equal(workers.length, 1);
  assert.equal(worker.sent[1].code, "print(2)");
  worker.send({ type: "result", requestId: worker.sent[1].requestId, output: "2" });
  assert.equal((await second).output, "2"); runner.stop();
});
test("Stopping terminates computation and a new run creates a fresh worker", async () => {
  const { runner, workers } = fixture();
  const pending = runner.run("while True: pass");
  const rejected = assert.rejects(pending, /gestoppt/);
  workers[0].send({ type: "ready" }); runner.stop(); await rejected;
  assert.equal(workers[0].terminated, true);
  const next = runner.run("print(3)"); const stopped = assert.rejects(next, /gestoppt/);
  assert.equal(workers.length, 2); runner.stop(); await stopped;
});
test("Late messages from a stopped worker cannot execute code on its replacement", async () => {
  const { runner, workers } = fixture();
  const first = runner.run("print('old')"); const rejected = assert.rejects(first, /gestoppt/);
  runner.stop(); await rejected;
  const second = runner.run("print('new')"); const worker = workers[1];
  workers[0].send({ type: "ready" });
  assert.equal(worker.sent.length, 0);
  worker.send({ type: "ready" });
  assert.equal(worker.sent[0].code, "print('new')");
  worker.send({ type: "result", requestId: worker.sent[0].requestId, output: "new" });
  assert.equal((await second).output, "new"); runner.stop();
});
test("Run timeouts and load failures release the pending request", async () => {
  const { runner, workers } = fixture({ runTimeout: 15 });
  const pending = runner.run("while True: pass"); workers[0].send({ type: "ready" });
  await assert.rejects(pending, /5 Sekunden/); assert.equal(workers[0].terminated, true);
  const failing = runner.run("print(0)");
  workers[1].send({ type: "init-error" }); await assert.rejects(failing, /nicht geladen/);
});
