# CSS-Variablen — Ayu Mapping

File: `themes/hnsstrk/assets/css/style.css`

## Theme-Selektoren

| Theme | CSS-Selektor | color-scheme |
|-------|-------------|-------------|
| Light | `:root` (Default) | `light` |
| Mirage | `:root[data-theme='mirage']` | `dark` |
| Dark | `:root[data-theme='dark']` | `dark` |

## Hintergrund & Text

| Variable | Ayu-Quelle | Light | Mirage | Dark |
|----------|-----------|-------|--------|------|
| `--bg-primary` | surface.lift | `#fcfcfc` | `#242936` | `#0d1017` |
| `--bg-secondary` | surface.base | `#f8f9fa` | `#1f2430` | `#0b0e14` |
| `--bg-tertiary` | surface.sunk | `#fafafa` | `#282e3b` | `#141821` |
| `--text-primary` | editor.fg | `#5c6166` | `#cccac2` | `#bfbdb6` |
| `--text-secondary` | ui.fg | `#828e9f` | `#707a8c` | `#5a6378` |
| `--text-muted` | comment | `#adaeb1` | `#6e7c8f` | `#5a6673` |

## Accent & Border

| Variable | Ayu-Quelle | Light | Mirage | Dark |
|----------|-----------|-------|--------|------|
| `--accent-primary` | common.accent | `#f29718` | `#ffcc66` | `#e6b450` |
| `--accent-hover` | accent abgedunkelt | `#e08614` | `#e6b84d` | `#cc9f3d` |
| `--text-on-accent` | — | `#ffffff` | `#1f2430` | `#0b0e14` |
| `--accent-violet` | syntax.constant | `#a37acc` | `#dfbfff` | `#d2a6ff` |
| `--border-color` | ui.line | `#e8e8e8` | `#2b3040` | `#1b1f29` |

## Syntax-Farben

| Variable | Palette | Light | Mirage | Dark |
|----------|---------|-------|--------|------|
| `--syntax-tag` | indigo | `#55b4d4` | `#5ccfe6` | `#39bae6` |
| `--syntax-func` | yellow | `#eba400` | `#ffcd66` | `#ffb454` |
| `--syntax-entity` | blue | `#22a4e6` | `#73d0ff` | `#59c2ff` |
| `--syntax-string` | green | `#86b300` | `#d5ff80` | `#aad94c` |
| `--syntax-regexp` | teal | `#4cbf99` | `#95e6cb` | `#95e6cb` |
| `--syntax-markup` | red | `#f07171` | `#f28779` | `#f07178` |
| `--syntax-keyword` | orange | `#fa8532` | `#ffa659` | `#ff8f40` |
| `--syntax-special` | peach | `#e59645` | `#d9be98` | `#e6c08a` |
| `--syntax-comment` | gray | `#adaeb1` | `#6e7c8f` | `#5a6673` |
| `--syntax-constant` | purple | `#a37acc` | `#dfbfff` | `#d2a6ff` |
| `--syntax-operator` | pink | `#f2a191` | `#f29e74` | `#f29668` |

## Board/Tile (FlipOff Split-Flap)

| Variable | Light | Mirage | Dark |
|----------|-------|--------|------|
| `--board-bg` | `#e8e8e8` | `#2a3040` | `#171b24` |
| `--tile-bg` | `#d0d0d0` | `#1c212c` | `#11151d` |
| `--tile-face` | `#e0e0e0` | `#2d3345` | `#1e232c` |
| `--tile-text` | `#5c6166` | `#cccac2` | `#bfbdb6` |

## Scramble-Farben (JS-Zugriff)

| Variable | Palette |
|----------|---------|
| `--scramble-1` | tag (indigo) |
| `--scramble-2` | string (green) |
| `--scramble-3` | constant (purple) |
| `--scramble-4` | markup (red) |
| `--scramble-5` | accent |
| `--scramble-6` | entity (blue) |

## Accent-Bar-Farben

| Variable | Palette |
|----------|---------|
| `--accent-bar-1` | regexp (teal) |
| `--accent-bar-2` | keyword (orange) |
| `--accent-bar-3` | constant (purple) |
| `--accent-bar-4` | tag (indigo) |
| `--accent-bar-5` | string (green) |

## Schriften (Monaspace Superfamilie)

| Variable | Font | Einsatz |
|----------|------|---------|
| `--font-logo` | Krypton | Terminal-Prompt, mechanisch |
| `--font-heading` | Neon | Überschriften, technisch |
| `--font-body` | Argon | Fließtext, humanist |
| `--font-ui` | Neon | UI-Elemente |
| `--font-code` | Xenon | Code-Blöcke, Slab Serif |
| `--font-handwriting` | Radon | Zitate, Blockquotes |
| `--font-display` | Krypton | FlipBoard, Displays |

## Neue Variable hinzufügen — Checkliste

1. In `:root` (Light) definieren
2. In `[data-theme='mirage']` definieren
3. In `[data-theme='dark']` definieren
4. Wert aus offizieller Ayu-Palette ableiten (siehe palette.md)
5. Semantischen Namen wählen (`--purpose`, nicht `--color`)
