# State Diagram

Use `stateDiagram-v2` (preferred over `stateDiagram`).

## Basic
```
stateDiagram-v2
    [*] --> Still        %% Start
    Still --> Moving
    Moving --> Crash
    Crash --> [*]        %% End
```

## States
```
stateId                          %% ID only
state "Description" as s2        %% With alias
s2 : This is a description      %% ID : Description
```

## Transitions
```
s1 --> s2
s1 --> s2: A transition label
```

## Composite States
```
state First {
    [*] --> Second
    state Second {
        [*] --> inner
        inner --> [*]
    }
}
```

## Choice
```
state if_state <<choice>>
[*] --> IsPositive
IsPositive --> if_state
if_state --> False: if n < 0
if_state --> True : if n >= 0
```

## Fork / Join
```
state fork_state <<fork>>
state join_state <<join>>
[*] --> fork_state
fork_state --> State2
fork_state --> State3
State2 --> join_state
State3 --> join_state
join_state --> State4
```

## Notes
```
note right of State1
    Important info
end note
note left of State2 : Single line
```

## Concurrency
```
state Active {
    [*] --> NumLockOff
    NumLockOff --> NumLockOn : Press
    --
    [*] --> CapsLockOff
    CapsLockOff --> CapsLockOn : Press
}
```
`--` separates parallel regions.

## Direction
```
stateDiagram-v2
    direction LR
```
Also works inside composite states.

## Styling
```
classDef badEvent fill:#f00,color:white,font-weight:bold
class Crash:::badEvent
```
Limitations: Cannot style [*] states or inside composite states.
