---
title: "fuckupRSS"
description: "RSS-Aggregator mit 8-stufiger lokaler KI-Analyse-Pipeline"
date: 2026-03-01
tags: ["svelte", "tauri", "ollama", "ki", "rss", "rust"]
technologies: ["Svelte 5", "Tauri 2", "Rust", "Ollama", "SQLite"]
category: "KI-Werkzeug"
weight: 2
---

Ein RSS-Aggregator mit einer 8-stufigen KI-Analyse-Pipeline, die vollständig lokal läuft — gebaut mit Svelte 5, Tauri 2 und Ollama. Ohne Cloud, ohne API-Keys, ohne geteilte Daten. Der Name ist eine Referenz auf den F.U.C.K.U.P.-Computer aus der *Illuminatus!*-Trilogie.

## Die Pipeline

Jeder neue Artikel durchläuft acht Verarbeitungsstufen:

1. **Hagbard's Retrieval** — Volltext-Extraktion per Readability
2. **Statistical Pre-Analysis** — TF-IDF und MMR (rein statistisch)
3. **Discordian Analysis** — LLM-Zusammenfassung, Kategorien, Keywords, Artikeltyp
4. **Article Embedding** — Vektorisierung (Snowflake Arctic Embed, bis 8.192 Token)
5. **Immanentize Network** — Schlagwort-Verarbeitung und Synonyme
6. **Story Clustering** — Union-Find-Gruppierung (Ähnlichkeit > 0.78)
7. **Briefing Generation** — Tägliche KI-Zusammenfassung der Top-Artikel
8. **Named Entity Recognition** — Personen, Organisationen, Orte, Events

## Illuminatus!-Terminologie

| Begriff | Bedeutung | Herkunft |
|---------|-----------|----------|
| Fnord | Artikel | Das unsichtbare Wort |
| Pentacle | Feed-Quelle | Das magische Fünfeck |
| Sephiroth | Kategorie | Die 10 Emanationen der Kabbala |
| Immanentize | Schlagwort | "Immanentize the Eschaton" |
| Greyface Alert | Bias-Warnung | Der Feind des Chaos |

## Technologie

- **Svelte 5 + Tauri 2** — Desktop-App mit nativer Performance
- **Rust** — Backend und Tauri-Commands
- **Ollama** — lokale LLM-Inferenz (Ministral 3B, Snowflake Arctic Embed)
- **SQLite + sqlite-vec** — Artikeldaten und Vektorsuche
- **260 Tests** — 160 Backend, 89 Frontend, 11 E2E

## Status

Phase 4 abgeschlossen. Repository wird noch veröffentlicht.
