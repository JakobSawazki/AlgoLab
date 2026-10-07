(function (root) {
  "use strict";
  function trace(names) {
    const values = names.slice();
    const steps = [{ index: null, output: [], done: false, explanation: `Start: ${values.length} Elemente. Noch kein Name wurde ausgegeben.` }];
    for (let i = 0; i < values.length; i++) {
      steps.push({ index: i, output: values.slice(0, i + 1), done: false, explanation: `i = ${i}: namen[${i}] ist ${values[i]}. Dieser Name wird ausgegeben.` });
    }
    steps.push({ index: null, output: values.slice(), done: true, explanation: values.length ? `Die Grenze ${values.length} wird nicht erreicht. Alle ${values.length} Namen wurden ausgegeben.` : "range(0) liefert keinen Index. Der Schleifenkörper wird nicht ausgeführt." });
    return steps;
  }
  if (typeof module !== "undefined" && module.exports) module.exports = trace;
  else root.traceAlgoLabLoop = trace;
})(globalThis);
