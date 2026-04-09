# Class Diagram

## Basic Syntax
```
classDiagram
    class BankAccount {
        +String owner
        +BigDecimal balance
        +deposit(amount) bool
        +withdrawal(amount) int
    }
```

## Members
- No parentheses = attribute: `+String name`
- With parentheses = method: `+deposit(amount) bool`
- Return type after closing paren

## Visibility
| Symbol | Access |
|--------|--------|
| `+` | Public |
| `-` | Private |
| `#` | Protected |
| `~` | Package/Internal |

Classifiers: `*` = abstract (`method()*`), `$` = static (`method()$`, `field$`)

## Generics
```
class Square~Shape~{
    List~int~ position
    getPoints() List~int~
}
```
Use `~` instead of `<>`.

## Relationships
| Syntax | Type |
|--------|------|
| `A <\|-- B` | Inheritance |
| `A *-- B` | Composition |
| `A o-- B` | Aggregation |
| `A --> B` | Association |
| `A -- B` | Solid link |
| `A ..> B` | Dependency |
| `A ..\|> B` | Realization |
| `A .. B` | Dashed link |

### Labels & Cardinality
```
Customer "1" --> "*" Ticket : purchases
Student "1" --> "1..*" Course
```

## Lollipop Interfaces
```
bar ()-- foo
```

## Namespaces
```
namespace BaseShapes {
    class Triangle
    class Rectangle { double width }
}
```

## Annotations
```
class Shape {
    <<interface>>
    draw()
}
<<abstract>> Animal
<<enumeration>> Color
```

## Notes
```
note "General note"
note for MyClass "Class-specific note"
```

## Direction
```
classDiagram
    direction RL
```

## Styling
```
style Animal fill:#f9f,stroke:#333
classDef important fill:#f00;
class Animal:::important
```

## Config
```yaml
config:
  class:
    hideEmptyMembersBox: true
```
