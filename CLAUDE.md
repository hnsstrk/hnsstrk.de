# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projektübersicht

**Projektname:** hnsstrk.de
**Beschreibung:** Persönliche Profilseite mit FlipOff Split-Flap Landing Page — eine animierte, mechanisch anmutende Anzeigetafel als digitale Visitenkarte.
**Ziel:** Persönliche Online-Präsenz als Privatperson (KEIN berufliches Portfolio, KEIN Freelancer-Angebot)
**Content:** Deutsch
**Lizenz:** MIT (Code) + CC BY 4.0 (Content)

> Dieses Projekt ist eine rein private Hobby-Seite. Keine Werbung, kein kommerzieller Zweck, kein beruflicher Bezug.


## Befehle

```bash
hugo server -D          # Entwicklungsserver mit Entwürfen
hugo server             # Entwicklungsserver ohne Entwürfe
hugo --minify           # Produktions-Build
```


## Content erstellen

Neue Inhalte immer über die Hugo CLI anlegen — **ohne `/index.md`** am Ende, damit der Directory-Archetype korrekt aufgelöst wird:

```bash
hugo new content blog/mein-beitrag       # Blog-Post (Page Bundle)
hugo new content projects/mein-projekt   # Projekt-Seite (Page Bundle)
```

Die Archetypes liegen in `archetypes/blog/index.md` und `archetypes/projects/index.md`.

| Feld | Blog | Projects | Pflicht |
|------|:----:|:--------:|:-------:|
| `title` | ja | ja | ja |
| `date` | ja | ja | ja |
| `draft` | ja | ja | ja |
| `description` | ja | ja | ja |
| `tags` | ja | ja | ja |
| `featured_image` | ja | — | nein |
| `featured_layout` | ja (Kommentar) | — | nein |
| `toc` | ja (Kommentar) | — | nein |
| `technologies` | — | ja | ja |
| `category` | — | ja | ja |
| `weight` | — | ja | ja |
| `github` | — | ja (Kommentar) | nein |

**Slug-Konvention:** kebab-case (z.B. `mein-erster-beitrag`)

**Wichtig:** `hugo new content blog/post/index.md` (mit `/index.md`) fällt auf `archetypes/default.md` zurück und erzeugt unvollständiges Frontmatter.


## Technologie

| Komponente | Technologie |
|---|---|
| Static Site Generator | Hugo (extended) |
| Konfiguration | `hugo.toml` |
| Theme | Custom `themes/hnsstrk/` |
| Landing Page | FlipOff Split-Flap Display |
| CSS | Vanilla CSS mit Ayu-Farbsystem |
| Hosting | Contabo Ubuntu Server + Nginx |
| CI/CD | GitHub Actions → SSH-Trigger → Server-seitiger Hugo-Build |
| SSL | Let's Encrypt / Certbot |
| Mermaid | Lokal gebündelt (`mermaid.min.js`), bedingt geladen |
| Schriften | Monaspace Superfamilie (6 Varianten) + Nerd Font |
| Icons | Nerd Font Glyphen via `MonaspaceNeonNF-Regular.woff2` |
| Farbpaket | NPM `ayu` — `import { dark, light, mirage } from 'ayu'` |


## Architektur

### Theme-System (Ayu)

Drei Themes: **Light** (Default), **Mirage**, **Dark**. Umschaltung per `data-theme`-Attribut auf `<html>`:

- `:root` → Light
- `:root[data-theme='mirage']` → Mirage
- `:root[data-theme='dark']` → Dark

`theme.js` verwaltet den Wechsel und feuert ein `themechange`-CustomEvent. Alle Farbwerte stammen aus dem Ayu-Farbsystem und werden als CSS Custom Properties definiert.

### CSS Custom Properties (style.css)

Dreischichtiges System in `style.css`:
1. **UI-Farben**: `--bg-primary`, `--text-primary`, `--accent-primary`, `--border-color` etc.
2. **Syntax-Farben**: `--syntax-tag`, `--syntax-func`, `--syntax-markup` etc. (11 Farben)
3. **Fluid Scales**: Utopia-basiert mit `clamp()` — `--step-{-2..5}` (Typografie), `--space-{3xs..xl}` (Spacing)

Jede Schicht wird pro Theme (`data-theme`) überschrieben.

### Nerd Font Icons

Icons werden als **Nerd Font Glyphen** über die Klasse `.nf-icon` eingebunden — **keine SVG-Icons**. Jede Monaspace-Variante hat eine eigene NF-Version (`*NF-Regular.woff2`), die per `unicode-range` automatisch geladen wird. Die `.nf-icon`-Klasse erbt die `font-family` vom Elternelement, sodass Icons immer zur umgebenden Schrift passen.

Verwendung im HTML: `<span class="nf-icon">&#xf073;</span>`

Aktuell genutzte Glyphen:

| Codepoint | Icon | Verwendung |
|-----------|------|------------|
| `e30d` | Sonne | Theme-Switcher: Light |
| `f042` | Halbkreis | Theme-Switcher: Mirage |
| `f186` | Mond | Theme-Switcher: Dark |
| `f007` | Person | Navigation: Über mich |
| `f121` | Code | Navigation: Projekte |
| `f02d` | Buch | Navigation: Blog |
| `f0c1` | Kette | Navigation: Links |
| `f073` | Kalender | Blog-Karte: Datum |
| `f02b` | Tag | Blog-Karte: Tags |
| `f07b` | Ordner | Projekt-Karte: Kategorie |
| `f09b` | GitHub | Projekt-Karte: Repository |
| `f296` | GitLab | Projekt-Karte: Repository |
| `f171` | Bitbucket | Projekt-Karte: Repository |
| `e65a` | Gitea | Projekt-Karte: Repository |

Vor Verwendung neuer Codepoints prüfen, ob sie in der Font vorhanden sind (s. `fontTools`-Check).

### Mermaid-Integration

Mermaid wird **nur geladen wenn die Seite `mermaid`-Codeblöcke enthält** (Hugo Store-Flag `hasMermaid` via Render-Hook). Die gesamte Theming-Logik liegt in `baseof.html` als Inline-Script:

- `themeConfigs` — drei Konfigurationsobjekte (light/mirage/dark) mit Ayu-Farbwerten
- `darken(hex, factor)` — berechnet Text (×0.45) und Border (×0.65) dynamisch aus der Hintergrundfarbe (gleicher Farbton, abgedunkelt)
- `_tints` Array — 8 Ayu-Syntax-Farben in Regenbogen-Reihenfolge für `cScale0–11` und `pie1–12`
- `fixMindmapText()` — setzt Mindmap-Node-Text per JS auf abgedunkelte Hintergrundfarbe
- Bei `themechange`-Event werden Diagramme mit dem neuen Theme neu gerendert

cScale-Reihenfolge: markup(rot) → keyword(orange) → func(gelb) → string(grün) → regexp(teal) → tag(blau) → constant(violett) → operator(rosa)

### FlipOff Split-Flap

Modulare JS-Architektur in `themes/hnsstrk/assets/js/`:
- `Board.js` + `Tile.js` — Kern-Animation
- `KeyboardController.js` — Tastatursteuerung
- `MessageRotator.js` — Nachrichtenrotation
- `constants.js` — Konfiguration
- `main.js` — Initialisierung (Landing Page)
- `404-main.js` — Separate Instanz für 404-Seite

### Deploy-Workflow

Push auf `main` → GitHub Action baut SSH-Verbindung auf → triggert `build-hnsstrk` auf dem Contabo-Server. Der Hugo-Build findet **auf dem Server** statt, nicht in GitHub Actions.


## Konventionen

- **Dokumentation:** Deutsch (Kommentare, Commit-Messages, Changelogs)
- **Code:** Englisch (Variablen, Funktionen, HTML-Attribute, CSS-Klassen)
- **Commits:** Konventionelle Commits (`feat:`, `fix:`, `docs:`, `style:`, `chore:`)
- **Branches:** `main` als Produktionsbranch
- **Content:** `content/blog/` ist gitignored — Blog-Inhalte werden separat verwaltet


## Projektdokumentation

Alle Konzepte, Entscheidungen, technische Dokumentation und ADRs werden im Obsidian Vault geführt.

**Vault-Pfad (plattformabhängig):**

| System | Vault-Basispfad |
|--------|----------------|
| macOS (MacBook) | `/Users/hnsstrk/Meine Ablage/Vault Obsidian/` |
| Linux (Ganymed) | `/home/hnsstrk/Insync/hans.juergen.stark@gmail.com/Google Drive/Vault Obsidian/` |

**Projektordner im Vault:** `Projekte/hnsstrk.de/`


## Agenten-Teams

Bei Implementierungsarbeiten immer ein Agent-Team erstellen und Aufgaben parallelisieren.

### Modellwahl nach Aufgabentyp

| Modell | Einsatz |
|--------|---------|
| **opus** | Architekturentscheidungen, komplexe Logik, Code-Review, Debugging, Recherche mit Bewertung |
| **sonnet** | Standard-Implementierung, Templates, CSS, Konfiguration, moderate Komplexität |
| **haiku** | Einfache Dateien erstellen, Formatierung, einzelne Edits, Content-Dateien |

### Regeln

- Unabhängige Tasks immer parallel auf Agenten verteilen
- Modell passend zur Komplexität wählen — nicht alles braucht Opus
- Jeder Agent bekommt eine klare, vollständige Aufgabenbeschreibung
- Ergebnisse nach Abschluss aller Agenten prüfen und zusammenführen
