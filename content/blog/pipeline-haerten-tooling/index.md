---
title: "Die Pipeline weiter härten — Context sparen, Loops stoppen, Geräte synchron halten"
date: 2026-07-06
draft: false
ai_notice: true
description: "Drei Änderungen an einer LLM-Agenten-Pipeline, die jede eine stille Fehlerquelle schließen: ein Recherche-Werkzeug, das den Hauptkontext nicht flutet (Faktor 58 Ersparnis über einen Subagenten), Loop-Konventionen nach dem Leitsatz 'A loop that cannot stop is a bug', und ein Sync, der zum Reflex statt zur vergessenen Aufgabe wird."
tags: ["claude-code", "agent", "subagent", "skill", "obsidian", "research-workflow", "loop-engineering", "karpathy-principles", "hardening"]
toc: true
featured_image: ""
---

Neue Fähigkeiten in eine Agenten-Pipeline zu bauen ist einfach — ein Skill hier, ein Tool dort. Schwer ist, sie einzubauen, ohne an anderer Stelle Fragilität einzuschleppen: einen aufgeblähten Kontext, einen Loop ohne Bremse, zwei Rechner, die leise auseinanderlaufen. Dieser Post beschreibt drei Änderungen an der Recherche-Pipeline des eigenen Obsidian-Vaults, die genau das im Blick hatten. Jede fügt Fähigkeit hinzu und schließt gleichzeitig eine Fehlerquelle, die erst über Zeit oder Skalierung sichtbar wird.

<!--more-->

{{< tldr >}}
Ein Multi-Source-Recherche-Skill (last30flames) wird in die Pipeline aufgenommen — aber ausschließlich über einen Subagenten, der 38k Token Rohmaterial zu einem 0,7k-Block verdichtet (Faktor ~58). Loop-Konventionen als globale Rule geben jeder Automatisierung explizite Stop-Bedingungen und ein Progress-Log. Und ein oft vergessener `task sync` wird zur festen Regel — vor der ersten und nach der letzten Task-Operation, auf jedem Rechner. Verbindendes Prinzip: Fähigkeit hinzufügen, ohne Robustheit zu verlieren.
{{< /tldr >}}

## Ausgangslage

Die Recherche-Pipeline, um die es geht, wurde in zwei früheren Posts beschrieben: [Vom Prototyp zur Pipeline](/blog/youtube-skill-evolution/) über die Skill-Evolution und [Research-Pipeline härten](/blog/research-pipeline-hardening/) über drei aus einem Hype-Repo destillierte Härtungs-Patterns. Kurz zusammengefasst: Skills wie `youtube-analyze` und `web-recherche` verwandeln externe Quellen in strukturierte Notizen; ein `wissen-manager`-Skill synthetisiert daraus kuratierte Wissens-Seiten nach dem [Karpathy-Wiki-Muster](/blog/obsidian-llm-wiki/); die Karpathy-Subagenten prüfen vor und nach jeder Aufgabe.

Der rote Faden dieses ganzen Aufbaus ist Andrej Karpathys zweites Prinzip — Simplicity First. Jede Erweiterung muss sich rechtfertigen, nicht nur beeindrucken. Genau an diesem Prinzip müssen sich auch die drei folgenden Änderungen messen lassen.

## Der Auslöser: Loop Engineering als Hype-Thema

Anlass war eine Recherche-Runde zu „Loop Engineering" — der Idee, LLM-Agenten in selbstkorrigierende Schleifen zu verpacken. Drei schriftliche Quellen landeten im Audit: ein Firecrawl-Blogpost, das Repo `firecrawl/last30flames` und ein Teaching-Repo `invincible04/awesome-loop-engineering` samt Cheatsheet.

Das Muster war dasselbe wie beim Vorgänger-Post: Der Großteil des Materials beschrieb Dinge, die im eigenen Setup längst existierten — Cron-Jobs, Maker/Checker-Schleifen über die Karpathy-Reviewer, Git-Worktrees, eine geschlossene Vergabe-Pipeline. Elfteilige „Loop-Contracts" und Token-Ökonomie-Tuning waren Overkill. Aber drei Dinge blieben nach dem Cherry-Pick übrig — und ein Werkzeug, das zunächst verworfen und dann doch aufgenommen wurde, als sich die Kostenlage änderte.

## Härtung 1: Ein Recherche-Werkzeug, das den Hauptkontext nicht flutet

`last30flames` beantwortet eine sehr konkrete Frage: „Was ist in den letzten *N* Tagen zu Thema *X* passiert?" Ein Lauf fragt fünf Kanäle parallel ab — Firecrawl-Websuche mit Volltexten, Hacker News, Lobste.rs, Bluesky und GitHub — und liefert nummerierte, zitierfähige Quellen mit Zeitfenster-Filter:

```bash
bash ~/.claude/skills/last30flames/scripts/run.sh "Claude Code" --days 14 > /tmp/l30f-report.md
wc -c /tmp/l30f-report.md   # → ~152 kB
```

Das ist ideal für die Veraltungs-Fact-Checks der Wissens-Seiten: Für Themen mit kurzer Halbwertszeit (IT-Sicherheit, LLM-Modelle, KI-Tools) muss regelmäßig geprüft werden, ob eine synthetisierte Seite noch stimmt. Statt fünf bis fünfzehn einzelner Websuchen liefert *ein* Lauf das komplette Zeitfenster.

### Das Problem: 38.000 Token Rohmaterial

Genau hier liegt aber die Falle. Ein Report mit 25 Quellen wiegt rund 152 kB — etwa **38.000 Token**. Würde dieser Output direkt im Hauptkontext des Agenten landen, wäre ein einziger Fact-Check teurer als die gesamte restliche Sitzung. Ein Werkzeug, das den Kontext flutet, ist kein nützliches Werkzeug, sondern eine Zeitbombe.

### Die Lösung: Verdichtung im Subagenten

Der Trick ist, den Lauf **nie im Hauptloop** stattfinden zu lassen. Stattdessen übernimmt ein Subagent die Arbeit: Er startet `run.sh`, leitet den Report in eine Datei, liest ihn dort selektiv und gibt an den Hauptagenten nur einen verdichteten Nachträge-Block zurück — die Abweichungen zur bestehenden Wissens-Seite, datiert und mit Quellen-Nummern belegt.

Der gemessene Effekt (05.07.2026, Testthema `Claude Code`):

| | Token im Hauptkontext |
|---|---|
| Report direkt gelesen | ~38.100 |
| Verdichteter Block aus dem Subagenten | ~650 |
| **Faktor** | **~58** |

Die 38k Token entstehen weiterhin — aber im isolierten Kontext des Subagenten, der nach getaner Arbeit verschwindet. Der Hauptagent sieht nur das Destillat. Vier gezielte Tool-Calls statt fünfzehn tastender Suchrunden.

Diese Regel steht jetzt als harte Vorgabe im `wissen-manager`-Skill:

```markdown
**Context-Regel:** Den last30flames-Lauf NIE im Hauptloop ausführen
(Roh-Output ~30–40k Tokens) — immer im Agent, der nur den verdichteten
Nachträge-Block zurückgibt (gemessen: 38k → ~0,7k Tokens, Faktor ~58).
```

### Der Realismus-Check: nicht kostenlos

Beim Verankern der Integration warnte der `karpathy-reviewer` zu Recht vor einem Trugschluss: Das Werkzeug läuft *nicht* umsonst. Der Web-Kanal nutzt die eingeloggte Firecrawl-CLI und verbraucht Credits des bezahlten Plans — gemessen etwa **sechs Credits pro Lauf** bei 25 Quellen (Plan: 5.000/Monat). Für Einzelläufe unkritisch, aber der Guardrail ist explizit: keine Batch-Schleifen über viele Themen ohne Rücksprache. Sonst würde das automatische „Smart Upgrade" bei Credit-Erschöpfung stillschweigend auf die nächste Kostenstufe hochstufen. Eine Fähigkeit ehrlich zu dokumentieren heißt auch, ihren Preis zu nennen.

## Härtung 2: Loops, die anhalten können

Der Leitsatz des Loop-Engineering-Materials, der hängenblieb, war schlicht:

> A loop that cannot stop is a bug.

Im eigenen Setup laufen genug Automatisierungen — Cron-Routinen, geplante Läufe, Pipeline-Skills —, dass ein durchgehender Loop kein hypothetisches Risiko ist. Die Lücke war nicht das *Bauen* solcher Loops, sondern dass ihre Abbruchbedingungen nirgends explizit standen. Also wurde daraus eine globale Rule (`~/.claude/rules/loop-conventions.md`), die in jeder Claude-Code-Sitzung gilt. Drei Teile.

**Erstens ein Eignungs-Test, bevor überhaupt ein Loop entsteht.** Automatisiert wird nur, was alle drei Kriterien erfüllt:

- **repetitiv** — häufig genug, dass sich die Design-Kosten lohnen,
- **reviewbar** — ein klares Erfolgskriterium bzw. ein Exit-Code ist definierbar,
- **wertvoll** — der Output rechtfertigt die Token-Kosten.

Fehlt eines, bleibt die Arbeit manuell. Das ist Simplicity First, auf Automatisierung angewandt: Der teuerste Loop ist der, den man nie hätte bauen sollen.

**Zweitens die Stop-Bedingungen nach einem festen Vierer-Schema.** Jeder Loop muss vor Inbetriebnahme benennen, wann er anhält:

- **goal met** — ein Verifier bestätigt das Done-Kriterium,
- **budget spent** — Iterations-, Token- oder Zeit-Limit erreicht,
- **stalled** — derselbe Fehler zweimal ohne neue Evidenz → anhalten und melden, nicht weiterprobieren,
- **needs a human** — bei Hochrisiko oder Mehrdeutigkeit eskalieren statt raten.

Vor allem die dritte Bedingung ist wertvoll: Ein Agent, der denselben Fehler zum fünften Mal mit derselben Strategie angeht, verbrennt nur Tokens. „Gleicher Fehler zweimal" ist ein hartes, überprüfbares Abbruchsignal.

**Drittens ein Progress-Log.** Jeder wiederkehrende Lauf hinterlässt einen kurzen `done/next`-Eintrag in einem persistenten Log. Ausbleibende Einträge werden damit selbst zum Watchdog-Signal — ein stiller Loop fällt auf, weil sein Log stehenbleibt.

Bemerkenswert an dieser Härtung ist, was *nicht* hineinkam. Der erste Entwurf enthielt einen Maker/Checker-Abschnitt — bis der Reviewer feststellte, dass genau das bereits durch das bestehende Karpathy-Prinzip 5 (Self-Review) abgedeckt ist. Der Abschnitt flog wieder raus. Eine Regel gegen Scope-Creep sollte selbst keinen Scope-Creep enthalten.

## Härtung 3: Sync als Reflex, nicht als Aufgabe

Die dritte Änderung ist die unspektakulärste und war doch die mit dem größten stillen Schadenspotenzial. Das Task-Management (Taskwarrior) läuft auf zwei Rechnern — MacBook und Linux-Desktop —, die über einen selbst gehosteten Sync-Server abgeglichen werden. Die Diagnose ergab: Das Setup war kerngesund. Identische Schlüssel, Server erreichbar, beide Seiten meldeten „Success!", keine Duplikate.

Das Problem war kein technisches, sondern ein Verhaltensproblem: Es gab keine Automatik. `task sync` wurde nur ausgeführt, wenn jemand daran dachte — und bis dahin drifteten die Geräte leise auseinander. Genau die Art Fehler, die sich erst zeigt, wenn man auf dem einen Rechner eine Aufgabe abhakt, die auf dem anderen noch offen steht.

Die Lösung ist eine Verhaltensregel, kein Code — verankert als Core Rule im Taskwarrior-Skill:

> Run `task sync` BEFORE the first `task` command of a session (pull remote state)
> and AFTER the last modifying `task` command (push local changes). This applies on
> every machine. A read-only session needs only the initial sync. Sync failures are
> worth reporting — but never block the actual task work on a failed sync.

Zwei Feinheiten stecken darin. Eine reine Lese-Sitzung braucht nur den initialen Sync — kein Push, wenn nichts geändert wurde. Und ein *gescheiterter* Sync (etwa weil der Server offline ist) wird gemeldet, blockiert aber nie die eigentliche Arbeit. Robustheit heißt hier: die Regel darf selbst kein neuer Single Point of Failure werden.

## Was die drei verbindet

Auf den ersten Blick sind das drei unzusammenhängende Änderungen — ein Recherche-Tool, eine Loop-Regel, eine Sync-Gewohnheit. Der gemeinsame Nenner ist das Failure-Mode-Denken: Jede schließt eine Fehlerquelle, die nicht sofort weh tut, sondern erst über Zeit oder Skalierung.

- Das ungebremste Werkzeug flutet den Kontext — sichtbar erst beim zehnten Fact-Check.
- Der Loop ohne Stop-Bedingung läuft durch — sichtbar erst, wenn er es tut.
- Der manuelle Sync driftet — sichtbar erst, wenn zwei Geräte widersprechen.

Das ist die eigentliche Lektion aus dem Loop-Engineering-Hype, nachdem man die zwanzig überflüssigen Ideen weggeschnitten hat: Eine Pipeline härtet man nicht, indem man ihr mehr Features gibt, sondern indem man bei jedem neuen Feature fragt, welche stille Fehlerquelle es mitbringt — und diese im selben Zug schließt. Karpathys Simplicity First ist dabei kein Verzicht, sondern ein Filter: Er lässt genau die drei Dinge durch, die ihren Platz verdienen.
