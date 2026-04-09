# Pie Chart

## Syntax
```
pie showData
    title Favorite Pets
    "Dogs" : 386
    "Cats" : 85
    "Rats" : 15
```

## Keywords
- `pie` — starts the diagram
- `showData` — (optional) display values after legend text
- `title` — (optional) diagram title

## Data Format
```
"Label" : positive_number
```
- Values must be positive and > 0
- Up to 2 decimal places
- Slices rendered clockwise in label order

## Configuration
```yaml
config:
  pie:
    textPosition: 0.75  # 0.0=center, 1.0=edge
```

## Theme Variables
| Variable | Default | Description |
|----------|---------|-------------|
| `pie1`–`pie12` | auto | Slice fill colors |
| `pieTitleTextSize` | 25px | Title font size |
| `pieTitleTextColor` | — | Title color |
| `pieSectionTextSize` | 17px | Section label size |
| `pieSectionTextColor` | — | Section label color |
| `pieLegendTextSize` | 17px | Legend font size |
| `pieStrokeColor` | black | Slice border color |
| `pieStrokeWidth` | 2px | Slice border width |
| `pieOpacity` | 0.7 | Slice opacity |
