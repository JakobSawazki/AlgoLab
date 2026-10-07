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
