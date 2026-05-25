# Design-System — hnsstrk.de

Referenz zum Fluid Design System der Website. Relevant für den Blog-Writer, damit Artikel im Einklang mit dem visuellen System erstellt werden.

## Fluid Design (kein fester Wert ohne clamp/min/max)

Die gesamte Website skaliert fluid zwischen 320px und 1240px Viewport. Keine harten Breakpoints für Typografie oder Spacing.

## Typografie

### Fonts (Monaspace-Superfamilie, lokal gehostet)

| Font | CSS-Variable | Einsatz im Blog |
|------|-------------|-----------------|
| **Monaspace Neon** | `--font-heading`, `--font-ui` | Überschriften (h1–h6), Meta-Infos |
| **Monaspace Argon** | `--font-body` | Fließtext, Listen |
| **Monaspace Xenon** | `--font-code` | Code-Blöcke, Inline-Code |
| **Monaspace Radon** | `--font-handwriting` | Blockquotes |
| **Monaspace Krypton** | `--font-display` | Nur FlipBoard (nicht in Blog-Posts) |

### Type Scale (fluid)

| Stufe | Variable | Bereich | Verwendung im Blog |
|-------|----------|---------|---------------------|
| --step-4 | Content h1 | 2.07–3.05rem | Artikeltitel (aus Template) |
| --step-3 | h2 | 1.73–2.44rem | Hauptabschnitte |
| --step-2 | h3 | 1.44–1.95rem | Unterabschnitte |
| --step-1 | h4 | 1.2–1.56rem | Tiefere Gliederung (selten) |
| --step-0 | Body/p | 1–1.25rem | Fließtext, Listen |
| --step--1 | Small | 0.83–1rem | Meta, Footer, Nav |
| --step--2 | Tiny | 0.69–0.8rem | Tags, Labels |

### Heading-Hierarchie im Blog

- **h1** wird vom Template gesetzt (`.Title` aus Frontmatter) — NIE im Markdown-Content verwenden
- **h2** = Hauptabschnitte im Content (## Überschrift)
- **h3** = Unterabschnitte (### Überschrift)
- **h4** = Selten, nur bei tiefer Gliederung
- **h5/h6** = Vermeiden in Blog-Posts

### Lesebreite

Kein `max-width` auf Absätzen. Content nutzt die volle Container-Breite (max 1200px). Bei Monospace ergibt das ~75–80 Zeichen pro Zeile — optimal lesbar.

## Farben

### Theme-System (3 Themes: Light, Mirage, Dark)

Alle Farben über CSS-Variablen. Blog-Posts brauchen KEINE Farben direkt zu setzen — das Theme-System regelt alles automatisch.

### Link-Farben im Content

| Element | Farbe | Underline |
|---------|-------|-----------|
| Content-Links | Akzent (Amber) | Ja, dezent |
| Content-Links :visited | Sekundärtext | Ja, dezent |
| Content-Links :hover | Akzent-Hover | Ja, voll |

## Spacing

Alle Abstände fluid. Die wichtigsten für Blog-Content:

| Abstand | Wo |
|---------|-----|
| h2 margin-top: ~3–3.75rem | Großer Abstand vor Hauptabschnitten |
| h3 margin-top: ~2–2.5rem | Mittlerer Abstand vor Unterabschnitten |
| p margin-bottom: ~1–1.25rem | Absatzabstand |
| li margin-bottom: ~0.5–0.63rem | Zwischen Listenpunkten |

## Komponenten für Blog-Posts

### Verfügbare Shortcodes

1. **TL;DR** — `{{</* tldr */>}}...{{</* /tldr */>}}` — Pflicht bei > 2.000 Wörtern
2. **Callouts** — `{{</* callout type="info|warning|tip|note" title="..." */>}}...{{</* /callout */>}}` — Max. 2–3 pro Artikel
3. **Mermaid** — ` ```mermaid ` Code-Blöcke — Bei Architektur/Pipeline

### TOC (Inhaltsverzeichnis)

Automatisch bei `toc: true` im Frontmatter oder > 1.500 Wörter. Collapsible, zeigt h2 und h3.

### Code-Blöcke

Syntax-Highlighting via Chroma. Immer Sprachangabe verwenden. Diff-Blöcke mit `diff` als Sprache.

### Bilder

- Alt-Text ist Pflicht (Barrierefreiheit)
- Title-Attribut wird zu `<figcaption>`
- Bilder sind responsive (`loading="lazy"` automatisch)
- Kein festes width/height in Markdown nötig

## Accessibility

- `prefers-reduced-motion: reduce` deaktiviert alle Animationen
- `:focus-visible` für Tastatur-Navigation
- `color-scheme` passt Browser-UI an Theme an
- Semantisches HTML: Template setzt h1, Content beginnt bei h2

## Was der Blog-Writer NICHT tun muss

- Keine CSS-Klassen in Markdown setzen (Hugo-Attribut-Syntax funktioniert nicht zuverlässig mit Render-Hooks)
- Keine Farben in Markdown angeben — das Theme regelt alles
- Keine Breakpoints bedenken — alles ist fluid
- Keine Bildgrößen angeben — responsive automatisch
