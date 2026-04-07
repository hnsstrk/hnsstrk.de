# Hugo Konfiguration — Kurzreferenz

Fuer detaillierte Konfigurationsoptionen: **context7** verwenden mit Library-ID `/gohugoio/hugodocs`.

Beispiel-Queries: "hugo configuration baseURL", "markup goldmark options", "output formats custom"

---

## Konfigurationsformate

Hugo unterstuetzt drei Formate:
- **TOML** (`hugo.toml`) — Standard, empfohlen (seit v0.110.0, vorher `config.toml`)
- **YAML** (`hugo.yaml`)
- **JSON** (`hugo.json`)

## Konfigurationsverzeichnisse

Fuer umgebungsabhaengige Konfiguration:

```
config/
├── _default/           # Basis (immer geladen)
│   ├── hugo.toml       # Hauptkonfiguration
│   ├── menus.toml      # Menues
│   ├── params.toml     # Benutzerdefinierte Parameter
│   └── markup.toml     # Markup-Einstellungen
├── production/         # Ueberschreibungen fuer Production
│   └── hugo.toml
└── staging/            # Ueberschreibungen fuer Staging
    └── hugo.toml
```

Umgebung waehlen: `hugo --environment production`

## Die 20 wichtigsten Settings

```toml
# === Pflicht ===
baseURL = "https://example.com/"

# === Empfohlen ===
title = "Seitentitel"
languageCode = "de"
defaultContentLanguage = "de"
theme = "themename"

# === Build-Verhalten ===
buildDrafts = false              # Entwuerfe einbeziehen
buildFuture = false              # Zukuenftige Beitraege
enableGitInfo = false            # .GitInfo verfuegbar machen
enableRobotsTXT = false          # robots.txt generieren
enableEmoji = false              # :smile: → Emoji

# === URLs ===
uglyURLs = false                 # /seite.html statt /seite/
canonifyURLs = false             # Relative → absolute URLs
relativeURLs = false             # Alle URLs relativ

# === Content ===
summaryLength = 70               # Woerter fuer automatische Summary
paginate = 10                    # Eintraege pro Seite
timeZone = "Europe/Berlin"       # Zeitzone
timeout = "30s"                  # Template-Timeout

# === Verzeichnisse (nur bei Abweichung vom Standard) ===
# contentDir = "content"
# publishDir = "public"
# assetDir = "assets"
```

## Menues

```toml
[menus]
  [[menus.main]]
    name = "Startseite"
    pageRef = "/"           # Referenz auf Content-Seite
    weight = 10

  [[menus.main]]
    name = "Blog"
    pageRef = "/blog/"
    weight = 20

  [[menus.main]]
    name = "GitHub"
    url = "https://github.com/user"  # Externe URL
    weight = 40
    [menus.main.params]
      external = true

  [[menus.footer]]
    name = "Impressum"
    pageRef = "/impressum/"
    weight = 10
```

### Menue im Template

```go-html-template
{{ range site.Menus.main }}
  <a href="{{ .URL }}"
    {{- with .Params.external }} target="_blank" rel="noopener"{{ end }}
    {{- if $currentPage.IsMenuCurrent "main" . }} class="active"{{ end }}>
    {{ .Name }}
  </a>
{{ end }}
```

## Markup (Goldmark)

```toml
[markup.goldmark.renderer]
  unsafe = false                # Raw HTML in Markdown erlauben
  hardWraps = false             # Zeilenumbrueche als <br>

[markup.goldmark.extensions]
  footnote = true
  strikethrough = true
  table = true
  taskList = true
  typographer = true            # Typographische Ersetzungen

[markup.goldmark.parser.attribute]
  block = false                 # Block-Attribute {.class #id}

[markup.highlight]
  codeFences = true
  lineNos = false               # Zeilennummern
  noClasses = true              # Inline-Styles statt CSS-Klassen
  style = "monokai"             # Chroma-Theme

[markup.tableOfContents]
  startLevel = 2                # Ab H2
  endLevel = 3                  # Bis H3
```

## Output Formats

```toml
[outputs]
  home = ["HTML", "RSS"]
  section = ["HTML", "RSS"]
  page = ["HTML"]
```

Eigene Formate definieren → context7: "custom output formats"

## Taxonomien + Permalinks

```toml
[taxonomies]
  tag = "tags"
  category = "categories"

[permalinks.page]
  blog = "/blog/:year/:month/:slug/"
```

Platzhalter: `:year` `:month` `:day` `:title` `:slug` `:filename` `:section`

## Params + Privacy (DSGVO)

```toml
[params]
  description = "Seitenbeschreibung"
  author = "Name"
  mainSections = ["blog", "projekte"]

[privacy.youtube]
  disable = true                    # Oder: privacyEnhanced = true
[privacy.googleAnalytics]
  disable = true
```

Zugriff: `{{ site.Params.author }}` — Privacy-Dienste: disqus, googleAnalytics, instagram, twitter, vimeo, youtube

## Umgebungsvariablen

| Variable | Beschreibung |
|----------|-------------|
| `HUGO_ENVIRONMENT` | Build-Umgebung (production, staging, development) |
| `HUGO_BASEURL` | baseURL ueberschreiben |
| `HUGO_<SETTING>` | Jedes Setting per Env-Variable setzbar |
| `HUGO_PARAMS_<KEY>` | Verschachtelte Params (z.B. `HUGO_PARAMS_AUTHOR`) |

Fuer alle weiteren Settings → context7 mit `/gohugoio/hugodocs`
