(() => {
  "use strict";
  const content = window.ALGOLAB_CONTENT;
  const engine = window.createAlgoLabProgress(content);
  const main = document.querySelector("#main");
  const key = "algolab-v1";
  const esc = text => String(text).replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character]));
  let state = engine.empty();
  function storageWarning(message) { const warning = document.querySelector("#storage-warning"); warning.textContent = message; warning.hidden = false; }
  try { state = engine.normalize(JSON.parse(localStorage.getItem(key) || "null")); }
  catch { storageWarning("Dein gespeicherter Lernstand konnte nicht geladen werden. Sichere deinen neuen Stand als Datei."); }
  function save() {
    try { localStorage.setItem(key, JSON.stringify(state)); }
    catch { storageWarning("Dein Browser kann den Lernstand gerade nicht speichern. Sichere ihn als Datei, bevor du die Seite schließt."); }
  }
  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    const toggle = document.querySelector("#theme-toggle");
    toggle.textContent = theme === "light" ? "☾" : "☀";
    toggle.setAttribute("aria-label", theme === "light" ? "Dunkle Darstellung aktivieren" : "Helle Darstellung aktivieren");
  }
  try { setTheme(localStorage.getItem("algolab-theme-v1") === "light" ? "light" : "dark"); } catch { setTheme("dark"); }
  function status(unit) {
    if (state.completed.includes(unit.id)) return "Abgeschlossen";
    if (!engine.unlocked(state, unit.id)) return "Gesperrt";
    return unit.ready ? "Bereit" : "In Vorbereitung";
  }
  function card(unit) {
    const available = engine.unlocked(state, unit.id);
    const previous = engine.prerequisite(unit.id);
    const label = status(unit);
    return `<article class="unit-card ${available ? "" : "locked"}"><div class="card-top"><span class="code">${unit.id}</span><span class="status ${label === "Abgeschlossen" ? "done" : ""}">${label}</span></div><h3>${esc(unit.title)}</h3><p>${esc(unit.description)}</p><div class="unit-meta"><span>${engine.earned(state, unit.id)} / ${unit.points} Punkte</span><span>${unit.ready ? "Verständnischeck" : "Inhalte folgen"}</span></div>${available ? `<a class="unit-link" href="#unit/${unit.id}">${unit.ready ? "Einheit öffnen" : "Lernziele ansehen"} <span aria-hidden="true">↗</span></a>` : `<p class="lock-reason">Zuerst ${previous.id} abschließen (${previous.points} Punkte).</p>`}</article>`;
  }
  function renderHome() {
    document.querySelector("#page-title").textContent = "Übersicht";
    const next = content.units.find(unit => !state.completed.includes(unit.id));
    main.innerHTML = `<section class="hero"><div><span class="eyebrow">DEIN EINSTIEG IN BPE7</span><h2>Daten ordnen.<br>Schritt für Schritt denken.</h2><p>Entdecke Datenstrukturen und entwickle Algorithmen. Dein Lernweg führt durch drei Lernfortschritte – eine Einheit nach der anderen.</p><a class="primary" href="#unit/${next?.id || "L1.1"}">${state.completed.length ? "Weiterlernen" : "Mit L1.1 starten"} <span aria-hidden="true">→</span></a></div><div class="hero-visual" aria-hidden="true"><span class="visual-label">AUS DATEN WIRD EIN WEG</span><div class="array"><span>8</span><span>3</span><span>5</span><span>1</span></div><div class="flow-arrow">↓</div><div class="array sorted"><span>1</span><span>3</span><span>5</span><span>8</span></div><small>Verstehen · Anwenden · Überprüfen</small></div></section><div class="section-heading"><div><span class="eyebrow">DREI LERNFORTSCHRITTE</span><h2>Deine Lernkarte</h2></div><a href="#path">Alle ${content.units.length} Lerneinheiten →</a></div><section class="learning-map" aria-label="Lernkarte mit drei Lernfortschritten">${content.modules.map((module, index) => `<a class="station ${module.color}" href="#path/${module.id}"><span class="station-number">${module.id}</span><span class="eyebrow">LERNFORTSCHRITT ${module.number}</span><h3>${module.title}</h3><p>${module.subtitle}</p><span class="station-footer">${module.units.length} Einheiten <span>${engine.unlocked(state, module.units[0].id) ? "Start ansehen ↗" : "Noch gesperrt ◇"}</span></span></a>`).join("")}</section><aside class="notice"><strong>Wir bauen AlgoLab Schritt für Schritt auf.</strong> L1.1 enthält einen ersten Verständnischeck. Die weiteren Einheiten zeigen zunächst ihre Lernziele. Sie erhalten ihre Aufgaben im nächsten Ausbau.</aside>`;
  }
  function renderPath(moduleId) {
    document.querySelector("#page-title").textContent = "Lernpfad";
    const modules = moduleId ? content.modules.filter(module => module.id === moduleId) : content.modules;
    if (!modules.length) { renderMissing(); return; }
    main.innerHTML = `<div class="path-intro"><p>Arbeite die Lerneinheiten in Reihenfolge durch. Bestehe alle Pflichtaufgaben einer Einheit und sammle ihre ${content.units[0].points} Punkte. Nach dem Abschluss öffnet sich die nächste Einheit.</p><div class="module-tabs">${content.modules.map(module => `<a href="#path/${module.id}" ${moduleId === module.id ? 'aria-current="page"' : ""}>${module.id} · ${module.title}</a>`).join("")}</div></div>${modules.map(module => `<section class="module ${module.color}" id="${module.id}"><div class="section-heading"><div><span class="eyebrow">LERNFORTSCHRITT ${module.number} · ${module.plan}</span><h2>${module.title}</h2><p>${module.subtitle}</p></div><span class="module-completed">${module.units.filter(unit => state.completed.includes(unit.id)).length} / ${module.units.length} abgeschlossen</span></div><div class="unit-grid">${module.units.map(card).join("")}</div></section>`).join("")}`;
  }
  function renderMissing() { document.querySelector("#page-title").textContent = "Seite nicht gefunden"; main.innerHTML = `<section class="empty-state"><h2>Diese Seite gibt es nicht.</h2><a class="primary" href="#path">Zum Lernpfad</a></section>`; }
  function renderUnit(id) {
    const unit = engine.byId(id);
    if (!unit) { renderMissing(); return; }
    const module = content.modules.find(item => item.units.includes(unit));
    document.querySelector("#page-title").textContent = `${unit.id} · ${unit.title}`;
    if (!engine.unlocked(state, id)) {
      const previous = engine.prerequisite(id);
      main.innerHTML = `<section class="empty-state"><span class="eyebrow">NOCH GESPERRT</span><h2>Dieser Schritt kommt später.</h2><p>Schließe zuerst <strong>${previous.id} · ${esc(previous.title)}</strong> mit ${previous.points} Punkten ab. Du hast dort bisher ${engine.earned(state, previous.id)} Punkte erreicht.</p><a class="primary" href="#path">Zu deinem Lernpfad</a></section>`;
      return;
    }
    const complete = state.completed.includes(id);
    const next = content.units[content.units.indexOf(unit) + 1];
    main.innerHTML = `<div class="breadcrumb"><a href="#path/${module.id}">${module.id} · ${module.title}</a><span aria-hidden="true">/</span><span>${unit.id}</span></div><section class="lesson-heading"><span class="eyebrow">${status(unit).toUpperCase()}</span><h2>${unit.title}</h2><p>${unit.description}</p><div class="lesson-points"><span>${engine.earned(state, id)} / ${unit.points} Punkte</span><progress value="${engine.earned(state, id)}" max="${unit.points}" aria-label="Punkte in ${id}"></progress></div></section><section class="lesson-panel"><h3>Das lernst du hier</h3><ul>${unit.goals.map(goal => `<li>${esc(goal)}</li>`).join("")}</ul></section>${unit.ready ? `<section class="lesson-panel"><span class="eyebrow">1 · VERSTEHEN</span><h3>Wie organisieren wir Daten?</h3><p>${unit.intro}</p><div class="examples">${unit.examples.map(example => `<details><summary>${example.title}</summary><p>${example.text}</p></details>`).join("")}</div></section><section class="lesson-panel"><span class="eyebrow">2 · SELBST ÜBERPRÜFEN</span><h3>Welche Struktur passt?</h3><p>Jede richtige Antwort gibt 25 Punkte. Du kannst eine Aufgabe erneut versuchen. Bereits erreichte Punkte bleiben erhalten.</p>${unit.tasks.map((task, index) => {
      const answer = state.answers[id]?.[task.id];
      const solved = answer === task.correct;
      return `<form class="task" data-unit="${id}" data-task="${task.id}"><fieldset ${solved ? "disabled" : ""}><legend><span class="task-number">${index + 1}</span> ${task.prompt}</legend>${task.options.map((option, choice) => `<label class="choice"><input type="radio" name="choice" value="${choice}" ${answer === choice ? "checked" : ""} required><span>${option}</span></label>`).join("")}</fieldset><div class="task-actions">${solved ? '<span class="task-success">✓ Bestanden · 25 Punkte</span>' : '<button type="submit">Antwort prüfen</button>'}<p role="status" class="task-feedback">${answer !== undefined && !solved ? esc(task.hint) : ""}</p></div></form>`;
    }).join("")}</section><section class="lesson-panel completion"><span class="eyebrow">3 · ABSCHLIESSEN</span><h3>${complete ? "L1.1 ist abgeschlossen." : "Bereit für den nächsten Schritt?"}</h3><p>${complete ? "Du hast 100 Punkte erreicht. Die nächste Einheit ist freigeschaltet." : "Bestehe alle vier Aufgaben. Danach kannst du diese Einheit abschließen und L1.2 freischalten."}</p>${complete ? `<a class="primary" href="#unit/${next.id}">Weiter zu ${next.id} →</a>` : `<button class="primary" data-finish="${id}" ${engine.passed(state, id) ? "" : "disabled"}>Einheit abschließen · ${unit.points} Punkte</button>`}</section>` : `<section class="lesson-panel preparation"><span class="eyebrow">IN VORBEREITUNG</span><h3>Hier entsteht deine nächste Lerneinheit.</h3><p>Diese Einheit ist für dich freigeschaltet. Ihre Erklärungen und Aufgaben werden noch ausgearbeitet. Deshalb kannst du hier noch keine Punkte sammeln oder zur folgenden Einheit wechseln.</p><a href="#path/${module.id}">Zur Übersicht von ${module.id} →</a></section>`}`;
  }
  function renderProgress() {
    document.querySelector("#page-title").textContent = "Mein Lernstand";
    main.innerHTML = `<section class="lesson-panel"><span class="eyebrow">DEIN FORTSCHRITT</span><h2>${engine.total(state)} Punkte erreicht</h2><p>${state.completed.length} von ${content.units.length} Lerneinheiten abgeschlossen.</p><p>Die nächste Einheit öffnet sich, wenn du alle Pflichtaufgaben der vorherigen Einheit bestanden, ihre Punkte erreicht und sie abgeschlossen hast. Die Freischaltung gilt auch für direkte Links.</p><button class="primary" data-backup>Lernstand sichern oder laden</button></section><div class="progress-list">${content.units.map(unit => `<div><span><strong>${unit.id}</strong> ${unit.title}</span><span>${engine.earned(state, unit.id)} / ${unit.points} · ${status(unit)}</span></div>`).join("")}</div>`;
  }
  function render(focus = false) {
    const [page, id] = location.hash.slice(1).split("/");
    if (!page || page === "home") renderHome();
    else if (page === "path") renderPath(id);
    else if (page === "unit") renderUnit(id);
    else if (page === "progress") renderProgress();
    else renderMissing();
    const total = engine.total(state);
    document.querySelector("#total-points").textContent = `${total} Punkte`;
    document.querySelector("#sidebar-points").textContent = `${total} Punkte · ${state.completed.length} abgeschlossen`;
    document.querySelector("#sidebar-progress").value = total;
    document.querySelector("#sidebar-progress").max = content.units.reduce((sum, unit) => sum + unit.points, 0);
    document.querySelectorAll("[data-nav]").forEach(link => {
      const active = link.dataset.nav === (page === "unit" ? "path" : page || "home");
      if (active) link.setAttribute("aria-current", "page"); else link.removeAttribute("aria-current");
    });
    if (focus) { main.focus({ preventScroll: true }); window.scrollTo(0, 0); }
  }
  main.addEventListener("submit", event => {
    const form = event.target.closest("form[data-task]");
    if (!form) return;
    event.preventDefault();
    const selected = new FormData(form).get("choice");
    if (selected === null) return;
    const passed = engine.answer(state, form.dataset.unit, form.dataset.task, Number(selected));
    save();
    if (!passed) { form.querySelector(".task-feedback").textContent = engine.byId(form.dataset.unit).tasks.find(task => task.id === form.dataset.task).hint; return; }
    const taskId = form.dataset.task;
    render();
    const success = main.querySelector(`[data-task="${taskId}"] .task-success`);
    success.setAttribute("tabindex", "-1"); success.focus({ preventScroll: true });
  });
  main.addEventListener("click", event => {
    const button = event.target.closest("[data-finish]");
    if (button && engine.finish(state, button.dataset.finish)) { save(); render(); main.querySelector(".completion h3").setAttribute("tabindex", "-1"); main.querySelector(".completion h3").focus({ preventScroll: true }); }
    if (event.target.closest("[data-backup]")) document.querySelector("#backup-dialog").showModal();
  });
  document.querySelector("#theme-toggle").addEventListener("click", () => {
    const theme = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    setTheme(theme); try { localStorage.setItem("algolab-theme-v1", theme); } catch { /* Theme still works for this session. */ }
  });
  document.querySelector("#backup-open").addEventListener("click", () => document.querySelector("#backup-dialog").showModal());
  document.querySelector("#export-progress").addEventListener("click", () => {
    const payload = { app: "AlgoLab", formatVersion: 1, version: content.version, exportedAt: new Date().toISOString(), state };
    const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" }));
    const link = document.createElement("a"); link.href = url; link.download = `algolab-lernstand-${new Date().toISOString().slice(0, 10)}.json`; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
  document.querySelector("#import-progress").addEventListener("change", async event => {
    const file = event.target.files[0];
    const message = document.querySelector("#backup-message");
    if (!file) return;
    try {
      if (file.size > 2 * 1024 * 1024) throw new Error("Die Datei ist zu groß (maximal 2 MB).");
      const payload = JSON.parse(await file.text());
      if (payload.app !== "AlgoLab" || payload.formatVersion !== 1 || !payload.state || typeof payload.state !== "object" || !payload.state.answers || typeof payload.state.answers !== "object" || !Array.isArray(payload.state.completed)) throw new Error("Bitte wähle eine gültige AlgoLab-Lernstandsdatei.");
      if (!window.confirm("Den aktuellen Lernstand durch die gewählte Datei ersetzen? Sichere deinen bisherigen Stand, wenn du ihn behalten möchtest.")) return;
      state = engine.normalize(payload.state); save(); render(); message.textContent = "Dein Lernstand wurde geladen.";
    } catch (error) { message.textContent = `Die Datei wurde nicht geladen. ${error.message}`; }
    finally { event.target.value = ""; }
  });
  window.addEventListener("hashchange", () => render(true));
  document.querySelector(".skip-link").addEventListener("click", event => {
    event.preventDefault(); main.focus(); main.scrollIntoView();
  });
  render();
})();
