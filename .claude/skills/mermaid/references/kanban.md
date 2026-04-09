# Kanban Board

## Syntax
```
kanban
    Todo
        task1[Design mockups]
        task2[Write specs]
    In Progress
        task3[Build API]@{ assigned: "Alice" }
    Done
        task4[Setup CI/CD]@{ completed: true }
```

## Structure
```
kanban
    ColumnName
        taskId[Task Label]
        taskId[Task Label]@{ metadata }
    AnotherColumn
        taskId[Task Label]
```

## Task Metadata
```
task1[Label]@{ priority: "high", assigned: "Bob", ticket: "PROJ-123" }
```
Metadata is arbitrary key-value pairs.

## Notes
- Columns are defined by top-level items
- Tasks are nested under columns
- Task IDs must be unique
- Metadata with `@{ }` is optional
- Limited styling support — uses theme colors
