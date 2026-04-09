# Entity Relationship Diagram

## Basic Syntax
```
erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses
```

## Relationship Notation
Left side + line + right side + `:` + label

### Cardinality
| Value | Meaning |
|-------|---------|
| `\|o` | Zero or one |
| `\|\|` | Exactly one |
| `}o` | Zero or more |
| `}\|` | One or more |

### Line Type
| Syntax | Type |
|--------|------|
| `--` | Identifying (solid) |
| `..` | Non-identifying (dashed) |

### Examples
```
CUSTOMER ||--o{ ORDER : places        %% one customer, many orders
ORDER ||--|{ LINE-ITEM : contains     %% one order, one+ items
PERSON }|..|{ ADDRESS : "lives at"   %% many-to-many, non-identifying
```

## Entity Attributes
```
CUSTOMER {
    string name PK "The name"
    int age
    string email UK
    string address
}
ORDER {
    int id PK
    int customerId FK
    date created
    string status
}
```

### Attribute Keys
- `PK` — Primary Key
- `FK` — Foreign Key
- `UK` — Unique Key

### Attribute Types
Any alphanumeric string (no enforced type system).

## Entity Aliases
```
p[Person]
a["Delivery Address"]
```

## Direction
Add `direction` at the top of the diagram:
```
erDiagram
    direction LR
```

## Styling
Limited to themeVariables only (no inline styling).
