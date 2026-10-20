const test = require("node:test");
const assert = require("node:assert/strict");
const createCoach = require("../ai-coach.js");

function memoryStorage() {
  const data = new Map();
  return { getItem: key => data.get(key) ?? null, setItem: (key, value) => data.set(key, String(value)), removeItem: key => data.delete(key) };
}
const exercise = { id: "mitglied-pruefen", title: "Einlasskontrolle", description: "Lineare Suche", instructions: ["a", "b", "c"] };
const ok = feedback => async () => ({ ok: true, status: 200, json: async () => ({ feedback, model: "gemini-test" }) });

test("Without consent nothing is sent; consent and mode are session-only and revocable", async () => {
  let calls = 0;
  const coach = createCoach({ endpoint: "https://example.workers.dev/feedback", storage: memoryStorage(), fetchImpl: async () => { calls++; return ok({ summary: "x" })(); } });
  assert.equal(coach.available(), true);
  assert.equal(coach.setMode(true), false, "Modus nur nach Zustimmung");
  await assert.rejects(coach.request({ exercise, code: "print(1)" }), /zustimme|Zustimmung|stimme/);
  assert.equal(calls, 0);
  coach.grantConsent();
  assert.equal(coach.setMode(true), true);
  assert.equal(coach.modeActive(), true);
  coach.revoke();
  assert.equal(coach.consented(), false);
  assert.equal(coach.modeActive(), false);
});

test("The payload contains only task, code, review and attempt – no profile data", () => {
  const coach = createCoach({ endpoint: "https://example.workers.dev/feedback", storage: memoryStorage() });
  const payload = coach.buildPayload({ exercise: { ...exercise, profile: { name: "jak.saw" }, className: "J2 INF1" }, code: "x".repeat(20000), attempt: 99, review: { passed: false, diagnostic: "d", error: "e", points: 40 }, depth: "deep", profile: { name: "jak.saw" } });
  assert.deepEqual(Object.keys(payload).sort(), ["attempt", "code", "context", "depth", "exercise", "localReview", "sessionId"]);
  assert.deepEqual(Object.keys(payload.exercise).sort(), ["description", "id", "instructions", "title"]);
  assert.deepEqual(Object.keys(payload.localReview).sort(), ["diagnostic", "error", "passed", "trace"]);
  assert.equal(payload.code.length, 12000);
  assert.equal(payload.attempt, 20);
  assert.equal(payload.depth, "deep");
  assert.match(payload.sessionId, /^algolab-[a-z0-9-]+$/);
  assert.ok(!JSON.stringify(payload).includes("jak.saw") && !JSON.stringify(payload).includes("J2 INF1"));
});

test("Answers are cleaned, cached per code and reported with friendly errors", async () => {
  let calls = 0;
  const coach = createCoach({ endpoint: "https://example.workers.dev/feedback", storage: memoryStorage(), fetchImpl: async (url, options) => {
    calls++;
    const body = JSON.parse(options.body);
    assert.equal(options.method, "POST");
    assert.equal(body.exercise.id, "mitglied-pruefen");
    return ok({ summary: " Gute Idee ", strengths: ["a", "b"], nextSteps: ["1", "2", "3", "4"], hint: "h", question: "q?", extra: "<script>" })();
  } });
  coach.grantConsent();
  const first = await coach.request({ exercise, code: "print(1)", review: { passed: false } });
  assert.deepEqual(first.feedback, { summary: "Gute Idee", strengths: ["a"], nextSteps: ["1", "2", "3"], hint: "h", question: "q?" });
  const second = await coach.request({ exercise, code: "print(1)", review: { passed: false } });
  assert.equal(second.cached, true);
  assert.equal(calls, 1);
  await coach.request({ exercise, code: "print(2)", review: { passed: false } });
  assert.equal(calls, 2);

  const failing = status => createCoach({ endpoint: "https://example.workers.dev/feedback", storage: memoryStorage(), fetchImpl: async () => ({ ok: false, status, json: async () => ({ error: "Der KI-Dienst konnte gerade keine Rückmeldung erzeugen." }) }) });
  for (const [status, pattern] of [[429, /Zu viele/], [403, /nicht freigeschaltet/], [502, /keine Rückmeldung/]]) {
    const coachWithError = failing(status); coachWithError.grantConsent();
    await assert.rejects(coachWithError.request({ exercise, code: "print(1)" }), pattern);
  }
  const offline = createCoach({ endpoint: "https://example.workers.dev/feedback", storage: memoryStorage(), fetchImpl: async () => { throw new TypeError("Failed to fetch"); } });
  offline.grantConsent();
  await assert.rejects(offline.request({ exercise, code: "print(1)" }), /nicht erreichbar/);
  const empty = createCoach({ endpoint: "https://example.workers.dev/feedback", storage: memoryStorage(), fetchImpl: ok({}) });
  empty.grantConsent();
  await assert.rejects(empty.request({ exercise, code: "print(1)" }), /leer/);
});

test("An empty or insecure endpoint disables the AI help", async () => {
  for (const endpoint of ["", "http://example.org/feedback", "javascript:alert(1)"]) {
    const coach = createCoach({ endpoint, storage: memoryStorage() });
    assert.equal(coach.available(), false, endpoint);
    coach.grantConsent();
    await assert.rejects(coach.request({ exercise, code: "print(1)" }), /nicht eingerichtet/);
  }
  assert.equal(createCoach({ endpoint: "http://localhost:8787/feedback", storage: memoryStorage() }).available(), true);
});

test("The trace keeps changed values per line, merges loop counters and shortens long runs", () => {
  const events = [[1, "mnr = [1001, 1019]"], [3, "nummer = 1018"], [6, "gefunden = False"], ...[0, 1, 2].map(i => [7, `i = ${i}`]), [9, "gefunden = True"], [7, "i = 3"], [11, "gefunden = False"], ...Array.from({ length: 12 }, (_, k) => [7, `i = ${k + 4}`])];
  const text = createCoach.formatTrace(events);
  assert.equal(text.split("\n").length, 8);
  assert.match(text, /^Z\.7: i = 0, 1, 2$/m);
  assert.match(text, /^Z\.9: gefunden = True\nZ\.7: i = 3\nZ\.11: gefunden = False$/m);
  assert.match(text, /^Z\.7: i = 4, 5, 6, …, 14, 15$/m);
  // Lists are never merged, so every swap stays visible.
  assert.equal(createCoach.formatTrace([[11, "zahlen = [5, 1, 1]"], [11, "zahlen = [5, 1, 6]"]]).split("\n").length, 2);
  const long = createCoach.formatTrace(Array.from({ length: 100 }, (_, k) => [k % 5 + 1, `x = ${k}; y = ${k}`]));
  assert.equal(long.split("\n").length, 38);
  assert.match(long, /weitere Schritte/);
  assert.equal(createCoach.formatTrace([[null, "NameError: name 'x' is not defined"]]), "Z.?: NameError: name 'x' is not defined");
  assert.equal(createCoach.formatTrace(undefined), "");
});
