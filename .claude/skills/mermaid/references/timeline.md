# Timeline

## Syntax
```
timeline
    title History of Social Media
    2002 : LinkedIn
    2004 : Facebook : Google
    2005 : YouTube
    2006 : Twitter
```

## Grouping (Sections)
```
timeline
    title Timeline of Industrial Revolution
    section 17th-20th century
        Industry 1.0 : Machinery, Water power, Steam power
        Industry 2.0 : Electricity, Internal combustion engine, Mass production
    section 21st century
        Industry 3.0 : Electronics, Computers, Automation
        Industry 4.0 : Internet, Robotics, IoT
```

## Format
```
time_period : event1 : event2 : event3
```
Multiple events per period separated by `:`.

## Styling
Uses cScale theme variables for section colors. Customize via themeVariables:
```yaml
config:
  theme: base
  themeVariables:
    cScale0: "#e8f3f7"
    cScale1: "#eef3de"
```

## Notes
- No inline styling support
- No click events
- Sections are optional — flat timeline is valid
