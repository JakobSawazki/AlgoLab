(function (root) {
  "use strict";
  // Prüf- und Hinweislogik für den Bereich „Programmieren“ (nach dem Vorbild von PythonLab).
  // Tolerante Ausgabeprüfung: Groß-/Kleinschreibung, Satzzeichen und Zahlformate sind unwichtig,
  // echte Abweichungen werden mit der betroffenen Zeile benannt.
  const normalizeOutput = value => String(value ?? "").replace(/\r\n?/g, "\n").replace(/[ \t]+$/gm, "").trim();
  const outputLines = value => {
    const normalized = normalizeOutput(value);
    return normalized ? normalized.split("\n").map(line => line.trim()).filter(Boolean) : [];
  };
  const numbers = line => (String(line).match(/-?\d+(?:[.,]\d+)?/g) || []).map(value => Number(value.replace(",", ".")));
  const words = line => String(line).normalize("NFKC").toLocaleLowerCase("de-DE")
    .replace(/-?\d+(?:[.,]\d+)?/g, " ").replace(/[.!?,;:'"„“()[\]{}]+/g, " ").replace(/\s+/g, " ").trim();
  const sameNumber = (actual, expected) => Number.isFinite(actual) && Number.isFinite(expected) && Math.abs(actual - expected) < 0.001;

  function lineMatches(actual, expected) {
    const actualNumbers = numbers(actual), expectedNumbers = numbers(expected);
    const actualText = words(actual), expectedText = words(expected);
    if (!expectedNumbers.length) return actualText === expectedText;
    if (expectedNumbers.length === 1 && !expectedText) return sameNumber(actualNumbers.at(-1), expectedNumbers[0]);
    if (actualNumbers.length !== expectedNumbers.length || !expectedNumbers.every((value, index) => sameNumber(actualNumbers[index], value))) return false;
    return !expectedText || actualText === expectedText || actualText.includes(expectedText);
  }
  function outputMatches(actual, expected) {
    const actualLines = outputLines(actual), expectedLines = outputLines(expected);
    return actualLines.length === expectedLines.length && expectedLines.every((line, index) => lineMatches(actualLines[index], line));
  }
  function mismatch(actual, expected) {
    const actualLines = outputLines(actual), expectedLines = outputLines(expected);
    if (actualLines.length !== expectedLines.length) return `Erwartet werden ${expectedLines.length} nichtleere Ausgabezeile${expectedLines.length === 1 ? "" : "n"}, dein Programm erzeugt ${actualLines.length}.`;
    const index = expectedLines.findIndex((line, i) => !lineMatches(actualLines[i], line));
    if (index >= 0) return `Prüfe Ausgabezeile ${index + 1}: Erwartet wird sinngemäß „${expectedLines[index]}“, ausgegeben wurde „${actualLines[index] || "(leer)"}“.`;
    return "Die Ausgabe weicht noch von der Aufgabenstellung ab.";
  }
  const lastNumber = value => {
    const last = outputLines(value).at(-1) || "";
    return numbers(last).at(-1) ?? Number.NaN;
  };

  // Ein Prüffall gilt als bestanden, wenn Ausgabe bzw. Zahlenwert passt und keine Testbedingung fehlschlägt.
  function evaluateCase(check, testCase, result) {
    if (result.error) return { passed: false, message: diagnostic(result.error) };
    if (result.assertion !== undefined) return { passed: false, message: result.assertion || "Eine überprüfte Anforderung ist noch nicht erfüllt." };
    if (testCase.expected !== undefined && check.type !== "number") {
      return outputMatches(result.output, testCase.expected) ? { passed: true } : { passed: false, message: mismatch(result.output, testCase.expected) };
    }
    if (check.type === "number") {
      return sameNumber(lastNumber(result.output), testCase.expected) ? { passed: true } : { passed: false, message: `Erwartet wird als letzter Zahlenwert ${String(testCase.expected).replace(".", ",")}; dein Programm gibt ${Number.isFinite(lastNumber(result.output)) ? String(lastNumber(result.output)).replace(".", ",") : "keine Zahl"} aus.` };
    }
    return { passed: true };
  }

  const errors = [
    ["IndentationError", "Prüfe die Einrückung. Alle Zeilen eines Blocks müssen gleich weit (meist vier Leerzeichen) eingerückt sein."],
    ["SyntaxError", "Python kann die Schreibweise noch nicht lesen. Prüfe Doppelpunkte, Klammern, Anführungszeichen und unvollständige Zuweisungen."],
    ["NameError", "Ein verwendeter Name ist noch nicht definiert oder anders geschrieben. Achte auf Groß- und Kleinschreibung."],
    ["TypeError", "Werte passen hier nicht zusammen, z. B. Text und Zahl. Wandle Eingaben mit int() oder float() um."],
    ["ValueError", "Ein Wert lässt sich nicht wie vorgesehen umwandeln. Prüfe die Eingabe im Reiter „Eingabe“."],
    ["ZeroDivisionError", "Eine Rechnung teilt durch 0. Prüfe den Nenner, z. B. bei einer leeren Liste."],
    ["IndexError", "Ein Index liegt außerhalb der Liste. Die Zählung beginnt bei 0 und endet bei Länge − 1."],
    ["KeyError", "Ein Schlüssel fehlt im Wörterbuch. Prüfe die Schreibweise des Namens."],
    ["AttributeError", "Diese Methode gibt es für den Datentyp nicht. Prüfe Schreibweise und Typ, z. B. liste.append(...)."],
    ["EOFError", "Das Programm wartet auf eine Eingabe, es gibt aber keine weitere Zeile. Ergänze die Eingaben im Reiter „Eingabe“ – je Zeile ein Wert."],
    ["RecursionError", "Eine Funktion ruft sich endlos selbst auf. Prüfe den Abbruchfall."],
    ["gestoppt", "Das Programm lief zu lange. Prüfe, ob deine Schleifenbedingung irgendwann falsch wird."]
  ];
  function diagnostic(errorText) {
    const text = String(errorText || "");
    const assertion = text.match(/AssertionError:\s*([^\n]+)/);
    if (assertion?.[1]) return assertion[1].trim();
    return errors.find(([name]) => text.includes(name))?.[1] || "Lies die letzte Zeile der Fehlermeldung und prüfe die dort genannte Codezeile.";
  }

  function hints(exercise, code, errorText = "", attempt = 1) {
    const list = [];
    const source = String(code || "");
    if (!source.trim() || source.trim() === String(exercise.starter || "").trim()) list.push("Im Startcode fehlen noch eigene Anweisungen. Arbeite die Schritte nacheinander ab.");
    if (/\bpass\b/.test(source)) list.push("pass ist nur ein Platzhalter. Ersetze ihn durch die Anweisungen der Funktion.");
    if (/=\s*(?:#.*)?$/m.test(source)) list.push("Eine Zuweisung endet direkt nach dem Gleichheitszeichen. Rechts davon fehlt noch ein Wert.");
    if (/^[ \t]*(?:if|elif|else|for|while|def)\b[^#\n]*[^:\s#][ \t]*(?:#.*)?$/m.test(source)) list.push("Nach if, elif, else, for, while und def muss ein Doppelpunkt stehen.");
    if (/\bprint[ \t]+[^(\s=]/.test(source)) list.push("print braucht immer Klammern: print(...).");
    if (/input\(/.test(source) && !/(int|float)\(\s*input\(/.test(source) && exercise.numericInput) list.push("input() liefert Text. Für Rechnungen und Vergleiche mit Zahlen brauchst du int(input(...)) oder float(input(...)).");
    if (errorText) list.push(diagnostic(errorText));
    const staged = exercise.hints?.length ? exercise.hints : exercise.instructions || [];
    if (staged.length) list.push(staged[Math.min(Math.max(attempt - 1, 0), staged.length - 1)]);
    return [...new Set(list)].slice(0, 3);
  }

  const api = { normalizeOutput, outputLines, lineMatches, outputMatches, mismatch, lastNumber, evaluateCase, diagnostic, hints };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.ALGOLAB_PRACTICE_CHECK = api;
})(typeof window !== "undefined" ? window : globalThis);
