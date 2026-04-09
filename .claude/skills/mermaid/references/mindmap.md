# Mindmap

## Syntax
Hierarchy determined by indentation:
```
mindmap
    Root
        Branch A
            Leaf 1
            Leaf 2
        Branch B
            Leaf 3
```

## Node Shapes
| Syntax | Shape |
|--------|-------|
| `id[text]` | Square |
| `id(text)` | Rounded square |
| `id((text))` | Circle |
| `id))text((` | Bang |
| `id)text(` | Cloud |
| `id{{text}}` | Hexagon |
| `text` | Default rectangle |

## Icons
```
mindmap
    Root
        A
        ::icon(fa fa-book)
        B
        ::icon(mdi mdi-skull-outline)
```
Supports Font Awesome (`fa`) and Material Design Icons (`mdi`).

## CSS Classes
```
mindmap
    Root
        A[Important]
        :::urgent large
```

## Markdown Strings
```
mindmap
    id1["`**Bold** root with
a second line`"]
        id2["`_italic_ child`"]
```

## Layout Config
```yaml
config:
  layout: tidy-tree
```

## Notes
- Relative indentation matters, not absolute
- Mermaid picks the nearest parent with smaller indent
