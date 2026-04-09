# Sankey Diagram

## Syntax (CSV format)
```
sankey-beta

Agricultural "ichtige waste",Bioenergy,124.729
Bio-conversion,Liquid,0.597
Bio-conversion,Losses,26.862
Bio-conversion,Solid,280.322
Bio-conversion,Gas,81.144
```

## Format
```
sankey-beta

Source,Target,Value
Source,Target,Value
```
- CSV-like: source node, target node, numeric value
- First line after `sankey-beta` can be blank
- Nodes created automatically from source/target names
- Value determines link thickness

## Configuration
```yaml
config:
  sankey:
    showValues: true       # show values on links
    width: 800
    height: 400
    linkColor: "gradient"  # source, target, gradient, or hex
    nodeAlignment: "justify"  # left, right, center, justify
    useMaxWidth: true
    prefix: ""
    suffix: " TWh"
```

## Notes
- Self-referencing links not supported
- Node order determined by algorithm
- Colors cycle through theme palette
