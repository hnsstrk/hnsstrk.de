---
title: "noctalia-custom-plugins"
description: "Plugin-Repository für Noctalia Shell — Taskwarrior-Client und weitere Erweiterungen für den Quickshell-basierten Wayland-Compositor"
date: 2024-03-01
tags: ["QML", "KDE", "Wayland", "Linux", "Desktop"]
technologies: ["QML", "JavaScript", "Quickshell"]
github: "https://github.com/hnsstrk/noctalia-custom-plugins"
category: "Desktop-Bastelei"
weight: 1
---

Plugin-Repository für Noctalia Shell, einen Wayland-Compositor auf Basis des Quickshell-Frameworks. Aktuell enthält das Repo ein Plugin — weitere sind in Planung.

**Linux · MIT · v2.0.0 · aktiv entwickelt**

## Worum es geht

Noctalia Shell lässt sich über Plugins erweitern, die als QML/JavaScript-Pakete zur Laufzeit geladen werden. Dieses Repository sammelt eigene Plugins, die nicht zum Core gehören, aber auf anderen Systemen wiederverwendbar sein sollen.

## Taskwarrior-Plugin

**Vollständiger Taskwarrior-Client als Quickshell-Plugin.**

Ein Statusbar-Widget zeigt offene, überfällige und heute fällige Aufgaben; ein zugehöriges Popup-Panel bietet Filtern, Sortierung und Inline-Bearbeitung. Die Kommunikation mit der Shell läuft über den Noctalia-IPC-Handler. Ein integriertes Übersetzungssystem ermöglicht mehrsprachige Oberflächen.

## Technik

Die Plugins sind in QML und JavaScript geschrieben und werden vom Quickshell-Framework direkt zur Laufzeit interpretiert — es gibt keinen Build-Schritt. Jedes Plugin folgt einem einheitlichen Layout: `manifest.json`, `Main.qml` für die IPC-Anbindung, `BarWidget.qml` für die Statusbar, `Panel.qml` für das Popup und `Settings.qml` für die Konfiguration. Eine Plugin-Registry wird automatisch über GitHub Actions generiert. Vier Architecture Decision Records dokumentieren die wesentlichen Entscheidungen: QML ohne Build-Step, Qt6-only, semantische Versionierung und automatisierte Code-Reviews.

## Installation

Repository klonen und das gewünschte Plugin-Verzeichnis in den Noctalia-Shell-Plugin-Pfad legen. Die `manifest.json` im jeweiligen Plugin-Ordner beschreibt die Abhängigkeiten und Einstiegspunkte.
