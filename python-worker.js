import { loadPyodide } from "https://cdn.jsdelivr.net/pyodide/v0.29.4/full/pyodide.mjs";

// Die Prüfhelfer werden in derselben Version wie die Seite geladen (…/python-worker.js?v=1.3.0).
const version = new URL(self.location.href).searchParams.get("v") || "dev";
const helpers = import(`./python-checks.js?v=${version}`);
const ready = Promise.all([loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.29.4/full/" }), helpers]).then(([python]) => python);
ready.then(() => self.postMessage({ type: "ready" })).catch(error => self.postMessage({ type: "init-error", error: String(error) }));

// input() liest vorbereitete Zeilen aus dem Reiter „Eingabe“. Beim Starten wird die Eingabe wie in
// einer Konsole hinter der Aufforderung angezeigt; beim Prüfen zählt nur die Ausgabe von print().
const inputPrelude = `def input(prompt=""):
    if not __algolab_inputs__:
        raise EOFError("EOF when reading a line")
    value = str(__algolab_inputs__.pop(0))
    if __algolab_echo__:
        print(f"{prompt}{value}")
    return value
`;

self.onmessage = async ({ data }) => {
  if (data?.type !== "run") return;
  let globals;
  let output = "";
  let truncated = false;
  try {
    const python = await ready;
    const append = value => {
      const chunk = `${value}\n`;
      if (output.length + chunk.length > 12000) truncated = true;
      output += chunk.slice(0, Math.max(0, 12000 - output.length));
    };
    python.setStdout({ batched: append });
    python.setStderr({ batched: append });
    python.setStdin({ stdin: () => null });
    globals = python.runPython("dict()");
    const inputs = typeof data.inputs === "string" && data.inputs.length ? data.inputs.replace(/\r\n?/g, "\n").replace(/\n$/, "").split("\n") : [];
    globals.set("__algolab_inputs__", python.toPy(inputs));
    globals.set("__algolab_echo__", data.echo === true);
    python.runPython(inputPrelude, { globals });
    await python.runPythonAsync(data.code, { globals });
    globals.set("__algolab_source__", data.code);
    globals.set("__algolab_output__", output.trimEnd());
    python.runPython(globalThis.ALGOLAB_CHECK_SETUP, { globals });
    let assertion;
    if (data.testCode) {
      try { await python.runPythonAsync(data.testCode, { globals }); }
      catch (error) {
        const text = String(error);
        if (!/AssertionError/.test(text)) throw error;
        assertion = (text.match(/AssertionError:?[ \t]*([^\n]*)\s*$/) || [])[1]?.trim() || "";
      }
    }
    const checks = [];
    for (const expression of data.checks || []) {
      // A structured result is kept separate from the learner's printed output.
      try { checks.push(python.runPython(`bool(${expression})`, { globals }) === true); }
      catch { checks.push(false); }
    }
    self.postMessage({ type: "result", requestId: data.requestId, output, truncated, checks, assertion });
  } catch (error) {
    self.postMessage({ type: "result", requestId: data.requestId, output, error: String(error), checks: [] });
  } finally { globals?.destroy(); }
};
