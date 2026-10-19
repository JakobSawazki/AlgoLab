# AlgoLab Arbeitsprotokoll

## 7. Oktober 2026 – Schritt 1: Bestands- und Materialprüfung

Abgeschlossen: Git-Arbeitsstand geprüft (sauber, Version 0.3.2). L1.1 ist ein
erster Check; L1.2 bis L3.4 sind noch in Vorbereitung. Informationsblätter,
Arbeitsaufträge und Lösungen für L1_1 und L1_2 sowie die Ich-kann-Liste von L1
ausgelesen. Unterrichtsanweisungen werden als fachliche Referenz behandelt.
Der Arbeitsauftrag L1_2 umfasst Initialisierung, append, len, Ausgabe und einen
Schreibtischtest. Die App muss Modell und Python-Liste deutlich unterscheiden.

Nächster Arbeitsschritt: L1.1 um gespeicherte eigene Erklärungen ergänzen;
L1.2 mit Arraymodell, Beispiel, Schreibtischtest und einer selbst zu lösenden
Python-Aufgabe umsetzen. Python läuft wie in PythonLab im Web Worker mit
Zeitlimit und Stopptaste. Die Pyodide-Dokumentation zu Version 0.29.4 wurde
mit dem bestehenden PythonLab-Worker abgeglichen:
<https://pyodide.org/en/0.29.4/usage/webworker.html>.

Offen: übrige Materialmatrix, L1.3–L1.7, L2 und L3, vollständige Bildungsplan-
und Aufgabenabdeckung, Browserabnahme der neuen Funktionen und Veröffentlichung.

## Schritt 2: Lerninhalte und Python-Grundlage

Abgeschlossen: L1.1 um drei lokal gespeicherte eigene Erklärungen mit
Selbstkontrollkriterien ergänzt (ohne automatische Freitextbewertung).
L1.2 mit Erklärungen, Arraymodell, fünf Schreibtischtestzuständen, drei Checks
und einer Python-Aufgabe ausgearbeitet. Rendering und Abschlussmeldungen sind
jetzt je Einheit dynamisch. Codeentwürfe und Erklärungen gehören zur Sicherung.
Python-Worker und Runner mit Abbruch, 5-Sekunden-Ausführungslimit,
60-Sekunden-Ladelimit, begrenzter Ausgabe und getrennten Prüfergebnissen ergänzt.
Der Deployment-Workflow berücksichtigt beide Laufzeitdateien.

Geprüft: elf automatisierte Tests bestanden, einschließlich erforderlicher
Codeprüfung für L1.2, gespeicherter Entwürfe, Worker-Abbruch und Neustart.

Offen im laufenden Schritt: Prüfungskriterien auf die geforderten Operationen
schärfen, reale Pyodide-Ausführung und Fehlerfälle im Browser prüfen, Fotomotive
für L1.1 und L1.2 erzeugen und einbinden. Die Fotomotive der übrigen 17 Einheiten
sind ausdrücklich noch offen. Motivierende Situationen und eigene passende
Übungen werden beim weiteren Inhaltsausbau jeweils ergänzt.

## Schritt 3: Fotomotive und reale Python-Prüfung

Abgeschlossen: eigene Fotomotive für L1.1 und L1.2 mit Imagegen erzeugt,
visuell geprüft und als lokale WebP-Assets eingebunden. Prompts, Originalpfade
und Status aller noch offenen Motive stehen in `docs/lesson-images.md`.
Beide Einheiten besitzen eine Schulfest-/Turniersituation. Prüfkriterien
prüfen Ergebnisse, Ausgabe sowie verwendete Index-, append- und len-Operationen.

Geprüft: 14 automatisierte Tests bestanden. Im Browser wurde echtes Pyodide
0.29.4 geladen. Ungültiger Index: verständlicher IndexError-Hinweis.
Korrektes Programm: sieben Prüfungen bestanden, 40 Punkte; Abschluss bei
40/100 noch deaktiviert. Arrayänderung behält Länge 4, append erzeugt Länge 5.
Schreibtischtest kopiert den richtigen Feldwert. Eine echte Endlosschleife
wurde nach fünf Sekunden beendet; manueller Abbruch meldete den Stopp.

Noch laufend: Neustart nach Abbruch, drei Checks plus expliziter Abschluss,
Lernstand nach Neuladen, Entwurfs-/Notizsicherung, mobile Darstellung,
abschließende Versionsdokumentation und Deployment-Abnahme.

## Schritt 4: Abnahme des Inhaltsmeilensteins 0.4.0

Abgeschlossen: Python-Neustart nach Abbruch geprüft, ohne doppelte Punkte.
Alle drei Checks bestanden; bei 100/100 ist Abschluss aktiv. Im regulären
Modus L1.2 abgeschlossen, nach Neuladen 200 Gesamtpunkte und zwei Abschlüsse.
Eigene Definition und Codeentwurf bleiben erhalten. Dateiimport einer gültigen
Testdatei über den Dateidialog, Bestätigung und Erfolgsmeldung geprüft; Code
und 200 Punkte erhalten. Exportklick ohne JS-Fehler, aber Download-Ereignis
im In-App-Browser ohne Ergebnis; kompletter Export-Rundlauf bleibt offen.

L1.1 und L1.2 bei 390 Pixeln geprüft, ohne horizontalen Überlauf. Fotomotive
und Desktopdarstellung geprüft. Die PythonLab-Listenlektion online geprüft
und verlinkt. Materialmatrix, Bildprompts, README und zentrale Dokumentation
aktualisiert. Fortschrittsbalken passen nun ebenfalls zur blauen Gestaltung.
15 Tests und Syntaxprüfungen bestanden; zusätzlich ist geprüft, dass verspätete
Meldungen eines beendeten Workers den neuen Lauf nicht beeinflussen.

Nächster Schritt: Änderungen versionieren, pushen, GitHub-Pages-Workflow und
öffentliche L1.1/L1.2 einschließlich Python-Codeausführung abnehmen.
Offen für folgende Inhaltsarbeit: L1.3 (Schleifen, eigene Aufgabe, Fotomotiv),
L1.4–L1.7, L2 und L3, ihre jeweiligen Situationen und Bilder, vollständiger
Material-/Bildungsplanabgleich und echter Datei-Export/-Import-Rundlauf.

## Schritt 5: Veröffentlichung und Prüfung der Entwicklervorschau

Abgeschlossen: 0.4.0 als Commit aa0c2dc gepusht. Workflow 37664851580 war
vollständig erfolgreich. Öffentliche L1.1: Fotomotiv und drei Schreibfelder.
Öffentliche L1.2: echte Python-Ausführung bestanden mit sieben Kriterien;
bei vorgezogenem Entwicklerzugang blieben die Punkte korrekt bei 0.
Testcode wurde anschließend wieder durch den Starter ersetzt.

Nachbesserung 0.4.1: Auch Multiple-Choice-Fragen sind in der vorgezogenen
Entwicklervorschau bedienbar. Richtige/falsche Antworten erzeugen Rückmeldung,
werden aber nicht als Schülerleistung gespeichert und geben keine Punkte.
Damit bleibt der Entwicklermodus zum vollständigen Testen einer Einheit nutzbar.
Die Schülerreihenfolge und ihre Bewertungsregeln sind unverändert.

Offen im Veröffentlichungsschritt: Vorschau-Rückmeldung online prüfen,
Nachbesserung veröffentlichen und Prüfergebnis ergänzen. Inhaltsarbeit danach:
L1.3 und weitere Einheiten einschließlich ihrer jeweiligen Fotomotive.

## Schritt 6: Online-Abnahme abgeschlossen

Abgeschlossen: 0.4.1 mit Commit 548c6c1 veröffentlicht. Workflow 37665608749
bestand alle 15 Tests und das Deployment. Online im Entwicklerzugang richtige
und falsche Verständnisantwort geprüft: Rückmeldung passend, Punkte bleiben 0.
Nach Neuladen keine Vorschauantwort gespeichert. Die Online-Python-Ausführung
wurde bereits im Inhaltsmeilenstein 0.4.0 erfolgreich geprüft. Screenshot
`.tmp/algolab-0-4-array-lesson.png` zeigt die veröffentlichte Array-Einheit.
Testcode wurde auf den Starter zurückgesetzt; der echte Lernstand bleibt
unverändert. Die Veröffentlichung ist in der zentralen Dokumentation vermerkt.

Als Nächstes: L1.3 anhand Vereinsmeisterschaft/Volleyball-Material abgleichen,
Schleifenzugriff erklären und visualisieren, eigene Programmieraufgabe prüfen,
motivierende Situation und eigenes Fotomotiv ergänzen. Danach L1.4–L1.7 und
L2/L3 systematisch ausarbeiten. Noch offen: 17 Einheiten/Fotomotive,
vollständige Bildungsplanabnahme und Export/Import-Rundlauf auf einem Client,
der die erzeugte Sicherungsdatei als Download bereitstellt. Das Gesamtziel
ist weiterhin aktiv und durch diesen Teilmeilenstein noch nicht abgeschlossen.

## Schritt 7: L1.3 aus Quellen aufgebaut

Abgeschlossen: Aufgaben und Lösungen L1_3.1.1 Vereinsmeisterschaften und
L1_3.1.2 Volleyball Spieler anzeigen fachlich gelesen. Eigenständig formulierte
Schulturnier-Situation, Erklärungen zu range/len, Einrückung, Platz minus 1,
Funktionsparametern, Listenkombination und direktem Wertzugriff ergänzt.
Zwei Verständnisfragen (je 20 Punkte), Platzfunktion (20 Punkte) und
Ausgabefunktion (40 Punkte) bilden alle 100 Pflichtpunkte. Gespeicherter
Schreibtischtest und Erweiterung zu drei Ansichten unterstützen den Transfer.
Funktionsparameter ersetzen in den Browseraufgaben die interaktive Eingabe;
eine Menüauswahl wird als eigene Erweiterung beschrieben. Eigenes
fotorealistisches Volleyballmotiv mit dem eingebauten Imagegen erzeugt und
als WebP eingebunden.

Offen: lokale Browserabnahme, Veröffentlichung und Onlineprüfung. Weitere
16 Einheiten einschließlich Motiven und vollständiger Materialabnahme offen.

## Schritt 8: Schleifenmodell und variable Testdaten geprüft

Abgeschlossen: interaktiver Durchlauf mit drei, einem und keinem Namen.
Funktionsprüfungen laufen mit zusätzlichen Daten; ihre Ausgabe wird getrennt
aufgefangen und verändert die sichtbare Schülerausgabe nicht. 21 lokale
Tests bestehen: u. a. Schleifengrenzen, leere Listen, neue Namen, falscher
Index, fest eingetragene Ausgaben und Freischaltung erst nach beiden
Codeaufgaben plus beiden Verständnisfragen und explizitem Abschluss.
Syntax und Git-Diff geprüft.

Offen: Browserprüfung mit tatsächlichem Pyodide, mobile Darstellung,
Lernstands-Erhalt und Onlinebereitstellung.


## Schritt 9: Lokale Browserabnahme L1.3

Abgeschlossen: Beide Programme mit echtem Pyodide ausgeführt, alle neun
Kriterien bestanden. Prüfausgaben gelangen nicht in die Schülerausgabe.
60 Punkte nach den Codeaufgaben, 100 erst nach beiden Verständnisfragen.
Expliziter Abschluss öffnet L1.4; Neuladen erhält 300 Gesamtpunkte, Code
und Schreibtischtest-Notizen im lokalen Testlernstand. Schleifenmodell mit
drei, einem und keinem Namen geprüft; fertiger Durchlauf stoppt. Bei
390 Pixeln kein horizontaler Überlauf, Bedienelemente visuell geprüft.
Fotomotiv korrekt geladen.

Offen: Veröffentlichung und Onlineabnahme; weitere 16 Einheiten mit Motiven,
vollständige Quellenabnahme und Datei-Export-Rundlauf.


## Schritt 10: Grundlagenhilfe und Veröffentlichung vorbereitet

Abgeschlossen: PythonLab-Hilfe für for/range, Funktionsparameter und return
eingebunden. Alle drei Sprungziele online anhand der tatsächlichen Lektion
geprüft. Array-Informationsblatt und Ich-kann-Liste 2.6/2.9 zusätzlich
abgeglichen. Lokale Seite nach Hilfeänderung neu geladen; keine JS-Fehler.
Dokumentation, README, Bildherkunft, Version und Veröffentlichungspaket
auf 0.5.0 aktualisiert.

Offen: GitHub-Push, Actions-Deployment und Onlineprüfung; danach L1.4.


## Schritt 11: L1.3 veröffentlicht und online geprüft

Abgeschlossen: 0.5.0 mit Commit 149ef9e gepusht. Actions-Workflow 37668519947
bestand alle 21 Tests und das Pages-Deployment. Beide Python-Aufgaben online
im Entwicklerzugang ausgeführt: alle neun Kriterien erfüllt, keine Punkte
vergeben; echter Lernstand bleibt bei 0. Foto vollständig geladen. Testcode
auf Starter zurückgesetzt. Screenshot `.tmp/algolab-0-5-loop-lesson.png`
zeigt die veröffentlichte Lerneinheit. Dokumentation und Materialmatrix
halten Inhalte, Quellen und Prüfumfang fest.

Als Nächstes: L1.4 anhand Gewinnziehung und Trainingsanalyse ausarbeiten,
Minimum/Maximum/Durchschnitt mit Zwischenergebnissen modellieren, eigene
Python-Aufgaben und Fotomotiv erstellen. Weitere 16 Einheiten sind offen.
Vollständige BPE7-Abnahme und Datei-Export-Rundlauf bleiben ebenfalls offen.
Das Gesamtziel bleibt aktiv.


## Schritt 12: Materialabgleich für L1.4

Abgeschlossen: Arbeitsaufträge und Lösungen Gewinnziehung (L1_3.2) sowie
Trainingsanalyse (L1_3.3) gelesen. Gewinnziehung: fünf Werte mit append
sammeln und ausgeben. Trainingsanalyse: sechs Würfe, Minimum/Maximum
aus dem ersten Wert initialisieren, Summe bilden und durch die Anzahl teilen.
Die Vorlage nennt den Durchschnitt einmal Ganzzahl; tatsächlich liefert
Python bei / einen Gleitkommawert. AlgoLab erklärt dies ausdrücklich.
Eigenes Turniertraining als Situation vorgesehen; verschiedene Daten und
Randfälle werden geprüft.

Offen: Inhalte, Simulation, Codeaufgaben, Motiv, Tests, Browserabnahme und
Veröffentlichung L1.4. Weitere 15 Einheiten danach noch auszuarbeiten.


## Schritt 13: L1.4 Inhalte und Modell umgesetzt

Abgeschlossen: Trainingssituation, eigenes fotorealistisches Motiv, sechs
Erklärabschnitte, Grundlagenlinks, Schreibtischtest und Optimierungsaufgabe
ergänzt. Auswertungsmodell zeigt Startwerte, jeden Vergleich und laufende
Summe; Durchschnitt erst nach allen Werten. Sieben Testreihen einschließlich
positiver/negativer Messwerte, gleicher Werte, Singleton, Nullen und leerer
Liste. Drei Verständnisfragen (30 Punkte), Sammelfunktion (20 Punkte) und
Auswertungsfunktion (50 Punkte) bilden 100 Pflichtpunkte. Funktionsprüfungen
verwenden neue Daten, prüfen unveränderte Eingaben und erfassen ihre Ausgabe
getrennt. Leere Auswertung liefert ausdrücklich None.

Offen: automatisierte Tests, tatsächlicher Browserlauf, mobile Abnahme,
Grundlagenlinks prüfen und Veröffentlichung. Weitere 15 Einheiten offen.


## Schritt 14: Algorithmen und Freischaltung geprüft

Abgeschlossen: 30 lokale Tests bestanden. Neue Prüfungen umfassen sämtliche
Zwischensummen, Minimum/Maximum, leere Listen, unveränderte Eingaben,
wiederholte Werte und optimierten Summenstart bei Index 1. Falsche
Nullinitialisierung, doppelte Zählung, Ganzzahldivision, bloße Alias-Rückgabe
und fertige Auswertungsfunktionen werden erkannt. L1.5 öffnet erst nach
allen fünf Pflichtaufgaben mit 100 Punkten und explizitem Abschluss.
Notizen und Codeentwürfe bleiben in der Lernstandnormalisierung erhalten.
Syntax- und Diff-Prüfung bestanden.

Offen: Browserabnahme inklusive tatsächlichem Pyodide und Mobilansicht,
Grundlagenlinks, Veröffentlichung. Danach weitere 15 Einheiten.


## Schritt 15: Browserabnahme L1.4

Abgeschlossen: sieben Modellreihen bis zum Ende im Browser geprüft.
Pyodide-Sammelfunktion bestand vier Kriterien. Falsche Ganzzahldivision
in der Auswertungsfunktion wurde erkannt und vergab keine Analysepunkte;
korrekte Lösung bestand alle sechs Kriterien. Testausgaben sind nicht in
der Schülerausgabe sichtbar. Nach beiden Codeaufgaben 70 Punkte, nach
allen Fragen 100; erst Abschluss öffnet L1.5. Neuladen erhält lokal
400 Gesamtpunkte, Code und Schreibtischtest. Mobil bei 390 Pixeln kein
Seitenüberlauf; Tabelle ist innerhalb ihres Bereichs scrollbar. Desktop
1440 Pixel visuell geprüft. Neue PythonLab-Hilfe zu Vergleichen/if anhand
der tatsächlichen Lektion online geprüft; for/return waren bereits geprüft.
Kleine Textkorrekturen: Singular für eine Messung und klarer Endzustand
des Modellbuttons.

Offen: Version 0.6.0 dokumentieren, letzte Prüfung nach Textänderung,
GitHub-Push und Onlineabnahme. Danach L1.5, weitere 15 Einheiten offen.


## Schritt 16: Version 0.6.0 vorbereitet

Abgeschlossen: README, zentrale Dokumentation, Aufgabenliste, Materialmatrix
und Bildquelle aktualisiert. Veröffentlichungsworkflow nimmt analysis-model.js
mit auf. Letzte Textänderungen im Browser neu geladen und geprüft: Singular
bei einem Wert, eindeutiger Abschlussbutton, Bild geladen, keine JS-Fehler.

Offen: finaler Syntax-/Diff-Lauf, GitHub-Push, Deployment und Onlineprüfung.
Weitere Inhalte und Bilder für 15 Einheiten bleiben offen.


## Schritt 17: Version 0.6.0 veröffentlicht und online geprüft

Abgeschlossen: 7ef7e93 gepusht, Workflow 37671271355 erfolgreich mit
30 Tests und Pages-Deployment. Beide Python-Aufgaben auf GitHub Pages
ausgeführt: vier und sechs Kriterien erfüllt. Entwicklerzugang verändert
den echten Lernstand nicht (weiter 0 Punkte). Online-Modell für Training
und leere Eingabe geprüft, Ergebnis 0 / 42 / 126 / 21 korrekt. Keine
JS-Fehler, Foto vollständig geladen. Testcode auf Starter zurückgesetzt.
Screenshot `.tmp/algolab-0-6-analysis-lesson.png` zeigt die neue Einheit.
Dokumentation hält Quellen, Aufgaben, Testumfang und Veröffentlichung fest.

Als Nächstes: L1.5 anhand Volleyball Positionen tauschen ausarbeiten.
Hilfsvariable, fehlerhaftes Überschreiben und korrektes Vertauschen
interaktiv zeigen; passende Codeaufgabe und eigenes Fotomotiv ergänzen.
Weitere 15 Einheiten mit Motiven und vollständige BPE7-Abnahme sowie
Datei-Export-Rundlauf bleiben offen. Gesamtziel weiterhin aktiv.

## 19. Oktober 2026 – Profil, NAGOLD und gemeinsame Agentenübergabe

Bearbeiter: Codex. Auftrag von Jakob: Claude über denselben Arbeitsstand
beteiligen und Profil/NAGOLD wie Excel-Lab mit JSON-Sicherung ermöglichen.

Abgeschlossen: AGENTS.md, CLAUDE.md und TASKS.md als gemeinsame Übergabe
angelegt. Excel-Lab unter Codex/Tabellenkalkulation/Excel-Lab gesichtet;
NAGOLD-Regeln und Tabellenmodul für AlgoLab angepasst. Profil mit Kürzel und
Klasse, NAGOLD-Jahresziel, automatische 5 NAGOLD pro Abschluss, Anwesenheit,
Startkapital und editierbare Tabelle mit sofortiger Speicherung ergänzt.
JSON enthält alle Profildaten, NAGOLD, Antworten, Abschlüsse, Notizen und
Codeentwürfe. Alte AlgoLab-Dateien bleiben lesbar; ungültige NAGOLD-Dateien
werden vor dem Ersetzen vollständig zurückgewiesen. Version 0.7.0 und
Veröffentlichungsworkflow angepasst.

Prüfstand: 35/35 Tests, Syntax aller JavaScript-Dateien, Diff-Prüfung.
Browser: echter Download, Wiederherstellung in frischem Browserkontext,
Neuladen, automatische Speicherung, negative NAGOLD, letzte gültige Zeile
bei ungültiger Korrektur, Löschen und ungültiger Import ohne Datenverlust.
Desktop 1440 und Mobil 390 Pixel visuell geprüft, mobile Tabelle ohne
horizontalen Überlauf, keine JavaScript-Fehler. Prüfdateien lokal in .tmp/.

Offen: Commit, Push, Pages-Veröffentlichung und Onlineabnahme. Claude wurde
nicht direkt gestartet/kontaktiert; beide Agenten sollen beim Einstieg die
gemeinsamen Dateien lesen und aktualisieren. Danach L1.5 wie zuvor geplant.

## 19. Oktober 2026 – Konkrete Übergabe an Claude

Bearbeiter: Codex. Auf Jakobs Auftrag docs/claude-handoff.md erstellt und in
CLAUDE.md sowie TASKS.md verlinkt. Übergabe umfasst Projektpfade, lokale
Version 0.7.0, nicht committete Änderungen, Architektur, Profil-/NAGOLD-Regeln,
Altdatei-Migration, bisherigen Prüfstand und konkrete nächste Schritte für
RELEASE-01 und CONTENT-05. Lokalen Git- und Dokumentationsstand erneut gelesen;
keine Codeänderung, kein Commit/Push und keine neue Browserabnahme in diesem
Dokumentationsschritt. Diff-Prüfung durchgeführt. Claude wurde nicht direkt
gestartet oder kontaktiert; die Datei ist für seinen nächsten Projekteinstieg.

## 19. Oktober 2026 – Version 0.7.0 veröffentlicht und online geprüft

Bearbeiter: Claude. Übergabe gelesen und Stand abgeglichen. `git fetch`
scheiterte an 155 von Google Drive erzeugten `desktop.ini` in `.git/`
(`bad object refs/desktop.ini`); diese reinen Ordnersymbol-Dateien nur in
`.git/` entfernt. Danach main = origin/main = 76c8b98. Vor dem Commit erneut
35/35 Tests, Syntax aller JS-Dateien und `git diff --check` bestanden.
Auf Jakobs Freigabe Commit 349053b gepusht; GitHub Actions Build und Deploy
erfolgreich. Online geprüft: Fußzeile 0.7.0, nagold.js/nagold-table.js/
progress.js mit Status 200, Profil und NAGOLD-Tabelle öffnen, keine
Konsolenfehler. Kein erneuter Datei-Rundlauf online (Codeänderung gegenüber
dem lokal geprüften Stand: keine).

Neue Anforderung von Jakob: gemeinsame Ergebnissicherung, in der Lehrkraft
und Schüler besprochene Ergebnisse festhalten und einsehen (bisher geteilte
Word-Datei). Als RESULTS-01 in TASKS.md aufgenommen; Plattformentscheidung
offen.

## 19. Oktober 2026 – Gemeinsame Ergebnissicherung (0.7.1 lokal)

Bearbeiter: Claude. Jakob nutzt ein einziges geteiltes Word-Dokument mit
Überschriften je Aufgabe (Aufgabe 1, 2, 3 → 3.1.1 usw.). Umsetzung als Link,
nicht als eigener Speicher: Eine Website ohne Server könnte gemeinsame
Schülereinträge nur über einen externen Dienst speichern, was eine
Datenschutzfreigabe der Schule erfordern würde. Zentrale Einstellung
`results.url` in learning-path.js; Seitenleisteneintrag mit neuem Symbol
`notes` und Abschnitt „Ergebnisse sichern“ je fertiger Einheit mit
Abschnittshinweis aus den Materialnummern. Version 0.7.1, neue Tests in
tests/results.test.cjs. 37/37 Tests, Syntax, Diff und Edge-Prüfung
(Desktop/Mobil, mit und ohne Link) bestanden. Freigabelink von Jakob und
Bestätigung der Abschnittszuordnung stehen aus; danach Link eintragen,
veröffentlichen und online prüfen.

## 19. Oktober 2026 – Ergebnissicherung je Klasse (0.7.1 lokal)

Bearbeiter: Claude, Gaming-Laptop. Beim Einstieg hatte Google Drive erneut
164 `desktop.ini` in `.git/` angelegt (`git fetch` scheiterte); nur diese
entfernt, main = origin/main = b1ac3c7. Ein Git-Objekt war kurzzeitig nicht
lesbar (Drive-Synchronisation), danach `git fsck` ohne Fehler.

Jakob hat zwei inhaltsgleiche Word-Dokumente für J2 INF1 und J2 INF2 in
seinem persönlichen OneDrive (`Dokumente\Codex\AlgoLab`) angelegt und
freigegeben; nur fachliche Inhalte. `results.url` durch `results.documents`
(Bezeichnung, Suchbegriff, Link) ersetzt; `resultDocuments(className)` liefert
das passende Dokument oder alle zur Auswahl. Zwei Seitenleisteneinträge, die
Lektion zeigt je Dokument eine Schaltfläche und aktualisiert sich nach einer
Profiländerung sofort. Platzhalter der Profilklasse jetzt „z. B. J2 INF1“.
39/39 Tests, Syntax, Diff, Browserprüfung Desktop und Mobil 375 bestanden.
Offen: Abschnittsnamen (Dokumente beginnen mit „Aufgabe 1/2“), Bearbeitungs-
recht der Freigabelinks, dann Commit/Push und Onlineabnahme.

## 19. Oktober 2026 – Lernfortschritt 1 vollständig (0.8.0)

Bearbeiter: Claude, Gaming-Laptop, auf Jakobs Auftrag autark. Material
L1_3.4 (Tauschen), L1_3.5/3.6 (Einfügen/Entfernen inkl. Informationsblätter)
und L1_4.1 (Schreibtischtest) ausgewertet, ebenso Ich-kann-Liste L1
(2.9–2.12) und Aktualisierungsliste.

- Neues Modul `array-ops-model.js`: Schrittspuren für Tauschen (mit und ohne
  Hilfsvariable), Einfügen (append + Tauschschleife wie im Material), Entfernen
  (Nachrücken + pop), Umdrehen sowie bereits Bubble Sort, Selection Sort,
  lineare und binäre Suche für L2. Generischer Renderer `unit.stepLab` in
  app.js mit Codezeilen-Markierung, Feldzuständen, Variablen und Zurück-Taste.
- L1.5, L1.6, L1.7 mit Lernsituation, Beispielen, Schritt-Modell,
  Reflexionen (Schreibtischtests aus L1_4.1) und je 100 Punkten.
  Python-Aufgaben arbeiten mit Parametern statt input; Prüfungen testen
  Randfälle und schließen fertige Hilfen (insert, del, remove, pop(index),
  reverse, Slicing) aus. Neue Prüfhelfer in python-checks.js.
- Startseiten-Hinweis zählt fertige Einheiten automatisch.

Prüfstand: 48/48 Tests (neu: tests/array-ops-model.test.cjs, Aufgaben-
prüfungen mit Richtig- und Falschlösungen, Punktsumme je Einheit), Syntax,
Diff. Browser: L1.5–L1.7 im Entwicklermodus, alle Modellfälle bis zum Ende
durchgeklickt, Tauschaufgabe in Pyodide bestanden, keine Konsolenfehler.
Kein Fotomotiv für L1.5–L1.7 (kein Bildgenerator in dieser Umgebung).

## 19. Oktober 2026 – Lernfortschritt 2 vollständig (0.9.0)

Bearbeiter: Claude. Material L2_1 bis L2_4.4 (Informationsblätter,
Arbeitsaufträge, Lösungen, Python-Lösungen) und Ich-kann-Liste L2
ausgewertet; Aktualisierungen 2022–2025 berücksichtigt (z. B. Struktogramme
Selection Sort absteigend, lineare Suche). Alle acht L2-Einheiten mit
Lernsituation, Beispielen, Schrittmodell, Reflexionen und 100 Punkten.
Python-Aufgaben statt input mit Parametern; Prüfungen mit Randfällen und
Ausschluss fertiger Hilfen (sort, sorted, min, max, index, in, count,
bisect, remove, del). Binäre Suche: Prüfliste zählt Zugriffe (≤ 40 bei
1024 Elementen), damit eine lineare Suche nicht als binäre durchgeht.
Neue Prüfhelfer __algolab_returns__, __algolab_compares__; Zählmodell.
Prüfstand: 57/57 Tests, Syntax, Diff; im Browser alle 34 Modellfälle von
L2 bis zum Ende durchgeklickt, binäre Suche in Pyodide bestanden.

## 19. Oktober 2026 – Gestaltung der Lerneinheiten (0.9.1)

Bearbeiter: Claude. Ziel: professioneller, für die Oberstufe angemessener
und leichter zu überblickender Aufbau der Lektionsseiten.

- Kopf: Kennzahlen-Chips (Pflichtaufgaben, Python-Aufgaben, Materialbezug).
  Einheiten ohne Foto erhalten ein grafisches Banner im Stil der Seite
  (Einheitenkürzel als Konturschrift, Arrayfelder aus dem ersten
  Modellbeispiel, Rasterhintergrund, Bewegung abschaltbar über
  prefers-reduced-motion).
- Mission und Lernziele stehen nebeneinander (mobil untereinander).
- Arbeitsschritte werden automatisch fortlaufend nummeriert (vorher
  doppelte „2 ·“). Eine klebende Kapitelleiste springt zu Verstehen,
  Ausprobieren, Erklären, Überprüfen (mit Zähler bestandener Aufgaben),
  Sichern und Abschließen und markiert den aktuellen Abschnitt.
- Code-Editor: Tab/Umschalt+Tab rücken (auch mehrere Zeilen) ein und aus,
  Enter übernimmt die Einrückung (nach Doppelpunkt +4), Strg+Enter führt
  aus, Esc und dann Tab verlässt den Editor (Tastaturbedienbarkeit),
  „Startcode wiederherstellen“ mit Rückfrage.
Geprüft: 57/57 Tests; Browser Desktop und 375 px ohne Überlauf, hell und
dunkel, Tastatureingaben im Editor mit echten Tastendrücken.

## 19. Oktober 2026 – Alle 19 Einheiten (1.0.0)

Bearbeiter: Claude. Material L3_1 bis L3_4.2 (Informationsblätter,
Arbeitsaufträge, Lösungen) und Ich-kann-Liste L3 ausgewertet. Neues Modul
ds-model.js mit Schrittspuren für verkettete Liste, Stapel und Warteschlange
sowie Baumanalyse; Darstellung im bestehenden Schrittmodell (Daten | Zeiger
mit Anker/NULL, Stapelkiste, Warteschlange mit vorne/hinten) und neuer
Baum-Prüfstand (SVG, Tabelle, Vorhersagequiz mit Begründung). L3.1–L3.4 mit
Lernsituation, Beispielen, Reflexionen und je 100 Punkten. Materialmatrix
für L1.5–L3.4 ergänzt. Startseitenhinweis passt sich an.
Prüfstand: 64/64 Tests (neu: tests/ds-model.test.cjs, tests/l3-content.test.cjs),
Syntax, Diff; Browser: alle Modellfälle von L3 durchgeklickt, Baum-Prüfstand
für sechs Bäume, Backspace-Aufgabe in Pyodide bestanden, keine Konsolenfehler.

## 19. Oktober 2026 – Offene Punkte abgearbeitet (1.0.1)

Bearbeiter: Claude, auf Jakobs Auftrag autark.
- Veröffentlichung: GitHub Actions/Pages waren über eine Stunde gestört
  („degraded performance“). Nach Normalisierung lief e312881 erfolgreich;
  1.0.0 online abgenommen (alle Dateien 200, Modelle L1.5/L2.6/L3.1,
  Baum-Prüfstand, Python-Aufgabe L3.3 in Pyodide, keine Konsolenfehler).
- Ergebnissicherung: Die beiden Word-Dokumente waren byte-identisch, die
  INF2-Kopfzeile nannte INF1. Beide gegliedert (Lernfortschritt als
  Überschrift 1, 40 Materialaufgaben als Überschrift 2 mit Seitenumbrüchen),
  Jakobs Überschriften „Aufgabe 1/2“ erhalten, Kopfzeile INF2 korrigiert.
  Nur ersetzt, nachdem die Originale unverändert waren; in Word geprüft;
  Sicherung in .tmp/docx-backup-2026-10-19 und OneDrive-Versionen.
  Website-Hinweise eindeutig „Lernfortschritt n → Aufgabe x“ (neuer Test).
- Bildungsplan: PDF ohne Zusatzsoftware mit eigenem Textauszug gelesen;
  Abgleich in docs/bildungsplan-abgleich.md, REVIEW-01 erledigt.
- Themenbanner für die 15 Einheiten ohne Foto.
- Übergabe von Codex als überholt gekennzeichnet.
Prüfstand: 65/65 Tests, Syntax, Diff; Banner aller 15 Einheiten im Browser
geprüft (hell/dunkel).
Online-Abnahme 1.0.1 (944f7f1): Fußzeile und Inhaltsversion 1.0.1, Banner
L1.5/L2.3/L2.6/L3.2/L3.4, neue Abschnittshinweise, keine Konsolenfehler.

## 19. Oktober 2026 – Struktogramme, Ich-kann-Listen, Vertiefung (1.1.0)

Bearbeiter: Claude, autarker Ausbau. Operatorenliste für Struktogramme (BW,
v2.2, 01.09.2024) mit eigenem PDF-Textauszug gelesen; Ich-kann-Listen L1–L3
und die bisher ungenutzten Vertiefungs-/Zusatzaufgaben (L1_4.2, L1_4.3, L1_5,
L2_4.3, L2_4.4) samt Musterlösungen ausgewertet.
- Struktogramme: Datenmodell (Anweisung, Schleife, Verzweigung) mit Bezug auf
  die Python-Zeilen jedes Modells; Darstellung als Nassi-Shneiderman-Diagramm
  mit Bedingungsdreieck und J/N; Umschalter im Schrittmodell.
- Ich-kann-Listen: Inhalte, Bewertungen (☐/✓/✓✓), neue Seite und
  Ich-kann-Check je Einheit; Validierung beim Import.
- Vertiefung: sieben freiwillige Codeaufgaben, Referenzwerte mit den
  Musterlösungen berechnet (Kapitalrechner 60723,37 €, Jahrgänge 2000–2010).
- Fehler behoben: Editor-Werkzeugzeile wurde beim Tippen überschrieben;
  falscher Zeilenbezug der linearen Suche ohne Abbruch.
Prüfstand: 75/75 Tests (neu: Struktogramm-Abdeckung und -Notation,
Selbsteinschätzung, Zusatzaufgaben mit Referenz- und Falschlösungen),
Syntax, Diff; Browser: Struktogramm-Ansicht, Ich-kann-Liste und
Zusatzaufgabe mit random in Pyodide.
Online-Abnahme 1.1.0 (a3b079c): Version 1.1.0, 45 Ich-kann-Aussagen, Struktogramm-Umschalter mit markiertem Block, Zusatzaufgaben, keine Konsolenfehler.

## 19. Oktober 2026 – Glossar (1.2.0)

Bearbeiter: Claude. Glossar mit 56 eigenständig formulierten Begriffen
(Grundlage: Informationsblätter L1–L3, Operatorenliste BW v2.2), Seite
#glossar mit Suche und Themenfilter, Symbol „book“ in assets/icons.svg.
Prüfstand: 77/77 Tests, Syntax, Diff; Browser Desktop und 375 px ohne
Überlauf, Suche („lifo“ → Stapelspeicher, LIFO), Filter „Bäume“ (11).
Online-Abnahme 1.2.0 (9bb02bb): Version 1.2.0, Glossar-Suche („zeiger“ → 3 Treffer), Symbol geladen, keine Konsolenfehler.

## 19. Oktober 2026 – Bereich „Programmieren“ (1.3.0)

Bearbeiter: Claude, auf Jakobs Auftrag („Bereich für das Programmieren mit
Python wie in PythonLab“). PythonLab (0.21.0, D:\Google Drive\Codex\PythonLab)
untersucht: Reiter „Üben“ mit Aufgabenkatalog und Filtern, Aufgabenseite mit
Editor, Ausgabe-/Eingabereiter, Starten/Prüfen, Prüftypen tests/output/
outputNumber, tolerante Ausgabeprüfung, lokaler Lerncoach, optionaler
Gemini-Coach. Für AlgoLab übernommen und an BPE 7 angepasst: neue Dateien
practice.js (17 Aufgaben, 6 Werkstattvorlagen) und practice-check.js
(Ausgabeprüfung, Diagnosen, gestufte Hinweise); Testfälle statt einzelner
Prüfeingabe; Syntaxbaum-Regeln statt Textsuche. Ohne KI-Coach.
Python-Worker um input() mit Eingabezeilen und assert-Testcode erweitert,
versionierte Worker-/Helfer-Adressen. Lernstand practice.solved/drafts.
Prüfstand: 85/85 Tests, Syntax, Diff. Browser: Katalog und Filter, Starten
mit Eingabe-Echo, Fehlversuch (in mnr) mit Meldung, Lösung bestanden und
gespeichert, Tupeltausch abgelehnt, Werkstatt (Vorlage binäre Suche,
IndexError-Erklärung, Endlosschleife nach 5 s gestoppt), Lektionsaufgabe
L2.6 weiterhin bestanden, 375 px ohne Überlauf.
Online-Abnahme 1.3.0 (4f369a5): Version 1.3.0, practice.js/practice-check.js/python-worker.js/python-checks.js Status 200, Aufgabe „Habe ich gewonnen?“ mit Eingabe gestartet und alle 5 Testfälle live bestanden, keine Konsolenfehler.
