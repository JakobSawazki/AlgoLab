(function (root) {
  "use strict";
  // Bereich „Programmieren“: freie Programmieraufgaben nach dem Vorbild von PythonLab („Üben“).
  // Die Aufgaben folgen den Arbeitsaufträgen des BPE-7-Materials und lesen Eingaben mit input().
  // check.type: "output" (tolerante Ausgabeprüfung je Testfall) oder "number" (letzter Zahlenwert).
  // testCode enthält optionale assert-Prüfungen, die nach dem Programm im selben Namensraum laufen.
  const kader = '["Armin", "Batu", "Kai", "Sven", "Paul", "Milan", "Goran", "Chris", "Nico", "Dennis", "Emin", "Luca"]';
  // Prüfregeln werten den Syntaxbaum aus (Kommentare und Texte lösen keine Fehler aus).
  const forbidCalls = (names, message) => `assert not __algolab_calls__(${names.map(name => `"${name}"`).join(", ")}), "${message}"`;
  const forbidIn = (name, message) => `assert not __algolab_in__("${name}"), "${message}"`;
  const need = (condition, message) => `assert ${condition}, "${message}"`;
  const rules = (...lines) => lines.join("\n");
  const exercises = [
    { id: "noten-durchschnitt", topic: "Arrays", level: "Grundlagen", unit: "L1.4", source: "L1_2 / L1_3.3", numericInput: true,
      title: "Notendurchschnitt",
      description: "Fünf Noten einlesen, in einem Array speichern und den Durchschnitt ausgeben.",
      instructions: ["Lege eine leere Liste noten an.", "Lies mit einer for-Schleife fünf Noten mit float(input(...)) ein und hänge jede mit append an.", "Berechne die Summe in einer Schleife und gib den Durchschnitt aus."],
      hints: ["for i in range(5): wiederholt das Einlesen genau fünfmal.", "Die Summe startet bei 0 und wächst in einer zweiten Schleife um noten[i].", "Durchschnitt = summe / len(noten)."],
      starter: "noten = []\n\n# 1. Fünf Noten einlesen und anhängen.\n\n# 2. Summe bilden und Durchschnitt ausgeben.\n",
      input: "2\n3\n1\n4\n2",
      check: { type: "number", cases: [{ input: "2\n3\n1\n4\n2", expected: 2.4 }, { input: "1\n1\n1\n1\n1", expected: 1 }, { input: "6\n5\n4\n3\n2.5", expected: 4.1 }],
        testCode: rules(need('__algolab_calls__("append")', "Hänge jede Note mit append an die Liste an."), forbidCalls(["sum"], "Berechne die Summe selbst in einer Schleife.")) } },
    { id: "namen-rueckwaerts", topic: "Arrays", level: "Grundlagen", unit: "L1.3", source: "L1_3.1.2",
      title: "Namen rückwärts ausgeben",
      description: "Eine Namensliste einlesen und vom letzten zum ersten Index ausgeben.",
      instructions: ["Lies zuerst die Anzahl n mit int(input(...)) ein.", "Lies danach n Namen ein und hänge sie an die Liste namen an.", "Gib die Namen vom letzten zum ersten Index aus – jeden in einer eigenen Zeile."],
      hints: ["Der letzte Index ist len(namen) - 1.", "range(len(namen) - 1, -1, -1) zählt rückwärts bis einschließlich 0.", "Verwende keinen fertigen Rückwärts-Befehl, sondern den Index."],
      starter: "namen = []\nn = int(input(\"Anzahl der Namen: \"))\n\n# Namen einlesen\n\n# Rückwärts ausgeben\n",
      input: "3\nMila\nJonas\nSam",
      check: { type: "output", cases: [{ input: "3\nMila\nJonas\nSam", expected: "Sam\nJonas\nMila" }, { input: "1\nSolo", expected: "Solo" }, { input: "4\nA\nB\nC\nD", expected: "D\nC\nB\nA" }],
        testCode: rules(forbidCalls(["reverse", "reversed"], "Gib die Namen über den Index rückwärts aus, ohne reverse."), need('not __algolab_has__("Slice")', "Verwende kein Slicing wie [::-1], sondern den Index.")) } },
    { id: "positionen-tauschen", topic: "Arrays", level: "Grundlagen", unit: "L1.5", source: "L1_3.4", numericInput: true,
      title: "Startaufstellung umstellen",
      description: "Zwei eingegebene Spielerpositionen mit einem zwischenspeicher tauschen.",
      instructions: ["Lies zwei Positionen (ab 1 gezählt) mit int(input(...)) ein.", "Tausche die beiden Namen mit einem zwischenspeicher – denke an Position − 1.", "Rufe danach startaufstellung_ausgeben() auf."],
      hints: ["Position 2 gehört zu Index 1.", "Erst zwischenspeicher = spieler[position_b - 1], dann überschreiben, dann zurückschreiben.", "Die Ausgabefunktion ist schon fertig – du musst sie nur aufrufen."],
      starter: 'spieler = ["Armin", "Batu", "Kai", "Sven", "Paul", "Milan"]\n\ndef startaufstellung_ausgeben():\n    print("------------------------")\n    print("Neue Startaufstellung")\n    print("------------------------")\n    for i in range(len(spieler)):\n        print(spieler[i])\n\nprint("Startaufstellung umstellen")\nposition_a = int(input("Tausche Position: "))\nposition_b = int(input("mit Position: "))\n\n# Tauschen und Aufstellung ausgeben\n',
      input: "2\n4",
      check: { type: "output", cases: [
        { input: "2\n4", expected: "Startaufstellung umstellen\n------------------------\nNeue Startaufstellung\n------------------------\nArmin\nSven\nKai\nBatu\nPaul\nMilan" },
        { input: "1\n6", expected: "Startaufstellung umstellen\n------------------------\nNeue Startaufstellung\n------------------------\nMilan\nBatu\nKai\nSven\nPaul\nArmin" }],
        testCode: need('"zwischenspeicher" in __algolab_source__ and not __algolab_has__("Tuple")', "Tausche mit einer Hilfsvariablen zwischenspeicher, nicht mit der Kurzschreibweise a, b = b, a.") } },
    { id: "spieler-einfuegen", topic: "Arrays", level: "Vertiefung", unit: "L1.6", source: "L1_3.5", numericInput: true,
      title: "Einen Spieler einfügen",
      description: "Einen Namen an einem eingegebenen Index einfügen – mit append und Tauschschleife.",
      instructions: ["Lies Spielername und Index ein.", "Hänge den Namen mit append an.", "Tausche ihn rückwärts bis zum Index nach vorne und gib den Kader aus."],
      hints: ["for i in range(len(kader) - 1, index, -1) läuft vom Ende bis index + 1.", "Im Schleifenkörper tauschen kader[i - 1] und kader[i].", "insert ist hier nicht erlaubt – du sollst das Verschieben selbst programmieren."],
      starter: `kader = ${kader}\n\ndef kader_ausgeben():\n    print("------------------------")\n    print("Kader")\n    print("------------------------")\n    for i in range(len(kader)):\n        print(kader[i])\n\nspielername = input("Spielername: ")\nindex = int(input("Index: "))\n\n# Einfügen und Kader ausgeben\n`,
      input: "Tom\n6",
      check: { type: "output", cases: [
        { input: "Tom\n6", expected: "------------------------\nKader\n------------------------\nArmin\nBatu\nKai\nSven\nPaul\nMilan\nTom\nGoran\nChris\nNico\nDennis\nEmin\nLuca" },
        { input: "Ada\n0", expected: "------------------------\nKader\n------------------------\nAda\nArmin\nBatu\nKai\nSven\nPaul\nMilan\nGoran\nChris\nNico\nDennis\nEmin\nLuca" }],
        testCode: rules(forbidCalls(["insert"], "Füge ohne insert ein: append und Tauschschleife."), need('__algolab_calls__("append")', "Hänge den Namen zuerst mit append an.")) } },
    { id: "spieler-entfernen", topic: "Arrays", level: "Vertiefung", unit: "L1.7", source: "L1_3.6", numericInput: true,
      title: "Einen Spieler entfernen",
      description: "Den Spieler an einem eingegebenen Index entfernen und den Kader ausgeben.",
      instructions: ["Lies den Index ein.", "Lass alle folgenden Spieler um einen Platz nach vorne rücken.", "Entferne das letzte Feld mit pop() und gib den Kader aus."],
      hints: ["for i in range(index, len(kader) - 1): kader[i] = kader[i + 1]", "pop() ohne Index gehört hinter die Schleife.", "del, remove und pop(index) sind hier nicht erlaubt."],
      starter: `kader = ${kader}\n\ndef kader_ausgeben():\n    print("------------------------")\n    print("Kader")\n    print("------------------------")\n    for i in range(len(kader)):\n        print(kader[i])\n\nindex = int(input("Entferne Spieler an der Stelle mit dem Index: "))\n\n# Nachrücken, letztes Feld entfernen, ausgeben\n`,
      input: "4",
      check: { type: "output", cases: [
        { input: "4", expected: "------------------------\nKader\n------------------------\nArmin\nBatu\nKai\nSven\nMilan\nGoran\nChris\nNico\nDennis\nEmin\nLuca" },
        { input: "11", expected: "------------------------\nKader\n------------------------\nArmin\nBatu\nKai\nSven\nPaul\nMilan\nGoran\nChris\nNico\nDennis\nEmin" }],
        testCode: rules(forbidCalls(["remove"], "Lass die Spieler selbst nachrücken, ohne remove."), need('not __algolab_has__("Delete") and not __algolab_pop_index__()', "Nutze nur pop() ohne Index, kein del und kein pop(index).")) } },
    { id: "trainingsanalyse", topic: "Arrays", level: "Vertiefung", unit: "L1.4", source: "L1_3.3", numericInput: true,
      title: "Trainingsanalyse",
      description: "Sechs Dartwürfe einlesen und besten Wurf, schwächsten Wurf und Durchschnitt ausgeben.",
      instructions: ["Lies sechs Würfe mit int(input(...)) ein und speichere sie in einer Liste.", "Ermittle Maximum und Minimum mit Vergleichen in einer Schleife.", "Gib „Bester Wurf: …“, „Schwächster Wurf: …“ und „Durchschnitt: …“ aus."],
      hints: ["Starte bester und schwaechster mit wuerfe[0].", "Vergleiche jeden Wurf mit beiden Merkern.", "min, max und sum sind hier nicht erlaubt."],
      starter: "wuerfe = []\n\n# Sechs Würfe einlesen\n\n# Auswerten\n\n# Ausgeben\n",
      input: "18\n42\n0\n30\n12\n24",
      check: { type: "output", cases: [{ input: "18\n42\n0\n30\n12\n24", expected: "Bester Wurf: 42\nSchwächster Wurf: 0\nDurchschnitt: 21" }, { input: "60\n60\n57\n1\n20\n19", expected: "Bester Wurf: 60\nSchwächster Wurf: 1\nDurchschnitt: 36.1666" }],
        testCode: forbidCalls(["max", "min", "sum", "sorted", "sort"], "Ermittle die Werte selbst mit Vergleichen und einer Summe.") } },
    { id: "kfz-steuer", topic: "Algorithmen", level: "Grundlagen", unit: "L2.1", source: "L2_1", numericInput: true,
      title: "Kfz-Steuer mit Eingabe",
      description: "Antrieb, Hubraum und CO₂-Ausstoß einlesen und die Kfz-Steuer berechnen.",
      instructions: ["Lies den Antrieb (Diesel oder Benzin), den Hubraum und den CO₂-Wert ein.", "Berechne 9,50 € (Diesel) bzw. 2,00 € (Benzin) je angefangene 100 cm³.", "Addiere 2,00 € je g CO₂/km über 95 und gib „Kfz-Steuer: … EUR“ aus."],
      hints: ["(hubraum + 99) // 100 rundet auf volle Hunderter auf.", "Der CO₂-Anteil entfällt, wenn co2 <= 95 ist.", "Vergleiche den Antrieb als Text: antrieb == \"Diesel\"."],
      starter: 'antrieb = input("Antrieb (Diesel/Benzin): ")\nhubraum = int(input("Hubraum in ccm: "))\nco2 = int(input("CO2 in g/km: "))\n\n# Steuer berechnen und ausgeben\n',
      input: "Diesel\n1990\n174",
      check: { type: "number", cases: [{ input: "Diesel\n1990\n174", expected: 348 }, { input: "Benzin\n1398\n120", expected: 78 }, { input: "Benzin\n1000\n90", expected: 20 }] } },
    { id: "bubble-zahlenreihe", topic: "Sortieren", level: "Vertiefung", unit: "L2.2", source: "L2_2.1.2", numericInput: true,
      title: "Zahlenreihe mit Bubble Sort",
      description: "Fünf Zahlen einlesen, mit Bubble Sort sortieren und einzeln ausgeben.",
      instructions: ["Lies fünf ganze Zahlen ein und hänge sie an die Liste zahlen an.", "Sortiere mit zwei verschachtelten Schleifen und Nachbartausch (Bubble Sort).", "Gib die sortierten Zahlen jeweils in einer eigenen Zeile aus."],
      hints: ["for i in range(1, laenge): und darin for j in range(laenge - i):", "Tausche, wenn zahlen[j] > zahlen[j + 1].", "sort und sorted sind hier nicht erlaubt."],
      starter: "zahlen = []\n\n# Einlesen\n\n# Bubble Sort\n\n# Ausgabe\n",
      input: "5\n6\n1\n2\n3",
      check: { type: "output", cases: [{ input: "5\n6\n1\n2\n3", expected: "1\n2\n3\n5\n6" }, { input: "9\n-2\n9\n0\n4", expected: "-2\n0\n4\n9\n9" }],
        testCode: forbidCalls(["sort", "sorted", "min", "max"], "Programmiere den Bubble Sort selbst, ohne sort oder sorted.") } },
    { id: "selection-absteigend", topic: "Sortieren", level: "Vertiefung", unit: "L2.3", source: "L2_2.2.3", numericInput: true,
      title: "Acht Zahlen absteigend sortieren",
      description: "Acht Zahlen einlesen und mit Selection Sort absteigend sortiert als Liste ausgeben.",
      instructions: ["Lies acht Zahlen mit einer Schleife ein.", "Suche in jedem Durchgang den Index des größten Werts im unsortierten Bereich (max_idx).", "Tausche ihn nach vorne und gib am Ende die ganze Liste mit print(zahlen) aus."],
      hints: ["for akt_idx in range(laenge - 1): max_idx = akt_idx", "Innere Schleife: for j in range(akt_idx + 1, laenge)", "Getauscht wird nur, wenn akt_idx != max_idx."],
      starter: "zahlen = []\n\n# Einlesen\n\n# Selection Sort absteigend\n\nprint(zahlen)\n",
      input: "15\n6\n11\n3\n20\n50\n2\n42",
      check: { type: "output", cases: [{ input: "15\n6\n11\n3\n20\n50\n2\n42", expected: "[50, 42, 20, 15, 11, 6, 3, 2]" }, { input: "1\n2\n3\n4\n5\n6\n7\n8", expected: "[8, 7, 6, 5, 4, 3, 2, 1]" }],
        testCode: forbidCalls(["sort", "sorted", "max", "min", "reverse"], "Sortiere selbst mit Selection Sort.") } },
    { id: "namen-alphabetisch", topic: "Sortieren", level: "Anwendung", unit: "L2.4", source: "L2_2.3.3", numericInput: true,
      title: "Mannschaftsliste alphabetisch",
      description: "Eine beliebige Anzahl Namen einlesen und alphabetisch sortiert ausgeben.",
      instructions: ["Lies die Anzahl n und danach n Namen ein.", "Sortiere die Namen mit einem selbst programmierten Verfahren.", "Gib die Namen alphabetisch – je Zeile einen – aus."],
      hints: ["Texte vergleichst du genauso mit < und > wie Zahlen.", "Du kannst deinen Bubble Sort oder Selection Sort wiederverwenden.", "Für n = 0 gibt das Programm nichts aus."],
      starter: "namen = []\nn = int(input(\"Anzahl: \"))\n\n# Einlesen, sortieren, ausgeben\n",
      input: "4\nNico\nBatu\nPaul\nArmin",
      check: { type: "output", cases: [{ input: "4\nNico\nBatu\nPaul\nArmin", expected: "Armin\nBatu\nNico\nPaul" }, { input: "2\nZoe\nAda", expected: "Ada\nZoe" }, { input: "0", expected: "" }],
        testCode: forbidCalls(["sort", "sorted", "min", "max"], "Sortiere mit einem eigenen Verfahren, ohne sort oder sorted.") } },
    { id: "mitglied-pruefen", topic: "Suchen", level: "Grundlagen", unit: "L2.5", source: "L2_3.1.1", numericInput: true,
      title: "Einlasskontrolle",
      description: "Eine eingegebene Mitgliedsnummer mit der linearen Suche prüfen.",
      instructions: ["Lies die Mitgliedsnummer mit int(input(...)) ein.", "Durchsuche mnr mit einer Schleife; setze gefunden auf True, sobald die Nummer passt.", "Gib „Zutritt gewährt“ oder „Zutritt verweigert“ aus."],
      hints: ["gefunden = False vor der Schleife.", "if mnr[i] == nummer: gefunden = True", "Der Operator in ist hier nicht erlaubt – programmiere die Suche selbst."],
      starter: "mnr = [1001, 1019, 1014, 1009, 1005, 1002, 1018, 1008, 1003, 1010, 1007, 1004, 1020, 1013, 1015, 1011, 1017, 1012, 1006, 1016]\n\nnummer = int(input(\"Mitgliedsnummer eingeben: \"))\n\n# Lineare Suche und Ausgabe\n",
      input: "1018",
      check: { type: "output", cases: [{ input: "1018", expected: "Zutritt gewährt" }, { input: "1021", expected: "Zutritt verweigert" }, { input: "1001", expected: "Zutritt gewährt" }, { input: "1016", expected: "Zutritt gewährt" }],
        testCode: rules(forbidIn("mnr", "Programmiere die lineare Suche selbst, ohne nummer in mnr."), forbidCalls(["index", "count"], "Programmiere die lineare Suche selbst mit einer Schleife.")) } },
    { id: "buchstabe-verschluesseln", topic: "Suchen", level: "Grundlagen", unit: "L2.5", source: "L2_3.1.2",
      title: "Geheimbuchstabe",
      description: "Einen Großbuchstaben mit zwei parallelen Arrays verschlüsseln.",
      instructions: ["Lies einen Klarbuchstaben ein.", "Suche ihn in alphabet_klar und merke dir den Geheimbuchstaben am selben Index.", "Gib „Geheimbuchstabe: …“ aus."],
      hints: ["Durchlaufe alphabet_klar mit for i in range(len(alphabet_klar)).", "Bei Gleichheit: buchstabe_geheim = alphabet_geheim[i].", "index ist hier nicht erlaubt."],
      starter: 'alphabet_klar = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]\nalphabet_geheim = ["A", "D", "Z", "V", "P", "H", "W", "X", "B", "Q", "R", "C", "O", "Y", "E", "G", "U", "L", "M", "F", "J", "S", "T", "I", "K", "N"]\nbuchstabe_geheim = ""\n\nbuchstabe_klar = input("Klarbuchstabe: ")\n\n# Suchen und ausgeben\n',
      input: "D",
      check: { type: "output", cases: [{ input: "D", expected: "Geheimbuchstabe: V" }, { input: "B", expected: "Geheimbuchstabe: D" }, { input: "Z", expected: "Geheimbuchstabe: N" }],
        testCode: rules(forbidCalls(["index", "find", "dict", "zip"], "Suche den Buchstaben selbst mit einer Schleife."), forbidIn("alphabet_klar", "Suche den Buchstaben selbst mit einer Schleife.")) } },
    { id: "spieler-suchen", topic: "Suchen", level: "Vertiefung", unit: "L2.5", source: "L2_3.1.3",
      title: "Ist der Spieler im Kader?",
      description: "Lineare Suche mit while-Schleife, die beim Treffer abbricht.",
      instructions: ["Lies einen Spielernamen ein.", "Suche mit while gefunden == False and zaehler < len(kader).", "Gib „Spieler ist im Mannschaftskader“ oder „Spieler ist nicht im Mannschaftskader“ aus."],
      hints: ["zaehler startet bei 0 und wächst nur, solange nichts gefunden wurde.", "Bei einem Treffer: gefunden = True – die Schleife endet dann von selbst.", "Der Operator in ist hier nicht erlaubt."],
      starter: `kader = ${kader}\n\nspielername = input("Gesuchter Spielername: ")\ngefunden = False\nzaehler = 0\n\n# Suche mit while, danach Ausgabe\n`,
      input: "Paul",
      check: { type: "output", cases: [{ input: "Paul", expected: "Spieler ist im Mannschaftskader" }, { input: "Tom", expected: "Spieler ist nicht im Mannschaftskader" }, { input: "Luca", expected: "Spieler ist im Mannschaftskader" }],
        testCode: rules(need('__algolab_has__("While")', "Verwende eine while-Schleife, die beim Treffer endet."), forbidIn("kader", "Programmiere die Suche selbst, ohne spielername in kader."), forbidCalls(["index", "count"], "Programmiere die Suche selbst.")) } },
    { id: "gewinnlos-binaer", topic: "Suchen", level: "Vertiefung", unit: "L2.6", source: "L2_3.2.1", numericInput: true,
      title: "Habe ich gewonnen?",
      description: "Eine Losnummer mit der binären Suche in den sortierten Gewinnlosen suchen.",
      instructions: ["Lies die Losnummer ein.", "Halbiere den Suchbereich mit index_anfang, index_ende und index_mitte.", "Gib „Sie haben gewonnen :-)“ oder „Sie haben leider nicht gewonnen :-(“ aus."],
      hints: ["while gefunden == False and index_anfang <= index_ende:", "index_mitte = (index_anfang + index_ende) // 2", "Ist der Wert in der Mitte zu groß, wird index_ende = index_mitte - 1."],
      starter: "ln_gewinne = [11586, 12569, 22254, 23654, 32541, 55589, 85665, 87512, 98521, 98741]\n\nlosnr = int(input(\"Gesuchte Losnummer: \"))\ngefunden = False\nindex_anfang = 0\nindex_ende = len(ln_gewinne) - 1\n\n# Binäre Suche und Ausgabe\n",
      input: "85665",
      check: { type: "output", cases: [{ input: "85665", expected: "Sie haben gewonnen :-)" }, { input: "85666", expected: "Sie haben leider nicht gewonnen :-(" }, { input: "11586", expected: "Sie haben gewonnen :-)" }, { input: "98741", expected: "Sie haben gewonnen :-)" }, { input: "100", expected: "Sie haben leider nicht gewonnen :-(" }],
        testCode: rules(need('"index_mitte" in __algolab_source__ and __algolab_has__("While")', "Halbiere den Suchbereich in einer while-Schleife über index_mitte."), forbidIn("ln_gewinne", "Programmiere die binäre Suche selbst, ohne losnr in ln_gewinne."), forbidCalls(["index", "count", "bisect_left", "bisect"], "Programmiere die binäre Suche selbst.")) } },
    { id: "wuerfe-zaehlen", topic: "Suchen", level: "Grundlagen", unit: "L2.8", source: "L2_4.1", numericInput: true,
      title: "Wie oft geworfen?",
      description: "Zählen, wie oft eine eingegebene Punktzahl in einer Wurfliste vorkommt.",
      instructions: ["Lies die gesuchte Punktzahl ein.", "Durchlaufe alle Würfe und erhöhe anzahl bei jedem Treffer.", "Gib „Sie haben … Mal die Punktzahl … geworfen.“ aus."],
      hints: ["anzahl startet bei 0.", "Anders als bei der Suche brichst du beim Treffer nicht ab.", "count ist hier nicht erlaubt."],
      starter: "wuerfe = [60, 20, 1, 2, 40, 38, 57, 19, 18, 12, 6, 18, 18, 20, 50, 25, 60, 60, 20, 20, 25, 50]\n\ngesucht = int(input(\"Gesuchte Punktzahl: \"))\nanzahl = 0\n\n# Zählen und ausgeben\n",
      input: "20",
      check: { type: "output", cases: [{ input: "20", expected: "Sie haben 4 Mal die Punktzahl 20 geworfen." }, { input: "60", expected: "Sie haben 3 Mal die Punktzahl 60 geworfen." }, { input: "7", expected: "Sie haben 0 Mal die Punktzahl 7 geworfen." }],
        testCode: forbidCalls(["count", "Counter", "sum"], "Zähle selbst mit einer Schleife.") } },
    { id: "editor-rueckgaengig", topic: "Datenstrukturen", level: "Anwendung", unit: "L3.2", source: "L3_2.2",
      title: "Rückgängig im Editor",
      description: "Befehle einlesen und den Text mit einem Stapelspeicher verwalten.",
      instructions: ["Lies so lange Befehle ein, bis „ENDE“ kommt.", "„TIPPE wort“ legt das Wort auf den Stapel (append), „ZURÜCK“ nimmt das oberste Wort herunter (pop) – bei leerem Stapel passiert nichts.", "Gib am Ende die Wörter vom ältesten zum neuesten mit Leerzeichen getrennt aus, bei leerem Stapel „(leer)“."],
      hints: ["while True: befehl = input(...); if befehl == \"ENDE\": break", "befehl.startswith(\"TIPPE \") und befehl[6:] liefert das Wort.", "\" \".join(stapel) verbindet die Wörter."],
      starter: "stapel = []\n\n# Befehle bis ENDE verarbeiten\n\n# Ergebnis ausgeben\n",
      input: "TIPPE Hallo\nTIPPE Welt\nZURÜCK\nTIPPE AlgoLab\nENDE",
      check: { type: "output", cases: [{ input: "TIPPE Hallo\nTIPPE Welt\nZURÜCK\nTIPPE AlgoLab\nENDE", expected: "Hallo AlgoLab" }, { input: "ZURÜCK\nTIPPE A\nZURÜCK\nZURÜCK\nENDE", expected: "(leer)" }, { input: "TIPPE Stapel\nTIPPE sind\nTIPPE LIFO\nENDE", expected: "Stapel sind LIFO" }],
        testCode: need('__algolab_calls__("append") and __algolab_calls__("pop")', "Verwalte den Text als Stapel mit append und pop.") } },
    { id: "drucker-warteschlange", topic: "Datenstrukturen", level: "Anwendung", unit: "L3.3", source: "L3_3.2",
      title: "Druckerwarteschlange",
      description: "Druckaufträge in einer Warteschlange nach dem FIFO-Prinzip abarbeiten.",
      instructions: ["Lies so lange Befehle ein, bis „ENDE“ kommt.", "„NEU datei“ hängt den Auftrag hinten an; „DRUCKEN“ entnimmt vorne mit pop(0) und gibt „Drucke datei“ aus – bei leerer Schlange „Keine Aufträge“.", "Gib am Ende „Wartend: …“ mit den restlichen Aufträgen (durch Komma und Leerzeichen getrennt) oder „Wartend: keine“ aus."],
      hints: ["warteschlange.append(befehl[4:]) für NEU.", "if warteschlange: auftrag = warteschlange.pop(0)", "\", \".join(warteschlange) verbindet die restlichen Aufträge."],
      starter: "warteschlange = []\n\n# Befehle bis ENDE verarbeiten\n\n# Wartende Aufträge ausgeben\n",
      input: "NEU referat.pdf\nNEU foto.jpg\nDRUCKEN\nNEU brief.docx\nENDE",
      check: { type: "output", cases: [{ input: "NEU referat.pdf\nNEU foto.jpg\nDRUCKEN\nNEU brief.docx\nENDE", expected: "Drucke referat.pdf\nWartend: foto.jpg, brief.docx" }, { input: "DRUCKEN\nNEU a.txt\nDRUCKEN\nDRUCKEN\nENDE", expected: "Keine Aufträge\nDrucke a.txt\nKeine Aufträge\nWartend: keine" }],
        testCode: need('__algolab_pop_index__() or __algolab_calls__("popleft")', "Entnimm vorne mit pop(0) – so arbeitet eine Warteschlange.") } }
  ];
  const levels = ["Grundlagen", "Vertiefung", "Anwendung"];
  const topics = ["Arrays", "Algorithmen", "Sortieren", "Suchen", "Datenstrukturen"];
  // Vorlagen für die freie Python-Werkstatt.
  const templates = [
    { id: "leer", title: "Leeres Programm", code: "# Probiere hier frei aus.\nprint(\"Hallo AlgoLab!\")\n" },
    { id: "eingabe", title: "Ein- und Ausgabe", input: "Mila\n17", code: 'name = input("Wie heißt du? ")\nalter = int(input("Wie alt bist du? "))\nprint(f"Hallo {name}, in drei Jahren bist du {alter + 3}.")\n' },
    { id: "durchlaufen", title: "Array durchlaufen", code: 'punkte = [12, 8, 15, 9]\nfor i in range(len(punkte)):\n    print("Index", i, "→", punkte[i])\n' },
    { id: "bubble", title: "Bubble Sort", code: "zahlen = [5, 4, 9, 1, 3]\nlaenge = len(zahlen)\nfor i in range(1, laenge):\n    for j in range(laenge - i):\n        if zahlen[j] > zahlen[j + 1]:\n            zwischenspeicher = zahlen[j]\n            zahlen[j] = zahlen[j + 1]\n            zahlen[j + 1] = zwischenspeicher\n    print(\"Nach Bubble-Phase\", i, \":\", zahlen)\n" },
    { id: "binaer", title: "Binäre Suche", input: "42", code: 'liste = [3, 8, 11, 17, 20, 25, 31, 39, 42, 57]\ngesucht = int(input("Gesuchte Zahl: "))\nindex_anfang = 0\nindex_ende = len(liste) - 1\ngefunden = False\nwhile not gefunden and index_anfang <= index_ende:\n    index_mitte = (index_anfang + index_ende) // 2\n    print("Prüfe Index", index_mitte, "mit Wert", liste[index_mitte])\n    if liste[index_mitte] == gesucht:\n        gefunden = True\n    elif liste[index_mitte] > gesucht:\n        index_ende = index_mitte - 1\n    else:\n        index_anfang = index_mitte + 1\nprint("Gefunden!" if gefunden else "Nicht enthalten.")\n' },
    { id: "stapel", title: "Stapel und Warteschlange", code: 'stapel = []\nstapel.append("A")\nstapel.append("B")\nprint("POP:", stapel.pop())\n\nschlange = []\nschlange.append("A")\nschlange.append("B")\nprint("DEQUEUE:", schlange.pop(0))\n' }
  ];
  // Struktogramm-Training (nach Vorbild des PythonLab-Struktogramm-Labors), Notation nach der
  // Operatorenliste Baden-Württemberg. type "slots": Lücken per Auswahl füllen; type "order": Bausteine ordnen.
  const gap = slot => ({ slot });
  const n = name => `Anzahl der Elemente des Arrays ${name}`;
  const swapStatements = (a, b, name) => [{ s: `Zuweisung: zwischenspeicher = ${name}[${a}]` }, { s: `Zuweisung: ${name}[${a}] = ${name}[${b}]` }, { s: `Zuweisung: ${name}[${b}] = zwischenspeicher` }];
  const structograms = [
    { id: "nsd-tauschen", topic: "Arrays", level: "Grundlagen", unit: "L1.5", type: "slots", title: "Zwei Elemente tauschen",
      description: "Bringe die drei Zuweisungen des Ringtauschs in die richtige Reihenfolge.",
      instructions: ["Welcher Wert würde zuerst überschrieben? Genau den sicherst du.", "Danach darf das gesicherte Feld überschrieben werden.", "Zum Schluss wird der gesicherte Wert zurückgeschrieben."],
      diagram: { title: "tausche(liste, a, b)", blocks: [{ s: gap("z1") }, { s: gap("z2") }, { s: gap("z3") }] },
      slots: {
        z1: { options: ["Zuweisung: zwischenspeicher = liste[b]", "Zuweisung: liste[b] = liste[a]", "Zuweisung: liste[a] = zwischenspeicher", "Zuweisung: liste[a] = liste[b]"], answer: "Zuweisung: zwischenspeicher = liste[b]", hint: "Zuerst muss der Wert gesichert werden, der als Nächstes überschrieben wird." },
        z2: { options: ["Zuweisung: zwischenspeicher = liste[b]", "Zuweisung: liste[b] = liste[a]", "Zuweisung: liste[a] = zwischenspeicher", "Zuweisung: liste[a] = liste[b]"], answer: "Zuweisung: liste[b] = liste[a]", hint: "Jetzt darf liste[b] überschrieben werden – sein alter Wert liegt im zwischenspeicher." },
        z3: { options: ["Zuweisung: zwischenspeicher = liste[b]", "Zuweisung: liste[b] = liste[a]", "Zuweisung: liste[a] = zwischenspeicher", "Zuweisung: liste[a] = liste[b]"], answer: "Zuweisung: liste[a] = zwischenspeicher", hint: "Der gesicherte Wert kommt an die Stelle a." }
      } },
    { id: "nsd-maximum", topic: "Arrays", level: "Grundlagen", unit: "L1.4", type: "slots", title: "Das Maximum ermitteln",
      description: "Vervollständige das Struktogramm, das den größten Wert eines Arrays zurückgibt.",
      instructions: ["Die Schleife soll jeden gültigen Index genau einmal erreichen.", "Der Merker wird nur ersetzt, wenn der aktuelle Wert größer ist.", "Gespeichert wird der Wert, nicht der Index."],
      diagram: { title: "maximum(werte)", blocks: [{ s: "Deklaration und Initialisierung: groesster = werte[0]" }, { loop: gap("schleife"), body: [{ if: gap("bedingung"), yes: [{ s: gap("zuweisung") }], no: [] }] }, { s: "Rückgabe: groesster" }] },
      slots: {
        schleife: { options: [`Wiederhole von i = 0 solange i < ${n("werte")}, Schrittweite 1`, `Wiederhole von i = 0 solange i <= ${n("werte")}, Schrittweite 1`, "Wiederhole von i = 1 solange i < groesster, Schrittweite 1"], answer: `Wiederhole von i = 0 solange i < ${n("werte")}, Schrittweite 1`, hint: "Der letzte gültige Index ist Anzahl − 1. Mit <= gäbe es einen Zugriff außerhalb des Arrays." },
        bedingung: { options: ["werte[i] > groesster", "werte[i] < groesster", "i > groesster"], answer: "werte[i] > groesster", hint: "Verglichen werden Werte, nicht Indizes – und für das Maximum zählt „größer als“." },
        zuweisung: { options: ["Zuweisung: groesster = werte[i]", "Zuweisung: groesster = i", "Zuweisung: werte[i] = groesster"], answer: "Zuweisung: groesster = werte[i]", hint: "Der Merker erhält den neuen größten Wert; das Array bleibt unverändert." }
      } },
    { id: "nsd-einfuegen", topic: "Arrays", level: "Vertiefung", unit: "L1.6", type: "slots", title: "Ein Element einfügen",
      description: "Vervollständige das Einfügen per append und Tauschschleife.",
      instructions: ["Das neue Element steht nach dem Anhängen am Ende.", "Die Schleife läuft rückwärts bis zum Zielindex.", "In jedem Durchlauf tauschen die Felder i − 1 und i."],
      diagram: { title: "einfuegen(liste, neu, index)", blocks: [{ s: `Zuweisung: liste[${n("liste")}] = neu  (anhängen)` }, { loop: gap("kopf"), body: [{ s: "Zuweisung: zwischenspeicher = liste[i − 1]" }, { s: gap("mitte") }, { s: "Zuweisung: liste[i] = zwischenspeicher" }] }] },
      slots: {
        kopf: { options: [`Wiederhole von i = ${n("liste")} − 1 solange i > index, Schrittweite −1`, "Wiederhole von i = 0 solange i < index, Schrittweite 1", `Wiederhole von i = index solange i < ${n("liste")}, Schrittweite 1`], answer: `Wiederhole von i = ${n("liste")} − 1 solange i > index, Schrittweite −1`, hint: "Das neue Element startet hinten und wandert nach vorne – die Schleife zählt rückwärts." },
        mitte: { options: ["Zuweisung: liste[i − 1] = liste[i]", "Zuweisung: liste[i] = liste[i − 1]", "Zuweisung: liste[i + 1] = liste[i]"], answer: "Zuweisung: liste[i − 1] = liste[i]", hint: "liste[i − 1] ist bereits gesichert und darf jetzt den Wert von liste[i] bekommen." }
      } },
    { id: "nsd-entfernen", topic: "Arrays", level: "Vertiefung", unit: "L1.7", type: "slots", title: "Ein Element entfernen",
      description: "Vervollständige das Nachrücken nach dem Entfernen eines Elements.",
      instructions: ["Ab dem entfernten Index rückt jedes Element einen Platz nach vorne.", "Im Schleifenkörper wird liste[i + 1] gelesen – achte auf die Grenze.", "Das überzählige letzte Feld wird danach entfernt."],
      diagram: { title: "entfernen(liste, index)", blocks: [{ loop: gap("kopf"), body: [{ s: gap("koerper") }] }, { s: "Aufruf: liste.pop()  (letztes Arrayelement entfernen)" }] },
      slots: {
        kopf: { options: [`Wiederhole von i = index solange i < ${n("liste")} − 1, Schrittweite 1`, `Wiederhole von i = index solange i < ${n("liste")}, Schrittweite 1`, "Wiederhole von i = 0 solange i < index, Schrittweite 1"], answer: `Wiederhole von i = index solange i < ${n("liste")} − 1, Schrittweite 1`, hint: "Weil liste[i + 1] gelesen wird, darf i höchstens Anzahl − 2 werden." },
        koerper: { options: ["Zuweisung: liste[i] = liste[i + 1]", "Zuweisung: liste[i + 1] = liste[i]", "Zuweisung: liste[i] = liste[i − 1]"], answer: "Zuweisung: liste[i] = liste[i + 1]", hint: "Der Nachfolger rückt auf den aktuellen Platz." }
      } },
    { id: "nsd-kfz", topic: "Algorithmen", level: "Grundlagen", unit: "L2.1", type: "order", title: "Kfz-Steuer in Reihenfolge",
      description: "Ordne die Bausteine zu einem sinnvollen Ablauf: Eingabe, Verarbeitung, Ausgabe.",
      instructions: ["Zuerst werden alle benötigten Werte eingelesen – ihre Reihenfolge untereinander ist egal.", "Dann folgt die Berechnung der Hubraum-Einheiten und der Grundsteuer.", "Der CO₂-Anteil baut auf der Grundsteuer auf; die Ausgabe steht am Ende."],
      blocks: [
        { id: "ausgabe", text: "Ausgabe: \"Kfz-Steuer: \" + steuer + \" EUR\"" },
        { id: "co2", text: "Wenn co2 > 95, dann Zuweisung: steuer = steuer + (co2 − 95) * 2,00" },
        { id: "hubraum", text: "Deklaration und Einlesen: hubraum als Ganzzahl" },
        { id: "einheiten", text: "Deklaration und Initialisierung: einheiten = aufgerundeter Wert von hubraum / 100" },
        { id: "antrieb", text: "Deklaration und Einlesen: antrieb als Text" },
        { id: "grund", text: "Wenn antrieb == \"Diesel\", dann steuer = einheiten * 9,50, sonst steuer = einheiten * 2,00" },
        { id: "co2ein", text: "Deklaration und Einlesen: co2 als Ganzzahl" }
      ],
      expected: [["antrieb", "hubraum", "co2ein"], "einheiten", "grund", "co2", "ausgabe"] },
    { id: "nsd-bubble", topic: "Sortieren", level: "Vertiefung", unit: "L2.2", type: "slots", title: "Bubble Sort vervollständigen",
      description: "Ergänze die innere Schleife und die Vergleichsbedingung des Bubble Sort.",
      instructions: ["Nach Bubble-Phase i sind die letzten i Elemente sortiert.", "j und j + 1 sind Nachbarn – j + 1 muss ein gültiger Index bleiben.", "Aufsteigend sortieren heißt: tauschen, wenn links der größere Wert steht."],
      diagram: { title: "Bubble Sort", blocks: [{ s: `Deklaration und Initialisierung: laenge = ${n("zahlen")}` }, { loop: "Wiederhole von i = 1 solange i < laenge, Schrittweite 1", body: [{ loop: gap("innen"), body: [{ if: gap("vergleich"), yes: swapStatements("j", "j + 1", "zahlen"), no: [] }] }] }] },
      slots: {
        innen: { options: ["Wiederhole von j = 0 solange j < laenge − i, Schrittweite 1", "Wiederhole von j = 0 solange j < laenge, Schrittweite 1", "Wiederhole von j = i solange j < laenge, Schrittweite 1"], answer: "Wiederhole von j = 0 solange j < laenge − i, Schrittweite 1", hint: "Bei j < laenge wäre zahlen[j + 1] im letzten Durchlauf außerhalb des Arrays; der sortierte Bereich am Ende muss nicht mehr verglichen werden." },
        vergleich: { options: ["zahlen[j] > zahlen[j + 1]", "zahlen[j] < zahlen[j + 1]", "zahlen[j] > zahlen[i]"], answer: "zahlen[j] > zahlen[j + 1]", hint: "Verglichen werden die Nachbarn j und j + 1; „<“ würde absteigend sortieren." }
      } },
    { id: "nsd-selection", topic: "Sortieren", level: "Vertiefung", unit: "L2.3", type: "slots", title: "Selection Sort vervollständigen",
      description: "Ergänze Kandidat, Suchschleife und Merkerwechsel des Selection Sort.",
      instructions: ["Zu Beginn jedes Durchgangs ist der erste unsortierte Wert der Kandidat.", "Gesucht wird nur im unsortierten Bereich rechts von akt_idx.", "Gemerkt wird der Index des kleineren Werts."],
      diagram: { title: "Selection Sort", blocks: [{ s: `Deklaration und Initialisierung: laenge = ${n("zahlen")}` }, { loop: "Wiederhole von akt_idx = 0 solange akt_idx < laenge − 1, Schrittweite 1", body: [{ s: gap("start") }, { loop: gap("suche"), body: [{ if: "zahlen[j] < zahlen[min_idx]", yes: [{ s: gap("merker") }], no: [] }] }, { if: "akt_idx != min_idx", yes: swapStatements("akt_idx", "min_idx", "zahlen"), no: [] }] }] },
      slots: {
        start: { options: ["Zuweisung: min_idx = akt_idx", "Zuweisung: min_idx = 0", "Zuweisung: min_idx = zahlen[akt_idx]"], answer: "Zuweisung: min_idx = akt_idx", hint: "Der unsortierte Bereich beginnt bei akt_idx – min_idx ist ein Index, kein Wert." },
        suche: { options: ["Wiederhole von j = akt_idx + 1 solange j < laenge, Schrittweite 1", "Wiederhole von j = 0 solange j < laenge, Schrittweite 1", "Wiederhole von j = akt_idx + 1 solange j < laenge − 1, Schrittweite 1"], answer: "Wiederhole von j = akt_idx + 1 solange j < laenge, Schrittweite 1", hint: "Der sortierte Bereich links bleibt unberührt; das letzte Element muss mitgeprüft werden." },
        merker: { options: ["Zuweisung: min_idx = j", "Zuweisung: min_idx = zahlen[j]", "Zuweisung: zahlen[min_idx] = zahlen[j]"], answer: "Zuweisung: min_idx = j", hint: "Gemerkt wird die Position des kleineren Werts; getauscht wird erst nach der Suche." }
      } },
    { id: "nsd-linear", topic: "Suchen", level: "Grundlagen", unit: "L2.5", type: "slots", title: "Lineare Suche mit Abbruch",
      description: "Ergänze Schleifenbedingung und die beiden Zweige der linearen Suche.",
      instructions: ["Die Suche läuft, solange nichts gefunden wurde und noch Elemente übrig sind.", "Bei einem Treffer wird der Merker gesetzt.", "Sonst geht es mit dem nächsten Index weiter."],
      diagram: { title: "Lineare Suche", blocks: [{ s: "Deklaration und Initialisierung: gefunden = falsch" }, { s: "Deklaration und Initialisierung: zaehler = 0" }, { loop: gap("bedingung"), body: [{ if: "liste[zaehler] == gesucht", yes: [{ s: gap("ja") }], no: [{ s: gap("nein") }] }] }, { if: "gefunden == wahr", yes: [{ s: "Ausgabe: \"gefunden\"" }], no: [{ s: "Ausgabe: \"nicht gefunden\"" }] }] },
      slots: {
        bedingung: { options: [`Wiederhole solange gefunden == falsch AND zaehler < ${n("liste")}`, `Wiederhole solange gefunden == falsch OR zaehler < ${n("liste")}`, `Wiederhole solange zaehler <= ${n("liste")}`], answer: `Wiederhole solange gefunden == falsch AND zaehler < ${n("liste")}`, hint: "Beide Bedingungen müssen gleichzeitig gelten (AND); mit <= würde ein Index außerhalb geprüft." },
        ja: { options: ["Zuweisung: gefunden = wahr", "Zuweisung: zaehler = zaehler + 1", "Zuweisung: gefunden = falsch"], answer: "Zuweisung: gefunden = wahr", hint: "Bei einem Treffer wird der Merker gesetzt – dadurch endet die Schleife." },
        nein: { options: ["Zuweisung: gefunden = wahr", "Zuweisung: zaehler = zaehler + 1", "Zuweisung: gefunden = falsch"], answer: "Zuweisung: zaehler = zaehler + 1", hint: "Ohne Treffer geht es mit dem nächsten Element weiter." }
      } },
    { id: "nsd-binaer", topic: "Suchen", level: "Anwendung", unit: "L2.6", type: "slots", title: "Binäre Suche vervollständigen",
      description: "Ergänze die Mitte und die Anpassung des Suchbereichs.",
      instructions: ["Die Mitte liegt zwischen index_anfang und index_ende und wird abgerundet.", "Ist der Wert in der Mitte zu groß, liegt das Gesuchte links davon.", "Die geprüfte Mitte gehört danach nicht mehr zum Suchbereich."],
      diagram: { title: "Binäre Suche", blocks: [{ s: "Deklaration und Initialisierung: gefunden = falsch" }, { s: "Deklaration und Initialisierung: index_anfang = 0" }, { s: `Deklaration und Initialisierung: index_ende = ${n("liste")} − 1` }, { loop: "Wiederhole solange gefunden == falsch AND index_anfang <= index_ende", body: [{ s: gap("mitte") }, { if: "liste[index_mitte] == gesucht", yes: [{ s: "Zuweisung: gefunden = wahr" }], no: [{ if: gap("vergleich"), yes: [{ s: gap("links") }], no: [{ s: gap("rechts") }] }] }] }] },
      slots: {
        mitte: { options: ["Zuweisung: index_mitte = ganzzahliger Anteil von (index_anfang + index_ende) / 2", `Zuweisung: index_mitte = ${n("liste")} / 2`, "Zuweisung: index_mitte = index_anfang + 1"], answer: "Zuweisung: index_mitte = ganzzahliger Anteil von (index_anfang + index_ende) / 2", hint: "Die Mitte hängt vom aktuellen Suchbereich ab, nicht von der Gesamtlänge." },
        vergleich: { options: ["liste[index_mitte] > gesucht", "index_mitte > gesucht", "liste[index_mitte] < index_ende"], answer: "liste[index_mitte] > gesucht", hint: "Verglichen wird der Wert in der Mitte mit dem gesuchten Wert." },
        links: { options: ["Zuweisung: index_ende = index_mitte − 1", "Zuweisung: index_anfang = index_mitte + 1", "Zuweisung: index_ende = index_mitte"], answer: "Zuweisung: index_ende = index_mitte − 1", hint: "Ist die Mitte zu groß, wird das Ende links neben die Mitte gesetzt – sonst droht eine Endlosschleife." },
        rechts: { options: ["Zuweisung: index_ende = index_mitte − 1", "Zuweisung: index_anfang = index_mitte + 1", "Zuweisung: index_ende = index_mitte"], answer: "Zuweisung: index_anfang = index_mitte + 1", hint: "Ist die Mitte zu klein, beginnt der neue Bereich rechts neben der Mitte." }
      } }
  ];
  // Bausteinfolge prüfen: Gruppen (Arrays) dürfen in beliebiger Reihenfolge stehen.
  function orderCorrect(expected, order) {
    let position = 0;
    for (const step of expected) {
      const group = Array.isArray(step) ? step : [step];
      const part = order.slice(position, position + group.length);
      if (part.length !== group.length || !group.every(id => part.includes(id))) return false;
      position += group.length;
    }
    return position === order.length;
  }
  function checkStructogram(item, draft) {
    if (item.type === "order") {
      const order = Array.isArray(draft?.order) ? draft.order : item.blocks.map(block => block.id);
      return { passed: orderCorrect(item.expected, order), slots: {} };
    }
    const slots = {};
    for (const [id, slot] of Object.entries(item.slots)) slots[id] = draft?.answers?.[id] === undefined ? "empty" : draft.answers[id] === slot.answer ? "right" : "wrong";
    return { passed: Object.values(slots).every(state => state === "right"), slots };
  }

  const data = { exercises, levels, topics, templates, structograms, checkStructogram, orderCorrect };
  if (typeof module !== "undefined" && module.exports) module.exports = data;
  else if (root.ALGOLAB_CONTENT) root.ALGOLAB_CONTENT.practice = data;
})(typeof window !== "undefined" ? window : globalThis);
