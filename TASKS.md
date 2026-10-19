# Gemeinsamer Arbeitsstand – Jakob, Codex und Claude

Stand: 19. Oktober 2026. Bearbeiter dieses Updates: Claude.

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
| CONTENT-L2 | DONE | Claude | 19.10.2026: 0.9.0 – alle acht L2-Einheiten (L2_1 bis L2_4.x): Algorithmus-Eigenschaften + Kfz-Steuer, Bubble Sort (inkl. Optimierung), Selection Sort (auf-/absteigend), Fehleranalyse, lineare Suche + Verschlüsselung, binäre Suche (Zugriffszählung prüft echtes Halbieren), Vergleich der Suchen + Modulo-Filter, Anwenden nach Namen + Häufigkeiten. Schrittmodelle an Bezeichner des Materials angepasst. 57/57 Tests, Pyodide geprüft. |
| CONTENT-L3 | OPEN | – | Vier Einheiten zu dynamischen Datenstrukturen ausarbeiten. |
| REVIEW-01 | OPEN | – | Vollständige Quellen-/Bildungsplanabnahme und Materialmatrix. |

## Übergabe

Konkreter Einstieg für Claude: [docs/claude-handoff.md](docs/claude-handoff.md).
Die Datei ist eine Momentaufnahme; diese Aufgabenliste bleibt der aktuelle Stand.

Jakob hat Claude am 19.10.2026 beauftragt, autark weiterzuarbeiten und geeignete Stände selbst zu veröffentlichen.
Aktueller Stand: **0.9.0** – L1 und L2 vollständig (15 von 19 Einheiten). Claude arbeitet als Nächstes am Design und an L3.
Belegt durch Claude: learning-path.js, app.js, design.css, array-ops-model.js, python-checks.js, tests/, Doku.
Prüfungen: `node --test tests/*.test.cjs` (57/57), Syntax aller JS-Dateien,
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
