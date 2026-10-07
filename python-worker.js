import { loadPyodide } from "https://cdn.jsdelivr.net/pyodide/v0.29.4/full/pyodide.mjs";
import "./python-checks.js?v=0.5.0";

const ready = loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.29.4/full/" });
ready.then(() => self.postMessage({ type: "ready" })).catch(error => self.postMessage({ type: "init-error", error: String(error) }));
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
    await python.runPythonAsync(data.code, { globals });
    globals.set("__algolab_source__", data.code);
    globals.set("__algolab_output__", output.trimEnd());
    python.runPython(globalThis.ALGOLAB_CHECK_SETUP, { globals });
    const checks = [];
    for (const expression of data.checks || []) {
      // A structured result is kept separate from the learner's printed output.
      try { checks.push(python.runPython(`bool(${expression})`, { globals }) === true); }
      catch { checks.push(false); }
    }
    self.postMessage({ type: "result", requestId: data.requestId, output, truncated, checks });
  } catch (error) {
    self.postMessage({ type: "result", requestId: data.requestId, output, error: String(error), checks: [] });
  } finally { globals?.destroy(); }
};
