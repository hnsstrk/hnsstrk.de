# Ayu Theme Integration — hnsstrk.de

Source: https://github.com/ayu-theme/ayu-colors (MIT License)

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

Die cScale-Palette verhindert Mermaids wilde Auto-Generierung. 8 Syntax-Farben werden als subtile Tints auf den Theme-Hintergrund gemischt:

- **Tints** (~12% Mix): Syntax-Farbe bei 12% Deckkraft auf Background → Node-Hintergründe
- **Borders** (~25% Mix): Syntax-Farbe bei 25% Deckkraft auf Background → Node-Ränder

| cScale | Syntax | Light Tint | Light Border | Mirage Tint | Mirage Border | Dark Tint | Dark Border |
|--------|--------|-----------|--------------|-------------|---------------|-----------|-------------|
| 0 | tag | `#e8f3f7` | `#d2eaf2` | `#2c4250` | `#355b6b` | `#142a36` | `#1a4355` |
| 1 | string | `#eef3de` | `#dfeabd` | `#3f4941` | `#59694c` | `#252e1f` | `#3c4c27` |
| 2 | constant | `#f1ecf6` | `#e6dcf0` | `#404054` | `#5c5672` | `#2b273a` | `#483d5d` |
| 3 | markup | `#fbebeb` | `#f9d9d9` | `#433740` | `#62454a` | `#2f1f26` | `#512d34` |
| 4 | keyword | `#fceee4` | `#fcdeca` | `#453c3b` | `#664e40` | `#31231d` | `#563623` |
| 5 | regexp | `#e7f5f0` | `#d0ede3` | `#35454c` | `#466263` | `#213032` | `#36504d` |
| 6 | func | `#faf1de` | `#f8e6bd` | `#45423d` | `#665a44` | `#312920` | `#564129` |
| 7 | entity | `#e2f1f9` | `#c6e6f7` | `#304254` | `#3c5b72` | `#182b3a` | `#24455d` |

## themeVariables pro Theme

### Light

```
background: '#fcfcfc'
primaryColor: '#e8f3f7'      primaryBorderColor: '#d2eaf2'     primaryTextColor: '#5c6166'
secondaryColor: '#eef3de'    secondaryBorderColor: '#dfeabd'   secondaryTextColor: '#5c6166'
tertiaryColor: '#f1ecf6'     tertiaryBorderColor: '#e6dcf0'    tertiaryTextColor: '#5c6166'
lineColor: '#8a919d'         textColor: '#5c6166'              edgeLabelBackground: '#fcfcfc'
mainBkg: '#e8f3f7'           nodeBorder: '#d2eaf2'             nodeTextColor: '#5c6166'
clusterBkg: '#f5f6f8'        clusterBorder: '#d8dce2'
noteBkgColor: '#faf1de'      noteBorderColor: '#f8e6bd'        noteTextColor: '#5c6166'
actorBkg: '#e2f1f9'          actorBorder: '#c6e6f7'
todayLineColor: '#f29718'    gridColor: '#e8e8e8'
taskBkgColor: '#e8f3f7'      activeTaskBkgColor: '#d2eaf2'     doneTaskBkgColor: '#eef3de'
critBkgColor: '#fbebeb'      sectionBkgColor: '#edf0f4'
```

### Mirage

```
background: '#242936'
primaryColor: '#2c4250'      primaryBorderColor: '#355b6b'     primaryTextColor: '#cccac2'
secondaryColor: '#3f4941'    secondaryBorderColor: '#59694c'   secondaryTextColor: '#cccac2'
tertiaryColor: '#404054'     tertiaryBorderColor: '#5c5672'    tertiaryTextColor: '#cccac2'
lineColor: '#707a8c'         textColor: '#cccac2'              edgeLabelBackground: '#242936'
mainBkg: '#2c4250'           nodeBorder: '#355b6b'             nodeTextColor: '#cccac2'
clusterBkg: '#20262f'        clusterBorder: '#2c3342'
noteBkgColor: '#45423d'      noteBorderColor: '#665a44'        noteTextColor: '#cccac2'
actorBkg: '#304254'          actorBorder: '#3c5b72'
todayLineColor: '#ffcc66'    gridColor: '#2b3040'
taskBkgColor: '#2c4250'      activeTaskBkgColor: '#355b6b'     doneTaskBkgColor: '#3f4941'
critBkgColor: '#433740'      sectionBkgColor: '#1a2030'
```

### Dark

```
background: '#0d1017'
primaryColor: '#142a36'      primaryBorderColor: '#1a4355'     primaryTextColor: '#bfbdb6'
secondaryColor: '#252e1f'    secondaryBorderColor: '#3c4c27'   secondaryTextColor: '#bfbdb6'
tertiaryColor: '#2b273a'     tertiaryBorderColor: '#483d5d'    tertiaryTextColor: '#bfbdb6'
lineColor: '#5a6378'         textColor: '#bfbdb6'              edgeLabelBackground: '#0d1017'
mainBkg: '#142a36'           nodeBorder: '#1a4355'             nodeTextColor: '#bfbdb6'
clusterBkg: '#0e1218'        clusterBorder: '#1a2030'
noteBkgColor: '#312920'      noteBorderColor: '#564129'        noteTextColor: '#bfbdb6'
actorBkg: '#182b3a'          actorBorder: '#24455d'
todayLineColor: '#e6b450'    gridColor: '#1b1f29'
taskBkgColor: '#142a36'      activeTaskBkgColor: '#1a4355'     doneTaskBkgColor: '#252e1f'
critBkgColor: '#2f1f26'      sectionBkgColor: '#0a0e16'
```

## Architektur

- **Theme-Erkennung**: `localStorage.getItem('theme')` oder System-Preference
- **Re-Rendering**: Original-Quelltext gespeichert → bei `themechange`-Event wiederhergestellt und neu gerendert
- **cScale0-11**: Explizit aus 8 Ayu-Syntax-Farben generiert (verhindert Auto-Generierung)
- **Gantt**: `useMaxWidth: false`, `useWidth: 960`, `numberSectionStyles: 4`

## Gantt Status-Farben

| Status | Hintergrund | Rand | Quelle |
|--------|-----------|------|--------|
| Default | tag tint | tag border | `taskBkgColor` |
| Active | tag border | tag pure | `activeTaskBkgColor` |
| Done | string tint | string border | `doneTaskBkgColor` |
| Critical | markup tint | markup border | `critBkgColor` |
| Today-Line | accent-primary | — | `todayLineColor` |

## Regeln für neue Diagramme

1. **Keine `style`-Direktiven** — das Theme steuert alle Farben
2. **Keine `classDef` mit Farbwerten** — nur strukturelle Klassen erlaubt
3. **Gantt**: Immer `axisFormat`, `tickInterval`, `useWidth: 960` im Frontmatter
4. **Notes**: Nutzen func/amber-Tints (warmes Gold)
5. **Actors**: Nutzen entity/blue-Tints
6. **Prüfung**: Diagramm in allen drei Themes testen (Light → Mirage → Dark)

## Tint-Berechnung (Formel)

```
Tint  = bg × (1 - 0.12) + syntaxColor × 0.12
Border = bg × (1 - 0.25) + syntaxColor × 0.25
```

Wobei `bg` die jeweilige Surface-Farbe `lift` des Themes ist.
