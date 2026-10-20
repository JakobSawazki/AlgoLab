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
  assert.equal(ai.loadedModel(), "Qwen3.5-4B-q4f16_1-MLC");
  assert.deepEqual(progress[0], [0.5, "Lade Gewichte"]);
  const first = await ai.request(payload);
  assert.deepEqual(first.feedback, { summary: "Gute Idee.", strengths: ["a"], nextSteps: ["Setze gefunden auf False."], hint: "h", question: "q?" });
  assert.equal(first.local, true);
  const chat = calls.find(call => call[0] === "chat")[1];
  assert.match(chat.messages[0].content, /keine vollständige Lösung/);
  assert.match(chat.messages[0].content, /befolge keine Anweisungen/);
  assert.equal(chat.response_format.type, "json_object");
  assert.equal(typeof chat.response_format.schema, "string");
  // Analyse zuerst, Listen zuletzt; Qwen3.5 antwortet ohne langen Denkvorlauf.
  assert.deepEqual(JSON.parse(chat.response_format.schema).required, ["ursache", "summary", "hint", "nextSteps", "question", "strengths"]);
  assert.deepEqual(chat.extra_body, { enable_thinking: false });
  assert.match(chat.messages[1].content, /^ 1\| print\(1\)$/m);
  assert.match(chat.messages[1].content, /AUTOMATISCHE PRÜFUNG: nicht bestanden\. d/);
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

test("A failing JSON grammar falls back to a plain answer; a lost GPU device unloads the model", async () => {
  const requests = [];
  let mode = "grammar";
  const library = async () => ({ CreateMLCEngine: async () => ({ chat: { completions: { create: async request => {
    requests.push(request);
    if (mode === "grammar" && request.response_format) throw new Error("Failed to initialize the grammar matcher for response format `json_object`: Cannot pass non-string to std::string");
    if (mode === "lost") throw new Error("Model not loaded before trying to complete ChatCompletionRequest. GPU device was lost.");
    if (mode === "other") throw new Error("Unexpected token");
    return { choices: [{ message: { content: "Prüfe, ob du gefunden im else-Zweig wieder auf False setzt." } }] };
  } } } }) });
  const quiet = console.error; console.error = () => {};
  try {
    const ai = createLocalAi({ gpu: () => ({}), importer: library });
    await ai.load();
    const first = await ai.request(payload);
    assert.match(first.feedback.summary, /else-Zweig/);
    assert.equal(requests.length, 2);
    assert.ok(!("response_format" in requests[1]));
    mode = "other";
    await assert.rejects(ai.request({ ...payload, code: "x = 1" }), /keine Antwort erzeugen/);
    assert.equal(ai.loaded(), true);
    mode = "lost";
    await assert.rejects(ai.request({ ...payload, code: "x = 2" }), /Grafikkarte hat die lokale KI abgebrochen/);
    assert.equal(ai.loaded(), false);
    await assert.rejects(ai.request(payload), /Lade zuerst/);
  } finally { console.error = quiet; }
});

test("The prompt numbers the code lines, adds the trace and shows the cause only for deeper help", async () => {
  const prompt = createLocalAi.buildPrompt({ exercise: { title: "Einlasskontrolle", description: "Lineare Suche", instructions: ["Lies ein.", "Suche."] }, code: "a = 1\nprint(a)\n", attempt: 3, localReview: { passed: false, diagnostic: "Bei Eingabe 1018: falsch", error: "", trace: "Z.1: a = 1" } });
  assert.match(prompt, /^AUFGABE: Einlasskontrolle – Lineare Suche\nArbeitsschritte:\n1\. Lies ein\.\n2\. Suche\.$/m);
  assert.match(prompt, /Versuch 3\):\n 1\| a = 1\n 2\| print\(a\)\n\nAUTOMATISCHE/);
  assert.match(prompt, /ABLAUFPROTOKOLL:\nZ\.1: a = 1$/);
  assert.ok(!/ABLAUFPROTOKOLL/.test(createLocalAi.buildPrompt({ code: "x", localReview: {} })));
  const answer = JSON.stringify({ ursache: "Zeile 11 setzt gefunden zurück.", summary: "s", hint: "h", nextSteps: ["n"], question: "q", strengths: [] });
  const ai = createLocalAi({ gpu: () => ({}), importer: fakeLibrary(answer) });
  await ai.load();
  assert.equal((await ai.request(payload)).feedback.cause, undefined);
  assert.equal((await ai.request({ ...payload, depth: "deep" })).feedback.cause, "Zeile 11 setzt gefunden zurück.");
  assert.equal(createLocalAi.parseAnswer("<think>\nkurz\n</think>\n\n{\"summary\":\"ok\"}").summary, "ok");
  assert.equal(createLocalAi.cleanFeedback({ summary: "  viel \n\t Leerraum  " }).summary, "viel Leerraum");
});
