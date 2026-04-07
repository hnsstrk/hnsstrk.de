# Theme-Entwicklung und Veröffentlichung

## Theme-Struktur

```
mytheme/
├── archetypes/
│   └── default.md
├── assets/                # Hugo Pipes Assets (SCSS, JS)
├── i18n/                  # Übersetzungen
├── layouts/               # Templates
│   ├── baseof.html
│   ├── home.html
│   ├── page.html
│   ├── section.html
│   ├── taxonomy.html
│   ├── term.html
│   ├── 404.html
│   ├── _partials/
│   │   ├── head.html
│   │   ├── header.html
│   │   └── footer.html
│   ├── _shortcodes/
│   └── _markup/
├── static/                # Statische Assets
├── exampleSite/           # Demo-Website
│   ├── content/
│   ├── data/
│   ├── hugo.toml
│   └── static/
├── images/
│   ├── screenshot.png     # 1500x1000px empfohlen
│   └── tn.png             # 900x600px Thumbnail
├── theme.toml             # Theme-Metadaten
├── go.mod                 # Hugo Module (optional)
├── LICENSE
└── README.md
```

## theme.toml

```toml
name = "Mein Theme"
license = "MIT"
licenselink = "https://github.com/user/theme/blob/main/LICENSE"
description = "Kurzbeschreibung des Themes"
homepage = "https://github.com/user/theme"
demosite = "https://demo.example.com"
tags = ["responsive", "dark-mode", "blog", "minimal"]
features = ["dark mode", "responsive", "syntax highlighting"]
min_version = "0.146.0"

[author]
  name = "Hans Jürgen Stark"
  homepage = "https://hnsstrk.de"
```

## Hugo Modules (empfohlen für Distribution)

```
go.mod:
module github.com/hnsstrk/hugo-theme-hnsstrk

go 1.21
```

Nutzer installieren dann:
```toml
[module]
  [[module.imports]]
    path = "github.com/hnsstrk/hugo-theme-hnsstrk"
```

## Theme-Konfigurationsoptionen bereitstellen

Im Theme defaults setzen, die der Nutzer überschreiben kann:

```toml
# theme.toml oder config/_default/params.toml
[params]
  defaultTheme = "light"      # light, mirage, dark
  flipboardEnabled = true
  flipboardMessages = []      # Nutzer kann eigene definieren
  showFooterCredits = true
  dateFormat = "2. January 2006"

[params.fonts]
  body = "Monaspace Argon"
  heading = "Monaspace Neon"
  code = "Monaspace Xenon"
  display = "Monaspace Krypton"
```

## Partials für Theme-Nutzer anpassbar machen

Verwende Params für Konfigurierbarkeit:
```go-html-template
{{ with site.Params.customCSS }}
  <link rel="stylesheet" href="{{ . }}">
{{ end }}

{{ if site.Params.flipboardEnabled | default true }}
  <script src="{{ "js/main.js" | relURL }}" type="module"></script>
{{ end }}
```

## Template-Vererbung (Theme + Projekt)

Hugo sucht Templates in dieser Reihenfolge:
1. `layouts/` im Projekt (höchste Priorität)
2. `layouts/` im Theme
3. Embedded Templates (Hugo built-in)

Nutzer können JEDES Theme-Template überschreiben, indem sie eine gleichnamige Datei in ihrem Projekt-`layouts/` erstellen.

## Veröffentlichungs-Checkliste

### Pflicht
- [ ] Alle Templates verwenden neue Struktur (v0.146.0)
- [ ] `theme.toml` mit vollständigen Metadaten und min_version
- [ ] `exampleSite/` mit funktionsfähigem Demo-Content
- [ ] `images/screenshot.png` (1500x1000) und `images/tn.png` (900x600)
- [ ] README.md: Installation, Konfiguration, Features, Screenshots
- [ ] LICENSE Datei (MIT, Apache-2.0 oder ähnlich)
- [ ] Alle externen Assets (Fonts, JS) entweder gebündelt oder dokumentiert

### Qualität
- [ ] Responsive Design (Mobile, Tablet, Desktop, 4K)
- [ ] Dark Mode / Theme-Switching funktioniert
- [ ] Semantic HTML (header, nav, main, article, footer)
- [ ] Accessibility: ARIA-Labels, Skip-Links, Fokus-Styles, Kontraste
- [ ] Performance: Lighthouse Score > 90
- [ ] SEO: Open Graph, Twitter Cards, Structured Data, Sitemap, robots.txt
- [ ] i18n: Alle UI-Strings über i18n/, nicht hardcoded

### Tests
- [ ] `hugo --minify` ohne Fehler oder Warnungen
- [ ] Alle Page Kinds rendern korrekt (home, page, section, taxonomy, term)
- [ ] RSS Feed funktioniert
- [ ] 404-Seite existiert und ist gestylt
- [ ] Ohne JavaScript funktionsfähig (Progressive Enhancement)
- [ ] Keine Konsolenfehler im Browser

## Naming Convention für Hugo Themes Gallery

- Repository-Name: `hugo-theme-NAME`
- Theme-Name in theme.toml: Großgeschrieben, lesbar
- Tags: Kleinbuchstaben, existierende Tags wiederverwenden
- Demo-Site: Muss erreichbar sein

## Deployment des Themes als Hugo Module

```bash
# Theme initialisieren
cd mytheme/
hugo mod init github.com/user/hugo-theme-name

# Tag erstellen für Versionierung
git tag v1.0.0
git push origin v1.0.0
```

Nutzer verwenden dann:
```bash
hugo mod get github.com/user/hugo-theme-name@v1.0.0
```
