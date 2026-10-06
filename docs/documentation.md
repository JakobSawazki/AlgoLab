# AlgoLab Projektdokumentation

Stand: 6. Oktober 2026 (Europe/Berlin)

Aktueller Stand: **0.1.0 – Projektgrundlage und Konzept**

Veröffentlichte Anwendung: **noch keine**. Es gibt derzeit keine fertige Homepage.
Die unten beschriebenen Funktionen sind geplant, sofern sie nicht ausdrücklich
als umgesetzt bezeichnet sind.

Projektordner: `D:\Google Drive\Codex\AlgoLab`

Repository: <https://github.com/JakobSawazki/AlgoLab> (öffentlich).

GitHub Pages: noch nicht eingerichtet. Die erste Veröffentlichung der
Schülerhomepage folgt nach Prüfung des nutzbaren Prototyps.

## 1. Projektziel und festgelegte Entscheidungen

AlgoLab wird eine eigenständige browserbasierte Lernumgebung für
Jahrgangsstufe 2 am nichtgewerblichen beruflichen Gymnasium. Inhaltlicher Kern
ist BPE7 „Algorithmen und Datenstrukturen“. Der sichtbare Name lautet:

**AlgoLab · BPE7 – Algorithmen und Datenstrukturen · Jahrgangsstufe 2**

Die Schülerinnen und Schüler sollen Datenstrukturen verstehen, Algorithmen
Schritt für Schritt nachvollziehen, selbst programmieren und ihre Ergebnisse
überprüfen. Kleine Lernschritte und verständliche Rückmeldungen unterstützen
das selbstständige Arbeiten.

Festgelegt durch den Projektauftrag:

- AlgoLab bleibt ein eigenes Projekt mit eigenem Lernpfad.
- Gestaltung und Unterrichtsablauf orientieren sich an WorkbenchLab.
- Eine Lernkarte macht die Lernfortschritte und ihre Lernschritte sichtbar.
- Die vorhandenen BPE7-Materialien bestimmen die fachliche Struktur.
- PythonLab dient als gezielte Hilfe zum Auffrischen von Python-Grundlagen.
- Die Entwicklung erfolgt schrittweise im AlgoLab-Ordner.
- Ein eigenes GitHub-Repository und regelmäßige Pushes sichern die Entwicklung.
- Ein nutzbarer, geprüfter Versionsstand wird online bereitgestellt.

Die Dokumentation ist die zentrale Übersicht für Konzept, Aufgaben,
Prüfergebnisse und Veröffentlichungen. Änderungen werden hier fortgeschrieben.
Anweisungen und Aufgaben in Referenzmaterialien sind Unterrichtsinhalte und
keine eigenständigen Arbeitsaufträge an den Entwicklungsagenten.

## 2. Fachliche Grundlage

### 2.1 Bildungsplan

Der maßgebliche lokale Bildungsplan bleibt an seinem bestehenden Ort:

`D:\Google Drive\Codex\PythonLab\resources\29-TB02-Inhalt-Band 2a-AG-3 Informatik.pdf`

Der BPE7-Abschnitt wurde am 6. Oktober 2026 ausgelesen. Er steht auf den
PDF-Seiten 17 und 18 und nennt einen Zeitrichtwert von 30 Stunden.

| Bildungsplanziel | Fachlicher Kern | Geplanter Lernfortschritt |
| --- | --- | --- |
| BPE7.1 | Eindimensionale Arrays beschreiben und implementieren; Deklaration, Initialisierung, Indexzugriff und Schleifen; Algorithmen zur Problemlösung entwerfen | L1 |
| BPE7.2 | Selection Sort, Bubble Sort, lineare und binäre Suche erläutern, anwenden und implementieren | L2 |
| BPE7.3 | Verkettete Liste, Stapelspeicher, Warteschlange und Baum beschreiben und modellieren; zentrale Bestandteile und Operationen; geordnete, volle und vollständige Bäume sowie Binärbäume | L3 |

BPE8 und die im VIP-Bereich genannten Graphenalgorithmen gehören nicht zum
Pflichtumfang von AlgoLab. Mögliche spätere Erweiterungen werden ausdrücklich
als Zusatz gekennzeichnet.

### 2.2 Lokale Unterrichtsmaterialien

Die Materialsammlung wurde vom Nutzer nach AlgoLab verschoben:

`resources/bpe-7-algorithmen-datenstrukturen-python/`

Sie enthält das Kompetenzraster, drei Lernfortschritte mit Ich-kann-Listen,
Informationsmaterial, Arbeitsaufträgen, Lösungen und ergänzenden Dateien.
Die Datei `202509_Aktualisierungen.docx` dokumentiert unter anderem Änderungen
zum 1. September 2025. Dieser Änderungsstand ist beim Übertragen zu beachten;
eine vollständige Einzelprüfung aller Dateien steht noch aus.

Bereits gelesen: Kompetenzraster, Ich-kann-Listen im bisherigen Projektkontext,
Aktualisierungshinweise sowie Informationsblatt und Arbeitsauftrag zur
Einführung in Datenstrukturen am neuen Ablageort.

Für jede neue Einheit werden vor der Umsetzung das passende Informationsblatt,
die Aufgaben und die Lösung geprüft. Die Lösung dient der fachlichen Kontrolle
und der Entwicklung von Prüfkriterien. Öffentliche Inhalte werden eigenständig
und webgerecht formuliert. Originaldateien und Musterlösungen werden nicht
automatisch in das öffentliche Repository übernommen; `resources/` ist durch
`.gitignore` ausgeschlossen.

Eine Materialsammlung allein ist noch kein Nachweis vollständiger Abdeckung.
Die Zuordnung jedes Bildungsplanziels zu Erklärung, Übung und Lernprodukt wird
während der Umsetzung dokumentiert.

## 3. Geplanter Lernpfad

Die drei Hauptbereiche entsprechen den Lernfortschritten der Materialien.
Die folgende Unterteilung ist ein erster Entwurf; die endgültigen Einheiten
werden nach dem jeweiligen Materialabgleich festgelegt.

| Kürzel | Schülergerechter Titel | Lernschritte im Entwurf |
| --- | --- | --- |
| L1 | Daten organisieren | Datenstrukturen kennenlernen; Arrays und Index; Arrays durchlaufen und auswerten; Elemente tauschen, einfügen und entfernen; Schreibtischtests und Transfer |
| L2 | Sortieren und Suchen | Algorithmusbegriff und Eigenschaften; Bubble Sort; Selection Sort; Sortierverfahren überprüfen; lineare Suche; binäre Suche; Suchverfahren überprüfen und anwenden |
| L3 | Dynamische Datenstrukturen verstehen | Verkettete Liste; Stapelspeicher mit push und pop; Warteschlange mit enqueue und dequeue; Bäume und Binärbäume; situationsgerechte Modellierung |

Die Originalkürzel wie `L1_1` oder `L2_2.1` bleiben in der internen
Materialzuordnung erhalten. Die Webseite darf umfangreiche Arbeitsaufträge
in mehrere kleinere Lernschritte aufteilen, ohne deren fachliche Ziele zu
verlieren. Pflichtaufgaben und Vertiefungen werden klar gekennzeichnet.

### Fachliche Leitplanken

- Das Arraymodell und die Umsetzung mit Python-Listen werden bewusst
  unterschieden. Eine Python-Liste ist kein fest dimensioniertes Array und
  auch keine verkettete Liste im Sinne des Datenstrukturmodells.
- Indexzugriffe beginnen in Python bei 0. Länge und letzter gültiger Index
  werden getrennt erklärt.
- Such- und Sortierverfahren werden zunächst nachvollzogen, dann selbst
  implementiert. Eingebaute Sortierfunktionen ersetzen diese Lernziele nicht.
- Binäre Suche setzt eine passende Sortierung voraus. Gefunden, nicht
  gefunden sowie Randpositionen werden behandelt.
- L3 fordert nach dem Bildungsplan Beschreiben und Modellieren. Vollständige
  Klassenimplementierungen sind keine vorausgesetzte Pflichtleistung.
- Begriffe wie geordnet, voll und vollständig werden mit eindeutigen
  Definitionen und Gegenbeispielen fachlich geprüft.

## 4. Unterrichtsablauf pro Einheit

Jede Einheit folgt einem wiederkehrenden Ablauf:

1. **Verstehen:** Ein Lernziel und eine kurze Alltagssituation führen in den
   neuen Begriff ein. Fachwörter werden bei ihrer ersten Verwendung erklärt.
2. **Nachvollziehen:** Ein Beispiel, eine Visualisierung oder ein
   Schreibtischtest macht die einzelnen Schritte sichtbar.
3. **Selbst bearbeiten:** Kleine Aufgaben führen zu eigenem Code, einer
   begründeten Entscheidung oder einem Modell.
4. **Überprüfen:** Verständnischeck, konkrete Rückmeldung und eine kurze
   Selbstkontrolle zeigen, was bereits gelingt.

Längere Aufgaben werden in überschaubare Abschnitte gegliedert. Lösungen
werden nicht vorab eingeblendet. Gestufte Hinweise unterstützen den nächsten
Denkschritt. Aufgaben sollen neben einem richtigen Ergebnis auch das
Verständnis des Verfahrens prüfen.

Die erste vollständig umzusetzende Einheit ist **L1.1 – Datenstrukturen
kennenlernen**, auf Grundlage von `L1_1 Information Datenstrukturen.docx`
und `L1_1 Arbeitsauftrag Einführung Datenstrukturen.docx`.

Geplantes Lernprodukt: eine Definition in eigenen Worten, die Zuordnung von
Alltagssituationen zu Datenstrukturen und kurze Begründungen. Diese Einheit
führt zunächst in die Modelle ein; das Programmieren folgt bei den Arrays.

## 5. Gestaltung und Lernkarte

WorkbenchLab ist das Vorbild für Seitenaufteilung, Orientierung und ruhige
Gestaltung. AlgoLab erhält einen eigenen Namen, fachlich passende Motive und
eine erkennbare Zuordnung zu Jahrgangsstufe 2.

Die geplante Lernkarte besitzt drei Hauptstationen für L1, L2 und L3. Jede
Station öffnet eine übersichtliche Liste der zugehörigen Lernschritte.
Aktueller Schritt und Bearbeitungsstand werden durch Text und Symbole
erkennbar; Farbe allein genügt nicht.

Die konkrete Bildwelt ist noch offen. Die Karte wird zunächst funktional
entworfen. Ein aufwendiges Landschaftsbild folgt erst, wenn Stationen,
Beschriftungen und Bedienung feststehen. Interaktive Beschriftungen bleiben
HTML-Elemente und werden nicht in ein Hintergrundbild eingebrannt.

Eine gleichwertige Listenansicht ermöglicht die Navigation auf kleinen
Bildschirmen sowie per Tastatur. Direktlinks und eine sichtbare Rückkehr zum
Lernfortschritt erhalten die Orientierung.

Vorgesehene Hauptnavigation: Übersicht, Lernpfad, Üben, Nachschlagen und
Mein Lernstand. Zusätzliche Reiter werden nur eingeführt, wenn die Inhalte
sie benötigen. Ein heller und ein dunkler Darstellungsmodus sind vorgesehen.
Strikte Freischaltungen und eine Lehrkraftbestätigung werden nicht ungeprüft
aus WorkbenchLab übernommen; zunächst wird eine empfohlene Reihenfolge geplant.

## 6. Verbindung mit PythonLab

AlgoLab besitzt eigene Aufgaben, Fortschritte und Sicherungsdateien.
PythonLab wird an geeigneten Stellen als Grundlagenhilfe verlinkt.

| Bedarf in AlgoLab | Passende PythonLab-Lektion |
| --- | --- |
| Variablen und Datentypen | `#lesson/variablen` |
| Vergleiche und Verzweigungen | `#lesson/if` |
| Arrays durchlaufen | `#lesson/for` und `#lesson/while` |
| Listen lesen und verändern | `#lesson/listen` und `#lesson/listen-methoden` |
| Algorithmen in Funktionen gliedern | `#lesson/funktionen-parameter` und `#lesson/funktionen-rueckgabe` |
| Fehler systematisch finden | `#lesson/debugging` |

Basisadresse: `https://jakobsawazki.github.io/PythonLab/`.
Die Lektions-IDs wurden im lokalen PythonLab-Inhaltsmodell geprüft;
die öffentlichen Sprungziele müssen vor Veröffentlichung geprüft werden.

Kurze Hinweise wie „Python auffrischen“ erscheinen direkt bei der Aufgabe.
Externe Grundlagenlinks sollen in einem neuen Tab öffnen, damit der aktuelle
AlgoLab-Arbeitsstand sichtbar bleibt. Umfangreiche BPE5-Lektionen werden
nicht dupliziert. Ergänzend ist das bereits aus PythonLab verlinkte
BPE7-Lehrbuch als Lesehilfe zu prüfen.

## 7. Technische Architektur im Entwurf

Vorgesehen ist eine statische Anwendung ohne notwendigen Build-Schritt,
geeignet für GitHub Pages. Bewährte Bausteine aus PythonLab und WorkbenchLab
werden gezielt übernommen und an AlgoLab angepasst.

| Datei oder Ordner | Vorgesehene Aufgabe | Stand |
| --- | --- | --- |
| `README.md` | Projekteinstieg und Verweis auf diese Dokumentation | angelegt |
| `docs/documentation.md` | zentrale Konzept-, Aufgaben- und Versionsübersicht | angelegt |
| `.gitignore` | lokale Materialien und Entwicklungsdateien ausschließen | angelegt |
| `index.html` | App-Rahmen, Navigation und Dialoge | geplant |
| `styles.css` | Gestaltung, Lernkarte und responsive Ansichten | geplant |
| `learning-path.js` | Lernfortschritte, Lernschritte und Materialbezüge | geplant |
| `content.js` | Erklärungen, Aufgaben und Prüfkriterien | geplant |
| `app.js` | Navigation, Rendering und Lernstand | geplant |
| `python-worker.js` | Python-Ausführung über Pyodide im Web Worker | geplant |
| `assets/` | eigene Bildmedien und Symbole | bei Bedarf |
| `tests/` | gezielte fachliche und technische Prüfungen | bei Bedarf |
| `resources/` | lokale Referenzmaterialien | vorhanden, Git ignoriert |

Die Lernpfaddaten sollen stabile IDs und einen nachvollziehbaren Bezug zum
Bildungsplan besitzen. Hash-Routing erlaubt Direktlinks ohne besondere
Serverkonfiguration. Vor Übernahmen werden Lizenzhinweise und Abhängigkeiten
geprüft. SQL- und Workbench-spezifische Funktionen werden nicht mitkopiert.

Die Python-Ausführung benötigt ein Zeitlimit und eine Abbruchmöglichkeit,
damit fehlerhafte Schleifen die Oberfläche nicht blockieren. Laufzeitfehler
werden verständlich übersetzt. KI-Dienste sind für den Kern nicht erforderlich.

## 8. Lernstand und Rückmeldung im Entwurf

Geplant sind lokale Speicherung von Abschlüssen, Antworten, Codeentwürfen
und zuletzt geöffnetem Lernschritt sowie JSON-Export und -Import.
Der vorgesehene Speicherschlüssel lautet `algolab-v1`; die Sicherungsdatei
kennzeichnet ihre Herkunft eindeutig als AlgoLab.

Importe werden auf Formatversion, Größe und bekannte Inhalts-IDs geprüft.
Lernstände von PythonLab oder WorkbenchLab werden nicht als AlgoLab-Dateien
eingelesen. Zur Zuordnung genügt ein Kürzel; ein vollständiger Name ist nicht
erforderlich. Export und Import müssen einen Gerätewechsel ermöglichen.

XP und Erfolge können später motivierend ergänzen. Sie sind kein
manipulationssicherer Leistungsnachweis. Die fachliche Rückmeldung und die
Qualität des Lernprodukts stehen vor der Punktzahl.

## 9. GitHub und Veröffentlichungen

Ein eigenes Repository wird unter dem bestehenden GitHub-Konto eingerichtet.
Es enthält die eigenständig erstellte Anwendung und Projektdokumentation.
Die lokale Materialsammlung bleibt ausgeschlossen.

Sinnvolle Änderungen werden lokal versioniert und regelmäßig gepusht.
GitHub Pages wird für den ersten nutzbaren Prototyp eingerichtet. Eine
Dokumentationsversion allein wird nicht als fertige Schülerhomepage ausgegeben.

Vor dem ersten Online-Prototyp müssen folgende Punkte erfüllt sein:

- Übersicht und Lernkarte funktionieren, auch als Liste auf Mobilgeräten.
- Eine erste Einheit ist fachlich vollständig und verständlich bearbeitbar.
- Antworten werden gespeichert; Lernstandsicherung und Wiederherstellung
  funktionieren für den vorhandenen Umfang.
- Navigation, Tastaturbedienung und mobile Darstellung wurden geprüft.
- Originalmaterialien, Lösungen, Zugangsdaten und lokale Exporte sind nicht
  Teil des Veröffentlichungsumfangs.
- Entwurfsstatus und noch nicht verfügbare Inhalte sind deutlich erkennbar.

Nach jedem Deployment werden der Workflow und die öffentliche Seite geprüft.
Repository-Adresse, Live-Adresse, Version, Prüfumfang und verbleibende
Einschränkungen werden hier festgehalten.

## 10. Werkzeuge und Skills

Für die Projektgrundlage sind keine zusätzlichen Skill-Installationen nötig.
Verfügbar und je nach Arbeitsschritt sinnvoll sind:

- **PDF:** Bildungsplan und ergänzende PDF-Materialien auslesen und prüfen.
- **Documents:** Informationsblätter, Arbeitsaufträge und Lösungen in DOCX
  auswerten; bei neu erstellten Word-Artefakten die Darstellung prüfen.
- **Presentations:** vorhandene Sortier- und Suchpräsentationen bei der
  fachlichen Übertragung auswerten.
- **Imagegen:** eine eigene Lernkarte oder passende Illustrationen erstellen,
  sobald die funktionale Gestaltung steht.
- **Computer-use:** Bedienung und Darstellung der laufenden Webseite im
  Browser prüfen.

Fachliche Simulationen und Diagramme werden bevorzugt direkt in HTML, CSS,
SVG oder JavaScript gebaut, damit Zustände nachvollziehbar, steuerbar und
zugänglich bleiben. Rasterbilder dienen der Bildwelt, nicht als Ersatz für
interaktive Fachdarstellungen. Git und GitHub CLI dienen der Versionierung.
Die bestehende GitHub-Pages-Architektur erfordert keinen Sites-Workflow.

## 11. Aufgaben und nächste Meilensteine

### 0.1.0 Projektgrundlage

- [x] Name AlgoLab und eigenständigen Projektumfang festhalten.
- [x] Materialablage am neuen Ort prüfen.
- [x] Bildungsplanabschnitt BPE7.1 bis BPE7.3 auslesen.
- [x] Lernstruktur und Gestaltungsprinzipien dokumentieren.
- [x] README und Ausschluss lokaler Materialien anlegen.
- [x] Lokales Git-Repository und öffentliches GitHub-Repository einrichten.

### 0.2.0 Lokaler Prototyp

- [ ] Materialmatrix für alle drei Lernfortschritte vervollständigen.
- [ ] Übersicht und Lernkarte mit drei Stationen entwerfen und umsetzen.
- [ ] Navigation und mobile Listenansicht erstellen.
- [ ] L1.1 mit Erklärungen, Zuordnungsaufgaben und Begründungen umsetzen.
- [ ] Lokale Antwortspeicherung und JSON-Sicherung einrichten.
- [ ] Prototyp im Browser prüfen und dokumentieren.

### 0.3.0 Erster Online-Prototyp

- [ ] Veröffentlichungsvoraussetzungen aus Abschnitt 9 prüfen.
- [ ] GitHub Pages einrichten und Deployment kontrollieren.
- [ ] Öffentliche Seite und PythonLab-Sprungziele prüfen.
- [ ] Veröffentlichten Umfang und offene Inhalte dokumentieren.

### Weiterer Ausbau

- [ ] Array-Einheiten und Python-Laufzeit ergänzen.
- [ ] Schreibtischtests sowie Such- und Sortiersimulationen entwickeln.
- [ ] L2 einschließlich eigener Implementierungen und Transferaufgaben aufbauen.
- [ ] L3 mit anschaulichen Modellen und begründeten Zuordnungen aufbauen.
- [ ] Abdeckung von Bildungsplan, Kompetenzraster und Ich-kann-Listen prüfen.

## 12. Prüfstand und Versionsverlauf

### 0.1.0 – 6. Oktober 2026

Projektkonzept, Lernstruktur und Entwicklungsfahrplan angelegt. Die lokale
Materialablage sowie die Abschnitte BPE7.1 bis BPE7.3 des bereitgestellten
Bildungsplans wurden geprüft. Die Aktualisierungshinweise der Materialsammlung
und die Materialien zum Einstieg wurden gelesen. PythonLab-Lektions-IDs für
Grundlagenlinks wurden lokal nachgeschlagen.

Ein eigenes öffentliches Repository wurde unter
`https://github.com/JakobSawazki/AlgoLab` eingerichtet. `.gitignore` schließt
die lokalen Originalmaterialien aus; der Ausschluss wurde mit
`git check-ignore` geprüft. Der erste Commit enthält ausschließlich
`.gitignore`, `README.md` und diese Dokumentation.

Es gibt noch keine App, keine Python-Ausführung und keine Browserabnahme.
Eine vollständige Materialmatrix und der Einzelabgleich aller Unterrichtsdateien
stehen aus. Prüfungen und Veröffentlichungen werden mit ihrem tatsächlichen
Umfang ergänzt; geplante Funktionen werden erst nach Umsetzung als fertig markiert.
