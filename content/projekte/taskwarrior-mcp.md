---
title: "taskwarrior-mcp"
description: "MCP-Server für Taskwarrior-Integration mit Claude"
date: 2025-01-15
tags: ["python", "mcp", "taskwarrior", "ai"]
technologies: ["Python", "MCP Protocol", "Taskwarrior"]
github: "https://github.com/hnsstrk/taskwarrior-mcp"
category: "Bastelprojekt"
weight: 1
---

Ein MCP-Server (Model Context Protocol), der Claude direkten Zugriff auf meine Taskwarrior-Datenbank gibt. Damit kann ich Tasks erstellen, abfragen und verwalten — direkt aus dem Chat heraus.

## Warum?

Taskwarrior ist mein zentrales Tool für Aufgabenverwaltung. Statt zwischen Terminal und Chat hin und her zu wechseln, spricht Claude jetzt direkt mit Taskwarrior.

## Technologie

- **Python** als Basis
- **MCP Protocol** für die Claude-Integration
- **Taskwarrior CLI** als Backend
