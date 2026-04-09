---
name: ayu-theme
description: |
  Ayu-Theme-Konformität für hnsstrk.de sicherstellen. Drei Themes: Light, Mirage, Dark.
  TRIGGER when: CSS-Variablen, Farben oder Theming bearbeitet werden, neue UI-Komponenten
  entstehen, Mermaid-Diagramme auf Farbkonformität geprüft werden, oder Fragen zu den
  korrekten Ayu-Farben für ein Element aufkommen.
  Quelle: https://github.com/ayu-theme/ayu-colors (MIT License)
---

# Ayu Theme — hnsstrk.de

Dieses Projekt nutzt das Ayu-Farbschema in drei Varianten: **Light**, **Mirage**, **Dark**.
Alle Farben stammen aus der offiziellen Quelle: https://github.com/ayu-theme/ayu-colors

## npm-Paket

Das `ayu`-Paket ist im Projekt installiert (`package.json`). Programmatischer Zugriff:

```javascript
import { dark, light, mirage } from 'ayu'

dark.syntax.keyword.hex()    // '#FF8F40'
light.editor.bg.hex()        // '#FCFCFC'
mirage.common.accent.hex()   // '#FFCC66'
dark.syntax.string.rgb()     // [170, 217, 76]
```

Nutze das Paket wenn Farben programmatisch abgefragt oder validiert werden sollen.

## Referenzen

- **Offizielle Palette**: [references/palette.md](references/palette.md) — Alle Ayu-Farben (Palette, Syntax, Surface, UI, Accent) für alle drei Themes
- **CSS-Variablen**: [references/css-variables.md](references/css-variables.md) — Mapping der Ayu-Farben auf CSS Custom Properties in `style.css`
- **Mermaid-Integration**: [references/mermaid.md](references/mermaid.md) — cScale-Mapping, themeVariables, Gantt-Config, Tint-Berechnung

## Verbindliche Regeln

1. **Immer alle drei Themes bedienen** — Jede Farbänderung muss in `:root` (Light), `[data-theme='mirage']` und `[data-theme='dark']` reflektiert werden
2. **Nur offizielle Ayu-Farben verwenden** — Keine erfundenen Hex-Werte. Farben aus [references/palette.md](references/palette.md) ableiten
3. **CSS-Variablen nutzen** — Nie Farben hardcoden, immer `var(--name)` verwenden
4. **Mermaid: Keine inline `style`-Direktiven** — Das Theme steuert alle Diagrammfarben
5. **Neue Tints berechnen** — `bg × (1 - α) + farbe × α` mit α=0.12 für Hintergründe, α=0.25 für Borders
6. **Kontrast prüfen** — Text auf Hintergrund muss in allen drei Themes lesbar sein

## Schnellreferenz: Kernfarben

| Rolle | Light | Mirage | Dark |
|-------|-------|--------|------|
| Background | `#FCFCFC` | `#242936` | `#0D1017` |
| Foreground | `#5C6166` | `#CCCAC2` | `#BFBDB6` |
| Accent | `#F29718` | `#FFCC66` | `#E6B450` |
| Border | `#E8E8E8` | `#2B3040` | `#1B1F29` |

## Dateien im Projekt

| Datei | Enthält |
|-------|---------|
| `themes/hnsstrk/assets/css/style.css` | CSS-Variablen (`:root`, `[data-theme]`) |
| `themes/hnsstrk/assets/js/theme.js` | Theme-Switcher, `themechange`-Event |
| `themes/hnsstrk/layouts/_default/baseof.html` | Mermaid themeVariables, cScale-Palette |
