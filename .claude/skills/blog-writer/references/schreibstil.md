# Schreibstil — hnsstrk.de Blog

**Stimme, Ton und Perspektive kommen aus dem globalen Skill `schreibwerkstatt`, Register Prosa** — die persönliche Ich-Stimme des Autors (ironisch, pointiert, konkret; destilliert aus 272 eigenen Blog-Beiträgen 2007–2018). Vor jedem Entwurf das Register Prosa der schreibwerkstatt laden; Stil-Prüfung über deren Werkzeuge (`stilcheck.sh`, `lesbarkeit.py`). Ich-Perspektive ist erwünscht (User-Entscheidung 2026-08-07; die frühere unpersönliche Fassung dieser Datei liegt in der Git-Historie).

> [!important] Ohne `schreibwerkstatt` wird neutral geschrieben
> Der Skill `schreibwerkstatt` liegt **global** (`~/.claude/skills/`) und wird nicht über dieses Repository verteilt — er enthält die persönliche Stimme des Autors und hat in einem öffentlichen Repo nichts verloren.
>
> **Vor dem Schreiben prüfen, ob er verfügbar ist** (in der Skill-Liste der Sitzung oder unter `~/.claude/skills/schreibwerkstatt/`).
>
> - **Verfügbar** → Register Prosa verwenden, persönliche Ich-Stimme.
> - **Nicht verfügbar** → **neutral-sachlich** schreiben: klare Fachprosa, keine nachgeahmte Ich-Stimme, keine Ironie, keine Pointen. Alle Regeln dieser Datei gelten weiter — sie sind register-unabhängig.
>
> Im Ergebnis **ausdrücklich vermerken**, dass ohne Stil-Unterbau geschrieben wurde. Ein Text, der unbemerkt neutral klingt, ist schlechter als einer, der es angekündigt tut.

Diese Datei ergänzt nur, was blog-spezifisch und register-unabhängig ist:

## Grundhaltung

Der Blog ist eine private Hobby-Seite. Kein berufliches Portfolio, kein Freelancer-Angebot, kein Selbstmarketing. Die Artikel präsentieren Ideen, Ansätze und Erfahrungen für die Leser — persönlich erzählt, aber ohne Kompetenz-Schau.

## Show, Don't Tell

- Ergebnisse zeigen, nicht Kompetenz behaupten
- Code-Beispiele, Konfigurationen, Messwerte statt Behauptungen
- Vorher/Nachher-Vergleiche mit konkreten Daten
- Screenshots oder Diagramme wo sinnvoll

## Ehrlichkeit und Grenzen

- **Grenzen benennen** — was funktioniert NICHT, was ist noch ungelöst
- **Fehler und Sackgassen** gleichberechtigt neben Erfolgen dokumentieren
- **False Modesty vermeiden** — sachlich statt übertrieben bescheiden; keine Relativierungen wie „Natürlich bin ich kein Experte, aber…"

## Konkretheit

- **Zahlen statt Gefühle:** „3,2 Sekunden Build-Time" statt „deutlich schneller"
- **Versionen angeben:** „Hugo 0.159.1", „Ollama 0.6.2"
- **Konfigurationswerte:** Exakte Config-Zeilen, nicht „ein paar Einstellungen anpassen"
- **Stand-Datum:** „Stand April 2026" bei versionsspezifischen Aussagen
- **Dateipfade:** Vollständige Pfade wo relevant

## Textrhythmus und Pacing

- Kurze Sätze für technische Kernaussagen, längere für Kontext
- Absätze maximal 4–6 Sätze; keine Textwüsten — auflockern durch Code-Blöcke, Listen, Zwischenüberschriften
- Zwischenüberschriften tragen den roten Faden für Überflieger

## Wörter und Wendungen — Sperrliste

Niemals verwenden:
- „Zusammenfassend lässt sich sagen" (als Fazit-Einleitung)
- „In diesem Artikel zeige ich" (Floskel-Einstieg)
- „Wie bereits erwähnt" · „Selbstverständlich" · „Natürlich"
- „Einfach" (wenn etwas komplex ist)
- „Game-Changer", „Paradigmenwechsel", „Killer-Feature", „Best Practice" (ohne Kontext)
- Englische Buzzwords ohne Erklärung
- Kein Clickbait, keine Marketing-Sprache, keine Superlative über eigene Lösungen

## Sprache

- **Artikelsprache:** Deutsch
- **Korrekte Umlaute:** ä, ö, ü, ß — niemals ae, oe, ue, ss
- **Technische Begriffe:** Englisch beibehalten wenn etabliert (Repository, Deployment, Pipeline)
- **Fachbegriffe:** Beim ersten Auftreten kurz erklären, danach frei verwenden
- **Code-Kommentare:** Deutsch, sofern kein englischer Kommentar aus dem Originalprojekt zitiert wird
