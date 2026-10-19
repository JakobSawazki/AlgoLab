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
| RESULTS-01 | REVIEW | Claude | 19.10.2026 (Gaming-Laptop): 0.7.1 lokal, nicht committet. Zwei Word-Dokumente je Klasse (J2 INF1, J2 INF2) in Jakobs OneDrive `Dokumente\Codex\AlgoLab`, nur fachliche Inhalte. Links in `learning-path.js` → `results.documents`; passende Profilklasse zeigt nur ihr Dokument, sonst beide. 39/39 Tests, Syntax, Diff, Browser Desktop/Mobil geprüft. Offen: Abschnittsnamen bestätigen, Bearbeitungsrecht der Links prüfen, Commit/Push und Onlineabnahme. |
| CONTENT-05 | OPEN | – | L1.5 Elemente vertauschen: Materialabgleich, Hilfsvariable/Überschreiben modellieren, Python-Aufgabe, Fotomotiv, Tests. |
| CONTENT-06 | OPEN | – | L1.6/L1.7 ausarbeiten. |
| CONTENT-L2 | OPEN | – | Acht Einheiten zu Sortieren und Suchen ausarbeiten. |
| CONTENT-L3 | OPEN | – | Vier Einheiten zu dynamischen Datenstrukturen ausarbeiten. |
| REVIEW-01 | OPEN | – | Vollständige Quellen-/Bildungsplanabnahme und Materialmatrix. |

## Übergabe

Konkreter Einstieg für Claude: [docs/claude-handoff.md](docs/claude-handoff.md).
Die Datei ist eine Momentaufnahme; diese Aufgabenliste bleibt der aktuelle Stand.

RESULTS-01: Links eingetragen, wartet auf Jakobs Freigabe zum Veröffentlichen. Lokale, nicht committete Änderungen: index.html, app.js,
learning-path.js, design.css, assets/icons.svg, tests/results.test.cjs, Doku.
Letzter geprüfter Arbeitsstand: **0.7.0 veröffentlicht** (349053b), online geprüft.
Nächster möglicher Schritt: RESULTS-01 nach Jakobs Freigabe veröffentlichen, sonst CONTENT-05; den gewählten
Bereich vor Bearbeitung eintragen. Es gibt derzeit keine Dateireservierung.
Prüfungen: `node --test tests/*.test.cjs` (39/39), Syntax aller JS-Dateien,
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
