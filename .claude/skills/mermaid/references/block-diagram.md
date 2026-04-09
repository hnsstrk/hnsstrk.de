# Block Diagram

## Syntax
```
block-beta
    columns 3
    A["Block A"] B["Block B"] C["Block C"]
    D["Wide Block"]:3
    E["Half"]:2 F["Third"]:1
```

## Columns
```
columns 3    %% Define column count
```

## Blocks
```
A            %% Simple block (1 column wide)
A:2          %% Block spanning 2 columns
A["Label"]   %% Block with label
A["Label"]:3 %% Labeled block spanning 3 columns
```

## Block Shapes
Same as flowchart: `[]`, `()`, `{}`, `(())`, `[[]]`, `[()]`, `>]`, `{{}}`, etc.

## Nesting
```
block-beta
    columns 2
    block:group1:2
        columns 2
        A B
    end
    C D
```

## Space
```
space       %% Empty cell (1 column)
space:2     %% Empty spanning 2 columns
```

## Edges/Links
```
A --> B
A -- "label" --> B
A ---> B    %% longer
```
Same link syntax as flowcharts.

## Styling
```
style A fill:#f9f,stroke:#333
classDef highlight fill:#fcc;
class A highlight
```

## Example: Architecture
```
block-beta
    columns 3
    Frontend:3
    block:backend:2
        API DB[(Database)]
    end
    Cache
    API --> DB
    Frontend --> API
    API --> Cache
```
