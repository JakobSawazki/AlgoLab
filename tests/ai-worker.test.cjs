const test = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const load = () => import(pathToFileURL(path.join(__dirname, "..", "services", "ai-coach-worker", "worker.js")).href);
const env = { ALLOWED_ORIGINS: "https://jakobsawazki.github.io,http://localhost:4175", GEMINI_API_KEY: "test-secret", GEMINI_MODEL: "gemini-test" };
const body = (sessionId = "algolab-test-1") => ({ sessionId, attempt: 2, depth: "quick", exercise: { id: "mitglied-pruefen", title: "Einlasskontrolle", description: "Lineare Suche", instructions: ["a"] }, code: "print(1)", localReview: { passed: false, diagnostic: "d", error: "" }, profile: { name: "jak.saw" } });
const post = (data, origin = "https://jakobsawazki.github.io", ip = "1.2.3.4") => new Request("https://algolab-ai-coach.example.workers.dev/feedback", { method: "POST", headers: { Origin: origin, "Content-Type": "application/json", "CF-Connecting-IP": ip }, body: JSON.stringify(data) });
const gemini = text => async (url, options) => ({ ok: true, status: 200, json: async () => ({ candidates: [{ content: { parts: [{ text }] } }] }), url, options });

test("The worker rejects foreign origins and answers preflight requests", async () => {
  const worker = (await load()).default;
  assert.equal((await worker.fetch(post(body(), "https://evil.example"), env)).status, 403);
  const preflight = await worker.fetch(new Request("https://x/feedback", { method: "OPTIONS", headers: { Origin: "http://localhost:4175" } }), env);
  assert.equal(preflight.status, 204);
  assert.equal(preflight.headers.get("Access-Control-Allow-Origin"), "http://localhost:4175");
  assert.equal((await worker.fetch(post(body()), { ...env, GEMINI_API_KEY: "" })).status, 503);
  assert.equal((await worker.fetch(post({ ...body(), code: "" }), env)).status, 400);
});

test("Only whitelisted task fields reach Gemini, the key stays in the header and the answer is cleaned", async () => {
  const worker = (await load()).default;
  let sent;
  const response = await worker.fetch(post(body("algolab-test-2")), env, {}, async (url, options) => {
    sent = { url, options };
    return gemini(JSON.stringify({ summary: "Gute Schleife.", strengths: ["a", "b"], nextSteps: ["1", "2", "3"], hint: "Denke an gefunden.", question: "Was passiert bei 1021?" }))();
  });
  assert.equal(response.status, 200);
  const data = await response.json();
  assert.deepEqual(data.feedback, { summary: "Gute Schleife.", strengths: ["a"], nextSteps: ["1", "2"], hint: "Denke an gefunden.", question: "Was passiert bei 1021?" });
  assert.match(sent.url, /models\/gemini-test:generateContent$/);
  assert.equal(sent.options.headers["x-goog-api-key"], "test-secret");
  const request = JSON.parse(sent.options.body);
  assert.ok(!sent.url.includes("test-secret") && !sent.options.body.includes("test-secret"));
  assert.ok(!sent.options.body.includes("jak.saw"), "Profildaten werden nicht weitergegeben");
  assert.match(request.systemInstruction.parts[0].text, /BPE|Bildungsplaneinheit 7/);
  assert.match(request.systemInstruction.parts[0].text, /niemals eine vollständige Musterlösung/);
});

test("Upstream errors, broken answers and too many requests are reported safely", async () => {
  const worker = (await load()).default;
  const failed = await worker.fetch(post(body("algolab-test-3")), env, {}, async () => ({ ok: false, status: 400, json: async () => ({ error: { status: "INVALID_ARGUMENT", message: "API key not valid" } }) }));
  assert.equal(failed.status, 502);
  assert.equal((await failed.json()).upstreamStatus, 400);
  const broken = await worker.fetch(post(body("algolab-test-4")), env, {}, gemini("keine JSON-Antwort"));
  assert.equal(broken.status, 502);
  let last;
  for (let i = 0; i < 11; i++) last = await worker.fetch(post(body("algolab-test-limit"), "https://jakobsawazki.github.io", "9.9.9.9"), env, {}, gemini("{\"summary\":\"ok\",\"strengths\":[],\"nextSteps\":[],\"hint\":\"h\",\"question\":\"q\"}"));
  assert.equal(last.status, 429);
});
