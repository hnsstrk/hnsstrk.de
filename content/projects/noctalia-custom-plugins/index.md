---
title: "noctalia-custom-plugins"
description: "Plugin-Repository für Noctalia Shell — einen Wayland-Compositor auf Basis von Quickshell"
date: 2024-03-01
tags: ["QML", "KDE", "Wayland", "Linux", "Desktop"]
technologies: ["QML", "JavaScript", "Quickshell"]
github: "https://github.com/hnsstrk/noctalia-custom-plugins"
category: "Desktop-Bastelei"
weight: 1
---

Plugin-Repository für [Noctalia Shell](https://github.com/hnsstrk/noctalia-custom-plugins), einen Wayland-Compositor auf Basis des Quickshell-Frameworks. Aktuell enthält das Repo ein Plugin — weitere sind in Planung.

## Taskwarrior-Plugin (v2.0.0)

Ein vollständiger Taskwarrior-Client als QML/JavaScript-Plugin:

- **Statusbar-Widget** — zeigt offene, überfällige und heute fällige Tasks
- **Popup-Panel** — Taskliste mit Filtern, Sortierung und Inline-Bearbeitung
- **IPC-Handler** — Plugin-Kommunikation über Noctalia-Messaging
- **i18n** — Übersetzungssystem für mehrsprachige Oberflächen

## Architektur

- **Kein Build-Schritt** — QML wird zur Laufzeit vom Quickshell-Framework interpretiert
- **Plugin-Layout**: `manifest.json`, `Main.qml` (IPC), `BarWidget.qml` (Statusbar), `Panel.qml` (Popup), `Settings.qml`
- **Registry**: Automatische Generierung via GitHub Actions
- **4 ADRs** dokumentieren Architekturentscheidungen (QML ohne Build, Qt6-only, SemVer, automatisierte Reviews)

## Links

- [GitHub Repository](https://github.com/hnsstrk/noctalia-custom-plugins)
