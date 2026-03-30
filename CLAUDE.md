# CLAUDE.md — hnsstrk.de

## Projektübersicht

**Projektname:** hnsstrk.de
**Beschreibung:** Persönliche Profilseite mit FlipOff Split-Flap Landing Page — eine animierte, mechanisch anmutende Anzeigetafel als digitale Visitenkarte.
**Status:** Konzeptphase — Zielsetzung definiert, Implementierungsplan in Arbeit
**Ziel:** Persönliche Online-Präsenz als Privatperson (KEIN berufliches Portfolio, KEIN Freelancer-Angebot)
**Content:** Deutsch
**Lizenz:** MIT (Code) + CC BY 4.0 (Content)

> Dieses Projekt ist eine rein private Hobby-Seite. Keine Werbung, kein kommerzieller Zweck, kein beruflicher Bezug.


## Technologie

| Komponente | Technologie | Status |
|---|---|---|
| Static Site Generator | Hugo 0.159.1 extended | Entschieden (ADR-001) |
| Landing Page | FlipOff (HTML/CSS/JS) | Split-Flap Display |
| Hosting | Contabo Ubuntu Server + Nginx | Entschieden (ADR-002) |
| CI/CD | GitHub Actions SSH-Trigger → Server baut mit Hugo | Entschieden |
| SSL | Let's Encrypt / Certbot | — |
| CSS | Vanilla CSS | — |


## Repository-Struktur

```
hnsstrk.de/
├── .github/workflows/  # GitHub Actions (SSH-Trigger für Deploy)
├── .gitignore
├── CLAUDE.md           # Dieses Dokument
├── README.md
├── LICENSE
├── CHANGELOG.md
├── deploy/             # Build-Script für Contabo Server
├── config.toml         # Hugo-Konfiguration (noch nicht erstellt)
├── content/            # Hugo-Inhalte (noch nicht erstellt)
├── layouts/            # Hugo-Templates (noch nicht erstellt)
├── static/             # Statische Dateien: CSS, JS, Bilder
│   └── images/         # Profilbild (avatar.png)
└── themes/             # Hugo-Themes (optional)
```


## Befehle (vorläufig)

```bash
# Lokaler Entwicklungsserver
hugo server

# Produktions-Build
hugo build
# oder
hugo --minify

# Mit Entwürfen
hugo server -D
```

Diese Befehle gelten für Hugo. Bei Technologiewechsel hier aktualisieren.


## Projektdokumentation

Alle Konzepte, Entscheidungen, technische Dokumentation und ADRs werden im Obsidian Vault geführt.

**Vault-Pfad (plattformabhängig):**

| System | Vault-Basispfad |
|--------|----------------|
| Linux (Ganymed) | `/home/hnsstrk/Insync/hans.juergen.stark@gmail.com/Google Drive/Vault Obsidian/` |
| macOS (MacBook) | `/Users/hnsstrk/Meine Ablage/Vault Obsidian/` |

**Projektordner im Vault:** `Projekte/hnsstrk.de/`

Vollständige Pfade:
- Linux: `/home/hnsstrk/Insync/hans.juergen.stark@gmail.com/Google Drive/Vault Obsidian/Projekte/hnsstrk.de/`
- macOS: `/Users/hnsstrk/Meine Ablage/Vault Obsidian/Projekte/hnsstrk.de/`

Dieser Ordner ist bei jeder Arbeit am Projekt zu konsultieren — insbesondere:
- Design-Entscheidungen und ADRs
- Konzepte und Wireframes
- Technologie-Evaluierungen
- Offene Fragen und nächste Schritte


## Konventionen

- **Dokumentation:** Deutsch (Kommentare, Commit-Messages, Changelogs)
- **Code:** Englisch (Variablen, Funktionen, HTML-Attribute, CSS-Klassen)
- **Commits:** Konventionelle Commits (`feat:`, `fix:`, `docs:`, `style:`, `chore:`)
- **Branches:** `main` als Produktionsbranch


## Agenten-Teams

Bei Implementierungsarbeiten immer ein Agent-Team erstellen und Aufgaben parallelisieren.

### Modellwahl nach Aufgabentyp

| Modell | Einsatz |
|--------|---------|
| **opus** | Architekturentscheidungen, komplexe Logik, Code-Review, Debugging, Recherche mit Bewertung |
| **sonnet** | Standard-Implementierung, Templates, CSS, Konfiguration, moderate Komplexität |
| **haiku** | Einfache Dateien erstellen, Formatierung, einzelne Edits, Content-Dateien |

### Regeln

- Unabhängige Tasks immer parallel auf Agenten verteilen
- Modell passend zur Komplexität wählen — nicht alles braucht Opus
- Jeder Agent bekommt eine klare, vollständige Aufgabenbeschreibung
- Ergebnisse nach Abschluss aller Agenten prüfen und zusammenführen


## Sensible Daten

Keine API-Keys, Passwörter oder Tokens im Repository. Alle sensiblen Daten über Umgebungsvariablen oder separate, gitignorierte Konfigurationsdateien.

Siehe `.gitignore` für vollständige Liste ignorierter Dateitypen.
