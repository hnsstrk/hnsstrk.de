# Qualitätskriterien — hnsstrk.de Blog

Diese Datei definiert die Prüfkriterien für Blog-Entwürfe. Der blog-qualitaetspruefer Agent verwendet diese Checkliste.

---

## Checkliste

### Pflicht (Artikel wird nicht veröffentlicht ohne diese Punkte)

- [ ] **Persönliche Stimme** — Text folgt dem Register Prosa der `schreibwerkstatt` (Ich-Perspektive erwünscht); Prüfung via `stilcheck.sh`
- [ ] **Keine direkte Leseranrede** — kein "du", "Sie", "ihr"
- [ ] **Keine vagen Aussagen** ohne konkrete Belege oder Zahlen
- [ ] **Code-Beispiele vorhanden** bei technischen Themen (Pflicht)
- [ ] **Hugo-Frontmatter vollständig** — title, date, draft, description, tags
- [ ] **`<!--more-->` Marker vorhanden** — nach dem Einstiegsabsatz, vor der ersten Überschrift
- [ ] **Fazit vorhanden** und NICHT zusammenfassend ("Zusammenfassend lässt sich sagen" ist verboten)
- [ ] **Korrekte deutsche Umlaute** — ä, ö, ü, ß (niemals ae, oe, ue, ss)
- [ ] **Einstieg ohne "In diesem Artikel"** — Hook verwenden
- [ ] **Alternativen respektvoll erwähnt** — keine Abwertung anderer Tools/Ansätze
- [ ] **Fehler/Grenzen dokumentiert** — mindestens eine Erwähnung von Einschränkungen

### Format-abhängig

- [ ] **TL;DR** bei Longreads > 2.000 Wörter (via `{{</* tldr */>}}` Shortcode)
- [ ] **TOC** bei Longreads > 1.500 Wörter (via `toc: true` im Frontmatter)
- [ ] **Mermaid-Diagramme** bei Pipeline/Architektur-Beschreibungen
- [ ] **Diff-Blöcke** bei Konfigurationsänderungen (```diff)
- [ ] **Vergleichstabelle** bei Vergleichsartikeln
- [ ] **Voraussetzungen-Liste** bei Tutorials
- [ ] **Fehlermeldung als Code-Block** bei Problemlösungsartikeln

### Qualität

- [ ] **Callouts sparsam** — maximal 2–3 pro Artikel
- [ ] **Versionsangaben** bei versionsspezifischen Aussagen + "Stand [Monat Jahr]"
- [ ] **Code-Blöcke mit Sprachangabe** — ```bash, ```toml, ```yaml etc.
- [ ] **Absätze maximal 4–6 Sätze**
- [ ] **Zwischenüberschriften** als Orientierungshilfe
- [ ] **Keine Sperrlisten-Wörter** (siehe schreibstil.md) und keine Verbots-Phrasen des schreibwerkstatt-Profils
- [ ] **Interne Verlinkung** zu verwandten Blog-Posts geprüft

### SEO und Meta

- [ ] **Description** max. 160 Zeichen, aussagekräftig
- [ ] **Tags** relevant und nicht inflationär (3–8 Tags)
- [ ] **Titel** prägnant und beschreibend (kein Clickbait)
- [ ] **Slug** (Dateiname) englisch, lowercase, mit Bindestrichen

---

## Mindestlängen nach Format

| Format | Mindestlänge | Maximale Länge |
|--------|-------------|----------------|
| Longread / Deep Dive | 2.000 Wörter | 4.000 Wörter |
| Tutorial / How-To | 1.000 Wörter | 2.500 Wörter |
| Erfahrungsbericht | 1.500 Wörter | 3.000 Wörter |
| Vergleichsartikel | 1.500 Wörter | 3.000 Wörter |
| Problemlösungsartikel | 800 Wörter | 1.500 Wörter |
| Build Log | 1.500 Wörter | 3.500 Wörter |

---

## Stilprüfung — Muster suchen

Der Qualitätsprüfer sucht aktiv nach diesen Mustern:

### Vage Aussagen
- "deutlich schneller" → Wie viel schneller? Zahlen!
- "ein paar Einstellungen" → Welche Einstellungen?
- "relativ einfach" → Wie viele Schritte?
- "verschiedene Optionen" → Welche Optionen?
- "einige Probleme" → Welche Probleme?

### Übertriebene Sprache
- Superlative: "das beste", "perfekt", "genial", "revolutionär"
- Marketing: "game-changer", "next-level", "Killer-Feature"
- Enthusiasmus: "Wahnsinn!", "Mega!", "Hammer!"

### Verbotene Fazit-Muster
```
Zusammenfassend lässt sich sagen
In diesem Artikel haben wir
Abschließend möchte ich
Alles in allem
```

---

## Bewertungsskala für den Qualitätsprüfer

Der Prüfer bewertet jeden Artikel auf einer Skala:

| Bewertung | Bedeutung | Aktion |
|-----------|----------|--------|
| **Veröffentlichungsreif** | Alle Pflichtkriterien erfüllt, keine kritischen Mängel | Kann veröffentlicht werden (draft: false) |
| **Überarbeitung nötig** | 1–3 Pflichtkriterien nicht erfüllt oder > 5 Qualitätsmängel | Konkrete Verbesserungen umsetzen, dann erneut prüfen |
| **Grundlegende Überarbeitung** | > 3 Pflichtkriterien nicht erfüllt oder strukturelle Probleme | Zurück zum Entwurf, Struktur und Inhalt überarbeiten |
