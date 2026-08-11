---
title: "Papierkrieg"
date: 2026-08-11
draft: false
description: "Mein Agenten-Team hat in einem Sprint 1.986 Zeilen Code geschrieben und 19.538 Zeilen Berichte darüber. Also habe ich den halben Prozess abgeschafft — und dabei gelernt, dass ein Force-Push auf GitHub gar nichts löscht."
tags: ["denkzettel", "claude-code", "agent-team", "scrum", "git", "prozess"]
featured_image: ""
---

Vor fünf Tagen habe ich hier [über Denkzettel geschrieben](/blog/denkzettel-kde-scratchpad/) und dabei stolz erwähnt, dass ein Team aus Claude-Code-Agenten den Code baut: Product Owner, Entwickler, UX, Scrum Master, jeder mit fester Rolle, der komplette Prozess offen im Repository. Heute habe ich den Scrum Master entlassen und den Prozess gelöscht.

<!--more-->

## Wie es so weit kam

Das Team arbeitet in Sprints, und nach jedem Sprint gibt es eine Retrospektive. Da fragt man sich, was schiefgelaufen ist, und beschließt Maßnahmen dagegen. Jede einzelne war vernünftig.

Ein Bildbeleg hatte einen veralteten Stand gezeigt — also die Regel, dass der Bildläufer vor jedem Beleg frisch gebaut wird. Eine Abnahme hatte auf einem Code geruht, den eine Reparatur längst überholt hatte — also die Regel, dass jede Messdatei ihren Commit nennt. Ein Prüfbericht war im Sitzungsspeicher verschwunden, mitsamt elf Befunden — also die Regel, dass Belege ins Repository gehören.

Neun Sprints, neun Retrospektiven, fünfundzwanzig Beschlüsse. Und hier ist der Haken: Es wurde nie einer gestrichen. Beschlüsse kamen dazu, keiner ging. Die Arbeitsvereinbarung wuchs auf 855 Zeilen, die Anweisungsdatei für die Agenten auf 200, und jeder Sprint brachte ein Protokoll, das den vorigen an Länge schlug.

Aufgefallen ist es mir am Ende von Sprint 9. Der Product Owner meldete den Abschluss, und kurz darauf kam die Nachricht des Scrum Masters: Er habe im Vollzugsvermerk einen Fehler gefunden — in seinem eigenen Vollzugsvermerk. Ein Bericht über einen Bericht über einen Bericht.

Ich habe zwei Sätze zurückgeschrieben:

> Wir schreiben mehr Berichte als Code. Dann prüfen wir die Berichte und dann prüfen wir die Prüfung. Das muss enden.

## Die Zahl

Der Product Owner hat nachgemessen, statt mir recht zu geben. Das Ergebnis für Sprint 9:

| | Zeilen |
|---|---|
| Code und Tests | 1.986 |
| Dokumente darüber | 19.538 |

Von 75 Commits in diesem Sprint fassten 57 ausschließlich das Dokumentationsverzeichnis an. Über das ganze Projekt gerechnet standen 15.772 Zeilen Code gegen 41.771 Zeilen Prozess.

Zehn Zeilen Papier je Zeile Programm. Bei einem Werkzeug, dessen ganzer Witz darin besteht, dass man beim Notieren nichts entscheiden muss.

## Was rausgeflogen ist

Der Auftrag war knapp: Mach einen Plan, was wir alles rauswerfen können. Behalte nur, was essenziell ist.

Die Frage, an der sortiert wurde, war brauchbar einfach — hat dieses Verfahren jemals einen Fehler im *Programm* gefunden? Nicht im Bericht, nicht im Prozess, im Programm.

Vieles fiel bei der Frage sofort durch:

- **Die Vorprüfung.** Jede Story wurde vor dem Ziehen von zwei unabhängigen Agenten am Code vermessen — 31 Ordner, 10.242 Zeilen. Herausgekommen sind Größenschätzungen. Gefunden hat das Verfahren nichts.
- **Die Größenklassen.** Damit auch der Grund, dauernd über Größenklassen zu reden.
- **Die Sprint-Protokolle.** Das letzte hatte 1.427 Zeilen für zwei Stories.
- **Mängellisten und Vollzugsvermerke.** Der Apparat, der Mängel an der eigenen Prüfung buchte — von den zwölf Mängeln in Sprint 9 betrafen die meisten die Prüfung und nicht das Produkt.
- **Der Scrum Master.** Die Rolle erzeugt die Prüfung der Prüfung strukturell; wer sie besetzt, produziert sie.
- **Der Verwalter.** Ein Agent, der einen Bericht darüber schrieb, dass er Issues geschlossen hat.
- **Die Retrospektive** als feste Einrichtung. Sie war die Quelle des Wachstums. Wenn es sie wieder gibt, darf sie Regeln nur streichen oder ersetzen, nie hinzufügen.

Zusammen 1.366 Dateien und 103.606 Zeilen. Das Repository schrumpfte von 67 auf 2,6 Megabyte.

## Was geblieben ist

Vier Regeln haben die Frage überstanden, weil jede von ihnen einen echten Fehler gefunden hat:

1. **Geprüft wird am installierten Programm, und Installieren heißt nicht Laufen.** Nach der Installation hält ein laufender Dienst die gelöschte alte Datei weiter — man misst dann den Vorgängerstand und merkt nichts davon.
2. **Ein UI-Review braucht ein eigenes Bild.** Tests ersetzen die Bildprüfung nicht, und Bilder ersetzen die Tests nicht.
3. **Ein Bild, das nicht auf dem Bildschirm entstanden ist, zeigt nicht, was ich sehe.** Es belegt Geometrie und Farben. Hülle, Rundung, Kontur und Schatten zeichnen Theme und Compositor, und die fehlen dort.
4. **Ein Bildbeleg zählt nur, wenn sein Läufer frisch gebaut ist.** Sonst schreibt er plausible Bilder eines alten Standes mit frischem Zeitstempel.

Die Anweisungsdatei ist von 200 auf 110 Zeilen geschrumpft. Das Team besteht jetzt aus mir, dem Product Owner, dem Entwickler und der UX. Ein Sprint fängt damit an, dass jemand ein Issue zieht.

## Das Nachspiel: aufräumen kann man nur einmal

Wenn ich schon dabei war, sollte auch anderes verschwinden. In den Belegen standen der Name meines Rechners, meine Kernel-Version und Pfade aus meinem Home-Verzeichnis — Kleinkram, aber in einem öffentlichen Repository will ich das nicht.

Aus den aktuellen Dateien war das schnell entfernt. In der Versionsgeschichte stand es weiter, also habe ich sie umschreiben lassen: `git filter-repo` über alle Commits, Rechnername ersetzt, Pfade ersetzt, das ganze Dokumentationsverzeichnis aus der Geschichte gestrichen. 368 Commits wurden 220. Dann ein Force-Push.

Nebenbei fiel dabei ein alter Fehler auf: In der Geschichte lag ein versehentlich mit eingecheckter Build-Ordner, 445 Dateien. In den Objektdateien darin standen die absoluten Pfade meines Rechners, weil der Compiler sie in die Debug-Informationen schreibt. Der lag da seit Monaten.

Dann kam die unangenehme Überraschung. Der Product Owner hat nach dem Force-Push nachgesehen, ob die alten Daten wirklich weg sind — und sie waren es nicht:

```
gh api repos/hnsstrk/denkzettel/commits/8e9c401
  → liefert den alten Commit weiterhin aus

gh api ".../contents/docs/scrum/PROZESS.md?ref=8e9c401"
  → PROZESS.md, 58.020 Byte, weiterhin abrufbar
```

Der Force-Push hatte die alten Commits nur aus dem Branch entfernt. Auf GitHub liegen sie weiter im Objektspeicher und werden über ihre Prüfsumme ausgeliefert, für jeden, der die Nummer kennt. Und die Nummern stehen in alten Issue-Kommentaren.

Es gibt genau zwei Auswege. Man bittet den GitHub-Support, den Speicher aufzuräumen — das dauert. Oder man löscht das Repository und legt es neu an. Ich habe das Zweite gewählt.

Das kostet: Issue-Kommentare, Sterne, die Historie der Testläufe, das Erstellungsdatum. Was ich retten wollte, war der Backlog — 64 offene Stories, und noch wichtiger die Nummern. Der Quelltext, die Spezifikation und der Changelog verweisen an Dutzenden Stellen auf Nummern wie `#83` oder `#100`; verschieben sie sich um zwei, zeigen alle diese Verweise auf fremde Geschichten.

Also hat der PO alle 106 Nummern der Reihe nach neu angelegt, samt zwei Platzhaltern für die Lücken, wo früher Pull Requests lagen — und das Skript so gebaut, dass es beim ersten Versatz abbricht, statt ihn festzuschreiben. Danach lieferte der alte Commit endlich das, was er sollte: einen 404.

## Was ich mitnehme

Der Prozess ist nicht aus Dummheit gewachsen. Jede Regel hatte einen Fehler im Rücken, den sie verhindern sollte, und viele haben ihn auch verhindert. Was gefehlt hat, war jemand, der von Zeit zu Zeit fragt, was das Ganze inzwischen kostet.

Meine Agenten haben das nicht gefragt. Sie haben getan, was ich eingerichtet hatte, gründlich und ausdauernd, und wären damit weitergelaufen, bis das Verhältnis bei zwanzig zu eins gelegen hätte. Die Frage musste von außen kommen.

Denkzettel steht inzwischen bei Version 0.3.0. Der nächste Sprint fängt ohne Vorprüfbericht an, ohne Größenklasse und ohne Protokoll. Mal sehen, was dabei kaputtgeht — dann wissen wir wenigstens, wofür die Regel gut war.
