---
name: mermaid
description: |
  Mermaid.js diagram syntax reference for creating flowcharts, sequence diagrams, class diagrams,
  state diagrams, ER diagrams, Gantt charts, pie charts, mindmaps, timelines, GitGraph, block diagrams,
  architecture diagrams, XY charts, Kanban boards, Sankey diagrams, and more.
  Use when writing or editing Mermaid diagram code blocks, configuring Mermaid themes/variables,
  or debugging diagram rendering issues. Covers all 26+ diagram types, theming with base theme
  and themeVariables, configuration via frontmatter, and layout options.
---

# Mermaid.js Diagramm-Referenz

## Schnellstart

Alle Diagramme starten mit einer Typ-Deklaration. Optional: YAML-Frontmatter vor dem Diagramm.

```
---
config:
  theme: base
  themeVariables:
    primaryColor: "#e8f3f7"
---
flowchart LR
    A[Start] --> B{Entscheidung}
    B -->|Ja| C[Aktion]
    B -->|Nein| D[Ende]
```

## Diagrammtypen — Referenz-Dateien

### Häufig genutzt
- **Flowchart**: [references/flowchart.md](references/flowchart.md) — Nodes, Links, Subgraphs, 44+ Formen, Styling
- **Sequence Diagram**: [references/sequence-diagram.md](references/sequence-diagram.md) — Actors, Arrows, Activations, Loops, alt/par/critical
- **Class Diagram**: [references/class-diagram.md](references/class-diagram.md) — Members, Beziehungen, Namespaces, Generics
- **State Diagram**: [references/state-diagram.md](references/state-diagram.md) — Composite States, Forks/Joins, Choice, Concurrency
- **ER Diagram**: [references/er-diagram.md](references/er-diagram.md) — Entities, Attributes, Beziehungen, Kardinalität
- **Gantt Chart**: [references/gantt-chart.md](references/gantt-chart.md) — Tasks, Sections, axisFormat, tickInterval, useWidth
- **Pie Chart**: [references/pie-chart.md](references/pie-chart.md) — Slices, showData, textPosition
- **Mindmap**: [references/mindmap.md](references/mindmap.md) — Hierarchie via Indentation, Node-Formen, Icons

### Visualisierung & Planung
- **Timeline**: [references/timeline.md](references/timeline.md) — Zeitachsen mit Perioden und Events
- **GitGraph**: [references/gitgraph.md](references/gitgraph.md) — Branches, Commits, Merges, Cherry-Pick
- **Block Diagram**: [references/block-diagram.md](references/block-diagram.md) — Spalten, Blöcke, Verschachtelung
- **Architecture**: [references/architecture.md](references/architecture.md) — Services, Groups, Edges, Icons
- **XY Chart**: [references/xy-chart.md](references/xy-chart.md) — Bar + Line Charts, Achsen-Konfiguration
- **Kanban**: [references/kanban.md](references/kanban.md) — Spalten mit Karten, Metadaten
- **Sankey**: [references/sankey.md](references/sankey.md) — Flussdiagramme mit gewichteten Links

### Weitere Diagrammtypen (kompakte Referenz)
- **Alle weiteren**: [references/other-diagrams.md](references/other-diagrams.md) — Quadrant, Requirement, C4, ZenUML, User Journey, Packet, Radar, Treemap, Venn, Ishikawa, TreeView

## Konfiguration & Theming
- **Theming**: [references/theming.md](references/theming.md) — base-Theme, themeVariables, cScale, Farb-Berechnung
- **Configuration**: [references/configuration.md](references/configuration.md) — Frontmatter, Directives, Layouts, Math, Accessibility

## Wichtige Regeln

1. **Nur `base`-Theme** erlaubt `themeVariables`-Anpassung — andere Themes ignorieren sie
2. **Nur Hex-Farben** in themeVariables — keine CSS-Farbnamen (`#ff0000` statt `red`)
3. **Frontmatter** (YAML zwischen `---`) vor dem Diagramm-Code für per-Diagramm-Config
4. **Kommentare**: `%% Kommentar` in allen Diagrammtypen
5. **`end` in Flowcharts** vermeiden (bricht Parser) — als `"end"` in Anführungszeichen setzen
6. **Gantt-Breite**: `useWidth` im Frontmatter setzen wenn das Chart zu schmal rendert
7. **Security**: Click-Events nur bei `securityLevel: 'loose'`
