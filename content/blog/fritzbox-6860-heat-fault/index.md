---
title: "Keine SIM-Karte gefunden"
date: 2026-10-02
draft: false
description: "Eine FRITZ!Box 6860 5G, die nur mit Ventilator durchläuft, ein Austausch über die Herstellergarantie — und eine SIM-Karte, die ich gleich mit eingeschickt habe."
tags: ["fritzbox", "5g", "mobilfunk", "heimnetz", "hardware", "garantie", "erfahrungsbericht"]
featured_image: ""
toc: true
---

Ein Router, auf den ein Ventilator gerichtet ist, läuft. Derselbe Router ohne Ventilator läuft auch — ungefähr zweieinhalb Stunden. Danach meldet er, dass er seine SIM-Karte nicht mehr findet, und das Internet ist weg. Für diese Erkenntnis habe ich einen ganzen Tag im August gebraucht.

<!--more-->

## Die Meldung

Seit Anfang August hängt mein Heimnetz nicht mehr am DSL, sondern am Mobilfunk. Die FRITZ!Box 6860 5G hatte ich am 24. Juli gekauft, am 28. Juli wurde sie geliefert, und am 3. August stand sie an der Stelle der alten 7690. Am selben Abend brach die Verbindung innerhalb von sechzehn Minuten dreimal ab.

Das ging dann über Wochen so. Im Ereignisprotokoll der Box stand jedes Mal dasselbe:

```text
Es wurde keine SIM-Karte gefunden.
```

Die SIM-Karte steckte. Sie steckte vorher, und sie steckte nachher.

## Ein Tag mit Ventilator

Am 24. August habe ich es dann mit Claude Code zusammen ordentlich gemacht. Der Versuchsaufbau bestand aus einem Ventilator und einer Uhr.

| Phase | Ventilator | Ergebnis |
|---|---|---|
| ab dem Vormittag, fünfeinhalb Stunden | an | kein einziger Abbruch |
| danach gut zweieinhalb Stunden | aus | die Box heizt sich auf, noch läuft alles |
| die halbe Stunde darauf | aus | fünf Abbrüche, zweimal „keine SIM-Karte gefunden“ |
| danach | an | Ruhe |

Dass es am Empfang liegt, ließ sich gleich mit ausschließen. Während der Abbrüche lag der Empfangspegel bei −95 dBm (je näher an null, desto besser), danach wechselte die Box auf eine Funkzelle mit −105 dBm, also auf die schlechtere, und lief unter dem Ventilator trotzdem durch.

Der schönste Beleg war aber ein anderer. Kurz nach dem letzten Abbruch lief die Box seit 8 Stunden und 56 Minuten, das Mobilfunkmodul in ihr aber erst seit 805 Sekunden. Es hatte sich also im laufenden Gerät selbst neu gestartet — und zwar genau dann, als die Verbindung weg war.

## Wo die Box ihre Temperatur versteckt

Blieb die Frage, wie warm so ein Gerät eigentlich wird. Über die Schnittstelle TR-064, über die sich eine FRITZ!Box sonst bereitwillig auslesen lässt, bekommt man dazu nichts: Der Mobilfunkdienst kennt sechs Abfragen, und keine liefert eine Temperatur.

Die Werte stehen in den Supportdaten, die man unter *Diagnose* von Hand exportiert. Für das Funkmodul sieht das so aus:

```text
temperature=720
```

Das sind Zehntelgrad, also 72,0 °C. Daneben gibt es einen Abschnitt `sensors` mit Prozessor, Platine und Ethernet-Baustein und, solange die Box selbst funkt, zwei WLAN-Sensoren. Eine Historie führt das Gerät nicht — jeder Export ist eine Momentaufnahme. Wer einen Verlauf will, exportiert oft.

| Export | Ventilator | Funkmodul | CPU | WLAN (wärmerer Sensor) |
|---|---|---|---|---|
| 03.08. | nicht notiert | 72,0 °C | 79,0 °C | 81 °C |
| 24.08. | seit 7 Minuten an | 54,0 °C | 60,0 °C | 62 °C |
| 24.08. | seit 54 Minuten an | 51,0 °C | 58,0 °C | 60 °C |
| 26.08. | aus | 77,0 °C | 80,0 °C | 81 °C |
| 29.08. | aus | 76,0 °C | 77,0 °C | 80 °C |

Rund zwanzig Grad Unterschied, je nachdem, ob ein Ventilator auf das Gehäuse bläst.

Zwei Dinge habe ich dabei nebenbei gelernt. Das Ereignisprotokoll der Box überlebt keinen Neustart, solange man das nicht unter *System → Ereignisse* eigens einschaltet. Und das Feld `SerialNumber`, das im Netz gern als Weg zur Seriennummer empfohlen wird, enthält bei diesem Gerät die MAC-Adresse. Die Seriennummer steht auf dem Typenschild und in den Supportdaten, sonst nirgends.

## Der Weg zum Ticket

Die Rückgabefrist bei Amazon war am 12. August abgelaufen, Verkäufer war allerdings der Hersteller selbst. In den ersten zwölf Monaten gilt die Gewährleistung mit der Vermutung, dass ein Mangel von Anfang an da war. Also ein Schreiben an AVM, mit Verlauf, Laufzeiten und Temperaturen.

Der Anfang war holprig, denn das Supportformular, auf das die Serviceseite der 6860 verweist, bot mir bei jedem Aufruf nur FRITZ!Powerline zur Auswahl an. Ich hatte dafür sofort eine Erklärung parat — das liegt bestimmt daran, dass sich im Mobilfunknetz viele Kunden eine öffentliche Adresse teilen. Claude Code hat widersprochen: Eine geteilte IP-Adresse sucht keine Produkte aus. Das stimmt leider.

Die Anfrage ging deshalb am Abend des 24. August per E-Mail raus, an die Adresse aus einem früheren Vorgang. Zurück kam eine automatische Antwort, über diese Adresse sei kein Support möglich. Am nächsten Morgen habe ich darauf geantwortet und das Formular erwähnt, und fünf Minuten später hatte der Vorgang eine Ticketnummer.

Danach kam zwei Wochen lang nichts.

## Ich war nicht der Erste

Anfang September kam mir der Verdacht, es könnte am WLAN liegen. Die beiden WLAN-Sensoren gehörten in jedem Export zu den wärmsten, das klang doch nach der Ursache. Also habe ich die alte 7690 wieder angeschlossen, damit sie das WLAN übernimmt und die 6860 nur noch das Internet macht.

Der erste Anlauf, die 7690 als schlichten IP-Client anzuhängen, endete damit, dass beide WLAN-Netze beim Verbinden die Weboberfläche der 6860 zeigten und sonst nichts. Der zweite Anlauf über das Mesh von AVM hat funktioniert. Seit dem 4. September funkt die 6860 nicht mehr selbst.

Entschieden hat das den Verdacht nicht, denn die Abbrüche waren Abbrüche des Mobilfunks, und das Modul, das sich neu gestartet hatte, war das Mobilfunkmodul. Dass alle Sensoren im selben Gehäuse gemeinsam steigen und fallen, passt zu beiden Lesarten.

Die Recherche am Abend des 4. September ergab dann, dass ich mir die Mühe mit der Uhr fast hätte sparen können. Im [ComputerBase-Forum](https://www.computerbase.de/forum/threads/fritz-box-6860-5g-verliert-verbindung-zur-sim-karte-waehrend-des-betriebs.2243893/) und im [IP-Phone-Forum](https://www.ip-phone-forum.de/threads/fritz-box-6860-5g-verliert-wiederkehrend-mobilfunkverbindung.322652/) beschreiben andere Besitzer dasselbe Muster: Die Box wird warm, meldet die fehlende SIM-Karte und verliert die Verbindung. Im IP-Phone-Forum wird dazu eine Antwort aus der Entwicklung von AVM vom 4. Juli 2025 zitiert, nach der das Problem bekannt sei.

In der [Versionshistorie](https://download.avm.de/fritzbox/fritzbox-6860-5g/deutschland/fritz.os/info_en.txt) steht dreimal ein fast gleichlautender Eintrag über neue Software für das Mobilfunk-Modem mit verbesserter Stabilität — in FRITZ!OS 8.03, 8.20 und 8.25. Meine Box lief die ganze Zeit auf 8.25, erschienen am 9. Juli 2026. Ein Update war es also nicht.

## Drei Stunden

In der Zwischenzeit fiel die Box weiter aus. Am 6. September habe ich sie nach einem weiteren Ausfall abkühlen lassen, neu gestartet und zweimal Supportdaten gezogen. Elf Minuten nach dem Kaltstart meldete das Mobilfunkmodul schon wieder 65 °C, und in den vier Minuten zwischen den beiden Exporten kamen sechs Grad dazu. Der Startzähler der Box, der jeden Neustart mitzählt, stand nach fünf Wochen bei 38. Das alles in einem Wohnraum mit 22 bis 26 °C — die Box ist laut Hersteller für −10 bis 40 °C gebaut.

Am Morgen des 8. September habe ich nachgefasst, mit diesen Zahlen und mit der Ankündigung, andernfalls vom Kauf zurückzutreten.

Drei Stunden später war die Antwort geschrieben. AVM bot an, das Gerät im Rahmen der freiwilligen fünfjährigen Herstellergarantie kostenlos zu prüfen und gegebenenfalls zu tauschen; dafür sei innerhalb von drei Wochen ein Formular auszufüllen. Diese Garantie gilt zusätzlich zur gesetzlichen Gewährleistung, auf die ich mich berufen hatte.

Angekommen ist diese Mail bei mir allerdings nicht. Bemerkt hat das zuerst der Support: Am nächsten Nachmittag kam die Nachfrage, ob ich das Angebot vom Vortag gesehen hätte, ich möge doch einmal im Spam-Ordner nachsehen. Da war es auch nicht. Ich habe um eine zweite Zustellung gebeten, und am Morgen darauf lag das Angebot noch einmal im Postfach.

Von da an lag es an mir. Das Formular habe ich erst am 18. September ausgefüllt, und das Paket ging noch eine Woche später raus. Der Einsendeschein kündigte drei bis fünf Werktage Bearbeitung an, das Porto für den Hinweg zahlt man selbst.

## Keine SIM-Karte gefunden, zweiter Teil

Am 25. September habe ich die Box eingepackt und zur Post gebracht.

Mitten in der Nacht fiel mir ein, was noch in der Box steckte.

Die SIM-Karte.

Ein Gerät, das mir wochenlang erzählt hat, es finde seine SIM-Karte nicht, habe ich mit SIM-Karte verschickt. Am nächsten Morgen, einem Samstag, habe ich AVM deswegen angeschrieben — es war mir ehrlich gesagt unangenehm.

Am Montag kam ein einziger Satz zurück:

> wenn möglich werden wir Ihnen die SIM Karte mit dem Austauschgerät zurücksenden.

Es war möglich. Am Mittwoch, dem 30. September, ging das Austauschgerät in den Versand, drei Werktage nach meinem Gang zur Post, und die SIM-Karte lag mit im Paket.

Das Heimnetz lief in der Woche ohne Box über mein Mobiltelefon, das ich an die alte 7690 angeschlossen hatte.

Zwei Wochen Schweigen am Anfang, danach hat jede Antwort höchstens einen Werktag gebraucht. Und niemand hat mir vorgerechnet, dass zwischen dem Angebot und meinem Paket gut zwei Wochen lagen und dass in dem Paket mehr steckte als bestellt.

## Die Neue

Heute habe ich das Austauschgerät aufgebaut. Es ist eine FRITZ!Box 6860 5G v2, und sie meldet sich mit der Firmware `314.08.25`.

Von selbst lief danach erst einmal wenig. Die neue Box vergibt ein anderes Adressnetz als die alte, und alle festen Zuweisungen waren wieder leer. Die Hue Bridge war nicht erreichbar, also habe ich die Konfiguration geändert, woraufhin die Alexa-Geräte nicht mehr erreichbar waren und einzeln neu eingerichtet werden wollten. Am Abend kamen noch die feste Adresse für den Heimserver, acht neue Firewall-Regeln auf meinem Rechner Ganymed und die Lichtsteuerung dran, die die Bridge unter ihrer alten Adresse suchte.

Das war dieselbe Übung wie Anfang August, nur diesmal mit Vorkenntnissen.

Wie warm die Neue wird, steht in ihren Supportdaten. Ich habe noch nicht nachgesehen, aber sie ist noch nicht ausgefallen …
