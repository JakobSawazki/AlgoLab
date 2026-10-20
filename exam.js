(function (root) {
  "use strict";
  // Bereich „Klausurvorbereitung“: abiturnahe Übungsklausuren zu BPE 7 mit Operator, AFB und BE.
  // Grundlage ist die Auswertung der Abiturprüfungen 2021–2026 (docs/abitur-bpe7-analyse.md).
  // Alle Aufgaben sind eigens formuliert; Prüfungsoriginale werden nicht übernommen.

  const s = text => ({ s: text });
  const loop = (head, body) => ({ loop: head, body });
  const when = (condition, yes, no = []) => ({ if: condition, yes, no });

  const format = [
    { label: "Dauer", value: "210 Minuten", text: "Für 80 BE – gut zweieinhalb Minuten je Bewertungseinheit." },
    { label: "Auswahl", value: "2 aus 3", text: "Drei Aufgaben zu je 40 BE, zwei werden bearbeitet. Aufgabe 1 hat den Schwerpunkt Datenbanken (BPE 6)." },
    { label: "Hilfsmittel", value: "PC ohne KI", text: "Entwicklungsumgebung, Office, Datenbanksystem und die Operatorenliste für Struktogramme ab Version 2.2 – keine KI, kein Internet." },
    { label: "Programmieren", value: "im Struktogramm", text: "Im schriftlichen Abitur wird nicht quellcodeorientiert geprüft: Algorithmen erstellst du als Struktogramm. Python hilft dir beim Testen." }
  ];
  const strategy = [
    "Lies zuerst alle Aufgaben quer (etwa zehn Minuten) und wähle dann die zwei, bei denen du die meisten BE sicher holst.",
    "Plane mit gut zweieinhalb Minuten je BE und lass am Ende zehn Minuten zur Kontrolle.",
    "Markiere in jeder Teilaufgabe den Operator: „nennen“ verlangt nur das Ergebnis, „dokumentieren“ alle Zwischenschritte, „begründen“ einen Zusammenhang von Ursache und Wirkung.",
    "Halte dich im Struktogramm an die Bausteine der Operatorenliste (Deklaration und Initialisierung, Zuweisung, Ausgabe, Wiederhole …) und deklariere jede Variable vor ihrer Nutzung.",
    "Teste deine Idee bei Algorithmus-Aufgaben kurz in Python an der Entwicklungsumgebung und übertrage sie dann von Hand ins Struktogramm.",
    "Verlangt die Aufgabe „beliebige“ Arrays, verwende „Anzahl der Elemente des Arrays …“ statt einer festen Länge.",
    "Übersetze Grenzen genau: „ab 30“ heißt ≥ 30, „über 30“ heißt > 30, „bis 10“ heißt ≤ 10.",
    "Beim Handsimulieren hilft eine Tabelle: eine Spalte je Variable, eine Zeile je Durchlauf – bei Bubble Sort genau lesen, ob eine Zeile je Phase oder je Vertauschung verlangt ist."
  ];

  // Operatorenliste des Bildungsplans 2020 (Informatik), sinngemäß, mit BPE-7-Beispielen.
  const operators = [
    { name: "nennen", afb: "I–II", meaning: "Sachverhalte, Strukturen oder Ergebnisse ohne Begründung aufführen.", example: "Nennen Sie die Ausgabe des Algorithmus für die Eingabe 4." },
    { name: "beschreiben", afb: "I–II", meaning: "Strukturen und Zusammenhänge strukturiert und fachsprachlich richtig mit eigenen Worten wiedergeben.", example: "Beschreiben Sie, wie Daten in eine Warteschlange eingefügt und daraus entfernt werden." },
    { name: "darstellen", afb: "I–II", meaning: "Zusammenhänge oder Methoden strukturiert grafisch oder fachsprachlich wiedergeben.", example: "Stellen Sie die Reihenfolge der Lieder als verkettete Liste dar." },
    { name: "erstellen", afb: "II (Musterprüfung: I–II)", meaning: "Sachverhalte gemäß vorgegebener Syntax darstellen – im Abitur meist als Struktogramm nach der Operatorenliste.", example: "Erstellen Sie einen Algorithmus in Form eines Struktogramms, der …" },
    { name: "dokumentieren", afb: "II–III", meaning: "Alle notwendigen Erklärungen, Herleitungen und Skizzen darstellen, z. B. als Tabelle aller Variablenwerte.", example: "Dokumentieren Sie die Werte der Variablen während des Ablaufs." },
    { name: "ermitteln", afb: "I–II", meaning: "Einen Zusammenhang oder eine Lösung finden und das Ergebnis formulieren.", example: "Ermitteln Sie die Anzahl der Vertauschungen." },
    { name: "bestimmen", afb: "II–III", meaning: "Einen Lösungsweg aufzeigen und das Ergebnis formulieren.", example: "Bestimmen Sie die Anzahl der Vergleiche bis zur vollständigen Sortierung." },
    { name: "erläutern", afb: "I–II", meaning: "Abläufe in Einzelheiten verdeutlichen und durch zusätzliche Informationen verständlich machen.", example: "Erläutern Sie die Funktionsweise des Algorithmus." },
    { name: "vervollständigen", afb: "I–II", meaning: "Vorgegebene Strukturen nach bereits vorliegenden Kriterien ergänzen.", example: "Vervollständigen Sie hierfür das nachfolgende Struktogramm." },
    { name: "erweitern", afb: "II–III", meaning: "Eine vorgegebene Struktur um Bestandteile ergänzen.", example: "Erweitern Sie das Struktogramm so, dass die Anzahl ausgegeben wird." },
    { name: "entwerfen", afb: "II–III", meaning: "Funktionalitäten unter Berücksichtigung vorgegebener Daten zusammenstellen.", example: "Entwerfen Sie eine Belegung eines Arrays, die nach der zweiten Phase sortiert ist." },
    { name: "entwickeln", afb: "II–III", meaning: "Zu einer Problemstellung ein konkretes Lösungsmodell begründend skizzieren.", example: "Entwickeln Sie einen Algorithmus in Form eines Struktogramms für beliebige Arrays." },
    { name: "überprüfen", afb: "II–III", meaning: "Sachverhalte oder Behauptungen nach fachlich üblichen Kriterien untersuchen.", example: "Überprüfen Sie die Behauptung, dass die Vorrangregel eingehalten wurde." },
    { name: "begründen", afb: "II", meaning: "Einen folgerichtigen Zusammenhang zwischen Ursache und Wirkung herstellen.", example: "Begründen Sie, ob es sich weiterhin um einen Baum handelt." },
    { name: "definieren", afb: "II–III", meaning: "Einen Begriff exakt bestimmen, um ihn von anderen abzugrenzen.", example: "Definieren Sie den Begriff Binärbaum." },
    { name: "Stellung nehmen", afb: "III", meaning: "Unter Heranziehung von Kenntnissen differenziert eine eigene begründete Position beziehen.", example: "Nehmen Sie Stellung zur Aussage Ihres Mitschülers." }
  ];
  const operatorQuiz = [
    { id: "nennen", sentence: "Nennen Sie die Ausgabe des Algorithmus.", options: ["Nur das Ergebnis – eine Herleitung ist nicht verlangt.", "Das Ergebnis mit vollständiger Tabelle aller Zwischenwerte.", "Eine begründete Bewertung des Algorithmus."], correct: 0, why: "„Nennen“ (AFB I–II) verlangt das Aufführen ohne Begründung." },
    { id: "dokumentieren", sentence: "Dokumentieren Sie die Werte der Variablen während des Ablaufs.", options: ["Nur die letzte Ausgabe angeben.", "Alle Zwischenschritte nachvollziehbar darstellen, z. B. als Tabelle je Durchlauf.", "Den Algorithmus in Python übersetzen."], correct: 1, why: "„Dokumentieren“ heißt: alle notwendigen Erklärungen, Herleitungen und Skizzen darstellen." },
    { id: "erstellen", sentence: "Erstellen Sie einen Algorithmus in Form eines Struktogramms.", options: ["Python-Quelltext schreiben.", "Den Ablauf in Stichworten beschreiben.", "Ein Struktogramm mit den Bausteinen der Operatorenliste zeichnen."], correct: 2, why: "„Erstellen“ meint das Darstellen gemäß vorgegebener Syntax – hier die Operatorenliste für Struktogramme." },
    { id: "erlaeutern", sentence: "Erläutern Sie die Funktionsweise des Algorithmus.", options: ["Den Ablauf in Einzelheiten verständlich machen und mit dem Ziel des Algorithmus verbinden.", "Nur den Namen des Verfahrens nennen.", "Die Laufzeit in Sekunden messen."], correct: 0, why: "„Erläutern“ verlangt, Abläufe in Einzelheiten zu verdeutlichen und verständlich zu machen." },
    { id: "begruenden", sentence: "Begründen Sie, ob es sich weiterhin um einen Baum handelt.", options: ["Ja oder Nein genügt.", "Die passende Eigenschaft des Baums prüfen und daraus folgerichtig schließen.", "Einen neuen Baum zeichnen."], correct: 1, why: "„Begründen“ (AFB II) verbindet Ursache und Wirkung: Eigenschaft → Folgerung." },
    { id: "ueberpruefen", sentence: "Überprüfen Sie die Behauptung von Heidi.", options: ["Der Behauptung einfach zustimmen.", "Die Behauptung nach fachlichen Kriterien untersuchen, z. B. anhand der Ereignisliste, und das Ergebnis formulieren.", "Die Behauptung umformulieren."], correct: 1, why: "„Überprüfen“ (AFB II–III) heißt, nach fachlich üblichen Kriterien zu untersuchen." },
    { id: "stellung", sentence: "Nehmen Sie Stellung zur Aussage des Mitarbeiters.", options: ["Eine eigene, mit Fachwissen begründete Position beziehen.", "Die Aussage wörtlich wiederholen.", "Nur Gegenargumente aufzählen."], correct: 0, why: "„Stellung nehmen“ (AFB III) verlangt eine differenzierte, begründete eigene Position." },
    { id: "bestimmen", sentence: "Bestimmen Sie die Anzahl der Vergleiche bis zur vollständigen Sortierung.", options: ["Die Zahl raten und angeben.", "Den Lösungsweg aufzeigen (z. B. Vergleiche je Phase) und das Ergebnis formulieren.", "Den Algorithmus beschreiben."], correct: 1, why: "„Bestimmen“ (AFB II–III) verlangt Lösungsweg und Ergebnis." },
    { id: "entwerfen", sentence: "Entwerfen Sie eine Belegung eines Arrays, die erst nach der zweiten Bubble-Phase sortiert ist.", options: ["Eine eigene passende Belegung unter Beachtung der Vorgaben zusammenstellen.", "Eine beliebige Belegung angeben.", "Bubble Sort definieren."], correct: 0, why: "„Entwerfen“ (AFB II–III) stellt eine Lösung unter Berücksichtigung vorgegebener Daten zusammen." },
    { id: "vervollstaendigen", sentence: "Vervollständigen Sie hierfür das nachfolgende Struktogramm.", options: ["Ein neues Struktogramm ohne die Vorgabe zeichnen.", "Das vorgegebene Grundgerüst weiterführen und ergänzen.", "Die Vorgabe in Python übersetzen."], correct: 1, why: "„Vervollständigen“ ergänzt vorgegebene Strukturen nach vorliegenden Kriterien." }
  ];

  // Kurzreferenz: Bausteine der Operatorenliste für Struktogramme (v2.2) an einem Beispiel.
  const nsdReference = { title: "Algorithmus Beispiel", blocks: [
    s("Deklaration und Einlesen: grenze"),
    s("Deklaration und Initialisierung: werte = [12, 7, 25, 3]"),
    s("Deklaration und Initialisierung: anzahl = 0"),
    loop("Wiederhole von i = 0 solange i < Anzahl der Elemente des Arrays werte, Schrittweite 1", [
      when("werte[i] > grenze", [s("Zuweisung: anzahl = anzahl + 1")])
    ]),
    loop("Wiederhole solange anzahl > 0", [s("Ausgabe: \"*\""), s("Zuweisung: anzahl = anzahl − 1")]),
    s("Ausgabe: \"fertig\" + Zeilenumbruch")
  ] };
  const nsdNotes = [
    "Variablen vor der Nutzung deklarieren: „Deklaration und Initialisierung: x = 0“ oder „Deklaration und Einlesen: x“.",
    "Werte ändern: „Zuweisung: summe = summe + werte[i]“ – auch für Arrayelemente wie „Zuweisung: werte[2] = 5“.",
    "Zählschleife: „Wiederhole von i = 0 solange i < 5, Schrittweite 1“ oder alternativ „Zähle i von 0 bis 4, Schrittweite 1“.",
    "Bedingte Schleife: „Wiederhole solange bedingung“; Verzweigung mit Bedingung und den Zweigen J/N.",
    "Vergleiche: ==, !=, <, <=, >, >=; logische Verknüpfung: AND, OR, NOT.",
    "Länge eines Arrays: „Anzahl der Elemente des Arrays werte“; Ausgabe mit Zeilenumbruch: „Ausgabe: text + Zeilenumbruch“.",
    "Unterprogramme: „Aufruf: berechne(betrag)“ und „Rückgabe: ergebnis“."
  ];

  // Aufgabentypen mit BPE-7-Bezug, wie sie in den Abiturprüfungen 2021–2026 wiederkehren.
  const taskTypes = [
    { title: "Struktogramm lesen und Ausgabe nennen", ops: "nennen, angeben", train: [["Übungsklausur A · 1.1", "#klausur/arrays"]], units: ["L1.3", "L1.4"] },
    { title: "Variablenwerte dokumentieren (Schreibtischtest)", ops: "dokumentieren", train: [["Übungsklausur A · 1.2", "#klausur/arrays"], ["Übungsklausur B · 2.7", "#klausur/sortieren"]], units: ["L1.7", "L2.6"] },
    { title: "Rückwärts denken: Eingabe zum Ergebnis", ops: "nennen, erklären", train: [["Übungsklausur A · 1.3", "#klausur/arrays"]], units: ["L1.4"] },
    { title: "Array-Algorithmus als Struktogramm erstellen oder erweitern", ops: "erstellen, erweitern, entwickeln", train: [["Übungsklausur A · 1.4/1.5", "#klausur/arrays"], ["Struktogramm-Training", "#struktogramme"]], units: ["L1.4", "L2.1"] },
    { title: "Bubble Sort von Hand: Phasen, Vertauschungen, Vergleiche", ops: "nennen, bestimmen, entwerfen", train: [["Übungsklausur B · 2.1–2.4", "#klausur/sortieren"]], units: ["L2.2", "L2.4"] },
    { title: "Sortieralgorithmus erläutern", ops: "erläutern", train: [["Übungsklausur B · 2.5", "#klausur/sortieren"]], units: ["L2.3"] },
    { title: "Warteschlange und Stapel mit Ereignisliste", ops: "nennen, beschreiben, überprüfen", train: [["Übungsklausur C · 3.1/3.2", "#klausur/datenstrukturen"]], units: ["L3.2", "L3.3"] },
    { title: "Verkettete Liste darstellen und aktualisieren", ops: "darstellen, beschreiben", train: [["Übungsklausur C · 3.3", "#klausur/datenstrukturen"]], units: ["L3.1"] },
    { title: "Binärbaum: voll, vollständig, sortiert", ops: "definieren, überprüfen, entwerfen, begründen", train: [["Übungsklausur C · 3.4", "#klausur/datenstrukturen"]], units: ["L3.4"] },
    { title: "Struktogramm auf logische Fehler überprüfen", ops: "überprüfen, Stellung nehmen", train: [["Übungsklausur A · 1.7", "#klausur/arrays"]], units: ["L2.1", "L2.4"] }
  ];

  // ——— Übungsklausuren ———
  const exams = [
    { id: "arrays", title: "Arrays und Struktogramme", subtitle: "Übungsklausur A", minutes: 75, units: ["L1.3", "L1.4", "L1.5", "L2.1"],
      intro: "Ein Sportverein wertet Trainings- und Wettkampfdaten aus. Alle Algorithmen sollen – wo verlangt – für beliebige Arrays funktionieren.",
      tasks: [
        { id: "ausgabe", no: "1.1", op: "Nennen", afb: "I", be: 3, unit: "L1.4",
          prompt: "Nennen Sie die beiden Ausgaben, die der folgende Algorithmus erzeugt.",
          nsd: { title: "Algorithmus", blocks: [
            s("Deklaration und Initialisierung: punkte = [4, 7, 2, 9, 5]"), s("Deklaration und Initialisierung: summe = 0"), s("Deklaration und Initialisierung: muster = \"\""),
            loop("Wiederhole von i = 0 solange i < 5, Schrittweite 1", [s("Zuweisung: summe = summe + punkte[i]"), when("punkte[i] > 4", [s("Zuweisung: muster = muster + \"+\"")], [s("Zuweisung: muster = muster + \"-\"")])]),
            s("Ausgabe: summe + Zeilenumbruch"), s("Ausgabe: muster")] },
          answer: { type: "fields", fields: [
            { id: "a", label: "Ausgabe 1", kind: "number", solution: 27, be: 1 },
            { id: "b", label: "Ausgabe 2", kind: "text", solution: "-+-++", be: 2 }] },
          explanation: "summe = 4 + 7 + 2 + 9 + 5 = 27. Für 4, 2 wird „-“ angehängt, für 7, 9, 5 „+“ – in der Reihenfolge der Elemente: -+-++." },
        { id: "trace", no: "1.2", op: "Dokumentieren", afb: "II", be: 4, unit: "L1.4",
          prompt: "Dokumentieren Sie die Werte der Variablen in jedem Schleifendurchlauf, wenn für n der Wert 4 eingegeben wird.",
          nsd: { title: "Algorithmus", blocks: [
            s("Deklaration und Einlesen: n"), s("Deklaration und Initialisierung: wert = 1"), s("Deklaration und Initialisierung: summe = 0"),
            loop("Wiederhole von i = 1 solange i <= n, Schrittweite 1", [s("Zuweisung: wert = wert * 2"), s("Zuweisung: summe = summe + wert")]),
            s("Ausgabe: summe")] },
          answer: { type: "table", columns: ["Durchlauf", "i", "wert", "summe"], given: [0], solution: [[1, 1, 2, 2], [2, 2, 4, 6], [3, 3, 8, 14], [4, 4, 16, 30]] },
          explanation: "wert verdoppelt sich in jedem Durchlauf (2, 4, 8, 16); summe addiert ihn: 2, 6, 14, 30. Ausgegeben wird 30." },
        { id: "rueckwaerts", no: "1.3", op: "Nennen", afb: "II", be: 2, unit: "L1.4",
          prompt: "Nennen Sie den Wert für n, den der Benutzer im Algorithmus aus 1.2 eingeben muss, damit 126 ausgegeben wird.",
          answer: { type: "fields", fields: [{ id: "n", label: "n", kind: "number", solution: 6, be: 2 }] },
          explanation: "Die Summen lauten 2, 6, 14, 30, 62, 126 – nach dem sechsten Durchlauf ist 126 erreicht, also n = 6." },
        { id: "hitzetage", no: "1.4", op: "Erweitern", afb: "II", be: 6, unit: "L1.4",
          prompt: "Im Array temp sind die Tageshöchsttemperaturen einer Woche gespeichert. Ein Hitzetag ist ein Tag mit mindestens 30 °C. Erweitern Sie das Struktogramm so, dass die Anzahl der Hitzetage für eine beliebige Belegung von temp bestimmt und ausgegeben wird.",
          nsd: { title: "Algorithmus", blocks: [s("Deklaration und Initialisierung: temp = [28.5, 31.0, 33.4, 29.9, 30.0, 35.2, 27.1]")] },
          answer: { type: "open", draft: "Dein Struktogramm-Entwurf (Bausteine zeilenweise)",
            model: { title: "Erwartungshorizont", blocks: [
              s("Deklaration und Initialisierung: temp = [28.5, 31.0, 33.4, 29.9, 30.0, 35.2, 27.1]"), s("Deklaration und Initialisierung: anzahl = 0"),
              loop("Wiederhole von i = 0 solange i < Anzahl der Elemente des Arrays temp, Schrittweite 1", [when("temp[i] >= 30", [s("Zuweisung: anzahl = anzahl + 1")])]),
              s("Ausgabe: \"Hitzetage: \" + anzahl")] },
            criteria: [
              { text: "Zählvariable vor der Schleife mit 0 deklariert und initialisiert", be: 1 },
              { text: "Schleife über alle Elemente – Länge über „Anzahl der Elemente des Arrays temp“, nicht fest 7", be: 2 },
              { text: "Bedingung temp[i] >= 30 (30 °C zählt mit)", be: 1 },
              { text: "Zähler im J-Zweig erhöht", be: 1 },
              { text: "Ausgabe nach der Schleife", be: 1 }],
            python: { starter: "temp = [float(x) for x in input().split()]\n\n# Hitzetage zählen und ausgeben\n", input: "28.5 31 33.4 29.9 30 35.2 27.1",
              check: { type: "number", cases: [{ input: "28.5 31 33.4 29.9 30 35.2 27.1", expected: 4 }, { input: "25 26.5 29.9", expected: 0 }, { input: "30 30 30 30", expected: 4 }] } } },
          explanation: "Typischer Fehler: > 30 statt >= 30 – dann fehlt der Tag mit genau 30,0 °C (Ergebnis 3 statt 4)." },
        { id: "endnote", no: "1.5", op: "Entwickeln", afb: "III", be: 6, unit: "L1.4",
          prompt: "Beim Kunstturnen vergeben fünf Kampfrichter je eine Wertung, gespeichert im Array wertungen. Die höchste und die niedrigste Wertung werden gestrichen; die Endnote ist der Durchschnitt der übrigen drei Wertungen. Entwickeln Sie einen Algorithmus in Form eines Struktogramms, der für ein beliebiges Array mit fünf Wertungen die Endnote ermittelt und ausgibt.",
          answer: { type: "open", draft: "Dein Struktogramm-Entwurf (Bausteine zeilenweise)",
            model: { title: "Erwartungshorizont (eine mögliche Lösung)", blocks: [
              s("Deklaration und Initialisierung: wertungen = [8.4, 9.1, 8.8, 7.9, 9.0]"), s("Deklaration und Initialisierung: summe = 0"),
              s("Deklaration und Initialisierung: hoechste = wertungen[0]"), s("Deklaration und Initialisierung: niedrigste = wertungen[0]"),
              loop("Wiederhole von i = 0 solange i < 5, Schrittweite 1", [s("Zuweisung: summe = summe + wertungen[i]"),
                when("wertungen[i] > hoechste", [s("Zuweisung: hoechste = wertungen[i]")]), when("wertungen[i] < niedrigste", [s("Zuweisung: niedrigste = wertungen[i]")])]),
              s("Deklaration und Initialisierung: endnote = (summe − hoechste − niedrigste) / 3"), s("Ausgabe: endnote")] },
            criteria: [
              { text: "Summe aller Wertungen in einer Schleife gebildet", be: 1 },
              { text: "Höchste Wertung korrekt bestimmt (Startwert aus dem Array, nicht 0)", be: 1 },
              { text: "Niedrigste Wertung korrekt bestimmt", be: 1 },
              { text: "Schleife über alle fünf Elemente", be: 1 },
              { text: "Endnote = (Summe − höchste − niedrigste) / 3", be: 1 },
              { text: "Ausgabe der Endnote", be: 1 }],
            python: { starter: "wertungen = [float(x) for x in input().split()]\n\n# Endnote berechnen und ausgeben\n", input: "8.4 9.1 8.8 7.9 9.0",
              check: { type: "number", cases: [{ input: "8.4 9.1 8.8 7.9 9.0", expected: 8.733333 }, { input: "9 9 9 9 9", expected: 9 }, { input: "5 10 7 6 8", expected: 7 }] } } },
          explanation: "Für [8.4, 9.1, 8.8, 7.9, 9.0]: Summe 43,2; ohne 9,1 und 7,9 bleiben 26,2; Endnote ≈ 8,73. Wer max mit 0 und min mit 0 startet, bekommt für min immer 0 – deshalb mit wertungen[0] beginnen." },
        { id: "umkehr-ausgabe", no: "1.6.1", op: "Nennen", afb: "I", be: 1, unit: "L1.5",
          prompt: "Nennen Sie die Ausgabe des folgenden Algorithmus.",
          nsd: { title: "Algorithmus", blocks: [
            s("Deklaration und Initialisierung: namen = [\"Ada\", \"Ben\", \"Cem\", \"Dana\", \"Eli\"]"), s("Deklaration und Initialisierung: links = 0"),
            s("Deklaration und Initialisierung: rechts = Anzahl der Elemente des Arrays namen − 1"),
            loop("Wiederhole solange links < rechts", [s("Deklaration und Initialisierung: zwischenspeicher = namen[links]"), s("Zuweisung: namen[links] = namen[rechts]"),
              s("Zuweisung: namen[rechts] = zwischenspeicher"), s("Zuweisung: links = links + 1"), s("Zuweisung: rechts = rechts − 1")]),
            s("Ausgabe: namen")] },
          answer: { type: "fields", fields: [{ id: "a", label: "Ausgabe (Elemente durch Kommas getrennt)", kind: "seq", solution: ["Eli", "Dana", "Cem", "Ben", "Ada"], be: 1 }] },
          explanation: "Zuerst werden Ada und Eli getauscht, dann Ben und Dana; Cem steht in der Mitte und bleibt." },
        { id: "umkehr-erlaeutern", no: "1.6.2", op: "Erläutern", afb: "II", be: 4, unit: "L1.5",
          prompt: "Erläutern Sie die Funktionsweise des Algorithmus aus 1.6.1.",
          answer: { type: "open", draft: "Deine Erläuterung",
            model: "Der Algorithmus kehrt die Reihenfolge der Elemente im Array selbst um. links beginnt beim ersten, rechts beim letzten Index. In jedem Durchlauf werden die beiden Elemente über einen Zwischenspeicher getauscht; danach rücken beide Indizes einen Schritt aufeinander zu. Die Schleife endet, sobald links nicht mehr kleiner als rechts ist – bei ungerader Anzahl bleibt das mittlere Element an seinem Platz.",
            criteria: [
              { text: "Ziel benannt: Reihenfolge des Arrays wird umgekehrt", be: 1 },
              { text: "links und rechts starten an den beiden Enden und laufen aufeinander zu", be: 1 },
              { text: "Tausch der beiden Elemente über den Zwischenspeicher erklärt", be: 1 },
              { text: "Abbruchbedingung erklärt (mittleres Element bleibt bei ungerader Anzahl)", be: 1 }] } },
        { id: "versand-ausgabe", no: "1.7.1", op: "Nennen", afb: "II", be: 1, unit: "L2.1",
          prompt: "Ein Onlineshop berechnet Versandkosten: ab 50 € Bestellwert versandkostenfrei, ab 20 € kostet der Versand 2,90 €, darunter 4,90 €. Nennen Sie die Ausgabe des Algorithmus für einen Bestellwert von 80 €.",
          nsd: { title: "Algorithmus", blocks: [
            s("Deklaration und Einlesen: bestellwert"),
            when("bestellwert >= 20", [s("Deklaration und Initialisierung: versand = 2.90")], [when("bestellwert >= 50", [s("Deklaration und Initialisierung: versand = 0")], [s("Deklaration und Initialisierung: versand = 4.90")])]),
            s("Ausgabe: versand")] },
          answer: { type: "fields", fields: [{ id: "a", label: "Ausgabe", kind: "number", solution: 2.9, be: 1 }] },
          explanation: "80 >= 20 ist wahr – der J-Zweig setzt 2,90 €. Die Prüfung auf 50 € wird nie erreicht." },
        { id: "versand-pruefen", no: "1.7.2", op: "Überprüfen", afb: "III", be: 3, unit: "L2.1",
          prompt: "Ein Mitarbeiter behauptet, der Algorithmus aus 1.7.1 enthalte einen logischen Fehler. Überprüfen Sie die Behauptung und geben Sie eine Korrektur an.",
          answer: { type: "open", draft: "Deine Überprüfung",
            model: "Die Behauptung stimmt. Die Bedingung bestellwert >= 20 wird zuerst geprüft und ist auch für alle Bestellwerte ab 50 € wahr. Deshalb wird z. B. für 80 € der Versand 2,90 € ausgegeben, obwohl er kostenlos sein müsste; der Zweig „versand = 0“ ist nie erreichbar. Korrektur: zuerst bestellwert >= 50 prüfen, im N-Zweig dann bestellwert >= 20.",
            criteria: [
              { text: "Fehler erkannt: >= 20 wird zuerst geprüft und gilt auch ab 50 €", be: 1 },
              { text: "Folge an einem konkreten Bestellwert gezeigt (z. B. 80 € → 2,90 € statt 0 €)", be: 1 },
              { text: "Korrektur angegeben: Reihenfolge der Bedingungen tauschen oder 20 <= bestellwert AND bestellwert < 50", be: 1 }] } }
      ] },
    { id: "sortieren", title: "Sortieren und Suchen", subtitle: "Übungsklausur B", minutes: 75, units: ["L2.2", "L2.3", "L2.4", "L2.5", "L2.6", "L2.7"],
      intro: "Bubble Sort ist in dieser Klausur ohne vorzeitigen Abbruch gemeint: Bei n Elementen gibt es n − 1 Bubble-Phasen, in Phase k werden n − k Nachbarpaare verglichen.",
      tasks: [
        { id: "bubble-phasen", no: "2.1", op: "Nennen", afb: "I", be: 3, unit: "L2.2",
          prompt: "Das Array zahlen = [6, 3, 8, 2, 5] wird mit Bubble Sort aufsteigend sortiert. Nennen Sie die Reihenfolge der Arrayelemente nach der ersten, zweiten und dritten Bubble-Phase.",
          answer: { type: "rows", labels: ["nach Phase 1", "nach Phase 2", "nach Phase 3"], solution: [[3, 6, 2, 5, 8], [3, 2, 5, 6, 8], [2, 3, 5, 6, 8]] },
          explanation: "In jeder Phase wandert das größte noch unsortierte Element nach rechts: 8, dann 6, dann 5." },
        { id: "bubble-tabelle", no: "2.2", op: "Erweitern", afb: "II", be: 4, unit: "L2.2",
          prompt: "Die Namen Mia, Ben, Zoe, Ida, Tom werden in dieser Reihenfolge mit Bubble Sort alphabetisch aufsteigend sortiert. Erweitern Sie die Tabelle um genau so viele Zeilen, bis die Namen sortiert sind. Schreiben Sie nach jeder Vertauschung eine neue Zeile.",
          table: { columns: ["0", "1", "2", "3", "4"], rows: [["Mia", "Ben", "Zoe", "Ida", "Tom"]] },
          answer: { type: "rows", slots: 6, labelPrefix: "Zeile", solution: [["Ben", "Mia", "Zoe", "Ida", "Tom"], ["Ben", "Mia", "Ida", "Zoe", "Tom"], ["Ben", "Mia", "Ida", "Tom", "Zoe"], ["Ben", "Ida", "Mia", "Tom", "Zoe"]] },
          explanation: "Phase 1 tauscht Mia/Ben, Zoe/Ida und Zoe/Tom; Phase 2 tauscht Mia/Ida. Phasen 3 und 4 vergleichen nur noch, ohne zu tauschen." },
        { id: "bubble-zaehlen", no: "2.3", op: "Bestimmen", afb: "II", be: 2, unit: "L2.4",
          prompt: "Bestimmen Sie für die Sortierung aus 2.2 die Anzahl der Vergleiche und die Anzahl der Vertauschungen.",
          answer: { type: "fields", fields: [{ id: "v", label: "Vergleiche", kind: "number", solution: 10, be: 1 }, { id: "t", label: "Vertauschungen", kind: "number", solution: 4, be: 1 }] },
          explanation: "Ohne vorzeitigen Abbruch: 4 + 3 + 2 + 1 = 10 Vergleiche. Getauscht wird viermal (siehe 2.2)." },
        { id: "bubble-entwurf", no: "2.4", op: "Entwerfen", afb: "III", be: 2, unit: "L2.2",
          prompt: "Entwerfen Sie eine Belegung eines Arrays mit fünf Zahlen, die nach der ersten Bubble-Phase noch unsortiert ist und durch die zweite Bubble-Phase vollständig aufsteigend sortiert wird.",
          answer: { type: "custom", check: "bubbleTwoPhases", label: "Deine Belegung (fünf Zahlen, durch Kommas getrennt)", example: "2, 3, 1, 4, 5" },
          explanation: "Gesucht ist ein Element, das zwei Plätze nach links wandern muss – jede Phase bewegt ein kleines Element nur um einen Platz nach links. Beispiel: 2, 3, 1, 4, 5." },
        { id: "selection-erlaeutern", no: "2.5", op: "Erläutern", afb: "II", be: 4, unit: "L2.3",
          prompt: "Erläutern Sie die Funktionsweise des dargestellten Algorithmus.",
          nsd: { title: "Algorithmus", blocks: [
            s("Deklaration und Initialisierung: zahlen = [7, 4, 9, 1, 6]"), s("Deklaration und Initialisierung: laenge = Anzahl der Elemente des Arrays zahlen"),
            loop("Wiederhole von akt = 0 solange akt < laenge − 1, Schrittweite 1", [s("Deklaration und Initialisierung: min_index = akt"),
              loop("Wiederhole von j = akt + 1 solange j < laenge, Schrittweite 1", [when("zahlen[j] < zahlen[min_index]", [s("Zuweisung: min_index = j")])]),
              s("Deklaration und Initialisierung: zwischenspeicher = zahlen[akt]"), s("Zuweisung: zahlen[akt] = zahlen[min_index]"), s("Zuweisung: zahlen[min_index] = zwischenspeicher")]),
            s("Ausgabe: zahlen")] },
          answer: { type: "open", draft: "Deine Erläuterung",
            model: "Es handelt sich um Selection Sort (aufsteigend). Das Array wird in einen sortierten linken und einen unsortierten rechten Teil gedacht. In jedem Durchlauf der äußeren Schleife sucht die innere Schleife im unsortierten Teil ab Position akt den Index des kleinsten Elements (min_index). Danach wird dieses Element über den Zwischenspeicher mit dem Element an Position akt getauscht. So wächst der sortierte Teil pro Durchlauf um ein Element; nach laenge − 1 Durchläufen ist das Array sortiert.",
            criteria: [
              { text: "Ziel: aufsteigende Sortierung (Selection Sort) benannt", be: 1 },
              { text: "Innere Schleife sucht den Index des Minimums im unsortierten Teil", be: 1 },
              { text: "Tausch des Minimums an Position akt über den Zwischenspeicher", be: 1 },
              { text: "Sortierter Bereich wächst je Durchlauf um ein Element; laenge − 1 Durchläufe", be: 1 }] } },
        { id: "selection-phasen", no: "2.6", op: "Nennen", afb: "I", be: 3, unit: "L2.3",
          prompt: "Nennen Sie die Reihenfolge der Elemente nach dem ersten, zweiten und dritten Durchlauf der äußeren Schleife des Algorithmus aus 2.5.",
          answer: { type: "rows", labels: ["nach Durchlauf 1", "nach Durchlauf 2", "nach Durchlauf 3"], solution: [[1, 4, 9, 7, 6], [1, 4, 9, 7, 6], [1, 4, 6, 7, 9]] },
          explanation: "Durchlauf 1 tauscht 7 und 1. In Durchlauf 2 ist 4 bereits das Minimum – das Array bleibt gleich. Durchlauf 3 tauscht 9 und 6." },
        { id: "binaer-tabelle", no: "2.7", op: "Dokumentieren", afb: "II", be: 4, unit: "L2.6",
          prompt: "Im sortierten Array zahlen = [3, 8, 12, 17, 21, 26, 30, 34, 41] wird mit der binären Suche die Zahl 34 gesucht (links = 0, rechts = 8, mitte = (links + rechts) // 2, also abgerundet). Dokumentieren Sie links, rechts, mitte und zahlen[mitte] in jedem Durchlauf und nennen Sie das Ergebnis.",
          answer: { type: "table", columns: ["Durchlauf", "links", "rechts", "mitte", "zahlen[mitte]"], given: [0], solution: [[1, 0, 8, 4, 21], [2, 5, 8, 6, 30], [3, 7, 8, 7, 34]],
            fields: [{ id: "index", label: "Gefunden an Index", kind: "number", solution: 7, be: 1 }] },
          explanation: "34 > 21 → links = 5; 34 > 30 → links = 7; zahlen[7] = 34 → gefunden an Index 7." },
        { id: "binaer-fehlt", no: "2.8", op: "Nennen", afb: "II", be: 1, unit: "L2.6",
          prompt: "Nennen Sie die Anzahl der Durchläufe, nach denen die binäre Suche im Array aus 2.7 feststellt, dass die Zahl 5 nicht enthalten ist.",
          answer: { type: "fields", fields: [{ id: "a", label: "Durchläufe", kind: "number", solution: 3, be: 1 }] },
          explanation: "mitte 4 (21) → rechts = 3; mitte 1 (8) → rechts = 0; mitte 0 (3) → links = 1. Jetzt ist links > rechts: nach 3 Durchläufen steht fest, dass 5 fehlt." },
        { id: "binaer-begruenden", no: "2.9", op: "Begründen", afb: "II", be: 2, unit: "L2.7",
          prompt: "Begründen Sie, warum die binäre Suche nur auf ein sortiertes Array angewendet werden darf.",
          answer: { type: "open", draft: "Deine Begründung",
            model: "Die binäre Suche entscheidet nach dem Vergleich mit dem mittleren Element, in welcher Hälfte weitergesucht wird, und verwirft die andere Hälfte. Diese Entscheidung ist nur richtig, wenn links der Mitte alle Elemente kleiner und rechts alle größer sind – also wenn das Array sortiert ist. In einem unsortierten Array kann das gesuchte Element in der verworfenen Hälfte liegen und würde nicht gefunden.",
            criteria: [
              { text: "Halbierungsentscheidung beruht auf der Ordnung (links kleiner, rechts größer)", be: 1 },
              { text: "Folge erkannt: im unsortierten Array kann das Element in der verworfenen Hälfte liegen", be: 1 }] } },
        { id: "suche-vergleich", no: "2.10", op: "Bestimmen", afb: "II", be: 2, unit: "L2.7",
          prompt: "Ein sortiertes Array enthält 1000 Elemente. Bestimmen Sie die maximale Anzahl an Vergleichen der linearen Suche und die maximale Anzahl an Durchläufen der binären Suche.",
          answer: { type: "fields", fields: [{ id: "lin", label: "Lineare Suche", kind: "number", solution: 1000, be: 1 }, { id: "bin", label: "Binäre Suche", kind: "number", solution: 10, be: 1 }] },
          explanation: "Linear im schlechtesten Fall jedes Element: 1000. Binär halbiert sich der Bereich: 1000 → 500 → 250 → … → 1; 2^10 = 1024 > 1000, also höchstens 10 Durchläufe." },
        { id: "optimierung", no: "2.11", op: "Stellung nehmen", afb: "III", be: 3, unit: "L2.4",
          prompt: "Ein Mitschüler behauptet: „Bei einem bereits sortierten Array ist Bubble Sort mit vorzeitigem Abbruch nicht schneller als ohne.“ Nehmen Sie Stellung.",
          answer: { type: "open", draft: "Deine Stellungnahme",
            model: "Die Behauptung ist falsch. Ohne Abbruch durchläuft Bubble Sort immer alle n − 1 Phasen und vergleicht n·(n − 1)/2 Paare, auch wenn nichts getauscht wird (bei n = 5 also 10 Vergleiche). Mit vorzeitigem Abbruch endet der Algorithmus nach der ersten Phase ohne Vertauschung – bei einem sortierten Array also schon nach n − 1 Vergleichen (bei n = 5 nur 4).",
            criteria: [
              { text: "Ohne Abbruch: alle Phasen, n·(n − 1)/2 Vergleiche", be: 1 },
              { text: "Mit Abbruch: Ende nach der ersten Phase ohne Vertauschung, n − 1 Vergleiche", be: 1 },
              { text: "Begründetes Fazit (Behauptung falsch), am besten mit Zahlenbeispiel", be: 1 }] } }
      ] },
    { id: "datenstrukturen", title: "Dynamische Datenstrukturen", subtitle: "Übungsklausur C", minutes: 75, units: ["L3.1", "L3.2", "L3.3", "L3.4"],
      intro: "Warteschlange, Stapelspeicher, verkettete Liste und Binärbaum – so, wie sie in den Abiturprüfungen modelliert werden.",
      tasks: [
        { id: "queue-person", no: "3.1.1", op: "Nennen", afb: "I", be: 1, unit: "L3.3",
          prompt: "Im Bürgerbüro werden Termin-Kunden in der Warteschlange TK und Laufkundschaft in der Warteschlange LK erfasst. Termin-Kunden haben Vorrang: Laufkundschaft wird nur bedient, wenn TK leer ist. Um 9:00 Uhr sind beide Warteschlangen leer. Nennen Sie die Person, die um 9:14 Uhr bedient wurde.",
          events: [["9:01", "LK.enqueue(\"Arslan\")"], ["9:02", "LK.enqueue(\"Becker\")"], ["9:03", "TK.enqueue(\"Chen\")"], ["9:05", "TK.dequeue()"], ["9:06", "LK.enqueue(\"Dorn\")"], ["9:08", "LK.dequeue()"], ["9:09", "TK.enqueue(\"Ernst\")"], ["9:10", "TK.enqueue(\"Fuchs\")"], ["9:12", "LK.dequeue()"], ["9:14", "TK.dequeue()"], ["9:16", "TK.dequeue()"], ["9:18", "LK.enqueue(\"Gül\")"], ["9:20", "LK.dequeue()"]],
          answer: { type: "fields", fields: [{ id: "a", label: "Person", kind: "text", solution: "Ernst", be: 1 }] },
          explanation: "Um 9:14 Uhr steht Ernst vorne in TK (eingereiht um 9:09 Uhr vor Fuchs)." },
        { id: "queue-warten", no: "3.1.2", op: "Nennen", afb: "II", be: 2, unit: "L3.3",
          prompt: "Nennen Sie die Personen der Laufkundschaft, die um 9:19 Uhr noch warten – in der Reihenfolge von vorne nach hinten.",
          answer: { type: "fields", fields: [{ id: "a", label: "Wartende (durch Kommas getrennt)", kind: "seq", solution: ["Dorn", "Gül"], be: 2 }] },
          explanation: "LK: Arslan (9:08 bedient), Becker (9:12 bedient), Dorn, danach Gül – es warten Dorn und Gül." },
        { id: "queue-pruefen", no: "3.1.3", op: "Überprüfen", afb: "III", be: 2, unit: "L3.3",
          prompt: "Überprüfen Sie, ob die Vorrangregel eingehalten wurde.",
          answer: { type: "choice", options: ["Die Regel wurde immer eingehalten.", "Verstoß um 9:08 Uhr", "Verstoß um 9:12 Uhr", "Verstoß um 9:20 Uhr"], correct: 2 },
          explanation: "Um 9:12 Uhr wurde Becker (LK) bedient, obwohl Ernst und Fuchs in TK warteten. Um 9:08 und 9:20 Uhr war TK leer." },
        { id: "queue-prinzip", no: "3.1.4", op: "Beschreiben", afb: "I", be: 3, unit: "L3.3",
          prompt: "Beschreiben Sie, wie Daten grundsätzlich in eine Warteschlange eingefügt und aus ihr entfernt werden.",
          answer: { type: "open", draft: "Deine Beschreibung",
            model: "Eine Warteschlange arbeitet nach dem FIFO-Prinzip (first in, first out). Mit enqueue wird ein neues Element hinten am Ende angefügt. Mit dequeue wird stets das vorderste Element – das am längsten wartende – entnommen. Beispiel: Arslan wurde vor Becker eingereiht und deshalb auch vor Becker bedient.",
            criteria: [
              { text: "enqueue fügt am Ende (hinten) an", be: 1 },
              { text: "dequeue entfernt das vorderste Element – FIFO", be: 1 },
              { text: "Beispiel aus der Ereignisliste", be: 1 }] } },
        { id: "stapel-entnahme", no: "3.2.1", op: "Nennen", afb: "I", be: 2, unit: "L3.2",
          prompt: "Auf einen leeren Stapel werden nacheinander die Befehle push(\"Rot\"), push(\"Blau\"), push(\"Grün\"), pop(), push(\"Gelb\"), push(\"Weiß\"), pop(), pop() ausgeführt. Nennen Sie die entnommenen Elemente in der Reihenfolge der Entnahme.",
          answer: { type: "fields", fields: [{ id: "a", label: "Entnommen (durch Kommas getrennt)", kind: "seq", solution: ["Grün", "Weiß", "Gelb"], be: 2 }] },
          explanation: "pop() entnimmt immer das oberste Element (LIFO): erst Grün, später Weiß und dann Gelb." },
        { id: "stapel-inhalt", no: "3.2.2", op: "Nennen", afb: "I", be: 1, unit: "L3.2",
          prompt: "Nennen Sie den Inhalt des Stapels nach allen Befehlen aus 3.2.1 – von oben nach unten.",
          answer: { type: "fields", fields: [{ id: "a", label: "Inhalt von oben nach unten", kind: "seq", solution: ["Blau", "Rot"], be: 1 }] },
          explanation: "Übrig bleiben Rot (unten) und Blau (oben)." },
        { id: "stapel-befehle", no: "3.2.3", op: "Darstellen", afb: "II", be: 2, unit: "L3.2",
          prompt: "Stellen Sie eine Befehlsfolge für einen leeren Stapel dar, sodass drei anschließende pop()-Befehle die Getränke in der Reihenfolge Saft, Wasser, Cola liefern.",
          answer: { type: "custom", check: "stackPops", target: ["Saft", "Wasser", "Cola"], label: "Deine Befehle (je Zeile ein Befehl, z. B. push(\"Cola\"))", example: "push(\"Cola\")\npush(\"Wasser\")\npush(\"Saft\")" },
          explanation: "Was zuerst entnommen werden soll, muss zuletzt hineingelegt werden: push(\"Cola\"), push(\"Wasser\"), push(\"Saft\")." },
        { id: "liste-zeiger", no: "3.3.1", op: "Darstellen", afb: "II", be: 4, unit: "L3.1",
          prompt: "Die Teile eines Songs sind als Knoten einer verketteten Liste gespeichert. Der Anfangszeiger zeigt auf A1. Stellen Sie die Reihenfolge Intro → Strophe → Refrain → Outro dar, indem Sie für jeden Knoten den Nachfolger (Adresse oder „null“) angeben.",
          answer: { type: "table", columns: ["Adresse", "Inhalt", "Nachfolger"], given: [0, 1], solution: [["A1", "Intro", "A4"], ["A2", "Outro", "null"], ["A3", "Refrain", "A2"], ["A4", "Strophe", "A3"]] },
          explanation: "Intro (A1) → Strophe (A4) → Refrain (A3) → Outro (A2) → null." },
        { id: "liste-einfuegen", no: "3.3.2", op: "Beschreiben", afb: "II", be: 3, unit: "L3.1",
          prompt: "Zwischen Refrain und Outro soll ein neuer Knoten „Bridge“ an Adresse A5 eingefügt werden. Beschreiben Sie die notwendigen Schritte, indem Sie sie in die richtige Reihenfolge bringen.",
          answer: { type: "order", steps: [
            { id: "neu", text: "Neuen Knoten „Bridge“ an Adresse A5 anlegen." },
            { id: "nachfolger", text: "Nachfolger von A5 auf den bisherigen Nachfolger des Refrains setzen (A2)." },
            { id: "umhaengen", text: "Nachfolger des Refrains (A3) auf A5 setzen." }], correct: ["neu", "nachfolger", "umhaengen"], start: ["umhaengen", "neu", "nachfolger"] },
          explanation: "Erst den neuen Knoten auf A2 zeigen lassen, dann den Refrain umhängen – sonst geht der Verweis auf Outro verloren." },
        { id: "baum-definieren", no: "3.4.1", op: "Definieren", afb: "II", be: 2, unit: "L3.4",
          prompt: "Definieren Sie den Begriff Binärbaum.",
          answer: { type: "open", draft: "Deine Definition",
            model: "Ein Binärbaum ist ein Baum – also eine Struktur aus Knoten und Kanten mit genau einer Wurzel, in der jeder andere Knoten genau einen Vorgänger hat und zwischen zwei Knoten genau ein Weg existiert –, bei dem jeder Knoten höchstens zwei Kinder hat (linkes und rechtes Kind).",
            criteria: [
              { text: "Baum: eine Wurzel, jeder andere Knoten hat genau einen Vorgänger (kreisfrei)", be: 1 },
              { text: "Jeder Knoten hat höchstens zwei Kinder (links/rechts)", be: 1 }] } },
        { id: "baum-eigenschaften", no: "3.4.2", op: "Überprüfen", afb: "II", be: 3, unit: "L3.4",
          prompt: "Überprüfen Sie, ob der dargestellte Binärbaum voll, vollständig und sortiert ist.",
          tree: { inhalt: 40, links: { inhalt: 25, links: { inhalt: 10 }, rechts: { inhalt: 30, links: { inhalt: 28 }, rechts: { inhalt: 35 } } }, rechts: { inhalt: 60 } },
          answer: { type: "fields", fields: [
            { id: "voll", label: "voll", kind: "choice", options: ["ja", "nein"], solution: "ja", be: 1 },
            { id: "vollstaendig", label: "vollständig", kind: "choice", options: ["ja", "nein"], solution: "nein", be: 1 },
            { id: "sortiert", label: "sortiert", kind: "choice", options: ["ja", "nein"], solution: "ja", be: 1 }] },
          explanation: "Voll: jeder Knoten hat 0 oder 2 Kinder. Nicht vollständig: Die Blätter 60 (Höhe 1), 10 (Höhe 2) sowie 28 und 35 (Höhe 3) liegen nicht auf einer Höhe. Sortiert: links stets kleiner, rechts stets größer." },
        { id: "baum-entwurf", no: "3.4.3", op: "Entwerfen", afb: "II", be: 3, unit: "L3.4",
          prompt: "Entwerfen Sie aus den Knoten 5, 12, 18, 23, 31, 40 und 47 einen Binärbaum, der sortiert, voll und vollständig ist. Geben Sie die Knoten ebenenweise von links nach rechts an.",
          answer: { type: "fields", fields: [
            { id: "e0", label: "Wurzel", kind: "seq", solution: [23], be: 1 },
            { id: "e1", label: "Ebene 1", kind: "seq", solution: [12, 40], be: 1 },
            { id: "e2", label: "Ebene 2", kind: "seq", solution: [5, 18, 31, 47], be: 1 }] },
          explanation: "Bei sieben Knoten hat ein vollständiger Baum drei Ebenen. Die Wurzel ist der Median 23; links bilden 5, 12, 18 einen Teilbaum mit Wurzel 12, rechts 31, 40, 47 mit Wurzel 40." },
        { id: "baum-kante", no: "3.4.4", op: "Begründen", afb: "III", be: 2, unit: "L3.4",
          prompt: "Im Baum aus 3.4.2 wird zusätzlich eine Kante zwischen den Knoten 10 und 30 gezogen. Begründen Sie, ob es sich weiterhin um einen Baum handelt.",
          answer: { type: "open", draft: "Deine Begründung",
            model: "Nein. In einem Baum gibt es zwischen zwei Knoten genau einen Weg. Nach der neuen Kante führt von 10 zu 30 sowohl der direkte Weg als auch der Weg über 25 – es entsteht der Kreis 10–25–30–10.",
            criteria: [
              { text: "Eigenschaft genannt: zwischen zwei Knoten genau ein Weg (kreisfrei)", be: 1 },
              { text: "Konkreter zweiter Weg bzw. Kreis 10–25–30 benannt → kein Baum", be: 1 }] } }
      ] }
  ];

  // ——— Auswertung ———
  const clean = value => String(value ?? "").normalize("NFKC").replace(/[„“”"'’‚]/g, "").replace(/\s+/g, " ").trim().replace(/\.$/, "").toLocaleLowerCase("de-DE");
  const toNumber = value => {
    const match = String(value ?? "").replace(/\s/g, "").match(/-?\d+(?:[.,]\d+)?/);
    return match ? Number(match[0].replace(",", ".")) : Number.NaN;
  };
  const nullWords = ["null", "none", "kein", "keiner", "ende", "-", "—", "–", "ø", "∅"];
  const sameValue = (input, solution, tolerance = 0.001) => {
    if (typeof solution === "number") return Math.abs(toNumber(input) - solution) <= tolerance;
    if (solution === "null") return nullWords.includes(clean(input));
    return clean(input) === clean(solution);
  };
  function parseSeq(value) {
    const text = String(value ?? "").replace(/[[\]{}()→]/g, " ").trim();
    if (!text) return [];
    const parts = /[,;\n]/.test(text) ? text.split(/[,;\n]+/) : text.split(/\s+/);
    return parts.map(part => part.trim()).filter(Boolean);
  }
  const sameSeq = (input, solution) => {
    const parts = Array.isArray(input) ? input : parseSeq(input);
    return parts.length === solution.length && solution.every((item, index) => sameValue(parts[index], item));
  };
  function bubblePhase(values) {
    const result = [...values];
    let swaps = 0;
    return { run(phase) {
      for (let j = 0; j < result.length - 1 - phase; j++) if (result[j] > result[j + 1]) { [result[j], result[j + 1]] = [result[j + 1], result[j]]; swaps++; }
      return [...result];
    }, get swaps() { return swaps; } };
  }
  const isSorted = values => values.every((value, index) => index === 0 || values[index - 1] <= value);
  const customChecks = {
    bubbleTwoPhases(task, input) {
      const values = parseSeq(input).map(toNumber);
      if (values.length !== 5 || values.some(value => !Number.isFinite(value))) return { ok: false, message: "Gib genau fünf Zahlen an, durch Kommas getrennt." };
      const sorter = bubblePhase(values), first = sorter.run(0), second = sorter.run(1);
      if (isSorted(first)) return { ok: false, message: `Nach Phase 1 ist das Array schon sortiert: ${first.join(", ")}.` };
      if (!isSorted(second)) return { ok: false, message: `Nach Phase 2 ist das Array noch unsortiert: ${second.join(", ")}.` };
      return { ok: true, message: `Passt: nach Phase 1 ${first.join(", ")}, nach Phase 2 ${second.join(", ")}.` };
    },
    stackPops(task, input) {
      const stack = [], lines = String(input ?? "").split(/[\n;]+/).map(line => line.trim()).filter(Boolean);
      for (const line of lines) {
        const push = line.match(/^(?:\w+\.)?push\s*\(\s*["„“']?([^"„“')]+?)["„“']?\s*\)$/i);
        if (push) { stack.push(push[1].trim()); continue; }
        if (/^(?:\w+\.)?pop\s*\(\s*\)$/i.test(line)) { if (!stack.length) return { ok: false, message: "pop() auf einen leeren Stapel ist nicht möglich." }; stack.pop(); continue; }
        return { ok: false, message: `Diesen Befehl kenne ich nicht: „${line}“. Verwende push("…") und pop().` };
      }
      const popped = [];
      for (let i = 0; i < task.answer.target.length; i++) popped.push(stack.pop());
      return task.answer.target.every((item, index) => sameValue(popped[index], item))
        ? { ok: true, message: `Die drei pop()-Befehle liefern ${popped.join(", ")}.` }
        : { ok: false, message: `Die drei pop()-Befehle liefern ${popped.map(item => item ?? "nichts").join(", ")}.` };
    }
  };

  // answer: Eingaben der Lernenden; Rückgabe: Punkte und Rückmeldung je Teil. Offene Aufgaben werden selbst eingeschätzt.
  function checkTask(task, answer = {}) {
    const spec = task.answer;
    if (spec.type === "fields") {
      const parts = spec.fields.map(field => {
        const value = answer?.[field.id];
        const ok = field.kind === "seq" ? sameSeq(value, field.solution) : sameValue(value, field.solution);
        return { id: field.id, ok, be: field.be };
      });
      return { points: parts.reduce((sum, part) => sum + (part.ok ? part.be : 0), 0), max: task.be, parts };
    }
    if (spec.type === "table") {
      const fieldBe = (spec.fields || []).reduce((sum, field) => sum + field.be, 0), tableBe = task.be - fieldBe;
      const rows = spec.solution.map((row, r) => row.every((cell, c) => spec.given?.includes(c) || sameValue(answer?.cells?.[r]?.[c], cell)));
      const cells = spec.solution.map((row, r) => row.map((cell, c) => spec.given?.includes(c) ? null : sameValue(answer?.cells?.[r]?.[c], cell)));
      const fieldParts = (spec.fields || []).map(field => ({ id: field.id, ok: sameValue(answer?.[field.id], field.solution), be: field.be }));
      const points = Math.floor(tableBe * rows.filter(Boolean).length / rows.length) + fieldParts.reduce((sum, part) => sum + (part.ok ? part.be : 0), 0);
      return { points, max: task.be, rows, cells, parts: fieldParts };
    }
    if (spec.type === "rows") {
      const given = Array.isArray(answer?.rows) ? answer.rows : [];
      const rows = spec.solution.map((row, index) => sameSeq(given[index], row));
      const extra = given.slice(spec.solution.length).some(row => parseSeq(row).length);
      const points = extra ? Math.max(0, Math.floor(task.be * rows.filter(Boolean).length / rows.length) - 1) : Math.floor(task.be * rows.filter(Boolean).length / rows.length);
      return { points, max: task.be, rows, extra };
    }
    if (spec.type === "choice") {
      const ok = answer?.choice === spec.correct;
      return { points: ok ? task.be : 0, max: task.be, ok };
    }
    if (spec.type === "order") {
      const order = Array.isArray(answer?.order) ? answer.order : spec.start;
      const ok = order.length === spec.correct.length && order.every((id, index) => id === spec.correct[index]);
      return { points: ok ? task.be : 0, max: task.be, ok };
    }
    if (spec.type === "custom") {
      const verdict = customChecks[spec.check](task, answer?.value);
      return { points: verdict.ok ? task.be : 0, max: task.be, ok: verdict.ok, message: verdict.message };
    }
    if (spec.type === "open") {
      const checked = Array.isArray(answer?.criteria) ? answer.criteria : [];
      const points = spec.criteria.reduce((sum, criterion, index) => sum + (checked.includes(index) ? criterion.be : 0), 0);
      return { points: answer?.revealed ? points : 0, max: task.be, selfAssessed: true };
    }
    throw new Error(`Unbekannter Aufgabentyp: ${spec.type}`);
  }

  // Orientierung am linearen Abiturschlüssel (Prozent → Notenpunkte). Maßgeblich bleibt die Lehrkraft.
  const scale = [[95, 15], [90, 14], [85, 13], [80, 12], [75, 11], [70, 10], [65, 9], [60, 8], [55, 7], [50, 6], [45, 5], [40, 4], [33, 3], [27, 2], [20, 1], [0, 0]];
  const notenpunkte = percent => scale.find(([limit]) => percent >= limit)[1];
  const examMax = exam => exam.tasks.reduce((sum, task) => sum + task.be, 0);
  const afbShare = exam => ["I", "II", "III"].map(level => ({ level, be: exam.tasks.filter(task => task.afb === level).reduce((sum, task) => sum + task.be, 0) }));
  const taskKeys = () => exams.flatMap(exam => exam.tasks.map(task => ({ key: `${exam.id}.${task.id}`, max: task.be }))).concat(operatorQuiz.map(item => ({ key: `operatoren.${item.id}`, max: 1 })));

  const data = { format, strategy, operators, operatorQuiz, nsdReference, nsdNotes, taskTypes, exams, checkTask, parseSeq, sameSeq, notenpunkte, examMax, afbShare, taskKeys, customChecks, bubblePhase };
  if (typeof module !== "undefined" && module.exports) module.exports = data;
  else if (root.ALGOLAB_CONTENT) root.ALGOLAB_CONTENT.exam = data;
})(typeof window !== "undefined" ? window : globalThis);
