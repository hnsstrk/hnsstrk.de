# Ayu Theme Integration — hnsstrk.de

Source: https://github.com/ayu-theme/ayu-colors (MIT License)
NPM: `import { dark, light, mirage } from 'ayu'`

Config: `themes/hnsstrk/layouts/_default/baseof.html`

## Offizielle Ayu-Palette

Aus `themes/*.yaml` im ayu-colors Repository:

### Palette (Grundfarben)

| Color | Light | Mirage | Dark |
|-------|-------|--------|------|
| gray | `#ADAEB1` | `#6E7C8F` | `#5A6673` |
| red | `#F07171` | `#F28779` | `#F07178` |
| pink | `#F2A191` | `#F29E74` | `#F29668` |
| orange | `#FA8532` | `#FFA659` | `#FF8F40` |
| peach | `#E59645` | `#D9BE98` | `#E6C08A` |
| yellow | `#EBA400` | `#FFCD66` | `#FFB454` |
| green | `#86B300` | `#D5FF80` | `#AAD94C` |
| teal | `#4CBF99` | `#95E6CB` | `#95E6CB` |
| indigo | `#55B4D4` | `#5CCFE6` | `#39BAE6` |
| blue | `#22A4E6` | `#73D0FF` | `#59C2FF` |
| purple | `#A37ACC` | `#DFBFFF` | `#D2A6FF` |

### Syntax-Farben (aus Palette abgeleitet)

| Syntax Role | CSS Variable | Light | Mirage | Dark |
|-------------|-------------|-------|--------|------|
| tag | `--syntax-tag` | `#55B4D4` | `#5CCFE6` | `#39BAE6` |
| func | `--syntax-func` | `#EBA400` | `#FFCD66` | `#FFB454` |
| entity | `--syntax-entity` | `#22A4E6` | `#73D0FF` | `#59C2FF` |
| string | `--syntax-string` | `#86B300` | `#D5FF80` | `#AAD94C` |
| regexp | `--syntax-regexp` | `#4CBF99` | `#95E6CB` | `#95E6CB` |
| markup | `--syntax-markup` | `#F07171` | `#F28779` | `#F07178` |
| keyword | `--syntax-keyword` | `#FA8532` | `#FFA659` | `#FF8F40` |
| special | `--syntax-special` | `#E59645` | `#D9BE98` | `#E6C08A` |
| comment | `--syntax-comment` | `#ADAEB1` | `#6E7C8F` | `#5A6673` |
| constant | `--syntax-constant` | `#A37ACC` | `#DFBFFF` | `#D2A6FF` |
| operator | `--syntax-operator` | `#F2A191` | `#F29E74` | `#F29668` |

### Surface-Farben

| Surface | Light | Mirage | Dark |
|---------|-------|--------|------|
| sunk | `#EBEEF0` | `#181C26` | `#0A0E16` |
| base | `#F8F9FA` | `#1F2430` | `#0D1017` |
| lift (editor bg) | `#FCFCFC` | `#242936` | `#10141C` |

### UI-Farben

| Element | Light | Mirage | Dark |
|---------|-------|--------|------|
| editor.fg | `#5C6166` | `#CCCAC2` | `#BFBDB6` |
| ui.fg | `#828E9F` | `#707A8C` | `#5A6378` |
| ui.line | `#E8E8E8` | `#171B24` | `#1B1F29` |
| accent | `#F29718` | `#FFCC66` | `#E6B450` |

## cScale-Mapping (Mermaid → Ayu)

Die cScale-Palette verhindert Mermaids wilde Auto-Generierung. 8 Syntax-Farben werden als **volle Syntax-Farben** als Node-Hintergründe verwendet.

- **Node-Hintergründe**: Volle (100%) Ayu-Syntax-Farben — kein Tint, kein Mixing
- **Borders**: `darken(syntaxFarbe, 0.65)` — gleicher Farbton, abgedunkelt
- **Node-Text**: `darken(syntaxFarbe, 0.45)` — gleicher Farbton, stark abgedunkelt
- **Mindmap**: `fixMindmapText()` setzt Text UND Stroke per JS nach dem Rendering
- **Reihenfolge**: Rainbow-Order (rot → orange → gelb → grün → türkis → blau → lila → pink)

Verifiziert aus dem ayu NPM-Paket (`import { dark, light, mirage } from 'ayu'`).

| cScale | Syntax | Light | Mirage | Dark |
|--------|--------|-------|--------|------|
| 0 | markup (red) | `#F07171` | `#F28779` | `#F07178` |
| 1 | keyword (orange) | `#FF7E33` | `#FFAD66` | `#FF8F40` |
| 2 | func (yellow) | `#F2A300` | `#FFD173` | `#FFB454` |
| 3 | string (green) | `#86B300` | `#D5FF80` | `#AAD94C` |
| 4 | regexp (teal) | `#4CBF99` | `#95E6CB` | `#95E6CB` |
| 5 | tag (blue) | `#55B4D4` | `#5CCFE6` | `#39BAE6` |
| 6 | constant (purple) | `#A37ACC` | `#DFBFFF` | `#D2A6FF` |
| 7 | operator (pink) | `#ED9366` | `#F29E74` | `#F29668` |

## themeVariables pro Theme

### Light

```
background: '#fcfcfc'
primaryColor: '#F07171'      primaryBorderColor: darken(0.65)   primaryTextColor: darken(0.45)
secondaryColor: '#86B300'    secondaryBorderColor: darken(0.65) secondaryTextColor: darken(0.45)
tertiaryColor: '#A37ACC'     tertiaryBorderColor: darken(0.65)  tertiaryTextColor: darken(0.45)
lineColor: '#828e9f'         textColor: '#5c6166'               edgeLabelBackground: '#fcfcfc'
mainBkg: '#F07171'           nodeBorder: darken(0.65)           nodeTextColor: darken(0.45)
classText: darken(0.45)      stateLabelColor: darken(0.45)      transitionLabelColor: darken(0.45)
clusterBkg: '#f8f9fa'        clusterBorder: '#e8e8e8'
noteBkgColor: '#F2A300'      noteBorderColor: darken(0.65)      noteTextColor: darken(0.45)
actorBkg: '#55B4D4'          actorBorder: darken(0.65)
todayLineColor: '#f29718'    gridColor: '#e8e8e8'
taskBkgColor: '#55B4D4'      activeTaskBkgColor: '#399EE6'      doneTaskBkgColor: '#86B300'
critBkgColor: '#F07171'      sectionBkgColor: '#f0f1f3'
```

### Mirage

```
background: '#242936'
primaryColor: '#f28779'      primaryBorderColor: darken(0.65)   primaryTextColor: darken(0.45)
secondaryColor: '#d5ff80'    secondaryBorderColor: darken(0.65) secondaryTextColor: darken(0.45)
tertiaryColor: '#dfbfff'     tertiaryBorderColor: darken(0.65)  tertiaryTextColor: darken(0.45)
lineColor: '#707a8c'         textColor: '#cccac2'               edgeLabelBackground: '#242936'
mainBkg: '#f28779'           nodeBorder: darken(0.65)           nodeTextColor: darken(0.45)
classText: darken(0.45)      stateLabelColor: darken(0.45)      transitionLabelColor: darken(0.45)
clusterBkg: '#1f2430'        clusterBorder: '#707a8c'
noteBkgColor: '#ffd173'      noteBorderColor: darken(0.65)      noteTextColor: darken(0.45)
actorBkg: '#5ccfe6'          actorBorder: darken(0.65)
todayLineColor: '#ffcc66'    gridColor: '#2b3040'
taskBkgColor: '#5ccfe6'      activeTaskBkgColor: '#73d0ff'      doneTaskBkgColor: '#d5ff80'
critBkgColor: '#f28779'      sectionBkgColor: '#1f2430'
```

### Dark

```
background: '#10141c'
primaryColor: '#f07178'      primaryBorderColor: darken(0.65)   primaryTextColor: darken(0.45)
secondaryColor: '#aad94c'    secondaryBorderColor: darken(0.65) secondaryTextColor: darken(0.45)
tertiaryColor: '#d2a6ff'     tertiaryBorderColor: darken(0.65)  tertiaryTextColor: darken(0.45)
lineColor: '#555e73'         textColor: '#bfbdb6'               edgeLabelBackground: '#10141c'
mainBkg: '#f07178'           nodeBorder: darken(0.65)           nodeTextColor: darken(0.45)
classText: darken(0.45)      stateLabelColor: darken(0.45)      transitionLabelColor: darken(0.45)
clusterBkg: '#0e1218'        clusterBorder: '#555e73'
noteBkgColor: '#ffb454'      noteBorderColor: darken(0.65)      noteTextColor: darken(0.45)
actorBkg: '#39bae6'          actorBorder: darken(0.65)
todayLineColor: '#e6b450'    gridColor: '#1b1f29'
taskBkgColor: '#39bae6'      activeTaskBkgColor: '#59c2ff'      doneTaskBkgColor: '#aad94c'
critBkgColor: '#f07178'      sectionBkgColor: '#0e1218'
```

## Architektur

- **Theme-Erkennung**: `localStorage.getItem('theme')` oder System-Preference
- **Re-Rendering**: Original-Quelltext gespeichert → bei `themechange`-Event wiederhergestellt und neu gerendert
- **cScale0-11**: Explizit aus 8 Ayu-Syntax-Farben generiert (verhindert Auto-Generierung)
- **Gantt**: `useMaxWidth: false`, `useWidth: 960`, `numberSectionStyles: 4`

## Gantt Status-Farben

| Status | Hintergrund | Rand | Quelle |
|--------|-----------|------|--------|
| Default | markup (rot) | markup border | `taskBkgColor` |
| Active | markup border | markup border | `activeTaskBkgColor` |
| Done | string (grün) | string border | `doneTaskBkgColor` |
| Critical | keyword (orange) | keyword border | `critBkgColor` |
| Today-Line | accent-primary | — | `todayLineColor` |

## Regeln für neue Diagramme

1. **Keine `style`-Direktiven** — das Theme steuert alle Farben
2. **Keine `classDef` mit Farbwerten** — nur strukturelle Klassen erlaubt
3. **Gantt**: Immer `axisFormat`, `tickInterval`, `useWidth: 960` im Frontmatter
4. **Notes**: Nutzen func/yellow als Hintergrund (warmes Gelb)
5. **Actors**: Nutzen tag/blue als Hintergrund
6. **Prüfung**: Diagramm in allen drei Themes testen (Light → Mirage → Dark)

## Farbberechnung (Formel)

```
Node-Text = darken(syntaxFarbe, 0.45)   — dynamisch, gleicher Farbton
Border    = darken(syntaxFarbe, 0.65)   — dynamisch, gleicher Farbton
Mindmap   = fixMindmapText() setzt Text + Stroke per JS
```

Farben stammen direkt aus dem ayu NPM-Paket:
```js
import { dark, light, mirage } from 'ayu'
```
