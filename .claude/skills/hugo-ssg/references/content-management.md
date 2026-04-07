# Hugo Content Management — Detaillierte Referenz

## Front Matter

### Formate

```yaml
---
title: "YAML Front Matter"
---
```

```toml
+++
title = "TOML Front Matter"
+++
```

```json
{
  "title": "JSON Front Matter"
}
```

### Vordefinierte Felder

| Feld | Typ | Beschreibung |
|------|-----|-------------|
| `title` | String | Seitentitel |
| `date` | Datum | Erstellungsdatum |
| `draft` | Bool | Entwurf (nicht veroeffentlicht) |
| `description` | String | Meta-Description |
| `summary` | String | Manuelle Zusammenfassung |
| `weight` | Int | Sortiergewicht (kleiner = weiter oben) |
| `layout` | String | Erzwingt bestimmtes Template |
| `type` | String | Content-Typ (ueberschreibt Section) |
| `url` | String | Vollstaendige URL (ueberschreibt Permalink) |
| `slug` | String | URL-Segment (statt Dateiname) |
| `aliases` | []String | Redirect-Pfade zur aktuellen Seite |
| `keywords` | []String | Meta-Keywords |
| `publishDate` | Datum | Veroeffentlichungsdatum (zukuenftig moeglich) |
| `expiryDate` | Datum | Ablaufdatum |
| `lastmod` | Datum | Letzte Aenderung (oder via Git) |
| `markup` | String | Markup-Sprache (md, html, org, etc.) |
| `outputs` | []String | Output-Formate fuer diese Seite |
| `linkTitle` | String | Kurztitel fuer Links/Menues |
| `isCJKLanguage` | Bool | CJK-Sprache fuer WordCount |
| `translationKey` | String | Uebersetzungs-Schluessel |
| `headless` | Bool | Headless Bundle (kein eigenes URL) |

### Cascade (Vererbung)

```yaml
---
title: "Blog"
cascade:
  author: "Hans"
  showReadingTime: true
  # Optional: Nur auf bestimmte Seiten anwenden
  _target:
    kind: page
    path: "/blog/**"
---
```

Cascade vererbt Front-Matter-Werte an alle Unterseiten.

### Benutzerdefinierte Parameter

Alle nicht vordefinierten Felder landen in `.Params`:

```yaml
---
title: "Mein Post"
author: "Hans"
featured: true
tags: ["hugo", "web"]
social:
  twitter: "@user"
---
```

Zugriff: `{{ .Params.author }}`, `{{ .Params.social.twitter }}`

### Resources (im Front Matter)

```yaml
---
title: "Projekt"
resources:
  - src: "bild.jpg"
    name: "hero"
    title: "Hero-Bild"
    params:
      credits: "Fotograf Name"
  - src: "*.pdf"
    name: "dokument-:counter"
    title: "Dokument"
---
```

## Content-Organisation

### Sections

Jedes Verzeichnis unter `content/` mit einer `_index.md` ist eine Section:

```
content/
├── _index.md               # Startseite (root section)
├── blog/
│   ├── _index.md           # Blog-Section
│   ├── post-1.md           # Blog-Beitrag
│   └── post-2.md           # Blog-Beitrag
├── projekte/
│   ├── _index.md           # Projekte-Section
│   ├── projekt-a/
│   │   ├── _index.md       # Unter-Section
│   │   └── feature-1.md    # Unterseite
│   └── projekt-b.md        # Einzelprojekt
└── ueber-mich.md           # Einzelseite (root-level)
```

### Page Bundles

#### Leaf Bundle (Einzelseite mit Ressourcen)

```
content/blog/mein-post/
├── index.md                # Content (KEIN Unterstrich!)
├── hero.jpg                # Page Resource
├── diagram.png             # Page Resource
└── data.csv                # Page Resource
```

- Hat `index.md` (ohne Unterstrich)
- Kann keine Unterseiten haben
- Ressourcen gehoeren nur zu dieser Seite

#### Branch Bundle (Sektion mit Unterseiten)

```
content/blog/
├── _index.md               # Section-Content (MIT Unterstrich!)
├── post-1.md               # Unterseite
└── post-2/
    ├── index.md            # Leaf Bundle (Unterseite)
    └── bild.jpg            # Resource von post-2
```

- Hat `_index.md` (mit Unterstrich)
- Kann Unterseiten und Unter-Sections haben
- `.Pages` listet direkte Unterseiten

### Unterschied _index.md vs index.md

| Merkmal | `_index.md` | `index.md` |
|---------|------------|-----------|
| Bundle-Typ | Branch | Leaf |
| Unterseiten | Ja | Nein |
| Template | section.html | page.html |
| `.Pages` | Listet Unterseiten | Leer |
| Ressourcen | Nur eigene | Alle im Verzeichnis |
| Kind | section | page |

## Taxonomien

### Konfiguration

```toml
[taxonomies]
  tag = "tags"
  category = "categories"
  series = "series"
```

### Zuweisung im Content

```yaml
---
title: "Mein Post"
tags: ["hugo", "webentwicklung"]
categories: ["tutorials"]
series: ["hugo-grundlagen"]
---
```

### Template-Nutzung

```go-html-template
{{/* Alle Tags einer Seite */}}
{{ range .Params.tags }}
  <a href="{{ "tags/" | absURL }}{{ . | urlize }}/">{{ . }}</a>
{{ end }}

{{/* Alle Tags der Site */}}
{{ range site.Taxonomies.tags }}
  {{ .Page.Title }} ({{ .Count }})
{{ end }}

{{/* Seiten mit bestimmtem Tag */}}
{{ $tag := index site.Taxonomies.tags "hugo" }}
{{ range $tag.Pages }}
  {{ .Title }}
{{ end }}
```

### Taxonomie-URLs

```
/tags/              # Taxonomie-Uebersicht (taxonomy.html)
/tags/hugo/         # Einzelner Term (term.html)
/categories/        # Taxonomie-Uebersicht
/categories/tutorials/  # Einzelner Term
```

## Cross References

### ref und relref

```go-html-template
{{/* Absolute URL */}}
{{ ref . "blog/mein-post.md" }}
{{/* -> https://example.com/blog/mein-post/ */}}

{{/* Relative URL */}}
{{ relref . "blog/mein-post.md" }}
{{/* -> /blog/mein-post/ */}}

{{/* Mit Anker */}}
{{ ref . "blog/mein-post.md#abschnitt" }}
```

### Shortcodes in Markdown

```markdown
[Link-Text]({{</* ref "blog/mein-post.md" */>}})
[Link-Text]({{</* relref "blog/mein-post.md" */>}})
```

## Summaries

### Automatisch

Hugo generiert automatisch eine Summary aus den ersten ~70 Woertern (`summaryLength` in `hugo.toml`).

### Manuell

```markdown
---
title: "Mein Post"
---

Dies ist die Zusammenfassung, die in Listings angezeigt wird.

<!--more-->

Dies ist der restliche Content, der nur auf der Einzelseite erscheint.
```

### Im Template

```go-html-template
{{ .Summary }}           # Summary (automatisch oder manuell)
{{ .Truncated }}         # true wenn Content nach Summary weitergeht
{{ .Content }}           # Vollstaendiger Content

{{ if .Truncated }}
  <a href="{{ .RelPermalink }}">Weiterlesen...</a>
{{ end }}
```

## Archetypes

Vorlagen fuer neue Content-Dateien in `archetypes/`:

```
archetypes/
├── default.md           # Standard-Vorlage
├── blog.md              # Vorlage fuer content/blog/
└── projekte/
    └── index.md         # Vorlage fuer Projekt-Bundles
```

### Beispiel-Archetype

```yaml
---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
date: {{ .Date }}
draft: true
description: ""
tags: []
---
```

### Nutzung

```bash
hugo new content blog/mein-neuer-post.md
# Verwendet archetypes/blog.md (oder default.md als Fallback)

hugo new content projekte/neues-projekt/index.md
# Verwendet archetypes/projekte/index.md
```

### Verfuegbare Variablen in Archetypes

- `{{ .Date }}` — Aktuelles Datum
- `{{ .Name }}` — Dateiname ohne Erweiterung
- `{{ .File.ContentBaseName }}` — Dateiname
- `{{ .File.Dir }}` — Verzeichnis
- `{{ .Type }}` — Content-Typ (= Section)

## Page Resources

### Zugriff

```go-html-template
{{/* Alle Ressourcen */}}
{{ range .Resources }}
  {{ .Name }} — {{ .ResourceType }}
{{ end }}

{{/* Nach Name */}}
{{ $hero := .Resources.GetMatch "hero*" }}

{{/* Nach Typ */}}
{{ $images := .Resources.ByType "image" }}

{{/* Nach Glob-Pattern */}}
{{ $pdfs := .Resources.Match "*.pdf" }}
```

### Image Processing

```go-html-template
{{ $image := .Resources.GetMatch "hero.jpg" }}

{{/* Groesse aendern */}}
{{ $resized := $image.Resize "800x" }}        # Breite 800px, Hoehe proportional
{{ $resized := $image.Resize "x600" }}        # Hoehe 600px, Breite proportional
{{ $resized := $image.Resize "800x600" }}     # Exakte Groesse (verzerrt)

{{/* Einpassen */}}
{{ $fit := $image.Fit "800x600" }}            # Passt in Box, behaelt Proportionen

{{/* Fuellen */}}
{{ $fill := $image.Fill "800x600 Center" }}   # Fuellt Box, schneidet ueber
{{/* Positionen: Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight, Smart */}}

{{/* Zuschneiden */}}
{{ $crop := $image.Crop "800x600 Smart" }}    # Smart-Crop

{{/* Filter */}}
{{ $gray := $image | images.Grayscale }}
{{ $blurred := $image | images.GaussianBlur 6 }}
{{ $bright := $image | images.Brightness 20 }}

{{/* Im Template verwenden */}}
<img src="{{ $resized.RelPermalink }}"
     width="{{ $resized.Width }}"
     height="{{ $resized.Height }}"
     alt="{{ .Title }}">
```

### Image-Formate

```go-html-template
{{ $webp := $image.Resize "800x webp" }}      # WebP-Konvertierung
{{ $avif := $image.Resize "800x avif" }}      # AVIF-Konvertierung

{{/* Picture-Element mit Fallbacks */}}
<picture>
  <source srcset="{{ ($image.Resize "800x avif").RelPermalink }}" type="image/avif">
  <source srcset="{{ ($image.Resize "800x webp").RelPermalink }}" type="image/webp">
  <img src="{{ ($image.Resize "800x").RelPermalink }}" alt="{{ .Title }}">
</picture>
```

## Data Templates

### Datendateien

```
data/
├── social.yaml          # site.Data.social
├── navigation.json      # site.Data.navigation
└── team/
    ├── alice.toml       # site.Data.team.alice
    └── bob.toml         # site.Data.team.bob
```

### Zugriff im Template

```go-html-template
{{/* data/social.yaml */}}
{{ range site.Data.social }}
  <a href="{{ .url }}">{{ .name }}</a>
{{ end }}

{{/* Verschachtelt: data/team/*.toml */}}
{{ range site.Data.team }}
  <div>{{ .name }} — {{ .role }}</div>
{{ end }}
```

### Beispiel data/social.yaml

```yaml
- name: GitHub
  url: https://github.com/user
  icon: github
- name: Mastodon
  url: https://mastodon.social/@user
  icon: mastodon
```

### Remote Data

```go-html-template
{{ $data := resources.GetRemote "https://api.example.com/data.json" }}
{{ with $data }}
  {{ $json := .Content | transform.Unmarshal }}
  {{ range $json.items }}
    {{ .name }}
  {{ end }}
{{ end }}
```
