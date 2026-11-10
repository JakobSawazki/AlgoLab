(function (root) {
  "use strict";

  const colors = ["yellow", "mint", "coral", "green"];
  const inks = ["#192f49", "#235fa1", "#14745c", "#a23c3c"];
  const widths = [3, 7, 14];
  const maxMarks = 1000;
  const maxQuote = 500;
  const maxText = 12000;
  const maxStrokes = 120;
  const maxPoints = 6000;
  const maxTotalPoints = 30000;
  const pointCount = strokes => strokes.reduce((sum, stroke) => sum + stroke.points.length, 0);
  const markCount = pages => Object.values(pages).reduce((sum, marks) => sum + marks.length, 0);
  const blankNote = () => ({ text: "", strokes: [] });
  const validPoint = point => Array.isArray(point) && point.length === 2
    && point.every(value => Number.isInteger(value) && value >= 0 && value <= 1000);

  const validRoute = (route, ids) => /^(home|path|progress|selfcheck|glossar|programmieren|struktogramme|klausur)(\/[a-z0-9_.-]{1,80})?$/i.test(route)
    || (route.startsWith("unit/") && ids.has(route.slice(5)));

  function normalize(raw, unitIds) {
    const highlights = {};
    const notes = {};
    const ids = new Set(unitIds);
    const savedHighlights = raw?.highlights;
    const pages = savedHighlights && typeof savedHighlights === "object" && !Array.isArray(savedHighlights) ? savedHighlights : {};
    let marksLeft = maxMarks;
    for (const [route, marks] of Object.entries(pages)) {
      if (!marksLeft) break;
      if (!validRoute(route, ids) || !Array.isArray(marks)) continue;
      const valid = marks.slice(0, maxMarks).filter(mark => mark && colors.includes(mark.color)
        && typeof mark.block === "string" && /^[a-z0-9]+:\d+$/.test(mark.block)
        && Number.isInteger(mark.start) && mark.start >= 0 && mark.start < 100000
        && typeof mark.quote === "string" && mark.quote.length > 0 && mark.quote.length <= maxQuote
        && mark.end === mark.start + mark.quote.length).slice(0, marksLeft);
      if (valid.length) highlights[route] = valid.map(({ block, start, end, quote, color }) => ({ block, start, end, quote, color }));
      marksLeft -= valid.length;
    }

    let pointsLeft = maxTotalPoints;
    for (const id of ["general", ...ids]) {
      const note = raw?.notes?.[id];
      if (!note || typeof note !== "object") continue;
      const text = typeof note.text === "string" ? note.text.slice(0, maxText) : "";
      const strokes = [];
      let pagePoints = 0;
      for (const stroke of Array.isArray(note.strokes) ? note.strokes.slice(0, maxStrokes) : []) {
        if (!stroke || !["pen", "erase"].includes(stroke.tool) || !inks.includes(stroke.color)
          || !widths.includes(stroke.width) || !Array.isArray(stroke.points)
          || stroke.points.length < 1 || stroke.points.length > maxPoints
          || !stroke.points.every(validPoint)) continue;
        const count = stroke.points.length;
        if (pagePoints + count > maxPoints || count > pointsLeft) break;
        strokes.push({ tool: stroke.tool, color: stroke.color, width: stroke.width, points: stroke.points });
        pagePoints += count;
        pointsLeft -= count;
      }
      if (text || strokes.length) notes[id] = { text, strokes };
    }
    return { highlights, notes };
  }

  function replaceMarks(existing, anchors, color) {
    let result = existing;
    for (const anchor of anchors) {
      const kept = [];
      for (const mark of result) {
        if (mark.block !== anchor.block || mark.end <= anchor.start || mark.start >= anchor.end) {
          kept.push(mark);
          continue;
        }
        if (mark.start < anchor.start) {
          kept.push({ ...mark, end: anchor.start, quote: mark.quote.slice(0, anchor.start - mark.start) });
        }
        if (mark.end > anchor.end) {
          kept.push({ ...mark, start: anchor.end, quote: mark.quote.slice(anchor.end - mark.start) });
        }
      }
      if (colors.includes(color)) kept.push({ ...anchor, color });
      result = kept;
    }
    return result;
  }

  function textBlocks(main) {
    const skip = "button, textarea, input, select, [contenteditable], [hidden], script, style, svg, .sr-only, .draft-status, .task-feedback, [role=status]";
    const blockSelector = "p, li, td, th, h1, h2, h3, h4, h5, h6, dt, dd, pre, figcaption, blockquote, summary, label, div, section, aside";
    const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT);
    const groups = new Map();
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const parent = node.parentElement;
      if (!node.length || parent.closest(skip)) continue;
      const block = parent.closest(blockSelector);
      const key = main.contains(block) ? block : main;
      if (!groups.has(key)) groups.set(key, { text: "", runs: [] });
      const group = groups.get(key);
      group.runs.push({ node, offset: group.text.length });
      group.text += node.data;
    }
    const counts = new Map();
    for (const group of groups.values()) {
      if (!group.text.trim()) continue;
      let hash = 2166136261;
      for (let index = 0; index < group.text.length; index += 1) {
        hash = Math.imul(hash ^ group.text.charCodeAt(index), 16777619);
      }
      const digest = (hash >>> 0).toString(36);
      const count = counts.get(digest) || 0;
      counts.set(digest, count + 1);
      group.key = digest + ":" + count;
    }
    return [...groups.values()].filter(group => group.key);
  }

  function selectionAnchors(main) {
    const selection = window.getSelection();
    if (!selection?.rangeCount || selection.isCollapsed) return [];
    const range = selection.getRangeAt(0);
    if (!main.contains(range.startContainer) || !main.contains(range.endContainer)) return [];
    const anchors = [];
    for (const group of textBlocks(main)) {
      const runs = group.runs.filter(({ node }) => range.intersectsNode(node));
      if (!runs.length) continue;
      const first = runs[0];
      const last = runs.at(-1);
      const start = first.offset + (first.node === range.startContainer ? range.startOffset : 0);
      const end = last.offset + (last.node === range.endContainer ? range.endOffset : last.node.length);
      for (let offset = start; offset < end; offset += maxQuote) {
        const stop = Math.min(end, offset + maxQuote);
        const quote = group.text.slice(offset, stop);
        if (quote.trim()) anchors.push({ block: group.key, start: offset, end: stop, quote });
      }
    }
    return anchors;
  }

  function paintMarks(main, marks) {
    for (const mark of main.querySelectorAll("mark[data-study-mark]")) mark.replaceWith(...mark.childNodes);
    if (!marks.length) return;
    const byBlock = new Map();
    for (const mark of marks) {
      if (!byBlock.has(mark.block)) byBlock.set(mark.block, []);
      byBlock.get(mark.block).push(mark);
    }
    for (const group of textBlocks(main)) {
      const matches = (byBlock.get(group.key) || [])
        .filter(mark => group.text.slice(mark.start, mark.end) === mark.quote)
        .sort((a, b) => a.start - b.start);
      if (!matches.length) continue;
      for (const { node, offset } of group.runs) {
        let cursor = 0;
        const parts = document.createDocumentFragment();
        for (const mark of matches) {
          const start = Math.max(cursor, mark.start - offset);
          const end = Math.min(node.length, mark.end - offset);
          if (start >= end) continue;
          parts.append(node.data.slice(cursor, start));
          const element = document.createElement("mark");
          element.dataset.studyMark = mark.color;
          element.textContent = node.data.slice(start, end);
          parts.append(element);
          cursor = end;
        }
        if (cursor) {
          parts.append(node.data.slice(cursor));
          node.replaceWith(parts);
        }
      }
    }
  }

  function mountMarkers(main, unitIds, getStudy, save) {
    const tools = document.querySelector("#marker-tools");
    const toggle = document.querySelector("#marker-toggle");
    const message = document.querySelector("#marker-status");
    const toolbar = tools.closest(".study-tools");
    const ids = new Set(unitIds);
    let route = "home";
    let anchors = [];
    let pending = false;
    const observer = new MutationObserver(() => {
      pending = true;
      requestAnimationFrame(() => {
        if (pending && !selectionAnchors(main).length) refresh();
      });
    });
    function refresh() {
      pending = false;
      observer.disconnect();
      const marks = getStudy().highlights[route] || [];
      paintMarks(main, marks);
      if (marks.length) observer.observe(main, { childList: true, subtree: true, characterData: true });
    }
    function rememberSelection() {
      const current = selectionAnchors(main);
      if (current.length || !toolbar.contains(document.activeElement)) anchors = current;
      if (!current.length && pending) refresh();
    }
    document.addEventListener("selectionchange", rememberSelection);
    toggle.addEventListener("click", () => {
      tools.hidden = !tools.hidden;
      toggle.setAttribute("aria-expanded", String(!tools.hidden));
    });
    toolbar.addEventListener("pointerdown", event => {
      if (!event.target.closest("[data-marker], #marker-toggle")) return;
      const current = selectionAnchors(main);
      if (current.length) {
        anchors = current;
        event.preventDefault();
      }
    });
    tools.addEventListener("click", event => {
      const button = event.target.closest("[data-marker]");
      if (!button) return;
      const current = selectionAnchors(main);
      const selected = current.length ? current : anchors;
      if (!selected.length) {
        message.textContent = "Wähle zuerst Text im Lerninhalt aus.";
        return;
      }
      const pages = getStudy().highlights;
      const previous = pages[route] || [];
      const next = replaceMarks(previous, selected, button.dataset.marker);
      if (markCount(pages) - previous.length + next.length > maxMarks) {
        message.textContent = "Zu viele Markierungen. Entferne zuerst einige.";
        return;
      }
      if (next.length) pages[route] = next;
      else delete pages[route];
      const stored = save();
      anchors = [];
      window.getSelection()?.removeAllRanges();
      refresh();
      message.textContent = stored ? (button.dataset.marker === "erase" ? "Markierung entfernt." : "Text markiert.") : "Änderung im Tab verfügbar. Sichere deinen Lernstand als Datei.";
    });
    return nextRoute => {
      route = nextRoute;
      anchors = [];
      message.textContent = "";
      toggle.hidden = !validRoute(route, ids);
      tools.hidden = toggle.hidden || toggle.getAttribute("aria-expanded") !== "true";
      refresh();
    };
  }

  function draw(canvas, strokes) {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineCap = ctx.lineJoin = "round";
    for (const stroke of strokes) {
      ctx.globalCompositeOperation = stroke.tool === "erase" ? "destination-out" : "source-over";
      ctx.strokeStyle = ctx.fillStyle = stroke.color;
      ctx.lineWidth = stroke.tool === "erase" ? stroke.width * 3 : stroke.width;
      const points = stroke.points.map(([x, y]) => [x * canvas.width / 1000, y * canvas.height / 1000]);
      ctx.beginPath();
      if (points.length === 1) {
        ctx.arc(...points[0], ctx.lineWidth / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.moveTo(...points[0]);
        for (const point of points.slice(1)) ctx.lineTo(...point);
        ctx.stroke();
      }
    }
    ctx.globalCompositeOperation = "source-over";
  }

  function mountNotebook(units, getStudy, save) {
    const dialog = document.querySelector("#notebook-dialog");
    const open = document.querySelector("#notebook-open");
    const page = dialog.querySelector("#notebook-page");
    const text = dialog.querySelector("#notebook-text");
    const sketch = dialog.querySelector("#notebook-sketch");
    const canvas = dialog.querySelector("#notebook-canvas");
    const message = dialog.querySelector("#notebook-status");
    const undo = dialog.querySelector("#notebook-undo");
    const redo = dialog.querySelector("#notebook-redo");
    const tool = dialog.querySelector("#notebook-tool");
    const color = dialog.querySelector("#notebook-color");
    const width = dialog.querySelector("#notebook-width");
    const views = [...dialog.querySelectorAll("[data-notebook-view]")];
    for (const unit of units) page.add(new Option(unit.id + " · " + unit.title, unit.id));

    let note = blankNote();
    let undone = [];
    let active = null;
    let pointer = null;
    let pointBudget = 0;
    const redraw = () => {
      draw(canvas, active ? [...note.strokes, active] : note.strokes);
      undo.disabled = !note.strokes.length;
      redo.disabled = !undone.length;
    };
    function persist() {
      const notes = getStudy().notes;
      if (note.text || note.strokes.length) notes[page.value] = note;
      else delete notes[page.value];
      message.textContent = save() ? "Auf diesem Gerät gespeichert." : "Im Tab verfügbar. Sichere deinen Lernstand als Datei.";
    }
    function load() {
      active = null;
      pointer = null;
      note = getStudy().notes[page.value] || blankNote();
      undone = [];
      message.textContent = "";
      text.value = note.text;
      redraw();
    }
    function changeView(view) {
      text.hidden = view !== "text";
      sketch.hidden = view !== "sketch";
      for (const button of views) button.setAttribute("aria-pressed", String(button.dataset.notebookView === view));
    }
    open.addEventListener("click", () => {
      const [route, id] = location.hash.slice(1).split("/");
      page.value = route === "unit" && units.some(unit => unit.id === id) ? id : "general";
      load();
      changeView("text");
      dialog.showModal();
    });
    page.addEventListener("change", load);
    views.forEach(button => button.addEventListener("click", () => changeView(button.dataset.notebookView)));
    text.addEventListener("input", () => {
      note.text = text.value;
      persist();
    });

    function addPoint(event) {
      if (!active || pointer !== event.pointerId || active.points.length >= pointBudget) return;
      const rect = canvas.getBoundingClientRect();
      const point = [(event.clientX - rect.left) / rect.width, (event.clientY - rect.top) / rect.height]
        .map(value => Math.round(Math.max(0, Math.min(1, value)) * 1000));
      const last = active.points.at(-1);
      if (last?.[0] === point[0] && last[1] === point[1]) return;
      active.points.push(point);
      redraw();
    }
    canvas.addEventListener("pointerdown", event => {
      if (active || event.button !== 0) return;
      const total = Object.values(getStudy().notes).reduce((sum, entry) => sum + pointCount(entry.strokes), 0);
      pointBudget = Math.min(maxPoints - pointCount(note.strokes), maxTotalPoints - total);
      if (pointBudget <= 0 || note.strokes.length >= maxStrokes) {
        message.textContent = "Die Skizze ist voll. Nimm einen Strich zurück, um weiterzuzeichnen.";
        return;
      }
      pointer = event.pointerId;
      active = { tool: tool.value, color: color.value, width: Number(width.value), points: [] };
      canvas.setPointerCapture(pointer);
      addPoint(event);
    });
    canvas.addEventListener("pointermove", addPoint);
    function finish(event) {
      if (!active || pointer !== event.pointerId) return;
      if (event.type === "pointerup") addPoint(event);
      note.strokes.push(active);
      active = null;
      pointer = null;
      undone = [];
      redraw();
      persist();
    }
    for (const event of ["pointerup", "pointercancel", "lostpointercapture"]) canvas.addEventListener(event, finish);
    undo.addEventListener("click", () => {
      if (!note.strokes.length || active) return;
      undone.push(note.strokes.pop());
      redraw();
      persist();
    });
    redo.addEventListener("click", () => {
      if (!undone.length || active) return;
      note.strokes.push(undone.pop());
      redraw();
      persist();
    });
  }

  const api = { normalize, mountMarkers, mountNotebook };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.AlgoLabStudy = api;
})(typeof window === "undefined" ? globalThis : window);
