---
title: "Heimarbeit"
date: 2026-08-06
draft: false
description: "Midjourney und ElevenLabs fliegen raus, ComfyUI übernimmt auf der eigenen Grafikkarte — und für den Rest stehen BFL-API und OpenRouter auf der Liste."
tags: ["comfyui", "flux", "midjourney", "elevenlabs", "openrouter", "local-ai", "ki-dienste"]
featured_image: ""
---

KI-Abos sind wie Fitnessstudio-Verträge: abgeschlossen in einem Anfall von Tatendrang, und dann buchen sie Monat für Monat ab, ob man hingeht oder nicht. Ende Juli habe ich durchgezählt und zwei davon gekündigt.

<!--more-->

## Was rausfliegt

Midjourney hat wunderbare Bilder gemacht, im Alltag aber erstaunlich selten welche: in zwei Monaten ganze vier Porträts. Erst zum Abschied kam noch einmal Betrieb auf — die sechzehn offenen Prompts liefen kurz vor Toresschluss durch. Der Grund für die Kündigung war aber ohnehin nicht die magere Bilanz, sondern ein grundsätzlicher. Der Dienst ist nur über Browser und Discord zu erreichen; einen skriptbaren Weg gibt es nicht. Meine gesamte Pipeline lebt auf der Kommandozeile, und was sich dort nicht aufrufen lässt, wird schlicht nicht benutzt. Discord ist als Schnittstelle zu einem Bildgenerator ungefähr so praktisch wie ein Fax an die Druckerei.

ElevenLabs folgt zum Monatsende auf den Free-Tarif. Die Stimmen sind gut, nur war die Nutzung überschaubar — ein paar Transkriptionen, ein paar vertonte Blog-Beiträge, dann Stille. Der Vertonungs-Skill meiner Rollenspiel-Seite ist bereits abgebaut. Für den Rest reicht der kostenlose Zugang — und Transkription gibt es anderswo im Minutentakt bezahlt statt im Abo.

Kurios wurde es zum Schluss: ElevenLabs generiert neuerdings auch Bilder, und so ist das Restguthaben in eine Serie Bonsai-Wallpaper geflossen. Ein Stimmen-Dienst als Bilderlieferant — das Abo endet immerhin mit einer Pointe.

## Was stattdessen läuft

Seit Ende Juli rechnet [ComfyUI](https://github.com/comfyanonymous/ComfyUI) auf Ganymed, meinem Linux-Rechner mit einer 24-GB-Grafikkarte von AMD. Installiert sind Flux.2 Klein in zwei Größen, dazu ein kleiner SDXL-Zoo und neunzehn LoRAs für Stile und Feinjustage. Das kleine Modell liefert ein Bild in rund drei Sekunden, das größere in gut sechs — aufgewärmt, versteht sich.

Der entscheidende Unterschied ist aber nicht die Geschwindigkeit, sondern die Schnittstelle. ComfyUI hat eine HTTP-API — damit ist die Bildgenerierung endlich das, was Midjourney nie sein wollte: ein Werkzeug im Skript. Die Cover-Bilder meiner Rollenspiel-Seite entstehen inzwischen so, per Aufruf, lokal, ohne dass irgendetwas den Rechner verlässt.

Die Grafikkarte hat inzwischen noch einen zweiten Untermieter: Nebenan experimentiere ich gerade mit Whisper, also lokaler Spracherkennung. Wofür, verrate ich, wenn daraus etwas geworden ist.

Ganz ohne Wermutstropfen ist die Heimarbeit nicht. Das große Flux.2-Modell wäre noch einmal deutlich besser, aber AMD warnt bei Systemen mit 32 GB Arbeitsspeicher ausdrücklich vor Instabilität. Das Modell bleibt also vorerst draußen.

Der Rechner weiß das zum Glück nicht.

## Was sich festgesetzt hat

Nicht alles in dieser Bilanz läuft zu Hause. Firecrawl — ein Dienst, der Webseiten in sauberes Markdown verwandelt und durchsuchbar macht — hat sich in den letzten Monaten unbemerkt zum zentralen Werkzeug entwickelt. Die tägliche Presseschau meiner [selbstschreibenden Zeitung](/blog/self-writing-newspaper/) holt darüber ihre feedlosen Quellen, und die Recherche in Claude Code läuft gleich über ein ganzes Firecrawl-Plugin — Suchen, Scrapen, Crawlen, ein Dutzend Fertigkeiten. Rund die Hälfte des Monatskontingents ist inzwischen in Benutzung, der größere Teil davon durch Recherche von Hand.

Angefangen hat das alles auf dem Gratis-Tarif; inzwischen läuft ein Hobby-Abo, dazu die Aufstock-Automatik für Spitzenmonate. Bedenklich ist eher die Preistreppe darüber: Auf den Hobby-Tarif mit seinen 8.000 Monats-Credits folgt als nächste Stufe gleich eine mit 100.000 — dazwischen gibt es nichts. Wer nur etwas mehr braucht, zahlt gleich ein Vielfaches, und so wird ein nützliches Werkzeug sehr schnell sehr teuer. Noch reicht die Hobby-Stufe. Firecrawl ist damit das einzige Studio, in dem ich tatsächlich trainiere — allerdings mit einem Blick auf die Preistafel der nächsten Mitgliedsstufe.

## Was auf der Liste steht

Zwei Neuzugänge sind geplant, beide ohne Abo. Für die Fälle, in denen das lokale Klein-Modell nicht reicht, soll die API von Black Forest Labs einspringen — dieselbe Modellfamilie, nur in der gehosteten Vollausstattung, bezahlt pro Bild. Und ein OpenRouter-Konto mit Prepaid-Guthaben übernimmt den Rest: Modelltests, Transkription nach Minuten, gelegentliche Ausflüge zu Bildmodellen anderer Anbieter.

Das Muster dahinter ist immer dasselbe: feste Abos nur noch dort, wo auch feste Nutzung ist. Alles andere läuft lokal oder wird pro Aufruf bezahlt — mit Guthaben-Grenze statt automatischer Aufladung, denn offene Kostenrisiken sind die Jahresverträge von morgen …
