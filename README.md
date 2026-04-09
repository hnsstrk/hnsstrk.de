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
| Diagramme | Mermaid.js (lokal gebuendelt, Ayu-themed) |
| Hosting | Contabo + Nginx |
| CI/CD | GitHub Actions → SSH-Trigger → Server-seitiger Build |

## Entwicklung

```bash
hugo server -D          # Entwicklungsserver mit Entwuerfen
hugo --minify            # Produktions-Build
```

## Lizenz

MIT (Code) + CC BY 4.0 (Content) — siehe [LICENSE](LICENSE) und [Lizenzen](https://hnsstrk.de/licenses/)
