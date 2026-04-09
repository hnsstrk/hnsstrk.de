# Architecture Diagram

## Syntax
```
architecture-beta
    group api(cloud)[API]

    service db(database)[Database] in api
    service server(server)[Server] in api
    service disk(disk)[Storage] in api

    db:L -- R:server
    server:T -- B:disk
```

## Groups
```
group name(icon)[Label]
group name(icon)[Label] in parentGroup
```

## Services
```
service name(icon)[Label]
service name(icon)[Label] in groupName
```

## Icons
Built-in icons: `cloud`, `database`, `disk`, `internet`, `server`

Register custom icons:
```yaml
config:
  architecture:
    iconProviders:
      - name: "fa"
        url: "https://..."
```

## Edges
```
serviceA:side -- side:serviceB
serviceA:side <-- side:serviceB   %% directional
```

### Sides
- `T` — Top
- `B` — Bottom
- `L` — Left
- `R` — Right

### Edge Notation
```
db:R -- L:server              %% bidirectional
db:R --> L:server             %% arrow right
db:R <-- L:server             %% arrow left
db:R <--> L:server            %% arrows both
```

## Example
```
architecture-beta
    group cloud(cloud)[Cloud]
    group local(server)[Local]

    service api(internet)[API Gateway] in cloud
    service app(server)[App Server] in cloud
    service db(database)[PostgreSQL] in cloud
    service cache(disk)[Redis] in local

    api:R -- L:app
    app:R -- L:db
    app:B -- T:cache
```
