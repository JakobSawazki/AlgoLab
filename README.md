# AlgoLab

**BPE7 · Algorithmen und Datenstrukturen · Jahrgangsstufe 2**

Stand: 19. Oktober 2026. Version **1.3.0 – Programmieren, Struktogramme, Ich-kann-Listen, Vertiefung, Glossar**.
Alle drei Lernfortschritte sind vollständig ausgearbeitet: L1 Daten organisieren
(Arrays, Durchlaufen, Auswerten, Tauschen, Einfügen, Entfernen), L2 Sortieren und
Suchen (Algorithmusbegriff, Bubble Sort, Selection Sort, lineare und binäre Suche,
Prüfen und Anwenden) und L3 Dynamische Datenstrukturen (verkettete Liste, Stapel,
Warteschlange, Baum). Jede Einheit hat eine Lernsituation, Erklärungen, ein
interaktives Schritt-Modell, Reflexionsfelder und geprüfte Aufgaben mit 100 Punkten.
L1.1 bis L1.4 besitzen zusätzlich ein eigenes fotorealistisches Motiv; die übrigen
Einheiten zeigen ein grafisches Banner.

Repository: <https://github.com/JakobSawazki/AlgoLab>.
Online-Vorschau: <https://jakobsawazki.github.io/AlgoLab/>.
Der aktuelle Deployment- und Prüfstand steht in der Projektdokumentation.

AlgoLab entsteht als eigenständige Lernumgebung mit drei Lernfortschritten:
Daten organisieren, Sortieren und Suchen sowie dynamische Datenstrukturen.
Gestaltung und Lernkarte orientieren sich an WorkbenchLab. PythonLab wird
gezielt zum Auffrischen der Programmiergrundlagen verlinkt.

Die Oberfläche verwendet blaue Metallflächen, ein eigenes fotorealistisches
Logo, ein Startmotiv mit drei gemeinsam lernenden Schülern und eine Landschaftskarte. Die Kartenstationen zeigen
alle zugehörigen Einheiten per Maus, Klick oder Tastatur. Auf Mobilgeräten
erscheint die Liste unter der Karte. Die Sidebar und ihre Lernfortschritte
sind einklappbar. [Bildwelt, Bedienung und Prompts](docs/visual-design.md).

Die zentrale [Projektdokumentation](docs/documentation.md) enthält die
fachlichen Grundlagen, das Gestaltungskonzept, den geplanten technischen
Aufbau, Aufgaben, Prüfstand und Versionsverlauf.

Die [Lenovo-Startanleitung](docs/lenovo-setup.md) dokumentiert den lokalen
Projektpfad, die geprüfte Laufzeit und den übernommenen Arbeitsstand.
Der gemeinsame [Aufgabenstand](TASKS.md) hält für Jakob, Codex und Claude
fest, wer gerade woran arbeitet und was abgeschlossen oder noch offen ist.
Die Einstiegsdateien `AGENTS.md` und `CLAUDE.md` verweisen auf dieselbe Übergabe.

Die Unterrichtsmaterialien unter `resources/` dienen als lokale Referenz
und sind vom Git-Repository ausgeschlossen. Öffentliche Erklärungen und
Übungen werden eigenständig aufbereitet.

## Freischaltung

Anfangs ist nur L1.1 offen. Vier bestandene Aufgaben vergeben je 25 Punkte.
Nach 100 Punkten und dem bewussten Abschluss öffnet sich L1.2. Die Regel gilt
über alle Lernfortschritte hinweg, auch für Direktlinks. Punkte werden nicht
ausgegeben und nicht doppelt vergeben. Noch nicht ausgearbeitete Einheiten
können nicht abgeschlossen werden.

## Entwicklermodus

Öffne dein Profil unten links oder über das Profilsymbol in der Kopfzeile.
Mit **AltGr + S** erscheint der Button **Entwicklermodus**. Er schaltet den
Modus ein oder aus; erneutes AltGr + S verbirgt lediglich den Button.
Die Tastenkombination funktioniert ausschließlich im geöffneten Profil.

Im aktiven Modus sind alle 19 Einheiten über Lernpfad, Lernkarte, Sidebar und
Direktlinks zugänglich. Punkte und Abschlüsse werden dadurch nicht verändert.
Die normalen Bewertungs- und Abschlussregeln bleiben bestehen. Unfertige
Einheiten bleiben in Vorbereitung. Der Modus bleibt beim Neuladen in diesem
Browser-Tab aktiv, bis er ausgeschaltet oder der Tab geschlossen wird. Er wird
nicht in Lernstandsdateien exportiert. Beim erneuten Öffnen des Profils ist der
Button wieder verborgen; ein aktiver Modus bleibt an der Kopfzeile erkennbar.

## Python und gespeicherte Entwürfe

Ab L1.2 kannst du Code direkt ausführen. Pyodide 0.29.4 wird beim ersten Start
vom CDN geladen; dafür ist eine Internetverbindung nötig. Die Berechnung
läuft im Browser-Worker, kann gestoppt werden und endet nach spätestens fünf
Sekunden. Die Codeaufgabe zählt 40 Punkte, drei Verständnisfragen je 20.
Erst alle 100 Punkte und der ausdrückliche Abschluss öffnen L1.3. Dort ergeben
zwei Verständnisfragen und zwei Codeaufgaben wieder 100 Punkte. Nach dem
Abschluss ist L1.4 zugänglich. Drei Verständnisfragen sowie Sammel- und
Analysefunktion ergeben dort 100 Punkte. Erst der Abschluss öffnet L1.5,
dessen Inhalte als Nächstes entstehen.

Eigene Erklärungen und Codeentwürfe werden lokal gespeichert und in die
Lernstandsdatei aufgenommen. Freitext wird nicht automatisch benotet.
Die Python-Prüfung ist eine Lernhilfe und kein manipulationssicherer Nachweis.
[Arbeitsprotokoll](docs/work-log.md), [Materialmatrix](docs/material-matrix.md)
und [Fotomotive mit Prompts](docs/lesson-images.md) dokumentieren den Ausbau.

## Profil und NAGOLD

Im Profil Kürzel (z. B. `jak.saw`) und Klasse eintragen und übernehmen.
Die NAGOLD-Karte öffnet eine bearbeitbare Tabelle mit Datum, Uhrzeit, Anlass
und ganzen Punkten von −10 bis 5, ohne 0. Gültige Änderungen und Löschungen
werden sofort gespeichert; unvollständige Korrekturen behalten den letzten
gültigen Stand. Anwesenheit schlägt 2 NAGOLD vor, Startkapital einmal je
Schuljahr 5. Abgeschlossene Einheiten buchen einmalig 5 NAGOLD. Das
Jahresziel beträgt 100; verbindlich bleibt die Bewertung der Lehrkraft.
Lernpunkte und Freischaltung werden davon unabhängig berechnet.

„Profil als JSON speichern“ sichert Profildaten, NAGOLD, Lernstand, Notizen
und Codeentwürfe gemeinsam. „Profil laden“ stellt diese Daten nach Bestätigung
wieder her. Auch das bisherige Diskettensymbol verwendet denselben Dateistand.
Alte AlgoLab-Dateien bleiben ladbar; bei fehlender NAGOLD-Tabelle werden
bekannte Abschlüsse mit je 5 NAGOLD und unbekanntem Datum übernommen.
Excel-Lab-Dateien gehören weiterhin zu Excel-Lab.

## Lokal starten und prüfen

Im Projektordner `python -m http.server 4175 --bind 127.0.0.1` ausführen und
`http://127.0.0.1:4175` öffnen. Für die Freischaltungstests:

```text
node --test tests/*.test.cjs
```

Der Lernstand wird lokal gespeichert und kann über das Symbol in der Kopfzeile
als JSON gesichert oder geladen werden. Er ist kein manipulationssicherer
Leistungsnachweis. Der Veröffentlichungsworkflow prüft die Freischaltung und
überträgt ausschließlich die Laufzeitdateien und eigenen Assets der Homepage
an GitHub Pages.

Der Bereich **Programmieren** funktioniert wie der Reiter „Üben“ in PythonLab:
17 Programmieraufgaben aus dem Unterrichtsmaterial mit Eingaben über input(),
Editor, Konsole mit Ausgabe- und Eingabereiter, automatische Prüfung mit
mehreren Testfällen, lokaler Lerncoach und eine freie Python-Werkstatt mit
Vorlagen. Der Programmierstand wird gespeichert, zählt aber nicht für die
Freischaltung der Lerneinheiten.

Seit 1.1.0 zeigen die Schrittmodelle jeden Algorithmus wahlweise als Python-Code
oder als Struktogramm nach der Operatorenliste Baden-Württemberg. Die
Ich-kann-Listen der drei Lernfortschritte stehen als Selbsteinschätzung zur
Verfügung, und sieben freiwillige Vertiefungsaufgaben aus dem Material bieten
zusätzliche Übung ohne Einfluss auf Punkte und Freischaltung. Ein durchsuchbares
Glossar erklärt 56 Fachbegriffe und verweist auf die passenden Einheiten.

Nächste Schritte: Erprobung im Unterricht, Rückmeldungen der Klassen J2 INF1 und
J2 INF2 einarbeiten, Fotomotive für L1.5 bis L3.4 und eine vollständige
Bildungsplan- und Materialabnahme (REVIEW-01).
