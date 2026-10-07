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
