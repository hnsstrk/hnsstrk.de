# XY Chart

## Syntax
```
xychart-beta
    title "Sales Revenue"
    x-axis [jan, feb, mar, apr, may]
    y-axis "Revenue (in $)" 4000 --> 11000
    bar [5000, 6000, 7500, 8200, 9500]
    line [5000, 6000, 7000, 8000, 9000]
```

## Axes
```
x-axis "Label" [val1, val2, val3]           %% categorical
x-axis "Label" 1.5 --> 6.5                   %% numerical range
y-axis "Label" 0 --> 100                     %% numerical range
```

## Data Series
```
bar [5, 10, 15, 20]          %% Bar chart
line [5, 10, 15, 20]         %% Line chart
```
Multiple series allowed — mix bar and line.

## Configuration
```yaml
config:
  xyChart:
    width: 800
    height: 500
    titleFontSize: 20
    titlePadding: 10
    xAxis:
      labelFontSize: 14
      labelPadding: 5
      tickLength: 5
      titleFontSize: 16
      titlePadding: 10
      showLabel: true
      showTitle: true
      showTick: true
      showAxisLine: true
    yAxis:
      labelFontSize: 14
      labelPadding: 5
      tickLength: 5
      tickCount: 5
      titleFontSize: 16
      titlePadding: 10
      showLabel: true
      showTitle: true
      showTick: true
      showAxisLine: true
    chartOrientation: vertical   # or horizontal
    plotReservedSpacePercent: 50
```

## Theme Variables
`xyChart`: `backgroundColor`, `titleColor`, `xAxisTitleColor`, `xAxisLabelColor`, `xAxisTickColor`, `xAxisLineColor`, `yAxisTitleColor`, `yAxisLabelColor`, `yAxisTickColor`, `yAxisLineColor`, `plotColorPalette` (comma-separated hex colors)
