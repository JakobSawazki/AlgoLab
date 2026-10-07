(function (root) {
  "use strict";
  function createRunner({ makeWorker = () => new Worker("python-worker.js?v=0.6.0", { type: "module" }), onStatus = () => {}, loadTimeout = 60000, runTimeout = 5000 } = {}) {
    let worker, timer, pending, serial = 0, initialized = false;
    function terminate(message = "Ausführung gestoppt.") {
      clearTimeout(timer);
      worker?.terminate(); worker = null; initialized = false;
      if (pending) { const reject = pending.reject; pending = null; reject(new Error(message)); }
    }
    function run(code, checks = []) {
      if (pending) return Promise.reject(new Error("Ein Programm läuft bereits."));
      return new Promise((resolve, reject) => {
        const requestId = ++serial;
        pending = { resolve, reject, requestId };
        function execute() {
          onStatus("Dein Programm läuft …");
          clearTimeout(timer);
          timer = setTimeout(() => terminate("Nach 5 Sekunden gestoppt. Prüfe, ob deine Schleife ein Ende erreicht."), runTimeout);
          worker.postMessage({ type: "run", requestId, code, checks });
        }
        if (!worker) {
          onStatus("Python wird geladen. Beim ersten Start kann das einen Moment dauern …");
          try { worker = makeWorker(); }
          catch { terminate("Python konnte nicht gestartet werden. Lade die Seite neu und versuche es erneut."); return; }
          const activeWorker = worker;
          worker.onerror = () => { if (worker === activeWorker) terminate("Python konnte nicht geladen werden. Prüfe deine Internetverbindung und versuche es erneut."); };
          worker.onmessage = ({ data }) => {
            if (worker !== activeWorker) return;
            if (data.type === "ready") { initialized = true; if (pending) execute(); }
            else if (data.type === "init-error") terminate("Python konnte nicht geladen werden. Prüfe deine Internetverbindung und versuche es erneut.");
            else if (data.type === "result" && pending?.requestId === data.requestId) {
              clearTimeout(timer); const done = pending.resolve; pending = null; done(data);
            }
          };
          timer = setTimeout(() => terminate("Python wurde nicht rechtzeitig geladen. Prüfe deine Internetverbindung und versuche es erneut."), loadTimeout);
        } else if (initialized) execute();
      });
    }
    return { run, stop: terminate };
  }
  if (typeof module !== "undefined" && module.exports) module.exports = createRunner;
  else root.createAlgoLabPythonRunner = createRunner;
})(typeof window !== "undefined" ? window : globalThis);
