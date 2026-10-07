(function (root) {
  "use strict";
  const unit = (id, title, description, sourceRefs, goals) => ({ id, title, description, sourceRefs, goals, points: 100, ready: false, tasks: [] });
  const modules = [
    { id: "L1", number: "01", title: "Daten organisieren", subtitle: "Datenstrukturen kennenlernen und Arrays mit Python nutzen.", plan: "BPE7.1", color: "mint", units: [
      unit("L1.1", "Datenstrukturen kennenlernen", "Welche Struktur passt zu welcher Situation?", ["L1_1"], ["Den Begriff Datenstruktur erklären", "Array, verkettete Liste, Stapel, Warteschlange und Baum unterscheiden", "Eine passende Datenstruktur begründet auswählen"]),
      unit("L1.2", "Arrays und Index verstehen", "Werte geordnet speichern und auf einzelne Plätze zugreifen.", ["L1_2"], ["Ein eindimensionales Array anlegen und initialisieren", "Index und Länge unterscheiden", "Elemente lesen und verändern"]),
      unit("L1.3", "Arrays durchlaufen", "Mit einer Schleife alle Elemente erreichen.", ["L1_3.1.1", "L1_3.1.2"], ["Indexzugriff und Schleifenzugriff verbinden", "Arrayelemente systematisch ausgeben"]),
      unit("L1.4", "Arrays auswerten", "Minimum, Maximum und Durchschnitt selbst ermitteln.", ["L1_3.2", "L1_3.3"], ["Algorithmen zur Auswertung entwerfen", "Zwischenergebnisse mit einem Schreibtischtest überprüfen"]),
      unit("L1.5", "Elemente vertauschen", "Zwei Plätze tauschen, ohne einen Wert zu verlieren.", ["L1_3.4"], ["Arrayelemente über ihre Indizes tauschen", "Die Rolle einer Hilfsvariablen erklären"]),
      unit("L1.6", "Elemente einfügen", "Ein neues Element an der richtigen Stelle einordnen.", ["L1_3.5"], ["Ein Element an einer bestimmten Position einfügen", "Veränderungen von Indizes und Länge nachvollziehen"]),
      unit("L1.7", "Elemente entfernen", "Ein Element löschen und die veränderte Reihenfolge prüfen.", ["L1_3.6", "L1_4.1"], ["Ein Element an einer bestimmten Position entfernen", "Ein Arrayprogramm im Schreibtischtest nachvollziehen"])
    ] },
    { id: "L2", number: "02", title: "Sortieren und Suchen", subtitle: "Verfahren nachvollziehen, selbst programmieren und überprüfen.", plan: "BPE7.2", color: "gold", units: [
      unit("L2.1", "Algorithmen verstehen", "Aus einer Idee wird eine eindeutige Folge von Schritten.", ["L2_1"], ["Algorithmusbegriff und Eigenschaften erläutern", "Einen Algorithmus formulieren"]),
      unit("L2.2", "Bubble Sort", "Benachbarte Werte vergleichen und schrittweise sortieren.", ["L2_2.1.1", "L2_2.1.2", "L2_2.1.3"], ["Bubble-Phasen nachvollziehen", "Bubble Sort selbst implementieren"]),
      unit("L2.3", "Selection Sort", "Den passenden Wert auswählen und an seine Position setzen.", ["L2_2.2.1", "L2_2.2.2", "L2_2.2.3"], ["Selection Sort erläutern", "Aufsteigend und absteigend sortieren"]),
      unit("L2.4", "Sortierverfahren überprüfen", "Abläufe vergleichen und Fehler mit Testdaten finden.", ["L2_2.3.1", "L2_2.3.2", "L2_2.3.3"], ["Sortierverfahren auf Probleme anwenden", "Korrektheit mit geeigneten Testfällen prüfen"]),
      unit("L2.5", "Lineare Suche", "Element für Element nach einem Wert suchen.", ["L2_3.1.1", "L2_3.1.2", "L2_3.1.3"], ["Lineare Suche nachvollziehen und implementieren", "Gefunden und nicht gefunden unterscheiden"]),
      unit("L2.6", "Binäre Suche", "In sortierten Daten den Suchbereich immer weiter halbieren.", ["L2_3.2.1", "L2_3.2.2"], ["Die Voraussetzung sortierter Daten erklären", "Binäre Suche implementieren"]),
      unit("L2.7", "Suchverfahren überprüfen", "Suchwege vergleichen und Randfälle testen.", ["L2_3.3.1", "L2_3.3.2"], ["Suchverfahren begründet auswählen", "Randpositionen und erfolglose Suche testen"]),
      unit("L2.8", "Algorithmen anwenden", "Suchen und Verändern zu einer eigenen Lösung verbinden.", ["L2_3.4", "L2_3.5", "L2_3.6", "L2_4.1", "L2_4.2"], ["Algorithmen auf neue Aufgaben übertragen", "Die eigene Lösung erklären und überprüfen"])
    ] },
    { id: "L3", number: "03", title: "Dynamische Datenstrukturen", subtitle: "Verbindungen, Reihenfolgen und Hierarchien modellieren.", plan: "BPE7.3", color: "violet", units: [
      unit("L3.1", "Verkettete Listen", "Knoten verbinden und Verbindungen gezielt verändern.", ["L3_1.1", "L3_1.2"], ["Anker, Knoten, Daten und Zeiger beschreiben", "Einfügen und Löschen modellieren"]),
      unit("L3.2", "Stapelspeicher", "Was zuletzt hineinkommt, kommt zuerst wieder heraus.", ["L3_2.1", "L3_2.2"], ["Das LIFO-Prinzip erklären", "push und pop anwenden und modellieren"]),
      unit("L3.3", "Warteschlangen", "Was zuerst hineinkommt, kommt zuerst wieder heraus.", ["L3_3.1", "L3_3.2"], ["Das FIFO-Prinzip erklären", "enqueue und dequeue anwenden und modellieren"]),
      unit("L3.4", "Bäume und Binärbäume", "Hierarchien aufbauen und ihre Eigenschaften untersuchen.", ["L3_4.1", "L3_4.2"], ["Wurzel, Knoten und Beziehungen beschreiben", "Geordnet, voll und vollständig unterscheiden", "Bäume situationsgerecht modellieren"])
    ] }
  ];
  const first = modules[0].units[0];
  first.ready = true;
  first.intro = "Eine Datenstruktur beschreibt, wie Daten organisiert sind und wie du mit ihnen arbeiten kannst. Die passende Struktur hängt davon ab, was dein Programm tun soll.";
  first.examples = [
    { title: "Array", text: "Ein Arraymodell ordnet Werte in nummerierten Feldern an. Über den Index greifst du auf ein bestimmtes Feld zu. In unseren Python-Aufgaben verwenden wir Listen als Umsetzungshilfe; Python-Listen können ihre Länge verändern." },
    { title: "Verkettete Liste", text: "Knoten speichern Daten und eine Verbindung zum nächsten Knoten. Beim Einfügen und Löschen werden diese Verbindungen angepasst. Das ist ein anderes Modell als die eingebaute Python-Liste." },
    { title: "Stapelspeicher · Stack", text: "Du legst ein Element oben auf den Stapel und nimmst es dort wieder herunter. Das zuletzt eingefügte Element kommt zuerst heraus: Last In, First Out (LIFO)." },
    { title: "Warteschlange · Queue", text: "Neue Elemente kommen hinten dazu. Vorne wird das Element entnommen, das am längsten wartet: First In, First Out (FIFO)." },
    { title: "Baum", text: "Ein Baum bildet eine Hierarchie ab. Die Wurzel steht am Anfang; darunter verbinden sich Elternknoten mit ihren Kindknoten. So lässt sich zum Beispiel eine Abteilungsstruktur darstellen." }
  ];
  first.tasks = [
    { id: "struktur", points: 25, prompt: "Was beschreibt eine Datenstruktur?", options: ["Wie Daten organisiert sind und welche Zugriffe und Operationen vorgesehen sind.", "Wie schnell ein Computer arbeitet.", "Welche Farben ein Programm verwendet."], correct: 0, hint: "Denke an die Anordnung von Daten und daran, wie du auf sie zugreifen kannst." },
    { id: "stapel", points: 25, prompt: "Du machst immer die zuletzt ausgeführte Aktion rückgängig. Welches Modell passt dazu?", options: ["Warteschlange", "Stapelspeicher", "Baum"], correct: 1, hint: "Die letzte Aktion muss zuerst wieder herauskommen. Welches Prinzip beschreibt das?" },
    { id: "queue", points: 25, prompt: "Druckaufträge sollen in der Reihenfolge ihres Eingangs bearbeitet werden. Welche Datenstruktur passt?", options: ["Baum", "Stapelspeicher", "Warteschlange"], correct: 2, hint: "Der älteste Auftrag wird zuerst bearbeitet. Denke an FIFO." },
    { id: "baum", points: 25, prompt: "Eine Firma besteht aus einer Leitung, Abteilungen und untergeordneten Teams. Welches Modell bildet diese Beziehungen ab?", options: ["Baum", "Stapelspeicher", "Eine einzelne Zahl"], correct: 0, hint: "Gesucht ist eine Struktur, die über- und untergeordnete Ebenen sichtbar macht." }
  ];
  first.readTitle = "Wie organisieren wir Daten?";
  first.checkTitle = "Welche Struktur passt?";
  first.reflections = [
    { id: "definition", title: "Deine Definition", prompt: "Erkläre in einem eigenen Satz, was eine Datenstruktur beschreibt. Nenne dabei auch den Zugriff auf die Daten.", criteria: "Deine Erklärung nennt die Organisation von Daten und passende Zugriffe oder Operationen." },
    { id: "merkmale", title: "Die fünf Modelle vergleichen", prompt: "Notiere für Array, verkettete Liste, Stapel, Warteschlange und Baum jeweils: Wie sind die Daten angeordnet und wie greifst du auf sie zu?", criteria: "Array: Indexzugriff. Verkettete Liste: Verweisen folgen. Stapel: oben, LIFO. Warteschlange: hinten einfügen, vorne entnehmen, FIFO. Baum: Eltern-Kind-Beziehungen." },
    { id: "auswahl", title: "Eine Entscheidung begründen", prompt: "Wähle je ein Modell für sechs geordnete Messwerte, den Rückgängig-Verlauf eines Editors, eine faire Warteliste und einen Turnierplan. Begründe deine Wahl mit einer Operation. Was verändert sich, wenn du häufig mitten in einer Messreihe Elemente einfügst?", criteria: "Begründe mit Indexzugriff, LIFO, FIFO oder Hierarchie. Für häufige Einfügungen kannst du eine verkettete Liste diskutieren; eine dynamische Python-Liste ist ebenfalls veränderbar. Länge allein entscheidet nicht über das passende Modell." }
  ];
  const arrays = modules[0].units[1];
  arrays.ready = true;
  arrays.goals.push("Werte mit append ergänzen und die Länge mit len ermitteln");
  arrays.readTitle = "Ein Wert hat eine Adresse";
  arrays.checkTitle = "Index, Länge und Veränderung prüfen";
  arrays.intro = "Du speicherst die Punkte von vier Teams: 12, 8, 15 und 9. Statt vier einzelner Variablen nutzt du eine geordnete Folge. Jedes Feld hat einen Index. In Python beginnt der Index bei 0: Das erste Feld ist punkte[0], das vierte punkte[3].";
  arrays.examples = [
    { title: "Anlegen und initialisieren", text: "punkte = [12, 8, 15, 9] legt eine Python-Liste an und füllt sie mit vier Werten. Das Arraymodell beschreibt nummerierte Felder; unsere Python-Liste setzt dieses Modell für die Übungen um. Ein klassisches statisches Array hat eine feste Größe und einen einheitlichen Elementtyp. Python-Listen können wachsen und verschiedene Typen speichern; hier verwenden wir bewusst nur ganze Zahlen.", code: "punkte = [12, 8, 15, 9]\nprint(punkte)" },
    { title: "Index und Länge unterscheiden", text: "len(punkte) ergibt 4. Die gültigen nichtnegativen Indizes sind 0, 1, 2 und 3. Der letzte dieser Indizes ist also len(punkte) - 1. punkte[4] liegt außerhalb dieser Liste und verursacht einen IndexError. Python unterstützt zusätzlich negative Indizes; in dieser Einheit üben wir zunächst die Indizes ab 0.", code: "print(len(punkte))  # 4 Elemente\nprint(punkte[0])    # 12\nprint(punkte[3])    # 9" },
    { title: "Ein Feld verändern", text: "punkte[1] = 11 ersetzt den Wert im zweiten Feld. Die Länge bleibt 4. Eine Zuweisung liest zuerst die rechte Seite und schreibt danach das Ergebnis in das Feld links.", code: "punkte[1] = 11\nprint(punkte)  # [12, 11, 15, 9]" },
    { title: "Am Ende ergänzen", text: "punkte.append(7) fügt einen Wert am Ende an. Die Python-Liste hat danach fünf Elemente; der neue Wert liegt am Index 4. Das ist eine Größenänderung und keine reine Änderung eines bestehenden Feldes.", code: "punkte.append(7)\nprint(len(punkte))  # 5\nprint(punkte[4])    # 7" }
  ];
  arrays.explorer = true;
  arrays.help = { href: "https://jakobsawazki.github.io/PythonLab/#lesson/listen", label: "Python-Grundlagen zu Listen auffrischen" };
  arrays.trace = [
    { code: "punkte = [12, 8, 15, 9]", values: [12, 8, 15, 9], why: "Vier Werte werden angelegt. Die Indizes sind 0 bis 3." },
    { code: "punkte[1] = punkte[2]", values: [12, 15, 15, 9], why: "Der Wert 15 von Index 2 wird in das Feld am Index 1 kopiert. Index 2 bleibt unverändert." },
    { code: "punkte[3] = punkte[3] + 2", values: [12, 15, 15, 11], why: "Zuerst wird 9 + 2 berechnet, dann wird 11 am Index 3 gespeichert." },
    { code: "punkte.append(6)", values: [12, 15, 15, 11, 6], why: "Ein neues Feld kommt am Ende dazu. Die Länge wächst auf 5." },
    { code: "i = 2; punkte[i] = i", values: [12, 15, 2, 11, 6], why: "i hat den Wert 2. Deshalb wird der Wert 2 im Feld mit dem Index 2 gespeichert." }
  ];
  arrays.tasks = [
    { id: "index", points: 20, prompt: "werte = [6, 14, 3, 10]: Welchen Wert liefert werte[2]?", options: ["14", "3", "10"], correct: 1, hint: "Zähle die Indizes ab 0: 0 → 6, 1 → 14, 2 → …" },
    { id: "laenge", points: 20, prompt: "Eine Liste hat fünf Elemente. Welcher nichtnegative Index gehört zum letzten Element?", options: ["5", "6", "4"], correct: 2, hint: "Der erste Index ist 0. Der letzte nichtnegative Index ist Länge minus 1." },
    { id: "kopieren", points: 20, prompt: "a = [4, 7, 2]; a[0] = a[2]; a.append(9). Wie sieht a danach aus?", options: ["[2, 7, 2, 9]", "[2, 7, 9]", "[4, 7, 9, 2]"], correct: 0, hint: "Die Zuweisung kopiert den Wert von Index 2 nach Index 0. append ergänzt hinten, ohne andere Werte zu entfernen." },
    { id: "teamcode", type: "code", points: 40, correct: true, options: [], title: "Teamwerte selbst verwalten", prompt: "Lege punkte mit [12, 8, 15, 9] an. Speichere den ersten Wert in erster. Ändere danach den Wert am Index 1 auf 11. Ergänze 7 am Ende mit append. Speichere die Länge in anzahl. Gib punkte, erster und anzahl mit jeweils einem print aus.", starter: "# 1. Lege die Liste punkte an.\n\n# 2. Lies den ersten Wert in die Variable erster.\n\n# 3. Ändere Index 1 auf 11 und ergänze 7 am Ende.\n\n# 4. Speichere die Länge in anzahl und gib die Ergebnisse aus.\n", hint: "Nutze eckige Klammern zum Anlegen und für den Indexzugriff, append zum Ergänzen und len für die Länge. Du kannst die Beispiele oben öffnen.", checks: [
      { expression: "isinstance(globals().get('punkte'), list) and punkte == [12, 11, 15, 9, 7]", message: "punkte enthält nach Änderung und Ergänzung [12, 11, 15, 9, 7]." },
      { expression: "globals().get('erster') == 12", message: "erster speichert den ursprünglichen Wert am Index 0." },
      { expression: "globals().get('anzahl') == 5", message: "anzahl enthält die mit len ermittelte Länge 5." },
      { expression: "any(isinstance(n, __import__('ast').Call) and isinstance(n.func, __import__('ast').Attribute) and n.func.attr == 'append' for n in __import__('ast').walk(__import__('ast').parse(__algolab_source__)))", message: "Dein Programm ergänzt einen Wert mit append." },
      { expression: "any(isinstance(n, __import__('ast').Call) and isinstance(n.func, __import__('ast').Name) and n.func.id == 'len' for n in __import__('ast').walk(__import__('ast').parse(__algolab_source__)))", message: "Dein Programm ermittelt eine Länge mit len." },
      { expression: "any(isinstance(n, __import__('ast').Subscript) and isinstance(n.ctx, __import__('ast').Load) for n in __import__('ast').walk(__import__('ast').parse(__algolab_source__))) and any(isinstance(n, __import__('ast').Subscript) and isinstance(n.ctx, __import__('ast').Store) for n in __import__('ast').walk(__import__('ast').parse(__algolab_source__)))", message: "Dein Programm liest und verändert Felder über einen Index." },
      { expression: "__algolab_output__.splitlines() == ['[12, 11, 15, 9, 7]', '12', '5']", message: "Die Ausgabe zeigt die Liste, den ersten Wert und die Länge jeweils in einer eigenen Zeile." }
    ] }
  ];
  first.situation = { title: "Ordnung für euer Schulfest", text: "Euer Team organisiert ein Schulfest. Ihr braucht eine Warteliste für Helfer, eine Übersicht der Angebote und einen Weg, Änderungen rückgängig zu machen. Welche Datenstruktur unterstützt jeweils die Operation, die ihr braucht? Begründe deine Entscheidung, statt nur den Namen zu nennen." };
  arrays.situation = { title: "Die Punkte eures Schulturniers", text: "Vier Teams treten beim Schulfest gegeneinander an. Du verwaltest ihre Punkte. Ein Ergebnis wird korrigiert und ein fünftes Team kommt dazu. Deine Aufgabe: Ändere gezielt die Liste und zeige zuverlässig den aktuellen Stand an." };
  first.image = { src: "assets/l1-1-datenstrukturen.webp", alt: "Drei Schüler ordnen Planungskarten, Bausteine und ein Knotenmodell für ein Schulfest.", caption: "Welche Ordnung hilft eurem Team bei seiner Aufgabe?" };
  arrays.image = { src: "assets/l1-2-arrays.webp", alt: "Zwei Schüler organisieren ein Schulturnier und arbeiten mit Laptop und fünf geordneten Punktebausteinen.", caption: "Ein Team, ein Feld: Behalte die Punkte eures Turniers im Blick." };
  const data = { version: "0.4.1", modules, units: modules.flatMap(m => m.units) };
  if (typeof module !== "undefined" && module.exports) module.exports = data;
  else root.ALGOLAB_CONTENT = data;
})(typeof window !== "undefined" ? window : globalThis);
