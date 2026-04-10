---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
date: {{ .Date }}
draft: true
description: ""
tags: []
featured_image: ""
# featured_layout: left | right | top | bottom (Standard via hugo.toml params.featuredLayout)
#   left   — Thumbnail links, Text rechts (empfohlen: quadratisch, z.B. 600x600)
#   right  — Thumbnail rechts, Text links (empfohlen: quadratisch, z.B. 600x600)
#   top    — Bild oben, volle Breite (empfohlen: breit, z.B. 1200x400)
#   bottom — Bild unten, volle Breite (empfohlen: breit, z.B. 1200x400)
---
