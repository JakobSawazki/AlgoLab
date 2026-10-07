# AlgoLab

**BPE7 · Algorithmen und Datenstrukturen · Jahrgangsstufe 2**

Stand: 7. Oktober 2026. Version **0.6.0 – Arrays auswerten**.
Ein erster Prototyp mit drei Lernfortschritten und 19 Lerneinheiten ist umgesetzt.
L1.1 enthält Erklärungen, eigene Notizen und Verständnisfragen. L1.2 enthält ein
Arraymodell, einen Schreibtischtest und eine echte Python-Aufgabe. L1.3 ergänzt
ein Schleifenmodell und zwei automatisch geprüfte Python-Funktionen. L1.4
zeigt Minimum, Maximum und Durchschnitt mit Modell und zwei Codeaufgaben.
Weitere 15 Einheiten sind in Vorbereitung. Alle vier ausgearbeiteten Einheiten besitzen
ein eigenes fotorealistisches Motiv und eine Lernsituation.

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

Nächster Meilenstein: L1.3 mit Schleifenzugriff und eigener Python-Aufgabe ausbauen,
danach L1.2 mit Arraybeispielen und Python-Ausführung ausarbeiten.
