(() => {
  "use strict";
  const content = window.ALGOLAB_CONTENT;
  const engine = window.createAlgoLabProgress(content);
  const main = document.querySelector("#main");
  const key = "algolab-v1";
  const esc = text => String(text).replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character]));
  let state = engine.empty();
  const developerKey = "algolab-developer-v1";
  let developerMode = false;
  let developerControlRevealed = false;
  try { developerMode = sessionStorage.getItem(developerKey) === "active"; } catch { /* In-memory mode remains available. */ }
  const accessible = id => engine.accessible(state, id, developerMode);
  const profileDialog = document.querySelector("#profile-dialog");
  const developerButton = document.querySelector("#developer-toggle");
  function syncProfile() {
    document.querySelector("#profile-summary").textContent = `${engine.total(state)} Punkte · ${state.completed.length} von ${content.units.length} Lerneinheiten abgeschlossen`;
    developerButton.hidden = !developerControlRevealed;
    developerButton.setAttribute("aria-pressed", String(developerMode));
    developerButton.classList.toggle("is-active", developerMode);
    document.querySelector("#developer-status").hidden = !developerControlRevealed && !developerMode;
    document.querySelector("#developer-status").textContent = developerMode
      ? "Aktiv: Alle Lerneinheiten sind zugänglich. Punkte und Abschlüsse bleiben unverändert. Der Modus gilt für diesen Browser-Tab, bis du ihn ausschaltest oder den Tab schließt."
      : "Ausgeschaltet: Die Lerneinheiten werden wieder in Reihenfolge freigeschaltet.";
    document.querySelector("#developer-indicator").hidden = !developerMode;
  }
  function openProfile() {
    developerControlRevealed = false;
    syncProfile();
    profileDialog.showModal();
  }
  document.querySelectorAll("[data-profile-open]").forEach(button => button.addEventListener("click", openProfile));
  profileDialog.addEventListener("close", () => { developerControlRevealed = false; syncProfile(); });
  document.addEventListener("keydown", event => {
    const altGraph = event.getModifierState?.("AltGraph") || (event.ctrlKey && event.altKey);
    if (!profileDialog.open || !altGraph || !(event.code === "KeyS" || event.key.toLowerCase() === "s")) return;
    event.preventDefault();
    if (event.repeat) return;
    developerControlRevealed = !developerControlRevealed;
    syncProfile();
    (developerControlRevealed ? developerButton : document.querySelector("#profile-close")).focus();
  });
  developerButton.addEventListener("click", () => {
    developerMode = !developerMode;
    try { sessionStorage.setItem(developerKey, developerMode ? "active" : "inactive"); } catch { /* In-memory mode remains available. */ }
    render();
  });
  const icon = name => `<svg class="icon" aria-hidden="true"><use href="assets/icons.svg?v=0.3.2#${name}"/></svg>`;
  let sidebarCollapsed = false;
  let pathExpanded = false;
  try { sidebarCollapsed = localStorage.getItem("algolab-sidebar-v1") === "collapsed"; } catch { /* Session defaults remain usable. */ }
  function updateSidebar() {
    document.body.classList.toggle("sidebar-collapsed", sidebarCollapsed);
    const toggle = document.querySelector("#sidebar-toggle");
    toggle.setAttribute("aria-expanded", String(!sidebarCollapsed));
    toggle.setAttribute("aria-label", sidebarCollapsed ? "Seitenleiste ausklappen" : "Seitenleiste einklappen");
    document.querySelector("#sidebar-path").hidden = !pathExpanded || sidebarCollapsed;
    const pathToggle = document.querySelector("#path-toggle");
    pathToggle.setAttribute("aria-expanded", String(pathExpanded && !sidebarCollapsed));
    pathToggle.setAttribute("aria-label", pathExpanded && !sidebarCollapsed ? "Lernfortschritte ausblenden" : "Lernfortschritte einblenden");
  }
  document.querySelector("#sidebar-toggle").addEventListener("click", () => {
    sidebarCollapsed = !sidebarCollapsed; updateSidebar();
    try { localStorage.setItem("algolab-sidebar-v1", sidebarCollapsed ? "collapsed" : "expanded"); } catch { /* Session setting still works. */ }
  });
  document.querySelector("#path-toggle").addEventListener("click", () => {
    if (sidebarCollapsed) { sidebarCollapsed = false; pathExpanded = true; }
    else pathExpanded = !pathExpanded;
    updateSidebar();
  });
  function renderSidebarPath() {
    const expanded = [...document.querySelectorAll(".sidebar-module[open]")].map(item => item.dataset.module);
    document.querySelector("#sidebar-path").innerHTML = content.modules.map(module => `<details class="sidebar-module" data-module="${module.id}" ${expanded.includes(module.id) ? "open" : ""}><summary><span>${module.id}</span> ${module.title}</summary><div>${module.units.map(unit => accessible(unit.id) ? `<a href="#unit/${unit.id}"><span>${unit.id}</span>${esc(unit.title)}</a>` : `<span class="sidebar-unit locked">${icon("lock")}<span>${unit.id} · ${esc(unit.title)}</span></span>`).join("")}</div></details>`).join("");
    updateSidebar();
  }
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
    toggle.innerHTML = icon(theme === "light" ? "moon" : "sun");
    toggle.setAttribute("aria-label", theme === "light" ? "Dunkle Darstellung aktivieren" : "Helle Darstellung aktivieren");
  }
  try { setTheme(localStorage.getItem("algolab-theme-v1") === "light" ? "light" : "dark"); } catch { setTheme("dark"); }
  function status(unit) {
    if (state.completed.includes(unit.id)) return "Abgeschlossen";
    if (!accessible(unit.id)) return "Gesperrt";
    return unit.ready ? "Bereit" : "In Vorbereitung";
  }
  function card(unit) {
    const available = accessible(unit.id);
    const previous = engine.prerequisite(unit.id);
    const label = status(unit);
    return `<article class="unit-card ${available ? "" : "locked"}"><div class="card-top"><span class="code">${unit.id}</span><span class="status ${label === "Abgeschlossen" ? "done" : ""}">${label}</span></div><h3>${esc(unit.title)}</h3><p>${esc(unit.description)}</p><div class="unit-meta"><span>${engine.earned(state, unit.id)} / ${unit.points} Punkte</span><span>${unit.ready ? "Verständnischeck" : "Inhalte folgen"}</span></div>${available ? `<a class="unit-link" href="#unit/${unit.id}">${unit.ready ? "Einheit öffnen" : "Lernziele ansehen"} <span aria-hidden="true">↗</span></a>` : `<p class="lock-reason">Zuerst ${previous.id} abschließen (${previous.points} Punkte).</p>`}</article>`;
  }
  function renderHome() {
    document.querySelector("#page-title").textContent = "Übersicht";
    const next = content.units.find(unit => !state.completed.includes(unit.id));
    const positions = [{ x: 18, y: 72 }, { x: 53, y: 51 }, { x: 84, y: 32 }];
    main.innerHTML = `<section class="hero"><div class="hero-copy"><span class="eyebrow">DEIN EINSTIEG IN BPE7</span><h2>Deine Ideen.<br>Deine Algorithmen.</h2><p>Ordne Daten, entdecke Muster und entwickle eigene Lösungen. Dein Weg führt dich Schritt für Schritt durch die Welt der Algorithmen und Datenstrukturen.</p><a class="primary" href="#unit/${next?.id || "L1.1"}">${state.completed.length ? "Weiterlernen" : "Mit L1.1 starten"} ${icon("arrow")}</a><div class="hero-tags"><span>${icon("layers")} 3 Lernfortschritte</span><span>${icon("route")} ${content.units.length} Lerneinheiten</span></div></div><figure class="hero-photo"><img src="assets/algolab-students.webp" width="1672" height="941" fetchpriority="high" alt="Drei Schüler arbeiten gemeinsam am Laptop, ordnen blaue und silberne Sortierbausteine und untersuchen ein Knotenmodell."><figcaption>${icon("spark")} Verstehen. Ausprobieren. Weiterdenken.</figcaption></figure></section><div class="section-heading"><div><span class="eyebrow">DEIN WEG DURCH BPE7</span><h2>Entdecke deine Lernkarte</h2></div><a class="map-list-link" href="#path">Alle Lerneinheiten ${icon("arrow")}</a></div><p class="map-instruction">Fahre mit der Maus über eine Station oder klicke sie an, um ihre Lerneinheiten zu sehen. Du startest bei L1.1.</p><section class="learning-map" aria-label="Lernkarte mit drei Lernfortschritten"><div class="map-stage"><img class="map-photo" src="assets/bpe7-learning-map.webp" width="1672" height="941" loading="lazy" alt="Drei Forschungsstationen an einem Bergsee, verbunden durch einen Weg von links unten nach rechts oben.">${content.modules.map((module, index) => `<div class="map-station" style="--x:${positions[index].x}%;--y:${positions[index].y}%" data-station="${module.id}"><button class="map-pin ${accessible(module.units[0].id) ? "" : "is-locked"}" data-map-toggle="${module.id}" aria-expanded="false" aria-controls="map-menu-${module.id}" aria-label="${module.id} · ${module.title}: Lerneinheiten anzeigen"><span class="pin-code">${module.id}</span><span class="pin-title">${module.title}</span>${icon("chevron")}</button></div>`).join("")}</div><div class="map-popovers">${content.modules.map((module, index) => `<section class="map-menu map-menu-${module.id}" id="map-menu-${module.id}" data-map-menu="${module.id}" hidden aria-label="Lerneinheiten in ${module.id}"><div class="map-menu-heading"><span class="eyebrow">LERNFORTSCHRITT ${module.number}</span><h3>${module.title}</h3><a href="#path/${module.id}">Übersicht ${icon("arrow")}</a></div><div class="map-units">${module.units.map(unit => accessible(unit.id) ? `<a class="map-unit available" href="#unit/${unit.id}"><span class="map-unit-code">${unit.id}</span><span>${esc(unit.title)}<small>${status(unit)} · ${engine.earned(state, unit.id)}/${unit.points} Punkte</small></span>${icon(state.completed.includes(unit.id) ? "check" : "arrow")}</a>` : `<div class="map-unit locked"><span class="map-unit-code">${unit.id}</span><span>${esc(unit.title)}<small>Zuerst ${engine.prerequisite(unit.id).id} abschließen</small></span>${icon("lock")}</div>`).join("")}</div></section>`).join("")}</div></section><div class="map-key">${content.modules.map(module => `<button data-map-show="${module.id}"><span>${module.id}</span>${module.title}${icon("chevron")}</button>`).join("")}</div><aside class="notice"><strong>Wir bauen AlgoLab Schritt für Schritt auf.</strong> L1.1 enthält einen ersten Verständnischeck. Die weiteren Einheiten zeigen zunächst ihre Lernziele. Sie erhalten ihre Aufgaben im nächsten Ausbau.</aside>`;
    setupMap();
  }
  function setupMap() {
    let active = null;
    let pinned = false;
    let closeTimer;
    mapListenerController.signal.addEventListener("abort", () => clearTimeout(closeTimer), { once: true });
    function close() {
      clearTimeout(closeTimer);
      main.querySelectorAll("[data-map-menu]").forEach(menu => { menu.hidden = true; });
      main.querySelectorAll("[data-map-toggle]").forEach(pin => pin.setAttribute("aria-expanded", "false"));
      main.querySelectorAll("[data-map-show]").forEach(pin => pin.setAttribute("aria-expanded", "false"));
      active = null;
      pinned = false;
    }
    function open(id, keepOpen = false) {
      close(); active = id; pinned = keepOpen;
      main.querySelector(`[data-map-menu="${id}"]`).hidden = false;
      main.querySelector(`[data-map-toggle="${id}"]`).setAttribute("aria-expanded", "true");
      main.querySelector(`[data-map-show="${id}"]`).setAttribute("aria-expanded", "true");
    }
    function scheduleClose() {
      clearTimeout(closeTimer);
      closeTimer = setTimeout(() => {
        if (pinned) return;
        const panel = main.querySelector(`[data-map-menu="${active}"]`);
        const pin = main.querySelector(`[data-map-toggle="${active}"]`);
        if (panel?.contains(document.activeElement) || pin === document.activeElement) return;
        close();
      }, 260);
    }
    main.querySelectorAll("[data-map-toggle], [data-map-show]").forEach(button => {
      const id = button.dataset.mapToggle || button.dataset.mapShow;
      button.setAttribute("aria-controls", `map-menu-${id}`);
      button.setAttribute("aria-expanded", "false");
      button.addEventListener("click", () => active === id && pinned ? close() : open(id, true));
      button.addEventListener("pointerenter", event => { if (event.pointerType === "mouse" && active !== id) open(id); else clearTimeout(closeTimer); });
      button.addEventListener("pointerleave", scheduleClose);
    });
    main.querySelectorAll("[data-map-menu]").forEach(menu => {
      menu.addEventListener("pointerenter", () => clearTimeout(closeTimer));
      menu.addEventListener("pointerleave", scheduleClose);
      menu.addEventListener("focusout", event => { if (!menu.contains(event.relatedTarget)) scheduleClose(); });
    });
    main.querySelector(".learning-map").addEventListener("keydown", event => {
      if (event.key === "Escape" && active) { const pin = main.querySelector(`[data-map-toggle="${active}"]`); close(); pin.focus(); }
    });
    main.addEventListener("keydown", event => { if (event.key === "Escape") close(); }, { signal: mapListenerController.signal });
    document.addEventListener("click", event => { if (!event.target.closest(".learning-map, .map-key")) close(); }, { signal: mapListenerController.signal });
  }
  let mapListenerController = new AbortController();
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
    if (!accessible(id)) {
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
    mapListenerController.abort(); mapListenerController = new AbortController();
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
    renderSidebarPath();
    syncProfile();
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
