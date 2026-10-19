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

  function bubbleSort(input) {
    const values = input.slice(), { steps, add } = recorder(values);
    const code = ["n = len(liste)", "for durchgang in range(n - 1):", "    for i in range(n - 1 - durchgang):", "        if liste[i] > liste[i + 1]:", "            zwischenspeicher = liste[i]", "            liste[i] = liste[i + 1]", "            liste[i + 1] = zwischenspeicher"];
    const n = values.length;
    const sortedFrom = pass => Object.fromEntries(Array.from({ length: pass }, (_, k) => [n - 1 - k, "done"]));
    add(0, `Start: ${n} Werte. In jedem Durchgang werden benachbarte Werte verglichen; der größte noch unsortierte Wert „steigt“ nach rechts.`, {}, [["n", n]]);
    let comparisons = 0, swaps = 0;
    for (let pass = 0; pass < n - 1; pass++) {
      for (let i = 0; i < n - 1 - pass; i++) {
        comparisons++;
        if (values[i] > values[i + 1]) {
          const temp = values[i]; values[i] = values[i + 1]; values[i + 1] = temp; swaps++;
          add(6, `Durchgang ${pass + 1}, i = ${i}: ${temp} > ${values[i]} – die Nachbarn tauschen.`, { ...sortedFrom(pass), [i]: "changed", [i + 1]: "changed" }, [["durchgang", pass], ["i", i], ["Vergleiche", comparisons], ["Tauschvorgänge", swaps]]);
        } else {
          add(3, `Durchgang ${pass + 1}, i = ${i}: ${values[i]} > ${values[i + 1]} ist falsch – kein Tausch.`, { ...sortedFrom(pass), [i]: "compare", [i + 1]: "compare" }, [["durchgang", pass], ["i", i], ["Vergleiche", comparisons], ["Tauschvorgänge", swaps]]);
        }
      }
      add(1, `Durchgang ${pass + 1} beendet: ${values[n - 1 - pass]} steht endgültig an Index ${n - 1 - pass}.`, sortedFrom(pass + 1), [["durchgang", pass], ["Vergleiche", comparisons], ["Tauschvorgänge", swaps]]);
    }
    add(null, `Sortiert nach ${comparisons} Vergleichen und ${swaps} Tauschvorgängen.`, Object.fromEntries(values.map((_, k) => [k, "done"])), [["Vergleiche", comparisons], ["Tauschvorgänge", swaps]], true);
    return { code, steps };
  }

  function selectionSort(input, descending = false) {
    const values = input.slice(), { steps, add } = recorder(values);
    const better = (x, y) => descending ? x > y : x < y;
    const op = descending ? ">" : "<", word = descending ? "größte" : "kleinste";
    const code = ["n = len(liste)", "for start in range(n - 1):", "    pos = start", "    for i in range(start + 1, n):", `        if liste[i] ${op} liste[pos]:`, "            pos = i", "    zwischenspeicher = liste[start]", "    liste[start] = liste[pos]", "    liste[pos] = zwischenspeicher"];
    const n = values.length;
    const sortedTo = s => Object.fromEntries(Array.from({ length: s }, (_, k) => [k, "done"]));
    add(0, `Start: ${n} Werte. In jedem Durchgang wird der ${word} Wert im unsortierten Bereich gesucht und nach vorne gesetzt.`, {}, [["n", n]]);
    for (let start = 0; start < n - 1; start++) {
      let pos = start;
      add(2, `Durchgang ${start + 1}: Der unsortierte Bereich beginnt bei Index ${start}. Vorläufig ist ${values[pos]} der ${word} Wert.`, { ...sortedTo(start), [pos]: "active" }, [["start", start], ["pos", pos]]);
      for (let i = start + 1; i < n; i++) {
        if (better(values[i], values[pos])) {
          pos = i;
          add(5, `i = ${i}: ${values[i]} ${op} bisheriger Kandidat – pos merkt sich jetzt Index ${i}.`, { ...sortedTo(start), [pos]: "active" }, [["start", start], ["pos", pos], ["i", i]]);
        } else {
          add(4, `i = ${i}: ${values[i]} ${op} ${values[pos]} ist falsch – pos bleibt ${pos}.`, { ...sortedTo(start), [pos]: "active", [i]: "compare" }, [["start", start], ["pos", pos], ["i", i]]);
        }
      }
      const temp = values[start]; values[start] = values[pos]; values[pos] = temp;
      add(8, pos === start ? `Der ${word} Wert ${values[start]} steht schon an Index ${start}. Der Tausch mit sich selbst ändert nichts.` : `Tausch: ${values[start]} (Index ${pos}) und ${temp} (Index ${start}) wechseln die Plätze.`, { ...sortedTo(start + 1), [pos]: pos === start ? "done" : "changed" }, [["start", start], ["pos", pos], ["zwischenspeicher", temp]]);
    }
    add(null, `Sortiert: ${descending ? "absteigend" : "aufsteigend"}.`, Object.fromEntries(values.map((_, k) => [k, "done"])), [], true);
    return { code, steps };
  }

  function linearSearch(input, target) {
    const values = input.slice(), { steps, add } = recorder(values);
    const code = ["for i in range(len(liste)):", "    if liste[i] == gesucht:", "        return i", "return -1"];
    add(null, `Start: Gesucht wird ${show(target)}. Die Liste muss dafür nicht sortiert sein.`, {}, [["gesucht", show(target)]]);
    for (let i = 0; i < values.length; i++) {
      const hit = values[i] === target;
      add(hit ? 2 : 1, hit ? `i = ${i}: ${show(values[i])} == ${show(target)} – gefunden! Die Suche endet mit Index ${i} nach ${i + 1} Vergleichen.` : `i = ${i}: ${show(values[i])} == ${show(target)} ist falsch – weiter zum nächsten Element.`, { ...Object.fromEntries(Array.from({ length: i }, (_, k) => [k, "visited"])), [i]: hit ? "done" : "compare" }, [["gesucht", show(target)], ["i", i], ["Vergleiche", i + 1]], hit);
      if (hit) return { code, steps };
    }
    add(3, `Alle ${values.length} Elemente geprüft, ${show(target)} kommt nicht vor. Rückgabe -1 bedeutet „nicht gefunden“.`, Object.fromEntries(values.map((_, k) => [k, "visited"])), [["gesucht", show(target)], ["Vergleiche", values.length]], true);
    return { code, steps };
  }

  function binarySearch(input, target) {
    const values = input.slice(), { steps, add } = recorder(values);
    const code = ["links = 0", "rechts = len(liste) - 1", "while links <= rechts:", "    mitte = (links + rechts) // 2", "    if liste[mitte] == gesucht:", "        return mitte", "    elif liste[mitte] < gesucht:", "        links = mitte + 1", "    else:", "        rechts = mitte - 1", "return -1"];
    let left = 0, right = values.length - 1, count = 0;
    const range = (l, r) => Object.fromEntries(values.map((_, k) => [k, k < l || k > r ? "visited" : "range"]));
    add(1, `Start: Die Liste ist sortiert. Suchbereich: Index ${left} bis ${right}.`, range(left, right), [["gesucht", show(target)], ["links", left], ["rechts", right]]);
    while (left <= right) {
      const mid = Math.floor((left + right) / 2); count++;
      if (values[mid] === target) {
        add(5, `mitte = (${left} + ${right}) // 2 = ${mid}: ${show(values[mid])} == ${show(target)} – gefunden nach ${count} Vergleichen!`, { ...range(left, right), [mid]: "done" }, [["gesucht", show(target)], ["links", left], ["rechts", right], ["mitte", mid], ["Vergleiche", count]], true);
        return { code, steps };
      }
      if (values[mid] < target) {
        add(7, `mitte = ${mid}: ${show(values[mid])} < ${show(target)} – das Gesuchte kann nur rechts liegen. links wird ${mid + 1}.`, { ...range(left, right), [mid]: "compare" }, [["gesucht", show(target)], ["links", left], ["rechts", right], ["mitte", mid], ["Vergleiche", count]]);
        left = mid + 1;
      } else {
        add(9, `mitte = ${mid}: ${show(values[mid])} > ${show(target)} – das Gesuchte kann nur links liegen. rechts wird ${mid - 1}.`, { ...range(left, right), [mid]: "compare" }, [["gesucht", show(target)], ["links", left], ["rechts", right], ["mitte", mid], ["Vergleiche", count]]);
        right = mid - 1;
      }
      if (left <= right) add(2, `Neuer Suchbereich: Index ${left} bis ${right} – nur noch ${right - left + 1} Element${right === left ? "" : "e"}.`, range(left, right), [["gesucht", show(target)], ["links", left], ["rechts", right], ["Vergleiche", count]]);
    }
    add(10, `links (${left}) > rechts (${right}): Der Suchbereich ist leer. ${show(target)} kommt nicht vor, Rückgabe -1.`, range(left, right), [["gesucht", show(target)], ["links", left], ["rechts", right], ["Vergleiche", count]], true);
    return { code, steps };
  }

  const models = { swap, swapWithoutHelper, insert, remove, reverse, bubbleSort, selectionSort, linearSearch, binarySearch };
  if (typeof module !== "undefined" && module.exports) module.exports = models;
  else root.ALGOLAB_ARRAY_MODELS = models;
})(globalThis);
