# KI-Lerncoach-Worker für AlgoLab

Kleiner Cloudflare Worker als sicherer Zwischendienst zwischen AlgoLab und
Google Gemini. Er hält den API-Schlüssel geheim, lässt nur freigegebene
Ursprünge zu, begrenzt die Anfragen und gibt nur die nötigen Aufgabendaten an
das Modell weiter. Die Schnittstelle (`POST /feedback`) ist dieselbe wie beim
PythonLab-Worker; der Systemauftrag ist auf BPE 7 zugeschnitten (Arrays,
Sortieren, Suchen, dynamische Datenstrukturen, Fachbegriffe des Unterrichts,
keine fertigen Hilfen wie `sorted()` vorschlagen).

## Brauche ich diesen Worker?

Nein, nicht zwingend. AlgoLab nutzt standardmäßig den bereits eingerichteten
PythonLab-Worker (`config.js` → `aiFeedbackEndpoint`), weil beide Seiten unter
`https://jakobsawazki.github.io` laufen. Dieser Worker ist die Alternative,
wenn AlgoLab einen eigenen Schlüssel, eigene Grenzen oder den BPE-7-Prompt
erhalten soll.

## Stand 19. Oktober 2026

Der PythonLab-Worker ist erreichbar und erlaubt die AlgoLab-Adresse. Die
Anfrage an Gemini scheitert derzeit aber mit HTTP 502 („Der KI-Dienst konnte
gerade keine Rückmeldung erzeugen“). Das betrifft auch PythonLab. Bitte im
Cloudflare-Dashboard unter *Workers → pythonlab-ai-feedback → Logs* die
Meldung „Gemini request failed“ ansehen und in Google AI Studio prüfen:

1. Ist der Schlüssel `GEMINI_API_KEY` noch gültig (nicht gelöscht/rotiert)?
2. Ist das Kontingent des Projekts erschöpft?
3. Ist das Modell `gemini-flash-lite-latest` für den Schlüssel verfügbar?
   Sonst `GEMINI_MODEL` z. B. auf ein aktuelles Flash-Lite-Modell setzen.

Dieser AlgoLab-Worker gibt zusätzlich `upstreamStatus` zurück und schreibt
Statuscode und Fehlermeldung von Gemini ins Log – das erleichtert die
Fehlersuche.

## Variante A: Einrichtung über das Cloudflare-Dashboard (empfohlen)

1. Bei [dash.cloudflare.com](https://dash.cloudflare.com) anmelden →
   *Workers & Pages* → *Create* → *Create Worker*, Name `algolab-ai-coach`.
2. *Edit code*: den Inhalt von `worker.js` vollständig einfügen, *Deploy*.
3. *Settings → Variables and Secrets*:
   - Variable `ALLOWED_ORIGINS` =
     `https://jakobsawazki.github.io,http://127.0.0.1:4175,http://localhost:4175`
   - Variable `GEMINI_MODEL` = `gemini-flash-lite-latest`
   - **Secret** `GEMINI_API_KEY` = Schlüssel aus Google AI Studio
4. Die angezeigte Adresse `https://algolab-ai-coach.<konto>.workers.dev`
   notieren und in AlgoLab in `config.js` eintragen:
   `aiFeedbackEndpoint: "https://algolab-ai-coach.<konto>.workers.dev/feedback"`.
5. Veröffentlichen (Commit/Push); danach in AlgoLab unter *Programmieren*
   eine Aufgabe öffnen, KI-Modus aktivieren und „KI jetzt um Hilfe bitten“.

## Variante B: wrangler-CLI

```bash
cd services/ai-coach-worker
npm install
npx wrangler login
npx wrangler secret put GEMINI_API_KEY
npx wrangler deploy
```

## Grundsätze

- Der Schlüssel steht nie in `config.js`, im Repository oder im Browser.
- Übertragen werden nur Aufgaben-ID, Titel, Kurzbeschreibung, Arbeitsschritte,
  Code, lokales Prüfergebnis und Versuchszähler – kein Name, keine Klasse,
  keine Punkte, kein Lernstand.
- Grenzen: 10 Anfragen je Sitzung und 240 je IP-Adresse in 5 Minuten,
  höchstens 20 KB je Anfrage.
- Die KI vergibt keine Punkte und bekommt die Anweisung, keine vollständige
  Lösung zu verraten. Maßgeblich ist immer die lokale Prüfung in AlgoLab.
- Vor dem regulären Einsatz mit Schülerinnen und Schülern: schulische
  Datenschutzfreigabe und geeigneten Gemini-Tarif klären (kostenlose Stufe:
  Inhalte können zur Produktverbesserung genutzt werden).
