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

Die cScale-Palette verhindert Mermaids wilde Auto-Generierung. 8 Syntax-Farben werden als **volle Syntax-Farben** als Node-Hintergründe verwendet. Borders sind auf ~80% abgedunkelte Varianten der Syntax-Farben.

- **Node-Hintergründe**: Volle (100%) Ayu-Syntax-Farben — kein Tint, kein Mixing
- **Borders** (~80%): `syntaxColor × 0.8` (abgedunkelt)
- **Node-Text**: Immer `#2a2e38` (dunkel) für Lesbarkeit auf hellen/bunten Hintergründen
- **Reihenfolge**: Rainbow-Order (rot → orange → gelb → grün → türkis → blau → lila → pink)

Verifiziert aus dem ayu NPM-Paket (`import { dark, light, mirage } from 'ayu'`).

| cScale | Syntax | Light | Light Border | Mirage | Mirage Border | Dark | Dark Border |
|--------|--------|-------|--------------|--------|---------------|------|-------------|
| 0 | markup (red) | `#F07171` | `#c05a5a` | `#F28779` | `#c96c62` | `#F07178` | `#c05a60` |
| 1 | keyword (orange) | `#FF7E33` | `#cc6529` | `#FFAD66` | `#cc8a52` | `#FF8F40` | `#cc7233` |
| 2 | func (yellow) | `#F2A300` | `#c28200` | `#FFD173` | `#ccaa5c` | `#FFB454` | `#cc9043` |
| 3 | string (green) | `#86B300` | `#6b8f00` | `#D5FF80` | `#a8cc66` | `#AAD94C` | `#88ad3d` |
| 4 | regexp (teal) | `#4CBF99` | `#3d997a` | `#95E6CB` | `#77b8a2` | `#95E6CB` | `#77b8a2` |
| 5 | tag (blue) | `#55B4D4` | `#4490aa` | `#5CCFE6` | `#49a5b8` | `#39BAE6` | `#2e95b8` |
| 6 | constant (purple) | `#A37ACC` | `#8262a3` | `#DFBFFF` | `#b299d9` | `#D2A6FF` | `#a885cc` |
| 7 | operator (pink) | `#ED9366` | `#be7652` | `#F29E74` | `#c27e5d` | `#F29668` | `#c27853` |

## themeVariables pro Theme

### Light

```
background: '#fcfcfc'
primaryColor: '#F07171'      primaryBorderColor: '#c05a5a'     primaryTextColor: '#2a2e38'
secondaryColor: '#86B300'    secondaryBorderColor: '#6b8f00'   secondaryTextColor: '#2a2e38'
tertiaryColor: '#A37ACC'     tertiaryBorderColor: '#8262a3'    tertiaryTextColor: '#2a2e38'
lineColor: '#828e9f'         textColor: '#5c6166'              edgeLabelBackground: '#fcfcfc'
mainBkg: '#F07171'           nodeBorder: '#c05a5a'             nodeTextColor: '#2a2e38'
clusterBkg: '#f8f9fa'        clusterBorder: '#e8e8e8'
noteBkgColor: '#F2A300'      noteBorderColor: '#c28200'        noteTextColor: '#2a2e38'
actorBkg: '#55B4D4'          actorBorder: '#4490aa'
todayLineColor: '#f29718'    gridColor: '#e8e8e8'
taskBkgColor: '#55B4D4'      activeTaskBkgColor: '#399EE6'     doneTaskBkgColor: '#86B300'
critBkgColor: '#F07171'      sectionBkgColor: '#f0f1f3'
```

### Mirage

```
background: '#242936'
primaryColor: '#f28779'      primaryBorderColor: '#c96c62'     primaryTextColor: '#2a2e38'
secondaryColor: '#d5ff80'    secondaryBorderColor: '#a8cc66'   secondaryTextColor: '#2a2e38'
tertiaryColor: '#dfbfff'     tertiaryBorderColor: '#b299d9'    tertiaryTextColor: '#2a2e38'
lineColor: '#707a8c'         textColor: '#cccac2'              edgeLabelBackground: '#242936'
mainBkg: '#f28779'           nodeBorder: '#c96c62'             nodeTextColor: '#2a2e38'
clusterBkg: '#1f2430'        clusterBorder: '#707a8c'
noteBkgColor: '#ffd173'      noteBorderColor: '#ccaa5c'        noteTextColor: '#2a2e38'
actorBkg: '#5ccfe6'          actorBorder: '#49a5b8'
todayLineColor: '#ffcc66'    gridColor: '#2b3040'
taskBkgColor: '#5ccfe6'      activeTaskBkgColor: '#73d0ff'     doneTaskBkgColor: '#d5ff80'
critBkgColor: '#f28779'      sectionBkgColor: '#1f2430'
```

### Dark

```
background: '#10141c'
primaryColor: '#f07178'      primaryBorderColor: '#c05a60'     primaryTextColor: '#2a2e38'
secondaryColor: '#aad94c'    secondaryBorderColor: '#88ad3d'   secondaryTextColor: '#2a2e38'
tertiaryColor: '#d2a6ff'     tertiaryBorderColor: '#a885cc'    tertiaryTextColor: '#2a2e38'
lineColor: '#555e73'         textColor: '#bfbdb6'              edgeLabelBackground: '#10141c'
mainBkg: '#f07178'           nodeBorder: '#c05a60'             nodeTextColor: '#2a2e38'
clusterBkg: '#0e1218'        clusterBorder: '#555e73'
noteBkgColor: '#ffb454'      noteBorderColor: '#cc9043'        noteTextColor: '#2a2e38'
actorBkg: '#39bae6'          actorBorder: '#2e95b8'
todayLineColor: '#e6b450'    gridColor: '#1b1f29'
taskBkgColor: '#39bae6'      activeTaskBkgColor: '#59c2ff'     doneTaskBkgColor: '#aad94c'
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
Node-Hintergrund = syntaxColor (100%, keine Mischung)
Border           = syntaxColor × 0.8  (abgedunkelt auf 80%)
Node-Text        = #2a2e38  (immer dunkel, alle Themes)
```

Farben stammen direkt aus dem ayu NPM-Paket:
```js
import { dark, light, mirage } from 'ayu'
```
