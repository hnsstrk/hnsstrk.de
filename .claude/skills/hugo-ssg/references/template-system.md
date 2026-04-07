# Hugo Template-System — Detaillierte Referenz

## Neues Template-System (v0.146.0+)

Hugo v0.146.0 hat das Template-System grundlegend ueberarbeitet. Die wichtigste Aenderung: Templates liegen direkt in `layouts/`, nicht mehr in Unterverzeichnissen wie `_default/`.

### Vollstaendige Migrationstabelle

| Alt (vor v0.146.0) | Neu (ab v0.146.0) | Beschreibung |
|---------------------|-------------------|--------------|
| `layouts/_default/baseof.html` | `layouts/baseof.html` | Basis-Template |
| `layouts/index.html` | `layouts/home.html` | Startseite |
| `layouts/_default/single.html` | `layouts/page.html` | Einzelseiten |
| `layouts/_default/list.html` | `layouts/section.html` | Sektionslisten |
| `layouts/_default/taxonomy.html` | `layouts/taxonomy.html` | Taxonomie-Listen |
| `layouts/_default/terms.html` | `layouts/term.html` | Term-Listen |
| `layouts/partials/` | `layouts/_partials/` | Partials (Unterstrich-Praefix) |
| `layouts/shortcodes/` | `layouts/_shortcodes/` | Shortcodes (Unterstrich-Praefix) |
| `layouts/_default/_markup/` | `layouts/_markup/` | Render Hooks |
| `layouts/404.html` | `layouts/404.html` | Fehlerseite (unveraendert) |

### Template-Identifikatoren

Jeder Seitentyp hat einen eindeutigen Identifikator:

| Identifikator | Page Kind | Beschreibung |
|---------------|-----------|--------------|
| `home` | home | Startseite (`content/_index.md`) |
| `page` | page | Einzelseite (regulaere Content-Datei) |
| `section` | section | Sektionsliste (`content/blog/_index.md`) |
| `taxonomy` | taxonomy | Taxonomie-Uebersicht (z.B. `/tags/`) |
| `term` | term | Einzelner Term (z.B. `/tags/hugo/`) |

### Beispiel-Ordnerstruktur (neues System)

```
layouts/
├── baseof.html              # Basis-Template (alle Seiten)
├── home.html                # Startseite
├── page.html                # Standard-Einzelseite
├── section.html             # Standard-Sektionsliste
├── taxonomy.html            # Taxonomie-Uebersicht
├── term.html                # Einzelner Taxonomie-Term
├── 404.html                 # Fehlerseite
├── robots.txt               # robots.txt Template
├── sitemap.xml              # Sitemap Template
│
├── blog/                    # Typ-spezifische Templates
│   ├── page.html            # Einzelseite im Blog
│   └── section.html         # Blog-Listing
│
├── _partials/               # Partials (Unterstrich!)
│   ├── head.html
│   ├── header.html
│   ├── footer.html
│   ├── nav.html
│   └── pagination.html
│
├── _shortcodes/             # Shortcodes (Unterstrich!)
│   ├── figure.html
│   ├── youtube.html
│   └── notice.html
│
└── _markup/                 # Render Hooks
    ├── render-link.html
    ├── render-image.html
    ├── render-heading.html
    ├── render-codeblock.html
    ├── render-blockquote.html
    └── render-table.html
```

### Migration-Hinweise

- Die alte Struktur wird weiterhin unterstuetzt (Mapping auf neue Pfade)
- Themes koennen beide Strukturen verwenden
- Bei Konflikten hat das neue System Vorrang
- `hugo config` zeigt die aufgeloeste Template-Zuordnung

## Template-Typen im Detail

### Base Template (baseof.html)

Das Basis-Template definiert die HTML-Grundstruktur. Alle anderen Templates erweitern es ueber `block`/`define`.

```go-html-template
<!DOCTYPE html>
<html lang="{{ site.Language.LanguageCode }}">
<head>
  {{ partial "head.html" . }}
</head>
<body>
  {{ partial "header.html" . }}

  <main>
    {{ block "main" . }}
      {{/* Fallback-Content, wenn kein Template "main" definiert */}}
      <p>Kein Content definiert.</p>
    {{ end }}
  </main>

  {{ partial "footer.html" . }}

  {{ block "scripts" . }}{{ end }}
</body>
</html>
```

**Regeln:**
- `baseof.html` wird automatisch als Basis verwendet
- Jedes Template kann mehrere Blocks definieren
- Blocks mit Fallback-Content: `{{ block "name" . }}Fallback{{ end }}`
- Leere Blocks: `{{ block "scripts" . }}{{ end }}`

### Home Template (home.html)

```go-html-template
{{ define "main" }}
  <h1>{{ .Title }}</h1>
  {{ .Content }}

  <h2>Neueste Beitraege</h2>
  {{ range first 5 site.RegularPages }}
    <article>
      <h3><a href="{{ .RelPermalink }}">{{ .Title }}</a></h3>
      <time>{{ .Date.Format "02.01.2006" }}</time>
      {{ .Summary }}
    </article>
  {{ end }}
{{ end }}
```

### Page Template (page.html)

```go-html-template
{{ define "main" }}
  <article>
    <h1>{{ .Title }}</h1>
    <time datetime="{{ .Date.Format "2006-01-02" }}">{{ .Date.Format "02.01.2006" }}</time>

    {{ with .Description }}
      <p class="description">{{ . }}</p>
    {{ end }}

    {{ .Content }}

    {{ with .Params.tags }}
      <div class="tags">
        {{ range . }}
          <a href="{{ "tags/" | absURL }}{{ . | urlize }}/">{{ . }}</a>
        {{ end }}
      </div>
    {{ end }}
  </article>
{{ end }}
```

### Section Template (section.html)

```go-html-template
{{ define "main" }}
  <h1>{{ .Title }}</h1>
  {{ .Content }}

  {{ range .Pages }}
    <article>
      <h2><a href="{{ .RelPermalink }}">{{ .Title }}</a></h2>
      {{ .Summary }}
    </article>
  {{ end }}

  {{ template "_internal/pagination.html" . }}
{{ end }}
```

### Taxonomy Template (taxonomy.html)

```go-html-template
{{ define "main" }}
  <h1>{{ .Title }}</h1>
  {{ range .Pages }}
    <div>
      <a href="{{ .RelPermalink }}">{{ .Title }}</a>
      ({{ len .Pages }} Eintraege)
    </div>
  {{ end }}
{{ end }}
```

### Term Template (term.html)

```go-html-template
{{ define "main" }}
  <h1>{{ .Title }}</h1>
  {{ range .Pages }}
    <article>
      <h2><a href="{{ .RelPermalink }}">{{ .Title }}</a></h2>
      {{ .Summary }}
    </article>
  {{ end }}
{{ end }}
```

## Template Lookup Order

Hugo sucht Templates in einer definierten Reihenfolge. Die erste Uebereinstimmung gewinnt.

### Prioritaet (absteigend)

1. **Layout** (aus Front Matter: `layout: "custom"`)
2. **Type** (aus Front Matter oder Section-Name)
3. **Kind** (home, page, section, taxonomy, term)
4. **Output Format** (html, json, rss, etc.)
5. **Language** (bei mehrsprachigen Sites)

### Beispiel: Einzelseite `/blog/mein-post/`

Hugo sucht in dieser Reihenfolge:
```
layouts/blog/page.html        # Typ-spezifisch
layouts/page.html              # Standard page
layouts/blog/single.html      # Altes Mapping
layouts/_default/single.html  # Altes Mapping (Fallback)
```

### Beispiel: Startseite

```
layouts/home.html              # Neues System
layouts/index.html             # Altes Mapping
layouts/_default/home.html     # Altes Mapping
layouts/_default/list.html     # Altes Mapping (Fallback)
```

### Beispiel: Sektion `/projekte/`

```
layouts/projekte/section.html  # Typ-spezifisch
layouts/section.html           # Standard section
layouts/projekte/list.html     # Altes Mapping
layouts/_default/list.html     # Altes Mapping (Fallback)
```

## Partials

Wiederverwendbare Template-Fragmente.

### Einbindung

```go-html-template
{{ partial "head.html" . }}              # Mit aktuellem Kontext
{{ partial "header.html" (dict "page" . "showNav" true) }}  # Mit Dictionary
{{ partialCached "footer.html" . }}      # Gecacht (einmal gerendert)
{{ partialCached "sidebar.html" . .Section }}  # Cache-Key: Section
```

### Partial mit Rueckgabewert

```go-html-template
{{/* _partials/get-title.html */}}
{{ $title := .Title }}
{{ with .Params.shortTitle }}
  {{ $title = . }}
{{ end }}
{{ return $title }}

{{/* Verwendung */}}
{{ $title := partial "get-title.html" . }}
```

### Inline Partials (define/block im gleichen Template)

```go-html-template
{{ define "partials/inline-card.html" }}
  <div class="card">
    <h3>{{ .Title }}</h3>
    {{ .Content }}
  </div>
{{ end }}

{{ range .Pages }}
  {{ partial "inline-card.html" . }}
{{ end }}
```

## Shortcodes

Wiederverwendbare Content-Snippets in Markdown.

### Eingebaute Shortcodes

```markdown
{{</* figure src="/images/bild.jpg" title="Titel" caption="Bildunterschrift" */>}}
{{</* youtube dQw4w9WgXcQ */>}}
{{</* vimeo 146022717 */>}}
{{</* gist user 12345 */>}}
{{</* highlight go "linenos=table,hl_lines=3" */>}}
  // Code hier
{{</* /highlight */>}}
```

### Eigene Shortcodes erstellen

```go-html-template
{{/* _shortcodes/notice.html */}}
{{ $type := .Get "type" | default "info" }}
<div class="notice notice-{{ $type }}">
  {{ .Inner | markdownify }}
</div>
```

Verwendung in Markdown:
```markdown
{{%/* notice type="warning" */%}}
Dies ist eine **Warnung**.
{{%/* /notice */%}}
```

### Shortcode-Syntax

- `{{</* name */>}}` — Inhalt wird NICHT durch Markdown-Prozessor geschickt
- `{{%/* name */%}}` — Inhalt wird durch Markdown-Prozessor geschickt
- `.Get 0`, `.Get 1` — Positionale Parameter
- `.Get "name"` — Benannte Parameter
- `.Inner` — Inhalt zwischen oeffnendem und schliessendem Tag
- `.Page` — Zugriff auf die umgebende Seite

## Template-Syntax Vertiefung

### Variablen

```go-html-template
{{ $title := "Hallo" }}          # Deklaration
{{ $title = "Welt" }}            # Neu-Zuweisung (Achtung: = statt :=)
{{ $items := slice "a" "b" "c" }}  # Slice erstellen
{{ $map := dict "key" "value" }}   # Map erstellen
```

### Range (Iteration)

```go-html-template
{{ range .Pages }}
  {{ .Title }}
{{ end }}

{{ range $index, $page := .Pages }}
  {{ $index }}: {{ $page.Title }}
{{ end }}

{{ range .Pages }}
  {{ .Title }}
{{ else }}
  Keine Seiten gefunden.
{{ end }}
```

### With (Kontext-Wechsel)

```go-html-template
{{ with .Params.author }}
  <span>Autor: {{ . }}</span>
{{ else }}
  <span>Kein Autor angegeben</span>
{{ end }}
```

### If/Else

```go-html-template
{{ if .IsHome }}
  Startseite
{{ else if .IsSection }}
  Sektion
{{ else }}
  Andere Seite
{{ end }}

{{ if and .IsPage (not .Draft) }}
  Veroeffentlichte Seite
{{ end }}

{{ if or .IsHome .IsSection }}
  Hat Unterseiten
{{ end }}
```

### Verschachtelte Contexts

```go-html-template
{{ range .Pages }}
  {{/* . = aktuelle Page im Range */}}
  {{ .Title }}

  {{ with .Params.author }}
    {{/* . = author string */}}
    {{ . }}

    {{/* Zurueck zum Root-Kontext */}}
    {{ $.Title }}
  {{ end }}
{{ end }}
```
