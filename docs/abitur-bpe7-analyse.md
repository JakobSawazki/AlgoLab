# Abitur Informatik (Berufliches Gymnasium BW) – Analyse der BPE-7-Anteile

Stand: 20. Oktober 2026. Ausgewertet von Claude für die Klausurvorbereitung in AlgoLab.

**Grundlage:**

- schriftliche Abiturprüfungen 2020-21 bis 2025-26 (Haupt- und Nachtermine)
- Musterprüfung „Abitur ab 2024“ mit kommentiertem Erwartungshorizont
- Anlage 3 (Stoffgebiete Abitur 2027 und 2028)
- Operatorenliste des Bildungsplans 2020

Die Originale liegen nur lokal in `resources/onenote-lernfelder/` (nicht veröffentlicht). Dieses Dokument fasst Aufgabentypen und Anforderungen in eigenen Worten zusammen und übernimmt keine Aufgabentexte.

## 1. Prüfungsrahmen

| Merkmal | Festlegung |
| --- | --- |
| Prüfungsrelevant (2-stündiges Fach) | BPE 5 Grundlagen der Programmierung, BPE 6 Relationale Datenbanken, **BPE 7 Algorithmen und Datenstrukturen**, BPE 8 Gesellschaftliche Aspekte |
| Dauer, Umfang | 210 Minuten, 80 BE; drei Aufgaben zu je 40 BE, zwei davon werden gewählt (bis 2023: 30 BE je Aufgabe) |
| Aufbau | Aufgabe 1 schwerpunktmäßig BPE 6 (SQL, ERM, Normalformen); Aufgaben 2 und 3 mischen BPE 5, 7 und 8, häufig ergänzt um einen SQL-Block |
| Hilfsmittel | PC mit Entwicklungsumgebung, Office, DBMS, Datenbank-Skripte; **Operatorenliste für Struktogramme (ab v2.2)**; Rechtschreibwörterbuch. Keine KI, keine Kommunikation, keine IDE, die Struktogramme automatisch aus Code erzeugt oder umgekehrt |
| Programmierung | Im **schriftlichen** Abitur wird Programmierung **nicht quellcodeorientiert** geprüft (Musterprüfung, Vorwort). Algorithmen werden als Struktogramm erstellt, gelesen und getestet; Python dient zum Ausprobieren am PC |
| Gewichtung AFB (Musterprüfung, Aufgabe 2) | etwa 20 % AFB I, 55 % AFB II, 25 % AFB III |

**Folgerung:** Für BPE 7 zählt im Abitur das sichere Arbeiten mit **Struktogrammen nach Operatorenliste v2.2**:

- lesen und Ausgaben nennen;
- Variablenwerte dokumentieren;
- erstellen, erweitern und vervollständigen;
- Fehler überprüfen.

Dazu kommen das **Handsimulieren** von Sortier- und Suchverfahren und das **Modellieren** dynamischer Datenstrukturen. Python bleibt Werkzeug zum Testen der eigenen Idee.

## 2. Wiederkehrende Aufgabentypen mit BPE-7-Bezug

| Aufgabentyp | Typische Operatoren | BE | Vorkommen |
| --- | --- | --- | --- |
| Struktogramm mit Array lesen und Ausgabe nennen (auch Zeichenketten, mehrere Arrays) | nennen, angeben | 2–5 | in jeder Prüfung |
| Variablenbelegung bzw. Arrayinhalt während des Ablaufs dokumentieren (Tabelle „Durchlauf, i, summe …“) | dokumentieren | 2–5 | Muster, 2021-22, 2022-23, 2023-24 |
| Rückwärts denken: Eingabe bzw. Arraybelegung für ein vorgegebenes Ergebnis | nennen, erklären | 1–3 | Muster, 2021-22, 2022-23, 2023-24 |
| Array-Algorithmus als Struktogramm erstellen oder ein Grundgerüst erweitern (zählen, Maximum, Summe, Durchschnitt mit Sonderregeln wie „höchster und niedrigster Wert gestrichen“ oder „doppelt gewichtet“, „alle Werte größer als …?“, Array per Schleife befüllen, rückwärts ausgeben) | erstellen, entwerfen, erweitern, vervollständigen, entwickeln | 4–8 | in jeder Prüfung |
| Bubble Sort von Hand: Reihenfolge nach jeder Bubble-Phase, Tabelle mit einer Zeile je Vertauschung, Anzahl Vergleiche und Vertauschungen | nennen, bestimmen, ermitteln | 2–5 | Muster, 2023-24 (Haupt- und Nachtermin), 2025-26 |
| Belegung entwerfen, die sich bei Bubble Sort auf bestimmte Weise verhält (z. B. erst nach der 2. Phase sortiert) | entwerfen | 2 | 2025-26 |
| Gegebenen Sortieralgorithmus (z. B. Selection Sort als Struktogramm) erläutern | erläutern | 4 | 2024-25 |
| Warteschlange mit `ENQUEUE`/`DEQUEUE` bzw. `enqueue()`/`dequeue()` über eine Ereignisliste (auch zwei Warteschlangen mit Vorrang): wer wann bearbeitet wird, wer noch wartet, Behauptung überprüfen | nennen, bestimmen, beschreiben, überprüfen | 3–6 | 2021-22, 2022-23, 2025-26 |
| Stapelspeicher mit `push`/`pop` (Lager, Automat, Turm-Spiel): Bestand, oberstes Element, Befehlsfolge darstellen | nennen, beschreiben, darstellen | 2–4 | Muster, 2021-22 |
| Verkettete Liste darstellen und Aktualisierung (Element ersetzen) beschreiben | darstellen, beschreiben, erläutern | 3–5 | 2022-23, 2024-25 |
| Binärbaum: Begriff definieren, voll und vollständig überprüfen, sortierten (vollen, vollständigen) Baum aus Knoten entwerfen oder zeichnen, Baum-Eigenschaft nach zusätzlicher Kante begründen | definieren, überprüfen, entwerfen, zeichnen, begründen | 2–3 | Muster, 2022-23, 2024-25 |
| Struktogramm auf logischen Fehler überprüfen und korrigieren | überprüfen, Stellung nehmen, erweitern | 2–4 | Muster, 2022-23 |

Ebenfalls in jeder Prüfung, aber außerhalb von BPE 7:

- **BPE 5:** EVA-Struktogramme mit Verzweigungen und Schleifen; Roboter- bzw. Spielfeldaufgaben mit Aktionen und Sensoren.
- **BPE 8:** Stellungnahmen zu Algorithmen und KI.
- **Graphen:** Grad, Wege, Modellierung.

## 3. Operatoren (Bildungsplan 2020, Operatorenliste Informatik)

Häufig in BPE-7-Aufgaben: **nennen** (I–II), **beschreiben** (I–II), **darstellen** (I–II), **erstellen** (II; laut Musterprüfung „gemäß vorgegebener Syntax darstellen“, I–II), **dokumentieren** (II–III: alle Erklärungen, Herleitungen, Skizzen), **bestimmen** (II–III), **ermitteln** (I–II), **erläutern/erklären** (I–II), **erweitern** (II–III), **vervollständigen** (I–II), **entwerfen** (II–III), **entwickeln** (II–III, Lösungskonzept begründend skizzieren), **überprüfen** (II–III), **begründen** (II), **definieren** (II–III), **zeichnen** (I–II), **Stellung nehmen** (III).

## 4. Abgleich mit AlgoLab (Stand 1.7.0) und Folgerungen

AlgoLab deckt alle BPE-7-Inhalte ab, also Arrays, Bubble und Selection Sort, lineare und binäre Suche, verkettete Liste, Stapel, Warteschlange und Baum. Es gibt Struktogramme nach v2.2 und ein Struktogramm-Training mit Lücken und Reihenfolge. Was fehlte, war das **Prüfungsformat**:

1. Es fehlten Aufgaben mit **Operator, BE und AFB** und ein Erwartungshorizont zum Selbstabgleich.
2. **Handsimulation** in Tabellenform kam zu kurz: Variablentabelle, Phasen und Vertauschungen sowie Vergleiche und Vertauschungen zählen.
3. Es gab keine Aufgaben zum **Rückwärtsdenken** (Eingabe zum Ergebnis, Belegung entwerfen).
4. **Struktogramme selbst erstellen** wurde nur in Lücken- und Ordnungsform geübt. Für freie Entwürfe braucht es einen Musterentwurf, Bewertungskriterien und optional einen Python-Test, wie ihn die Prüfungsumgebung erlaubt.
5. Es fehlte ein **Prüfungsmodus**: Zeit nach BE, keine KI-Hilfe wie im Abitur, Auswertung in BE mit Orientierung am Notenschlüssel.

Umsetzung in 1.8.0: Bereich **Klausurvorbereitung** (`#klausur`, Daten in `exam.js`). Er enthält:

- den Prüfungsrahmen und eine Strategie für die Prüfung;
- ein Operatoren-Training;
- drei Übungsklausuren (Arrays und Struktogramme, Sortieren und Suchen, Datenstrukturen) mit eigenen, abiturnahen Aufgaben.

Die Aufgaben werden automatisch geprüft, wo die Antwort eindeutig ist. Offene Teile vergleichen die Lernenden mit Erwartungshorizont und Kriterien. Der Struktogramm-Renderer erkennt jetzt auch „Deklaration und Einlesen“.
