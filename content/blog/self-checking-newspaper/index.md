---
title: "Eine Zeitung, die sich selbst prüft"
date: 2026-07-20
draft: false
description: "Zwei Wochen nach dem Aufbau der selbstschreibenden Zeitung: Wie aus einer Maschine, die produziert, eine wurde, die sich korrigiert, überwacht und an ihre eigenen Ausgaben erinnert."
tags: ["ki", "llm-agent", "automation", "monitoring", "self-hosting", "transparenz", "static-site-generator"]
toc: true
featured_image: ""
---

Vor gut zwei Wochen wurde an dieser Stelle beschrieben, wie auf news.hnsstrk.de jeden Morgen eine vollautomatische sicherheitspolitische Zeitung entsteht — [eine Zeitung, die sich selbst schreibt](/blog/self-writing-newspaper/). Der Artikel endete mit drei offen benannten Grenzen: Kein Mensch prüft die Seiten vor dem Erscheinen, das Quellen-Budget begrenzt die Tiefe, und die gesamte Persona hängt an einem einzigen Prompt. Diese Fortsetzung handelt davon, was seither an genau diesen Grenzen gearbeitet wurde.

<!--more-->

{{< tldr >}}
Die tragende Architektur — zwei getrennte Maschinen, Push-to-Build, statische Auslieferung — hat unverändert getragen. Darüber ist in zwei Wochen eine zweite Ebene gewachsen: sichtbare Korrekturen mit einer Errata-Seite, ein redaktionelles Urteil in jeder Ausgabe, eine Aufklärungsebene aus Marktdaten, ein Gedächtnis, das vor der Auswahl gelesen wird, und drei unabhängige Wachen — eine davon bewusst auf einem anderen KI-System, weil ein System seinen eigenen Ausfall nicht melden kann. Der schwierige Teil war nicht, eine Zeitung zu erzeugen, sondern einer zu trauen, die niemand liest.
{{< /tldr >}}

## Was tragfähig blieb

Zuerst das, was sich nicht geändert hat, weil es sich nicht ändern musste. Die Grundentscheidung des ersten Artikels — Erzeugung und Auslieferung strikt zu trennen — hat über 27 Ausgaben ohne Zwischenfall gehalten. Die Redaktionsmaschine erzeugt, eine kleine Auslieferungsmaschine serviert statisches HTML, verbunden durch einen einzigen `git push`. In diesem Fundament wurde nichts umgebaut.

Alle Änderungen der letzten zwei Wochen liegen eine Schicht darüber. Sie betreffen nicht, *wie* die Zeitung ausgeliefert wird, sondern *ob man ihr glauben kann* — und was geschieht, wenn man es nicht kann. Bezeichnend ist, dass diese zweite Schicht überhaupt so groß werden musste. Eine Publikation zu erzeugen, ist ein Mechanik-Problem und war nach wenigen Tagen gelöst. Einer Publikation zu trauen, die kein Mensch vor dem Erscheinen liest, ist ein anderes Problem — und das eigentlich schwierige.

## Vom Referat zum Urteil

Eine der ersten Rückmeldungen zur fertigen Zeitung war unbequem: Die Texte seien korrekt, belegt — und austauschbar. Der Leser bekam dieselben Meldungen wie anderswo, sortierter und ehrlicher etikettiert, aber ohne Zugewinn an Erkenntnis. Was fehlte, war kein Stil, sondern ein **Urteil**: eine Aussage darüber, welcher der wichtigste Vorgang des Tages ist und warum.

Seither ist die Einordnung am Kopf jeder Ausgabe der einzige Ort, an dem gewertet wird — und sie soll es tun. Sie benennt den aus der Nachrichtenlage heraus wichtigsten Vorgang und begründet die Gewichtung. Folgerungen, die über den Wortlaut der Quellen hinausgehen, sind dort ausdrücklich erlaubt. Die Regel dahinter: Ein Satz, dem man widersprechen kann, ist mehr wert als drei, die niemand bestreiten würde. Damit erkennbar bleibt, was belegt und was gefolgert ist, trägt jede Aussage die Sprache ihrer Sicherheit — was belegt ist, steht im Indikativ; was gefolgert ist, trägt „spricht dafür", „dürfte", „bleibt offen".

Dazu kam eine Regel, die einen typischen Fehler automatischer Systeme abstellt: **Nichts wird wiederholt, weil nichts Neues vorliegt.** Ein bereits berichteter Sachverhalt oder Wert wird nicht erneut ausgeführt; fehlende neue Daten sind kein Grund, alte noch einmal zu bringen. Anlass war ein konkreter Fall — derselbe Kursgewinn eines Rüstungswerts stand an drei Tagen hintereinander im Blatt, weil über ein Wochenende keine neuen Börsendaten vorlagen, eine Regel aber täglich eine Marktdeutung verlangte. Die Regel war zu weit gefasst. Ein früherer Wert darf jetzt nur wieder auftauchen, wenn die Einordnung ihn braucht — und dann mit seinem Datum im Satz.

## Eine Aufklärungsebene aus Kursen

Die deutlichste inhaltliche Erweiterung ist eine neue Datenquelle: ein festes Panel aus 32 Börseninstrumenten — Rüstungswerte aus Deutschland, Europa und den USA, dazu Marktindizes, Krisenbarometer wie Öl, Gold und Volatilität sowie strategische Rohstoffe. Erfasst werden ausschließlich frei verfügbare Tagesschlussdaten.

Der Gedanke dahinter ist kein Finanzteil, sondern eine Aufklärungsebene aus offenen Quellen: Kapitalmärkte preisen sicherheitspolitische Erwartungen ein, bevor sie in Beschlüssen, Verträgen oder Lieferungen sichtbar werden. Eine eigene [Märkte-Seite](https://news.hnsstrk.de/maerkte/) deutet diese Werte täglich; die Ausgabe selbst nimmt einen Marktbezug nur auf, wenn er die Lage des Tages trägt, stützt oder ihr widerspricht.

Jede Marktdeutung ist ausdrücklich spekulativ und trägt einen entsprechenden Hinweis. Die Grenze dieser Ebene wird offen benannt: Aktienkurse sind die dünnste Form der Finanzaufklärung. Ein Kurs sagt, was Anleger erwarten; eine Ausschreibung sagt, was ein Ministerium tut. Vergabe-, Zoll- und Exportkontrolldaten wären die aussagekräftigeren Quellen — sie stehen als nächster Ausbauschritt an, sind aber noch nicht angebunden.

{{< callout type="note" title="Deutung braucht Kontext" >}}
Die Marktdeutung entsteht in einem eigenen, früheren Lauf, der die Nachrichtenlage des Tages zunächst nicht kennt. Damit die Seite trotzdem Sicherheitspolitik bleibt und nicht zum Börsenbericht wird, liest dieser Lauf einen verdichteten Rückblick auf die letzten Ausgaben: Er weiß, welcher Krieg, welche Beschaffung, welche Bündnisfrage gerade offen ist, und deutet die Kurse gegen diese laufende Lage — nicht gegen den Kalender.
{{< /callout >}}

## Korrekturen, die man sieht

Der erste Artikel nannte als Grenze, dass kein Mensch die Seiten prüft. Vollständig aufheben lässt sich das nicht, ohne die Automatik aufzugeben. Was sich aber aufheben lässt, ist die Unsichtbarkeit von Korrekturen.

Wird eine Aussage in einer erschienenen Ausgabe nachträglich berichtigt, wird die Berichtigung seit Mitte Juli **benannt**, nicht stillschweigend überschrieben. Eine [Errata-Seite](https://news.hnsstrk.de/errata/) sammelt diese Vermerke; sie entsteht nicht von Hand, sondern erzeugt sich aus Korrektur-Feldern im Kopf der einzelnen Beiträge (dem Frontmatter, den strukturierten Metadaten über dem Text) — eine handgeführte Liste wäre eine zweite, konkurrierende Wahrheit. Betrifft dieselbe Berichtigung mehrere Ausgaben, fasst die Seite sie zu einem Fall zusammen.

Dazu gehört eine strikte Grenze: Der Registeranhang einer erschienenen Ausgabe ist eingefroren. Er entsteht aus dem *aktuellen* Registerstand; ein Neubau würde einer alten Ausgabe rückwirkend Einträge über Ereignisse unterschieben, die nach ihrem Erscheinen liegen — für den Leser nicht als spätere Ergänzung erkennbar. Das Bau-Skript verweigert deshalb jedes Datum, das älter als der Vortag ist.

Weil die gesamte Zeitung in Git liegt, ist jeder nachträgliche Eingriff ohnehin nachweisbar — nur sah niemand hin. Eine kleine Wache liest diesen Verlauf jetzt täglich und meldet, wenn ein Beitrag nach seinem Erscheinungstag inhaltlich verändert wurde, ohne dass ein Korrekturvermerk das nennt. Reine Darstellungsänderungen — Satz, Layout, Datumsform — bleiben stumm; sie kennzeichnen sich über eine Zeile in der Commit-Nachricht.

## Wachen — und eine davon von außen

Der aufwendigste Teil der letzten zwei Wochen ist auf der Seite nicht zu sehen. Eine automatische Zeitung, die niemand vorab liest, braucht Wachen, die melden, wenn etwas schiefläuft. Der Aufbau solcher Wachen hat einen Fehlertyp zutage gefördert, der sich hartnäckig wiederholt.

Eine Wache über die Quellenlage meldete sechs Tage lang ins Leere. Sie schlug bei einem Befund nicht selbst Alarm, sondern stieß einen Auftrag desselben Redaktionssystems an, der die Meldung verschicken sollte. Dieser Auftrag ruhte — und der Aufruf, der ihn wecken sollte, meldete Erfolg, ohne etwas zu bewirken. Die Wache prüfte nur den Rückgabewert des Aufrufs, nicht, ob der Auftrag tatsächlich lief. Drei reale Fehlerzustände standen sauber erfasst in der Datenbank und erreichten niemanden.

Derselbe Fehler tauchte an diesem Tag noch dreimal an anderer Stelle auf: Eine Morgenwache schloss aus der Existenz einer Datei auf einen erfolgreichen Lauf, obwohl die Datei vor dem eigentlichen Veröffentlichen entsteht. Jedes Mal diente ein Hilfssignal als Nachweis für ein Ereignis, mit dem es nur lose zusammenhing.

Daraus folgte eine Entscheidung, die über einzelne Reparaturen hinausgeht. Die Grundeinsicht lautet:

{{< callout type="warning" title="Ein System kann seinen eigenen Ausfall nicht melden" >}}
Alle bisherigen Wachen meldeten über dieselbe Vermittlungssoftware, die auch die Zeitung erzeugt. Fällt diese Software aus, schweigen auch ihre Wachen — genau der Fall, der sechs Tage lang unbemerkt eintrat. Eine verlässliche Überwachung muss außerhalb des überwachten Systems stehen.
{{< /callout >}}

Deshalb läuft seit Kurzem eine zweite, unabhängige Prüfung über ein anderes KI-Werkzeug — auf demselben Rechner, aber ohne jede Verbindung zum System, das die Zeitung erzeugt. Auslöser, Faktenerhebung, Urteil und Meldeweg sind getrennt. Ein festes Skript ohne eigenes KI-Modell sammelt nachprüfbare Tatsachen — bei gleicher Ausgangslage stets dasselbe Ergebnis — ist die heutige Ausgabe erschienen und ausgeliefert, wie umfangreich ist sie im Vergleich zu den letzten sechs, antwortet die Website, wie frisch ist die Wissensbasis. Ein zweites Sprachmodell beurteilt diesen Bericht und meldet direkt an den Nachrichtenkanal, ohne die Vermittlungssoftware des Redaktionssystems.

Die tragende Entscheidung dabei war eine Vermeidung. Das prüfende Modell hätte für eigene Nachforschungen Zugriff auf die Kommandozeile gebraucht — und hätte damit selbst eingreifen können. Die Regel „melden, nicht heilen" hinge dann nur am Wohlverhalten des Modells. Stattdessen bekommt es die Tatsachen im Auftrag mitgeliefert und braucht kein einziges Werkzeug. Dass diese Wache nicht eingreifen kann, ist damit technisch erzwungen statt bloß angewiesen.

Eine Abhängigkeit bleibt und wird offen benannt: Beide Meldewege nutzen dieselbe Absender-Identität beim Nachrichtendienst. Prozess, Code und Auslöser sind unabhängig; wird aber der Zugang entzogen, schweigen beide. Ein eigener Absender schließt diese Lücke und steht noch aus.

## Ein Gedächtnis, das vor der Auswahl gelesen wird

Der erste Artikel beschrieb die SQLite-Wissensbasis als das, was aus einem täglichen Einmal-Lauf etwas mit Gedächtnis macht. Inzwischen enthält sie 136 Entitäten und 204 thematische Einträge über alle Ausgaben. Nur wurde dieses Gedächtnis lange einseitig genutzt: Es speiste das Register und die Statistik, aber der Agent sah beim Schreiben seine eigenen früheren Ausgaben nicht.

Das war die eigentliche Ursache hinter den Wiederholungen. Die Regel, das Wissen der Vortage einzubeziehen, stand länger im Redaktionsstatut — es fehlte nur das Werkzeug, sie zu befolgen. Ein neuer Befehl liefert jetzt einen verdichteten Rückblick auf die letzten drei Ausgaben: Titel, Sachstand und Bewertung, rund 1.100 Zeichen statt der 16.500 des Volltexts. Er wird **vor** der Auswahl der Themen gelesen, nicht erst beim Schreiben — denn ob ein Kandidat aufgenommen wird, hängt daran, ob er etwas Neues bringt.

Der Nutzen reicht über das Vermeiden von Wiederholungen hinaus. Ereignisse, die über Tage laufen, bekommen damit einen Anschluss. Aus derselben Meldung in neuen Worten wird „seit Freitag unverändert" oder „erstmals bestätigt" — der Unterschied zwischen einer Zeitung, die jeden Morgen bei null anfängt, und einer, die weiß, was sie gestern geschrieben hat.

## Ein Verfahren, kein Einzelfall

Auffällig an diesen zwei Wochen ist weniger die Zahl der Änderungen als ihr Muster. Regeländerungen am System werden inzwischen von einem zweiten, unabhängigen Sprachmodell gegengelesen, bevor sie in Betrieb gehen — eines, das den Entstehungsdialog nicht kennt und den Text so liest, wie die Automatik ihn am nächsten Morgen liest. Wer eine Regel schreibt, weiß, was er gemeint hat, und liest es beim Prüfen mit; ein fremder Leser tut das nicht.

Dieselbe Gegenlesung hat mehrfach echte Widersprüche gefunden, die dem Autor entgangen waren — eine Anweisung, bei unveränderten Daten nicht zu deuten, stand unmittelbar neben einem fettgedruckten „gedeutet wird in beiden Formen". Ein frisch geschriebenes Skript zur Änderungsüberwachung gab beim Gegenlesen vier Schwächen her, darunter eine, die die Wache umgehbar machte. Diese Fundquote ist kein Zufall, sondern das Argument für das Verfahren: Zwei Systeme, die denselben Fehler machen, sind unwahrscheinlicher als eines.

Sichtbar wird all das auf einer eigenen Seite. Die Zeitung führt ein öffentliches [Änderungsblog](https://news.hnsstrk.de/technik/) über sich selbst — inzwischen 17 Beiträge, die jede substanzielle Änderung erklären, mitsamt dem, was nicht funktioniert hat.

## Grenzen, zwei Wochen später

Ehrlichkeit gebietet dieselbe Klarheit wie beim ersten Mal. Die drei Grenzen von damals sind nicht verschwunden, aber sie haben sich verschoben.

**Kein Mensch prüft die Seiten vor dem Erscheinen.** Das gilt unverändert. Was dazugekommen ist, sind mehrere unabhängige Prüfungen *nach* dem Erscheinen — auf Vollständigkeit, Auslieferung, nachträgliche Eingriffe — und eine sichtbare Fehlerkultur in Form der Errata-Seite. Eine automatische Prüfung ist kein menschliches Lektorat, aber sie ist mehr als das frühere Nichts.

**Das Quellen-Budget begrenzt die Tiefe.** Auch das bleibt. Die Marktebene hat eine neue Dimension hinzugefügt, aber ihre aussagekräftigsten Quellen — amtliche Vergabe- und Handelsdaten — sind noch nicht angebunden. Solange nur Börsenkurse vorliegen, bleibt es Börse mit sicherheitspolitischer Brille.

**Die Persona hing an einem Prompt.** Diese Grenze hat sich auf die aufschlussreichste Weise erledigt. Der erste Artikel warnte, ändere sich das Modell, ändere sich der Ton. Genau das erwies sich als Schwäche: Eine namentliche Redakteurs-Persona, unter der das Blatt zunächst erschien, stieß auf Leserkritik und wurde durch eine neutrale, nüchterne Redaktionsidentität ersetzt. Der Ton hängt weniger an einer erfundenen Figur, mehr an klaren Regeln — nachlesbar, gegenlesbar, korrigierbar.

Der eigentliche Fortschritt dieser zwei Wochen lässt sich in einem Satz fassen. Der erste Artikel beschrieb eine Maschine, die produziert. Was seither dazugekommen ist, ist eine Maschine, die für das, was sie produziert, einsteht — die sich korrigiert, sich überwachen lässt und sich an ihre eigenen Ausgaben erinnert. Ob die Texte dadurch wirklich besser geworden sind oder nur sorgfältiger abgesichert, ist die nächste offene Frage. Sie lässt sich erst nach einigen Ausgaben unter den neuen Regeln beantworten — und wird, dem Muster dieser zwei Wochen folgend, wohl wieder von einer unabhängigen Prüfung gestellt.
