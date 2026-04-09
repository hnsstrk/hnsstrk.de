# Gantt Chart

## Basic Syntax
```
gantt
    title Project Plan
    dateFormat YYYY-MM-DD
    axisFormat %d.%m.
    tickInterval 2week
    section Phase 1
        Task A :done, a1, 2026-01-01, 30d
        Task B :active, a2, after a1, 20d
    section Phase 2
        Task C :a3, after a2, 40d
```

## CRITICAL: Width Fix
Gantt charts often render too narrow. Fix via frontmatter:
```
---
config:
  gantt:
    useWidth: 960
---
gantt
    ...
```

## Task Metadata
Format: `Title : [tags,] [id,] start, end/duration`

### Tags (optional, must come first)
| Tag | Meaning |
|-----|---------|
| `done` | Completed |
| `active` | In progress |
| `crit` | Critical path |
| `milestone` | Single point in time |

Tags combinable: `crit, done, t1, 2026-01-01, 10d`

### Start Date
- Specific date: `2026-01-01`
- After another task: `after a1`
- Omitted: starts after previous task ends

### End/Duration
- Specific date: `2026-03-15`
- Duration: `30d`, `2w`, `1M`
- Until another task: `until a3` (v10.9+)

### Duration Units
`ms`, `s`, `m`, `h`, `d`, `w`, `M`, `y` — decimals allowed (e.g. `1.5d`)

## dateFormat (Input)
Default: `YYYY-MM-DD`. dayjs tokens:
`YYYY`, `YY`, `M`, `MM`, `MMM`, `MMMM`, `D`, `DD`, `H`, `HH`, `h`, `hh`, `m`, `mm`, `s`, `ss`, `X` (unix), `x` (unix ms)

## axisFormat (Output)
Default: `YYYY-MM-DD`. d3-time-format tokens:
| Token | Output |
|-------|--------|
| `%Y` | 2026 |
| `%m` | 01-12 |
| `%d` | 01-31 |
| `%b` | Jan-Dec |
| `%B` | January |
| `%H` | 00-23 |
| `%M` | 00-59 |
| `%e` | 1-31 (space-padded) |
| `%a` | Mon-Sun |

## tickInterval
Pattern: `/^([1-9][0-9]*)(millisecond|second|minute|hour|day|week|month)$/`
```
tickInterval 1day
tickInterval 1week
tickInterval 2week
tickInterval 1month
```

## Excludes
```
excludes weekends
excludes 2026-01-01, 2026-12-25
excludes sunday
weekend friday    %% v11+: define weekend start
```

## todayMarker
```
todayMarker stroke-width:5px,stroke:#f29718,opacity:0.8
todayMarker off
```

## Sections
```
section Design
    Task 1 :t1, 2026-01-01, 2w
section Development
    Task 2 :t2, after t1, 3w
```

## Milestones
```
Release :milestone, m1, 2026-03-15, 0d
```

## Compact Mode
```
---
displayMode: compact
---
gantt
    ...
```

## Configuration Options
| Option | Default | Description |
|--------|---------|-------------|
| `useWidth` | undefined | Fixed SVG width in px |
| `useMaxWidth` | true | Responsive to container |
| `barHeight` | 20 | Task bar height |
| `barGap` | 4 | Gap between bars |
| `topPadding` | 75 | Top margin |
| `leftPadding` | 75 | Left section label space |
| `rightPadding` | 75 | Right section label space |
| `fontSize` | 12 | Font size |
| `numberSectionStyles` | 1 | Alternating section colors (1-4) |
| `topAxis` | false | Date labels at top |
| `weekday` | sunday | Week start for tickInterval |

## Click Events
```
click taskId call callback()
click taskId href "url"
```
Requires `securityLevel: 'loose'`
