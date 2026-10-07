(function (root) {
  "use strict";
  function trace(values) {
    if (!values.length) return [{ index: null, min: null, max: null, sum: 0, average: null, done: true, explanation: "Keine Werte: Minimum, Maximum und Durchschnitt sind hier nicht definiert. Vor dem Indexzugriff wird abgebrochen." }];
    let min = values[0], max = values[0], sum = 0;
    const steps = [{ index: null, min, max, sum, average: null, done: false, explanation: `Start: Minimum und Maximum erhalten den ersten Wert ${values[0]}. Die Summe startet bei 0.` }];
    for (let i = 0; i < values.length; i++) {
      const value = values[i], decisions = [];
      if (value < min) { decisions.push(`${value} < ${min}: neues Minimum`); min = value; }
      else decisions.push(`${value} < ${min} ist falsch: Minimum bleibt`);
      if (value > max) { decisions.push(`${value} > ${max}: neues Maximum`); max = value; }
      else decisions.push(`${value} > ${max} ist falsch: Maximum bleibt`);
      const previous = sum; sum += value;
      steps.push({ index: i, min, max, sum, average: null, done: false, explanation: `Index ${i}: ${decisions.join(". ")}. Summe: ${previous} + (${value}) = ${sum}.` });
    }
    steps.push({ index: null, min, max, sum, average: sum / values.length, done: true, explanation: `${values.length === 1 ? "Der eine Wert wurde" : `Alle ${values.length} Werte wurden`} geprüft. Durchschnitt: ${sum} / ${values.length} = ${sum / values.length}. Minimum und Maximum stammen aus der Liste.` });
    return steps;
  }
  if (typeof module !== "undefined" && module.exports) module.exports = trace;
  else root.traceAlgoLabAnalysis = trace;
})(globalThis);
