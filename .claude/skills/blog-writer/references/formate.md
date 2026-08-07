# Format-Templates — hnsstrk.de Blog

Diese Datei definiert die verfügbaren Blog-Formate mit Struktur, Anwendungshinweisen und Einstiegen.

---

## Longread / Deep Dive

**Wann passt es?** Komplexe Themen, die Kontext, Tiefgang und Code erfordern. Architekturentscheidungen, Systemdesign, umfangreiche Projekte.

**Wortanzahl:** 2.000–4.000 Wörter

**Pflicht:** TL;DR-Shortcode, Inhaltsverzeichnis (`toc: true`)

**Struktur:**
1. **Einstieg** — Problem oder Kontext, der Relevanz herstellt (3–5 Sätze, kein "In diesem Artikel")
2. **TL;DR** — `{{</* tldr */>}}` mit 2–4 Sätzen Kernaussage
3. **Kontext / Hintergrund** — Warum ist das Thema relevant? Was ist der Stand?
4. **Lösungsraum** — Welche Ansätze gibt es? Kurze Einordnung der Alternativen
5. **Tiefgang** — Detaillierte Beschreibung des gewählten Ansatzes mit Code
6. **Praxis** — Konkrete Code-Beispiele, Konfigurationen, Messwerte
7. **Was nicht funktioniert hat** — Sackgassen, Fehler, Grenzen
8. **Schluss** — offen nach Register Prosa: Ausblick, offene Frage oder Einladung (keine Zusammenfassung)

**Typische Einstiege:**
- **Problem-Hook:** "Wer mehr als 50 RSS-Feeds abonniert hat, kennt das Problem…"
- **Kontrast-Hook:** "Static Site Generators gibt es dutzende. Trotzdem…"
- **Zahlen-Hook:** "625 Tests, 8 Pipeline-Stufen, 1,7 Sekunden pro Artikel."

---

## Tutorial / How-To

**Wann passt es?** Schritt-für-Schritt-Anleitungen für konkrete technische Aufgaben.

**Wortanzahl:** 1.000–2.500 Wörter

**Pflicht:** Code-Beispiele mit Sprachangabe, erwartete Ergebnisse nach jedem Schritt

**Struktur:**
1. **Einstieg** — Was wird erreicht? (1–2 Sätze)
2. **Voraussetzungen** — Software, Versionen, Vorkenntnisse (als Liste)
3. **Ziel** — Konkretes Endergebnis (idealerweise mit Screenshot/Output)
4. **Schritte** — Nummeriert, je Schritt: Was tun + warum + erwartetes Ergebnis
5. **Verifizierung** — Wie prüft man, ob alles funktioniert?
6. **Fehlerbehandlung** — Häufige Probleme und Lösungen
7. **Weiterführendes** — Links, Alternativen, nächste Schritte

**Typische Einstiege:**
- **Ziel-Hook:** "Hugo auf einem Contabo-Server mit automatischem Deployment — in 15 Minuten."
- **Problem-Hook:** "Die offizielle Dokumentation beschreibt zwar die Grundkonfiguration, aber…"

**Besondere Regeln:**
- Jeder Code-Block hat eine Sprachangabe
- Nach jedem Schritt: erwartete Ausgabe oder erwarteter Zustand
- `{{</* callout type="warning" */>}}` für Stolpersteine
- `{{</* callout type="tip" */>}}` für zeitsparende Alternativen
- Diff-Blöcke (```diff) für Konfigurationsänderungen

---

## Erfahrungsbericht / Lessons Learned

**Wann passt es?** Rückblick auf ein Projekt, einen Prozess oder eine Entscheidung. Fokus auf Erkenntnisse.

**Wortanzahl:** 1.500–3.000 Wörter

**Struktur:**
1. **Einstieg** — Ausgangssituation und Motivation
2. **Ansatz** — Was wurde versucht? Welche Überlegungen standen dahinter?
3. **Komplikationen** — Was lief schief? Unerwartete Hürden
4. **Erkenntnisse** — Nummerierte Liste der wichtigsten Lessons
5. **Einordnung** — Was würde man anders machen? Was hat sich bewährt?

**Typische Einstiege:**
- **Kontext-Hook:** "Nach sechs Monaten mit lokalen LLMs lassen sich ein paar Muster erkennen."
- **Problem-Hook:** "Die Migration von WordPress zu Hugo klang einfacher als sie war."

**Besondere Regeln:**
- Fehler und Sackgassen sind gleichwertiger Content — nicht verstecken
- Konkrete Zahlen: Zeitaufwand, Iterationen, Kosten
- Keine Nachher-Rationalisierung: wenn etwas aus dem falschen Grund funktioniert hat, das benennen

---

## Vergleichsartikel

**Wann passt es?** Zwei oder mehr Tools, Ansätze oder Technologien gegenüberstellen.

**Wortanzahl:** 1.500–3.000 Wörter

**Struktur:**
1. **Einstieg** — Warum der Vergleich? Welches Problem wird gelöst?
2. **Kriterien** — Klare, vorab definierte Vergleichsdimensionen (als Tabelle)
3. **Tool/Ansatz A** — Stärken + Schwächen + Code-Beispiel
4. **Tool/Ansatz B** — Stärken + Schwächen + Code-Beispiel (gleiche Länge wie A!)
5. **(Optional) Tool/Ansatz C**
6. **Vergleichstabelle** — Übersicht aller Kriterien
7. **"Wann welches?"** — Empfehlung nach Anwendungsfall, nicht pauschal

**Typische Einstiege:**
- **Auswahl-Hook:** "Wer einen Static Site Generator sucht, stößt schnell auf Hugo und Jekyll."
- **Kontrast-Hook:** "Electron und Tauri lösen das gleiche Problem — aber grundverschieden."

**Besondere Regeln:**
- Jedes Tool bekommt GLEICH viel Platz — keine Bevorzugung
- Stärken UND Schwächen für jedes Tool
- Keine Pauschaussagen ("X ist besser") — immer mit Kontext ("Für Y ist X besser geeignet, weil…")
- Mermaid-Diagramme für Architekturvergleiche

---

## Problemlösungsartikel

**Wann passt es?** Ein konkretes technisches Problem mit Lösung dokumentieren. SEO-relevant für Fehlermeldungen.

**Wortanzahl:** 800–1.500 Wörter

**Struktur:**
1. **Problem** — Fehlermeldung (als Code-Block), Kontext, wann es auftritt
2. **Ursache** — Warum passiert das? Technische Erklärung
3. **Lösung** — Schritt-für-Schritt mit Code
4. **Verifizierung** — Wie prüft man, dass es gelöst ist?
5. **Alternativen** — Andere Lösungswege, falls vorhanden
6. **Hintergrund** — (Optional) Tiefere technische Einordnung

**Typische Einstiege:**
- **Fehlermeldung-Hook:** Die Fehlermeldung direkt als Code-Block, dann Kontext
- **Situation-Hook:** "Nach dem Update auf macOS Tahoe verweigert die App den LAN-Zugriff."

**Besondere Regeln:**
- Fehlermeldung IMMER als Code-Block — SEO-relevant, copy-paste-fähig
- Versionen und OS angeben: "macOS 15.1, Ollama 0.6.2"
- `{{</* callout type="warning" */>}}` für Nebeneffekte der Lösung
- Diff-Blöcke für Konfigurationsänderungen

---

## Build Log

**Wann passt es?** Dokumentation eines laufenden oder abgeschlossenen Bauprojekts (Software, Hardware, Infrastruktur).

**Wortanzahl:** 1.500–3.500 Wörter

**Struktur:**
1. **Motivation** — Warum wurde das gebaut? Welches Problem wird gelöst?
2. **Architektur** — Überblick mit Mermaid-Diagramm
3. **Technologie-Entscheidungen** — Was wurde gewählt und warum (kurz, tabellarisch)
4. **Implementierung** — Chronologisch oder nach Komponente, mit Code
5. **Was schiefging** — Sackgassen, Bugs, unerwartete Probleme
6. **Aktueller Stand** — Was funktioniert, was fehlt noch
7. **Nächste Schritte** — (Optional) Geplante Erweiterungen

**Typische Einstiege:**
- **Motivation-Hook:** "Das klassische RSS-Problem ist bekannt: zu viele Quellen, zu wenig Zeit."
- **Architektur-Hook:** "Rust-Backend, Svelte-Frontend, SQLite mit Vektorsuch — die Entscheidung fiel nicht sofort."

**Besondere Regeln:**
- Mermaid-Diagramm für Architekturüberblick ist Pflicht
- Technologie-Entscheidungen als Tabelle: Komponente | Technologie | Begründung
- "Was schiefging" ist eine PFLICHT-Sektion — kein Build Log ohne Probleme

---

## Hooks und Einstiege — allgemein

Jeder Artikel beginnt mit einem **Hook** — einem Einstieg, der Relevanz herstellt. NIEMALS mit "In diesem Artikel…" beginnen.

| Hook-Typ | Beschreibung | Beispiel |
|----------|-------------|---------|
| **Problem-Hook** | Beschreibt ein bekanntes Problem | "Wer mehr als 50 Feeds abonniert hat…" |
| **Kontext-Hook** | Setzt historischen/technischen Rahmen | "Static Site Generators gibt es seit 2008…" |
| **Kontrast-Hook** | Stellt Gegensatz oder Überraschung her | "Electron und Tauri lösen das gleiche Problem — aber…" |
| **Zahlen-Hook** | Startet mit konkreten Daten | "625 Tests, 8 Pipeline-Stufen, 1,7 Sekunden." |
| **Situation-Hook** | Beschreibt eine konkrete Situation | "Nach dem Update auf macOS Tahoe…" |

---

## Schluss-Varianten (offener Schluss nach Register Prosa)

Der Schluss ist offen — keine Zusammenfassung, kein förmliches Fazit. Leser, die bis hierhin gelesen haben, brauchen keine Wiederholung.

| Schluss-Typ | Beschreibung | Passt zu |
|-----------|-------------|----------|
| **Vorwärtsblickend** | Was kommt als Nächstes? Offene Fragen | Build Log, Longread |
| **Abwägend** | Stärken und Schwächen einordnen | Vergleich, Erfahrungsbericht |
| **Einladend** | Leser zu eigenem Experimentieren ermutigen | Tutorial, How-To |
| **Einordnend** | Ergebnisse in größeren Kontext stellen | Longread, Erfahrungsbericht |

**Verbotene Schluss-Einstiege:**
- "Zusammenfassend lässt sich sagen…"
- "In diesem Artikel haben wir gesehen…"
- "Abschließend möchte ich festhalten…"

**Erlaubte Schluss-Einstiege:**
- "Die Frage, ob X sinnvoll ist, hängt davon ab…"
- "Offen bleibt, wie sich X bei Y verhält."
- "Wer X in Betracht zieht, sollte Z bedenken."
- "Der aktuelle Stand zeigt, dass…"
