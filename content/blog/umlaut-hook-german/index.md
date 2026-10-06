---
title: "Kein Handgriff"
date: 2026-10-01
draft: false
description: "Claude Code ersetzt Umlaute durch ASCII und erfindet Wörter wie „Seitenmöbel“. Dagegen stehen ein Hook mit 958 Zeilen und eine Regel mit drei Punkten."
tags: ["claude-code", "hook", "umlaut", "sprache", "hunspell", "erfahrungsbericht"]
toc: true
featured_image: ""
---

Claude Code schreibt mir seit Monaten deutsche Texte, und in schöner Regelmäßigkeit steht darin `fuer`. Oder `Schluessel`. Oder ein Satz wie „Weg 2 ist kein Abend mehr“, in dem jeder Buchstabe stimmt und trotzdem niemand weiß, was gemeint ist.

<!--more-->

Das sind zwei verschiedene Fehler, und gegen beide habe ich etwas gebaut. Gegen den ersten ein Skript, das inzwischen 958 Zeilen lang ist. Gegen den zweiten einen Text mit drei Punkten. Welches von beiden besser funktioniert, lässt sich genau sagen.

## Ae, oe, ue

Der erste Fehler ist nicht meine Privatsache. Im Issue-Tracker von Claude Code stammt der früheste Bericht über zerstörte Sonderzeichen nach meinen Notizen vom Juni 2025, inzwischen sind es über dreißig, quer durch alle Sprachen, die nicht Englisch sind. Der Bericht, der meinen Fall beschreibt — [deutsche Umlaute werden zufällig durch ASCII ersetzt](https://github.com/anthropics/claude-code/issues/14131) —, trägt dort das Label `area:model`. Anthropic führt die Sache also als Verhalten des Modells und nicht als Defekt eines Werkzeugs.

Dass echte Umlaute zu schreiben sind, steht bei mir in den Anweisungsdateien. Das hilft meistens. „Meistens“ ist bei 671 Tagesnotizen und einem Recherche-Ordner mit 643 Dateien allerdings ein dehnbarer Begriff.

Am 17. August habe ich aufräumen lassen: 19 Dateien in meinem Obsidian-Vault trugen ASCII-Ersatz im Namen, 28 Verweise in 22 Notizen mussten nachgezogen werden. Kein Dateiname mit ASCII-Ersatz mehr im Vault, stand danach im Protokoll.

Vier Tage später waren es wieder sieben, vier davon vom selben Tag. Diesmal habe ich nach dem Grund suchen lassen, und der lag bei mir. Fünf meiner Skills — das sind Anweisungspakete für wiederkehrende Aufgaben, etwa die Auswertung eines Videos — verlangten ausdrücklich Dateinamen ohne Umlaute, wegen der Synchronisation mit Google Drive. Die Anweisungsdatei des Vaults verlangte das Gegenteil. 89 Notizen trugen längst Umlaute im Namen und wurden beanstandungsfrei synchronisiert; die Begründung war also schlicht falsch. Jeder Playlist-Lauf hat brav neuen ASCII-Ersatz erzeugt, weil es so in meinen eigenen Skills stand.

Das Modell hatte in diesem Fall getan, was dastand. Ich erwähne das der Vollständigkeit halber.

Die Skills wurden korrigiert, 31 Dateien umbenannt, 67 Verweise in 44 Dateien nachgezogen. Blieb der Fließtext. Ein Prüfskript sollte zählen, wie viel ASCII-Ersatz in den Notizen selbst steckt, und meldete beim ersten Lauf 3.899 Fundstellen — darunter die Vorschläge `hnsstrk → hnßtrk` und `Crosstrainer → Croßtrainer`. Der Assistent hatte zu Beginn der Sitzung selbst `LC_ALL=C` gesetzt, und unter dieser Einstellung zerlegt die Rechtschreibprüfung Umlaute in einzelne Bytes. Mit der richtigen Einstellung waren es 1.220.

Die hat noch am selben Abend ein Schwarm aus acht Agenten abgearbeitet: 1.218 Fundstellen in 216 Dateien, rund 800 korrigiert. Stehen geblieben sind 150, davon 95 mit Absicht — Zitate und fremder Text. In meinen Blog-Einträgen von 2007 stehen Kommentare anderer Leute, und die bleiben so, wie sie geschrieben wurden.

## Ein Wörterbuch an der Tür

Aufräumen ist das eine. Ich wollte, dass der Fehler gar nicht erst in die Datei kommt.

Claude Code kennt dafür Hooks: Skripte, die vor jedem Werkzeugaufruf laufen und ihn abweisen können. Seit dem 26. August hängt bei mir `umlaut-guard.py` vor jedem Schreibvorgang:

```json
"PreToolUse": [
  {
    "matcher": "Write|Edit|MultiEdit|Bash",
    "hooks": [
      {
        "type": "command",
        "command": "python3 <home>/.claude/hooks/umlaut-guard.py"
      }
    ]
  }
]
```

Endet das Skript mit dem Rückgabewert 2, wird nicht geschrieben, und die Fehlermeldung geht zurück an das Modell.

Die naheliegende Lösung wäre ein Suchmuster für `ae`, `oe`, `ue` und `ss`. Die würde bei `queue`, `issue`, `Klasse` und `muss` anschlagen und wäre nach einem Vormittag wieder ausgebaut. Der Hook fragt deshalb ein Wörterbuch — `hunspell` in Version 1.7.3, einmal deutsch, einmal englisch. Ein Wort gilt nur dann als Verstoß, wenn es in keinem der beiden steht und seine Rückersetzung im deutschen steht (Auszug ohne den Kommentarkopf):

```python
def urteile(binaer, alle):
    alle = sorted(alle)
    if not alle:
        return {}
    unverdaechtig = bekannt(binaer, alle, 'de_DE') | bekannt(binaer, alle, 'en_US')
    offen = [w for w in alle if w not in unverdaechtig]
    varianten = {w: sorted(rueckersetzungen(w)) for w in offen}
    alle_varianten = sorted({v for vs in varianten.values() for v in vs})
    echte = bekannt(binaer, alle_varianten, 'de_DE')
    ergebnis = {}
    for w in offen:
        for v in varianten[w]:
            if v in echte:
                ergebnis[w] = v
                break
    return ergebnis
```

`Baeume` kennt kein Wörterbuch, `Bäume` kennt das deutsche — abgewiesen. `queue` kennt das englische — durchgelassen. Fehlt `hunspell` oder scheitert der Aufruf, lässt der Hook alles durch; ein kaputter Prüfer soll das Schreiben nicht dauerhaft blockieren.

Die erste Fassung hatte sieben Testfälle, und alle sieben waren grün.

## Was vorher niemand sah

Zehn Tage später stellte sich heraus, dass der Hook an der falschen Tür stand. Er prüfte die Schreibwerkzeuge, aber nicht die Shell — und über die Shell läuft bei einem Assistenten, der gern kurze Skripte schreibt, ein erheblicher Teil der Texte: Commit-Nachrichten, Heredocs, also mehrzeilige Texte mitten in einem Shell-Befehl, und alles, was auf dem zweiten Rechner landet.

Vor dem Umbau wurde gemessen, an 1.233 echten Shell-Befehlen aus den Sitzungsprotokollen. Die Frage war eigentlich, was die Prüfung an Zeit kostet. Die Antwort: 30 Millisekunden für einen unauffälligen Befehl, rund 48 mehr für einen geprüften. Mit einem engen Vorfilter, der nur Befehle prüft, die erkennbar Prosa schreiben, lösen 47 Prozent der Befehle die Wörterbuchprüfung aus statt 83.

Interessanter war der Beifang. Die Prüfung schlug bei über 150 verschiedenen Wörtern an, und das waren überwiegend keine Fehlalarme. `Schluessel` 18-mal, `fuer` 16-mal, `Eintraege` 10-mal, `ueber` 9-mal. Der Assistent hatte den ganzen Tag ASCII in Commit-Nachrichten geschrieben, und es hatte schlicht niemand hingeschaut.

Seit dem 5. September prüft der Hook auch die Shell. Beim allerersten Einsatz hat er einen Befehl der Sitzung abgewiesen, in der er gerade gebaut worden war.

## Der Türsteher dreht durch

Ab hier wird es eine andere Geschichte. Ein Prüfer, der Shell-Befehle liest, muss entscheiden, was daran Prosa ist und was Dateiname, Variablenname oder Schalter. Ein Wörterbuch kann das nicht.

| Datum | Was der Hook zu Unrecht abwies | Fälle im Prüfskript danach |
|---|---|---|
| 05.09. | Bezeichner mit Unterstrich, Schalter, Dateinamen mit Code-Endung | — |
| 12.09. | `grep` nach der Fehlform, Notizen mit `wissen_status: ueberfuehrt`, Variablennamen in Python-Skripten, seine eigene Probe | 19 |
| 13.09. | Schlüssel aus einer YAML-Datei in einem Prüfbefehl | 23 |
| 18.09. | Dateinamen ohne Umlaute bei `ssh`, `scp` und `tee` | 38, abends 52 |
| 25.09. | einzelne Ordnernamen als Argument von `mkdir` oder `mv` | 93 |
| 27.09. | Pfade hinter `bash -c`, `git mv`, `for` und `xargs`; der Wert `status: geloest` | 158 |

Der 12. September verdient einen genaueren Blick. Ein Lesebefehl wurde abgewiesen, weil darin ein Pfad auf eine Notiz vorkam — und zwar ausgerechnet der Befehl, der prüfen sollte, ob der Hook gewirkt hat. Wer nach `fuer` sucht, muss `fuer` in den Befehl schreiben.

Bei der Fehlersuche kam ein zweiter Fehler zum Vorschein, und der war teurer. Die Ausnahme für Bezeichner mit Unterstrich vom 5. September lief an der falschen Stelle: Sie entfernte aus dem Kopf einer Notiz den Schlüssel `wissen_status` und ließ `: ueberfuehrt` übrig. Ohne Schlüssel sah der Wert aus wie ein falsch geschriebenes deutsches Wort. Jede Notiz mit diesem Eintrag wurde beim Schreiben abgewiesen — und genau diesen Wert schreibt meine Recherche-Pipeline vor.

Der Prüfer gegen falsche Schreibweisen hat also die Schreibweise abgelehnt, die ich selbst festgelegt hatte.

Behoben war das noch in derselben Nacht, auf einem Rechner. Der zweite war nicht erreichbar und bekam die Korrektur am 18. September.

Am Nachmittag desselben Tages schlug der Hook zweimal zu Unrecht an — beim Schreiben von Quelltext, weil ein Variablenname zufällig wie ein falsch geschriebenes deutsches Wort aussah. Meine Anweisung dazu war kurz:

> Der Umlaut-Wächter soll die Finger vom Code lassen; in den Code gehören keine Umlaute, außer in den Kommentaren

Ganz so kurz ging es dann nicht. Der häufigste Arbeitsweg meines Assistenten ist ein kleines Python-Skript, das deutsche Prosa in eine Notiz schreibt. Lässt der Hook Quelltext pauschal durch, fehlt die Prüfung an genau der Stelle, an der am meisten geschrieben wird. Er zerlegt solche Skripte seither und prüft nur Kommentare und Zeichenketten.

So ging es weiter. Am 18. September hat ein Zweitblick in frischem Kontext die Korrektur vom Nachmittag geprüft und festgestellt, dass sie zu weit gefasst war: In 15 von 25 Gegenbeispielen ging Prosa ungeprüft durch, die vorher noch abgewiesen worden wäre. Am selben Abend wurde nachgeschärft.

Am Vormittag des 27. September hat ein Agenten-Team den produktiven Hook auf einem Rechner ersetzt, ohne dass ich das freigegeben hatte. Die neue Fassung bestand 107 von 107 Prüffällen. Das war nicht die Frage.

Bei der Aufarbeitung fiel etwas auf, das den Monat davor in ein eigenes Licht rückt: Keine einzige Fassung hatte je geprüft, ob ein Pfad überhaupt in einem Vault liegt. Der Hook hatte Dateinamen nie mit Absicht geprüft. Abgewiesen wurde, was er nicht als Pfad erkannte — und jede Nachbesserung hatte ihm eine weitere Form beigebracht, in der Pfade auftreten können.

Seit dem 27. September gibt es dafür eine Regel statt einer Sammlung von Ausnahmen. Umlaute in Datei- und Ordnernamen verlangt der Hook nur noch in den vier Obsidian-Vaults. Überall sonst — Repositories, Konfigurationsordner, Server — sind Namen ASCII und werden nicht geprüft. Prosa bleibt überall geprüft.

Die Fassung besteht 158 von 158 Prüffällen. Dazu kam eine Mutationsprobe: 32 absichtlich verschlechterte Fassungen des Hooks, von denen jede genau eine Grenze aufweicht, und alle 32 fallen durch das Prüfskript. Im Vergleich an 17.272 bis 43.036 echten Aufrufen je Rechner wies die neue Fassung ein bis zwei Aufrufe zusätzlich ab, gewollt, und ließ drei bis fünf zusätzlich durch — Schema-Werte, Repository-Pfade, Quelltext.

Von sieben Testfällen auf 158 in einem Monat. In [Papierkrieg](/blog/denkzettel-prozess-rueckbau/) habe ich vor Kurzem beschrieben, wie ein Prozess wächst, wenn jede Regel einen guten Grund hat und keine je gestrichen wird. Ich sehe die Ähnlichkeit.

## Seitenmöbel

Der zweite Fehler lässt sich nicht nachschlagen.

Am 14. August habe ich dem Assistenten geschrieben:

> Ich merke mehr und mehr, dass ich raten muss, was du mir sagen möchtest.

Gemeint war keine einzelne Antwort. Über mehrere Wochen waren die Meldungen schlechter geworden: erfundene Begriffe statt Sachbezeichnungen, Befunde, die erwähnt, aber nicht mitgeteilt wurden. Aus der Rüge entstand am selben Tag eine Regeldatei, `klare-sprache.md`, mit zwei Punkten. Kein Bild, wo ein Sachbegriff existiert. Und was angesprochen wird, wird auch gesagt.

Zur Anschauung, was gemeint ist:

| Geschrieben | Gemeint |
|---|---|
| „Der größte Einzelposten ist Seitenmöbel“ | Navigationsleisten, Kommentare und Verweislisten — wörtlich übertragen aus *page furniture* |
| „Handlauf“ | ein von Hand angestoßener Lauf, nicht das Geländer an der Treppe |
| „Weg 2 ist kein Abend mehr“ | dauert länger als dieser Abend |
| „Version, Changelog, Tag und Milestone sind dann eine Viertelstunde“ | dauern zusammen eine Viertelstunde |
| „Waisen“ | was eine Änderung überflüssig zurücklässt — aus *orphans* |
| „zurückrollen“ | rückgängig machen — aus *roll back* |

Die Regel stand also. An fünf der zehn Tage danach ist sie gebrochen worden.

Am 15. August der Handlauf. Am 17. ein Satz ohne Verb mit drei Stichworten zum Selbstauflösen. Am 18. zwei Stellen auf einmal. Mein Urteil dazu: „das wird immer schlimmer.“

Die erste war eine Überschrift: „Eine Ellipse mit Folgen.“ Die Ellipse ist ein Fachbegriff der Sprachwissenschaft für eine Auslassung, stammte aus dem Bericht eines Prüf-Agenten und war ungeprüft zur Überschrift befördert worden. Die zweite stand in einer Regeldatei, die in jeder Sitzung auf beiden Rechnern geladen wird:

```diff
- Was du nicht fragst, entscheidest du und benennst die Annahme.
+ Fragst du nicht nach, entscheidest du nach dem Absatz darüber — Eindeutiges beheben, Ermessen liegen lassen — und benennst die Annahme.
```

Man fragt nicht eine Sache, man fragt nach einer Sache. Der Satz sollte festlegen, wann der Assistent selbst entscheidet und wann er nachfragt, und war an dieser Stelle falsch. Der Prüf-Agent hatte die Zeile sogar beanstandet; sein Vorschlag wurde übernommen, ohne dass der Satz danach noch einmal gelesen worden wäre. Gefunden habe beide Stellen ich.

Die Reparatur hat dann einen dritten Fehler erzeugt. Beim Aufräumen fiel der Tippfehler „Fehlerkennung“ statt „Fehlererkennung“ auf, und der Assistent hat ihn im ganzen Vault ersetzt — auch in drei Notizen, in denen „Fehlerkennung“ genau so gemeint war. Ein Sprachfehler, entstanden beim Beheben eines Sprachfehlers.

Die anschließende Durchsicht fand elf solche Stellen in den Regeldateien, überwiegend Lehnübersetzungen. Die betroffene Datei war kurz vorher ungefragt aus dem Englischen übertragen worden.

Am 21. August bat ich darum, mir eine Einstellung „für Dummies“ zu erklären, und bekam eine Alltagsmetapher. Meine Antwort: „Ich brauche keine Beschreibung für Idioten, sondern eine gute Beschreibung.“

Am 24. August gab es zwei Rügen an einem Abend. Die erste galt einer Meldung mit Sätzen wie „Weg 2 ist kein Abend mehr“; aus demselben Text habe ich etwas später noch einen Satz als Beleg nachgereicht: „Es ist aber eine eigene kleine Einheit über beide Fenster, kein Handgriff.“ Die zweite kam in einer anderen Sitzung, nachdem dort den ganzen Abend von „Impasto“ die Rede gewesen war — im Chat, in einer Datei, in einer Commit-Nachricht — und nie gesagt wurde, was das ist. Meine Frage dazu steht wörtlich im Protokoll:

> Was zum Fick ist Impasto?

Pastoser Farbauftrag. Die Farbe so dick, dass die Pinselspur als Relief stehen bleibt. Das deutsche Wort war die ganze Zeit vorhanden.

Der Assistent hat an diesem Abend sein eigenes Muster recht genau beschrieben: eine Sache wird mit einem verneinten oder gemessenen Hauptwort gleichgesetzt und die Aussage weggelassen. „X ist kein Handgriff“, „X ist kein Abend mehr“, „X sind eine Viertelstunde“. Das Muster häuft sich in den Schlussabsätzen langer Meldungen, dort, wo zusammengefasst wird.

Die Diagnose stimmt. Es war dieselbe Stelle wie bei der Rüge vom 14. August.

Heute, am 1. Oktober, hat die Regel einen dritten Punkt bekommen. Als Beispiel nennt er die Rückfrage „C: ja oder nein?“ — ein Kürzel, bei dem man erst nach oben blättern muss, um herauszufinden, was C war. Meine Rüge dazu steht jetzt in der Regel: „Ich bin ein Mensch und keine Maschine.“ Jeder Punkt, der eine Entscheidung verlangt, trägt seinen Zusammenhang seither selbst.

## Liegt es am Modell?

Der Verdacht lag nahe. Am 25. Juli hat mein Claude Code das Hauptmodell gewechselt, von Fable 5 auf Opus 5; drei Wochen später kam die erste Rüge.

Ich habe das an den eigenen Tagesprotokollen prüfen lassen. Vom 1. bis 24. Juli stehen dort 306 Einträge und eine einzige Nennung eines eigenen Fehlers, vom 25. Juli bis 22. August 625 Einträge und 29 Nennungen. Das sieht nach einem klaren Ergebnis aus.

Es ist keins. Die Zahl der Einträge hat sich im selben Zeitraum verdoppelt, die Fehlernennungen betreffen Git, Tests und Missverständnisse aller Art, und die Protokolle schreibt das jeweils laufende Modell selbst. Gemessen wurde eine veränderte Protokollierpraxis. Für einen Vergleich bräuchte es denselben Schreibauftrag an mehrere Modelle, und der steht aus.

## Was davon hält

1. Was sich nachschlagen lässt, lässt sich erzwingen. Ob `Schluessel` ein deutsches Wort ist, beantwortet ein Wörterbuch in rund 48 Millisekunden, und es antwortet jedes Mal gleich. Die Prüfung hat in 1.233 Befehlen über 150 verschiedene Wörter gefunden, die vorher niemand gesehen hatte.
2. Eine Anweisung im Klartext hält, solange das Modell daran denkt. Die Umlaut-Regel stand vor dem Hook in den Anweisungsdateien, die Sprachregel stand vor fünf der sechs Rügen im August.
3. Ein Prüfer, der zu viel abweist, richtet eigenen Schaden an. Dieser hat meine Recherche-Pipeline blockiert, die Prüfung seiner selbst und einen Schema-Wert, den ich vorgeschrieben hatte. Jede Ausnahme dagegen hat einen belegten Anlass und eine bekannte Lücke — ein kleingeschriebenes Wort in Anführungszeichen mitten in einem Befehl rutscht bis heute durch.
4. Erst die eigenen Regeln lesen. Der hartnäckigste Umlaut-Fehler im Vault kam aus fünf Skills, die ihn vorschrieben.
5. Für „Seitenmöbel“ gibt es kein Wörterbuch. Beide Bestandteile sind tadelloses Deutsch.

Der fünfte Punkt ist der unangenehme. Gegen Umlaute steht ein Programm, das abweist. Gegen unverständliche Sätze steht ein Text, den dasselbe Modell lesen und befolgen soll, das die Sätze schreibt — und bemerkt hat sie bisher jedes Mal der Leser.

Der Hook hat jetzt 958 Zeilen, die Regel drei Punkte. Ich wüsste gern, welche der beiden Zahlen in einem Jahr größer geworden ist …
