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
  const nagold = window.ALGOLAB_NAGOLD;
  const resultsNavLinks = [...document.querySelectorAll("[data-results-link]")];
  function renderResults(unit) {
    if (!content.resultDocuments().length) return "";
    return `<section class="lesson-panel results-panel"><span class="eyebrow">ERGEBNISSE SICHERN</span><h3>Gemeinsam festhalten</h3><p>Tragt die besprochenen fachlichen Ergebnisse in das Dokument eurer Klasse ein. Dort findest du auch die Ergebnisse der anderen.</p><p class="results-sections">Abschnitt im Dokument: ${unit.sourceRefs.length ? content.resultSections(unit).map(esc).join(", ") : "nach Absprache"}</p><p class="results-choice"></p><div class="results-links"></div></section>`;
  }
  function syncResults() {
    const docs = content.resultDocuments(state.profile.className);
    const own = docs.length === 1;
    const name = doc => own ? content.results.title : `${content.results.title} ${doc.label}`;
    resultsNavLinks.forEach((link, index) => {
      const doc = docs[index]; link.hidden = !doc;
      if (!doc) return;
      link.href = doc.url; link.title = `${name(doc)} (öffnet neuen Tab)`;
      link.querySelector(".nav-label").textContent = name(doc);
    });
    document.querySelectorAll(".results-choice").forEach(text => {
      text.textContent = own ? "" : "Öffne das Dokument deiner Klasse. Trägst du deine Klasse im Profil ein, erscheint nur noch dein Dokument.";
      text.hidden = own;
    });
    document.querySelectorAll(".results-links").forEach(box => {
      box.innerHTML = docs.map(doc => `<a class="primary" href="${esc(doc.url)}" target="_blank" rel="noopener">${esc(content.results.title)} ${esc(doc.label)} öffnen ↗</a>`).join("");
    });
  }
  function syncProfile() {
    syncResults();
    const total = nagold.total(state);
    document.querySelector("#nagold-total").textContent = `${total} NAGOLD`;
    document.querySelector("#nagold-goal").value = Math.max(0, Math.min(100, total));
    document.querySelector("#nagold-goal-text").textContent = `${total} / 100 NAGOLD`;
    document.querySelector(".profile-copy").firstChild.textContent = state.profile.name || "Dein Profil";
    document.querySelector(".avatar").textContent = state.profile.name ? state.profile.name[0].toUpperCase() : "A";
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
    document.querySelector("#profile-name").value = state.profile.name;
    document.querySelector("#profile-class").value = state.profile.className;
    document.querySelector("#profile-message").textContent = "";
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
  const icon = name => `<svg class="icon" aria-hidden="true"><use href="assets/icons.svg?v=1.3.0#${name}"/></svg>`;
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
    try { localStorage.setItem(key, JSON.stringify(state)); return true; }
    catch { storageWarning("Dein Browser kann den Lernstand gerade nicht speichern. Sichere ihn als Datei, bevor du die Seite schließt."); return false; }
  }
  document.querySelector("#profile-edit-form").addEventListener("submit", event => {
    event.preventDefault();
    state.profile = { name: document.querySelector("#profile-name").value.trim().toLocaleLowerCase("de"), className: document.querySelector("#profile-class").value.trim().toLocaleUpperCase("de") };
    const stored = save(); syncProfile();
    document.querySelector("#profile-class").value = state.profile.className;
    document.querySelector("#profile-message").textContent = stored ? "Deine Profildaten sind auf diesem Gerät gespeichert." : "Profildaten übernommen. Bitte sichere sie als JSON-Datei.";
  });
  document.querySelector("#nagold-open").addEventListener("click", event => {
    window.AlgoLabNagoldTable.open({ entries: state.nagoldEntries, returnFocus: event.currentTarget, save(entries) {
      const previous = state.nagoldEntries;
      state.nagoldEntries = entries;
      if (!save()) { state.nagoldEntries = previous; return false; }
      syncProfile(); return true;
    } });
  });
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
    return `<article class="unit-card ${available ? "" : "locked"}"><div class="card-top"><span class="code">${unit.id}</span><span class="status ${label === "Abgeschlossen" ? "done" : ""}">${label}</span></div><h3>${esc(unit.title)}</h3><p>${esc(unit.description)}</p><div class="unit-meta"><span>${engine.earned(state, unit.id)} / ${unit.points} Punkte</span><span>${unit.ready ? (unit.tasks.some(task => task.type === "code") ? "Check + Python" : "Verständnischeck") : "Inhalte folgen"}</span></div>${available ? `<a class="unit-link" href="#unit/${unit.id}">${unit.ready ? "Einheit öffnen" : "Lernziele ansehen"} <span aria-hidden="true">↗</span></a>` : `<p class="lock-reason">Zuerst ${previous.id} abschließen (${previous.points} Punkte).</p>`}</article>`;
  }
  function renderHome() {
    document.querySelector("#page-title").textContent = "Übersicht";
    const next = content.units.find(unit => !state.completed.includes(unit.id));
    const positions = [{ x: 18, y: 72 }, { x: 53, y: 51 }, { x: 84, y: 32 }];
    main.innerHTML = `<section class="hero"><div class="hero-copy"><span class="eyebrow">DEIN EINSTIEG IN BPE7</span><h2>Deine Ideen.<br>Deine Algorithmen.</h2><p>Ordne Daten, entdecke Muster und entwickle eigene Lösungen. Dein Weg führt dich Schritt für Schritt durch die Welt der Algorithmen und Datenstrukturen.</p><a class="primary" href="#unit/${next?.id || "L1.1"}">${state.completed.length ? "Weiterlernen" : "Mit L1.1 starten"} ${icon("arrow")}</a><a class="hero-secondary" href="#programmieren">${icon("code")} Selbst programmieren</a><div class="hero-tags"><span>${icon("layers")} 3 Lernfortschritte</span><span>${icon("route")} ${content.units.length} Lerneinheiten</span></div></div><figure class="hero-photo"><img src="assets/algolab-students.webp" width="1672" height="941" fetchpriority="high" alt="Drei Schüler arbeiten gemeinsam am Laptop, ordnen blaue und silberne Sortierbausteine und untersuchen ein Knotenmodell."><figcaption>${icon("spark")} Verstehen. Ausprobieren. Weiterdenken.</figcaption></figure></section><div class="section-heading"><div><span class="eyebrow">DEIN WEG DURCH BPE7</span><h2>Entdecke deine Lernkarte</h2></div><a class="map-list-link" href="#path">Alle Lerneinheiten ${icon("arrow")}</a></div><p class="map-instruction">Fahre mit der Maus über eine Station oder klicke sie an, um ihre Lerneinheiten zu sehen. Du startest bei L1.1.</p><section class="learning-map" aria-label="Lernkarte mit drei Lernfortschritten"><div class="map-stage"><img class="map-photo" src="assets/bpe7-learning-map.webp" width="1672" height="941" loading="lazy" alt="Drei Forschungsstationen an einem Bergsee, verbunden durch einen Weg von links unten nach rechts oben.">${content.modules.map((module, index) => `<div class="map-station" style="--x:${positions[index].x}%;--y:${positions[index].y}%" data-station="${module.id}"><button class="map-pin ${accessible(module.units[0].id) ? "" : "is-locked"}" data-map-toggle="${module.id}" aria-expanded="false" aria-controls="map-menu-${module.id}" aria-label="${module.id} · ${module.title}: Lerneinheiten anzeigen"><span class="pin-code">${module.id}</span><span class="pin-title">${module.title}</span>${icon("chevron")}</button></div>`).join("")}</div><div class="map-popovers">${content.modules.map((module, index) => `<section class="map-menu map-menu-${module.id}" id="map-menu-${module.id}" data-map-menu="${module.id}" hidden aria-label="Lerneinheiten in ${module.id}"><div class="map-menu-heading"><span class="eyebrow">LERNFORTSCHRITT ${module.number}</span><h3>${module.title}</h3><a href="#path/${module.id}">Übersicht ${icon("arrow")}</a></div><div class="map-units">${module.units.map(unit => accessible(unit.id) ? `<a class="map-unit available" href="#unit/${unit.id}"><span class="map-unit-code">${unit.id}</span><span>${esc(unit.title)}<small>${status(unit)} · ${engine.earned(state, unit.id)}/${unit.points} Punkte</small></span>${icon(state.completed.includes(unit.id) ? "check" : "arrow")}</a>` : `<div class="map-unit locked"><span class="map-unit-code">${unit.id}</span><span>${esc(unit.title)}<small>Zuerst ${engine.prerequisite(unit.id).id} abschließen</small></span>${icon("lock")}</div>`).join("")}</div></section>`).join("")}</div></section><div class="map-key">${content.modules.map(module => `<button data-map-show="${module.id}"><span>${module.id}</span>${module.title}${icon("chevron")}</button>`).join("")}</div><aside class="notice">${content.units.every(unit => unit.ready) ? `<strong>So arbeitest du mit AlgoLab:</strong> Jede der ${content.units.length} Einheiten führt dich vom Verstehen über ein interaktives Modell zu eigenen Erklärungen und geprüften Aufgaben – ab L1.2 auch mit Python direkt im Browser. Sichere deinen Lernstand regelmäßig über das Diskettensymbol als Datei.` : `<strong>Wir bauen AlgoLab Schritt für Schritt auf.</strong> ${content.units.filter(unit => unit.ready).length} von ${content.units.length} Einheiten enthalten bereits Erklärungen, interaktive Modelle und Aufgaben. Die übrigen Einheiten zeigen zunächst ihre Lernziele.`}</aside>`;
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
  let pythonRunner = null;
  const workValue = (unitId, fieldId, fallback = "") => state.work[unitId]?.[fieldId] ?? fallback;
  function renderCodeTask(unit, task) {
    const solved = task.optional ? state.extras?.[unit.id]?.[task.id] === true : state.answers[unit.id]?.[task.id] === true;
    const fieldId = `code-${unit.id.replace(".", "-")}-${task.id}`;
    return `<section class="task code-task ${task.optional ? "is-optional" : ""}" data-code-unit="${unit.id}" data-code-task="${task.id}">${task.source ? `<span class="task-source">${esc(task.source)}</span>` : ""}<h4>${esc(task.title)}</h4><p>${esc(task.prompt)}</p><label for="${fieldId}">Dein Python-Code</label><textarea id="${fieldId}" class="code-editor" data-work="${task.id}" data-work-unit="${unit.id}" maxlength="20000" rows="14" spellcheck="false" autocapitalize="off">${esc(workValue(unit.id, task.id, task.starter))}</textarea><div class="editor-tools"><span>Tab rückt ein · Umschalt+Tab rückt aus · Strg+Enter führt aus · Esc, dann Tab verlässt den Editor</span><button type="button" data-reset-code>Startcode wiederherstellen</button></div><small class="draft-status" role="status"></small><div class="code-actions"><button class="primary" data-run-code>Code ausführen und prüfen</button><button data-stop-code disabled>Stoppen</button><span class="code-award">${task.optional ? (solved ? "✓ Gelöst · freiwillig" : "Freiwillig · ohne Punkte") : solved ? `Bestanden · ${task.points} Punkte` : `${task.points} Punkte möglich`}</span></div><p class="code-status" role="status">Python wird erst beim Ausführen geladen. Dein Code läuft in deinem Browser.</p><pre class="code-output" aria-label="Programmausgabe" tabindex="0">Hier erscheint deine Ausgabe.</pre><ul class="code-checks" aria-label="Prüfergebnisse"></ul><details><summary>Ein Hinweis zum nächsten Schritt</summary><p>${esc(task.hint)}</p></details></section>`;
  }
  // Themenspezifische Grafik für Einheiten ohne Foto.
  function bannerVisual(unit) {
    const model = unit.stepLab?.cases[0].model || (unit.treeLab ? "tree" : "");
    const cell = (value, index, extra = "") => `<span class="${extra}" style="--i:${index}"><small>${index}</small>${esc(String(value))}</span>`;
    const args = unit.stepLab?.cases[0].args || [];
    if (/Sort/.test(model)) {
      const values = args[0].slice(0, 8), max = Math.max(...values);
      return `<div class="banner-bars">${values.map((value, index) => `<span style="--i:${index};--h:${Math.round(18 + 82 * value / max)}%"><b>${esc(String(value))}</b></span>`).join("")}</div>`;
    }
    if (/Search|count/.test(model)) {
      const values = args[0].slice(0, 10), hit = values.indexOf(args[1]);
      return `<div class="banner-cells">${values.map((value, index) => cell(value, index, index === hit ? "is-hit" : index < hit ? "is-seen" : "")).join("")}</div>`;
    }
    if (/^list/.test(model)) return `<div class="banner-chain"><span class="anchor">Anker</span>${args[0].slice(0, 4).map(([id, data], index) => `<i>→</i><span style="--i:${index}"><b>${esc(data)}</b><em>${esc(args[0][index + 1]?.[0] ?? "NULL")}</em></span>`).join("")}<i>→</i><span class="null">NULL</span></div>`;
    if (model === "stack" || model === "typing") return `<div class="banner-stack">${["Tom", "bin", "Ich", "Hallo"].map((value, index) => `<span style="--i:${index}">${value}</span>`).join("")}<small>PUSH ↓ · ↑ POP</small></div>`;
    if (model === "queue") return `<div class="banner-queue"><small>vorne</small>${["T085", "T432", "T021", "T099"].map((value, index) => `<span style="--i:${index}">${value}</span>`).join("")}<small>hinten</small></div>`;
    if (model === "tree") return `<svg class="banner-tree" viewBox="0 0 280 120" role="presentation"><g><line x1="140" y1="22" x2="75" y2="62"/><line x1="140" y1="22" x2="205" y2="62"/><line x1="75" y1="62" x2="40" y2="102"/><line x1="75" y1="62" x2="110" y2="102"/><line x1="205" y1="62" x2="170" y2="102"/><line x1="205" y1="62" x2="240" y2="102"/></g>${[[140, 22, 50], [75, 62, 30], [205, 62, 70], [40, 102, 20], [110, 102, 40], [170, 102, 60], [240, 102, 80]].map(([x, y, v], index) => `<g style="--i:${index}"><circle cx="${x}" cy="${y}" r="15"/><text x="${x}" y="${y + 4}">${v}</text></g>`).join("")}</svg>`;
    if (!unit.stepLab && !unit.trace) return `<div class="banner-flow">${["Eingabe", "Verarbeitung", "Ausgabe"].map((step, index) => `${index ? "<i>→</i>" : ""}<span style="--i:${index}">${step}</span>`).join("")}</div>`;
    const values = (args[0] || unit.trace?.[0].values || []).slice(0, 8);
    return `<div class="banner-cells">${values.map((value, index) => cell(value, index)).join("")}</div>`;
  }
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
    const preview = developerMode && !engine.unlocked(state, id);
    const codeTasks = unit.tasks.filter(task => task.type === "code").length;
    const visual = unit.image
      ? `<figure class="lesson-photo"><img src="${unit.image.src}" width="1672" height="941" alt="${esc(unit.image.alt)}"><figcaption>${esc(unit.image.caption)}</figcaption></figure>`
      : `<figure class="lesson-banner ${module.color}" aria-hidden="true"><div class="banner-code">${unit.id}</div>${bannerVisual(unit)}<figcaption>${esc(module.title)} · ${module.plan}</figcaption></figure>`;
    const header = `<div class="breadcrumb"><a href="#path/${module.id}">${module.id} · ${module.title}</a><span aria-hidden="true">/</span><span>${unit.id}</span></div><section class="lesson-heading"><span class="eyebrow">${status(unit).toUpperCase()}</span><h2>${esc(unit.title)}</h2><p>${esc(unit.description)}</p><div class="lesson-points"><span id="lesson-score">${engine.earned(state, id)} / ${unit.points} Punkte</span><progress id="lesson-progress" value="${engine.earned(state, id)}" max="${unit.points}" aria-label="Punkte in ${id}"></progress></div>${unit.ready ? `<ul class="lesson-meta"><li>${icon("check")} ${unit.tasks.length} Pflichtaufgaben</li>${codeTasks ? `<li>${icon("spark")} ${codeTasks} × Python im Browser</li>` : ""}<li>${icon("notes")} Material ${unit.sourceRefs.join(", ")}</li></ul>` : ""}</section>${visual}<div class="lesson-intro">${unit.situation ? `<section class="lesson-panel mission"><span class="eyebrow">DEINE MISSION</span><h3>${esc(unit.situation.title)}</h3><p>${esc(unit.situation.text)}</p></section>` : ""}<section class="lesson-panel goals"><span class="eyebrow">LERNZIELE</span><h3>Das lernst du hier</h3><ul class="goal-list">${unit.goals.map(goal => `<li>${esc(goal)}</li>`).join("")}</ul></section></div>`;
    if (!unit.ready) {
      main.innerHTML = `${header}<section class="lesson-panel preparation"><span class="eyebrow">IN VORBEREITUNG</span><h3>Hier entsteht deine nächste Lerneinheit.</h3><p>Die Erklärungen und Aufgaben werden noch ausgearbeitet. Hier kannst du noch keine Punkte sammeln.</p><a href="#path/${module.id}">Zur Übersicht von ${module.id} →</a></section>`; return;
    }
    const reflections = (unit.reflections || []).map(field => `<div class="reflection"><label for="work-${field.id}">${esc(field.title)}</label><p>${esc(field.prompt)}</p><textarea id="work-${field.id}" data-work="${field.id}" data-work-unit="${id}" maxlength="20000" rows="4">${esc(workValue(id, field.id))}</textarea><small class="draft-status" role="status"></small><details><summary>Meine Erklärung selbst überprüfen</summary><p>${esc(field.criteria)}</p></details></div>`).join("");
    const tasks = unit.tasks.map((task, index) => {
      if (task.type === "code") return renderCodeTask(unit, task);
      const answer = state.answers[id]?.[task.id]; const solved = answer === task.correct;
      return `<form class="task" data-unit="${id}" data-task="${task.id}"><fieldset ${solved ? "disabled" : ""}><legend><span class="task-number">${index + 1}</span> ${esc(task.prompt)}</legend>${task.options.map((option, choice) => `<label class="choice"><input type="radio" name="choice" value="${choice}" ${answer === choice ? "checked" : ""} required><span>${esc(option)}</span></label>`).join("")}</fieldset><div class="task-actions">${solved ? `<span class="task-success">✓ Bestanden · ${task.points} Punkte</span>` : `<button type="submit">Antwort prüfen</button>`}<p role="status" class="task-feedback">${answer !== undefined && !solved ? esc(task.hint) : ""}</p></div></form>`;
    }).join("");
    main.innerHTML = `${header}${preview ? '<aside class="notice">Entwicklervorschau: Du kannst die Inhalte ansehen und Code ausprobieren. Punkte und Abschlüsse erhältst du erst in der normalen Lernreihenfolge.</aside>' : ""}<section class="lesson-panel"><span class="eyebrow">1 · VERSTEHEN</span><h3>${esc(unit.readTitle)}</h3><p>${esc(unit.intro)}</p><div class="examples">${unit.examples.map(example => `<details><summary>${esc(example.title)}</summary><p>${esc(example.text)}</p>${example.code ? `<pre><code>${esc(example.code)}</code></pre>` : ""}${example.nsd ? renderNsd(example.nsd) : ""}</details>`).join("")}</div></section>${unit.help ? `<aside class="lesson-panel"><strong>Python auffrischen</strong><p>${esc(unit.help.text || "Wenn dir Listen noch nicht vertraut sind, hilft dir diese Grundlagenlektion.")}</p>${(unit.help.links || [unit.help]).map(link => `<p><a href="${link.href}" target="_blank" rel="noopener noreferrer">${esc(link.label)} ↗</a></p>`).join("")}</aside>` : ""}${unit.explorer ? renderArrayLab(unit) : ""}${reflections ? `<section class="lesson-panel"><span class="eyebrow">2 · IN EIGENEN WORTEN</span><h3>Deine Erklärungen festhalten</h3><p>Diese Notizen helfen dir beim Gespräch mit deiner Lehrkraft. Sie werden gespeichert; es gibt dafür keine automatische Bewertung oder zusätzlichen Punkte.</p>${reflections}</section>` : ""}<section class="lesson-panel"><span class="eyebrow">SELBST ÜBERPRÜFEN</span><h3>${esc(unit.checkTitle)}</h3><p>Die Punkte stehen bei jeder Aufgabe. Du kannst erneut versuchen. Bereits erreichte Punkte bleiben erhalten.</p>${tasks}</section>${unit.extras?.length ? `<section class="lesson-panel extras-panel"><span class="eyebrow">VERTIEFEN</span><h3>Vertiefung und Zusatzaufgaben</h3><p>Diese Aufgaben sind freiwillig. Sie werden genauso geprüft, bringen aber keine Punkte und sind für die Freischaltung nicht nötig. Ideal, wenn du schneller fertig bist oder für die Prüfung üben möchtest.</p>${unit.extras.map(task => renderCodeTask(unit, task)).join("")}</section>` : ""}${renderPracticeLinks(unit)}${renderResults(unit)}${renderUnitSelfcheck(unit)}<section class="lesson-panel completion"><span class="eyebrow">ABSCHLIESSEN</span><h3>${complete ? `${id} ist abgeschlossen.` : "Bereit für den nächsten Schritt?"}</h3><p>${complete ? `Du hast ${unit.points} Punkte erreicht.` : `Bestehe alle ${unit.tasks.length} Pflichtaufgaben und erreiche ${unit.points} Punkte. Danach kannst du ${id} abschließen${next ? ` und ${next.id} freischalten` : ""}.`}</p>${complete ? (next ? `<a class="primary" href="#unit/${next.id}">Weiter zu ${next.id} →</a>` : '<a class="primary" href="#progress">Zu deinem Lernstand</a>') : `<button class="primary" data-finish="${id}" ${engine.passed(state, id) && !preview ? "" : "disabled"}>Einheit abschließen · ${unit.points} Punkte</button>`}</section>`;
    if (unit.loopExplorer) {
      const panel = document.createElement("section");
      panel.className = "lesson-panel loop-lab";
      panel.innerHTML = `<span class="eyebrow">2 · AUSPROBIEREN</span><h3>Ein Durchlauf nach dem anderen</h3><p>Sage zuerst voraus, welcher Name als Nächstes erscheint. Gehe dann Schritt für Schritt durch die Schleife. Vergleiche auch eine Liste mit einem Namen und eine leere Liste.</p><label for="loop-case">Testliste auswählen</label><select id="loop-case"><option value="team">Drei Namen</option><option value="single">Ein Name</option><option value="empty">Leere Liste</option></select><pre id="loop-code"></pre><div class="array-fields" id="loop-fields"></div><p id="loop-state" role="status"></p><pre id="loop-output" aria-label="Ausgabe der Schleife"></pre><div class="code-actions"><button id="loop-next">Nächster Schritt</button><button id="loop-reset">Neu beginnen</button></div>`;
      main.querySelector(".reflection")?.closest(".lesson-panel").before(panel);
      setupLoopLab();
    }
    if (unit.analysisExplorer) {
      const panel = document.createElement("section");
      panel.className = "lesson-panel analysis-lab";
      panel.innerHTML = `<span class="eyebrow">2 · AUSPROBIEREN</span><h3>Die Auswertung entsteht Wert für Wert</h3><p>Sage zuerst Minimum, Maximum und Summe für den nächsten Schritt voraus. Prüfe deine Vorhersage dann mit dem Modell. Negative Werte gehören hier zum Transfer auf Messreihen, nicht zu Dartpunkten.</p><label for="analysis-case">Testreihe auswählen</label><select id="analysis-case"><option value="training">Training: sechs Würfe</option><option value="positive">Nur positive Werte</option><option value="negative">Transfer: negative Messwerte</option><option value="equal">Gleiche Werte</option><option value="single">Ein einzelner Wert</option><option value="zero">Nur Nullen</option><option value="empty">Leere Liste</option></select><pre id="analysis-code"></pre><div class="array-fields" id="analysis-fields"></div><dl class="analysis-markers" id="analysis-markers"></dl><p id="analysis-state" role="status"></p><div class="code-actions"><button id="analysis-next">Nächsten Wert prüfen</button><button id="analysis-reset">Neu beginnen</button></div><h4>Dein Schreibtischtest im Modell</h4><div class="analysis-table-wrap" role="region" aria-label="Zwischenergebnisse des Schreibtischtests" tabindex="0"><table class="analysis-table"><caption>Erst vorhersagen, dann die nächste Zeile aufdecken</caption><thead><tr><th scope="col">Index</th><th scope="col">Wert</th><th scope="col">Minimum</th><th scope="col">Maximum</th><th scope="col">Summe</th></tr></thead><tbody id="analysis-history"></tbody></table></div>`;
      main.querySelector(".reflection")?.closest(".lesson-panel").before(panel);
      setupAnalysisLab();
    }
    if (unit.explorer) setupArrayLab(unit);
    if (unit.stepLab) {
      const panel = document.createElement("section");
      panel.className = "lesson-panel step-lab";
      const lab = unit.stepLab;
      panel.innerHTML = `<span class="eyebrow">2 · AUSPROBIEREN</span><h3>${esc(lab.title)}</h3><p>${esc(lab.text)}</p>${lab.cases.length > 1 ? `<label for="step-case">Beispiel auswählen</label><select id="step-case">${lab.cases.map((item, index) => `<option value="${index}">${esc(item.label)}</option>`).join("")}</select>` : ""}<div class="step-grid"><div class="step-codebox"><div class="view-switch" id="step-view" role="group" aria-label="Darstellung des Algorithmus" hidden><button type="button" data-view="code" aria-pressed="true">Python</button><button type="button" data-view="nsd" aria-pressed="false">Struktogramm</button></div><ol class="step-code" id="step-code" aria-label="Algorithmus"></ol><div class="nsd-wrap" id="step-nsd" hidden></div></div><div class="step-view"><div class="array-fields step-fields" id="step-fields"></div><dl class="step-vars" id="step-vars"></dl></div></div><p class="step-state" id="step-state" role="status"></p><div class="code-actions"><button id="step-back">← Zurück</button><button class="primary" id="step-next">Nächster Schritt →</button><button id="step-reset">Neu beginnen</button></div><p class="step-legend"><span class="legend active">betrachtet</span><span class="legend changed">verändert</span><span class="legend compare">verglichen</span><span class="legend done">fertig</span><span class="legend error">überschrieben/entfernt</span></p>`;
      const anchor = main.querySelector(".reflection")?.closest(".lesson-panel") || main.querySelector(".task, .code-task")?.closest(".lesson-panel");
      anchor.before(panel);
      setupStepLab(lab);
    }
    if (unit.treeLab) {
      const panel = document.createElement("section");
      panel.className = "lesson-panel tree-lab";
      const lab = unit.treeLab;
      panel.innerHTML = `<span class="eyebrow">AUSPROBIEREN</span><h3>${esc(lab.title)}</h3><p>${esc(lab.text)}</p><label for="tree-case">Baum auswählen</label><select id="tree-case">${lab.cases.map((item, index) => `<option value="${index}">${esc(item.label)}</option>`).join("")}</select><p class="tree-note" id="tree-note"></p><div class="tree-view" id="tree-view"></div><dl class="step-vars" id="tree-facts"></dl><div class="analysis-table-wrap" id="tree-table"></div><h4>Erst vorhersagen, dann prüfen</h4><div class="tree-quiz" id="tree-quiz"></div><div class="code-actions"><button class="primary" id="tree-check">Vorhersagen prüfen</button><span id="tree-score" role="status"></span></div>`;
      (main.querySelector(".reflection")?.closest(".lesson-panel") || main.querySelector(".task, .code-task")?.closest(".lesson-panel")).before(panel);
      setupTreeLab(lab);
    }
    numberSections(id);
  }
  // Arbeitsschritte einer Lektion fortlaufend nummerieren und als Kapitelleiste anbieten.
  function numberSections(unitId) {
    const kinds = [
      [panel => panel.querySelector(".examples"), "Verstehen"],
      [panel => panel.matches(".array-lab, .loop-lab, .analysis-lab, .step-lab, .tree-lab"), "Ausprobieren"],
      [panel => panel.querySelector(".reflection"), "Erklären"],
      [panel => panel.matches(".extras-panel"), "Vertiefen"],
      [panel => panel.querySelector(".task, .code-task"), "Überprüfen"],
      [panel => panel.matches(".results-panel"), "Sichern"],
      [panel => panel.matches(".can-list"), "Einschätzen"],
      [panel => panel.matches(".completion"), "Abschließen"]
    ];
    const titles = { Verstehen: "VERSTEHEN", Ausprobieren: "AUSPROBIEREN", Erklären: "IN EIGENEN WORTEN", Überprüfen: "SELBST ÜBERPRÜFEN", Vertiefen: "VERTIEFEN (FREIWILLIG)", Sichern: "ERGEBNISSE SICHERN", Einschätzen: "ICH-KANN-CHECK", Abschließen: "ABSCHLIESSEN" };
    const steps = [];
    main.querySelectorAll(":scope > .lesson-panel").forEach(panel => {
      const kind = kinds.find(([test]) => test(panel))?.[1];
      if (!kind) return;
      const number = steps.length + 1;
      panel.dataset.step = number;
      panel.id = `abschnitt-${number}`;
      panel.setAttribute("tabindex", "-1");
      const eyebrow = panel.querySelector(":scope > .eyebrow");
      if (eyebrow) eyebrow.textContent = `${number} · ${titles[kind]}`;
      steps.push({ number, kind, panel });
    });
    if (steps.length < 3) return;
    const solved = unitId => engine.byId(unitId).tasks.filter(task => state.answers[unitId]?.[task.id] === task.correct).length;
    const nav = document.createElement("nav");
    nav.className = "lesson-steps";
    nav.setAttribute("aria-label", "Arbeitsschritte dieser Lerneinheit");
    nav.innerHTML = `<ol>${steps.map(step => `<li><button type="button" data-goto="${step.number}"><span>${step.number}</span>${step.kind}${step.kind === "Überprüfen" ? ` <small>${solved(unitId)}/${engine.byId(unitId).tasks.length}</small>` : ""}</button></li>`).join("")}</ol>`;
    steps[0].panel.before(nav);
    nav.addEventListener("click", event => {
      const button = event.target.closest("[data-goto]");
      if (!button) return;
      const target = main.querySelector(`#abschnitt-${button.dataset.goto}`);
      target.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
      target.focus({ preventScroll: true });
    });
    const observer = new IntersectionObserver(entries => {
      entries.filter(entry => entry.isIntersecting).forEach(entry => {
        nav.querySelectorAll("button").forEach(button => button.toggleAttribute("aria-current", button.dataset.goto === entry.target.dataset.step));
        const current = nav.querySelector("button[aria-current]"), list = nav.querySelector("ol");
        if (current && list.scrollWidth > list.clientWidth) list.scrollTo({ left: current.offsetLeft - 8 });
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    steps.forEach(step => observer.observe(step.panel));
    mapListenerController.signal.addEventListener("abort", () => observer.disconnect(), { once: true });
  }
  // Darstellung dynamischer Datenstrukturen im Schrittmodell (L3).
  function renderStructure(kind, step) {
    const { structure, marks } = step;
    if (kind === "list") {
      const order = window.ALGOLAB_DS_MODELS.chain(structure);
      const node = id => `<div class="ll-node trace-field ${marks[id] || ""}"><small>${esc(id)}</small><div class="ll-cells"><span class="ll-data">${esc(structure.nodes[id].data)}</span><span class="ll-ptr">${esc(structure.nodes[id].next ?? "NULL")}</span></div></div>`;
      const loose = Object.keys(structure.nodes).filter(id => !order.includes(id));
      return `<div class="ll-row"><div class="ll-anchor"><small>Anker</small><span>${esc(structure.anchor ?? "NULL")}</span></div>${order.map(id => `<span class="ll-arrow" aria-hidden="true">→</span>${node(id)}`).join("")}<span class="ll-arrow" aria-hidden="true">→</span><span class="ll-null">NULL</span></div>${loose.length ? `<div class="ll-loose"><small>Nicht (mehr) über den Anker erreichbar:</small><div class="ll-row">${loose.map(node).join("")}</div></div>` : ""}`;
    }
    const items = structure.items.map((value, index) => `<div class="trace-field ${marks[index] || ""}"><strong>${esc(value)}</strong></div>`);
    const out = structure.out.length ? `<div class="ds-out"><small>${kind === "stack" ? "Entnommen (POP)" : "Abgefertigt (DEQUEUE)"}</small><div>${structure.out.map((value, index) => `<span class="${marks.taken !== undefined && index === structure.out.length - 1 ? "is-new" : ""}">${esc(value)}</span>`).join("")}</div></div>` : "";
    if (kind === "stack") return `<div class="stack-box"><small class="stack-top">oben ↓ PUSH / ↑ POP</small><div class="stack-items">${items.reverse().join("") || "<p>leer</p>"}</div></div>${out}`;
    return `<div class="queue-box"><small>vorne · DEQUEUE ←</small><div class="queue-items">${items.join("") || "<p>leer</p>"}</div><small>← ENQUEUE · hinten</small></div>${out}`;
  }
  function structureVars(kind, step) {
    const { structure } = step;
    if (kind === "list") return [["Anker", structure.anchor ?? "NULL"], ["Knoten in der Liste", window.ALGOLAB_DS_MODELS.chain(structure).length]];
    const items = structure.items;
    if (kind === "stack") return [["oben", items.at(-1) ?? "—"], ["Anzahl", items.length]];
    return [["vorne", items[0] ?? "—"], ["hinten", items.at(-1) ?? "—"], ["Anzahl", items.length]];
  }
  // Baum-Prüfstand: Baum zeichnen, Tabelle zeigen, Eigenschaften erst vorhersagen, dann prüfen.
  function treeLayout(tree) {
    const placed = [], edges = [];
    let leafX = 0;
    const children = node => node.kinder ? node.kinder : (node.links || node.rechts ? [node.links || { ghost: true }, node.rechts || { ghost: true }] : []);
    const place = (node, depth) => {
      const kids = children(node).map(child => place(child, depth + 1));
      const x = kids.length ? (kids[0].x + kids.at(-1).x) / 2 : leafX++;
      const item = { node, x, depth };
      if (!node.ghost) { placed.push(item); kids.filter(kid => !kid.node.ghost).forEach(kid => edges.push([item, kid])); }
      return item;
    };
    if (tree) place(tree, 0);
    return { placed, edges, width: Math.max(1, leafX), depth: Math.max(0, ...placed.map(item => item.depth)) + 1 };
  }
  function renderTreeSvg(tree, highlight = []) {
    const { placed, edges, width, depth } = treeLayout(tree);
    const W = Math.max(320, width * 92), H = depth * 86 + 20, sx = x => (x + .5) * (W / width), sy = d => 44 + d * 86;
    const label = text => String(text).length > 11 ? `${String(text).slice(0, 10)}…` : String(text);
    return `<svg class="tree-svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Baumdiagramm mit ${placed.length} Knoten">${edges.map(([a, b]) => `<line x1="${sx(a.x)}" y1="${sy(a.depth)}" x2="${sx(b.x)}" y2="${sy(b.depth)}"/>`).join("")}${placed.map(item => `<g class="${highlight.includes(item.node.inhalt) ? "is-marked" : ""}"><title>${esc(item.node.inhalt)}</title><rect x="${sx(item.x) - 42}" y="${sy(item.depth) - 19}" width="84" height="38" rx="10"/><text x="${sx(item.x)}" y="${sy(item.depth) + 5}">${esc(label(item.node.inhalt))}</text></g>`).join("")}</svg>`;
  }
  function setupTreeLab(lab) {
    const panel = main.querySelector(".tree-lab");
    const props = [["binary", "Binärbaum"], ["full", "voll"], ["complete", "vollständig"], ["sorted", "sortiert (binärer Suchbaum)"]];
    const draw = () => {
      const item = lab.cases[Number(panel.querySelector("#tree-case").value)];
      const tree = item.table ? window.ALGOLAB_DS_MODELS.fromTable(item.table) : item.tree;
      const result = window.ALGOLAB_DS_MODELS.analyseTree(tree);
      panel.querySelector("#tree-view").innerHTML = renderTreeSvg(tree);
      panel.querySelector("#tree-note").textContent = item.note || "";
      panel.querySelector("#tree-table").innerHTML = item.table ? `<table class="analysis-table"><caption>Tabellarische Darstellung</caption><thead><tr><th scope="col">Index</th><th scope="col">Inhalt</th><th scope="col">Linkes Kind</th><th scope="col">Rechtes Kind</th></tr></thead><tbody>${item.table.map((row, index) => `<tr><th scope="row">${index}</th><td>${esc(row.inhalt)}</td><td>${row.links ?? "NULL"}</td><td>${row.rechts ?? "NULL"}</td></tr>`).join("")}</tbody></table>` : "";
      panel.querySelector("#tree-facts").innerHTML = [["Wurzel", result.root], ["Blätter", result.leaves.join(", ")], ["Höhe", result.height], ["Knoten", result.nodes.length]].map(([name, value]) => `<div><dt>${name}</dt><dd>${esc(String(value))}</dd></div>`).join("");
      panel.querySelector("#tree-quiz").innerHTML = props.map(([key, name]) => `<fieldset class="tree-prop" data-prop="${key}"><legend>Ist der Baum ${name}?</legend><label><input type="radio" name="tree-${key}" value="ja"> Ja</label><label><input type="radio" name="tree-${key}" value="nein"> Nein</label><p class="tree-reason" hidden></p></fieldset>`).join("");
      panel.dataset.result = JSON.stringify(result, (k, v) => k === "node" || k === "nodes" ? undefined : v);
    };
    panel.querySelector("#tree-case").addEventListener("change", draw);
    panel.querySelector("#tree-check").addEventListener("click", () => {
      const result = JSON.parse(panel.dataset.result);
      let correct = 0;
      props.forEach(([key]) => {
        const box = panel.querySelector(`[data-prop="${key}"]`), choice = box.querySelector("input:checked")?.value;
        const right = (choice === "ja") === result[key];
        if (choice && right) correct++;
        box.classList.toggle("is-right", Boolean(choice) && right);
        box.classList.toggle("is-wrong", Boolean(choice) && !right);
        const reason = box.querySelector(".tree-reason");
        reason.hidden = false;
        reason.textContent = `${result[key] ? "Ja" : "Nein"}. ${result.reasons[key]}`;
      });
      panel.querySelector("#tree-score").textContent = `${correct} von ${props.length} Vorhersagen richtig.`;
    });
    draw();
  }
  // Struktogramm (Nassi-Shneiderman) nach der Operatorenliste Baden-Württemberg zeichnen.
  const preferredView = () => { try { return localStorage.getItem("algolab-view-v1") === "nsd" ? "nsd" : "code"; } catch { return "code"; } };
  function renderNsd(nsd, line = null) {
    const text = value => {
      const match = /^(Zuweisung|Deklaration und Initialisierung|Aufruf|Einlesen|Ausgabe|Rückgabe): (.*)$/.exec(value);
      return match ? `<span class="nsd-op">${esc(match[1])}:</span> ${esc(match[2])}` : esc(value);
    };
    const current = block => block.l?.includes(line) ? " is-current" : "";
    const list = blocks => blocks.length ? blocks.map(block).join("") : '<div class="nsd-s nsd-empty">∅</div>';
    function block(item) {
      if (item.s) return `<div class="nsd-s${current(item)}">${text(item.s)}</div>`;
      if (item.loop) return `<div class="nsd-loop"><div class="nsd-head${current(item)}">${text(item.loop)}</div><div class="nsd-body">${list(item.body)}</div></div>`;
      return `<div class="nsd-if"><div class="nsd-cond${current(item)}"><svg class="nsd-tri" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><line x1="0" y1="0" x2="50" y2="100"/><line x1="100" y1="0" x2="50" y2="100"/></svg><span>${esc(item.if)}</span><b class="nsd-j">J</b><b class="nsd-n">N</b></div><div class="nsd-branches"><div>${list(item.yes)}</div><div>${list(item.no)}</div></div></div>`;
    }
    return `<figure class="nsd" aria-label="Struktogramm ${esc(nsd.title)}"><figcaption>${esc(nsd.title)}</figcaption><div class="nsd-box">${list(nsd.blocks)}</div></figure>`;
  }
  function setupStepLab(lab) {
    let step = 0, trace;
    const load = () => {
      const item = lab.cases[Number(main.querySelector("#step-case")?.value || 0)];
      trace = (window.ALGOLAB_ARRAY_MODELS[item.model] || window.ALGOLAB_DS_MODELS[item.model])(...item.args);
      main.querySelector("#step-code").classList.toggle("is-prose", trace.kind === "list");
      main.querySelector("#step-view").hidden = !trace.nsd;
      showView(trace.nsd ? preferredView() : "code");
      main.querySelector("#step-code").innerHTML = trace.code.map(line => `<li><code>${esc(line)}</code></li>`).join("");
      step = 0; draw();
    };
    const draw = () => {
      const current = trace.steps[step];
      main.querySelectorAll("#step-code li").forEach((line, index) => line.classList.toggle("current", index === current.line));
      if (trace.nsd && !main.querySelector("#step-nsd").hidden) main.querySelector("#step-nsd").innerHTML = renderNsd(trace.nsd, current.line);
      const fields = main.querySelector("#step-fields");
      fields.className = `array-fields step-fields ${trace.kind ? `ds-view ds-${trace.kind}` : ""}`;
      fields.innerHTML = trace.kind ? renderStructure(trace.kind, current) : current.values.length ? current.values.map((value, index) => `<div class="trace-field ${current.marks[index] || ""}"><small>Index ${index}</small><strong>${esc(String(value))}</strong></div>`).join("") : "<p>Die Liste ist leer.</p>";
      main.querySelector("#step-vars").innerHTML = (current.vars || structureVars(trace.kind, current)).map(([name, value]) => `<div><dt>${esc(name)}</dt><dd>${esc(String(value))}</dd></div>`).join("");
      main.querySelector("#step-state").textContent = `Schritt ${step + 1}/${trace.steps.length}: ${current.explanation}`;
      main.querySelector("#step-next").disabled = step === trace.steps.length - 1;
      main.querySelector("#step-back").disabled = step === 0;
    };
    main.querySelector("#step-next").addEventListener("click", () => { step = Math.min(step + 1, trace.steps.length - 1); draw(); });
    main.querySelector("#step-back").addEventListener("click", () => { step = Math.max(step - 1, 0); draw(); });
    main.querySelector("#step-reset").addEventListener("click", () => { step = 0; draw(); });
    function showView(view) {
      main.querySelectorAll("#step-view button").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.view === view)));
      main.querySelector("#step-code").hidden = view !== "code";
      main.querySelector("#step-nsd").hidden = view !== "nsd";
      main.querySelector(".step-grid").classList.toggle("is-nsd", view === "nsd");
      if (view === "nsd" && trace?.nsd) main.querySelector("#step-nsd").innerHTML = renderNsd(trace.nsd, trace.steps[step]?.line ?? null);
    }
    main.querySelector("#step-view").addEventListener("click", event => {
      const button = event.target.closest("[data-view]");
      if (!button) return;
      try { localStorage.setItem("algolab-view-v1", button.dataset.view); } catch { /* Auswahl gilt dann nur für diese Seite. */ }
      showView(button.dataset.view);
    });
    main.querySelector("#step-case")?.addEventListener("change", load);
    load();
  }
  function setupAnalysisLab() {
    const cases = { training: [18, 42, 0, 30, 12, 24], positive: [13, 8, 21], negative: [-8, -3, -11, -3], equal: [9, 9, 9], single: [6], zero: [0, 0], empty: [] };
    let step = 0;
    const draw = () => {
      const values = cases[main.querySelector("#analysis-case").value];
      const steps = window.traceAlgoLabAnalysis(values), current = steps[step];
      main.querySelector("#analysis-code").textContent = values.length ? `werte = ${JSON.stringify(values)}\n# Modell: erst auf leere Liste prüfen.\n# Bei [] ist das Ergebnis None; keine Auswertung.\n# Für eine nicht leere Liste:\nkleinster = werte[0]\ngroesster = werte[0]\nsumme = 0\nfor i in range(len(werte)):\n    wert = werte[i]\n    if wert < kleinster:\n        kleinster = wert\n    if wert > groesster:\n        groesster = wert\n    summe = summe + wert\ndurchschnitt = summe / len(werte)` : "werte = []\n# In analysiere wird vor werte[0] geprüft:\nif not werte:\n    return None";
      main.querySelector("#analysis-fields").innerHTML = values.length ? values.map((value, index) => `<div class="trace-field ${current.index === index ? "changed" : ""}"><small>Index ${index}</small><strong>${value}</strong></div>`).join("") : "<p>Keine Felder: Die Liste ist leer.</p>";
      main.querySelector("#analysis-markers").innerHTML = [["Minimum", current.min], ["Maximum", current.max], ["Summe", current.sum], ["Durchschnitt", current.average]].map(([name, value]) => `<div><dt>${name}</dt><dd>${value === null ? "—" : value}</dd></div>`).join("");
      main.querySelector("#analysis-state").textContent = `Schritt ${step + 1}/${steps.length}: ${current.explanation}`;
      main.querySelector("#analysis-next").disabled = current.done;
      main.querySelector("#analysis-next").textContent = current.done ? "Auswertung abgeschlossen" : step === steps.length - 2 ? "Durchschnitt berechnen" : "Nächsten Wert prüfen";
      main.querySelector("#analysis-history").innerHTML = steps.slice(0, step + 1).filter(item => item.index !== null).map(item => `<tr><th scope="row">${item.index}</th><td>${values[item.index]}</td><td>${item.min}</td><td>${item.max}</td><td>${item.sum}</td></tr>`).join("") || '<tr><td colspan="5">Noch kein Wert geprüft.</td></tr>';
    };
    main.querySelector("#analysis-next").addEventListener("click", () => { step++; draw(); });
    main.querySelector("#analysis-reset").addEventListener("click", () => { step = 0; draw(); });
    main.querySelector("#analysis-case").addEventListener("change", () => { step = 0; draw(); });
    draw();
  }
  function setupLoopLab() {
    const cases = { team: ["Mila", "Jonas", "Sam"], single: ["Solo"], empty: [] };
    let step = 0;
    const draw = () => {
      const names = cases[main.querySelector("#loop-case").value];
      const steps = window.traceAlgoLabLoop(names), current = steps[step];
      main.querySelector("#loop-code").textContent = `namen = ${JSON.stringify(names)}\nfor i in range(len(namen)):\n    print(namen[i])`;
      main.querySelector("#loop-fields").innerHTML = names.length ? names.map((name, index) => `<div class="trace-field ${current.index === index ? "changed" : ""}"><small>Index ${index}</small><strong>${esc(name)}</strong></div>`).join("") : "<p>Keine Felder: Die Liste ist leer.</p>";
      main.querySelector("#loop-state").textContent = `Schritt ${step + 1}/${steps.length}: ${current.explanation}`;
      main.querySelector("#loop-output").textContent = current.output.join("\n") || "(noch keine Ausgabe)";
      main.querySelector("#loop-next").disabled = current.done;
    };
    main.querySelector("#loop-next").addEventListener("click", () => { step++; draw(); });
    main.querySelector("#loop-reset").addEventListener("click", () => { step = 0; draw(); });
    main.querySelector("#loop-case").addEventListener("change", () => { step = 0; draw(); });
    draw();
  }
  function renderArrayLab(unit) {
    return `<section class="lesson-panel array-lab"><span class="eyebrow">2 · AUSPROBIEREN</span><h3>Das Array unter der Lupe</h3><p>Klicke auf ein Feld. Lies seinen Index und ändere seinen Wert. Vergleiche, was beim Ersetzen und beim Anhängen mit der Länge passiert.</p><div class="array-fields" id="array-fields"></div><p id="array-reading" role="status"></p><form id="array-edit"><label for="array-value">Neuer Wert für das ausgewählte Feld</label><input id="array-value" type="number" step="1" min="-9999" max="9999" value="11" required><button>Wert ersetzen</button></form><div class="code-actions"><button id="array-append">7 am Ende ergänzen</button><button id="array-reset">Modell zurücksetzen</button></div><p id="array-change" role="status"></p><h4>Schreibtischtest: erst vorhersagen, dann aufdecken</h4><p>Notiere vor jedem Klick den erwarteten Listeninhalt auf Papier. Beobachte nach der nächsten Anweisung die veränderten Felder.</p><pre id="trace-code"></pre><div class="array-fields" id="trace-values"></div><p id="trace-why" role="status"></p><div class="code-actions"><button id="trace-next">Nächste Anweisung</button><button id="trace-reset">Schreibtischtest neu starten</button></div></section>`;
  }
  function setupArrayLab(unit) {
    let values = [12, 8, 15, 9], selected = 0, step = 0;
    const draw = () => {
      main.querySelector("#array-fields").innerHTML = values.map((value, index) => `<button type="button" data-array-index="${index}" aria-pressed="${index === selected}" aria-label="Index ${index}, Wert ${value}"><small>Index ${index}</small><strong>${value}</strong></button>`).join("");
      main.querySelector("#array-reading").textContent = `punkte[${selected}] = ${values[selected]} · Länge: ${values.length} · letzter nichtnegativer Index: ${values.length - 1}`;
      main.querySelector("#array-append").disabled = values.length >= 8;
    };
    main.querySelector("#array-fields").addEventListener("click", event => {
      const button = event.target.closest("[data-array-index]");
      if (button) { selected = Number(button.dataset.arrayIndex); draw(); main.querySelector(`[data-array-index="${selected}"]`).focus(); }
    });
    main.querySelector("#array-edit").addEventListener("submit", event => {
      event.preventDefault(); const value = Number(main.querySelector("#array-value").value);
      if (!Number.isInteger(value) || value < -9999 || value > 9999) return;
      values[selected] = value; draw(); main.querySelector("#array-change").textContent = `punkte[${selected}] = ${value}. Die Länge bleibt ${values.length}.`;
    });
    main.querySelector("#array-append").addEventListener("click", () => {
      if (values.length >= 8) return;
      values.push(7); selected = values.length - 1; draw(); main.querySelector("#array-change").textContent = `punkte.append(7). Die Länge wächst auf ${values.length}.`;
    });
    main.querySelector("#array-reset").addEventListener("click", () => { values = [12, 8, 15, 9]; selected = 0; draw(); main.querySelector("#array-change").textContent = "Das Modell ist zurückgesetzt."; });
    const drawTrace = () => {
      const current = unit.trace[step], previous = unit.trace[step - 1]?.values;
      main.querySelector("#trace-code").textContent = current.code;
      main.querySelector("#trace-values").innerHTML = current.values.map((value, index) => `<div class="trace-field ${previous && value !== previous[index] ? "changed" : ""}"><small>Index ${index}</small><strong>${value}</strong></div>`).join("");
      main.querySelector("#trace-why").textContent = `Schritt ${step + 1}/${unit.trace.length}: ${current.why}`;
      main.querySelector("#trace-next").disabled = step === unit.trace.length - 1;
    };
    main.querySelector("#trace-next").addEventListener("click", () => { if (step < unit.trace.length - 1) step++; drawTrace(); });
    main.querySelector("#trace-reset").addEventListener("click", () => { step = 0; drawTrace(); });
    draw(); drawTrace();
  }
  // Ich-kann-Listen: Selbsteinschätzung je Aussage (☐ / ✓ / ✓✓), unabhängig von Punkten.
  const selfcheckItems = () => content.selfcheck.flatMap(group => group.items.map(item => ({ ...item, module: group.module })));
  function renderRating(item) {
    const level = state.selfcheck?.[item.id] || 0;
    return `<div class="rating" role="group" aria-label="Selbsteinschätzung ${esc(item.module)} ${esc(item.number)}">${content.selfcheckLevels.map(option => `<button type="button" class="rate-${option.value}" data-rate="${item.id}" data-level="${option.value}" aria-pressed="${level === option.value}" title="${esc(option.label)}"><span aria-hidden="true">${option.symbol}</span><span class="sr-only">${esc(option.label)}</span></button>`).join("")}</div>`;
  }
  function renderSelfcheckItem(item, withUnits = true) {
    return `<li class="can-item" data-can="${item.id}"><span class="can-number">${esc(item.number)}</span><div class="can-text"><p>${esc(item.text)}</p>${withUnits ? `<div class="can-units">${item.units.map(unitId => accessible(unitId) ? `<a href="#unit/${unitId}">${unitId}</a>` : `<span>${unitId}</span>`).join("")}</div>` : ""}</div>${renderRating(item)}</li>`;
  }
  function selfcheckSummary(items) {
    const counts = [1, 2, 3].map(level => items.filter(item => state.selfcheck?.[item.id] === level).length);
    const open = items.length - counts.reduce((sum, count) => sum + count, 0);
    return `<div class="can-summary" aria-label="Zusammenfassung"><span class="sum-3">✓✓ ${counts[2]}</span><span class="sum-2">✓ ${counts[1]}</span><span class="sum-1">☐ ${counts[0]}</span>${open ? `<span class="sum-0">offen ${open}</span>` : ""}<div class="can-bar" aria-hidden="true">${[3, 2, 1].map(level => `<i class="bar-${level}" style="flex:${counts[level - 1]}"></i>`).join("")}<i class="bar-0" style="flex:${open}"></i></div></div>`;
  }
  function renderSelfcheck(moduleId) {
    document.querySelector("#page-title").textContent = "Ich-kann-Listen";
    const groups = moduleId ? content.selfcheck.filter(group => group.module === moduleId) : content.selfcheck;
    if (!groups.length) { renderMissing(); return; }
    main.innerHTML = `<div class="path-intro"><span class="eyebrow">SELBSTEINSCHÄTZUNG</span><h2>Was kann ich schon?</h2><p>Schätze dich zu jeder Aussage ehrlich ein: ☐ noch nicht, ✓ ich kann das, ✓✓ ich kann das sicher. Die Einschätzung bringt keine Punkte und ändert keine Freischaltung. Sie hilft dir, gezielt zu wiederholen, und gehört zu deiner Lernstandsdatei.</p><div class="module-tabs"><a href="#selfcheck" ${moduleId ? "" : 'aria-current="page"'}>Alle</a>${content.selfcheck.map(group => `<a href="#selfcheck/${group.module}" ${moduleId === group.module ? 'aria-current="page"' : ""}>${group.module} · ${esc(content.modules.find(module => module.id === group.module).title)}</a>`).join("")}</div></div>${groups.map(group => { const module = content.modules.find(item => item.id === group.module); const items = group.items.map(item => ({ ...item, module: group.module })); return `<section class="lesson-panel can-list ${module.color}"><span class="eyebrow">ICH-KANN-LISTE · LERNFORTSCHRITT ${module.number}</span><h3>${esc(module.title)}</h3>${selfcheckSummary(items)}<ol>${items.map(item => renderSelfcheckItem(item)).join("")}</ol></section>`; }).join("")}`;
  }
  function renderUnitSelfcheck(unit) {
    const items = selfcheckItems().filter(item => item.units.includes(unit.id));
    if (!items.length) return "";
    return `<section class="lesson-panel can-list compact"><span class="eyebrow">ICH-KANN-CHECK</span><h3>Wie sicher bist du jetzt?</h3><p>Diese Aussagen aus der Ich-kann-Liste gehören zu ${unit.id}. Deine Einschätzung findest du später unter <a href="#selfcheck/${unit.id.split(".")[0]}">Ich-kann-Listen</a> wieder.</p><ol>${items.map(item => renderSelfcheckItem(item, false)).join("")}</ol></section>`;
  }
  // Glossar: durchsuchbar nach Begriff, Synonym und Erklärung; Kategorien als Filter.
  const normalizeTerm = text => String(text).toLocaleLowerCase("de").normalize("NFD").replace(/[̀-ͯ]/g, "");
  function renderGlossary(focusTerm) {
    document.querySelector("#page-title").textContent = "Glossar";
    const categories = [...new Set(content.glossary.map(item => item.category))];
    const slug = name => normalizeTerm(name).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    main.innerHTML = `<div class="path-intro"><span class="eyebrow">FACHBEGRIFFE</span><h2>Glossar</h2><p>Die wichtigsten Begriffe aus BPE 7 und der Operatorenliste für Struktogramme – kurz erklärt und mit den Einheiten verknüpft, in denen du sie übst.</p><label class="glossary-search" for="glossary-query"><span>Begriff suchen</span><input id="glossary-query" type="search" placeholder="z. B. Index, LIFO, Bubble-Phase" autocomplete="off"></label><div class="module-tabs" role="group" aria-label="Thema filtern"><button type="button" data-category="" aria-pressed="true">Alle</button>${categories.map(category => `<button type="button" data-category="${esc(category)}" aria-pressed="false">${esc(category)}</button>`).join("")}</div><p class="glossary-count" role="status"></p></div>${categories.map(category => `<section class="lesson-panel glossary-group" data-group="${esc(category)}"><span class="eyebrow">${esc(category.toUpperCase())}</span><dl>${content.glossary.filter(item => item.category === category).map(item => `<div class="glossary-term" id="begriff-${slug(item.name)}" data-search="${esc(normalizeTerm([item.name, ...item.aliases, item.text].join(" ")))}"><dt>${esc(item.name)}${item.aliases.length ? `<small>${item.aliases.map(esc).join(" · ")}</small>` : ""}</dt><dd><p>${esc(item.text)}</p><div class="can-units">${item.units.map(unitId => accessible(unitId) ? `<a href="#unit/${unitId}">${unitId}</a>` : `<span>${unitId}</span>`).join("")}</div></dd></div>`).join("")}</dl></section>`).join("")}<p class="notice glossary-empty" hidden>Kein Begriff gefunden. Versuche ein anderes Stichwort.</p>`;
    let category = "";
    const filter = () => {
      const query = normalizeTerm(main.querySelector("#glossary-query").value.trim());
      let visible = 0;
      main.querySelectorAll(".glossary-group").forEach(group => {
        let groupVisible = 0;
        group.querySelectorAll(".glossary-term").forEach(item => {
          const show = (!category || group.dataset.group === category) && (!query || item.dataset.search.includes(query));
          item.hidden = !show;
          if (show) groupVisible++;
        });
        group.hidden = !groupVisible;
        visible += groupVisible;
      });
      main.querySelector(".glossary-count").textContent = `${visible} von ${content.glossary.length} Begriffen`;
      main.querySelector(".glossary-empty").hidden = visible > 0;
    };
    main.querySelector("#glossary-query").addEventListener("input", filter);
    main.querySelectorAll("[data-category]").forEach(button => button.addEventListener("click", () => {
      category = button.dataset.category;
      main.querySelectorAll("[data-category]").forEach(other => other.setAttribute("aria-pressed", String(other === button)));
      filter();
    }));
    if (focusTerm) main.querySelector("#glossary-query").value = decodeURIComponent(focusTerm);
    filter();
  }
  // Bereich „Programmieren“ nach dem Vorbild von PythonLab: Katalog, Aufgabenseite und freie Werkstatt.
  const practice = content.practice;
  const practiceCheck = window.ALGOLAB_PRACTICE_CHECK;
  const practiceFilter = { level: "", topic: "" };
  const practiceAttempts = new Map();
  const practiceSolved = id => state.practice?.solved?.[id] === true;
  const practiceDraft = (id, fallback) => state.practice?.drafts?.[id] ?? fallback;
  const solvedCount = () => practice.exercises.filter(exercise => practiceSolved(exercise.id)).length;
  function practiceCard(exercise) {
    const solved = practiceSolved(exercise.id);
    return `<a class="practice-card ${solved ? "is-solved" : ""}" href="#programmieren/${exercise.id}" data-level="${esc(exercise.level)}" data-topic="${esc(exercise.topic)}"><span class="practice-state" aria-hidden="true">${solved ? "✓" : "&gt;_"}</span><span class="practice-topic">${esc(exercise.topic)}</span><h3>${esc(exercise.title)}</h3><p>${esc(exercise.description)}</p><span class="practice-meta"><span class="level level-${esc(exercise.level.toLowerCase())}">${esc(exercise.level)}</span><span>passt zu ${exercise.unit}</span>${solved ? '<span class="solved">gelöst</span>' : ""}</span></a>`;
  }
  function renderPracticeCatalog() {
    document.querySelector("#page-title").textContent = "Programmieren";
    const total = practice.exercises.length, solved = solvedCount();
    main.innerHTML = `<section class="practice-lead"><div><span class="eyebrow">SELBST PROGRAMMIEREN</span><h2>Programmieren mit Python</h2><p>Wähle eine Aufgabe, schreibe den Code selbst und lass deine Lösung automatisch mit mehreren Testeingaben prüfen. Fehler gehören dazu: Lies die Meldung, ändere eine Sache und probiere es erneut. Die Aufgaben folgen den Arbeitsaufträgen deines Unterrichtsmaterials und nutzen – wie dort – input() für Eingaben.</p></div><div class="practice-progress"><small>Dein Programmierstand</small><strong>${solved} / ${total}</strong><progress value="${solved}" max="${total}" aria-label="Gelöste Programmieraufgaben"></progress><span>Aufgaben gelöst · zählt nicht für die Freischaltung</span></div></section><a class="practice-workshop" href="#programmieren/werkstatt"><span class="practice-state" aria-hidden="true">{ }</span><span><strong>Python-Werkstatt</strong><small>Freies Programmieren ohne Prüfung – mit Eingaben, Vorlagen für Sortieren, Suchen und Datenstrukturen und gespeichertem Entwurf.</small></span>${icon("arrow")}</a><div class="practice-filters"><div class="module-tabs" role="group" aria-label="Nach Niveau filtern"><button type="button" data-practice-level="" aria-pressed="${!practiceFilter.level}">Alle Niveaus</button>${practice.levels.map(level => `<button type="button" data-practice-level="${esc(level)}" aria-pressed="${practiceFilter.level === level}">${esc(level)}</button>`).join("")}</div><div class="module-tabs" role="group" aria-label="Nach Thema filtern"><button type="button" data-practice-topic="" aria-pressed="${!practiceFilter.topic}">Alle Themen</button>${practice.topics.map(topic => `<button type="button" data-practice-topic="${esc(topic)}" aria-pressed="${practiceFilter.topic === topic}">${esc(topic)}</button>`).join("")}</div><p class="glossary-count" id="practice-count" role="status"></p></div><div class="practice-grid">${practice.exercises.map(practiceCard).join("")}</div>`;
    const apply = () => {
      let visible = 0;
      main.querySelectorAll(".practice-card").forEach(card => {
        const show = (!practiceFilter.level || card.dataset.level === practiceFilter.level) && (!practiceFilter.topic || card.dataset.topic === practiceFilter.topic);
        card.hidden = !show; if (show) visible++;
      });
      main.querySelector("#practice-count").textContent = `${visible} von ${total} Aufgaben`;
    };
    main.querySelectorAll("[data-practice-level], [data-practice-topic]").forEach(button => button.addEventListener("click", () => {
      const key = button.dataset.practiceLevel !== undefined ? "level" : "topic";
      practiceFilter[key] = button.dataset.practiceLevel ?? button.dataset.practiceTopic;
      main.querySelectorAll(key === "level" ? "[data-practice-level]" : "[data-practice-topic]").forEach(other => other.setAttribute("aria-pressed", String(other === button)));
      apply();
    }));
    apply();
  }
  function editorShell({ id, code, input, title = "main.py", check = false }) {
    return `<div class="practice-editor"><div class="editor-toolbar"><strong>${esc(title)}</strong><span class="editor-hint">Tab rückt ein · Strg+Enter startet · Esc, dann Tab verlässt den Editor</span><button type="button" class="icon-button" data-practice-reset title="Startcode wiederherstellen" aria-label="Startcode wiederherstellen">↺</button></div><label class="sr-only" for="practice-code">Python-Code</label><textarea id="practice-code" class="code-editor" data-practice-draft="${esc(id)}" spellcheck="false" autocapitalize="off" maxlength="20000" rows="16">${esc(code)}</textarea><div class="runner-tabs" role="tablist" aria-label="Konsole"><button type="button" role="tab" data-runner-tab="output" aria-selected="true">Ausgabe</button><button type="button" role="tab" data-runner-tab="input" aria-selected="false">Eingabe</button></div><div class="runner-panel" data-runner-panel="output"><pre class="code-output" id="practice-output" tabindex="0" aria-live="polite">Bereit. Starte deinen Code${check ? " oder prüfe die Lösung" : ""}.</pre></div><div class="runner-panel" data-runner-panel="input" hidden><label for="practice-input">Je Zeile eine Eingabe für input()</label><textarea id="practice-input" class="input-area" ${id === "werkstatt" ? 'data-practice-draft="werkstatt-eingabe"' : ""} spellcheck="false" rows="5">${esc(input)}</textarea></div><div class="code-actions"><button type="button" data-practice-run>▶ Code starten</button>${check ? '<button type="button" class="primary" data-practice-check>✓ Code prüfen</button>' : ""}<button type="button" data-practice-stop disabled>Stoppen</button><small class="draft-status" role="status"></small></div></div>`;
  }
  function renderPracticeExercise(id) {
    const exercise = practice.exercises.find(item => item.id === id);
    if (!exercise) { renderMissing(); return; }
    document.querySelector("#page-title").textContent = `Programmieren · ${exercise.title}`;
    const unit = engine.byId(exercise.unit), solved = practiceSolved(exercise.id);
    main.innerHTML = `<div class="breadcrumb"><a href="#programmieren">Programmieren</a><span aria-hidden="true">/</span><span>${esc(exercise.title)}</span></div><section class="lesson-heading"><span class="eyebrow">${esc(exercise.topic.toUpperCase())} · ${esc(exercise.level.toUpperCase())}</span><h2>${esc(exercise.title)}</h2><p>${esc(exercise.description)}</p><ul class="lesson-meta"><li>${icon("notes")} Material ${esc(exercise.source)}</li><li>${icon("check")} ${exercise.check.cases.length} Testfälle</li><li id="practice-solved-chip" ${solved ? "" : "hidden"}>${icon("check")} Gelöst</li></ul></section><div class="practice-workspace"><aside class="lesson-panel practice-brief"><span class="eyebrow">DEINE AUFGABE</span><ol>${exercise.instructions.map(step => `<li>${esc(step)}</li>`).join("")}</ol>${exercise.numericInput ? '<p class="practice-note">input() liefert immer Text. Für Zahlen brauchst du int(input(...)) oder float(input(...)).</p>' : ""}<p class="practice-note">Beim Prüfen wird dein Programm mit mehreren Testeingaben ausgeführt. Bewertet wird nur, was print() ausgibt; Eingabeaufforderungen von input() zählen nicht mit.</p>${unit && accessible(unit.id) ? `<a class="practice-unit" href="#unit/${unit.id}">${icon("route")} Erklärung in ${unit.id} · ${esc(unit.title)}</a>` : `<span class="practice-unit">${icon("route")} Passt zu ${exercise.unit}${unit ? ` · ${esc(unit.title)}` : ""}</span>`}</aside><section class="practice-main">${editorShell({ id: exercise.id, code: practiceDraft(exercise.id, exercise.starter), input: exercise.input || "", check: true })}<div class="result-banner" id="practice-result" role="status" hidden></div><ul class="practice-cases" id="practice-cases" aria-label="Testfälle"></ul><section class="lesson-panel learning-coach"><span class="eyebrow">LERNCOACH</span><h3>Hinweise zu deinem Code</h3><p id="coach-lead">Die Prüfung läuft vollständig in deinem Browser. Hinweise helfen weiter, ohne die Lösung vorwegzunehmen.</p><ul id="coach-hints"></ul><button type="button" data-practice-hint>💡 Lernhinweis anzeigen</button></section></section></div>`;
    setupPracticeEditor(exercise);
  }
  function renderWorkshop() {
    document.querySelector("#page-title").textContent = "Python-Werkstatt";
    const code = practiceDraft("werkstatt", practice.templates[0].code), input = practiceDraft("werkstatt-eingabe", "");
    main.innerHTML = `<div class="breadcrumb"><a href="#programmieren">Programmieren</a><span aria-hidden="true">/</span><span>Python-Werkstatt</span></div><section class="lesson-heading"><span class="eyebrow">FREIES PROGRAMMIEREN</span><h2>Python-Werkstatt</h2><p>Hier gibt es keine Prüfung. Probiere Ideen aus, teste Algorithmen aus dem Unterricht mit eigenen Daten oder bereite eine Lösung vor. Dein Entwurf wird automatisch auf diesem Gerät gespeichert und gehört zur Lernstandsdatei.</p></section><div class="practice-workspace"><aside class="lesson-panel practice-brief"><span class="eyebrow">VORLAGEN</span><p>Lade eine Vorlage als Ausgangspunkt. Dein bisheriger Code wird dabei ersetzt.</p><div class="template-list">${practice.templates.map(template => `<button type="button" data-template="${template.id}">${esc(template.title)}</button>`).join("")}</div><p class="practice-note">Programme werden nach 5 Sekunden gestoppt. Eingaben für input() trägst du im Reiter „Eingabe“ ein – je Zeile eine. Für größere Projekte nutzt du im Unterricht Thonny.</p></aside><section class="practice-main">${editorShell({ id: "werkstatt", code, input, title: "werkstatt.py" })}<section class="lesson-panel learning-coach"><span class="eyebrow">LERNCOACH</span><h3>Fehlermeldung verstehen</h3><p id="coach-lead">Wenn dein Programm mit einer Fehlermeldung endet, erklärt der Lerncoach hier, was sie bedeutet.</p><ul id="coach-hints"></ul></section></section></div>`;
    main.querySelectorAll("[data-template]").forEach(button => button.addEventListener("click", () => {
      const template = practice.templates.find(item => item.id === button.dataset.template);
      const editor = main.querySelector("#practice-code");
      if (editor.value.trim() && editor.value !== template.code && !window.confirm("Deinen Code durch die Vorlage ersetzen?")) return;
      editor.value = template.code; editor.dispatchEvent(new Event("input", { bubbles: true }));
      const inputField = main.querySelector("#practice-input");
      inputField.value = template.input || ""; inputField.dispatchEvent(new Event("input", { bubbles: true }));
      editor.focus();
    }));
    setupPracticeEditor(null);
  }
  function setupPracticeEditor(exercise) {
    const editor = main.querySelector("#practice-code"), output = main.querySelector("#practice-output"), inputField = main.querySelector("#practice-input");
    const buttons = () => main.querySelectorAll("[data-practice-run], [data-practice-check]");
    const stopButton = main.querySelector("[data-practice-stop]");
    const showTab = name => {
      main.querySelectorAll("[data-runner-tab]").forEach(tab => tab.setAttribute("aria-selected", String(tab.dataset.runnerTab === name)));
      main.querySelectorAll("[data-runner-panel]").forEach(panel => { panel.hidden = panel.dataset.runnerPanel !== name; });
    };
    main.querySelectorAll("[data-runner-tab]").forEach(tab => tab.addEventListener("click", () => showTab(tab.dataset.runnerTab)));
    const coach = (lead, hints, tone = "info") => {
      main.querySelector("#coach-lead").textContent = lead;
      main.querySelector("#coach-hints").innerHTML = hints.map(hint => `<li>${esc(hint)}</li>`).join("");
      main.querySelector(".learning-coach").dataset.tone = tone;
    };
    const busy = running => { buttons().forEach(button => { button.disabled = running; }); stopButton.disabled = !running; };
    const runner = () => (pythonRunner ??= window.createAlgoLabPythonRunner({ onStatus: message => { if (output.isConnected && message) output.textContent = message; } }));
    const errorLine = text => String(text).trim().split("\n").filter(Boolean).at(-1) || "";
    async function start() {
      busy(true); showTab("output");
      try {
        const result = await runner().run(editor.value, [], { inputs: inputField.value, echo: true });
        if (!output.isConnected) return;
        output.textContent = (result.output || "") + (result.truncated ? "\n[Ausgabe nach 12000 Zeichen gekürzt]" : "") + (result.error ? `${result.output ? "\n" : ""}${errorLine(result.error)}` : "") || "(Keine Ausgabe – hast du print() verwendet?)";
        output.classList.toggle("has-error", Boolean(result.error));
        if (result.error) coach(practiceCheck.diagnostic(result.error), exercise ? practiceCheck.hints(exercise, editor.value, result.error, practiceAttempts.get(exercise.id) || 1) : [errorLine(result.error)], "warning");
      } catch (error) { if (output.isConnected) { output.textContent = error.message; output.classList.add("has-error"); } }
      finally { if (output.isConnected) busy(false); }
    }
    async function check() {
      const attempt = (practiceAttempts.get(exercise.id) || 0) + 1;
      practiceAttempts.set(exercise.id, attempt);
      busy(true); showTab("output");
      const list = main.querySelector("#practice-cases"), banner = main.querySelector("#practice-result");
      list.innerHTML = ""; banner.hidden = true;
      const verdicts = [];
      try {
        for (const [index, testCase] of exercise.check.cases.entries()) {
          output.textContent = `Prüfe Testfall ${index + 1} von ${exercise.check.cases.length} …`;
          const result = await runner().run(editor.value, [], { inputs: testCase.input, testCode: exercise.check.testCode || "" });
          if (!list.isConnected) return;
          const verdict = practiceCheck.evaluateCase(exercise.check, testCase, result);
          verdicts.push({ ...verdict, result, testCase });
          list.insertAdjacentHTML("beforeend", `<li class="${verdict.passed ? "passed" : "retry"}"><strong>${verdict.passed ? "✓" : "✗"} Testfall ${index + 1}</strong><span>Eingabe: ${esc(testCase.input ? testCase.input.split("\n").join(" · ") : "(keine)")}</span>${verdict.passed ? "" : `<span>${esc(verdict.message)}</span>`}</li>`);
        }
        const failed = verdicts.find(item => !item.passed);
        const shown = failed || verdicts.at(-1);
        output.textContent = shown.result.output ? shown.result.output.trimEnd() : (shown.result.error ? errorLine(shown.result.error) : "(Keine Ausgabe)");
        output.classList.toggle("has-error", Boolean(shown.result.error));
        banner.hidden = false;
        if (!failed) {
          const fresh = engine.completePractice(state, exercise.id, true);
          if (fresh) save();
          banner.className = "result-banner is-success";
          banner.textContent = fresh ? `Geschafft! Alle ${verdicts.length} Testfälle bestanden.` : `Alle ${verdicts.length} Testfälle bestanden – deine Lösung funktioniert weiterhin.`;
          main.querySelector("#practice-solved-chip").hidden = false;
          coach("Prüfung bestanden. Dein Programm erfüllt alle überprüften Anforderungen.", ["Teste es im Reiter „Eingabe“ noch mit eigenen Werten.", "Vergleiche deine Lösung mit dem Struktogramm in der passenden Lektion."], "success");
        } else {
          banner.className = "result-banner is-retry";
          banner.textContent = `${verdicts.filter(item => item.passed).length} von ${verdicts.length} Testfällen bestanden. ${failed.message}`;
          coach("Nächster sinnvoller Schritt", [...new Set([failed.message, ...practiceCheck.hints(exercise, editor.value, failed.result.error || "", attempt)])].slice(0, 3), "warning");
        }
      } catch (error) {
        if (output.isConnected) { output.textContent = error.message; output.classList.add("has-error"); coach("Die Prüfung wurde unterbrochen.", [practiceCheck.diagnostic(error.message)], "warning"); }
      } finally { if (output.isConnected) busy(false); }
    }
    main.querySelector("[data-practice-run]").addEventListener("click", start);
    main.querySelector("[data-practice-check]")?.addEventListener("click", check);
    stopButton.addEventListener("click", () => { pythonRunner?.stop(); pythonRunner = null; });
    main.querySelector("[data-practice-hint]")?.addEventListener("click", () => {
      const attempt = Math.max(1, practiceAttempts.get(exercise.id) || 1);
      coach(`Hinweis ${Math.min(attempt, 3)}: Gehe einen kleinen Schritt weiter und prüfe danach erneut.`, practiceCheck.hints(exercise, editor.value, "", attempt));
      practiceAttempts.set(exercise.id, attempt + 1);
    });
    main.querySelector("[data-practice-reset]").addEventListener("click", () => {
      const starter = exercise ? exercise.starter : practice.templates[0].code;
      if (editor.value !== starter && !window.confirm("Deinen Code durch den Startcode ersetzen? Dein bisheriger Entwurf geht dabei verloren.")) return;
      editor.value = starter; editor.dispatchEvent(new Event("input", { bubbles: true })); editor.focus();
    });
  }
  function renderPractice(id) {
    if (!id) renderPracticeCatalog();
    else if (id === "werkstatt") renderWorkshop();
    else renderPracticeExercise(id);
  }
  function renderPracticeLinks(unit) {
    const items = practice.exercises.filter(exercise => exercise.unit === unit.id);
    if (!items.length) return "";
    return `<aside class="lesson-panel practice-links"><strong>Weiter programmieren</strong><p>Passend zu ${unit.id} gibt es im Bereich Programmieren Aufgaben mit input() wie im Unterrichtsmaterial:</p><div class="can-units">${items.map(exercise => `<a href="#programmieren/${exercise.id}">${practiceSolved(exercise.id) ? "✓ " : ""}${esc(exercise.title)}</a>`).join("")}</div></aside>`;
  }
  function renderProgress() {
    document.querySelector("#page-title").textContent = "Mein Lernstand";
    main.innerHTML = `<section class="lesson-panel"><span class="eyebrow">DEIN FORTSCHRITT</span><h2>${engine.total(state)} Punkte erreicht</h2><p>${state.completed.length} von ${content.units.length} Lerneinheiten abgeschlossen.</p><p>Die nächste Einheit öffnet sich, wenn du alle Pflichtaufgaben der vorherigen Einheit bestanden, ihre Punkte erreicht und sie abgeschlossen hast. Die Freischaltung gilt auch für direkte Links.</p><button class="primary" data-backup>Lernstand sichern oder laden</button></section><div class="progress-list">${content.units.map(unit => `<div><span><strong>${unit.id}</strong> ${unit.title}</span><span>${engine.earned(state, unit.id)} / ${unit.points} · ${status(unit)}</span></div>`).join("")}</div>`;
  }
  function render(focus = false) {
    pythonRunner?.stop(); pythonRunner = null;
    mapListenerController.abort(); mapListenerController = new AbortController();
    const [page, id] = location.hash.slice(1).split("/");
    if (!page || page === "home") renderHome();
    else if (page === "path") renderPath(id);
    else if (page === "unit") renderUnit(id);
    else if (page === "progress") renderProgress();
    else if (page === "selfcheck") renderSelfcheck(id);
    else if (page === "glossar") renderGlossary(id);
    else if (page === "programmieren") renderPractice(id);
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
  main.addEventListener("input", event => {
    const draft = event.target.closest?.("textarea[data-practice-draft]");
    if (draft && engine.savePracticeDraft(state, draft.dataset.practiceDraft, draft.value)) {
      const stored = save();
      const status = main.querySelector(".practice-editor .draft-status");
      if (status) status.textContent = stored && document.querySelector("#storage-warning").hidden ? "Entwurf auf diesem Gerät gespeichert." : "Entwurf im aktuellen Tab verfügbar. Sichere deinen Lernstand als Datei.";
    }
  });
  main.addEventListener("input", event => {
    const field = event.target.closest("textarea[data-work]");
    if (!field) return;
    state.work[field.dataset.workUnit] ??= {};
    state.work[field.dataset.workUnit][field.dataset.work] = field.value;
    save();
    field.closest(".reflection, .code-task").querySelector(".draft-status").textContent = document.querySelector("#storage-warning").hidden ? "Auf diesem Gerät gespeichert." : "Im aktuellen Tab verfügbar. Sichere deinen Lernstand als Datei.";
  });
  async function runCode(pane) {
    const unit = engine.byId(pane.dataset.codeUnit), task = [...unit.tasks, ...(unit.extras || [])].find(item => item.id === pane.dataset.codeTask);
    const status = pane.querySelector(".code-status"), output = pane.querySelector(".code-output"), runButton = pane.querySelector("[data-run-code]"), stopButton = pane.querySelector("[data-stop-code]");
    runButton.disabled = true; stopButton.disabled = false;
    pane.querySelector(".code-checks").replaceChildren(); output.textContent = "";
    pythonRunner ??= window.createAlgoLabPythonRunner({ onStatus: message => { if (pane.isConnected) status.textContent = message; } });
    try {
      const result = await pythonRunner.run(pane.querySelector("textarea").value, task.checks.map(check => check.expression));
      if (!pane.isConnected) return;
      output.textContent = result.output || "Dein Programm hat nichts ausgegeben.";
      if (result.truncated) output.textContent += "\n[Ausgabe nach 12000 Zeichen gekürzt]";
      if (result.error) {
        const detail = result.error.trim().split("\n").filter(Boolean).at(-1);
        const hint = detail.includes("IndexError") ? "Prüfe deinen Index: Die Zählung beginnt bei 0 und endet bei Länge minus 1." : detail.includes("NameError") ? "Prüfe die Schreibweise und ob du die Variable vorher angelegt hast." : detail.includes("SyntaxError") || detail.includes("IndentationError") ? "Prüfe Klammern, Anführungszeichen und Einrückungen." : "Lies die Fehlermeldung und überprüfe die passende Codezeile.";
        status.textContent = `${hint} ${detail}`; return;
      }
      pane.querySelector(".code-checks").innerHTML = task.checks.map((check, index) => `<li class="${result.checks[index] ? "passed" : "retry"}">${result.checks[index] ? "✓ Erfüllt" : "Noch offen"}: ${esc(check.message)}</li>`).join("");
      const passed = result.checks.length === task.checks.length && result.checks.every(Boolean);
      if (task.optional) {
        const fresh = engine.completeExtra(state, unit.id, task.id, passed);
        if (fresh) { save(); pane.querySelector(".code-award").textContent = "✓ Gelöst · freiwillig"; }
        status.textContent = passed ? (fresh || state.extras?.[unit.id]?.[task.id] ? "Stark! Alle Prüfungen der Zusatzaufgabe bestanden." : "Alle Prüfungen bestanden. In der Entwicklervorschau wird nichts gespeichert.") : "Dein Programm läuft. Prüfe die noch offenen Kriterien und versuche es erneut.";
        return;
      }
      const awarded = engine.completeCode(state, unit.id, task.id, passed);
      if (awarded) {
        save(); pane.querySelector(".code-award").textContent = `Bestanden · ${task.points} Punkte`;
        const total = engine.total(state);
        document.querySelector("#total-points").textContent = `${total} Punkte`;
        document.querySelector("#sidebar-points").textContent = `${total} Punkte · ${state.completed.length} abgeschlossen`;
        document.querySelector("#sidebar-progress").value = total;
        main.querySelector("#lesson-score").textContent = `${engine.earned(state, unit.id)} / ${unit.points} Punkte`;
        main.querySelector("#lesson-progress").value = engine.earned(state, unit.id);
        main.querySelector("[data-finish]")?.toggleAttribute("disabled", !engine.passed(state, unit.id));
        syncProfile();
      }
      status.textContent = passed ? (awarded || state.completed.includes(unit.id) ? "Alle Prüfungen bestanden. Bereits erreichte Punkte werden nicht doppelt vergeben." : "Alle Prüfungen bestanden. In der Entwicklervorschau werden noch keine Punkte vergeben.") : "Dein Programm läuft. Prüfe die noch offenen Kriterien und versuche es erneut.";
    } catch (error) { if (pane.isConnected) status.textContent = error.message; }
    finally { if (pane.isConnected) { runButton.disabled = false; stopButton.disabled = true; } }
  }
  // Komfort im Code-Editor: Einrücken wie in einer IDE, ohne die Tastaturbedienung zu blockieren.
  let editorEscaped = false;
  main.addEventListener("keydown", event => {
    const editor = event.target.closest?.("textarea.code-editor");
    if (!editor) return;
    if (event.key === "Escape") { editorEscaped = true; return; }
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") { event.preventDefault(); editor.closest(".code-task, .practice-editor")?.querySelector("[data-run-code]:not(:disabled), [data-practice-run]:not(:disabled)")?.click(); return; }
    const { selectionStart: start, selectionEnd: end, value } = editor;
    const lineStart = value.lastIndexOf("\n", start - 1) + 1;
    const replace = (from, to, text, caretStart, caretEnd = caretStart) => {
      editor.setRangeText(text, from, to);
      editor.setSelectionRange(caretStart, caretEnd);
      editor.dispatchEvent(new Event("input", { bubbles: true }));
    };
    if (event.key === "Tab" && !editorEscaped && !event.altKey && !event.ctrlKey) {
      event.preventDefault();
      const blockEnd = value.indexOf("\n", end - (end > start && value[end - 1] === "\n" ? 1 : 0));
      const to = blockEnd === -1 ? value.length : blockEnd;
      const lines = value.slice(lineStart, to).split("\n");
      if (event.shiftKey) {
        const removed = lines.map(line => line.match(/^ {1,4}/)?.[0].length || 0);
        replace(lineStart, to, lines.map((line, index) => line.slice(removed[index])).join("\n"), Math.max(lineStart, start - removed[0]), Math.max(lineStart, end - removed.reduce((sum, n) => sum + n, 0)));
      } else if (start === end) {
        replace(start, end, "    ", start + 4);
      } else {
        replace(lineStart, to, lines.map(line => `    ${line}`).join("\n"), start + 4, end + 4 * lines.length);
      }
      return;
    }
    if (event.key === "Enter" && !event.shiftKey && start === end) {
      const line = value.slice(lineStart, start);
      const indent = line.match(/^ */)[0] + (/:\s*$/.test(line) ? "    " : "");
      if (!indent) return;
      event.preventDefault();
      replace(start, end, `\n${indent}`, start + 1 + indent.length);
    }
  });
  main.addEventListener("focusin", event => { if (event.target.closest?.("textarea.code-editor")) editorEscaped = false; });
  main.addEventListener("click", event => {
    const reset = event.target.closest("[data-reset-code]");
    if (!reset) return;
    const pane = reset.closest(".code-task"), editor = pane.querySelector("textarea");
    const unit = engine.byId(pane.dataset.codeUnit), task = [...unit.tasks, ...(unit.extras || [])].find(item => item.id === pane.dataset.codeTask);
    if (editor.value !== task.starter && !window.confirm("Deinen Code durch den Startcode ersetzen? Dein bisheriger Entwurf geht dabei verloren.")) return;
    editor.value = task.starter;
    editor.dispatchEvent(new Event("input", { bubbles: true }));
    editor.focus();
  });
  main.addEventListener("submit", event => {
    const form = event.target.closest("form[data-task]");
    if (!form) return;
    event.preventDefault();
    const selected = new FormData(form).get("choice");
    if (selected === null) return;
    if (developerMode && !engine.unlocked(state, form.dataset.unit)) {
      const task = engine.byId(form.dataset.unit).tasks.find(item => item.id === form.dataset.task);
      form.querySelector(".task-feedback").textContent = Number(selected) === task.correct
        ? "✓ Richtig. In der Entwicklervorschau werden keine Punkte vergeben."
        : task.hint;
      return;
    }
    const passed = engine.answer(state, form.dataset.unit, form.dataset.task, Number(selected));
    save();
    if (!passed) { form.querySelector(".task-feedback").textContent = engine.byId(form.dataset.unit).tasks.find(task => task.id === form.dataset.task).hint; return; }
    const taskId = form.dataset.task;
    render();
    const success = main.querySelector(`[data-task="${taskId}"] .task-success`);
    success.setAttribute("tabindex", "-1"); success.focus({ preventScroll: true });
  });
  main.addEventListener("click", event => {
    const rate = event.target.closest("[data-rate]");
    if (!rate) return;
    const itemId = rate.dataset.rate, chosen = Number(rate.dataset.level);
    const level = state.selfcheck?.[itemId] === chosen ? 0 : chosen;
    if (!engine.rateSelfcheck(state, itemId, level)) return;
    save();
    main.querySelectorAll(`[data-rate="${itemId}"]`).forEach(button => button.setAttribute("aria-pressed", String(Number(button.dataset.level) === level)));
    main.querySelectorAll(".can-list:not(.compact)").forEach(list => {
      const summary = list.querySelector(".can-summary");
      const items = [...list.querySelectorAll("[data-can]")].map(row => ({ id: row.dataset.can }));
      if (summary) summary.outerHTML = selfcheckSummary(items);
    });
  });
  main.addEventListener("click", event => {
    const run = event.target.closest("[data-run-code]");
    if (run) runCode(run.closest(".code-task"));
    if (event.target.closest("[data-stop-code]")) { pythonRunner?.stop(); pythonRunner = null; }
    const button = event.target.closest("[data-finish]");
    if (button && engine.finish(state, button.dataset.finish)) { save(); render(); main.querySelector(".completion h3").setAttribute("tabindex", "-1"); main.querySelector(".completion h3").focus({ preventScroll: true }); }
    if (event.target.closest("[data-backup]")) document.querySelector("#backup-dialog").showModal();
  });
  document.querySelector("#theme-toggle").addEventListener("click", () => {
    const theme = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    setTheme(theme); try { localStorage.setItem("algolab-theme-v1", theme); } catch { /* Theme still works for this session. */ }
  });
  document.querySelector("#backup-open").addEventListener("click", () => document.querySelector("#backup-dialog").showModal());
  function exportProfile() {
    const payload = engine.payload(state);
    const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" }));
    const link = document.createElement("a"); link.href = url; link.download = `algolab-lernstand-${new Date().toISOString().slice(0, 10)}.json`; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  document.querySelector("#export-progress").addEventListener("click", exportProfile);
  document.querySelector("[data-export-profile]").addEventListener("click", exportProfile);
  async function importProfile(event) {
    const file = event.target.files[0];
    const message = document.querySelector(event.target.id === "import-profile" ? "#profile-message" : "#backup-message");
    if (!file) return;
    try {
      if (file.size > 2 * 1024 * 1024) throw new Error("Die Datei ist zu groß (maximal 2 MB).");
      const payload = JSON.parse(await file.text());
      const restored = engine.readPayload(payload);
      if (!window.confirm("Den aktuellen Lernstand durch die gewählte Datei ersetzen? Sichere deinen bisherigen Stand, wenn du ihn behalten möchtest.")) return;
      state = restored; const stored = save(); render();
      document.querySelector("#profile-name").value = state.profile.name;
      document.querySelector("#profile-class").value = state.profile.className;
      message.textContent = stored ? "Dein Profil mit NAGOLD und Lernstand wurde geladen." : "Profil geladen. Der Browser kann es nicht dauerhaft speichern; sichere eine JSON-Datei.";
    } catch (error) { message.textContent = `Die Datei wurde nicht geladen. ${error.message}`; }
    finally { event.target.value = ""; }
  }
  document.querySelector("#import-progress").addEventListener("change", importProfile);
  document.querySelector("#import-profile").addEventListener("change", importProfile);
  window.addEventListener("hashchange", () => render(true));
  document.querySelector(".skip-link").addEventListener("click", event => {
    event.preventDefault(); main.focus(); main.scrollIntoView();
  });
  render();
})();
