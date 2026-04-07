---
name: hugo-ssg
description: |
  Hugo Static Site Generator — Templates, Konfiguration, Content Management und Deployment.
  TRIGGER when: user works with Hugo projects, creates/edits templates (.html in layouts/),
  modifies hugo.toml/config.toml, creates content files (.md in content/), asks about Hugo
  functions/methods, mentions "Hugo", "Hugo server", "Hugo build", or works on static sites.
  DO NOT TRIGGER when: user works on non-Hugo web projects (React, Vue, etc.).
---

# Hugo SSG

Hugo v0.160+ Static Site Generator (Go-basiert, extended edition).

**Dokumentations-Strategie:** Fuer spezifische Hugo-Funktionen, -Methods und -Konfigurationsoptionen das **context7 MCP-Tool** verwenden (`/gohugoio/hugodocs`). Dieser Skill enthaelt Ueberblickswissen, Entscheidungshilfen, das neue Template-System und projekt-spezifische Konventionen.

## CLI Quick Reference

```bash
hugo server              # Dev-Server (localhost:1313, Live-Reload)
hugo server -D           # Inkl. Drafts
hugo                     # Produktions-Build (-> public/)
hugo --minify            # Minifizierter Build
hugo new content posts/titel.md  # Content erstellen
hugo new project name    # Neues Projekt
hugo config              # Aktive Konfiguration anzeigen
```

## Verzeichnisstruktur

```
project/
├── archetypes/          # Content-Vorlagen
├── assets/              # Hugo Pipes (SCSS, JS bundling)
├── content/             # Markdown-Inhalte
├── data/                # Datendateien (YAML, JSON, TOML)
├── i18n/                # Uebersetzungstabellen
├── layouts/             # Templates
├── static/              # Statische Dateien (CSS, JS, Bilder)
├── themes/              # Theme-Verzeichnis
└── hugo.toml            # Konfiguration
```

## Projekt: hnsstrk.de

- Theme: `hnsstrk` (Custom Theme in `themes/hnsstrk/`)
- Hosting: Contabo Ubuntu Server + Nginx
- CI/CD: GitHub Actions SSH-Trigger → Server baut mit Hugo
- Design: Ayu Color Theme (Light/Mirage/Dark), Monaspace Fonts, FlipBoard Landing Page
- Ziel: Persoenliche Profilseite, Theme ggf. zur Veroeffentlichung

### Theme-Struktur (aktuell, alte Konvention)

```
themes/hnsstrk/
├── layouts/
│   ├── _default/
│   │   ├── baseof.html      # Basis-Layout
│   │   ├── single.html      # Einzelseiten
│   │   ├── list.html        # Listen (Sections, Taxonomies)
│   │   └── links.html       # Custom Layout
│   ├── index.html            # Startseite
│   └── partials/
│       └── head.html
├── static/
│   ├── css/                  # Stylesheets
│   ├── js/                   # JavaScript (FlipBoard)
│   └── fonts/                # Monaspace Webfonts
└── theme.toml
```

## Neues Template-System (v0.146.0) — KRITISCH

Hugo v0.146.0 hat das Template-System komplett ueberarbeitet. Dies betrifft Migration und neue Projekte.

### Migrations-Tabelle

| Alt (vor v0.146.0) | Neu (ab v0.146.0) | Aktion |
|---------------------|--------------------|--------|
| `layouts/_default/` | `layouts/` (direkt) | Dateien nach oben verschieben |
| `layouts/partials/` | `layouts/_partials/` | Umbenennen (Unterstrich!) |
| `layouts/shortcodes/` | `layouts/_shortcodes/` | Umbenennen |
| `layouts/index.html` | `layouts/home.html` | Umbenennen |
| `layouts/_default/single.html` | `layouts/page.html` | Verschieben + Umbenennen |
| `layouts/_default/list.html` | `layouts/section.html` | Verschieben + Umbenennen |
| `layouts/_default/baseof.html` | `layouts/baseof.html` | Verschieben |
| `layouts/taxonomy/` | `layouts/taxonomy.html` + `layouts/term.html` | Dateien statt Ordner |
| `{{ template "_internal/..." }}` | `{{ partial "..." }}` | Syntax aendern |

**Hinweis:** Themes koennen BEIDE Strukturen verwenden. Hugo mappt intern "old to new". Fuer das hnsstrk-Theme ist die alte Struktur vorerst OK, aber bei Veroeffentlichung sollte auf die neue Struktur migriert werden.

### Neue Template-Identifikatoren

Template-Dateinamen koennen diese Identifikatoren kombinieren:
- **Page Kind:** `home`, `page`, `section`, `taxonomy`, `term`
- **Standard Layout:** `list`, `single`, `all` (catch-all)
- **Custom Layout:** Wert aus `layout` Front Matter
- **Sprache:** z.B. `en`, `de`
- **Output Format:** z.B. `html`, `rss`, `json`

Beispiel: `term.mylayout.de.rss.xml`

### Lookup Order (Gewichtung, absteigend)

1. Custom Layout (aus Front Matter)
2. Page Kind (home, page, section, taxonomy, term)
3. Standard Layout (list, single)
4. Output Format (html, rss)
5. All (catch-all)
6. Sprache
7. Media Type
8. Page Path (naeher = besser)
9. Type (aus Front Matter)

Fuer Details: [references/template-system.md](references/template-system.md)

## Template-Syntax Crashkurs

### Context — das wichtigste Konzept

```go-html-template
{{ . }}     # Aktueller Kontext (meist Page-Objekt)
{{ $ }}     # Root-Kontext (immer verfuegbar)
{{ site }}  # Site-Objekt (global)

{{ with .Description }}
  {{/* . ist jetzt Description, nicht mehr Page */}}
  <meta name="description" content="{{ . }}">
{{ end }}

{{ range .Pages }}
  {{/* . ist jetzt das aktuelle Page-Element */}}
  <a href="{{ .RelPermalink }}">{{ .Title }}</a>
  {{/* $.Title = Titel der UEBERGEORDNETEN Seite */}}
{{ end }}
```

### Block/Define (baseof.html Pattern)

```go-html-template
{{/* baseof.html */}}
<!DOCTYPE html>
<html lang="{{ site.Language.LanguageCode }}">
<head>{{ partial "head.html" . }}</head>
<body>
  {{ block "main" . }}Fallback{{ end }}
</body>
</html>

{{/* page.html */}}
{{ define "main" }}
  <h1>{{ .Title }}</h1>
  {{ .Content }}
{{ end }}
```

### Whitespace + Kommentare

```go-html-template
{{- .Title -}}              # Trimmt Whitespace beidseitig
{{/* Kommentar */}}          # Wird nicht gerendert
{{- /* Trimmed comment */ -}}
```

### Haeufige Patterns

```go-html-template
# Conditional mit Default
{{ with .Params.author }}{{ . }}{{ else }}Unbekannt{{ end }}

# Ternary
{{ cond .IsHome "Startseite" .Title }}

# Safe URL/HTML
{{ .Destination | safeURL }}
{{ .Inner | safeHTML }}

# printf fuer Debugging
{{ printf "%#v" . }}
```

## Content Management

### Front Matter

```yaml
---
title: "Titel"
date: 2026-04-07
draft: false
description: "Beschreibung"
tags: ["tag1", "tag2"]
categories: ["cat1"]
weight: 10
layout: "custom"        # Erzwingt bestimmtes Template
aliases: ["/alter-pfad/"]
---
```

### Content-Organisation

```
content/
├── _index.md           # Startseite (branch bundle)
├── ueber-mich.md       # Einzelseite
├── projekte/
│   ├── _index.md       # Sektions-Listing (branch bundle)
│   └── projekt-1.md    # Einzelnes Projekt (leaf)
└── blog/
    ├── _index.md       # Blog-Listing
    └── mein-post/      # Page bundle (leaf)
        ├── index.md    # Content
        └── bild.jpg    # Page resource
```

## Entscheidungshilfen

### Partial vs Shortcode

| | Partial | Shortcode |
|---|---------|-----------|
| **Aufruf** | In Templates | In Markdown-Content |
| **Zweck** | Template-Wiederverwendung (Header, Footer, Meta) | Content-Erweiterung (Figures, Videos, Embeds) |
| **Context** | Bekommt `.` uebergeben | Hat `.Inner`, `.Get`, `.Page` |
| **Caching** | `partialCached` moeglich | Nicht cachebar |
| **Wann** | Layout-Bestandteile | Content-Autoren-Features |

### assets/ vs static/

| | assets/ | static/ |
|---|---------|---------|
| **Zugriff** | `resources.Get` (Hugo Pipes) | Direkt per URL |
| **Verarbeitung** | SCSS, JS Build, Minify, Fingerprint | Keine (1:1 kopiert) |
| **Wann** | CSS/JS die verarbeitet werden sollen | Bilder, Fonts, fertige Dateien |

### _index.md vs index.md

| | `_index.md` | `index.md` |
|---|-------------|------------|
| **Typ** | Branch Bundle | Leaf Bundle |
| **Hat Unterseiten** | Ja (Section) | Nein |
| **Page Resources** | Nein (nur eigene) | Ja (alle Dateien im Ordner) |
| **Wann** | Sections, Listings, Taxonomien | Einzelseiten mit eigenen Assets |

### Theme-Veroeffentlichung — Checkliste

- [ ] Auf neue Template-Struktur (v0.146.0) migrieren
- [ ] `theme.toml` mit vollstaendigen Metadaten
- [ ] `exampleSite/` mit Demo-Content
- [ ] `images/` mit Screenshot und Thumbnail
- [ ] README.md mit Installations- und Konfigurationsanleitung
- [ ] Alle Abhaengigkeiten dokumentieren (Fonts, JS-Libraries)
- [ ] `go.mod` fuer Hugo Modules (optional aber empfohlen)
- [ ] Lizenz (MIT, Apache-2.0 oder aehnlich)
- [ ] Responsive Design testen
- [ ] Accessibility pruefen (ARIA, Semantic HTML)
- [ ] Performance: Lighthouse-Score > 90

## Hugo Pipes (Asset Pipeline)

```go-html-template
# SCSS → CSS → Minify → Fingerprint
{{ $style := resources.Get "sass/main.scss" | css.Sass | resources.Minify | resources.Fingerprint }}
<link rel="stylesheet" href="{{ $style.Permalink }}">

# JS Build → Minify → Fingerprint
{{ $js := resources.Get "js/main.js" | js.Build (dict "minify" true) | resources.Fingerprint }}
<script src="{{ $js.Permalink }}"></script>

# Conditional (Dev vs Production)
{{ if hugo.IsDevelopment }}
  <link rel="stylesheet" href="{{ $style.RelPermalink }}">
{{ else }}
  {{ with $style | resources.Fingerprint }}
    <link rel="stylesheet" href="{{ .RelPermalink }}" integrity="{{ .Data.Integrity }}">
  {{ end }}
{{ end }}
```

Assets muessen im `assets/`-Verzeichnis liegen (nicht `static/`).

Fuer Details: [references/hugo-pipes-detail.md](references/hugo-pipes-detail.md)

## Render Hooks

Markdown→HTML anpassen via `layouts/_markup/`:

```
layouts/_markup/
├── render-link.html        # Links (rel="external", target="_blank")
├── render-image.html       # Bilder (lazy loading, responsive)
├── render-heading.html     # Ueberschriften (Anchor-Links)
├── render-codeblock.html   # Code-Bloecke (Syntax Highlighting)
├── render-codeblock-goat.html  # GoAT ASCII-Diagramme
├── render-blockquote.html  # Blockquotes
└── render-table.html       # Tabellen
```

Fuer Details: [references/render-hooks.md](references/render-hooks.md)

## Funktionen und Methods — Quick Lookup

**Fuer spezifische Funktions-Signaturen und -Optionen: context7 verwenden.**
```
context7 libraryId: /gohugoio/hugodocs
query: "collections.Where operators examples"
```

Haeufigste Funktionen: [references/functions-reference.md](references/functions-reference.md)

### Page Methods (Top 20)

```
.Title .Content .Summary .Description .Plain
.Date .Lastmod .Permalink .RelPermalink .LinkTitle
.IsHome .IsPage .IsSection .Kind .Type .Section
.Pages .RegularPages .Parent .Resources .Params
.WordCount .ReadingTime .TableOfContents .GitInfo
```

### Site Methods (Top 10)

```
site.Title site.BaseURL site.Language site.Menus
site.Taxonomies site.Pages site.RegularPages
site.Params site.Data site.Home site.MainSections
```

## Konfiguration (hugo.toml)

```toml
baseURL = "https://example.com/"
title = "Seitentitel"
languageCode = "de"
theme = "themename"
enableRobotsTXT = true
enableGitInfo = true

[params]
  description = "Beschreibung"
  author = "Name"

[markup.goldmark.renderer]
  unsafe = true  # HTML in Markdown erlauben

[menus]
  [[menus.main]]
    name = "Seite"
    url = "/seite/"
    weight = 10

[taxonomies]
  tag = "tags"
  category = "categories"
```

Fuer alle Settings: [references/configuration.md](references/configuration.md)

## Troubleshooting

### Template-Debugging

```go-html-template
{{/* Variable inspizieren */}}
{{ printf "%#v" . }}
{{ printf "%T" .Params.myvar }}

{{/* Warnung/Fehler loggen */}}
{{ warnf "Debug: %s" .Title }}
{{ errorf "Missing param: %s" "author" }}
```

### Template Metrics

```bash
hugo --templateMetrics --templateMetricsHints
```

### Haeufige Fehler

- `can't evaluate field X`: Feld existiert nicht im Context → `.Params.x` statt `.X`
- `nil pointer`: `with`-Check fehlt → `{{ with .Params.x }}...{{ end }}`
- `partial not found`: Pfad pruefen — `_partials/` (neu) vs `partials/` (alt)
- `execute of template failed`: Oft fehlende Schliess-Tags (`{{ end }}`)
