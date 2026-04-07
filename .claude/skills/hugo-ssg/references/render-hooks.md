# Render Hooks — Markdown-Rendering anpassen

Render Hooks überschreiben die Standard-Konvertierung von Markdown zu HTML.
Platzierung: `layouts/_markup/` (neues System) oder `layouts/_default/_markup/` (altes System in Themes).

## Verfügbare Hook-Typen

| Hook-Datei | Markdown-Element |
|-----------|-----------------|
| render-link.html | `[text](url)` |
| render-image.html | `![alt](src)` |
| render-heading.html | `# Heading` |
| render-codeblock.html | ` ```code``` ` |
| render-codeblock-LANG.html | ` ```lang``` ` (sprachspezifisch) |
| render-blockquote.html | `> quote` |
| render-table.html | `\| table \|` |
| render-passthrough.html | LaTeX/Math |

## Link Render Hook

Context-Variablen:
- `.Destination` — URL
- `.Text` — Link-Text (template.HTML)
- `.Title` — Title-Attribut
- `.Page` — Die aktuelle Seite
- `.PlainText` — Text ohne HTML

```go-html-template
{{/* layouts/_markup/render-link.html */}}
<a href="{{ .Destination | safeURL }}"
  {{- with .Title }} title="{{ . }}"{{ end }}
  {{- if strings.HasPrefix .Destination "http" }} rel="noopener noreferrer" target="_blank"{{ end }}>
  {{- .Text | safeHTML -}}
</a>
```

## Image Render Hook

Context-Variablen:
- `.Destination` — Bild-URL
- `.Text` — Alt-Text
- `.Title` — Title
- `.Page` — Die aktuelle Seite
- `.Ordinal` — Reihenfolge (0-basiert)
- `.IsBlock` — Ob es ein Block-Element ist

```go-html-template
{{/* layouts/_markup/render-image.html */}}
{{ $img := .Page.Resources.GetMatch .Destination }}
{{ with $img }}
  {{ $small := .Resize "600x" }}
  {{ $large := .Resize "1200x" }}
  <figure>
    <img srcset="{{ $small.RelPermalink }} 600w, {{ $large.RelPermalink }} 1200w"
         src="{{ $small.RelPermalink }}"
         alt="{{ $.Text }}" loading="lazy">
    {{ with $.Title }}<figcaption>{{ . }}</figcaption>{{ end }}
  </figure>
{{ else }}
  <img src="{{ .Destination | safeURL }}" alt="{{ .Text }}" loading="lazy">
{{ end }}
```

## Heading Render Hook

Context: `.Anchor`, `.Text`, `.Level`, `.Page`

```go-html-template
{{/* layouts/_markup/render-heading.html */}}
<h{{ .Level }} id="{{ .Anchor }}">
  {{ .Text | safeHTML }}
  <a class="heading-anchor" href="#{{ .Anchor }}" aria-hidden="true">#</a>
</h{{ .Level }}>
```

## Code Block Render Hook

Context: `.Type` (Sprache), `.Inner` (Code), `.Attributes`, `.Options`, `.Ordinal`, `.Page`

```go-html-template
{{/* layouts/_markup/render-codeblock.html */}}
{{ $lang := or .Type "text" }}
{{ $opts := dict "lineNos" true "style" "monokai" }}
{{ highlight .Inner $lang $opts }}
```

### Sprachspezifische Code Blocks

`render-codeblock-goat.html` für GoAT ASCII-Diagramme:
```go-html-template
{{ with diagrams.Goat (trim .Inner "\n\r") }}
  <div class="goat">
    <svg width="{{ .Width }}" height="{{ .Height }}">{{ .Inner }}</svg>
  </div>
{{ end }}
```

`render-codeblock-math.html` für Mathematik:
```go-html-template
{{ $opts := dict "displayMode" true }}
{{ transform.ToMath .Inner $opts }}
```

## Blockquote Render Hook

Context: `.Type` (Alerttype), `.Text`, `.Page`

```go-html-template
{{/* GitHub-style Alerts */}}
{{ if eq .Type "alert" }}
  <div class="alert alert-{{ .AlertType }}">
    {{ .Text | safeHTML }}
  </div>
{{ else }}
  <blockquote>{{ .Text | safeHTML }}</blockquote>
{{ end }}
```

## Table Render Hook

Context: `.THead`, `.TBody`, `.Page`

## Scope und Verschachtelung

Render Hooks können pro Section überschrieben werden:
```
layouts/
├── _markup/
│   └── render-link.html          # Standard für alle
├── blog/
│   └── _markup/
│       └── render-link.html      # Nur für /blog/
└── docs/
    └── api/
        └── _markup/
            └── render-link.html  # Nur für /docs/api/
```
