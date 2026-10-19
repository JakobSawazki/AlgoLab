(function (root) {
  "use strict";
  // Schrittmodelle für Arrayoperationen. Jeder Schritt hält den kompletten Zustand fest:
  // values (Feldinhalte), marks (Index → Rolle), vars (Hilfsvariablen), line (Codezeile) und eine Erklärung.
  const show = value => typeof value === "string" ? `"${value}"` : String(value);
  function recorder(values) {
    const steps = [];
    const add = (line, explanation, marks = {}, vars = [], done = false) => steps.push({ values: values.slice(), marks, vars, line, explanation, done });
    return { steps, add };
  }

  function swap(input, a, b) {
    const values = input.slice(), { steps, add } = recorder(values);
    const code = ["zwischenspeicher = liste[b]", "liste[b] = liste[a]", "liste[a] = zwischenspeicher"];
    add(null, `Start: Getauscht werden Index a = ${a} (${show(values[a])}) und Index b = ${b} (${show(values[b])}).`, { [a]: "active", [b]: "active" }, [["a", a], ["b", b], ["zwischenspeicher", "—"]]);
    const temp = values[b];
    add(0, `Der Wert ${show(temp)} von Index ${b} wird in zwischenspeicher gesichert. Das Feld selbst bleibt noch unverändert.`, { [b]: "active" }, [["a", a], ["b", b], ["zwischenspeicher", show(temp)]]);
    values[b] = values[a];
    add(1, `Index ${b} erhält ${show(values[a])} von Index ${a}. Jetzt steht derselbe Wert zweimal im Array – ${show(temp)} existiert nur noch im zwischenspeicher.`, { [b]: "changed", [a]: "active" }, [["a", a], ["b", b], ["zwischenspeicher", show(temp)]]);
    values[a] = temp;
    add(2, `Index ${a} erhält den gesicherten Wert ${show(temp)}. Beide Werte haben ihre Plätze getauscht, keiner ging verloren.`, { [a]: "changed", [b]: "done" }, [["a", a], ["b", b], ["zwischenspeicher", show(temp)]], true);
    return { code, steps };
  }

  function swapWithoutHelper(input, a, b) {
    const values = input.slice(), { steps, add } = recorder(values);
    const code = ["liste[b] = liste[a]", "liste[a] = liste[b]"];
    add(null, `Start: Index a = ${a} (${show(values[a])}) und Index b = ${b} (${show(values[b])}) sollen ohne Hilfsvariable getauscht werden.`, { [a]: "active", [b]: "active" }, [["a", a], ["b", b]]);
    const lost = values[b];
    values[b] = values[a];
    add(0, `Index ${b} wird mit ${show(values[a])} überschrieben. Der alte Wert ${show(lost)} ist jetzt verloren – niemand hat ihn gesichert.`, { [b]: "error" }, [["a", a], ["b", b]]);
    values[a] = values[b];
    add(1, `Index ${a} erhält den Wert von Index ${b}, also wieder ${show(values[a])}. Ergebnis: zweimal derselbe Wert, ${show(lost)} fehlt. Genau deshalb brauchst du einen zwischenspeicher.`, { [a]: "error", [b]: "error" }, [["a", a], ["b", b]], true);
    return { code, steps };
  }

  function insert(input, item, index) {
    const values = input.slice(), { steps, add } = recorder(values);
    const code = ["liste.append(neu)", "for i in range(len(liste) - 1, index, -1):", "    zwischenspeicher = liste[i - 1]", "    liste[i - 1] = liste[i]", "    liste[i] = zwischenspeicher"];
    add(null, `Start: ${show(item)} soll an Index ${index} eingefügt werden. Die Liste hat ${values.length} Elemente.`, {}, [["neu", show(item)], ["index", index]]);
    values.push(item);
    add(0, `append hängt ${show(item)} am Ende an (Index ${values.length - 1}). Die Länge wächst auf ${values.length}.`, { [values.length - 1]: "changed" }, [["neu", show(item)], ["index", index]]);
    if (values.length - 1 === index) add(1, `Index ${index} ist bereits das Ende. range(${values.length - 1}, ${index}, -1) ist leer: Es wird nicht getauscht.`, { [index]: "done" }, [["neu", show(item)], ["index", index]], true);
    for (let i = values.length - 1; i > index; i--) {
      const temp = values[i - 1];
      values[i - 1] = values[i]; values[i] = temp;
      const last = i - 1 === index;
      add(4, `i = ${i}: ${show(values[i - 1])} tauscht mit ${show(temp)} und wandert einen Platz nach vorne auf Index ${i - 1}.${last ? " Der Zielindex ist erreicht; die übrigen Elemente behalten ihre Reihenfolge." : ""}`, { [i - 1]: last ? "done" : "changed", [i]: "active" }, [["i", i], ["zwischenspeicher", show(temp)]], last);
    }
    return { code, steps };
  }

  function remove(input, index) {
    const values = input.slice(), { steps, add } = recorder(values);
    const code = ["for i in range(index, len(liste) - 1):", "    liste[i] = liste[i + 1]", "liste.pop()"];
    add(null, `Start: Das Element ${show(values[index])} an Index ${index} soll entfernt werden.`, { [index]: "error" }, [["index", index]]);
    for (let i = index; i < values.length - 1; i++) {
      values[i] = values[i + 1];
      add(1, `i = ${i}: liste[${i}] erhält ${show(values[i])} von Index ${i + 1}. Das Element rückt einen Platz nach vorne; am Index ${i + 1} steht es vorerst doppelt.`, { [i]: "changed", [i + 1]: "active" }, [["i", i]]);
    }
    if (index === values.length - 1) add(0, `Index ${index} ist das letzte Feld. range(${index}, ${values.length - 1}) ist leer: Nichts muss nachrücken.`, { [index]: "error" }, [["index", index]]);
    const last = values.length - 1;
    add(2, `Das letzte Feld (Index ${last}) ist überzählig. pop() entfernt es; die Länge sinkt auf ${last}. In einem Array fester Größe würdest du dieses Feld stattdessen leeren, z. B. mit "".`, { [last]: "error" }, [["Länge", last]]);
    values.pop();
    add(null, `Fertig: ${values.length} Elemente, alle in ihrer bisherigen Reihenfolge.`, {}, [["Länge", values.length]], true);
    return { code, steps };
  }

  function reverse(input) {
    const values = input.slice(), { steps, add } = recorder(values);
    const code = ["links = 0", "rechts = len(liste) - 1", "while links < rechts:", "    zwischenspeicher = liste[links]", "    liste[links] = liste[rechts]", "    liste[rechts] = zwischenspeicher", "    links = links + 1", "    rechts = rechts - 1"];
    let left = 0, right = values.length - 1;
    add(1, `Start: links = 0, rechts = ${right}. Getauscht wird immer von außen nach innen.`, { [left]: "active", [right]: "active" }, [["links", left], ["rechts", right]]);
    while (left < right) {
      const temp = values[left]; values[left] = values[right]; values[right] = temp;
      add(5, `${show(values[right])} und ${show(values[left])} tauschen über den zwischenspeicher.`, { [left]: "changed", [right]: "changed" }, [["links", left], ["rechts", right], ["zwischenspeicher", show(temp)]]);
      left++; right--;
    }
    add(2, left === right ? `links = rechts = ${left}: Das mittlere Element bleibt an seinem Platz. Die Liste ist umgedreht.` : `links (${left}) ist größer als rechts (${right}): Alle Paare sind getauscht.`, {}, [["links", left], ["rechts", right]], true);
    return { code, steps };
  }

  function bubbleSort(input, optimized = false) {
    const values = input.slice(), { steps, add } = recorder(values);
    const code = optimized
      ? ["laenge = len(zahlen)", "bubble_phasen = 0", "tausch = True", "while tausch:", "    tausch = False", "    bubble_phasen = bubble_phasen + 1", "    for j in range(laenge - bubble_phasen):", "        if zahlen[j] > zahlen[j + 1]:", "            zwischenspeicher = zahlen[j]", "            zahlen[j] = zahlen[j + 1]", "            zahlen[j + 1] = zwischenspeicher", "            tausch = True"]
      : ["laenge = len(zahlen)", "for i in range(1, laenge):", "    for j in range(laenge - i):", "        if zahlen[j] > zahlen[j + 1]:", "            zwischenspeicher = zahlen[j]", "            zahlen[j] = zahlen[j + 1]", "            zahlen[j + 1] = zwischenspeicher"];
    const n = values.length;
    const sortedFrom = phase => Object.fromEntries(Array.from({ length: phase }, (_, k) => [n - 1 - k, "done"]));
    const [compareLine, swapLine, phaseLine] = optimized ? [7, 10, 3] : [3, 6, 1];
    const counter = optimized ? "bubble_phasen" : "i";
    add(0, `Start: ${n} Werte. In jeder Bubble-Phase werden benachbarte Werte verglichen; der größte noch unsortierte Wert „steigt“ wie eine Blase nach rechts auf.`, {}, [["laenge", n]]);
    let comparisons = 0, swaps = 0, phase = 0;
    while (phase < n - 1) {
      phase++;
      let swapped = false;
      for (let j = 0; j < n - phase; j++) {
        comparisons++;
        if (values[j] > values[j + 1]) {
          const temp = values[j]; values[j] = values[j + 1]; values[j + 1] = temp; swaps++; swapped = true;
          add(swapLine, `Bubble-Phase ${phase}, j = ${j}: ${temp} > ${values[j]}? Ja – Tausch.`, { ...sortedFrom(phase - 1), [j]: "changed", [j + 1]: "changed" }, [[counter, phase], ["j", j], ...(optimized ? [["tausch", "True"]] : []), ["Vergleiche", comparisons], ["Tauschvorgänge", swaps]]);
        } else {
          add(compareLine, `Bubble-Phase ${phase}, j = ${j}: ${values[j]} > ${values[j + 1]}? Nein – kein Tausch.`, { ...sortedFrom(phase - 1), [j]: "compare", [j + 1]: "compare" }, [[counter, phase], ["j", j], ...(optimized ? [["tausch", swapped ? "True" : "False"]] : []), ["Vergleiche", comparisons], ["Tauschvorgänge", swaps]]);
        }
      }
      const restSorted = optimized && !swapped;
      add(phaseLine, restSorted ? `Bubble-Phase ${phase} ohne einen einzigen Tausch: Das Array ist sortiert, die Schleife endet vorzeitig.` : `Ende Bubble-Phase ${phase}: Ab Index ${n - phase} ist das Array sortiert.`, restSorted ? Object.fromEntries(values.map((_, k) => [k, "done"])) : sortedFrom(phase), [[counter, phase], ["Vergleiche", comparisons], ["Tauschvorgänge", swaps]]);
      if (restSorted) break;
    }
    add(null, `Sortiert nach ${phase} Bubble-Phase${phase === 1 ? "" : "n"}, ${comparisons} Vergleich${comparisons === 1 ? "" : "en"} und ${swaps} Tauschvorg${swaps === 1 ? "ang" : "ängen"}.${optimized ? "" : ` Ohne Optimierung sind es immer laenge - 1 = ${n - 1} Phasen.`}`, Object.fromEntries(values.map((_, k) => [k, "done"])), [["Bubble-Phasen", phase], ["Vergleiche", comparisons], ["Tauschvorgänge", swaps]], true);
    return { code, steps };
  }

  function selectionSort(input, descending = false) {
    const values = input.slice(), { steps, add } = recorder(values);
    const better = (x, y) => descending ? x > y : x < y;
    const op = descending ? ">" : "<", word = descending ? "größte" : "kleinste", idx = descending ? "max_idx" : "min_idx";
    const code = ["laenge = len(zahlen)", "for akt_idx in range(laenge - 1):", `    ${idx} = akt_idx`, "    for j in range(akt_idx + 1, laenge):", `        if zahlen[j] ${op} zahlen[${idx}]:`, `            ${idx} = j`, `    if akt_idx != ${idx}:`, "        zwischenspeicher = zahlen[akt_idx]", `        zahlen[akt_idx] = zahlen[${idx}]`, `        zahlen[${idx}] = zwischenspeicher`];
    const n = values.length;
    const sortedTo = s => Object.fromEntries(Array.from({ length: s }, (_, k) => [k, "done"]));
    let comparisons = 0;
    add(0, `Start: ${n} Werte. In jedem Durchgang wird der ${word} Wert im unsortierten Bereich gesucht und an dessen Anfang getauscht.`, {}, [["laenge", n]]);
    for (let start = 0; start < n - 1; start++) {
      let pos = start;
      add(2, `akt_idx = ${start}: Der unsortierte Bereich beginnt bei Index ${start}. Vorläufig ist ${values[pos]} der ${word} Wert.`, { ...sortedTo(start), [pos]: "active" }, [["akt_idx", start], [idx, pos]]);
      for (let j = start + 1; j < n; j++) {
        comparisons++;
        if (better(values[j], values[pos])) {
          pos = j;
          add(5, `j = ${j}: ${values[j]} ${op} bisheriger Kandidat? Ja – ${idx} merkt sich Index ${j}.`, { ...sortedTo(start), [pos]: "active" }, [["akt_idx", start], [idx, pos], ["j", j], ["Vergleiche", comparisons]]);
        } else {
          add(4, `j = ${j}: ${values[j]} ${op} ${values[pos]}? Nein – ${idx} bleibt ${pos}.`, { ...sortedTo(start), [pos]: "active", [j]: "compare" }, [["akt_idx", start], [idx, pos], ["j", j], ["Vergleiche", comparisons]]);
        }
      }
      if (pos === start) {
        add(6, `akt_idx == ${idx}: ${values[start]} steht schon richtig, es wird nicht getauscht. Sortiert bis Index ${start}.`, sortedTo(start + 1), [["akt_idx", start], [idx, pos], ["Vergleiche", comparisons]]);
      } else {
        const temp = values[start]; values[start] = values[pos]; values[pos] = temp;
        add(9, `Tausch: ${values[start]} (Index ${pos}) und ${temp} (Index ${start}) wechseln die Plätze. Sortiert bis Index ${start}.`, { ...sortedTo(start + 1), [pos]: "changed" }, [["akt_idx", start], [idx, pos], ["zwischenspeicher", temp], ["Vergleiche", comparisons]]);
      }
    }
    add(null, `Sortiert (${descending ? "absteigend" : "aufsteigend"}) nach ${comparisons} Vergleichen. Das letzte Element muss nicht mehr geprüft werden.`, Object.fromEntries(values.map((_, k) => [k, "done"])), [["Vergleiche", comparisons]], true);
    return { code, steps };
  }

  function linearSearch(input, target, stopEarly = true) {
    const values = input.slice(), { steps, add } = recorder(values);
    const code = stopEarly
      ? ["gefunden = False", "zaehler = 0", "while gefunden == False and zaehler < len(liste):", "    if liste[zaehler] == gesucht:", "        gefunden = True", "    else:", "        zaehler = zaehler + 1"]
      : ["gefunden = False", "for i in range(len(liste)):", "    if liste[i] == gesucht:", "        gefunden = True"];
    const name = stopEarly ? "zaehler" : "i";
    add(0, `Start: Gesucht wird ${show(target)}. gefunden ist False. Die Liste muss für die lineare Suche nicht sortiert sein.`, {}, [["gesucht", show(target)], ["gefunden", "False"]]);
    let foundAt = -1, comparisons = 0;
    for (let i = 0; i < values.length; i++) {
      comparisons++;
      const hit = values[i] === target;
      const before = Object.fromEntries(Array.from({ length: i }, (_, k) => [k, k === foundAt ? "done" : "visited"]));
      if (hit && foundAt < 0) foundAt = i;
      const text = hit
        ? `${name} = ${i}: ${show(values[i])} == ${show(target)}? Ja – gefunden wird True (nach ${comparisons} Vergleich${comparisons === 1 ? "" : "en"}).${stopEarly ? " Die Schleife endet." : " Die for-Schleife prüft trotzdem bis zum Ende weiter."}`
        : `${name} = ${i}: ${show(values[i])} == ${show(target)}? Nein.`;
      add(hit ? 4 : stopEarly ? 6 : 2, text, { ...before, [i]: hit ? "done" : "compare" }, [["gesucht", show(target)], [name, i], ["gefunden", foundAt >= 0 ? "True" : "False"], ["Vergleiche", comparisons]]);
      if (hit && stopEarly) break;
    }
    const found = foundAt >= 0;
    add(null, found ? `Ergebnis: ${show(target)} ist enthalten (Index ${foundAt}). ${comparisons} Vergleich${comparisons === 1 ? "" : "e"}${stopEarly ? "." : ` – ${comparisons - foundAt - 1} davon wären mit einem Abbruch nicht nötig gewesen.`}` : `Ergebnis: Alle ${values.length} Elemente geprüft, ${show(target)} kommt nicht vor. gefunden bleibt False.`, found ? { [foundAt]: "done" } : Object.fromEntries(values.map((_, k) => [k, "visited"])), [["gefunden", found ? "True" : "False"], ["Vergleiche", comparisons]], true);
    return { code, steps };
  }

  function binarySearch(input, target) {
    const values = input.slice(), { steps, add } = recorder(values);
    const code = ["gefunden = False", "index_anfang = 0", "index_ende = len(liste) - 1", "while gefunden == False and index_anfang <= index_ende:", "    index_mitte = (index_anfang + index_ende) // 2", "    if liste[index_mitte] == gesucht:", "        gefunden = True", "    elif liste[index_mitte] > gesucht:", "        index_ende = index_mitte - 1", "    else:", "        index_anfang = index_mitte + 1"];
    let left = 0, right = values.length - 1, count = 0;
    const range = (l, r) => Object.fromEntries(values.map((_, k) => [k, k < l || k > r ? "visited" : "range"]));
    const vars = mid => [["gesucht", show(target)], ["index_anfang", left], ["index_ende", right], ...(mid === undefined ? [] : [["index_mitte", mid]]), ["Vergleiche", count]];
    add(2, `Start: Die Liste ist sortiert. Suchbereich: Index ${left} bis ${right}.`, range(left, right), vars());
    while (left <= right) {
      const mid = Math.floor((left + right) / 2); count++;
      if (values[mid] === target) {
        add(6, `index_mitte = (${left} + ${right}) // 2 = ${mid}: ${show(values[mid])} == ${show(target)}? Ja – gefunden nach ${count} Vergleich${count === 1 ? "" : "en"}!`, { ...range(left, right), [mid]: "done" }, vars(mid), true);
        return { code, steps };
      }
      if (values[mid] > target) {
        add(8, `index_mitte = (${left} + ${right}) // 2 = ${mid}: ${show(values[mid])} > ${show(target)} – das Gesuchte kann nur links davon liegen. index_ende wird ${mid - 1}.`, { ...range(left, right), [mid]: "compare" }, vars(mid));
        right = mid - 1;
      } else {
        add(10, `index_mitte = (${left} + ${right}) // 2 = ${mid}: ${show(values[mid])} < ${show(target)} – das Gesuchte kann nur rechts davon liegen. index_anfang wird ${mid + 1}.`, { ...range(left, right), [mid]: "compare" }, vars(mid));
        left = mid + 1;
      }
      if (left <= right) add(3, `Neuer Suchbereich: Index ${left} bis ${right} – noch ${right - left + 1} Element${right === left ? "" : "e"}.`, range(left, right), vars());
    }
    add(3, `index_anfang (${left}) > index_ende (${right}): Der Suchbereich ist leer. ${show(target)} kommt nicht vor, gefunden bleibt False (${count} Vergleiche).`, range(left, right), vars(), true);
    return { code, steps };
  }

  function countOccurrences(input, target) {
    const values = input.slice(), { steps, add } = recorder(values);
    const code = ["anzahl = 0", "for i in range(len(liste)):", "    if liste[i] == gesucht:", "        anzahl = anzahl + 1"];
    const hits = {};
    let count = 0;
    add(0, `Start: Gezählt wird, wie oft ${show(target)} vorkommt. anzahl beginnt bei 0.`, {}, [["gesucht", show(target)], ["anzahl", 0]]);
    for (let i = 0; i < values.length; i++) {
      const hit = values[i] === target;
      if (hit) { count++; hits[i] = "done"; }
      add(hit ? 3 : 2, hit ? `i = ${i}: ${show(values[i])} == ${show(target)}? Ja – anzahl wird ${count}. Die Suche läuft weiter.` : `i = ${i}: ${show(values[i])} == ${show(target)}? Nein.`, { ...Object.fromEntries(Array.from({ length: i }, (_, k) => [k, hits[k] || "visited"])), [i]: hit ? "done" : "compare" }, [["gesucht", show(target)], ["i", i], ["anzahl", count]]);
    }
    add(null, `Ergebnis: ${show(target)} kommt ${count}-mal vor. Zum Zählen muss jedes Element geprüft werden – ein vorzeitiger Abbruch wäre hier falsch.`, hits, [["anzahl", count]], true);
    return { code, steps };
  }

  const bubbleSortOptimized = values => bubbleSort(values, true);
  const selectionSortDescending = values => selectionSort(values, true);
  const linearSearchAll = (values, target) => linearSearch(values, target, false);
  const models = { swap, swapWithoutHelper, insert, remove, reverse, bubbleSort, bubbleSortOptimized, selectionSort, selectionSortDescending, linearSearch, linearSearchAll, binarySearch, countOccurrences };
  if (typeof module !== "undefined" && module.exports) module.exports = models;
  else root.ALGOLAB_ARRAY_MODELS = models;
})(globalThis);
