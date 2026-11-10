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

// Ablaufprotokoll für den Editor und die KI-Hilfe. Höchstens 300 Änderungen
// aus dem Programm der Lernenden, dazu gegebenenfalls die Fehlermeldung.
const tracePrelude = `def __algolab_trace__(__source, __namespace, __limit=300):
    import sys as __sys
    __events, __frames, __cut = [], {}, False
    def __show(ns):
        shown = {}
        for key, value in ns.items():
            if key.startswith("__") or callable(value) or type(value).__name__ == "module":
                continue
            try:
                text = repr(value)
            except Exception:
                continue
            text = text if len(text) <= 90 else text[:87] + "..."
            # Kennzeichnet Text, damit z. B. ein vergessenes int() im Protokoll auffällt.
            shown[key] = text + " (Text)" if isinstance(value, str) else text
        return shown
    def __tracer(frame, event, arg):
        nonlocal __cut
        if frame.f_code.co_filename != "<main.py>":
            return None
        ns = frame.f_globals if frame.f_code.co_name == "<module>" else frame.f_locals
        if event == "call":
            __frames[frame] = (None, __show(ns))
            return __tracer
        if event in ("line", "return", "exception"):
            previous_line, previous_values = __frames.get(frame, (None, {}))
            values = __show(ns)
            changes = [f"{key} = {text}" for key, text in values.items() if previous_values.get(key) != text]
            changes += [f"{key} entfernt" for key in previous_values if key not in values]
            if changes and previous_line is not None:
                if len(__events) < __limit:
                    __events.append([previous_line, "; ".join(changes)])
                else:
                    __cut = True
            if event == "return":
                __frames.pop(frame, None)
            else:
                __frames[frame] = (frame.f_lineno if event == "line" else None, values)
        return __tracer
    __error = ""
    __sys.settrace(__tracer)
    try:
        exec(compile(__source, "<main.py>", "exec"), __namespace)
    except Exception as error:
        line = error.lineno if isinstance(error, SyntaxError) else None
        traceback = error.__traceback__
        while traceback:
            if traceback.tb_frame.f_code.co_filename == "<main.py>":
                line = traceback.tb_lineno
            traceback = traceback.tb_next
        __error = f"{type(error).__name__}: {error}"
        __events.append([line, __error])
    finally:
        __sys.settrace(None)
    return [__events, __cut, __error]
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
    if (data.trace === true) {
      python.runPython(tracePrelude, { globals });
      globals.set("__algolab_code__", data.code);
      const result = python.runPython("__algolab_trace__(__algolab_code__, globals())", { globals });
      const [trace, traceTruncated, error] = result.toJs();
      result.destroy();
      self.postMessage({ type: "result", requestId: data.requestId, output, truncated, checks: [], trace, traceTruncated, error });
      return;
    }
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
