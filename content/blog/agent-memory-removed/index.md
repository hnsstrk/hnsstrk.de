---
title: "Gedächtnisverlust"
date: 2026-09-29
draft: false
description: "Dreieinhalb Wochen hatten meine Hermes-Agenten ein externes Gedächtnis. Es behielt Falsches, fiel nachts aus und half nie nachweislich."
tags: ["hermes-agent", "hindsight", "ki-agenten", "agenten-gedaechtnis", "erfahrungsbericht", "self-hosting"]
featured_image: ""
toc: true
---

Das eingebaute Gedächtnis eines Hermes-Agenten fasst rund 3.600 Zeichen, etwa eine Seite. Anfang September habe ich ein zweites, größeres dazugebaut. Heute Abend habe ich es in acht Profilen wieder ausgebaut, die Datenbanken gelöscht und kein Archiv behalten.

<!--more-->

## Worum es geht

Hermes ist ein quelloffener Agenten-Rahmen von Nous Research — kein Sprachmodell, sondern das Drumherum, das ein beliebiges Modell mit Werkzeugen, Skills und einem Gedächtnis verbindet. Bei mir läuft er auf zwei Rechnern zu Hause, Europa und Ganymed, und auf einem gemieteten Server. Dort arbeiten mehrere Profile mit eigener Rolle, vom persönlichen Assistenten Hermann bis zum Rechercheur Wilfried.

Das eingebaute Gedächtnis eines Profils besteht aus zwei Textdateien. `MEMORY.md` fasst 2.200 Zeichen und trägt Umgebung und Abläufe, `USER.md` fasst 1.375 Zeichen und beschreibt den Nutzer. Beide stehen in jedem Systemprompt. Zusammen sind das rund 3.600 Zeichen, also etwa eine Seite.

Eine Seite ist nicht viel.

Hindsight ist ein Gedächtnis-Dienst von Vectorize, der genau dort ansetzt: Er schneidet jeden Gesprächszug mit, lässt ein kleines Sprachmodell die Fakten herausziehen und legt sie in einem Wissensgraphen ab, aus dem er vor der nächsten Antwort Passendes einspielt. Unter MIT-Lizenz, lokal betreibbar, und in der Extraktion mehrsprachig — das war der Grund für die Wahl. Dazu später mehr.

## Die Einrichtung

Am 4. September lief Hindsight auf Ganymed, am 5. auf dem Server, am 11. auf Europa — Version 0.9.2, zuletzt unter Hermes v0.21.1. Die Betriebsart hieß `local_embedded`: Hermes startet den Dienst selbst, samt einer eingebetteten Postgres-Datenbank. Der Einrichtungsassistent fragt nach einem Anbieter und schlägt ein Modell für die Faktenextraktion vor. Ich habe OpenRouter gewählt und den Vorschlag übernommen.

Die wichtigste Zeile der Konfiguration stand in keinem Assistenten, sie fand sich erst in der Dokumentation des Plugins. Ein Auszug:

```json
{
  "mode": "local_embedded",
  "llm_model": "qwen/qwen3.5-9b",
  "bank_id_template": "hermes-{profile}"
}
```

Eine Bank ist bei Hindsight die Einheit, über deren Grenze nichts abgerufen wird. Mit dem `bank_id_template` bekommt jedes Profil seine eigene, ohne dass man es einzeln einrichten muss. Hermann sieht nur, was Hermann erlebt hat.

`hermes memory status` meldete in jedem Profil dasselbe: Provider hindsight, Plugin installiert, Status available. Ob auch etwas gespeichert wird, stand an dem Tag ausdrücklich als offener Punkt im Protokoll. Wenige Stunden später zeigte sich, dass der Punkt zu Recht offen war.

## 64.000 Token für nichts

Noch in derselben Nacht meldete Hermann auf Europa, er könne keine Erinnerung mehr ablegen:

```text
Failed to store memory:
```

Mehr stand da nicht. Hinter dem Doppelpunkt kam nichts, weil eine Zeitüberschreitung keinen Text mitbringt.

Schuld war das vorgeschlagene Modell. `qwen/qwen3.5-9b` hat eine Denkphase, Hindsight schaltet sie nicht ab, und das Modell geriet beim Nachdenken über meine Gesprächszüge in eine Wiederholungsschleife. Es verbrauchte sein gesamtes Ausgabekontingent von 64.000 Token und antwortete dann nicht. Derselbe Gesprächszug, 2.038 Zeichen lang, direkt an OpenRouter geschickt:

| Einstellung | Dauer | Ergebnis |
|---|---|---|
| mit Denkphase | 1.265 s und 1.435 s | leere Antwort |
| Denkphase aus | 47 s und 47 s | gültiges JSON mit Fakten |

Über zwanzig Minuten Rechenzeit für eine leere Antwort. Und weil die Schreibaufträge einer Sitzung der Reihe nach laufen, blockierte der eine hängende gleich drei weitere.

Acht Modelle haben wir danach verglichen, je drei Wiederholungen mit zwei Eingaben. Zwei schieden schon in der Vorrunde aus, weil sie alles brav ins Englische übersetzten — deutsch Besprochenes läge dann englisch im Gedächtnis. `qwen3.5-9b` lieferte auch ohne Denkphase in einem von sechs Läufen kein gültiges JSON. Gewonnen hat `openai/gpt-4.1-mini`: sechsmal deutsch, sechsmal gültig, rund fünf Sekunden je Aufruf, etwa 0,23 US-Cent je gespeichertem Gesprächszug.

Auf dem Server war derselbe Fehler übrigens seit einer Woche da und nur nicht aufgefallen. Dort kamen die Aufrufe durch, vierzehn davon standen laut Protokoll aber länger als fünf Minuten in der Extraktion.

## Die Bremse, die keine war

Gegen ein Modell, das 64.000 Token lang im Kreis denkt, wollte ich eine Obergrenze. Noch in derselben Nacht stand sie auf Europa und auf dem Server. Der nächste Eintrag im Protokoll trägt die Überschrift „Korrektur“.

```diff
- HINDSIGHT_API_RETAIN_MAX_COMPLETION_TOKENS=4000
+ HINDSIGHT_API_RETAIN_MAX_COMPLETION_TOKENS=32000
```

Die Variable bemisst die Ausgabegrenze des Modells, und die Dokumentation rät, sie auf genau diese Grenze zu stellen — bei `gpt-4.1-mini` mit 32.768 Ausgabe-Token also auf 32.000. Ein knapper Wert schneidet das JSON ab, und ein abgeschnittenes JSON lässt den ganzen Speicherlauf scheitern, statt wenigstens die halben Fakten zu verbuchen. Als Bremse taugt sie ohnehin nicht: Bei erkannten Denkmodellen hebt Hindsight jeden Wert unter 16.000 stillschweigend auf 16.000 an. Sie greift also genau dort nicht, wo ich sie gebraucht hätte.

Zwischen Obergrenze und Korrektur lag eine Viertelstunde. Gegen ein entgleistes Modell half nur ein anderes Modell.

## Was ein Gedächtnis behält

Der erste nachgeholte Speicherlauf legte Hermanns eigene Fehlerdiagnose aus der Pannennacht ab — sie war in Teilen falsch, lag aber fortan als Tatsache in der Bank. Fünf Einträge habe ich einzeln zurückgezogen.

Am 13. September liefen auf dem Server Probeaufträge für die neuen Profile. Abends lagen 96 Erinnerungen an diesen einen Tag in Wilfrieds Bank und 25 in der des Profils Niklas, alles Testmaterial, das bei echten Aufträgen wieder aufgetaucht wäre. Gelöscht.

Zwei Tage später habe ich Wilfrieds Ablage aufgeräumt und dreizehn Dateien in ordentliche Ordner verschoben. Ein vernünftiger Vorgang, sollte man meinen. Nur standen die alten Pfade wörtlich in seinem Gedächtnis, und in zwei weiteren Banken auch. Ich habe den Umbau vollständig zurückgenommen, damit die Erinnerungen wieder stimmen. Keine halbe Stunde später habe ich Wilfrieds Bank dann doch geleert: 256 Erinnerungen, 9 Dokumente, 7.639 Verknüpfungen.

Wer bis hierhin mitgezählt hat: Ich habe die Wirklichkeit an das Gedächtnis angepasst und anschließend das Gedächtnis weggeworfen.

Am 19. September bekam ein Skill einen neuen Namen. Das Gedächtnis des zuständigen Profils umfasste inzwischen 1.414 Einträge und spielte in jede Sitzung den alten Stand ein — den alten Namen, alte Grenzwerte, eine längst gestrichene Umgehung. 51 Einträge waren von Hand ungültig zu setzen.

Nebenbei kam heraus, dass der Schalter `memory.write_approval`, mit dem man Hermes jede Gedächtnisänderung zur Freigabe vorlegen lässt, nur für die beiden Textdateien gilt. Hindsight schrieb ungefragt daran vorbei.

## 26 Versuche in einer Nacht

Auf dem Server teilten sich alle Profile einen Hindsight-Dienst und einen Port. Solange nur eines arbeitet, merkt man davon nichts.

Zwei Nächte vor der Umbenennung des Skills, in der Nacht zum 17. September, arbeiteten mehrere gleichzeitig. Vor dem Zugriff läuft eine Startprüfung: Antwortet der Dienst nicht, wird der Prozess auf dem Port beendet. Jeder beendete Dienst nimmt seine Postgres-Instanz mit, der nächste findet sie nicht und gilt selbst als nicht funktionsfähig. Die Bilanz einer Nacht: 26 Versuche, den Prozess zu beenden, 60 Postgres-Starts, 116 abgewiesene Verbindungen. Zwei Gesprächszüge gingen endgültig verloren.

Das lag an der Einrichtung, in der sich alle Profile einen Dienst teilten. Ein eigener Dienst je Profil wäre einstellbar gewesen.

## Das Update

Am 27. September zog ein Hermes-Update Europa auf eine neue Python-Umgebung um. Das Paket `hindsight-all` fehlte darin. Das Plugin wollte es nachinstallieren, der Weg dafür war inzwischen stillgelegt und stieß stattdessen den Update-Lauf erneut an — eine Schleife, in der weder Chat noch Diagnose noch die Desktop-App starteten.

Die Schleife ließ sich beheben, mit 109 nachinstallierten Paketen. Der Dienst selbst startete danach trotzdem nicht. `hermes memory status` meldete weiterhin „available“, mit Häkchen.

Heute habe ich nachgesehen, wie es um die Sache steht. Das Plugin gehört nicht mehr zu Hermes; es ist in den Plugin-Katalog ausgezogen, und der erklärt die Betriebsart `local_embedded` für Installationen wie meine ausdrücklich für nicht unterstützt. Auf dem Server zeigten die Protokolle seit dem 15. September keinen einzigen erfolgreichen Abruf, dafür Neustarts und verworfene Speichervorgänge.

Die Profile auf dem Server arbeiten Aufträge von einem Kanban-Board ab, ein Gesprächszug je Lauf. Hindsight bereitet den Abruf am Ende eines Zugs für den nächsten vor. Einen nächsten gibt es dort nicht. Über 72 Protokolle solcher Läufe: 41 Speichervorgänge, 0 Abrufe.

Die Profile dort haben wochenlang Notizen geschrieben, die keines von ihnen je gelesen hat.

## Ausgebaut

Abgeschaltet habe ich in acht Profilen, drei auf Europa und fünf auf dem Server. Danach meldete `memory status` überall „built-in only“. Weg sind die Datenbanken mit 185 und 165 MB, siebzehn `HINDSIGHT_*`-Zeilen in den Umgebungsdateien der Profile und auf dem Server 34 Pakete: fünf von Hindsight und 29, die nur Hindsight brauchte. Achtzehn davon wogen laut Paketmetadaten 3,7 GB, darunter Torch und die CUDA-Bibliotheken für Nvidia-Grafikkarten — auf einem Server, der keine hat.

Die Banken sind ohne Archiv gelöscht. Das war meine Entscheidung.

Auf Ganymed läuft Hindsight noch. Die Maschine war heute nicht erreichbar, die Abschaltung dort steht als Aufgabe an. Das Modell mit der Denkschleife habe ich auf Ganymed nie ausgetauscht — die Maschine war auch in der Nacht zum 12. September nicht erreichbar.

## Der Markt, von außen betrachtet

Bevor die Frage ganz zu den Akten ging, wollte ich wissen, ob ein anderer Anbieter es besser gemacht hätte. Drei Agenten haben Dokumentation und Quelltext aller Gedächtnis-Anbieter gelesen, die Hermes kennt: sieben mitgelieferte, zwei weitere und rund dreißig Plugins Dritter aus dem Katalog. Installiert und getestet wurde nichts, und wie gut einer davon auf Deutsch tatsächlich trifft, hat niemand gemessen. Das Ergebnis ist also eine Lektüre und keine Messung.

Drei Befunde gelten für fast alle. Bei fast keinem Anbieter klappt Deutsch ab Werk gut: Die Stichwortsuchen führen Wörter nur nach englischen Regeln oder gar nicht auf ihre Stammform zurück, „Hund“ findet dann „Hundes“ nicht. Die Listen der Füllwörter, die eine Suche überspringt, sind englisch. Meist englisch sind auch die voreingestellten Embedding-Modelle, die Texte in Zahlenvektoren übersetzen, damit die Suche inhaltlich Ähnliches findet. Das trifft Hindsight genauso — mehrsprachig ist dort nur die Extraktion. Embeddings, Stichwortsuche und der Reranker, der die Treffer nachsortiert, laufen ab Werk englisch und lassen sich umstellen. Bei mir lief die Voreinstellung. Ich hatte den Dienst wegen seiner Mehrsprachigkeit gewählt und dann den englischen Teil nie angefasst.

Zweitens hilft keiner den Kanban-Profilen. Ein solcher Lauf startet mit dem wörtlichen Auftrag `work kanban task <id>`, und genau dieser Text ist die Suchanfrage für den automatischen Abruf.

Drittens bricht Hermes den Abruf nach acht Sekunden ab, und die Liste der Eingaben, bei denen er ihn gar nicht erst versucht, ist englisch. „ja“ und „danke“ lösen also jedes Mal eine Suche aus.

In der engeren Wahl bleiben zwei, falls je Bedarf entsteht: OpenViking, ein quelloffener Gedächtnis-Server aus dem Repository `volcengine/OpenViking`, der nach dieser Lektüre als einziger Kandidat auf Deutsch ausgelegt ist, und Hindsight als eigenständiger Dienst im Container, wie es der Katalog inzwischen empfiehlt. Beides braucht einen eigenen Dienst neben Hermes. Docker ist auf meinem Server bisher nicht installiert.

## Claude Code bleibt draußen

Beide Kandidaten bringen ein Plugin für Claude Code mit, ein gemeinsames Gedächtnis für alle Agenten wäre also möglich. Ich habe es mir angesehen und gelassen.

Claude-Code-Sitzungen lesen Konfigurationsdateien und Geräteschnittstellen. Ein Gedächtnis, das Werkzeugausgaben wörtlich mitschneidet, legt alles davon in eine Datenbank und schickt es an ein Extraktionsmodell. Dazu käme eine zweite Regelquelle neben den Anweisungsdateien, ohne Diff und ohne Freigabe — genau die Bauart, die mir bei Hermes gerade drei Wochen lang Ärger gemacht hatte.

Die einzige belegte Lücke ist klein. Claude Code führt auf Europa 116 eigene Gedächtniseinträge in zehn Arbeitsordnern, und was im einen Ordner steht, sieht die Sitzung im anderen nicht. Dafür braucht es keinen Server. Regeln, die überall gelten, gehören in die globale Anweisungsdatei.

## Was ich mitnehme

1. „Available“ heißt installiert. Ob gespeichert und abgerufen wird, zeigt nur das Protokoll des Dienstes — und dort hätte ich früher nach Abrufen zählen sollen statt nach Fehlern.
2. Ein Gedächtnis ist eine zweite Wahrheit neben den Dateien. Jede Umbenennung und jede verschobene Datei macht einen Teil davon falsch, und niemand meldet das.
3. Ein automatisches Gedächtnis merkt sich zuerst das, was gerade viel Text erzeugt. Bei mir waren das Testläufe und eine falsche Fehlerdiagnose.
4. Der Vorschlag eines Einrichtungsassistenten ist ein Vorschlag. In meiner Fassung des Plugins war `qwen/qwen3.5-9b` als Vorschlag für OpenRouter fest im Quelltext eingetragen; wer die Einrichtung noch einmal durchläuft und ihn übernimmt, hat wieder das Modell mit der Denkschleife.
5. Vor der Frage, welcher Anbieter, kommt die Frage, welcher Agent überhaupt einen zweiten Gesprächszug hat.

Den Aufwand kann ich beziffern: rund 3,50 US-Dollar im Monat für die Extraktion bei fünfzig Gesprächszügen am Tag, dazu mehrere Arbeitstage Fehlersuche. Den Nutzen nicht. Mir ist kein Fall bekannt, in dem eine abgerufene Erinnerung eine Antwort verbessert hat.

## Eine Seite reicht vorerst

Bleiben die beiden Textdateien und die Sitzungssuche, eine Volltextsuche über alle früheren Gespräche eines Profils, die ohne Modellaufruf auskommt. Sie ist in allen acht Profilen eingeschaltet. Benutzt wurde sie im September laut Protokoll mindestens dreimal.

Die Dateien sind allerdings gut gefüllt. Bei drei Profilen steht `MEMORY.md` bei 92 bis 95 Prozent der Grenze. Dafür gab es heute Abend einen Plan in drei Stufen: erst aufräumen und die Grenzen anheben, dann vier Wochen messen, wo Hermann etwas vergisst, und erst bei belegten Lücken wieder ein Anbieter.

Zuerst war Stufe eins als Aufgabe für morgen erfasst. Eine Minute später habe ich entschieden, dass nicht aufgeräumt wird. Über der Grenze nimmt Hermes keine neuen Einträge an, der Agent muss dann selbst ersetzen oder zusammenfassen. Das hat er bei einem Profil im September schon zweimal von sich aus vorgeschlagen. Noch eine Minute später stellte sich heraus, dass auch der letzte verbliebene Punkt, ein Hinweis auf die Sitzungssuche, längst in jedem Systemprompt steht. Aufgabe gelöscht.

Zwei Minuten hat die Aufgabe bestanden, das ist selbst für meine Verhältnisse zügig.

Die Frage kommt wieder auf den Tisch, wenn ein Profil nachweislich etwas vergisst, das es wissen müsste, und die Sitzungssuche es nicht findet. Bis dahin steht alles, was meine Agenten über mich wissen, auf einer Seite, die ich lesen kann …
