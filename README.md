# AlgoLab

**BPE7 · Algorithmen und Datenstrukturen · Jahrgangsstufe 2**

Stand: 6. Oktober 2026. Version **0.3.0 – Blaue Bildwelt und interaktive Lernkarte**.
Ein erster Prototyp mit drei Lernfortschritten und 19 Lerneinheiten ist umgesetzt.
L1.1 enthält einen ersten Verständnischeck; weitere Einheiten sind in Vorbereitung.

Repository: <https://github.com/JakobSawazki/AlgoLab>.
Online-Vorschau: <https://jakobsawazki.github.io/AlgoLab/>.
Der aktuelle Deployment- und Prüfstand steht in der Projektdokumentation.

AlgoLab entsteht als eigenständige Lernumgebung mit drei Lernfortschritten:
Daten organisieren, Sortieren und Suchen sowie dynamische Datenstrukturen.
Gestaltung und Lernkarte orientieren sich an WorkbenchLab. PythonLab wird
gezielt zum Auffrischen der Programmiergrundlagen verlinkt.

Die Oberfläche verwendet blaue Metallflächen, ein eigenes fotorealistisches
Logo, ein Startmotiv und eine Landschaftskarte. Die Kartenstationen zeigen
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

## Lokal starten und prüfen

Im Projektordner `python -m http.server 4175 --bind 127.0.0.1` ausführen und
`http://127.0.0.1:4175` öffnen. Für die Freischaltungstests:

```text
node --test tests/progress.test.cjs
```

Der Lernstand wird lokal gespeichert und kann über das Symbol in der Kopfzeile
als JSON gesichert oder geladen werden. Er ist kein manipulationssicherer
Leistungsnachweis. Der Veröffentlichungsworkflow prüft die Freischaltung und
überträgt ausschließlich die Laufzeitdateien und eigenen Assets der Homepage
an GitHub Pages.

Nächster Meilenstein: L1.1 um eigene Begründungen und Zuordnungen ergänzen,
danach L1.2 mit Arraybeispielen und Python-Ausführung ausarbeiten.
