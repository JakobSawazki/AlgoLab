# AlgoLab Bildwelt und Bedienung

Stand: 6. Oktober 2026. Version 0.3.2.

## Gestaltung

AlgoLab verwendet ein modernes blaues Farbsystem mit dunklem Navy-Hintergrund,
blauen Flächen und hellen silberblauen Konturen. Die helle Ansicht verwendet
helle Stahl- und Blautöne. Buttons erhalten mehrstufige Metallverläufe,
Lichtkanten und dezente Schatten. Die eigenen SVG-Icons bleiben skalierbar und
übernehmen die Kontrastfarben der Oberfläche. Alle Ressourcen werden lokal
mit der Webseite ausgeliefert.

Die fotorealistischen Motive wurden mit dem eingebauten Imagegen-Werkzeug
erstellt, ohne CLI/API-Fallback. Logo, Startmotiv und Landkarte sind im
Projekt gespeichert. Die fotografischen Motive sind als WebP mit Qualität 88
komprimiert, ohne Beschnitt oder inhaltliche Veränderung. Das PNG-Logo behält
seinen transparenten Hintergrund. Die generierten Originalbilder bleiben in
der ursprünglichen Codex-Bildablage erhalten.

| Asset | Verwendung | Format |
| --- | --- | --- |
| `assets/algolab-logo.png` | freigestelltes metallisches A mit Knotenpfad, Sidebar und Favicon | PNG, 1254 × 1254, Alpha |
| `assets/algolab-students.webp` | gemeinsam lernende Schüler auf der Startseite | WebP, 1672 × 941 |
| `assets/algolab-workshop.webp` | archiviertes Vorgängermotiv ohne Menschen | WebP, 1672 × 941 |
| `assets/bpe7-learning-map.webp` | drei Forschungsstationen als Lernkarte | WebP, 1672 × 941 |
| `assets/icons.svg` | eigenes gemeinsames Icon-System | SVG-Sprite |
| `design.css` | blaue Gestaltung, Metalleffekte, Bilder und Karte | CSS |

Die Motive dienen der Motivation und Orientierung. Insbesondere das
Knotenmotiv auf dem Laptop ist keine fachlich verbindliche Baumdarstellung.
Exakte Fachdarstellungen werden weiterhin gezielt in den Unterrichtseinheiten
erstellt.

## Bedienung

Das Panel-Icon in der Kopfzeile klappt die Sidebar ein oder aus. Am Desktop
bleibt eingeklappt eine schmale Icon-Leiste mit Beschriftungen für assistive
Technologien und Tooltips erhalten. Auf Mobilgeräten wird die Navigation
ausgeblendet; Logo und Öffnungsbutton bleiben erreichbar. Die Auswahl wird
unter `algolab-sidebar-v1` lokal gespeichert.

Der Pfeil neben „Lernpfad“ öffnet die Lernfortschritte in der Sidebar. Jeder
Lernfortschritt lässt sich zusätzlich aufklappen und zeigt seine Einheiten.
Gesperrte Einheiten erhalten keine navigierbaren Lektionslinks.

Die Landkarte enthält drei echte HTML-Buttons. Ungefähre Positionen:
L1 bei 18 % / 72 %, L2 bei 53 % / 51 %, L3 bei 84 % / 32 %.
Beschriftungen sind nicht ins Bild eingebrannt.

- Mauszeiger über einer Station: zugehörige Einheiten anzeigen.
- Klick: das Menü offen halten; erneuter Klick schließt es.
- Enter oder Leertaste: Station bedienen; Escape schließt das Menü.
- Klick außerhalb der Karte: Menü schließen.
- Beim Wechsel in das Menü verhindert eine kurze Verzögerung unbeabsichtigtes
  Schließen. Nur ein Kartenmenü ist gleichzeitig geöffnet.
- Mobil: Einheitenliste unter der Karte anzeigen; zusätzliche beschriftete
  Buttons ermöglichen eine große und eindeutige Touch-Zielfläche.

Alle 19 Einheiten sind in den Kartenmenüs sichtbar. Freigegebene Einheiten
haben einen Link, gesperrte Einheiten zeigen ihre Voraussetzung. Das Anzeigen
eines Lernfortschritts hebt keine Freischaltung auf.

## Generierungsprompts

Die folgenden Prompts wurden für die drei getrennten Aufrufe des eingebauten
Imagegen-Werkzeugs verwendet.

### Logo

Transparent background: true.

> Use case: logo-brand / photorealistic product photography. Create a premium photorealistic emblem for an educational algorithms website named AlgoLab. Single bold capital letter A constructed from precision-machined titanium, brushed silver bevels and cobalt-blue anodized inset surfaces, a subtle small three-node connected path integrated into the A as a detail suggesting algorithms. Elegant contemporary industrial design, realistic fine metal grain, polished edges, clean blue studio rim lighting. Front view with very slight depth, centered square composition, generously large emblem readable at 48 pixels. No words or typography other than the A, no surrounding badge, no watermark. Transparent background, isolated object.

### Startmotiv mit Schülern (0.3.2)

Eingebautes Imagegen-Werkzeug, zwei Bearbeitungen, jeweils ohne Transparenz.
Die dargestellten Schüler sind fiktiv. Ausgangsbild: `assets/algolab-workshop.webp`.
Finales Original: `C:/Users/Jakob/.codex/generated_images/01a112ba-3602-7e33-a3d1-93f851c588b6/exec-50d6c827-924e-4f25-b490-542e5cab9f21.png`.
Für die Homepage als WebP mit Qualität 88 komprimiert, ohne Beschnitt.

Erster Bearbeitungsprompt:

> Use case: photorealistic-natural / compositing. Edit target: the provided AlgoLab homepage hero photograph. Recompose this scene as a motivating, believable editorial photograph of THREE upper-secondary school students, approximately 17–19 years old, two girls and one boy with varied natural appearances, actively collaborating on algorithms and data structures (BPE7). Preserve the refined cobalt-blue and silver visual identity, brushed-metal tabletop learning objects, modern laptop, inviting workshop and soft blue window lighting from the reference. People must now be the clear main subjects: relaxed, engaged faces, natural smiles as they solve something together, looking at their work rather than posing at the camera. One student uses the laptop, another thoughtfully arranges a small row of blue and silver blocks into sorted order, the third discusses a small simple branching node model and gestures naturally towards it. Reposition the laptop so it is usable by the students, with a subtle screen glimpse of a simple array/sorting visual; correct physical perspective. Realistic everyday school clothing in restrained blue and neutral colors, natural skin texture and realistic hands, warm soft light on faces balanced with cool blue ambient light. Medium-wide 16:9 landscape photograph, eye level, all three faces and collaborative activity within the central 80% of frame so they stay visible in responsive hero crops, generous space around heads, tactile educational tools visible in foreground. A welcoming contemporary school computing lab, premium but plausible, curiosity and shared success. No readable text, no logos, no watermarks, no futuristic holograms, no plastic CGI faces, no exaggerated advertising poses. Generated fictional students, not recognizable real individuals. Opaque background.

Gezielte Korrektur am Zwischenbild `exec-56127d98-2f3b-4ca1-bae0-a1ab63a42008.png`:

> Use case: precise-object-edit. Edit the provided photograph of three students studying together. Change ONLY the outward-facing BACK of the laptop lid: remove the glowing bar chart / screen panel from the exterior rear lid and replace it with a continuous plain realistic brushed dark-blue aluminium laptop lid, subtle natural metal reflections, no logo, no writing, no chart. This side faces the camera and must be an opaque laptop back, not a screen. The functional screen remains facing the students and is not visible to the camera. Preserve all three students' faces, expressions, poses, clothing, hands, the metal sorting blocks, the branching node model, composition, 16:9 proportions, blue-and-warm lighting and the workshop background exactly. Do not change any other element. Photorealistic, no watermark.

### Vorgängermotiv ohne Menschen (0.3.0)

Transparent background: false.

> Use case: photorealistic-natural / premium editorial technology photography. Asset type: wide 16:9 hero photograph for AlgoLab, an engaging high-school algorithms and data structures learning website. A beautiful contemporary blue-toned computing workshop at blue hour with a precision aluminium laptop on a dark navy desk, screen displaying abstract softly luminous blue blocks and connections without any readable writing. In the foreground, a small row of tactile brushed aluminium and blue anodized cubes arranged in an increasing staircase, and a delicate physical branching structure made of silver rods and blue nodes. The objects feel like real educational tools and hint at sorting and data structures. Inviting and motivating, creative problem solving, premium real materials, cinematic but believable photography, soft depth of field, detailed metal reflections, cool daylight from window, restrained cyan highlights. Compose focal laptop and physical objects center/right with breathing room, no people, no readable text, no logos, no watermark, no dashboard UI, not a digital illustration, no excessive neon.

### Lernkarte

Transparent background: false.

> Use case: photorealistic-natural. Asset type: wide 16:9 landscape map background for a high-school learning journey with exactly THREE main interactive stations that will be added as HTML later. Photorealistic oblique aerial drone photograph of an inspiring fictional alpine coastal valley with deep blue lake, green-blue hills, winding river, rocky mountains and three distinct contemporary research settlements, connected sequentially by a single clearly visible pale road. First small settlement on a terrace at approximately x=18% y=68%, second mid-sized modern campus at x=50% y=48%, third larger research observatory campus at x=81% y=28%. Each settlement has realistic contemporary silver-roofed buildings and restrained blue accents, each separated by open landscape so it reads as one of exactly three destinations. The connecting route climbs gently left foreground to right distance. Clear cool daylight, cinematic detailed landscape textures, crisp photography, sophisticated blue tones, motivational sense of exploration. Fill image with the landscape, wide composition, no labels, no numbers, no text, no icons, no UI, no fantasy castles, no miniature toy style, no watermark. This is a background for clickable markers, not a diagram.

## Prüfstand

Lokal im Browser geprüft: alle drei Bilder geladen, Sidebar auf 88 Pixel
eingeklappt, Einstellung nach Neuladen erhalten, Lernfortschritte und Einheiten
in der Sidebar sichtbar, Kartenmenü L2 mit acht Einheiten, L3 per Tastatur
geöffnet und mit Escape geschlossen. Karte und L2-Menü bei 390 Pixeln ohne
horizontalen Überlauf geprüft. Die Übersicht wurde zusätzlich bei 1440 Pixeln
kontrolliert. Die sechs bestehenden Freischaltungstests bestanden.

Die Freischaltung bleibt vollständig im gemeinsamen Fortschrittsmodell;
die neue Gestaltung ändert weder Punktziele noch vorhandene Abschlüsse.
