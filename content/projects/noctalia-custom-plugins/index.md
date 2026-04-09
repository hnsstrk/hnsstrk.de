---
title: "noctalia-custom-plugins"
description: "Plugin-Repository fuer Noctalia Shell — einen Wayland-Compositor auf Basis von Quickshell"
date: 2024-03-01
tags: ["qml", "kde", "wayland", "linux", "desktop"]
technologies: ["QML", "JavaScript", "Quickshell"]
github: "https://github.com/hnsstrk/noctalia-custom-plugins"
category: "Desktop-Bastelei"
weight: 1
---

Plugin-Repository fuer [Noctalia Shell](https://github.com/hnsstrk/noctalia-custom-plugins), einen Wayland-Compositor auf Basis des Quickshell-Frameworks. Aktuell enthaelt das Repo ein Plugin — weitere sind in Planung.

## Taskwarrior-Plugin (v2.0.0)

Ein vollstaendiger Taskwarrior-Client als QML/JavaScript-Plugin:

- **Statusbar-Widget** — zeigt offene, ueberfaellige und heute faellige Tasks
- **Popup-Panel** — Taskliste mit Filtern, Sortierung und Inline-Bearbeitung
- **IPC-Handler** — Plugin-Kommunikation ueber Noctalia-Messaging
- **i18n** — Uebersetzungssystem fuer mehrsprachige Oberflaechen

## Architektur

- **Kein Build-Schritt** — QML wird zur Laufzeit vom Quickshell-Framework interpretiert
- **Plugin-Layout**: `manifest.json`, `Main.qml` (IPC), `BarWidget.qml` (Statusbar), `Panel.qml` (Popup), `Settings.qml`
- **Registry**: Automatische Generierung via GitHub Actions
- **4 ADRs** dokumentieren Architekturentscheidungen (QML ohne Build, Qt6-only, SemVer, automatisierte Reviews)

## Links

- [GitHub Repository](https://github.com/hnsstrk/noctalia-custom-plugins)
