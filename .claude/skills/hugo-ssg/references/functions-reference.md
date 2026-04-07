# Hugo Funktionen — Kurzuebersicht (Top 30)

Fuer detaillierte Signaturen, Optionen und Beispiele: **context7** verwenden mit Library-ID `/gohugoio/hugodocs`.

Beispiel-Queries:
- "How to use collections.Where with operators"
- "resources.GetRemote with headers"
- "time.Format reference date layout"

---

## strings

| Funktion | Beschreibung | Beispiel |
|----------|-------------|---------|
| `strings.Contains` | Enthaelt Teilstring | `{{ strings.Contains "hugo" "ug" }}` → true |
| `strings.HasPrefix` | Beginnt mit Praefix | `{{ strings.HasPrefix "hugo" "hu" }}` → true |
| `strings.Replace` | Ersetzen | `{{ strings.Replace "hallo" "a" "e" }}` → "hello" |
| `strings.FindRE` | Regex-Suche (Liste) | `{{ strings.FindRE "\\d+" "abc123" }}` → ["123"] |
| `strings.Truncate` | Kuerzen mit Ellipsis | `{{ "Langer Text" \| truncate 10 }}` → "Langer ..." |
| `strings.Title` | Erster Buchstabe gross | `{{ "hallo welt" \| strings.Title }}` → "Hallo Welt" |
| `split` | Aufteilen | `{{ split "a,b,c" "," }}` → ["a","b","c"] |

## collections

| Funktion | Beschreibung | Beispiel |
|----------|-------------|---------|
| `where` | Filtern | `{{ where .Pages "Section" "blog" }}` |
| `sort` | Sortieren | `{{ sort .Pages "Title" }}` |
| `first` | Erste N Elemente | `{{ first 5 .Pages }}` |
| `last` | Letzte N Elemente | `{{ last 3 .Pages }}` |
| `group` | Gruppieren | `{{ .Pages \| group "Section" }}` |
| `dict` | Dictionary erstellen | `{{ dict "key" "val" "key2" "val2" }}` |
| `slice` | Slice erstellen | `{{ slice "a" "b" "c" }}` |
| `in` | Enthalten in | `{{ in (slice "a" "b") "a" }}` → true |
| `len` | Laenge | `{{ len .Pages }}` |
| `merge` | Maps zusammenfuehren | `{{ merge $defaults $custom }}` |

### where-Operatoren (haeufigste)

```go-html-template
{{ where .Pages "Section" "eq" "blog" }}          # Gleich (Standard)
{{ where .Pages "Section" "ne" "blog" }}           # Nicht gleich
{{ where .Pages "Weight" "gt" 10 }}                # Groesser als
{{ where .Pages "Params.tags" "intersect" (slice "hugo" "web") }}
```

Fuer alle Operatoren → context7: "where operators"

## compare

| Funktion | Beschreibung | Beispiel |
|----------|-------------|---------|
| `default` | Wert oder Fallback | `{{ default "Fallback" .Description }}` |
| `cond` | Ternary | `{{ cond .IsHome "Start" .Title }}` |
| `eq` / `ne` / `gt` / `lt` | Vergleich | `{{ eq .Kind "page" }}` |

## fmt

| Funktion | Beschreibung | Beispiel |
|----------|-------------|---------|
| `printf` | Formatierte Ausgabe | `{{ printf "Seite: %s" .Title }}` |
| `warnf` | Warnung (Build laeuft) | `{{ warnf "Kein Bild: %s" .Title }}` |
| `errorf` | Fehler (Build bricht ab) | `{{ errorf "Fehlt: %s" .Title }}` |

## transform

| Funktion | Beschreibung | Beispiel |
|----------|-------------|---------|
| `markdownify` | Markdown → HTML (inline) | `{{ .Description \| markdownify }}` |
| `plainify` | HTML → Plaintext | `{{ .Content \| plainify }}` |
| `highlight` | Syntax-Highlighting | `{{ highlight $code "go" }}` |

## resources

| Funktion | Beschreibung | Beispiel |
|----------|-------------|---------|
| `resources.Get` | Datei aus assets/ | `{{ resources.Get "css/main.css" }}` |
| `resources.GetRemote` | Remote-Datei laden | `{{ resources.GetRemote "https://..." }}` |
| `resources.Minify` | Minifizieren | `{{ $css \| resources.Minify }}` |
| `resources.Fingerprint` | Hash an Dateinamen | `{{ $css \| resources.Fingerprint }}` |

## Weitere

| Funktion | Beschreibung | Beispiel |
|----------|-------------|---------|
| `relURL` | Relative URL | `{{ relURL "/pfad/" }}` |
| `absURL` | Absolute URL | `{{ absURL "/pfad/" }}` |
| `.Date.Format` | Datum formatieren | `{{ .Date.Format "02.01.2006" }}` |
| `time.Now` | Aktuelles Datum | `{{ time.Now }}` |
| `os.Getenv` | Umgebungsvariable | `{{ os.Getenv "HUGO_ENV" }}` |

**Go-Referenz-Datum:** `Mon Jan 2 15:04:05 MST 2006`

Haeufige Formate:

| Format | Ausgabe |
|--------|---------|
| `"02.01.2006"` | 07.04.2026 |
| `"2. January 2006"` | 7. April 2026 |
| `"2006-01-02"` | 2026-04-07 |

---

## Page Methods (Kurzreferenz)

**Inhalt:** `.Title` `.Content` `.Summary` `.Description` `.Plain` `.RawContent`
**Datum:** `.Date` `.Lastmod` `.PublishDate` `.ExpiryDate`
**URLs:** `.Permalink` `.RelPermalink` `.LinkTitle` `.Slug`
**Typ:** `.IsHome` `.IsPage` `.IsSection` `.Kind` `.Type` `.Section` `.Draft`
**Navigation:** `.Pages` `.RegularPages` `.Parent` `.Ancestors` `.Next` `.Prev`
**Ressourcen:** `.Resources` `.Params` `.Param "key"` `.File`
**Statistik:** `.WordCount` `.ReadingTime` `.TableOfContents`
**Git:** `.GitInfo.AuthorName` `.GitInfo.Hash` `.GitInfo.AuthorDate`

## Site Methods (Kurzreferenz)

```
site.Title  site.BaseURL  site.Language  site.Menus
site.Taxonomies  site.Pages  site.RegularPages
site.Params  site.Data  site.Home  site.MainSections
site.IsServer  site.BuildDrafts  site.LastChange
```

## hugo Object

```go-html-template
{{ hugo.Version }}        # "0.160.0"
{{ hugo.Environment }}    # development / production
{{ hugo.IsProduction }}   # true wenn production
{{ hugo.IsServer }}       # true wenn hugo server
{{ hugo.Generator }}      # <meta>-Tag
```

Fuer alles Weitere → context7 mit `/gohugoio/hugodocs`
