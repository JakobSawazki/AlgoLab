# Gemeinsamer Arbeitsstand – Jakob, Codex und Claude

## Ladezeit am 3. November 2026

**PERF-01 – IN_PROGRESS – Codex:** Auf Jakobs Auftrag Ladezeit der Live-Seite
messen, Ursache zwischen Hosting und Startdateien eingrenzen und belegte
Optimierungen umsetzen. Bereich: Startressourcen/HTML und bei Bedarf Asset-
Auslieferung, gezielte Browsermessung und Dokumentation. EP-Änderungen der
lokalen 1.9.0 und fremde Struktogramm-Arbeit erhalten. Live ist zunächst 1.8.0;
lokale Optimierung und Veröffentlichung werden getrennt dokumentiert.

## EP in AlgoLab am 3. November 2026

**EP-ALG-01 – DONE – Codex.** Auf Jakobs ausdrücklichen Auftrag:
NAGOLD in AlgoLab wie im aktuellen Excel-Lab als **EP (Erfahrungspunkte)**
anzeigen. Excel-Lab behält das interne Feld `nagoldEntries` ohne Umrechnung;
dieser Ansatz ist in lokaler 1.9.0 für bestehende AlgoLab-Dateien übernommen.
EP ohne Notenwirkung und getrennt von Freischaltpunkten. Profil/Tabelle,
Meldungen, Klassenübersicht/CSV und Dokumentation umgestellt. 117 Tests des
getrackten Bestands samt neuer EP-Tests grün; vollständiger lokaler Glob:
120/123 grün, drei Fehler in vorhandener ungetrackter Struktogramm-Erprobung.
Echter JSON-Dateirundlauf, lokale Altprofil-Kompatibilität, EP-Eintrag und
Klassen-CSV im Browser geprüft, Desktop/Mobil visuell abgenommen. Keine
Bearbeitung fremder Struktogrammdateien oder Änderungen an Excel-Lab/StartLab.
Keine Dateireservierung nach Abschluss. Commit/Push/Onlineabnahme offen.
Der frühere Status „EP-Migration in AlgoLab offen“ weiter unten ist für diese
explizit gewünschte kompatible Bezeichnungsumstellung überholt. Andere
Vergaberegeln und projektübergreifende Konten bleiben eigene Themen.

## Aktive Arbeit am 3. November 2026

**START-BEW-02 – DONE – Codex:** Autarke Fortsetzung auf Jakobs Auftrag
im primären StartLab-Projekt: lokale Version 0.3.0 mit konsistenten Website-
Inhalten auf Grundlage der Klassenfassung 2.2 und EP ohne Notenwirkung.
77 Tests, Syntax-/Buildprüfung, bestehender Browserlauf und gezielter Test
Desktop/375/320 px, Suche sowie zwei A4-Druckseiten bestanden. Keine
Bearbeitung der fremden Struktogramm-Arbeiten in AlgoLab, keine Änderung von
NEO, Klassen-DOCX, Backend oder Registrierung. Führender Status: StartLab
`Docs/tasks.md`. Kein Commit/Push/Deployment. Keine Dateireservierung nach
Abschluss. EP-Migrationen und Vergaberegeln bleiben offen. Ältere Aussagen,
START-BEW-02 sei noch offen oder aktive StartLab-Inhalte noch unverändert,
sind historisch; die Live-Seite wurde in dieser Runde nicht geändert.

## Projektübergreifende Übernahme am 22. Oktober 2026

**START-BEW-01 – DONE – Codex:** StartLab-Übergabe aus „Leistungsbewertung“
gegen tatsächliche Version 2.1 und Claude-Feedback geprüft; Aufgaben priorisiert.
Primäres Projekt: `G:\Meine Ablage\Codex\StartLab`. In AlgoLab wird nur dieser
Koordinationsabschnitt bearbeitet; `nsd-library.js`, `nsd-run.js`,
`tests/nsd-run.test.cjs` und `tools/` bleiben vorhandene fremde Arbeit.
EP sollen künftig ausschließlich motivieren, ohne Notenumrechnung, Notenbonus oder
Notenabzug. Die technische Migration ist offen; Lernpunkte zur Freischaltung und
vorhandene Profile bleiben getrennt und erhalten. NEO bleibt das führende
Notenbuch als gewöhnliche Exceldatei, später in EduCloud.

Jakobs Präzisierung vom 22.10.: Die motivierende Sammelpunkteidee soll
ausdrücklich erhalten bleiben, auch in anderen Klassen und insbesondere in
Excel-Lab, künftig unter dem Namen Engagement-Punkte (EP). Ihre Beibehaltung
ist entschieden; offen sind konkrete Regeln und technische Migration.
Vorhandene Profile und Sicherungsdateien erhalten. Die Ablösung der
NAGOLD-Notenwirkung bedeutet keine Abschaffung der Motivation durch Punkte.

Die ältere Übergabe 0.7.0 und die frühen Freigabeangaben unten sind historisch;
die jüngeren Claude-Einträge bis 1.8.0 und der tatsächliche Dateistand gehen vor.

Aktueller Abgleich: `G:\Meine Ablage\Codex\StartLab\private\2026-10-22 Abgleich Version 2.1 und nächster Arbeitsstand.md`.
Führende Aufgabenliste für diese Fortsetzung: StartLab `Docs/tasks.md`.
Als Nächstes START-BEW-02: aktive StartLab-Notenbehauptungen konsistent ablösen.
Parallel bei Jakob: Übergang/Zusagen und IV-Zuordnung klären. Die
Klassenarbeitsplanung ist inzwischen in Version 2.2 festgelegt (siehe Nachtrag).
Danach EP-PLAN-01 (Regeln/Altkonten) und erst dann EP-MIG-01 mit einem
Lab und fiktiven Dateien. Die EP-Migration in AlgoLab ist **OPEN**, keine
Umbenennung oder technische Umstellung in diesem Übernahmeschritt erfolgt.
NEO/DOCX unverändert; keine neuen Anwendungstests oder Onlineabnahme behauptet.
Nach Abschluss dieser Dokumentationsrunde keine Dateireservierung.
Nachtrag zur Claude-Registrierungshistorie berücksichtigt: REG-STATE-01 bleibt
ein separater offener StartLab-Arbeitsstrang. Historische 503-Meldungen sind
keine aktuelle Messung oder Freischaltungsfreigabe und blockieren das EP-Konzept nicht.

**BS-Schlüssel, Aktualisierung 22.10.:** Jakob hat den Fehler bei 17 % bestätigt
und die Korrektur freigegeben. Im Quellprojekt wurde ausschließlich
`StartLab/resources/2. Leistungsbewertung/BS.xlsx`, `KBS_IHK!E19`, auf **5,1**
korrigiert. Wert und SHA-256 hier erneut lesend bestätigt:
`438c8e7bdf40e9666508c3016868f3aa67f83caece3daf3242526bd4188a263c`.
Die Klärfrage zum Quellwert ist damit **DONE**. Die Prüfung aller 101 Stufen
sowie unveränderter übriger XLSX-Teile stammt aus dem korrigierenden Arbeitsstrang.
Offen bei weiterer Verwendung der alten Leistungsbuch-Erprobung:
`StartLab/tools/leistungsbuch/bs-key.mjs` enthält weiterhin 5,5 bei 17 %;
Schlüsselhash, Altdatenimport und alter Klärfall-Hilfetext müssen dann gemeinsam
geprüft werden. Keine blinde Migration und kein neues führendes Notenregister.
NEO, Klassen-DOCX und Anwendungscode wurden durch diesen Nachtrag nicht geändert.

**Führende Klassenfassung, Aktualisierung 22.10.: Version 2.2.**
DOCX-Text, echte Übergangsfußnote, Versionsfeld und SHA-256 hier erneut lesend
bestätigt: `686c050b68935b361d0f4230b7d644b59dcf16ded0b525ce0fa8d898ca63c56d`.
Jakobs Planung: eine Klassenarbeit je Schulhalbjahr, bei fachlichem Bedarf
höchstens zwei je Schulhalbjahr. Eine zweite Arbeit prüft weitere behandelte
Kompetenzen und wird rechtzeitig mit Inhalt und Termin angekündigt. Arbeiten
gehen grundsätzlich gleich gewichtet in die schriftliche Note ein.
Schulische Vorgaben bleiben maßgeblich; keine erfolgte schulische Abstimmung
behaupten. IV-Zeugniseinordnung weiterhin offen. 50/50 und Matrix unverändert.
Übergangsfußnote auf Jakobs Wunsch abstrakt ohne NAGOLD-Bezeichnung; konkrete
individuelle Zusagen gesondert klären, keine rückwirkenden neuen Anforderungen.
EP bleiben Motivationspunkte ohne Notenumrechnung, Notenbonus oder Notenabzug.
Die zwei Word-Renderseiten sind im aktualisierenden Arbeitsstrang geprüft;
hier keine erneute Layoutabnahme. Der frühere Abgleich 2.1 bleibt historisch,
aktuelle Nachträge in StartLab gehen vor. Keine DOCX-/NEO- oder Codeänderung
durch diese Koordinationsaktualisierung.

Stand: 20. Oktober 2026. Bearbeiter dieses Updates: Claude.

| ID | Status | Bearbeiter | Aufgabe / Ergebnis |
| --- | --- | --- | --- |
| SETUP-01 | DONE | Codex | Lenovo: Projekt und Dokumentation gesichtet, main auf 76c8b98 mit GitHub verglichen, 30 Tests bestanden. Anleitung in docs/lenovo-setup.md. |
| TEAM-01 | DONE | Codex | Gemeinsame TASKS.md, AGENTS.md und CLAUDE.md angelegt. |
| HANDOFF-01 | DONE | Codex | 19.10.2026: Übergabe in docs/claude-handoff.md erstellt und in CLAUDE.md verlinkt. Enthält Git-/Dateistand, Profilfunktionen, Prüfungen und nächste Aufgaben. Keine Claude-Sitzung gestartet. |
| PROFILE-01 | DONE | Codex | 0.7.0: Profil mit Kürzel/Klasse, NAGOLD-Tabelle nach Excel-Lab, vollständiges JSON sichern/laden, Altdatei-Migration. 35 Tests und Syntaxprüfung bestanden; echter Browser-Download und Laden in frischem Kontext sowie mobile Darstellung geprüft. |
| GIT-01 | DONE | Claude | 19.10.2026: Von Google Drive erzeugte `desktop.ini` in `.git/` (155 Stück, nur Ordnersymbol-Metadaten) brachen `git fetch` (`bad object refs/desktop.ini`). Nur innerhalb `.git/` entfernt; Fetch funktioniert, main = origin/main = 76c8b98. Kann nach Drive-Synchronisation wiederkehren: dann erneut `find .git -name desktop.ini -delete`. |
| RELEASE-01 | DONE | Claude | 19.10.2026: 0.7.0 geprüft (35/35 Tests, Syntax, Diff), Commit 349053b gepusht, Actions Build/Deploy erfolgreich. Online abgenommen: Version 0.7.0, neue Skripte Status 200, Profil und NAGOLD-Tabelle ohne Konsolenfehler. |
| RESULTS-01 | DONE | Claude | 19.10.2026: 0.7.1 mit zwei Klassen-Dokumenten (J2 INF1/INF2, OneDrive) als 22a1416 gepusht; Auswahl über Profilklasse. 39/39 Tests, Browser Desktop/Mobil. Onlineabnahme mit 0.8.0 (Actions-Lauf für 22a1416 hing in der GitHub-Warteschlange). Offen bei Jakob: Bearbeitungsrecht der Links, Abschnittsnamen. |
| CONTENT-05 | DONE | Claude | 19.10.2026: L1.5 Elemente vertauschen (L1_3.4): Hilfsvariable, fehlerhaftes Überschreiben, Positionen→Index, Transfer Umdrehen; zwei Python-Aufgaben. Neues Schrittmodell `array-ops-model.js` (Tauschen, Einfügen, Entfernen, Umdrehen, Bubble/Selection Sort, lineare/binäre Suche) mit generischem Renderer `stepLab`. Kein Fotomotiv (kein Bildgenerator verfügbar). |
| CONTENT-06 | DONE | Claude | 19.10.2026: L1.6 Einfügen (L1_3.5, append + Tauschschleife) und L1.7 Entfernen mit Schreibtischtests (L1_3.6, L1_4.1). Python-Prüfungen schließen insert/del/remove/pop(index)/Slicing aus. 48/48 Tests, Pyodide-Prüfung im Browser. |
| DESIGN-01 | DONE | Claude | 19.10.2026: 0.9.1 – Lektionskopf mit Kennzahlen und Banner, nummerierte Arbeitsschritte mit Kapitelleiste, Code-Editor-Komfort. Hell/dunkel, Desktop/375 px geprüft. |
| CONTENT-L2 | DONE | Claude | 19.10.2026: 0.9.0 – alle acht L2-Einheiten (L2_1 bis L2_4.x): Algorithmus-Eigenschaften + Kfz-Steuer, Bubble Sort (inkl. Optimierung), Selection Sort (auf-/absteigend), Fehleranalyse, lineare Suche + Verschlüsselung, binäre Suche (Zugriffszählung prüft echtes Halbieren), Vergleich der Suchen + Modulo-Filter, Anwenden nach Namen + Häufigkeiten. Schrittmodelle an Bezeichner des Materials angepasst. 57/57 Tests, Pyodide geprüft. |
| CONTENT-L3 | DONE | Claude | 19.10.2026: 1.0.0 – L3.1 verkettete Liste, L3.2 Stapel, L3.3 Warteschlange, L3.4 Baum (Material L3_1 bis L3_4.2). Modelle in `ds-model.js`, Baum-Prüfstand. Python modelliert Zeiger/Bäume als Tabellen (Bildungsplan: Beschreiben und Modellieren). 64/64 Tests, Pyodide geprüft. |
| REVIEW-01 | DONE | Claude | 19.10.2026: Bildungsplan (LPH 2/2020, S. 17/18) per eigenem PDF-Textauszug gelesen und Punkt für Punkt abgeglichen: BPE 7.1–7.3 vollständig abgedeckt, siehe docs/bildungsplan-abgleich.md. Materialmatrix für alle 19 Einheiten. |
| RESULTS-02 | DONE | Claude | 19.10.2026: Beide OneDrive-Dokumente gegliedert: Überschrift 1 je Lernfortschritt, Überschrift 2 je Materialaufgabe (40 Aufgaben, Seitenumbrüche wie im Original; Jakobs Überschriften „Aufgabe 1/2“ erhalten). Kopfzeile INF2 korrigiert (stand auf INF1). Website-Hinweis jetzt eindeutig „Lernfortschritt n → Aufgabe x“. In Word geöffnet und geprüft; Originale in .tmp/docx-backup-2026-10-19. |
| DESIGN-02 | DONE | Claude | 19.10.2026: 1.0.1 – Themenbanner statt fehlender Fotos (Balken für Sortieren, markiertes Feld für Suchen, Knotenkette, Stapel, Warteschlange, Baum, Ablauf für L2.1). |
| CLASS-01 | OPEN | Jakob | Erprobung im Unterricht (J2 INF1/INF2): Zeitbedarf je Einheit gegenüber 30 h Richtwert, Schwierigkeit der Codeaufgaben, Freigabe „Bearbeiten“ der OneDrive-Links prüfen. Optional: Fotomotive für L1.5–L3.4. |
| NSD-01 | DONE | Claude | 19.10.2026: 1.1.0 – Struktogramme nach Operatorenliste BW v2.2 für alle 13 Arraymodelle (Umschalter Python/Struktogramm, aktueller Block markiert, Auswahl gemerkt) und als Beispiele in L1.3, L1.4, L2.1. Tests sichern Notation und Abdeckung aller Modellschritte. |
| SELF-01 | DONE | Claude | 19.10.2026: 1.1.0 – Ich-kann-Listen L1–L3 (45 Aussagen aus dem Material) als Seite „Ich-kann-Listen“ und als Ich-kann-Check je Einheit; ☐/✓/✓✓, im Lernstand und in der JSON-Sicherung, ohne Einfluss auf Punkte. |
| EXTRA-01 | DONE | Claude | 19.10.2026: 1.1.0 – sieben freiwillige, geprüfte Aufgaben ohne Punkte: Kapitalrechner (L1_4.3), Wetterstation (L1_4.2), Gewinnziehung ohne Doppelte (L1_5), Wortverschlüsselung (L2_4.4), Mitglieder je Jahrgang (L2_4.3), Klammerprüfung mit Stapel und Baumhöhe mit Warteschlange (Transfer). |
| GLOSSAR-01 | DONE | Claude | 19.10.2026: 1.2.0 – Glossar mit 56 Fachbegriffen in 7 Themen (#glossar), Suche inkl. Synonymen, Themenfilter, Verknüpfung zu den Einheiten; Seitenleiste mit Buch-Symbol. Tests: eindeutig, erklärt, BPE-7.3-Begriffe vorhanden. |
| PRACTICE-01 | DONE | Claude | 19.10.2026: 1.3.0 – Bereich „Programmieren“ (#programmieren) nach Vorbild PythonLab: 17 Aufgaben aus dem BPE-7-Material mit input() (Arrays, Algorithmen, Sortieren, Suchen, Datenstrukturen; Grundlagen/Vertiefung/Anwendung), Editor main.py, Reiter Ausgabe/Eingabe, Code starten/prüfen, je Aufgabe 2–5 Testfälle, tolerante Ausgabeprüfung und Syntaxbaum-Regeln, lokaler Lerncoach, freie Python-Werkstatt mit 6 Vorlagen; Fortschritt und Entwürfe im JSON, unabhängig von der Freischaltung. Worker: input() aus Eingabezeilen, assert-Testcode, versionierte Adressen. 85/85 Tests, Browser Desktop/375 px. |
| AI-01 | DONE | Claude | 19.10.2026: 1.4.0 – KI-Lerncoach nach PythonLab-Konzept: Zustimmungsdialog (nur Sitzung), KI-Modus mit automatischem Denkimpuls nach Fehlversuchen, „KI jetzt um Hilfe bitten“, „Vertiefende Hilfe“, Zustimmung zurückziehen; in Programmieraufgaben, Werkstatt und Lektions-Codeaufgaben. Datensparsam (ai-coach.js, ohne Profil/Lernstand), Zwischenspeicher je Code, verständliche Fehler. config.js nutzt den PythonLab-Worker; eigener BPE-7-Worker in services/ai-coach-worker/ mit Anleitung. 92/92 Tests, Browser mit simulierter KI. |
| AI-02 | OPEN | Jakob | Gemini-Verbindung reparieren: Worker pythonlab-ai-feedback liefert für jede Anfrage 502 (Gemini-Fehler). In Cloudflare-Logs und Google AI Studio Schlüssel, Kontingent und Modell prüfen (betrifft auch PythonLab). Optional eigenen Worker aus services/ai-coach-worker/ einrichten. Vor Schülereinsatz Datenschutzfreigabe und Tarif klären. |
| NSD-02 | DONE | Claude | 20.10.2026: 1.5.0 – Struktogramm-Training (#struktogramme) nach Vorbild PythonLab-Struktogramm-Labor: 8 Lückenaufgaben (Tauschen, Maximum, Einfügen, Entfernen, Bubble Sort, Selection Sort, lineare und binäre Suche) und 1 Ordnungsaufgabe (Kfz-Steuer, Eingaben in beliebiger Reihenfolge). Rückmeldung je Baustein mit Hinweis, Entwürfe und Lösungen im Lernstand. |
| TEACH-01 | DONE | Claude | 20.10.2026: 1.5.0 – Klassenübersicht (#klassenuebersicht, Link in der Fußzeile): JSON-Sicherungen lokal zusammenführen (gleiche Validierung wie beim Laden, Punkte neu berechnet), Tabelle sortier- und filterbar, Fortschritt je Einheit, häufigste Ich-kann-Unsicherheiten, CSV-Export (Excel). Keine Übertragung, keine Speicherung. |
| AI-03 | DONE | Claude | 20.10.2026: 1.6.0 – Lokale KI im Browser als zweite Quelle (ai-local.js, WebLLM 0.2.85 über WebGPU, keine Datenübertragung, kein Schlüssel; Quelle wählbar, Laden auf Knopfdruck). 1.7.0 nach echtem Test: json_object braucht in WebLLM 0.2.85 ein Schema als String (sonst Abbruch); Qwen2.5 1.5B und Qwen3.5 2B fanden typische Fehler nicht und gaben irreführende Hinweise, daher nur noch Qwen3.5 4B (2,3 GB, etwa 4 GB Grafikspeicher). Neu: Ablaufprotokoll (Schreibtischtest per sys.settrace im Python-Worker, Text als „(Text)“ markiert) und Eingabe des fehlgeschlagenen Testfalls gehen an beide KI-Quellen; mit Protokoll erkennt Qwen3.5 4B else-Reset, IndexError und fehlendes int() (15–25 s auf NVIDIA). „Vertiefende Hilfe“ nennt zusätzlich „Wo es hakt“. Integrierte AMD-Grafik (Vega) bricht mit DEVICE_HUNG ab → verständliche Meldung, Hinweis auf Server-KI bzw. Windows-Grafikeinstellung „Hohe Leistung“. 106/106 Tests, Ende-zu-Ende mit echtem Modell in Edge. Als 0c07ced veröffentlicht und online abgenommen. |
| EXAM-01 | DONE | Claude | 20.10.2026: 1.8.0 – Bereich „Klausurvorbereitung“ (#klausur, Seitenleiste), abgeleitet aus den Abiturprüfungen 2021–2026 und der Musterprüfung (Analyse: docs/abitur-bpe7-analyse.md). Inhalt: Prüfungsrahmen; Strategie; Struktogramm-Bausteine v2.2; Operatorenliste mit AFB und Operatoren-Training (10 Fragen); drei eigene Übungsklausuren zu je 30 BE (Arrays/Struktogramme, Sortieren/Suchen, Datenstrukturen). Die Aufgaben haben Operator, AFB und BE. Eindeutige Antworten werden automatisch ausgewertet: Tabellen, Phasen, Belegung entwerfen per Simulation, Stapelbefehle. Offene Aufgaben werden selbst mit dem Erwartungshorizont abgeglichen; zu Struktogramm-Aufgaben gibt es einen Python-Test. Prüfungsmodus mit Countdown, Abgabe, Bilanz und Notenpunkten (linearer Schlüssel). Ergebnisse stehen in der Lernstand-Datei (state.exam) und in der Klassenübersicht (Spalte und CSV). Optimierung: Hinweis „So kommt das im Abitur vor“ in den Einheiten, 4 Glossarbegriffe, Struktogramm-Renderer erkennt „Deklaration und Einlesen“, lange Seitentitel brechen mobil sauber um. 114/114 Tests (Lösungen per Simulation geprüft), Browser Desktop, 375 px, hell und dunkel, echte Pyodide-Tests. Als 728db1c veröffentlicht und online abgenommen. |
| RES-01 | DONE | Claude | 20.10.2026: Material aus OneNote „Lernfelder“ nach resources/onenote-lernfelder/ übernommen (lokal, per .gitignore nicht veröffentlicht; Übersicht in dessen README.md). 9. Prüfungen › Abitur: schriftliche Abiturprüfungen Informatik 2020-2021 bis 2025-2026 mit Lösungen (Haupt- und Nachprüfungen, Musterprüfung 2024, Hinweise 2022-23), Anlage 3 Stoffgebiete Abitur 2027 und 2028, Bewertungshinweise, Operatorenliste AFB, Anlagen 2/4/11. Kapitel 7: Teil 1 und 2 entsprechen dem vorhandenen BPE-7-Paket; neu als Text die Projektarbeit Python-App (J2, Klassenarbeitsersatz), das Projekt Algorithmen und Gesellschaft und die Skizze KI-Agenten-Unternehmen. Bewusst ausgelassen: Korrekturen, Notenlisten, Prüflingslisten (personenbezogen), Passwortdatei. Befund: Im 2-stündigen Fach Informatik sind BPE 5–8 prüfungsrelevant (210 min, PC ohne KI, Operatorenliste Struktogramme ab v2.2); alle Prüfungen ab 2021-22 enthalten Aufgaben zu Arrays, Sortieren und Struktogrammen. |

## Übergabe

Konkreter Einstieg für Claude: [docs/claude-handoff.md](docs/claude-handoff.md).
Die Datei ist eine Momentaufnahme; diese Aufgabenliste bleibt der aktuelle Stand.

Jakob hat Claude am 19.10.2026 beauftragt, autark weiterzuarbeiten und geeignete Stände selbst zu veröffentlichen.
Aktueller Stand: **1.0.1** – alle 19 Einheiten ausgearbeitet, als 944f7f1 veröffentlicht und online abgenommen. Aktuell **1.8.0** (Klausurvorbereitung mit Übungsklausuren; 1.7.0 lokale Browser-KI mit Ablaufprotokoll, Qwen3.5 4B; 1.6.0 lokale KI als zweite Quelle; davor 1.5.0 mit Struktogramm-Training, Klassenübersicht, KI-Lerncoach, Programmieren, Ich-kann-Listen, Glossar). Offen bei Jakob: AI-02 (Gemini-Verbindung), CLASS-01. Offen: CLASS-01 (Erprobung, Jakob).
Derzeit keine Dateireservierung.
Prüfungen: `node --test tests/*.test.cjs` (114/114), Syntax aller JS-Dateien,
`git diff --check`; Browser-Dateirundlauf in `.tmp/check-profile.cjs` und
Screenshots `.tmp/profile-desktop.png`, `.tmp/profile-mobile.png`,
`.tmp/nagold-mobile.png`. Das Skript nutzt die gebündelte lokale
Playwright-Installation und Edge in isolierten Kontexten; `.tmp/` ist ignoriert.
Anwendung unter http://127.0.0.1:4175/ erreichbar, solange der lokale Server läuft.

Änderungsbereich dieses Schritts: app.js, progress.js, nagold.js,
nagold-table.js, index.html, design.css, learning-path.js,
tests/profile.test.cjs, .github/workflows/pages.yml und Projekt-Dokumentation.
Keine Änderungen an den Unterrichtsmaterialien oder Lektionsinhalten.

Inhaltsbasis ist 0.6.0, vier von 19 Einheiten fertig. Vor diesem Auftrag waren
README.md und docs/lenovo-setup.md bereits durch Codex geändert/neu und noch
nicht committed. Diese Änderungen gehören zur Lenovo-Übernahme.
Claude wurde nicht als laufende Sitzung kontaktiert. Der gemeinsame Stand
wird über diese Dateien im Projekt und nach Push über GitHub geteilt.
