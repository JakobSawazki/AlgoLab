(function (root) {
  "use strict";
  // Modelle für dynamische Datenstrukturen (L3). Jeder Schritt hält den vollständigen Zustand fest.
  const clone = value => JSON.parse(JSON.stringify(value));

  // ---------- Verkettete Liste: Knoten mit Daten und Zeiger, Anker zeigt auf den Listenkopf ----------
  function listState(entries) {
    const nodes = {};
    entries.forEach(([id, data], index) => { nodes[id] = { data, next: entries[index + 1]?.[0] ?? null }; });
    return { anchor: entries[0]?.[0] ?? null, nodes };
  }
  function listRecorder(state) {
    const steps = [];
    const add = (explanation, marks = {}, done = false, op = "") => steps.push({ structure: clone(state), marks, explanation, done, op });
    return { steps, add };
  }
  function predecessor(state, id) {
    return Object.keys(state.nodes).find(key => state.nodes[key].next === id) ?? null;
  }
  function chain(state) {
    const order = [];
    for (let id = state.anchor, guard = 0; id !== null && guard < 50; id = state.nodes[id].next, guard++) order.push(id);
    return order;
  }

  function withLines(trace, lines) {
    trace.steps.forEach((step, index) => { step.line = lines[index] ?? null; });
    return trace;
  }

  function listInsert(entries, afterId, newId, data, wrongOrder = false) {
    const state = listState(entries), { steps, add } = listRecorder(state);
    const nextId = afterId === null ? state.anchor : state.nodes[afterId].next;
    const where = afterId === null ? "am Anfang der Liste" : nextId === null ? "am Ende der Liste" : `zwischen ${afterId} und ${nextId}`;
    add(`Start: Der Knoten ${newId} („${data}“) soll ${where} eingefügt werden.`, afterId ? { [afterId]: "active" } : {});
    state.nodes[newId] = { data, next: null };
    add(`Einen neuen Knoten ${newId} erstellen. Sein Zeiger ist noch NULL; ${newId} gehört noch nicht zur Liste.`, { [newId]: "changed" }, false, "neu");
    const linkNew = () => {
      state.nodes[newId].next = nextId;
      add(nextId === null ? `Zeiger von ${newId} erhält NULL – ${newId} wird das neue Listenende.` : `Zeiger von ${newId} erhält die Adresse von ${nextId}. Der Rest der Liste ist jetzt auch über ${newId} erreichbar.`, { [newId]: "changed", ...(nextId ? { [nextId]: "active" } : {}) }, false, "zeiger");
    };
    const linkPrev = () => {
      const lostId = afterId === null ? state.anchor : state.nodes[afterId].next;
      if (afterId === null) state.anchor = newId; else state.nodes[afterId].next = newId;
      const lost = wrongOrder && lostId !== null && state.nodes[newId].next !== lostId;
      add(afterId === null
        ? `Der Anker erhält die Adresse von ${newId}. ${newId} ist der neue Listenkopf.`
        : lost
          ? `Zeiger von ${afterId} erhält die Adresse von ${newId}. Die bisherige Adresse von ${lostId} ist damit überschrieben – niemand zeigt mehr auf ${lostId}!`
          : `Zeiger von ${afterId} erhält die Adresse von ${newId}. Damit ist ${newId} in die Liste eingehängt.`, { [afterId ?? newId]: lost ? "error" : "changed", [newId]: "changed" }, false, "zeiger");
    };
    if (wrongOrder) {
      linkPrev();
      const target = state.nodes[afterId].next === newId ? null : nextId;
      state.nodes[newId].next = target;
      add(`Jetzt soll ${newId} auf den Nachfolger zeigen – aber dessen Adresse ist nirgends mehr gespeichert. ${newId} zeigt auf NULL, alle Knoten ab ${nextId} sind verloren. Deshalb gilt: immer zuerst den Zeiger des neuen Knotens setzen.`, { [newId]: "error", ...(nextId ? { [nextId]: "error" } : {}) }, true, "fehler");
      return withLines({ kind: "list", code: ["Neuen Knoten erstellen", afterId === null ? "Anker → neuer Knoten (zu früh!)" : "Zeiger des Vorgängers → neuer Knoten (zu früh!)", "Zeiger des neuen Knotens → Nachfolger?"], steps }, [null, 0, 1, 2]);
    }
    linkNew();
    linkPrev();
    add(`Fertig: ${chain(state).length} Knoten. Es wurden nur zwei Zeiger verändert – kein Element musste verschoben werden.`, { [newId]: "done" }, true);
    return withLines({ kind: "list", code: ["Neuen Knoten erstellen", "Zeiger des neuen Knotens → Nachfolger (bzw. NULL)", afterId === null ? "Anker → neuer Knoten" : "Zeiger des Vorgängers → neuer Knoten"], steps }, [null, 0, 1, 2, null]);
  }

  function listDelete(entries, id) {
    const state = listState(entries), { steps, add } = listRecorder(state);
    const prev = predecessor(state, id), next = state.nodes[id].next;
    add(`Start: Der Knoten ${id} („${state.nodes[id].data}“) soll gelöscht werden.`, { [id]: "error" });
    if (prev === null) {
      state.anchor = next;
      add(`Der Anker erhält die Adresse aus dem Zeiger von ${id}${next ? ` (also ${next})` : " (NULL – die Liste ist leer)"}.`, { [id]: "error", ...(next ? { [next]: "changed" } : {}) }, false, "zeiger");
    } else {
      state.nodes[prev].next = next;
      add(next === null ? `Zeiger von ${prev} erhält NULL. ${prev} ist das neue Listenende.` : `Zeiger von ${prev} erhält die Adresse aus dem Zeiger von ${id}, also ${next}. Die Liste „überspringt“ ${id}.`, { [prev]: "changed", [id]: "error" }, false, "zeiger");
    }
    add(`${id} ist nicht mehr erreichbar. Der Knoten liegt noch im Speicher, wird aber später automatisch entfernt.`, { [id]: "error" }, false, "verwaist");
    delete state.nodes[id];
    add(`Fertig: ${chain(state).length} Knoten. Wieder genügte ein einziger geänderter Zeiger.`, {}, true);
    return withLines({ kind: "list", code: ["Vorgänger (bzw. Anker) bestimmen", prev === null ? "Anker → Nachfolger des gelöschten Knotens" : "Zeiger des Vorgängers → Nachfolger des gelöschten Knotens", "Gelöschter Knoten ist nicht mehr erreichbar"], steps }, [0, 1, 2, null]);
  }

  function listTraverse(entries) {
    const state = listState(entries), { steps, add } = listRecorder(state);
    add("Start: Der Durchlauf beginnt beim Anker. Er kennt nur die Adresse des Listenkopfs.", {});
    const visited = [];
    for (let id = state.anchor; id !== null; id = state.nodes[id].next) {
      visited.push(state.nodes[id].data);
      add(`${id}: Daten „${state.nodes[id].data}“ lesen. Der Zeiger führt ${state.nodes[id].next ? `zu ${state.nodes[id].next}` : "zu NULL"}.`, { ...Object.fromEntries(visited.slice(0, -1).map((_, k) => [chain(state)[k], "visited"])), [id]: "active" });
    }
    add(`NULL erreicht: Alle ${visited.length} Knoten wurden in Listenreihenfolge besucht: ${visited.join(" → ")}. Einen direkten Zugriff wie liste[3] gibt es nicht.`, {}, true);
    return withLines({ kind: "list", code: ["Beim Anker beginnen", "Daten des aktuellen Knotens lesen", "Dem Zeiger zum nächsten Knoten folgen", "Bei NULL aufhören"], steps }, steps.map((_, i) => i === 0 ? 0 : i === steps.length - 1 ? 3 : 1));
  }

  // ---------- Stapelspeicher (LIFO) und Warteschlange (FIFO) ----------
  function runContainer(kind, start, operations) {
    const items = start.slice(), steps = [], out = [];
    const isStack = kind === "stack";
    steps.push({ structure: { items: items.slice(), out: out.slice() }, marks: {}, op: "", explanation: items.length ? `Start: ${items.length} Element${items.length === 1 ? "" : "e"} ${isStack ? "liegen im Stapel" : "warten in der Schlange"}.` : `Start: ${isStack ? "Der Stapel" : "Die Warteschlange"} ist leer.`, done: false });
    operations.forEach((operation, index) => {
      const [name, value] = operation;
      let explanation, marks = {};
      if (name === "push" || name === "enqueue") {
        items.push(value);
        marks = { [items.length - 1]: "changed" };
        explanation = isStack ? `PUSH("${value}"): „${value}“ wird oben auf den Stapel gelegt.` : `ENQUEUE("${value}"): „${value}“ stellt sich hinten an.`;
      } else if (!items.length) {
        explanation = `${isStack ? "POP()" : "DEQUEUE()"} auf ${isStack ? "einen leeren Stapel" : "eine leere Schlange"}: Es gibt nichts zu entnehmen. Ein Programm muss diesen Fall abfangen.`;
        marks = {};
      } else {
        const taken = isStack ? items.pop() : items.shift();
        out.push(taken);
        explanation = isStack ? `POP(): Das oberste Element „${taken}“ wird entnommen – es kam zuletzt hinein.` : `DEQUEUE(): Das vorderste Element „${taken}“ verlässt die Schlange – es wartete am längsten.`;
        marks = { taken };
      }
      steps.push({ structure: { items: items.slice(), out: out.slice() }, marks, op: `${index + 1}. ${name.toUpperCase()}(${value === undefined ? "" : `"${value}"`})`, explanation, done: index === operations.length - 1 });
    });
    if (!operations.length) steps[0].done = true;
    const code = operations.map(([name, value]) => `${name.toUpperCase()}(${value === undefined ? "" : `"${value}"`})`);
    return withLines({ kind, code, steps }, steps.map((_, i) => i === 0 ? null : i - 1));
  }
  const stack = (start, operations) => runContainer("stack", start, operations);
  const queue = (start, operations) => runContainer("queue", start, operations);
  // Kurzschreibweise für Tastenfolgen: Zeichen = PUSH, "⌫" = POP.
  const typing = keys => stack([], keys.map(key => key === "⌫" ? ["pop"] : ["push", key]));

  // ---------- Bäume ----------
  // Binärbaum als Tabelle: [{ inhalt, links, rechts }] mit Indizes oder null; allgemeiner Baum: { inhalt, kinder: [...] }.
  function fromTable(rows) {
    const build = index => index === null || index === undefined ? null : { inhalt: rows[index].inhalt, index, links: build(rows[index].links), rechts: build(rows[index].rechts) };
    return rows.length ? build(0) : null;
  }
  function analyseTree(tree) {
    const nodes = [];
    const walk = (node, depth, parent) => {
      const children = node.kinder ? node.kinder : [node.links, node.rechts].filter(Boolean);
      nodes.push({ inhalt: node.inhalt, depth, parent, children: children.map(child => child.inhalt), node });
      children.forEach(child => walk(child, depth + 1, node.inhalt));
    };
    if (tree) walk(tree, 1, null);
    const binary = nodes.every(n => n.children.length <= 2) && !nodes.some(n => n.node.kinder);
    const leaves = nodes.filter(n => !n.children.length);
    const full = binary && nodes.every(n => n.children.length === 0 || n.children.length === 2);
    const complete = full && new Set(leaves.map(n => n.depth)).size <= 1;
    const inorder = [];
    const visit = node => { if (!node) return; visit(node.links); inorder.push(node.inhalt); visit(node.rechts); };
    if (binary) visit(tree);
    const sorted = binary && inorder.every((value, i) => i === 0 || inorder[i - 1] < value);
    const wide = nodes.find(n => n.children.length > 2);
    const single = nodes.find(n => n.children.length === 1);
    const depths = [...new Set(leaves.map(n => n.depth))].sort();
    const unsortedAt = binary && !sorted ? inorder.findIndex((value, i) => i > 0 && inorder[i - 1] >= value) : -1;
    return {
      nodes, leaves: leaves.map(n => n.inhalt), height: Math.max(0, ...nodes.map(n => n.depth)), root: tree?.inhalt ?? null,
      binary, full, complete, sorted,
      reasons: {
        binary: binary ? "Jeder Knoten hat höchstens zwei Kinder; linkes und rechtes Kind werden unterschieden." : `${wide ? `Der Knoten ${wide.inhalt} hat ${wide.children.length} Kinder.` : "Linkes und rechtes Kind werden nicht unterschieden."}`,
        full: !binary ? "Voll ist nur für Binärbäume definiert." : full ? "Jeder Knoten ist ein Blatt oder hat genau zwei Kinder." : `Der Knoten ${single.inhalt} hat nur ein Kind.`,
        complete: !binary ? "Vollständig ist nur für Binärbäume definiert." : !full ? "Ein vollständiger Baum muss zuerst voll sein." : complete ? `Der Baum ist voll und alle Blätter liegen auf Höhe ${depths[0]}.` : `Die Blätter liegen auf verschiedenen Höhen (${depths.join(" und ")}).`,
        sorted: !binary ? "Sortiert (binärer Suchbaum) ist nur für Binärbäume definiert." : sorted ? "Für jeden Knoten sind links nur kleinere, rechts nur größere Inhalte." : `Von links nach rechts gelesen folgt ${inorder[unsortedAt]} auf ${inorder[unsortedAt - 1]} – die Ordnung ist verletzt.`
      }
    };
  }

  const models = { listInsert, listInsertWrong: (entries, afterId, newId, data) => listInsert(entries, afterId, newId, data, true), listDelete, listTraverse, stack, queue, typing, fromTable, analyseTree, chain };
  if (typeof module !== "undefined" && module.exports) module.exports = models;
  else root.ALGOLAB_DS_MODELS = models;
})(globalThis);
