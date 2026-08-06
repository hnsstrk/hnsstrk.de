---
title: "Werkstattbericht"
date: 2026-08-06
draft: false
description: "Was sich sonst noch getan hat: Vergissmeinnicht 0.3.0, achtundfünfzig neue Wallpaper, ein KI-Hinweis im Splitflap-Theme und ein gehärteter RSS-Leser."
tags: ["vergissmeinnicht", "wallpapers", "splitflap", "fuckuprss", "projekte", "update"]
featured_image: ""
---

Nicht jedes Projekt bekommt einen eigenen Beitrag, wenn sich etwas tut — sonst bestünde dieser Blog nur noch aus Versionsnummern. Alle paar Monate lohnt aber ein Rundgang durch die Werkstatt.

<!--more-->

## Vergissmeinnicht lernt Spalten

Die [macOS-App für Taskwarrior](/projects/vergissmeinnicht/) steht seit Anfang Juli bei Version 0.3.0. Die sichtbarste Neuerung: eine Detailspalte im Mail-Stil. Der ausgewählte Task erscheint direkt neben der Liste statt in einem Dialog, und bei Mehrfachauswahl lässt sich in derselben Spalte gleich der ganze Stapel bearbeiten. Nebenbei wurden zwei Rust-Abhängigkeiten wegen Sicherheitsmeldungen aktualisiert — unspektakulär, aber genau die Pflege, an der man aktive Projekte erkennt.

## Achtundfünfzig neue Wallpaper

Die [Wallpaper-Sammlung](/projects/wallpapers/) ist im Sommer kräftig gewachsen: sechs helle Light-Mode-Motive im Juli, zwei Moos-Makros, und Anfang August dann der große Schub — 39 Bonsai-Motive und elf dunkle Grim-Dark-Bilder in Violett, alle in 16:9.

![Pixelart-Bonsai in brauner Schale vor dunkelblauem Hintergrund — eines der neuen Wallpaper](bonsai-wallpaper.webp "Aus der neuen Bonsai-Serie — Pixelart, eine der letzten Midjourney-Arbeiten")

Die Quellen sind diesmal ein Abschiedskonzert: Die Pixelart-Bonsais hat noch Midjourney gerechnet, der fotorealistische Teil der Serie stammt aus ElevenLabs — ja, die generieren inzwischen auch Bilder. Warum beide Abos enden und was künftig lokal rechnet, steht im Beitrag [Heimarbeit](/blog/ai-services-local-first/).

## Splitflap sagt, wer mitgeschrieben hat

Das [Splitflap-Theme](/projects/splitflap/) dieses Blogs hat im Juni eine ganze Serie von Typografie-Korrekturen bekommen: ein einheitliches Lesemaß für Artikelseiten, Codeblöcke und Bilder, die endlich mit der Textspalte fluchten. Lauter Dinge, die niemandem auffallen, solange sie stimmen.

Auffälliger ist das Feature vom Juli: ein KI-Redaktions-Hinweis am Artikelende, pro Beitrag über ein Frontmatter-Flag zuschaltbar. Wo Claude-Agenten an Recherche oder Text beteiligt waren, steht das jetzt ausdrücklich dran. Das erschien mir ehrlicher, als so zu tun, als tippte hier jemand alles allein.

## fuckupRSS wird erwachsen

Der [RSS-Leser mit lokaler KI](/projects/fuckuprss/) hat Anfang Juli ein Härtungspaket bekommen. Ein Feed-Health-Monitoring meldet jetzt lahmende Quellen, die Kategorien-Pipeline entscheidet primär per Sprachmodell und hat eine Drift-Bremse bekommen, der Datenbank-Reset schreibt vorher ein Backup. Die GitHub-Actions sind auf feste Commits gepinnt, und die Aufgabenverwaltung ist von Taskwarrior zu GitHub Issues umgezogen — dahin, wo der Code ohnehin liegt.

Vier Projekte, ein Sommer, keine Sensationen. Aber genau so sieht Werkzeug aus, das benutzt wird.
