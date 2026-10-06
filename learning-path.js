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
  const data = { version: "0.3.0", modules, units: modules.flatMap(m => m.units) };
  if (typeof module !== "undefined" && module.exports) module.exports = data;
  else root.ALGOLAB_CONTENT = data;
})(typeof window !== "undefined" ? window : globalThis);
