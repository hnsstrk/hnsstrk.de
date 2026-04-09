# Sequence Diagram

## Participants & Actors
```
sequenceDiagram
    participant Alice          %% Rectangle
    actor Bob                  %% Stick figure
    participant A as Alice     %% Alias
```

### Stereotypes (v11+)
```
participant DB@{ "type": "database" }
```
Types: `boundary`, `control`, `entity`, `database`, `collections`, `queue`

## Arrow Types
| Syntax | Description |
|--------|-------------|
| `->` | Solid, no arrowhead |
| `-->` | Dotted, no arrowhead |
| `->>` | Solid, arrowhead |
| `-->>` | Dotted, arrowhead |
| `-x` | Solid, cross |
| `--x` | Dotted, cross |
| `-)` | Solid, open (async) |
| `--)` | Dotted, open (async) |
| `<<->>` | Bidirectional solid (v11+) |
| `<<-->>` | Bidirectional dotted (v11+) |

## Activations
```
activate John
deactivate John
%% Shorthand with +/-
Alice->>+John: Hello
John-->>-Alice: Great!
```
Stacking: multiple `+` without `-` = nested activations

## Notes
```
Note right of John: Text here
Note left of Alice: Text here
Note over Alice,John: Spanning note
```

## Grouping Constructs
```
loop Every minute
    A->>B: ping
end

alt is sick
    B->>A: Not good
else is well
    B->>A: Great
end

opt Extra response
    B->>A: Thanks
end

par Alice to Bob
    A->>B: Hello
and Alice to John
    A->>J: Hello
end

critical DB connection
    S->>DB: connect
option Timeout
    S->>S: Log error
end

break when error
    API->>C: failure
end
```

## Background Highlighting
```
rect rgb(191, 223, 255)
    Alice->>+John: Hello
    John-->>-Alice: Great!
end
```
Supports `rgb()` and `rgba()`

## Autonumber
```
sequenceDiagram
    autonumber
    Alice->>John: Hello
```

## Actor Creation/Destruction (v10.3+)
```
create participant Carl
Alice->>Carl: Hi!
destroy Carl
Alice-xCarl: Goodbye
```

## Box Grouping
```
box Purple Alice & John
    participant A
    participant J
end
box rgb(33,66,99)
    participant B
end
```

## Line Breaks
```
Alice->John: Hello<br/>How are you?
```

## Actor Links
```
link Alice: Dashboard @ https://example.com
```

## Config
```javascript
{
  sequence: {
    mirrorActors: true,
    diagramMarginX: 50,
    actorFontSize: 14,
    noteFontSize: 14,
    messageFontSize: 16
  }
}
```

## CSS Classes
`.actor`, `.actor-line`, `.messageLine0` (solid), `.messageLine1` (dotted), `.messageText`, `.note`, `.noteText`, `.labelBox`, `.loopText`
