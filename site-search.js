(function (root) {
  "use strict";

  const groups = {
    unit: "Einheiten", glossary: "Begriffe", python: "Python",
    structogram: "Struktogramme", exam: "Übungsklausuren"
  };
  const fold = value => value.toLocaleLowerCase("de").replace(/ß/g, "ss").normalize("NFD")
    .replace(/\p{M}/gu, "").replace(/[^\p{L}\p{N}]+/gu, " ").trim();
  function forms(value) {
    const german = value.toLocaleLowerCase("de").replace(/[äöü]/g, letter => ({ ä: "ae", ö: "oe", ü: "ue" })[letter]);
    return [...new Set([fold(value), fold(german)])];
  }

  function buildIndex(content) {
    const practiceEntry = (exercise, group, route) => ({
      group, title: exercise.title, description: exercise.description || "", unit: exercise.unit,
      href: `#${route}/${exercise.id}`, keywords: [exercise.topic, exercise.level, exercise.kind === "debug" ? "Fehlersuche" : ""]
    });
    const entries = [
      ...content.units.map(unit => ({
        group: "unit", title: unit.title, description: unit.description, unit: unit.id, href: `#unit/${unit.id}`,
        keywords: [...unit.goals, unit.situation?.title, ...(unit.examples || []).map(example => example.title)]
      })),
      ...content.glossary.map(term => ({
        group: "glossary", title: term.name, description: term.text, href: `#glossar/${encodeURIComponent(term.name)}`,
        aliases: term.aliases, keywords: [term.category, ...term.units]
      })),
      ...content.practice.exercises.map(exercise => practiceEntry(exercise, "python", "programmieren")),
      ...content.practice.structograms.map(exercise => practiceEntry(exercise, "structogram", "struktogramme")),
      ...content.exam.exams.map(exam => ({
        group: "exam", title: exam.title, description: exam.subtitle, href: `#klausur/${exam.id}`,
        keywords: [...exam.units, ...exam.tasks.map(task => task.title)]
      }))
    ];
    return entries.map(({ aliases = [], keywords, ...entry }) => ({
      ...entry,
      names: [entry.title, ...aliases].flatMap(forms),
      text: forms([entry.title, ...aliases, entry.description, entry.unit, groups[entry.group], ...keywords].filter(Boolean).join(" "))
    }));
  }

  function search(index, query, group = "") {
    const phrase = fold(query);
    if (!phrase) return [];
    const words = [...new Set(phrase.split(" "))];
    const includesWord = (text, word) => word.length === 1 ? text.split(" ").includes(word) : text.includes(word);
    return index.flatMap(entry => {
      if (group && entry.group !== group) return [];
      if (!words.every(word => entry.text.some(form => includesWord(form, word)))) return [];
      const score = entry.group === "unit" && fold(entry.unit) === phrase ? 5
        : entry.names.includes(phrase) ? 4
          : entry.names.some(name => name.includes(phrase)) ? 3
            : words.every(word => entry.names.some(name => includesWord(name, word))) ? 2
              : entry.text.some(form => form.includes(phrase)) ? 1 : 0;
      return [{ entry, score }];
    }).sort((a, b) => b.score - a.score).map(result => result.entry);
  }

  const api = { buildIndex, groups, search };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.AlgoLabSearch = api;
})(typeof window !== "undefined" ? window : globalThis);
