(function (root) {
  "use strict";
  // Klassenübersicht für Lehrkräfte: wertet JSON-Sicherungen der Schülerinnen und Schüler ausschließlich
  // im Browser aus. Jede Datei durchläuft dieselbe Prüfung wie beim Laden eines Profils (readPayload),
  // Punkte und Abschlüsse werden also neu berechnet und nicht aus der Datei übernommen.
  function createClassOverview(content, engine, nagold) {
    const units = content.units;
    const practice = content.practice || { exercises: [], structograms: [] };
    const selfcheckItems = (content.selfcheck || []).flatMap(group => group.items.map(item => ({ ...item, module: group.module })));

    function readFile(text, fileName = "") {
      let data;
      try { data = JSON.parse(text); } catch { return { ok: false, fileName, error: "Keine gültige JSON-Datei." }; }
      let state;
      try { state = engine.readPayload(data); } catch (error) { return { ok: false, fileName, error: error.message }; }
      const solved = state.practice?.solved || {};
      const current = units.find(unit => !state.completed.includes(unit.id));
      const ratings = Object.values(state.selfcheck || {});
      return {
        ok: true,
        fileName,
        row: {
          name: state.profile.name || "(ohne Kürzel)",
          className: state.profile.className || "(ohne Klasse)",
          completed: state.completed.length,
          completedIds: [...state.completed],
          current: current ? current.id : "fertig",
          points: engine.total(state),
          nagold: nagold.total(state),
          programs: practice.exercises.filter(item => solved[item.id]).length,
          structograms: practice.structograms.filter(item => solved[item.id]).length,
          extras: Object.values(state.extras || {}).reduce((sum, unit) => sum + Object.keys(unit).length, 0),
          selfcheck: { sure: ratings.filter(level => level === 3).length, ok: ratings.filter(level => level === 2).length, notYet: ratings.filter(level => level === 1).length },
          selfcheckRatings: { ...(state.selfcheck || {}) },
          exportedAt: typeof data.exportedAt === "string" ? data.exportedAt : "",
          version: typeof data.version === "string" ? data.version : ""
        }
      };
    }

    // Gleiche Person (Kürzel + Klasse) mehrfach: die jüngste Sicherung zählt.
    function merge(rows) {
      const latest = new Map();
      for (const row of rows) {
        const key = `${row.name}|${row.className}`;
        const known = latest.get(key);
        if (!known || String(row.exportedAt) > String(known.exportedAt)) latest.set(key, row);
      }
      return [...latest.values()].sort((a, b) => a.className.localeCompare(b.className, "de") || a.name.localeCompare(b.name, "de"));
    }

    function aggregate(rows) {
      const unitProgress = units.map(unit => ({ id: unit.id, title: unit.title, done: rows.filter(row => row.completedIds.includes(unit.id)).length }));
      const uncertain = selfcheckItems.map(item => ({ id: item.id, module: item.module, number: item.number, text: item.text, notYet: rows.filter(row => row.selfcheckRatings[item.id] === 1).length, rated: rows.filter(row => row.selfcheckRatings[item.id]).length }))
        .filter(item => item.notYet > 0).sort((a, b) => b.notYet - a.notYet || a.id.localeCompare(b.id)).slice(0, 6);
      const average = key => rows.length ? Math.round(rows.reduce((sum, row) => sum + row[key], 0) / rows.length * 10) / 10 : 0;
      return { count: rows.length, unitProgress, uncertain, averagePoints: average("points"), averageCompleted: average("completed"), averageNagold: average("nagold"), classes: [...new Set(rows.map(row => row.className))] };
    }

    function toCsv(rows) {
      const header = ["Kürzel", "Klasse", "Abgeschlossene Einheiten", "Aktuelle Einheit", "Lernpunkte", "NAGOLD", "Programmieraufgaben", "Struktogramm-Training", "Zusatzaufgaben", "Ich kann sicher", "Ich kann", "Noch nicht", "Sicherung vom"];
      const cell = value => { const text = String(value ?? ""); return /[;"\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text; };
      const lines = rows.map(row => [row.name, row.className, `${row.completed}/${units.length}`, row.current, row.points, row.nagold, `${row.programs}/${practice.exercises.length}`, `${row.structograms}/${practice.structograms.length}`, row.extras, row.selfcheck.sure, row.selfcheck.ok, row.selfcheck.notYet, row.exportedAt.slice(0, 10)].map(cell).join(";"));
      return `﻿${[header.join(";"), ...lines].join("\r\n")}\r\n`;
    }

    return { readFile, merge, aggregate, toCsv };
  }
  if (typeof module !== "undefined" && module.exports) module.exports = createClassOverview;
  else root.createAlgoLabClassOverview = createClassOverview;
})(typeof window !== "undefined" ? window : globalThis);
