---
title: "Mermaid-Diagramme im Ayu-Theme: Praxisleitfaden für den Blog"
date: 2026-04-09
draft: false
description: "Technischer Leitfaden für Mermaid im Blog: Diagrammtypen, Ayu-Farbpalette, Theme-Wechsel und Gantt-Konfiguration."
tags: ["Mermaid", "Diagramme", "Hugo", "Ayu", "Dokumentation"]
mermaid:
  gantt:
    axisFormat: "%d.%m."
    tickInterval: "2week"
    useWidth: 960
---

Mermaid ist eine textbasierte Diagrammsprache, mit der sich technische Zusammenhänge direkt in Markdown dokumentieren lassen. Für den Blog ist das besonders nützlich, weil Diagramme versionierbar bleiben, sich in Pull Requests prüfen lassen und im gleichen redaktionellen Workflow entstehen wie der restliche Inhalt.

<!--more-->

## Ayu-Anpassung im Projekt

Die Diagramme werden im Projekt konsequent über das Mermaid-`base`-Theme angepasst. Nur dieses Theme erlaubt eine kontrollierte Überschreibung der Farbvariablen, ohne auf hardcodierte Styles in einzelnen Diagrammen zurückzugreifen.

Die Farbskala basiert auf acht Ayu-Syntaxfarben aus dem NPM-Paket `ayu` und wird in Regenbogen-Reihenfolge auf die `cScale`-Variablen gemappt:

1. `markup` (rot)
2. `keyword` (orange)
3. `func` (gelb)
4. `string` (grün)
5. `regexp` (teal)
6. `tag` (blau)
7. `constant` (violett)
8. `operator` (rosa)

Die Node-Hintergründe verwenden die vollen Ayu-Syntaxfarben bei 100 % Sättigung. Schrift und Rahmen werden dynamisch per `darken()`-Funktion berechnet: gleicher Farbton, aber abgedunkelt (Text auf 45 %, Border auf 65 %). So entsteht ein stimmiger, monochromatischer Look pro Node, während der Kontrast über Light, Mirage und Dark hinweg konsistent bleibt.

Beim Theme-Wechsel werden Diagramme neu gerendert. Dadurch übernehmen sie unmittelbar die passenden Variablen des aktiven Ayu-Themes.

Für Gantt-Diagramme gilt zusätzlich eine feste Konfiguration: `axisFormat`, `tickInterval` und `useWidth: 960`. Diese Vorgaben sind im Frontmatter dieser Seite hinterlegt und sorgen für einheitliche Achsen und stabile Breite.

## Flowchart (einfach)

Dieses Beispiel zeigt die Grundelemente eines Flowcharts: Start, Entscheidung, verzweigte Pfade und Zusammenführung.

```mermaid
flowchart TD
    A[Anfrage eingegangen] --> B{Validierung erfolgreich?}
    B -->|Ja| C[Daten verarbeiten]
    B -->|Nein| D[Fehler zurückgeben]
    C --> E[Antwort erzeugen]
    D --> E
    E --> F[Prozess beendet]
```

## Flowchart (komplex)

Der komplexere Ablauf demonstriert Subgraphs, mehrere Services und parallele Datenpfade innerhalb einer typischen Webarchitektur.

```mermaid
flowchart LR
    Client[Client] --> Gateway[API Gateway]
    Gateway --> Auth[Auth Service]
    Gateway --> App[Application Service]

    subgraph Datenebene
        Cache[Redis Cache]
        DB[(PostgreSQL)]
        Queue[Job Queue]
    end

    App --> Cache
    App --> DB
    App --> Queue
    Queue --> Worker[Background Worker]
    Worker --> DB
    Auth --> Token[(Token Store)]
```

## Sequence Diagram

Das Sequenzdiagramm zeigt die zeitliche Reihenfolge zwischen Browser, API und Datenbank inklusive Aktivierungsphasen und Antwortfluss.

```mermaid
sequenceDiagram
    participant Browser
    participant API
    participant Datenbank

    Browser->>API: GET /artikel
    activate API
    API->>Datenbank: SELECT * FROM posts
    activate Datenbank
    Datenbank-->>API: Ergebnisliste
    deactivate Datenbank
    API-->>Browser: 200 OK + JSON
    deactivate API
```

## Class Diagram

Hier werden Klassen, Eigenschaften, Methoden und Beziehungen modelliert. Das Beispiel bildet eine kleine Struktur für Theme-Verwaltung ab.

```mermaid
classDiagram
    class ThemeConfig {
        +name: String
        +palette: String[]
        +apply(): void
    }

    class AyuLight {
        +background: String
    }

    class AyuMirage {
        +background: String
    }

    class AyuDark {
        +background: String
    }

    ThemeConfig <|-- AyuLight
    ThemeConfig <|-- AyuMirage
    ThemeConfig <|-- AyuDark
```

## State Diagram

Das Zustandsdiagramm veranschaulicht die Wechsel zwischen den drei Theme-Zuständen und den Rücksprung in den Ausgangspunkt.

```mermaid
stateDiagram-v2
    [*] --> Light
    Light --> Mirage: Theme wechseln
    Mirage --> Dark: Theme wechseln
    Dark --> Light: Theme wechseln
    Light --> [*]
```

## Pie Chart

Das Tortendiagramm eignet sich für einfache Verteilungen. Gezeigt wird die Aufteilung typischer Bloginhalte.

```mermaid
pie showData
    title Inhaltsanteile im Technikblog
    "Tutorials" : 40
    "Architektur" : 25
    "Release Notes" : 15
    "Betrieb" : 20
```

## Mindmap

Die Mindmap demonstriert hierarchische Strukturierung, etwa zur Planung einer Beitragserie rund um Dokumentation und Betrieb.

```mermaid
mindmap
  root((Mermaid im Blog))
    Inhalt
      Diagrammtypen
      Redaktionsrichtlinien
      Beispiele
    Technik
      Theme-Integration
      Build-Validierung
      Performance
    Qualität
      Syntaxprüfung
      Lesbarkeit
      Konsistenz
```

## ER-Diagramm

Das ER-Diagramm zeigt Entitäten, Attribute und Kardinalitäten für ein vereinfachtes Blog-Datenmodell.

```mermaid
erDiagram
    AUTHOR ||--o{ POST : schreibt
    POST ||--o{ COMMENT : hat
    POST }o--o{ TAG : nutzt

    AUTHOR {
        int id PK
        string name
        string email
    }

    POST {
        int id PK
        string title
        datetime published_at
    }

    COMMENT {
        int id PK
        string body
        datetime created_at
    }

    TAG {
        int id PK
        string slug
    }
```

## Gantt Chart

Das Gantt-Diagramm bildet einen realistischen Projektplan mit Abschnitten, abhängigen Aufgaben und Statusmarkierungen ab. Durch `axisFormat`, `tickInterval` und feste Breite bleibt die Darstellung über Themes und Viewports hinweg berechenbar.

```mermaid
gantt
    title Release-Plan Q2
    dateFormat YYYY-MM-DD
    axisFormat %d.%m.
    tickInterval 2week

    section Konzeption
    Anforderungen         :done, a1, 2026-04-01, 10d
    Architektur           :done, a2, after a1, 8d

    section Umsetzung
    Frontend              :active, a3, after a2, 20d
    Backend               :a4, after a2, 18d

    section Qualität
    Integrationstests     :a5, after a3, 10d
    Rollout               :a6, after a5, 5d
```

## Regeln für neue Diagramme

1. Keine hardcodierten `style`-Direktiven in Mermaid-Blöcken verwenden.
2. Theme-Farben ausschließlich über das zentrale Ayu-`base`-Theme steuern.
3. Bei Gantt-Diagrammen `axisFormat`, `tickInterval` und `useWidth: 960` verbindlich setzen.
4. Mermaid-Syntax pro Diagrammtyp strikt einhalten und vor dem Merge rendern.
5. Jedes Diagramm mit kurzem Kontexttext versehen: Zweck, Aussage und gezeigte Features.
