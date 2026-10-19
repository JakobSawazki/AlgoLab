# Abgleich mit dem Bildungsplan BPE 7

Stand: 19. Oktober 2026, AlgoLab 1.0.0. Bearbeiter: Claude.

Quelle: Bildungsplan Berufliches Gymnasium, Informatik, Jahrgangsstufe 2,
K.u.U., LPH Nr. 2/2020 Reihe I Nr. 40 Band 2 vom 23.07.2020, Seiten 17 und 18
(lokal: `D:\Google Drive\Codex\PythonLab\resources\29-TB02-Inhalt-Band 2a-AG-3 Informatik.pdf`).
Der Text wurde mit einem eigenen PDF-Textauszug gelesen; Formulierungen unten
sind zusammengefasst, nicht wörtlich übernommen.

Zeitrichtwert BPE 7: 30 Stunden. AlgoLab umfasst 19 Einheiten zu je 100 Punkten.

## Leitgedanke BPE 7

| Anforderung | Umsetzung in AlgoLab | Bewertung |
| --- | --- | --- |
| Datenstrukturen Array, verkettete Liste, Stapelspeicher, Warteschlange und Baum beschreiben | L1.1 (Überblick und Auswahl aller fünf Modelle), vertieft in L1.2–L1.7 (Array) und L3.1–L3.4 | erfüllt |
| Arrays in einer Programmiersprache am Gerät implementieren | Python im Browser (Pyodide) ab L1.2, 31 automatisch geprüfte Codeaufgaben, 58 Verständnisfragen, 37 Reflexionsfelder | erfüllt |
| Such- und Sortieralgorithmen zur Problemlösung anwenden | L2.2–L2.8 mit Anwendungsaufgaben (Lotto, Bestenliste, Mitgliedsnummern, Gewinnlose, Kader) | erfüllt |

## BPE 7.1 – Eindimensionale Arrays beschreiben, implementieren, Algorithmen entwerfen

| Inhalt laut Bildungsplan | Einheit | Nachweis |
| --- | --- | --- |
| Deklaration und Initialisierung | L1.2 | Beispiel „Anlegen und initialisieren“, Codeaufgabe Teamwerte |
| Grundlagen, z. B. Länge des Arrays | L1.2 | len, letzter Index = Länge − 1, Check „laenge“ |
| Zugriff über den Index-Operator | L1.2, L1.5 | Arraymodell, Positions-/Indexumrechnung, Tauschaufgabe |
| Zugriff über eine Schleife | L1.3 | Schleifenmodell, zeige_liste mit range(len(...)) |
| Algorithmen zur Problemlösung entwerfen | L1.4–L1.7 | Minimum/Maximum/Durchschnitt, Tauschen, Einfügen, Entfernen, Schreibtischtests |

## BPE 7.2 – Sortier- und Suchalgorithmen erläutern, anwenden, implementieren

| Inhalt laut Bildungsplan | Einheit | Nachweis |
| --- | --- | --- |
| Sortierung: Selection Sort | L2.3 | Schrittmodell (auf-/absteigend, Texte), Codeaufgaben selection_sort und absteigend |
| Sortierung: Bubble Sort | L2.2 | Bubble-Phasen im Modell, Codeaufgaben Bubble Sort und Optimierung |
| Suche: lineare Suche | L2.5 | Modell mit/ohne Abbruch, Mitgliedsprüfung, Verschlüsselung |
| Suche: binäre Suche | L2.6 | Modell inkl. erfolgloser Suche, Codeaufgabe mit Prüfung des Halbierens |
| Erläutern und Anwenden | L2.1, L2.4, L2.7, L2.8 | Algorithmusbegriff, Fehleranalyse, Vergleich der Verfahren, Kombination mit Tauschen/Entfernen |

## BPE 7.3 – Dynamische Datenstrukturen beschreiben und modellieren

| Inhalt laut Bildungsplan | Einheit | Nachweis |
| --- | --- | --- |
| Listen: Eigenschaften (Anker, Knoten, Daten, Zeiger) | L3.1 | Zeigermodell „Daten / Zeiger“ mit Anker und NULL |
| Listen: Operationen (Einfügen, Löschen) | L3.1 | Einfügen Anfang/Mitte/Ende, Fehlerfall Zeigerreihenfolge, Löschen; Codeaufgabe einfuegen_nach |
| Stapelspeicher: Operationen | L3.2 | PUSH/POP-Modell, Browserverlauf, Backspace-Codeaufgabe |
| Warteschlange: Operationen | L3.3 | ENQUEUE/DEQUEUE-Modell, Taxistand, FIFO-Prüfung |
| Aufbau von Bäumen: geordnet, voll, vollständig | L3.4 | Beispiele und Baum-Prüfstand (voll, vollständig, sortiert); „geordnet“ als Unterscheidung links/rechts samt Ordnungsrelation erklärt |
| Modellierung von Bäumen, z. B. Stammbaum, Organigramm | L3.4 | Reflexionen Sportverein und Musikstile, Ordnerstruktur und Turnierplan im Prüfstand |
| Binärbäume: Eigenschaften | L3.4 | Definition, tabellarische Darstellung, Codeaufgaben Blätter und „voll“ |

Gemäß Operatoren („beschreiben und modellieren“) verlangt AlgoLab in BPE 7.3
keine Klassenimplementierung. Die Python-Aufgaben modellieren Zeiger, Stapel,
Warteschlangen und Bäume mit Listen und Tabellen.

## Nicht Pflicht, aber angebunden

- VIP-Bereich (Vertiefung): Verschlüsselungsalgorithmen werden in L2.5
  (Substitution) angerissen. Graphenalgorithmen (Dijkstra, Breiten- und
  Tiefensuche) sind nicht Teil von AlgoLab.
- BPE 8 (Gesellschaftliche Aspekte, Graphen) gehört nicht zum Umfang; L3.4
  grenzt Graphen (mehrere Wege zwischen Knoten) bewusst vom Baum ab.

## Ergebnis

Alle Inhalte von BPE 7.1 bis 7.3 sind abgedeckt. Offen bleiben Punkte, die
nur im Unterricht geklärt werden können: Erprobung mit den Klassen,
Zeitbedarf je Einheit im Verhältnis zum Richtwert von 30 Stunden und
Rückmeldungen zur Schwierigkeit der Codeaufgaben.
