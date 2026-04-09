# Mermaid.js Theming Reference

## Available Themes

| Theme | Description |
|-------|-------------|
| `default` | Mermaid default colors |
| `neutral` | Black & white, good for printing |
| `dark` | Dark background |
| `forest` | Green tones |
| `base` | **Only theme that supports `themeVariables` customization** |

> **Important:** To use custom colors via `themeVariables`, you MUST set `theme: base`.
> Any other theme ignores `themeVariables` entirely.

## Setting the Theme

### Via Frontmatter (recommended)

```
---
config:
  theme: base
  themeVariables:
    primaryColor: "#FF6600"
    primaryTextColor: "#FFFFFF"
---
flowchart LR
    A --> B
```

### Via mermaid.initialize()

```javascript
mermaid.initialize({
  theme: 'base',
  themeVariables: {
    primaryColor: '#FF6600',
    primaryTextColor: '#FFFFFF'
  }
});
```

### Via Directive (deprecated, use frontmatter)

```
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#FF6600'}}}%%
flowchart LR
    A --> B
```

## Color Rules

- **Only HEX colors work** — do NOT use CSS color names (`red`, `blue`, etc.)
- Use 6-digit hex: `#FF6600` (3-digit `#F60` may work but is unreliable)
- Quote hex values in YAML frontmatter: `primaryColor: "#FF6600"`
- Many colors are **auto-calculated** from `primaryColor` — set it first, then override specifics

## Color Auto-Calculation

Mermaid derives many variables automatically:

- `primaryColor` -> generates `primaryBorderColor`, `primaryTextColor` (contrast-adjusted)
- `secondaryColor` -> auto-derived from `primaryColor` (adjusted hue)
- `tertiaryColor` -> auto-derived from `primaryColor`
- Node fills, borders, and text colors cascade from primary/secondary/tertiary
- Set specific variables only when the auto-calculated values are wrong

## Complete themeVariables Reference

### General Variables

| Variable | Description | Default (base) |
|----------|-------------|-----------------|
| `darkMode` | `true`/`false` — affects auto-contrast calculations | `false` |
| `background` | Background color of the diagram | `#f4f4f4` |
| `fontFamily` | Font family for all text | `"trebuchet ms", verdana, arial, sans-serif` |
| `fontSize` | Base font size | `16px` |
| `primaryColor` | Primary color — many others derived from this | `#fff4dd` |
| `primaryTextColor` | Text on primary-colored elements | auto (contrast) |
| `primaryBorderColor` | Border of primary-colored elements | auto (darken) |
| `secondaryColor` | Secondary color | auto (from primary) |
| `secondaryTextColor` | Text on secondary elements | auto |
| `secondaryBorderColor` | Border of secondary elements | auto |
| `tertiaryColor` | Tertiary color | auto (from primary) |
| `tertiaryTextColor` | Text on tertiary elements | auto |
| `tertiaryBorderColor` | Border of tertiary elements | auto |
| `noteBkgColor` | Background of note elements | `#fff5ad` |
| `noteTextColor` | Text in notes | `#333` |
| `noteBorderColor` | Border of notes | auto (darken noteBkgColor) |
| `lineColor` | Color of lines/edges | `#333333` |
| `textColor` | General text color | `#333` |
| `mainBkg` | Main background for nodes | `#ECECFF` |
| `errorBkgColor` | Background for error states | `#552222` |
| `errorTextColor` | Text color for error states | `#552222` |

### Flowchart Variables

| Variable | Description |
|----------|-------------|
| `nodeBorder` | Border color of nodes |
| `clusterBkg` | Background of subgraph clusters |
| `clusterBorder` | Border of subgraph clusters |
| `defaultLinkColor` | Default color of edges/links |
| `titleColor` | Color of diagram title |
| `edgeLabelBackground` | Background behind edge labels |
| `nodeTextColor` | Text inside nodes |

### Sequence Diagram Variables

| Variable | Description |
|----------|-------------|
| `actorBkg` | Actor box background |
| `actorBorder` | Actor box border |
| `actorTextColor` | Actor name text color |
| `actorLineColor` | Actor lifeline color |
| `signalColor` | Arrow/signal line color |
| `signalTextColor` | Text on signals/arrows |
| `labelBoxBkgColor` | Label box background |
| `labelBoxBorderColor` | Label box border |
| `labelTextColor` | Label text color |
| `loopTextColor` | Loop/alt/opt label text color |
| `activationBorderColor` | Activation bar border |
| `activationBkgColor` | Activation bar background |
| `sequenceNumberColor` | Sequence number text color |

### Gantt Chart Variables

| Variable | Description |
|----------|-------------|
| `todayLineColor` | Color of the "today" marker line |
| `gridColor` | Grid line color |
| `sectionBkgColor` | Background of odd sections |
| `sectionBkgColor2` | Background of even sections |
| `altSectionBkgColor` | Alternative section background |
| `taskBkgColor` | Default task bar background |
| `activeTaskBkgColor` | Active task background |
| `activeTaskBorderColor` | Active task border |
| `doneTaskBkgColor` | Done task background |
| `doneTaskBorderColor` | Done task border |
| `critBkgColor` | Critical task background |
| `critBorderColor` | Critical task border |
| `taskBorderColor` | Default task border |
| `taskTextColor` | Task text (general) |
| `taskTextLightColor` | Task text on dark backgrounds |
| `taskTextDarkColor` | Task text on light backgrounds |

### Pie Chart Variables

| Variable | Description |
|----------|-------------|
| `pie1` through `pie12` | Colors for pie slices 1-12 |
| `pieTitleTextSize` | Title font size |
| `pieTitleTextColor` | Title text color |
| `pieSectionTextSize` | Section label font size |
| `pieSectionTextColor` | Section label text color |
| `pieLegendTextSize` | Legend font size |
| `pieLegendTextColor` | Legend text color |
| `pieStrokeColor` | Stroke between slices |
| `pieStrokeWidth` | Stroke width between slices |
| `pieOpacity` | Opacity of slices (0-1) |

### State Diagram Variables

| Variable | Description |
|----------|-------------|
| `labelColor` | Label text color |
| `altBackground` | Alternative background for nested states |

### Class Diagram Variables

| Variable | Description |
|----------|-------------|
| `classText` | Text color in class boxes |

### cScale Variables (Timeline, Journey, etc.)

Used by timeline, journey, and other diagrams with ordered color scales. Setting these explicitly **prevents auto-color generation**.

| Variable Pattern | Range | Description |
|------------------|-------|-------------|
| `cScale0` - `cScale11` | 12 slots | Background colors for scale positions |
| `cScaleInv0` - `cScaleInv11` | 12 slots | Inverted/contrast colors |
| `cScalePeer0` - `cScalePeer11` | 12 slots | Peer/related colors |
| `cScaleLabel0` - `cScaleLabel11` | 12 slots | Label text colors for each position |

Example:

```yaml
themeVariables:
  cScale0: "#FF6B35"
  cScale1: "#F7C948"
  cScale2: "#59A5D8"
  cScaleLabel0: "#FFFFFF"
  cScaleLabel1: "#000000"
  cScaleLabel2: "#FFFFFF"
```

## Practical Example: Full Custom Theme

```
---
config:
  theme: base
  themeVariables:
    darkMode: true
    background: "#0A0E14"
    primaryColor: "#FF8F40"
    primaryTextColor: "#BFBDB6"
    primaryBorderColor: "#E6B450"
    secondaryColor: "#39BAE6"
    secondaryTextColor: "#BFBDB6"
    secondaryBorderColor: "#39BAE6"
    tertiaryColor: "#7FD962"
    tertiaryTextColor: "#BFBDB6"
    lineColor: "#BFBDB6"
    textColor: "#BFBDB6"
    fontFamily: "monospace"
    noteBkgColor: "#1A1F29"
    noteTextColor: "#BFBDB6"
    noteBorderColor: "#E6B450"
---
```

## Ayu Theme Integration (hnsstrk.de)

Auf hnsstrk.de werden **volle Ayu-Syntax-Farben** (100% Sättigung) als Node-Hintergründe verwendet. Borders sind auf ~80% abgedunkelt. Text auf farbigen Nodes ist immer `#2a2e38` (dunkelgrau).

Quelle: NPM-Paket `ayu` — `import { dark, light, mirage } from 'ayu'`

### cScale-Reihenfolge (Regenbogen)

| cScale | Syntax-Rolle | Light | Mirage | Dark |
| ------ | ------------ | ----- | ------ | ---- |
| 0 | markup (rot) | `#F07171` | `#F28779` | `#F07178` |
| 1 | keyword (orange) | `#FF7E33` | `#FFAD66` | `#FF8F40` |
| 2 | func (gelb) | `#F2A300` | `#FFD173` | `#FFB454` |
| 3 | string (gruen) | `#86B300` | `#D5FF80` | `#AAD94C` |
| 4 | regexp (teal) | `#4CBF99` | `#95E6CB` | `#95E6CB` |
| 5 | tag (blau) | `#55B4D4` | `#5CCFE6` | `#39BAE6` |
| 6 | constant (violett) | `#A37ACC` | `#DFBFFF` | `#D2A6FF` |
| 7 | operator (rosa) | `#ED9366` | `#F29E74` | `#F29668` |

### Pie-Farben

`pie1`–`pie12` werden automatisch aus den cScale-Werten gesetzt (zyklisch). Texte:

- `pieSectionTextColor` = `#2a2e38` (dunkel, auf farbigen Slices)
- `pieTitleTextColor` = `titleColor` (Theme-Textfarbe, auf Hintergrund)
- `pieLegendTextColor` = `textColor` (Theme-Textfarbe, auf Hintergrund)

### Regeln fuer neue Diagramme

1. **Keine `style`-Direktiven** — Farben kommen aus themeVariables
2. **Keine `classDef` mit Farbwerten** — Mermaid-Theme steuert alles
3. **Gantt immer mit `axisFormat`, `tickInterval`, `useWidth: 960`**
4. **Alle drei Themes testen** (Light, Mirage, Dark)
5. **Pie Charts** nutzen automatisch die cScale-Farben via pie1-pie12

## Gotchas

1. **`theme: base` is mandatory** for `themeVariables` to take effect
2. **No CSS color names** — `red` fails silently, use `#FF0000`
3. **Quote hex in YAML** — unquoted `#FF6600` is parsed as a YAML comment
4. **Directive + frontmatter conflict** — frontmatter wins; don't mix both
5. **darkMode affects auto-contrast** — set it first, then override text colors
6. **cScale prevents auto-colors** — once you set any cScale value, set ALL needed slots
7. **Some variables are diagram-specific** — e.g., `actorBkg` only affects sequence diagrams
8. **Pie-Farben separat** — pie1-pie12 müssen explizit gesetzt werden, fallen nicht auf cScale zurück
