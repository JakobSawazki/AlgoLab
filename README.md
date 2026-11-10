# AlgoLab

**BPE7 · Algorithmen und Datenstrukturen · Jahrgangsstufe 2**

Stand: 10. November 2026. Version **1.15.0 – Schreibtischtest im Python-Editor**.
Veröffentlichungs- und Prüfstand: [Projektdokumentation](docs/documentation.md).
Mit **Schreibtischtest** kannst du im Python-Editor Codezeilen und
Variablenänderungen für deine aktuelle Eingabe nachvollziehen.
Über **Suche** findest du Einheiten, Begriffe, Python-Aufgaben, Struktogramme
und Übungsklausuren. Ein Kürzel wie L2.6 führt direkt zum passenden Treffer.
Im Lernpfad zeigen Lernziele und Praxisbeispiele, wofür du die Inhalte
brauchst. In der gemischten Wiederholungsrunde übst du bis zu fünf bereits gelöste
Verständnisfragen aus verschiedenen Einheiten ohne Lernpunkte.
Markiere in der Ich-kann-Liste „Noch nicht“, um passende Erklärungen und
Übungen sowie eine gezielte Runde aus den freigeschalteten Einheiten zu finden.
Die Startseite zeigt, wo du anfangen oder weiterlernen kannst. In L1.1, L2.1
und L3.1 probierst du ein kurzes Beispiel mit direkter Rückmeldung aus.
In L1.2 kannst du vor der ersten Python-Pflichtaufgabe ein Programm ausführen
und verändern. Der Abschluss steht jeweils direkt hinter den Pflichtaufgaben.
Die bestehenden Bereiche Klausurvorbereitung, lokale KI, Struktogramm-Training,
Klassenübersicht, Programmieren, Ich-kann-Listen und Glossar bleiben enthalten.

Kleine Logo-/Favicon-Dateien und responsive Varianten von Startmotiv und
Lernkarte reduzieren den Startdownload. Die Originalbilder bleiben erhalten.
Alle drei Lernfortschritte sind vollständig ausgearbeitet: L1 Daten organisieren
(Arrays, Durchlaufen, Auswerten, Tauschen, Einfügen, Entfernen), L2 Sortieren und
Suchen (Algorithmusbegriff, Bubble Sort, Selection Sort, lineare und binäre Suche,
Prüfen und Anwenden) und L3 Dynamische Datenstrukturen (verkettete Liste, Stapel,
Warteschlange, Baum). Jede Einheit hat eine Lernsituation, Erklärungen, ein
interaktives Schritt-Modell, Reflexionsfelder und geprüfte Aufgaben mit 100 Punkten.
Jede der 19 Einheiten hat ein eigenes fotorealistisches Motiv zur
Lernsituation. AlgoLab wählt die Bildvariante nach Bildschirmbreite und
Pixeldichte. [Motive und Prompts](docs/lesson-images.md).

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
Analysefunktion ergeben dort 100 Punkte. Der Abschluss öffnet L1.5
„Elemente vertauschen“.

Eigene Erklärungen und Codeentwürfe werden lokal gespeichert und in die
Lernstandsdatei aufgenommen. Freitext wird nicht automatisch benotet.
Die Python-Prüfung ist eine Lernhilfe und kein manipulationssicherer Nachweis.
[Arbeitsprotokoll](docs/work-log.md), [Materialmatrix](docs/material-matrix.md)
und [Fotomotive mit Prompts](docs/lesson-images.md) dokumentieren den Ausbau.

## Profil und EP

Im Profil Kürzel (z. B. `jak.saw`) und Klasse eintragen und übernehmen.
Die Karte „EP · Erfahrungspunkte“ öffnet eine bearbeitbare Tabelle mit Datum, Uhrzeit, Anlass
und ganzen Punkten von −10 bis 5, ohne 0. Gültige Änderungen und Löschungen
werden sofort gespeichert; unvollständige Korrekturen behalten den letzten
gültigen Stand. Anwesenheit schlägt wie bisher 2 EP vor, Startkapital einmal je
Schuljahr 5. Abgeschlossene Einheiten buchen einmalig 5 EP. Das
Jahresziel beträgt 100. EP dienen ausschließlich der Motivation und haben
keine Notenwirkung; Lernpunkte für Freischaltungen bleiben separat.
Lernpunkte und Freischaltung werden davon unabhängig berechnet.

Die Diskette in der Kopfzeile oder **Alt+S** sichert Profil, EP, Lernstand,
Textmarker, Notizen, Skizzen und Codeentwürfe gemeinsam. Der Ordner oder
**Alt+O** lädt eine Sicherung nach Bestätigung. Die gewählte Datei bleibt
erhalten. Bei Bedarf lässt sich danach eine neue Sicherung herunterladen.

Ältere AlgoLab-Sicherungen im Format 1 sind weiter ladbar. Das historische
Feld `nagoldEntries` enthält die EP samt früheren Korrekturen. Fehlt die
Tabelle in einer frühen Datei, ergänzt AlgoLab einmalig 5 EP pro
anerkanntem Abschluss ohne erfundenes Datum. Das Vorgehen bei künftigen
Änderungen steht in der [Projektdokumentation](docs/documentation.md).

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

Der Bereich **Programmieren** orientiert sich am Reiter „Üben“ in PythonLab.
Er enthält 20 Programmieraufgaben mit Eingaben über input(), darunter drei
Übungen zur Fehlersuche mit vorgegebenem Startcode. Im Editor stehen eine
Konsole, automatische Testfälle und ein lokaler Lerncoach zur Verfügung.
Die freie Python-Werkstatt bietet Vorlagen. Der gespeicherte Programmierstand
ist von der Freischaltung der Lerneinheiten getrennt.

Im **Struktogramm-Training** planen die Lernenden Algorithmen nach der
Operatorenliste Baden-Württemberg (Lücken füllen, Bausteine ordnen). Für
Lehrkräfte gibt es eine **Klassenübersicht** (Link in der Fußzeile), die die
JSON-Sicherungen einer Klasse lokal im Browser zusammenführt – mit Fortschritt
je Einheit, häufigsten Unsicherheiten und CSV-Export, ohne Datenübertragung.

Die **Klausurvorbereitung** bereitet auf die BPE-7-Anteile der schriftlichen
Abiturprüfung vor. Sie enthält drei Übungsklausuren zu je 30 BE mit Operator,
Anforderungsbereich und Erwartungshorizont, einen Prüfungsmodus mit Zeit und
Notenpunkt-Orientierung sowie ein Operatoren-Training. Zusammengestellt ist sie
aus der Auswertung der Abiturprüfungen 2021–2026 (`docs/abitur-bpe7-analyse.md`).

Wie in PythonLab gibt es einen optionalen **KI-Lerncoach** (Google Gemini über
einen abgesicherten Cloudflare-Worker): Nach ausdrücklicher Zustimmung für die
Browsersitzung gibt er nach Fehlversuchen kurze Denkimpulse, ohne die Lösung zu
verraten. Übertragen werden nur Aufgabe, Code und Prüfergebnis – kein Name und
kein Lernstand. Einrichtung und Grundsätze: `services/ai-coach-worker/README.md`.
Seit 1.6.0 kann der Lerncoach alternativ **lokal im Browser** laufen (WebLLM
über WebGPU, ohne Schlüssel und Server; Aufgabe und Code verlassen das Gerät
nicht). Seit 1.7.0 nutzt er Qwen3.5 4B (einmalig 2,3 GB, etwa 4 GB
Grafikspeicher) und bekommt ein **Ablaufprotokoll** des fehlgeschlagenen
Testfalls (welche Zeile welche Variable ändert) – damit findet er typische
Fehler wie überschriebene Merker, Indexfehler oder ein vergessenes int().
Auf Geräten mit integrierter Grafik ist die KI über den Server die bessere Wahl.

Seit 1.1.0 zeigen die Schrittmodelle jeden Algorithmus wahlweise als Python-Code
oder als Struktogramm nach der Operatorenliste Baden-Württemberg. Die
Ich-kann-Listen der drei Lernfortschritte stehen als Selbsteinschätzung zur
Verfügung, und sieben freiwillige Vertiefungsaufgaben aus dem Material bieten
zusätzliche Übung ohne Einfluss auf Punkte und Freischaltung. Ein durchsuchbares
Glossar erklärt 56 Fachbegriffe und verweist auf die passenden Einheiten.

Nächste Schritte: Erprobung im Unterricht und Rückmeldungen der Klassen
J2 INF1 und J2 INF2 einarbeiten.
