# AlgoLab Projektdokumentation

Stand: 6. Oktober 2026 (Europe/Berlin)

Aktueller Stand: **0.3.1 – Entwicklermodus im Profil**

Umgesetzt: statischer Prototyp mit Übersicht, drei Kartenstationen, 19
nummerierten Lerneinheiten, Punkten und sequenzieller Freischaltung.
Zusätzlich umgesetzt: metallische Bedienelemente, eigenes fotorealistisches
Logo, Startmotiv, Landkarte mit ausklappbaren Einheiten und einklappbare Sidebar.
L1.1 enthält Erklärungen und einen ersten Verständnischeck; die übrigen
Einheiten sind ausdrücklich in Vorbereitung. Eine vollständige BPE7-Abdeckung
ist noch nicht erreicht.

Projektordner: `D:\Google Drive\Codex\AlgoLab`

Repository: <https://github.com/JakobSawazki/AlgoLab> (öffentlich).

Live: <https://jakobsawazki.github.io/AlgoLab/>.
Veröffentlicht und am 6. Oktober 2026 geprüft: **0.3.0**, ausdrücklich als
Grundgerüst gekennzeichnet. GitHub Pages verwendet den geprüften Actions-Workflow.

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
Die Unterteilung ist als Grundgerüst in `learning-path.js` umgesetzt:
L1.1 bis L1.7, L2.1 bis L2.8 und L3.1 bis L3.4. Die endgültige Ausarbeitung
erfolgt nach dem Einzelabgleich mit Informationsblättern, Aufgaben und Lösungen.

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

Seit 0.3.0 verwendet die Karte eine fotorealistische Bergseelandschaft mit
drei Forschungsstationen. Logo und Startmotiv greifen blaue und metallische
Materialien auf. Die Sidebar ist einklappbar und zeigt bei Bedarf die
Lernfortschritte mit ihren Einheiten. Die Kartenmenüs öffnen per Maus,
Klick und Tastatur; auf Mobilgeräten erscheint die Liste unter dem Bild.
Interaktive Beschriftungen bleiben HTML-Elemente und werden nicht in ein
Hintergrundbild eingebrannt. Gestaltung, Bedienung und vollständige
Generierungsprompts stehen in [Bildwelt und Bedienung](visual-design.md).

Eine gleichwertige Listenansicht ermöglicht die Navigation auf kleinen
Bildschirmen sowie per Tastatur. Direktlinks und eine sichtbare Rückkehr zum
Lernfortschritt erhalten die Orientierung.

Vorgesehene Hauptnavigation: Übersicht, Lernpfad, Üben, Nachschlagen und
Mein Lernstand. Zusätzliche Reiter werden nur eingeführt, wenn die Inhalte
sie benötigen. Ein heller und ein dunkler Darstellungsmodus sind vorgesehen.
Auf ausdrücklichen Nutzerwunsch gilt nun eine verbindliche Reihenfolge mit
punktgebundener Freischaltung. Eine Lehrkraftbestätigung ist bislang nicht
implementiert.

### Freischaltung seit 0.2.0

Anfangs ist ausschließlich L1.1 zugänglich. Jede Einheit besitzt aktuell ein
Punkteziel von 100 Punkten. Die nächste Einheit wird erst zugänglich, wenn
alle Pflichtaufgaben der vorherigen Einheit bestanden, deren volle Punktzahl
erreicht und der Abschluss bestätigt wurde. Alle vorangehenden Einheiten
müssen ebenfalls abgeschlossen sein. Die Regel gilt auch zwischen L1 und L2
sowie zwischen L2 und L3 und wird beim Aufruf direkter Links geprüft.

Punkte bleiben erhalten und werden nicht ausgegeben. Bereits bestandene
Aufgaben geben bei erneuten Versuchen keine zusätzlichen Punkte. Die
Punkteziele weiterer Einheiten sind vorläufig und werden bei ihrer fachlichen
Ausarbeitung an die tatsächlichen Pflichtaufgaben angepasst. Unfertige
Einheiten vergeben keine Punkte und ermöglichen keinen weiteren Abschluss.

L1.1 verwendet vier Verständnisfragen mit je 25 Punkten. Richtige Antworten
werden gespeichert; nach 100 Punkten wird „Einheit abschließen“ aktiv. Danach
öffnet sich L1.2 mit ihren geplanten Lernzielen. Noch fehlende Inhalte werden
klar angezeigt. Freitextbegründungen und die vollständige Umsetzung des
Originalarbeitsauftrags folgen später.

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
| `index.html` | App-Rahmen, Navigation und Dialoge | umgesetzt |
| `styles.css` | Gestaltung, Lernkarte und responsive Ansichten | umgesetzt |
| `design.css` | blaue Metallgestaltung, Fotomotive und Kartenmenüs | umgesetzt |
| `learning-path.js` | Lernfortschritte, Einheiten, Materialkürzel und erster Check | umgesetzt |
| `progress.js` | Punkte, Abschluss, Freischaltung und Lernstandvalidierung | umgesetzt |
| `content.js` | zusätzliche Erklärungen und Aufgaben bei weiterem Ausbau | geplant |
| `app.js` | Navigation, Rendering und Lernstand | umgesetzt |
| `python-worker.js` | Python-Ausführung über Pyodide im Web Worker | geplant |
| `assets/` | drei eigene Fotomotive und SVG-Icon-System | umgesetzt |
| `tests/` | sechs automatisierte Freischaltungs- und Lernstandtests | umgesetzt |
| `resources/` | lokale Referenzmaterialien | vorhanden, Git ignoriert |

Die Lernpfaddaten sollen stabile IDs und einen nachvollziehbaren Bezug zum
Bildungsplan besitzen. Hash-Routing erlaubt Direktlinks ohne besondere
Serverkonfiguration. Vor Übernahmen werden Lizenzhinweise und Abhängigkeiten
geprüft. SQL- und Workbench-spezifische Funktionen werden nicht mitkopiert.

Die Python-Ausführung benötigt ein Zeitlimit und eine Abbruchmöglichkeit,
damit fehlerhafte Schleifen die Oberfläche nicht blockieren. Laufzeitfehler
werden verständlich übersetzt. KI-Dienste sind für den Kern nicht erforderlich.

## 8. Lernstand und Rückmeldung im Entwurf

Umgesetzt sind lokale Speicherung von Abschlüssen und geprüften Antworten
sowie JSON-Export und -Import. Codeentwürfe und zuletzt geöffneter Lernschritt
folgen beim weiteren Ausbau. Der Speicherschlüssel lautet `algolab-v1`;
die Sicherungsdatei kennzeichnet ihre Herkunft eindeutig als AlgoLab und
verwendet `formatVersion: 1`.

Punkte werden aus den gültigen Antworten berechnet. Importierte Gesamtpunkte,
unbekannte Aufgaben und unterbrochene Abschlussketten werden nicht übernommen.
Vor einem Import wird das Ersetzen des aktuellen Lernstands bestätigt. Diese
Validierung verhindert inkonsistente Dateien, ist aber kein Manipulationsschutz:
eine vollständig lokale Anwendung enthält ihre Prüfkriterien im Browser.

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

Vor dem regulären Unterrichtseinsatz müssen folgende Punkte erfüllt sein:

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

Auf Wunsch des Nutzers wurden am 6. Oktober 2026 folgende ergänzende Skills
aus der offiziellen kuratierten Sammlung `openai/skills` installiert:

| Skill | Zweck |
| --- | --- |
| `playwright` | reproduzierbare Browser- und Interaktionstests |
| `gh-fix-ci` | Fehler in GitHub-Actions-Prüfungen untersuchen |
| `gh-address-comments` | spätere GitHub-Review-Kommentare bearbeiten |
| `security-best-practices` | gezielte Sicherheitsprüfung beim weiteren Ausbau |

Die Installation erfolgt benutzerweit unter `C:\Users\Jakob\.codex\skills`,
damit die Skills auch für spätere AlgoLab-Aufgaben verfügbar sind. Die bereits
über Plugins vorhandenen PDF-, Documents-, Presentations-, Imagegen- und
Computer-use-Skills wurden nicht doppelt installiert.

## 11. Aufgaben und nächste Meilensteine

### 0.1.0 Projektgrundlage

- [x] Name AlgoLab und eigenständigen Projektumfang festhalten.
- [x] Materialablage am neuen Ort prüfen.
- [x] Bildungsplanabschnitt BPE7.1 bis BPE7.3 auslesen.
- [x] Lernstruktur und Gestaltungsprinzipien dokumentieren.
- [x] README und Ausschluss lokaler Materialien anlegen.
- [x] Lokales Git-Repository und öffentliches GitHub-Repository einrichten.

### 0.2.0 Grundgerüst mit erstem Verständnischeck

- [ ] Materialmatrix für alle drei Lernfortschritte vervollständigen.
- [x] Übersicht und Lernkarte mit drei Stationen entwerfen und umsetzen.
- [x] Navigation und mobile Listenansicht erstellen.
- [ ] L1.1 mit Erklärungen, Zuordnungsaufgaben und Begründungen umsetzen.
- [x] Lokale Antwortspeicherung und JSON-Sicherung einrichten.
- [x] Punktegebundene Freischaltung auch für direkte Links umsetzen.
- [x] Prototyp am Desktop und bei 390 Pixeln Breite prüfen.
- [x] Grundgerüst 0.2.0 als gekennzeichnete Online-Vorschau veröffentlichen.

### Weitere Abnahme vor dem Unterrichtseinsatz

- [ ] Veröffentlichungsvoraussetzungen aus Abschnitt 9 prüfen.
- [x] GitHub Pages einrichten und Deployment kontrollieren.
- [x] Öffentliche Seite prüfen.
- [ ] PythonLab-Sprungziele bei ihrer Integration prüfen.
- [x] Veröffentlichten Umfang und offene Inhalte dokumentieren.

### Weiterer Ausbau

- [ ] Array-Einheiten und Python-Laufzeit ergänzen.
- [ ] Schreibtischtests sowie Such- und Sortiersimulationen entwickeln.
- [ ] L2 einschließlich eigener Implementierungen und Transferaufgaben aufbauen.
- [ ] L3 mit anschaulichen Modellen und begründeten Zuordnungen aufbauen.
- [ ] Abdeckung von Bildungsplan, Kompetenzraster und Ich-kann-Listen prüfen.

## 12. Prüfstand und Versionsverlauf

### 0.3.1 – 6. Oktober 2026

Ein Profilfenster ist über das Profil unten links und das Profilsymbol in der
Kopfzeile erreichbar. Nur im geöffneten Profil blendet AltGr + S den Button
„Entwicklermodus“ ein oder aus. Gehaltene Tasten führen nicht zu mehrfachen
Umschaltungen. Der Button aktiviert oder deaktiviert den Modus; Ausblenden
beendet einen aktiven Modus nicht. Beim Schließen wird die Sichtbarkeit des
Buttons zurückgesetzt. Der aktive Zustand ist in der Kopfzeile sichtbar.

Der Modus verwendet `sessionStorage` unter `algolab-developer-v1`. Er übersteht
Neuladen im selben Tab, wird aber nicht im dauerhaften Lernstand oder einer
JSON-Sicherung gespeichert. Beim Ausschalten gelten sofort wieder die normalen
Sperren, auch für eine gerade angezeigte spätere Einheit. Ohne verfügbaren
Sitzungsspeicher funktioniert der Modus bis zum Neuladen im Arbeitsspeicher.

`progress.js` trennt Entwicklerzugang (`accessible`) von regulärer Freischaltung
(`unlocked`). Alle vorhandenen Einheiten sind im Modus zugänglich; unbekannte
IDs bleiben ungültig. Er verändert weder Punkte noch Abschlüsse. Bewertung und
Abschluss behalten die reguläre Reihenfolge. Der Modus dient der Vorschau und
ist kein passwortgeschützter Administrationsbereich. Inhalte in Vorbereitung
werden durch den Modus nicht als fertig markiert.

Sieben automatisierte Tests bestanden, einschließlich Entwicklerzugang ohne
Änderung des Lernstands und Rückkehr zu den normalen Sperren. Lokal im Browser
geprüft: Button zunächst verborgen; AltGr + S ein/aus; Aktivierung; 19 offene
Einheiten im Lernpfad und in der Sidebar; vier offene L3-Einheiten auf der Karte;
L3.4 per Direktlink und nach Neuladen; sofortige Sperre nach Deaktivierung.
Der vorhandene Testlernstand blieb bei 100 Punkten und einem Abschluss.
Profilansichten bei 1440 und 390 Pixeln, helle und dunkle Darstellung wurden
visuell geprüft; die Mobilansicht hatte keinen horizontalen Überlauf.
Syntax- und Git-Diff-Prüfung bestanden.

### 0.3.0 – 6. Oktober 2026

Die Homepage erhält ein blaues Farbsystem mit metallischen Buttons und
eigenen skalierbaren Icons. Ein fotorealistisches Logo wurde als Sidebarlogo
und Favicon eingebunden. Die Startseite zeigt einen blauen Programmierarbeitsplatz;
die Lernkarte zeigt drei verbundene Forschungsstationen an einem Bergsee.
Alle drei Motive wurden mit dem eingebauten Imagegen-Werkzeug erstellt und
im Projekt abgelegt. Prompts und Dateizuordnung sind in `visual-design.md`
dokumentiert.

Die Sidebar ist am Desktop zu einer Icon-Leiste einklappbar. Der Lernpfad
darin enthält aufklappbare Lernfortschritte und Einheiten. Die Kartenstationen
zeigen beim Darüberfahren und per Klick ihre Einheiten. Tastaturbedienung,
Escape, große Touch-Buttons und eine mobile Liste ergänzen die Mausbedienung.
Gesperrte Einheiten sind sichtbar, erhalten aber keinen Lektionslink.

Die sechs bestehenden Freischaltungstests und Syntaxprüfung bestanden.
Lokal geprüft: Bildladung, Sidebar-Einstellung nach Neuladen, Sidebar-Einheiten,
L2-Kartenmenü mit allen acht Einheiten, L3-Menü mit Enter/Escape, Desktop bei
1440 Pixeln und mobile Karte mit Menü bei 390 Pixeln ohne horizontalen Überlauf.
Der Deploy-Workflow nimmt nun `design.css` und `assets/` zusätzlich auf.
Punkte und vorhandene Lernstände bleiben kompatibel. Workflow-Lauf
`37526317343` für Commit `2c8a8f2` war erfolgreich. Die öffentliche Homepage
wurde geprüft: alle drei Bilder geladen, Kartenmenü L1 mit sieben Einheiten,
nur L1.1 als zugängliche Einheit verlinkt und 0 Punkte im neuen Browserstand.
Eine Desktop-Vorschau ist lokal unter `.tmp/algolab-blue-desktop.png` gesichert.
Auch die helle Mobilansicht und das Ausblenden der mobilen Navigation wurden
lokal geprüft.

### 0.2.0 – 6. Oktober 2026

Drei Lernfortschritte mit 19 Lerneinheiten als Grundgerüst umgesetzt. Die
Lernkarte ist zunächst eine funktionale Darstellung mit drei Stationen;
ein Landschaftsbild ist noch nicht enthalten. Dark-/Light-Mode, Navigation,
Lernstandsansicht, lokale Speicherung und JSON-Sicherung wurden ergänzt.

Sechs automatisierte Tests bestanden: Anfangssperren; falsche Antworten und
Teilpunkte; genau eine neue Freischaltung nach Abschluss; kein Abschluss
unfertiger Einheiten; Normalisierung importierter Lernstände; durchgängige
Reihenfolge über beide Lernfortschrittsgrenzen. Der letzte Test verwendet
ausführbare Testeinheiten und schaltet keine unfertigen Inhalte der App frei.

Im Browser geprüft: gesperrter Direktlink auf L2.1; Fehlversuch ohne Punkte;
vier richtige Antworten mit insgesamt 100 Punkten; expliziter Abschluss;
Freischaltung von L1.2; Erhalt des Abschlusses nach Neuladen. Lerneinheit und
Lernpfad wurden bei 390 Pixeln Breite ohne horizontalen Überlauf geprüft,
die Übersicht zusätzlich bei 1440 Pixeln. Syntaxprüfung und Git-Diff-Prüfung
bestanden. Der vollständige Datei-Export/-Import über die Browseroberfläche
ist noch separat abzunehmen; die Normalisierung wurde automatisiert geprüft.

Der GitHub-Workflow prüft Syntax und Freischaltung vor jedem Deployment und
veröffentlicht ausschließlich `index.html`, `styles.css`, `app.js`,
`learning-path.js` und `progress.js`. Originalmaterialien, Tests und lokale
Lernstandsdateien sind kein Bestandteil der veröffentlichten Homepage.

GitHub Pages wurde eingerichtet. Der erste Workflow-Lauf
`37524319516` für Commit `3a9dace` war erfolgreich. Die öffentliche Startseite
und der Lernpfad wurden im Browser geprüft: 0 Punkte, ausschließlich L1.1
zugänglich, alle weiteren Einheiten gesperrt. Die Online-Vorschau ist noch
keine vollständig ausgearbeitete Unterrichtsumgebung. Dark-/Light-Mode wurden
lokal geprüft. Die Vorschau und der Lernpfad wurden als lokale Screenshots
unter `.tmp/` gesichert; diese Dateien werden nicht veröffentlicht.

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
