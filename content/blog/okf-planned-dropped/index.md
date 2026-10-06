---
title: "Hundert Prozent"
date: 2026-09-11
draft: false
description: "Am 11.08. beschlossen, am 11.09. gestrichen: mein Obsidian-Vault sollte aufs Open Knowledge Format umziehen. Was OKF ist und was vom Plan übrig bleibt."
tags: ["obsidian", "open-knowledge-format", "wissensmanagement", "claude-code", "hermes-agent", "erfahrungsbericht"]
featured_image: ""
toc: true
---

Vor einem Monat habe ich beschlossen, meinen Obsidian-Vault vollständig auf das Open Knowledge Format umzustellen. Hundert Prozent Konformität, sechs messbare Kriterien, ein Plan mit sieben Phasen. Heute habe ich die Umstellung gestrichen — umgestellt wurde in der Zwischenzeit keine einzige Notiz.

<!--more-->

## Was OKF ist

Das Open Knowledge Format, kurz OKF, ist eine offene Spezifikation von Google Cloud. Die erste Fassung v0.1 erschien am 12.06.2026, aktuell ist v0.2 (Stand September 2026). Im [Ankündigungstext](https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing) heißt es, OKF sei „an open specification that formalizes the LLM-wiki pattern into a portable, interoperable format“.

Das LLM-Wiki-Muster ist die Idee von Andrej Karpathy, über die ich im April [schon geschrieben habe](/blog/obsidian-llm-wiki/): Wissen liegt als Ordner voller Markdown-Dateien vor, und ein Sprachmodell pflegt ihn. OKF macht daraus ein Austauschformat. Ein Wiki, das der eine Agent geschrieben hat, soll der andere lesen können, ohne dass jemand dazwischen übersetzt.

Die [Spezifikation](https://github.com/GoogleCloudPlatform/open-knowledge-format/blob/main/SPEC.md) ist dabei erstaunlich bescheiden. Ihr eigener Satz dazu: „If you can `cat` a file, you can read OKF; if you can `git clone` a repo, you can ship it.“ Ein Bundle — so heißt ein OKF-Verzeichnis — sieht so aus:

```text
bundle/
  index.md          (optional, Verzeichnislisting)
  log.md            (optional, Änderungshistorie)
  <concept>.md      (Konzeptdokumente)
  <subdir>/         (beliebig verschachtelt)
```

Zwei Dateinamen sind reserviert, `index.md` und `log.md`. Jede andere Datei braucht YAML-Frontmatter, und darin ist genau ein Feld Pflicht: `type`. Empfohlen sind `title`, `description`, `resource` und `tags`. Alles Weitere ist freiwillig, und ein Leseprogramm darf ein Bundle nicht ablehnen, bloß weil optionale Felder fehlen, ein `type` unbekannt ist oder ein Link ins Leere zeigt.

Interessant wird es bei den freiwilligen Feldern, die mit v0.2 dazukamen:

```yaml
type: Playbook
title: Beispielkonzept
sources:
  - id: quelle-1
    resource: https://example.org/dokument
generated: { by: reference_agent/gemini-2.5-pro, at: 2026-08-11T13:10:00Z }
verified:
  - { by: "human:hans", at: 2026-08-11T14:02:00Z }
status: stable
```

Aus `verified` leitet ein Leseprogramm drei Vertrauensstufen ab. Fehlt das Feld, gilt die Seite als ungeprüft. Steht dort nur ein Agent oder ein Prozess, ist sie maschinell bestätigt. Steht dort ein Eintrag mit dem Präfix `human:`, hat ein Mensch sie gelesen. Die Frage, ob eine Seite jemals jemand geprüft hat, lässt sich damit beantworten, ohne die Seite zu öffnen — das ist der Teil der Spezifikation, der mir am besten gefällt.

Man sieht dem Format an, wo es herkommt. Die Beispieltypen heißen `BigQuery Table`, `API Endpoint` und `Metric`, und mit `Attested Computation` gibt es einen eigenen Typ für nachweisbare Berechnungen auf Datenplattformen. Gedacht ist OKF für das, was in Firmen über Tabellen, Kennzahlen und Schnittstellen aufgeschrieben wird. Ein privates Notizbuch ist nicht der Hauptfall, ausgeschlossen ist es aber auch nicht.

## Schon konform, ohne es zu wissen

Auf OKF gestoßen bin ich über eine meiner eigenen Recherche-Notizen. Darin stand die Behauptung, Google habe aus Karpathys Muster einen Standard gemacht. In der Nacht zum 09.08. hat Claude Code das an der Spezifikation geprüft: Es stimmt.

Der Befund danach war schmeichelhaft. Mein Vault erfüllt die Mindestanforderung von OKF bereits, ohne dass ich einen Finger gerührt hätte. `type` ist bei mir seit jeher Pflichtfeld, eine `INDEX.md` gibt es, ein Recherche-Log auch. Absicht war das nicht. Beide Systeme stammen aus demselben Muster und sind bei derselben Minimalstruktur gelandet.

Die erste Empfehlung von Claude Code lautete trotzdem: nicht umstellen, höchstens die Vertrauensfelder übernehmen. Begründung war, dass der Verzicht auf Wiki-Links den Graphen in Obsidian koste. Das war falsch. Obsidian kann Markdown-Links von Haus aus, mit Graph, Backlinks und automatischem Nachziehen; der Schalter heißt `useMarkdownLinks`. Achtzehn Minuten später stand die Korrektur in der Notiz, und mit ihr war das Hauptargument gegen die Umstellung weg.

Bei der Gelegenheit wurde auch der Umfang gemessen statt geschätzt: 1.945 Markdown-Dateien, 14.034 Wiki-Links, 778 Dateinamen mit Leerzeichen oder Umlauten. Und in die Aufgabe für die vertiefte Recherche kam eine Leitfrage, die im Protokoll als die Frage geführt wird, an der alles hängt:

> Liest überhaupt ein Agent OKF?

Ich bitte, sich diese Frage zu merken.

## Der Plan

Am 11.08. habe ich die Umstellung beschlossen. Der Plan war von Claude Code zuerst als Abwägung formuliert — „Kür, kein Muss“ — und musste an fünf Stellen umgeschrieben werden, weil ich keine Abwägung wollte. Ich wollte hundert Prozent, in sechs Zahlen, jede einzeln prüfbar:

| Nr. | Kriterium | Soll |
|---|---|---|
| 1 | Jede Notiz hat parsebares YAML-Frontmatter | 100 % |
| 2 | Jede davon hat ein nicht-leeres `type` | 100 % |
| 3 | Die reservierten Dateien heißen `index.md` und `log.md` | erfüllt |
| 4 | Wiki-Links außerhalb von Code-Blöcken | 0 |
| 5 | Dateinamen mit Leerzeichen, Umlaut oder `ß` | 0 |
| 6 | Jede Notiz trägt `title` | 100 % |

Die ersten beiden Zeilen verlangt OKF. Die übrigen vier waren meine Folgeentscheidungen, und in ihnen steckte die ganze Arbeit. Der Bestand war an diesem Tag auf 1.960 Dateien und 14.172 Wiki-Links gewachsen, 788 Dateinamen enthielten Leerzeichen oder Umlaute, und ein `title` trugen 46 Notizen.

Der Grund für Zeile 5 ist ein hässliches Detail. Aus einem Wiki-Link wird ein Markdown-Link mit Pfad, und ein Pfad mit Leerzeichen wird kodiert:

```diff
- [[Referenz Ghostty]]
+ [Referenz Ghostty](/Notes/Computer/Software/Referenz%20Ghostty.md)
```

Gerendert sieht man das nicht. Im Rohtext schon, und der Rohtext ist genau das, was ein Agent liest. Also sollten die Dateinamen auf ASCII mit Unterstrich wechseln, Umlaute zu `ae`, `oe`, `ue` umgeschrieben, und der lesbare Name ins Feld `title` umziehen. Die Regel, dass in meinem Vault auch Dateinamen Umlaute tragen, habe ich am selben Nachmittag aus drei Anweisungsdateien entfernen lassen.

Der Rest des Plans war sorgfältiger, als es die Sache am Ende wert war. Phase 0 bis 6, jede mit eigener Verifikation. Die Umbenennung zwingend vor dem Link-Umbau, weil Obsidian Verweise nur so lange selbst nachzieht, wie sie noch Wiki-Links sind — danach wäre dieselbe Umbenennung Handarbeit an 14.172 Stellen gewesen. Ein Git-Commit als Rücksprungpunkt. Verzeichnisweise vorgehen, Code-Blöcke ausnehmen, mehrdeutige Linkziele sammeln und vorlegen, niemals raten.

Für die Anzeige der Titel habe ich das Plugin Front Matter Title in Version 4.1.1 installiert. Es zeigt in Explorer, Suche und Graph den Wert von `title` statt des Dateinamens und fällt auf den Dateinamen zurück, wenn das Feld fehlt. Bei 46 von 1.960 Notizen mit `title` hat sich an der Anzeige also erst einmal wenig geändert. Für Dataview ist keine Unterstützung dokumentiert; meine Tabellen hätten nach der Umstellung Dateinamen mit Unterstrichen gezeigt.

Das war übrigens derselbe 11.08., an dem ich wenige Stunden später bei einem anderen Projekt [den halben Prozess abgeschafft habe](/blog/denkzettel-prozess-rueckbau/), weil er mehr Papier als Programm erzeugte.

Ich habe den Zusammenhang an dem Tag nicht gesehen.

## Was tatsächlich gebaut wurde

Gebaut wurde in dem Monat genau eine Sache, und die hat mit OKF nur am Rand zu tun.

Am Vormittag des 11.08. hatte Claude Code eine meiner Notizen überarbeitet, die Referenz zum Terminal Ghostty: entrümpelt, neu gegliedert, Veraltetes datiert. Daraus wurde eine Regel für alle Notizen unter `Notes/` und `Wissen/`, der Struktur-Check. Er hat zwei Stufen. Die erste ist formal — parsebares Frontmatter mit `type`, Pflichtfelder, Tags, Reihenfolge der Standard-Abschnitte. Die zweite verlangt ein Urteil: Hat die Notiz eine Einleitung? Trägt jede veränderliche Aussage ein Stand-Datum? Steht derselbe Inhalt schon anderswo?

Am frühen Nachmittag war der Check als Skill verankert. Sieben Minuten später lag das Urteil eines Prüf-Agenten vor, der fertige Arbeit in frischem Kontext gegenliest: durchgefallen, neun Befunde. Der ernste davon: Die Prüfliste führte `fact_check_date` als Pflichtfeld. Tatsächlich ist das Feld optional, und nur 25 von 59 Wissen-Seiten tragen es. Der Check hätte bei den übrigen ein Datum eingetragen, für eine Prüfung, die nie stattgefunden hat. Seitdem steht in der Prüfliste, dass ein fehlender Wert gemeldet und nicht ergänzt wird.

Neun Minuten danach wanderte der Check aus dem Skill in einen eigenen Agenten namens `vault-notiz-struktur`. Der bekommt einen Dateipfad, liest die Notiz ohne Kenntnis des Gesprächs, aus dem die Änderung stammt, und entscheidet selbst, was er repariert. Eine Viertelstunde vorher hatte ich noch festgelegt, dass Strukturelles nur vorgeschlagen wird. Das habe ich damit umgekehrt.

Testen ließ sich der Agent zunächst nicht:

```text
Agent type 'vault-notiz-struktur' not found
```

Claude Code liest die Agentenliste beim Start einer Sitzung ein. Der erste echte Lauf kam eine Viertelstunde später in einer neuen Sitzung, passenderweise an der Notiz über das Open Knowledge Format. Der Agent nahm zwei Änderungen vor, meldete vier Befunde als bewusst nicht umgesetzt und erfand kein Prüfdatum. Einen Fehler hatte er trotzdem: Er änderte die Notiz und ließ das Feld `updated` auf dem alten Stand. Die Regel dazu steht jetzt in seiner Definition.

Am nächsten Morgen stellte sich heraus, dass der Agent nur auf einem meiner beiden Rechner lag. Auf Europa scheiterte der Aufruf still mit derselben Meldung wie oben, und der Check entfiel, ohne dass es jemand bemerkt hätte. Die Datei liegt außerhalb des synchronisierten Ordners und musste von Hand hinüber.

Seitdem läuft der Struktur-Check nach jeder größeren Änderung an einer Notiz. Mit OKF verbindet ihn noch ein einziger Satz in der Prüfliste: keine OKF-Felder schreiben, die führt der Vault nicht.

## Vier Wochen überfällig

Die vertiefte Recherche war am 13.08. fällig, die Umstellung am 16.08. Beide Aufgaben wurden an diesen Tagen überfällig und blieben es. Im Plan steht bis heute kein Commit-Hash und keine Baseline. Phase 1 hat nie angefangen.

Das Einzige, was in der Zeit dazukam, waren zwei Praxisberichte anderer Leute, die ich am 22.08. in die Notiz habe einarbeiten lassen. Sie waren nicht ermutigend. Obsidian unterstützt OKF nicht von sich aus, und in beiden Berichten trägt jedes Unterverzeichnis eine eigene `index.md`, die im Graphen als zusätzlicher Knoten auftaucht. Das mitgelieferte Werkzeug von Google wandelt nur BigQuery-Daten um; wer keine hat, baut sich den Konverter selbst. Und nach der Umstellung musste einer der Berichtenden seinem Claude Code die neue Struktur erst in der `CLAUDE.md` erklären, weil das Modell sonst weiter per Volltextsuche durch die Dateien ging.

Das Format ist da, und die Agenten wissen noch nichts davon. Man hätte stutzig werden können.

## Die Frage vom ersten Tag

Heute habe ich angefangen, die Rollen meiner Hermes-Profile neu zu ordnen. Hermes Agent von Nous Research läuft bei mir neben Claude Code und soll den Vault künftig mitpflegen. Dafür musste zum ersten Mal jemand nachsehen, was Hermes mit OKF anfangen kann.

Nichts.

Die Anbindung an den mitgelieferten Hermes-Skill `llm-wiki` liegt als [Pull Request](https://github.com/NousResearch/hermes-agent/pull/48267) vor, offen seit dem 18.06.2026. Der Skill selbst weicht in vier Punkten von OKF ab: Seine `SCHEMA.md` hat kein Frontmatter, seine Rohquellen tragen kein `type`, sein Protokoll hat ein anderes Format — und er schreibt `[[Wikilinks]]`, die OKF nicht kennt. Die Sammlung Awesome-OKF führt 29 Einträge, die meisten davon Konverter.

Der Agent, für den ich 14.172 Links umschreiben wollte, schreibt also selbst Wiki-Links. Damit war die Frage vom 09.08. beantwortet, einen Monat und zwei Tage, nachdem sie gestellt wurde. Sie stand die ganze Zeit in der Aufgabe, die ich vor der Umstellung erledigen wollte. Beschlossen habe ich trotzdem zuerst.

Die Umstellung ist verworfen. Die beiden Aufgaben sind gelöscht, der Plan bleibt mit dem Vermerk „verworfen“ als Unterlage im Vault stehen. Die ASCII-Regel für Dateinamen ist mit aufgehoben: Meine Notizen behalten Leerzeichen und Umlaute, und der Passus, den ich vor einem Monat aus drei Dateien entfernen ließ, gilt wieder.

## Was übrig bleibt

Gegen OKF spricht das alles nicht. Die Spezifikation hält, was sie zusagt: Sie ist klein, lesbar und verlangt fast nichts. Was fehlt, ist auf meiner Seite der Leser. Claude Code liest meinen Vault so, wie er ist, Hermes würde ihn nach der Umstellung nicht besser lesen als vorher, und ein Format, das zwischen zwei Agenten vermitteln soll, braucht mindestens einen, der es spricht.

Drei Dinge nehme ich mit.

1. **Die Frage, an der alles hängt, gehört vor den Beschluss.** Sie war aufgeschrieben, terminiert und als Vorbedingung markiert. Ich habe trotzdem erst entschieden und dann einen Monat nicht nachgesehen.
2. **Hundert Prozent von etwas, das schon erfüllt ist, kostet am meisten.** Die Mindestkonformität hatte ich geschenkt bekommen. Alles, was der Plan darüber hinaus verlangte, waren meine eigenen Zusatzbedingungen, und keine davon stand in der Spezifikation als Pflicht.
3. **Das Nebenprodukt war das Produkt.** Der Struktur-Check ist an einem Mittag entstanden, läuft seither nach Änderungen an meinen Notizen und hat heute an der OKF-Notiz selbst drei Formulierungen nachgezogen, die noch von der Umstellung sprachen.

Offen bleibt die Vertrauensfamilie. `generated` und `verified` mit der Kennung `human:` würden auch ohne den Rest von OKF unterscheiden, welche Seite ein Agent geschrieben und welche ein Mensch gelesen hat. Ob ich sie einführe, entscheidet sich, wenn das Wiki für Hermes neu geordnet wird.

Diesmal sehe ich vorher nach, wer es liest …
