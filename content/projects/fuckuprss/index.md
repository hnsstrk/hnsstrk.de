---
title: "fuckupRSS"
description: "RSS-Aggregator mit lokaler KI-Analyse-Pipeline"
date: 2026-03-01
tags: ["svelte", "tauri", "ollama", "ki", "rss"]
technologies: ["Svelte 5", "Tauri 2", "Rust", "Ollama", "SQLite"]
github: "https://github.com/hnsstrk/fuckuprss"
category: "KI-Werkzeug"
weight: 2
---

Ein RSS-Aggregator mit 8-stufiger KI-Analyse-Pipeline, die vollstaendig lokal laeuft. Jeder Artikel durchlaeuft automatisch Zusammenfassung, Bias-Erkennung, Embedding und Story-Clustering — ohne Cloud, ohne API-Keys.

## Technologie

- **Svelte 5 + Tauri 2** — Desktop-App mit nativer Performance
- **Rust** — Backend und Tauri-Commands
- **Ollama** — lokale LLM-Inferenz (Ministral 3B, Snowflake Arctic Embed)
- **SQLite + sqlite-vec** — Artikeldaten und Vektorsuche

## Name

Benannt nach dem F.U.C.K.U.P.-Computer aus der *Illuminatus!*-Trilogie. Die Terminologie zieht sich durch die gesamte Anwendung: Artikel heissen Fnords, Feeds sind Pentacles, Kategorien Sephiroth.
