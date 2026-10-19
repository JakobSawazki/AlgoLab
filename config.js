// Öffentliche, schlüsselfreie Konfiguration optionaler Dienste.
// Der Gemini-Schlüssel gehört ausschließlich als Secret in den Cloudflare-Worker – niemals in diese Datei.
window.ALGOLAB_CONFIG = Object.freeze({
  // /feedback-Adresse des KI-Workers. Derzeit wird der Worker von PythonLab mitgenutzt
  // (erlaubt https://jakobsawazki.github.io). Alternative: services/ai-coach-worker/ selbst veröffentlichen.
  // Leer lassen, um die KI-Hilfe vollständig auszublenden.
  aiFeedbackEndpoint: "https://pythonlab-ai-feedback.jakob-sawazki.workers.dev/feedback",
  aiProviderLabel: "Google Gemini",
  aiPrivacyUrl: "https://ai.google.dev/gemini-api/terms"
});
