(function (root) {
  "use strict";
  function createEngine(content) {
    const units = content.units;
    const byId = id => units.find(unit => unit.id === id);
    const empty = () => ({ answers: {}, completed: [] });
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
    function normalize(raw) {
      const state = empty();
      // Derive points and validate a contiguous chain; never trust imported totals.
      for (const unit of units) {
        if (!unit.ready || !unlocked(state, unit.id)) break;
        const answers = raw?.answers?.[unit.id];
        state.answers[unit.id] = {};
        for (const task of unit.tasks) {
          const answer = answers?.[task.id];
          if (Number.isInteger(answer) && answer >= 0 && answer < task.options.length) state.answers[unit.id][task.id] = answer;
        }
        if (Array.isArray(raw?.completed) && raw.completed.includes(unit.id) && passed(state, unit.id)) state.completed.push(unit.id);
      }
      return state;
    }
    function answer(state, id, taskId, choice) {
      const unit = byId(id);
      const task = unit?.tasks.find(item => item.id === taskId);
      if (!unlocked(state, id) || !unit?.ready || !task || !Number.isInteger(choice) || choice < 0 || choice >= task.options.length || state.completed.includes(id)) return false;
      state.answers[id] ??= {};
      // A passed task keeps its points; retries cannot award duplicates.
      if (state.answers[id][taskId] !== task.correct) state.answers[id][taskId] = choice;
      return choice === task.correct;
    }
    function finish(state, id) {
      if (!unlocked(state, id) || !passed(state, id) || state.completed.includes(id)) return false;
      state.completed.push(id);
      return true;
    }
    return { empty, byId, earned, passed, unlocked, normalize, answer, finish, total: state => units.reduce((sum, unit) => sum + earned(state, unit.id), 0), prerequisite: id => units[units.findIndex(unit => unit.id === id) - 1] };
  }
  if (typeof module !== "undefined" && module.exports) module.exports = createEngine;
  else root.createAlgoLabProgress = createEngine;
})(typeof window !== "undefined" ? window : globalThis);
