# Mermaid.js Configuration Reference

## Configuration Priority

Settings are merged in this order (later wins):

1. **Default** — Mermaid built-in defaults
2. **Site config** — `mermaid.initialize({...})` in JavaScript
3. **Frontmatter** — per-diagram YAML block (highest priority)

## Frontmatter Syntax

YAML block between `---` markers, placed before the diagram definition:

```
---
title: My Diagram
config:
  theme: base
  themeVariables:
    primaryColor: "#FF6600"
  gantt:
    useWidth: 960
  sequence:
    mirrorActors: false
  flowchart:
    curve: basis
---
gantt
    title Project Timeline
    section Phase 1
    Task A :a1, 2024-01-01, 30d
```

## Directives (deprecated)

Inline config at the top of the diagram. **Use frontmatter instead.**

```
%%{init: {'theme': 'forest'}}%%
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#FF6600'}}}%%
%%{init: {'gantt': {'useWidth': 960}}}%%
```

If both frontmatter and directives exist, frontmatter wins.

## Look Options

| Value | Description |
|-------|-------------|
| `classic` | Default clean look |
| `handDrawn` | Sketchy hand-drawn appearance (uses rough.js) |

```
---
config:
  look: handDrawn
---
```

Or via initialize:

```javascript
mermaid.initialize({ look: 'handDrawn' });
```

## Layout Algorithms

| Algorithm | Description | Notes |
|-----------|-------------|-------|
| `dagre` | Default layout engine | Built-in, works everywhere |
| `elk` | Eclipse Layout Kernel | Must load `elkjs` separately, better for complex graphs |

### ELK Configuration

ELK must be registered before use:

```javascript
import elkLayouts from '@mermaid-js/layout-elk';
mermaid.registerLayoutLoaders(elkLayouts);
```

Then in frontmatter:

```
---
config:
  layout: elk
  elk:
    mergeEdges: true
    nodePlacementStrategy: BRANDES_KOEPF
---
```

ELK node placement strategies:
- `SIMPLE` — basic placement
- `NETWORK_SIMPLEX` — minimize edge lengths
- `LINEAR_SEGMENTS` — align nodes in segments
- `BRANDES_KOEPF` — balanced placement (recommended)

## Math / KaTeX Support

Renders LaTeX math expressions in diagrams. Requires KaTeX CSS and JS loaded externally.

Enable via frontmatter:
```
---
config:
  forceLegacyMathML: true
---
```

Or via directive:
```
%%{init: {"forceLegacyMathML": true}}%%
```

Syntax:
- Inline math: `$E = mc^2$`
- Display math: `$$\sum_{i=0}^n x_i$$`

## Accessibility

Add accessible title and description to any diagram:

```
flowchart LR
    accTitle: User login flow
    accDescr: Shows the steps from login page to dashboard

    A[Login Page] --> B[Auth Check] --> C[Dashboard]
```

Multi-line description:

```
flowchart LR
    accTitle: User login flow
    accDescr {
        This diagram shows the complete
        user authentication flow from
        the login page to the dashboard.
    }

    A --> B --> C
```

## Security Levels

Set via `mermaid.initialize({ securityLevel: '...' })`:

| Level | Description |
|-------|-------------|
| `strict` | Default. Tags are encoded, click events disabled |
| `loose` | Tags are allowed, click events enabled |
| `antiscript` | Tags allowed, script tags removed |
| `sandbox` | Renders in sandboxed iframe |

> Use `loose` only when you need interactive click events on nodes.

## Diagram-Specific Configuration

### Gantt

```
---
config:
  gantt:
    useWidth: 960
    useMaxWidth: false
    barHeight: 20
    barGap: 4
    topPadding: 50
    rightPadding: 75
    leftPadding: 75
    gridLineStartPadding: 35
    fontSize: 11
    sectionFontSize: 11
    numberSectionStyles: 4
    dateFormat: YYYY-MM-DD
    axisFormat: "%Y-%m-%d"
    tickInterval: 1week
    topAxis: false
    displayMode: compact
    weekday: monday
---
```

Key gantt options:
- `useWidth` — fixed pixel width (overrides container)
- `useMaxWidth` — `true` = responsive to container, `false` = use `useWidth`
- `displayMode: compact` — overlaps non-conflicting tasks to save vertical space
- `topAxis` — show date axis on top instead of bottom
- `weekday` — first day of the week (`monday`, `sunday`)
- `tickInterval` — axis tick spacing (`1day`, `1week`, `1month`)

### Sequence Diagram

```
---
config:
  sequence:
    mirrorActors: true
    showSequenceNumbers: false
    actorMargin: 50
    width: 150
    height: 65
    boxMargin: 10
    boxTextMargin: 5
    noteMargin: 10
    messageMargin: 35
    messageAlign: center
    wrap: false
    useMaxWidth: true
---
```

Key sequence options:
- `mirrorActors` — repeat actor boxes at the bottom
- `showSequenceNumbers` — auto-number messages
- `wrap` — wrap long message text
- `messageAlign` — `left`, `center`, `right`

### Flowchart

```
---
config:
  flowchart:
    curve: basis
    padding: 15
    nodeSpacing: 50
    rankSpacing: 50
    useMaxWidth: true
    htmlLabels: true
    defaultRenderer: dagre
    wrappingWidth: 200
---
```

Key flowchart options:
- `curve` — line style: `basis`, `linear`, `cardinal`, `monotoneX`, `monotoneY`, `natural`, `step`, `stepAfter`, `stepBefore`
- `htmlLabels` — `true` allows HTML/markdown in labels
- `wrappingWidth` — max label width before wrapping

### Class Diagram

```
---
config:
  class:
    useMaxWidth: true
    defaultRenderer: dagre
---
```

### State Diagram

```
---
config:
  state:
    useMaxWidth: true
    defaultRenderer: dagre
---
```

### ER Diagram

```
---
config:
  er:
    useMaxWidth: true
    layoutDirection: TB
    minEntityWidth: 100
    minEntityHeight: 75
    entityPadding: 15
    fontSize: 12
---
```

### Pie Chart

```
---
config:
  pie:
    useMaxWidth: true
    textPosition: 0.75
---
```

- `textPosition` — 0.0 (center) to 1.0 (edge), controls label placement

### Mindmap

```
---
config:
  mindmap:
    useMaxWidth: true
    padding: 10
    maxNodeWidth: 200
---
```

### Timeline

```
---
config:
  timeline:
    useMaxWidth: true
    padding: 50
---
```

## Global Options via initialize()

```javascript
mermaid.initialize({
  startOnLoad: true,          // auto-render on page load
  theme: 'base',              // theme name
  themeVariables: {},          // custom colors (base theme only)
  securityLevel: 'strict',    // security level
  logLevel: 'fatal',          // log level: trace, debug, info, warn, error, fatal
  deterministicIds: true,     // stable IDs for testing
  maxTextSize: 50000,         // max diagram text size in characters
  maxEdges: 500,              // max number of edges
  look: 'classic',            // classic or handDrawn
  layout: 'dagre',            // dagre or elk
  fontFamily: 'sans-serif',   // global font
  altFontFamily: 'sans-serif' // fallback font
});
```
