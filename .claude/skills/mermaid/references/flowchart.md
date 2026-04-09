# Flowchart

## Direction
`flowchart LR` — LR, RL, TB/TD, BT

## Node Shapes (classic)
| Syntax | Shape |
|--------|-------|
| `A[text]` | Rectangle |
| `A(text)` | Rounded rect |
| `A([text])` | Stadium |
| `A[[text]]` | Subroutine |
| `A[(text)]` | Cylinder/DB |
| `A((text))` | Circle |
| `A>text]` | Asymmetric |
| `A{text}` | Rhombus |
| `A{{text}}` | Hexagon |
| `A[/text/]` | Parallelogram |
| `A[\text\]` | Parallelogram alt |
| `A[/text\]` | Trapezoid |
| `A[\text/]` | Trapezoid alt |
| `A(((text)))` | Double circle |

### Generic shapes (v11.3+)
```
A@{ shape: diamond, label: "Decision" }
```
Shape names: `rect`, `rounded`, `stadium`, `cyl`, `circle`, `diam`, `hex`, `lean-r`, `lean-l`, `trap-b`, `trap-t`, `dbl-circ`, `text`, `notch-rect`, `lin-rect`, `sm-circ`, `fr-circ`, `fork`, `hourglass`, `brace`, `brace-r`, `braces`, `bolt`, `doc`, `delay`, `h-cyl`, `lin-cyl`, `curv-trap`, `div-rect`, `tri`, `win-pane`, `f-circ`, `lin-doc`, `notch-pent`, `flip-tri`, `sl-rect`, `docs`, `st-rect`, `flag`, `bow-rect`, `cross-circ`, `tag-doc`, `tag-rect`, `bang`, `cloud`, `odd`

## Links
| Syntax | Type |
|--------|------|
| `A --> B` | Arrow |
| `A --- B` | Open link |
| `A -.-> B` | Dotted arrow |
| `A ==> B` | Thick arrow |
| `A ~~~ B` | Invisible |
| `A --o B` | Circle end |
| `A --x B` | Cross end |
| `A <--> B` | Bidirectional |
| `A o--o B` | Bi circle |
| `A x--x B` | Bi cross |

### Text on links
```
A -->|text| B
A -- text --> B
```

### Link length
Extra dashes = longer: `-->`, `--->`, `---->` (1, 2, 3 ranks)

### Link chaining
```
A --> B --> C
A --> B & C --> D
```

## Subgraphs
```
subgraph id [Title]
    direction LR
    A --> B
end
```
- Edges to/from subgraphs: `subgraphId --> nodeId`
- Nesting allowed

## Markdown Strings
```
A["`**Bold** and _italic_`"]
```

## Styling
```
style id1 fill:#f9f,stroke:#333,stroke-width:4px
classDef myClass fill:#f9f,stroke:#333;
class nodeId myClass;
A:::myClass --> B
classDef default fill:#f9f;
linkStyle 3 stroke:#ff3,stroke-width:4px;
```

## FontAwesome
```
B["fa:fa-twitter for peace"]
```

## Interaction
```
click nodeId href "url" _blank
click nodeId call callback()
```
Requires `securityLevel: 'loose'`

## Config
```yaml
config:
  flowchart:
    curve: stepBefore  # basis, linear, monotoneX, step, etc.
    defaultRenderer: dagre  # or elk
```

## Warnings
- `end` keyword breaks flowcharts — wrap in quotes: `["end"]`
- `o` or `x` after `---` creates circle/cross ends — add space
