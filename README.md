# hnsstrk.de

Persoenliche Profilseite mit animierter Split-Flap Landing Page ([FlipOff](https://github.com/magnum6actual/flipoff)),
gebaut mit [Hugo](https://gohugo.io/) und dem [Ayu-Farbsystem](https://github.com/ayu-theme/ayu-colors).

## Technologie

| Komponente | Technologie |
|---|---|
| Static Site Generator | Hugo (extended) |
| Landing Page | FlipOff Split-Flap Display |
| CSS | Vanilla CSS, Ayu-Farbsystem (Light, Mirage, Dark) |
| Schriften | [Monaspace](https://monaspace.githubnext.com/) Superfamilie |
| Icons | [Nerd Fonts](https://www.nerdfonts.com/) Glyphen via Monaspace NF-Varianten |
| Diagramme | Mermaid.js (lokal gebuendelt, Ayu-themed) |
| Hosting | Contabo + Nginx |
| CI/CD | GitHub Actions → SSH-Trigger → Server-seitiger Build |

## Entwicklung

```bash
hugo server -D          # Entwicklungsserver mit Entwuerfen
hugo --minify            # Produktions-Build
```

## Content erstellen

```bash
hugo new content blog/mein-beitrag       # Blog-Post
hugo new content projects/mein-projekt   # Projekt-Seite
```

Archetypes in `archetypes/blog/` und `archetypes/projects/` liefern section-spezifisches Frontmatter. Immer **ohne** `/index.md` aufrufen.

### Blog-Frontmatter

| Feld | Pflicht | Beschreibung |
| ---- | :-----: | ------------ |
| `title` | ja | Beitragstitel |
| `description` | ja | Kurzbeschreibung |
| `tags` | ja | Tags in korrekter Schreibweise (z.B. `"KI"`, `"Hugo"`, `"CLI"`) |
| `featured_image` | nein | Dateiname des Vorschaubilds im Page Bundle |
| `featured_layout` | nein | Bild-Layout: `left`, `right`, `top`, `bottom` |
| `toc` | nein | Inhaltsverzeichnis anzeigen (`true`/`false`) |

### Projekt-Frontmatter

| Feld | Pflicht | Beschreibung |
| ---- | :-----: | ------------ |
| `title` | ja | Projektname |
| `description` | ja | Kurzbeschreibung (wird als Excerpt angezeigt) |
| `tags` | ja | Tags in korrekter Schreibweise |
| `technologies` | ja | Liste der verwendeten Technologien |
| `category` | ja | Projektkategorie (z.B. "KI-Werkzeug", "Desktop-Bastelei") |
| `weight` | ja | Sortierreihenfolge (niedrig = oben) |
| `github` | nein | Repository-URL — Plattform wird automatisch erkannt |

Die Projekt-Karten erkennen anhand der Repository-URL automatisch die Plattform und zeigen das passende [Nerd Fonts](https://www.nerdfonts.com/) Icon:

| Plattform | Codepoint | URL enthaelt |
| --------- | --------- | ------------ |
| GitHub | `f09b` | `github` |
| GitLab | `f296` | `gitlab` |
| Bitbucket | `f171` | `bitbucket` |
| Gitea | `e65a` | `gitea` |

## Lizenz

MIT (Code) + CC BY 4.0 (Content) — siehe [LICENSE](LICENSE) und [Lizenzen](https://hnsstrk.de/licenses/)
