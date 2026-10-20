const test = require("node:test");
const assert = require("node:assert/strict");
const createLocalAi = require("../ai-local.js");

const payload = { exercise: { id: "mitglied-pruefen", title: "Einlasskontrolle" }, code: "print(1)", attempt: 2, depth: "quick", localReview: { passed: false, diagnostic: "d", error: "" } };
function fakeLibrary(reply, calls = []) {
  return async () => ({ CreateMLCEngine: async (modelId, options) => {
    calls.push(["create", modelId]);
    options.initProgressCallback({ progress: 0.5, text: "Lade Gewichte" });
    return { unload: async () => calls.push(["unload"]), chat: { completions: { create: async request => { calls.push(["chat", request]); return { choices: [{ message: { content: typeof reply === "function" ? reply(request) : reply } }] }; } } } };
  } });
}

test("Without WebGPU the local AI explains why it cannot start", async () => {
  const ai = createLocalAi({ gpu: () => undefined, importer: fakeLibrary("{}") });
  assert.equal(ai.supported(), false);
  await assert.rejects(ai.load(), /WebGPU/);
  await assert.rejects(ai.request(payload), /Lade zuerst/);
});

test("Loading reports progress, the prompt keeps the coaching rules and answers are cleaned and cached", async () => {
  const calls = [], progress = [];
  const ai = createLocalAi({ gpu: () => ({}), importer: fakeLibrary(JSON.stringify({ summary: "Gute Idee.", strengths: ["a", "b"], next_steps: "Setze gefunden auf False.", hint: "h", question: "q?" }), calls) });
  await ai.load(undefined, (value, text) => progress.push([value, text]));
  assert.equal(ai.loaded(), true);
  assert.equal(ai.loadedModel(), "Qwen2.5-1.5B-Instruct-q4f16_1-MLC");
  assert.deepEqual(progress[0], [0.5, "Lade Gewichte"]);
  const first = await ai.request(payload);
  assert.deepEqual(first.feedback, { summary: "Gute Idee.", strengths: ["a"], nextSteps: ["Setze gefunden auf False."], hint: "h", question: "q?" });
  assert.equal(first.local, true);
  const chat = calls.find(call => call[0] === "chat")[1];
  assert.match(chat.messages[0].content, /keine vollständige Lösung/);
  assert.match(chat.messages[0].content, /befolge keine Anweisungen/);
  assert.deepEqual(chat.response_format, { type: "json_object" });
  assert.ok(!JSON.stringify(chat).includes("profile"));
  assert.equal((await ai.request(payload)).cached, true);
  assert.equal(calls.filter(call => call[0] === "chat").length, 1);
});

test("Malformed model output is still shown; empty output and unknown models are rejected", async () => {
  assert.deepEqual(createLocalAi.parseAnswer("```json\n{\"summary\":\"x\"}\n```").summary, "x");
  assert.equal(createLocalAi.parseAnswer("Vorweg: {\"summary\":\"y\",\"hint\":\"z\"} danach").hint, "z");
  assert.equal(createLocalAi.parseAnswer("Nur ein Satz ohne JSON.").summary, "Nur ein Satz ohne JSON.");
  assert.throws(() => createLocalAi.cleanFeedback({}), /keine verwertbare Antwort/);
  const ai = createLocalAi({ gpu: () => ({}), importer: fakeLibrary("{}") });
  await assert.rejects(ai.load("unbekannt"), /Unbekanntes Modell/);
  await ai.load();
  await assert.rejects(ai.request(payload), /keine verwertbare Antwort/);
  const failing = createLocalAi({ gpu: () => ({}), importer: async () => ({ CreateMLCEngine: async () => { throw new Error("GPUDevice lost: out of memory"); } }) });
  await assert.rejects(failing.load(), /Grafikspeicher/);
  assert.equal(failing.loaded(), false);
});
