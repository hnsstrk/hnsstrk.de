# Other Diagram Types

## Quadrant Chart
```
quadrant-beta
    title Reach and engagement of campaigns
    x-axis Low Reach --> High Reach
    y-axis Low Engagement --> High Engagement
    quadrant-1 We should expand
    quadrant-2 Need to promote
    quadrant-3 Re-evaluate
    quadrant-4 May be improved
    Campaign A: [0.3, 0.6]
    Campaign B: [0.45, 0.23]
```
Config: `quadrantChart: { chartWidth, chartHeight, titleFontSize, pointRadius, pointLabelFontSize }`

## Requirement Diagram
```
requirementDiagram
    requirement test_req {
        id: 1
        text: the test text
        risk: high
        verifymethod: test
    }
    element test_entity {
        type: simulation
    }
    test_entity - satisfies -> test_req
```
Relationship types: `contains`, `copies`, `derives`, `satisfies`, `verifies`, `refines`, `traces`

## C4 Diagram
```
C4Context
    title System Context diagram
    Person(customer, "Customer", "A customer")
    System(system, "System", "The main system")
    Rel(customer, system, "Uses")
```
Diagram types: `C4Context`, `C4Container`, `C4Component`, `C4Dynamic`, `C4Deployment`
Elements: `Person`, `System`, `Container`, `Component`, `Rel`, `Boundary`, `System_Ext`

## ZenUML
```
zenuml
    Alice->John: Hello
    John->Alice: Hi
    if(�) {
        Alice->John: Are you free?
    }
```
Alternative sequence diagram syntax with programming-like constructs: `if/else`, `while`, `try/catch`, `par`.

## User Journey
```
journey
    title My working day
    section Go to work
        Make tea: 5: Me
        Go upstairs: 3: Me
        Do work: 1: Me, Cat
    section Go home
        Go downstairs: 5: Me
        Sit down: 5: Me
```
Format: `Task name: score(0-5): actor1, actor2`

## Packet Diagram
```
packet-beta
    0-15: "Source Port"
    16-31: "Destination Port"
    32-63: "Sequence Number"
    64-95: "Acknowledgment Number"
```
Format: `start-end: "Label"`. Shows bit-level packet structure.

## Radar Chart
```
radar-beta
    title Skill Assessment
    axis Speed, Reliability, Comfort, Safety, Efficiency
    curve a["Car A"] { 4, 3, 5, 4, 2 }
    curve b["Car B"] { 2, 5, 3, 5, 4 }
    max 5
```

## Treemap
```
treemap-beta
    root("Portfolio")
        tech("Tech")
            AAPL("Apple") 3000
            MSFT("Microsoft") 2500
        health("Health")
            JNJ("J&J") 1500
```
Value determines area size. Hierarchy via indentation.

## Venn Diagram
```
venn-beta
    title Set Relations
    set A["Set A"]
    set B["Set B"]
    intersection AB["A ∩ B"]
```

## Ishikawa (Fishbone)
```
ishikawa-beta
    title Quality Problem
    category People
        Lack of training
        Insufficient staff
    category Process
        No standard procedure
    category Materials
        Defective parts
```

## TreeView
```
treeView-beta
    root("Root")
        child1("Child 1")
            leaf1("Leaf")
        child2("Child 2")
```
Collapsible tree structure via indentation.

## Notes
- Many of these are in beta (`-beta` suffix)
- Styling mostly via themeVariables, limited inline styling
- Check mermaid.js.org for latest syntax as beta features evolve
