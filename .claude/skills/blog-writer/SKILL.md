---
name: blog-writer
description: |
  Blog-Writer für hnsstrk.de — hilft beim Erstellen, Überarbeiten und Prüfen hochwertiger technischer Blog-Posts.
  TRIGGER when: user wants to write, edit, review, or check a blog post ("Blog schreiben", "Blogpost erstellen", "Artikel schreiben", "Artikel überarbeiten", "Blog prüfen", "Blog-Entwurf", "neuer Blogpost", "Blog Review").
  DO NOT TRIGGER when: user only discusses blog ideas without wanting to write, asks about Hugo configuration (use hugo-ssg), or works on non-blog content pages.
allowed-tools: Read, Write, Edit, Grep, Glob, Bash, Agent
---

# Blog-Writer — hnsstrk.de

Erstelle, überarbeite und prüfe technische Blog-Artikel für hnsstrk.de. Kommuniziere ausschließlich auf **Deutsch** mit korrekten Umlauten (ä, ö, ü, ß).

## Kritisch: Deutsche Zeichenbehandlung

Korrekte Umlaute in ALLEN Inhalten: ä, ö, ü, ß, Ä, Ö, Ü. Niemals ae, oe, ue, ss.
**Ausnahme:** Dateinamen — dort Umlaute vermeiden (Hugo-Kompatibilität).

## Referenz-Dateien

Vor jedem Schreibvorgang ALLE Referenzen lesen:

```
references/schreibstil.md        — Stilregeln (Ich-Perspektive, Tonalität, Konkretheit)
references/formate.md            — Format-Templates mit Struktur und Hooks
references/qualitaetskriterien.md — Prüfcheckliste
references/frontmatter-referenz.md — Hugo-Frontmatter und Shortcodes
references/design-system.md      — Fluid Design System (Fonts, Farben, Spacing, Komponenten)
```

Diese Dateien liegen im Skill-Verzeichnis. Pfad auflösen:
```bash
SKILL_DIR="$(find "$HOME/.claude/skills" -type d -name "blog-writer" 2>/dev/null | head -1)"
```

## Workflow

### Modus erkennen

| User-Anfrage | Modus |
|-------------|-------|
| "Blog schreiben", "neuer Blogpost", "Artikel erstellen" | → Neuen Artikel schreiben |
| "Artikel überarbeiten", "Blog verbessern", "Entwurf weiter" | → Bestehenden Artikel überarbeiten |
| "Blog prüfen", "Blog Review", "Qualitätsprüfung" | → Nur Qualitätsprüfung |

---

### Modus 1: Neuen Artikel schreiben

#### Schritt 1 — Thema und Format klären (interaktiv)

Frage den User nach:

1. **Thema:** Worum geht es?
2. **Format:** Vorschlag basierend auf dem Thema (User bestätigt/ändert):
   - Longread / Deep Dive (2.000–4.000 Wörter) — Komplexe Themen mit Tiefgang
   - Tutorial / How-To (1.000–2.500 Wörter) — Schritt-für-Schritt-Anleitungen
   - Erfahrungsbericht / Lessons Learned (1.500–3.000 Wörter) — Rückblick mit Erkenntnissen
   - Vergleichsartikel (1.500–3.000 Wörter) — Tools/Ansätze gegenüberstellen
   - Problemlösungsartikel (800–1.500 Wörter) — Problem + Lösung dokumentieren
   - Build Log (1.500–3.500 Wörter) — Bauprojekt dokumentieren
3. **Besonderer Fokus?** — Gibt es Aspekte, die besonders wichtig sind?
4. **Vault-Recherche?** — Soll der Obsidian Vault nach Material durchsucht werden?

**STOPP** — auf User-Antwort warten, bevor fortgefahren wird.

#### Schritt 2 — Vault-Recherche (optional)

Falls der User Vault-Recherche wünscht oder das Thema offensichtlich im Vault dokumentiert ist:

Starte einen **blog-vault-rechercheur** Agent:
```
Thema: [Thema des Blog-Artikels]
Format: [Gewähltes Format]
Fokus: [Spezifische Aspekte, falls angegeben]
```

Das Research-Briefing dient als Grundlage für den Entwurf.

**Briefing dem User zeigen** und fragen, ob weitere Aspekte ergänzt werden sollen.

**STOPP** — auf Bestätigung warten.

#### Schritt 3 — Entwurf schreiben

Jetzt den Artikel schreiben. Dabei:

1. **Referenzen laden** — ALLE vier Reference-Dateien lesen
2. **Format-Template** aus `references/formate.md` als Strukturvorlage verwenden
3. **Schreibstil** aus `references/schreibstil.md` strikt einhalten
4. **Frontmatter** gemäß `references/frontmatter-referenz.md` erstellen
5. **Bestehende Blog-Posts** lesen: `content/blog/*/index.md` im Hugo-Projekt — Stil und Tonalität abgleichen
6. **Hugo-Features** gezielt einsetzen:
   - `{{</* tldr */>}}` bei Longreads > 2.000 Wörter
   - `toc: true` bei > 1.500 Wörter
   - Mermaid-Diagramme bei Architektur/Pipeline
   - Callouts sparsam (max. 2–3)
   - Code-Blöcke immer mit Sprachangabe
   - Diff-Blöcke bei Vorher/Nachher
   - Bilder: Alt-Text Pflicht, Title-Attribut für Figcaption, responsive (Hugo liefert `loading="lazy"`)
   - `<!--more-->` Marker nach dem Einstiegsabsatz — definiert die Card-Vorschau auf der Blog-Übersicht
7. **Vault-Briefing** einarbeiten (falls vorhanden)

Den Entwurf als Datei erstellen:
```
content/blog/<englischer-slug>/index.md
```

**Entwurf dem User zeigen** mit Zusammenfassung (Wortanzahl, Format, verwendete Features).

**STOPP** — auf Feedback warten.

#### Schritt 4 — Qualitätsprüfung

Starte einen **blog-qualitaetspruefer** Agent:
```
Pfad: /Users/hnsstrk/Repositories/hnsstrk.de/content/blog/<dateiname>/index.md
Format: [Gewähltes Format]
```

Den Prüfbericht dem User zeigen.

**STOPP** — auf User-Entscheidung warten (Überarbeiten / Veröffentlichen / Verwerfen).

#### Schritt 5 — Überarbeitung

Falls der Prüfbericht oder der User Änderungen wünscht:

1. Alle Pflichtkriterien-Mängel beheben
2. User-Feedback einarbeiten
3. Hugo-Features ergänzen wo empfohlen
4. Wortanzahl prüfen (Format-Minimum erreicht?)

Geänderte Version dem User zeigen.

Optional: erneute Qualitätsprüfung bei umfangreichen Änderungen.

#### Schritt 6 — Finalisierung

Wenn der User zufrieden ist:
- `draft: true` belassen (User entscheidet über Veröffentlichung)
- Zusammenfassung: Dateiname, Wortanzahl, Tags, verwendete Features

---

### Modus 2: Bestehenden Artikel überarbeiten

1. **Artikel lesen** — Datei aus `content/blog/` laden
2. **Referenzen laden** — alle vier Reference-Dateien
3. **User-Feedback** erfassen — was soll geändert werden?
4. **Änderungen umsetzen** — unter Einhaltung aller Stilregeln
5. **Qualitätsprüfung** anbieten (optional)

---

### Modus 3: Nur Qualitätsprüfung

1. **Artikel identifizieren** — User gibt Dateiname oder Thema an
2. **blog-qualitaetspruefer Agent** starten
3. **Prüfbericht** dem User präsentieren
4. **Überarbeitung anbieten** — falls Mängel gefunden

---

## Hugo-Projekt-Kontext

| Eigenschaft | Wert |
|-------------|------|
| Projektpfad | `/Users/hnsstrk/Repositories/hnsstrk.de/` |
| Blog-Content | `content/blog/` |
| Archetype | `archetypes/blog.md` |
| Theme | `themes/hnsstrk/` |
| Sprache | Deutsch (`languageCode = "de"`) |

## Regeln

### Arbeitsweise
- **Schrittweise arbeiten** — jeder Schritt einzeln, User-Feedback abwarten
- **Niemals mehrere Schritte auf einmal** — der User soll zwischen Schritten prüfen können
- **Transparenz** — bei jeder Entscheidung erklären warum

### Inhalt
- **Keine Ich-Perspektive** — wichtigste Regel, keine Ausnahmen
- **Konkretheit** — Zahlen, Versionen, Konfigurationen statt vager Aussagen
- **Ehrlichkeit** — Grenzen und Fehler gleichberechtigt dokumentieren
- **Respekt** — andere Tools/Ansätze nicht abwerten

### Technik
- **draft: true** — immer, User entscheidet über Veröffentlichung
- **Dateinamen** — englisch, lowercase, Bindestriche, keine Umlaute
- **Frontmatter** — immer vollständig gemäß Referenz
- **Code-Blöcke** — immer mit Sprachangabe
- **Page Bundles** — Blog-Posts als Ordner mit `index.md`, Bilder im gleichen Ordner
- **Featured Image** — optional als `featured_image: "dateiname.webp"` im Frontmatter
