(function (root) {
  "use strict";
  // KI-Lerncoach (optional): fragt nach ausdrücklicher Zustimmung einen Proxy-Worker, der Google Gemini
  // anspricht. Übertragen werden nur Aufgabe, Code, lokales Prüfergebnis und Versuchszähler – nie Name,
  // Klasse, Punkte oder Lernstand. Die KI vergibt keine Punkte; maßgeblich bleibt die lokale Prüfung.
  const CONSENT_KEY = "algolab-ai-consent-v1";
  const MODE_KEY = "algolab-ai-mode-v1";
  const SESSION_KEY = "algolab-ai-session-v1";
  const clip = (value, max) => typeof value === "string" ? value.slice(0, max) : "";

  function createCoach({ endpoint = "", fetchImpl = (...args) => root.fetch(...args), storage = null, timeoutMs = 30000 } = {}) {
    const cache = new Map();
    const session = storage || (() => { try { return root.sessionStorage; } catch { return null; } })();
    const read = key => { try { return session?.getItem(key) || ""; } catch { return ""; } };
    const write = (key, value) => { try { value ? session?.setItem(key, value) : session?.removeItem(key); } catch { /* Gilt dann nur bis zum Neuladen. */ } };
    let memory = {};
    const get = key => read(key) || memory[key] || "";
    const set = (key, value) => { write(key, value); memory[key] = value; };

    const available = () => /^https:\/\//.test(endpoint) || /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?\//.test(endpoint);
    const consented = () => get(CONSENT_KEY) === "1";
    const modeActive = () => consented() && get(MODE_KEY) === "1";
    function sessionId() {
      let id = get(SESSION_KEY);
      if (!/^[a-zA-Z0-9-]{8,80}$/.test(id)) {
        id = `algolab-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
        set(SESSION_KEY, id);
      }
      return id;
    }

    // Nur die minimal nötigen Felder; alles andere (Profil, Lernstand) wird bewusst nicht übernommen.
    function buildPayload({ exercise, code, attempt = 1, review = {}, depth = "quick" }) {
      return {
        sessionId: sessionId(),
        attempt: Math.min(20, Math.max(1, Number(attempt) || 1)),
        depth: depth === "deep" ? "deep" : "quick",
        context: "AlgoLab · BPE 7 Algorithmen und Datenstrukturen · Python im Browser",
        exercise: {
          id: clip(String(exercise?.id || ""), 80),
          title: clip(exercise?.title || "", 180),
          description: clip(exercise?.description || "", 500),
          instructions: (exercise?.instructions || []).map(item => clip(String(item), 350)).filter(Boolean).slice(0, 8)
        },
        code: clip(String(code || ""), 12000),
        localReview: {
          passed: review.passed === true ? true : review.passed === false ? false : null,
          diagnostic: clip(review.diagnostic || "", 600),
          error: clip(review.error || "", 3000)
        }
      };
    }
    const cacheKey = payload => JSON.stringify([payload.exercise.id, payload.code, payload.depth, payload.localReview]);

    function cleanFeedback(raw) {
      const text = (value, max) => typeof value === "string" ? value.trim().slice(0, max) : "";
      const list = (value, items) => Array.isArray(value) ? value.map(item => text(item, 350)).filter(Boolean).slice(0, items) : [];
      const feedback = { summary: text(raw?.summary, 900), strengths: list(raw?.strengths, 1), nextSteps: list(raw?.nextSteps, 3), hint: text(raw?.hint, 800), question: text(raw?.question, 500) };
      if (!feedback.summary && !feedback.hint && !feedback.nextSteps.length) throw new Error("Die KI-Rückmeldung war leer. Versuche es später erneut.");
      return feedback;
    }

    async function request(input) {
      if (!available()) throw new Error("Die KI-Hilfe ist für AlgoLab nicht eingerichtet. Der lokale Lerncoach hilft dir weiter.");
      if (!consented()) throw new Error("Bitte stimme zuerst der Übertragung an den KI-Dienst zu.");
      const payload = buildPayload(input);
      if (!payload.exercise.id || !payload.code.trim()) throw new Error("Schreibe zuerst etwas Code, zu dem die KI dir Hinweise geben kann.");
      const key = cacheKey(payload);
      if (cache.has(key)) return { ...cache.get(key), cached: true };
      let response;
      const controller = typeof AbortController === "function" ? new AbortController() : null;
      const timer = controller ? setTimeout(() => controller.abort(), timeoutMs) : null;
      try {
        response = await fetchImpl(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), signal: controller?.signal });
      } catch {
        throw new Error("Der KI-Dienst ist gerade nicht erreichbar. Prüfe deine Internetverbindung oder nutze die lokalen Hinweise.");
      } finally { if (timer) clearTimeout(timer); }
      let data = {};
      try { data = await response.json(); } catch { /* Fehlermeldung unten */ }
      if (!response.ok) {
        const messages = { 403: "Diese Seite ist beim KI-Dienst nicht freigeschaltet.", 413: "Dein Code ist für die KI-Hilfe zu lang.", 429: "Zu viele KI-Anfragen in kurzer Zeit. Arbeite ein paar Minuten mit den lokalen Hinweisen weiter.", 503: "Der KI-Dienst ist noch nicht vollständig eingerichtet." };
        throw new Error(messages[response.status] || (typeof data.error === "string" && data.error) || "Der KI-Dienst konnte gerade keine Rückmeldung erzeugen. Die lokalen Hinweise funktionieren weiter.");
      }
      const result = { feedback: cleanFeedback(data.feedback), model: typeof data.model === "string" ? data.model.slice(0, 60) : "" };
      cache.set(key, result);
      return result;
    }

    return {
      available, consented, modeActive, sessionId, buildPayload, request,
      grantConsent() { set(CONSENT_KEY, "1"); },
      setMode(active) { if (active && !consented()) return false; set(MODE_KEY, active ? "1" : ""); return true; },
      revoke() { set(CONSENT_KEY, ""); set(MODE_KEY, ""); cache.clear(); }
    };
  }

  if (typeof module !== "undefined" && module.exports) module.exports = createCoach;
  else root.createAlgoLabAiCoach = createCoach;
})(typeof window !== "undefined" ? window : globalThis);
