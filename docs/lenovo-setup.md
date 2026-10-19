# AlgoLab auf dem Lenovo

Stand: 19. Oktober 2026 (Europe/Berlin).

## Projekt und Git

Der vorhandene Projektordner auf diesem Rechner ist
`G:\Meine Ablage\Codex\AlgoLab`. Er enthält bereits das Git-Repository,
die Laufzeitdateien, eigene Assets, Dokumentation und 300 lokale
Referenzdateien unter `resources/`. Ein erneutes Klonen ist für diesen
Arbeitsordner nicht nötig.

Bei der Übernahme war der Arbeitsbaum sauber. Lokales `main` und das direkt
auf GitHub abgefragte `main` standen beide auf
`76c8b98e6ef373d2f4e813c928048b77e41631f6`.
Remote: <https://github.com/JakobSawazki/AlgoLab>.
Veröffentlichte Vorschau: <https://jakobsawazki.github.io/AlgoLab/>.

Der ältere Pfad `D:\Google Drive\Codex\AlgoLab` in der zentralen
Dokumentation stammt vom Gaming-Laptop. Verweise auf dessen
`C:\Users\Jakob\.codex` bezeichnen dortige Skills und Bildoriginale;
deren Vorhandensein auf dem Lenovo ist damit nicht belegt. Die für die
Website benötigten Bilder liegen bereits in `assets/`.

## In Codex aufnehmen

AlgoLab war bei der Prüfung noch nicht als lokales Codex-Projekt registriert.
In der App den vorhandenen Ordner `G:\Meine Ablage\Codex\AlgoLab` als
Projekt hinzufügen und ihn als Arbeitsordner verwenden. Dieser Chat wurde
im Projekt Lehramt begonnen; das Lesen des AlgoLab-Ordners ändert seine
Projektzuordnung nicht automatisch.

## Starten und prüfen

Auf dem Lenovo geprüft: Node.js 24.20.0 und Python 3.11.9 sind verfügbar.
Es gibt keinen Build-Schritt und keine npm-Abhängigkeiten zu installieren.

Im Projektordner in PowerShell:

```powershell
Set-Location -LiteralPath 'G:\Meine Ablage\Codex\AlgoLab'
python -m http.server 4175 --bind 127.0.0.1
```

Danach <http://127.0.0.1:4175/> öffnen. Der Server wird mit Strg+C beendet.
Wenn auf Port 4175 bereits die AlgoLab-Vorschau läuft, diese weiterverwenden.

```powershell
node --test tests/*.test.cjs
```

Am 19. Oktober bestanden auf dem Lenovo alle 30 Tests und die Syntaxprüfung
aller acht JavaScript-Dateien im Projektstamm. Die Inhaltstests führen echtes
lokales Python aus. Die Browser-Pythonlaufzeit verwendet dagegen Pyodide
0.29.4 in einem Worker und benötigt beim ersten Laden das CDN.
Die CI verwendet Node.js 22.

## Übernommener Arbeitsstand

Aktuelle Inhaltsversion: **0.6.0 – Arrays auswerten**. AlgoLab behandelt BPE7
für Jahrgangsstufe 2. Drei Lernfortschritte umfassen 19 Einheiten:
Daten organisieren, Sortieren und Suchen, dynamische Datenstrukturen.
L1.1 bis L1.4 sind ausgearbeitet; 15 Einheiten sind in Vorbereitung.

- `learning-path.js`: Lernpfad, Erklärungen, Aufgaben, Python-Starter und Kriterien.
- `app.js`: Oberfläche, Hash-Navigation, Lernstand und Bedienung.
- `progress.js`: Punkte, Abschlusskette und Importnormalisierung.
- `loop-model.js`, `analysis-model.js`: interaktive Ablaufmodelle.
- `python-runner.js`, `python-worker.js`, `python-checks.js`: Ausführung,
  Abbruch, Zeitlimit und Prüfung von Python-Code.
- `.github/workflows/pages.yml`: Tests und Veröffentlichung der Laufzeitdateien
  samt Assets auf GitHub Pages.

Pro Einheit sind 100 Punkte und ein ausdrücklicher Abschluss nötig, um die
nächste freizuschalten. Der Entwicklermodus wird im geöffneten Profil mit
AltGr+S sichtbar und verändert den Lernstand nicht. Lernstände, Notizen und
Codeentwürfe liegen im jeweiligen Browser; ein Gerätewechsel erfolgt über
JSON-Export und -Import. Google Drive synchronisiert diese Browserdaten nicht.

Nächster fachlicher Schritt laut jüngstem Arbeitsprotokoll: **L1.5 – Elemente
vertauschen**, anhand des Materials „Volleyball Positionen tauschen“.
Hilfsvariable, fehlerhaftes Überschreiben und korrektes Tauschen sollen
interaktiv gezeigt und um Python-Aufgabe und eigenes Fotomotiv ergänzt werden.
Weitere offene Arbeit: L1.6/L1.7, L2/L3, vollständiger Material- und
Bildungsplanabgleich sowie Datei-Export/Import-Rundlauf im Browser.

Zentrale Quellen: [Projektdokumentation](documentation.md),
[Arbeitsprotokoll](work-log.md), [Materialmatrix](material-matrix.md),
[Gestaltung](visual-design.md) und [Bildquellen](lesson-images.md).
Originalmaterialien und Lösungen bleiben lokal unter `resources/` und werden
von Git ausgeschlossen.

Bei einem Wechsel zwischen den Rechnern zunächst Drive synchronisieren lassen
und den Git-Status prüfen. Gleichzeitige Git-Schreibvorgänge beider Rechner im
gemeinsam synchronisierten Ordner vermeiden.
