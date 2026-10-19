(function (root) {
  "use strict";
  function createEngine(content) {
    const units = content.units;
    const nagold = typeof module !== "undefined" && module.exports ? require("./nagold.js")(content) : root.ALGOLAB_NAGOLD;
    const byId = id => units.find(unit => unit.id === id);
    const empty = () => ({ answers: {}, completed: [], work: {}, profile: { name: "", className: "" }, nagoldEntries: [] });
    const earned = (state, id) => {
      const unit = byId(id);
      if (!unit?.ready) return 0;
      return unit.tasks.reduce((sum, task) => sum + (state.answers[id]?.[task.id] === task.correct ? task.points : 0), 0);
    };
    const passed = (state, id) => {
      const unit = byId(id);
      return Boolean(unit?.ready && unit.tasks.length && unit.tasks.every(task => state.answers[id]?.[task.id] === task.correct) && earned(state, id) >= unit.points);
    };
    const unlocked = (state, id) => {
      const index = units.findIndex(unit => unit.id === id);
      return index >= 0 && units.slice(0, index).every(unit => state.completed.includes(unit.id) && passed(state, unit.id));
    };
    // Developer access is separate from earned points and the completion chain.
    const accessible = (state, id, developerMode = false) => Boolean(byId(id)) && (developerMode || unlocked(state, id));
    function normalize(raw) {
      const state = empty();
      state.profile = {
        name: typeof raw?.profile?.name === "string" ? raw.profile.name.trim().toLocaleLowerCase("de").slice(0, 40) : "",
        className: typeof raw?.profile?.className === "string" ? raw.profile.className.trim().toLocaleUpperCase("de").slice(0, 32) : ""
      };
      for (const unit of units.filter(unit => unit.ready)) {
        const fields = [...unit.tasks.filter(task => task.type === "code"), ...(unit.reflections || [])];
        for (const field of fields) {
          const value = raw?.work?.[unit.id]?.[field.id];
          if (typeof value === "string" && value.length <= 20000) {
            state.work[unit.id] ??= {};
            state.work[unit.id][field.id] = value;
          }
        }
      }
      // Derive points and validate a contiguous chain; never trust imported totals.
      for (const unit of units) {
        if (!unit.ready || !unlocked(state, unit.id)) break;
        const answers = raw?.answers?.[unit.id];
        if (answers && typeof answers === "object") state.answers[unit.id] = {};
        for (const task of unit.tasks) {
          const answer = answers?.[task.id];
          if (task.type === "code") { if (answer === true) { state.answers[unit.id] ??= {}; state.answers[unit.id][task.id] = true; } }
          else if (Number.isInteger(answer) && answer >= 0 && answer < task.options.length) { state.answers[unit.id] ??= {}; state.answers[unit.id][task.id] = answer; }
        }
        if (Array.isArray(raw?.completed) && raw.completed.includes(unit.id) && passed(state, unit.id)) state.completed.push(unit.id);
      }
      state.nagoldEntries = nagold.entriesFor(Object.hasOwn(raw || {}, "nagoldEntries") ? { nagoldEntries: raw.nagoldEntries } : { completed: state.completed });
      return state;
    }
    function answer(state, id, taskId, choice) {
      const unit = byId(id);
      const task = unit?.tasks.find(item => item.id === taskId);
      if (!unlocked(state, id) || !unit?.ready || !task || task.type === "code" || !Number.isInteger(choice) || choice < 0 || choice >= task.options.length || state.completed.includes(id)) return false;
      state.answers[id] ??= {};
      // A passed task keeps its points; retries cannot award duplicates.
      if (state.answers[id][taskId] !== task.correct) state.answers[id][taskId] = choice;
      return choice === task.correct;
    }
    function completeCode(state, id, taskId, passedCheck) {
      const task = byId(id)?.tasks.find(item => item.id === taskId);
      if (!unlocked(state, id) || !byId(id)?.ready || task?.type !== "code" || passedCheck !== true || state.completed.includes(id)) return false;
      state.answers[id] ??= {};
      state.answers[id][taskId] = true;
      return true;
    }
    function finish(state, id) {
      if (!unlocked(state, id) || !passed(state, id) || state.completed.includes(id)) return false;
      state.completed.push(id);
      const now = new Date();
      nagold.addLessonEntry(state, byId(id), nagold.today(now), nagold.clock(now));
      return true;
    }
    function payload(state) {
      return { app: "AlgoLab", formatVersion: 1, version: content.version, exportedAt: new Date().toISOString(), state: normalize(state) };
    }
    function readPayload(data) {
      const object = value => value !== null && typeof value === "object" && !Array.isArray(value);
      const raw = data?.state;
      if (data?.app !== "AlgoLab" || data.formatVersion !== 1 || !object(raw) || !object(raw.answers) || !Array.isArray(raw.completed)) throw new Error("Bitte wähle eine gültige AlgoLab-Datei.");
      if (Object.hasOwn(raw, "profile") && (!object(raw.profile) || typeof raw.profile.name !== "string" || typeof raw.profile.className !== "string" || raw.profile.name.length > 40 || raw.profile.className.length > 32)) throw new Error("Das Profil ist nicht lesbar. Der bisherige Stand bleibt erhalten.");
      if (Object.hasOwn(raw, "nagoldEntries")) {
        if (!Array.isArray(raw.nagoldEntries) || raw.nagoldEntries.length > nagold.maxEntries || nagold.normalizeEntries(raw.nagoldEntries).length !== raw.nagoldEntries.length || raw.nagoldEntries.some(row => row.purpose.length > 160)) throw new Error("Die NAGOLD-Tabelle enthält ungültige Einträge. Keine Daten übernommen.");
        const entries = nagold.normalizeEntries(raw.nagoldEntries);
        if (entries.some((row, index) => nagold.isStartCapital(row.purpose) && nagold.startCapitalTaken(entries.slice(0, index), row.date))) throw new Error("Die Datei enthält mehrfaches Startkapital im selben Schuljahr.");
        const lessonIds = entries.filter(row => row.lessonId).map(row => row.lessonId);
        if (new Set(lessonIds).size !== lessonIds.length) throw new Error("Die Datei enthält doppelte NAGOLD-Buchungen für eine Lerneinheit.");
      }
      return normalize(raw);
    }
    return { empty, byId, earned, passed, unlocked, accessible, normalize, payload, readPayload, answer, completeCode, finish, total: state => units.reduce((sum, unit) => sum + earned(state, unit.id), 0), prerequisite: id => units[units.findIndex(unit => unit.id === id) - 1] };
  }
  if (typeof module !== "undefined" && module.exports) module.exports = createEngine;
  else root.createAlgoLabProgress = createEngine;
})(typeof window !== "undefined" ? window : globalThis);
