# DFS Datenbank

## Installation
1. Downloade und installiere Node.js LTS von [nodejs.org](https://nodejs.org/de/)
2. Downloade und installiere Git von [git-scm.com](https://git-scm.com/downloads)
3. Überprüfe, dass Git, Node.js und npm richtig installiert wurden:
    * Öffne die Eingabeaufforderung (drücke `Windows` + `R`, gebe `cmd` in das Eingabefeld ein und drücke auf OK)
    * Schreibe `git --version` in die Eingabeaufforderung. Es sollte die Version 2.19 oder höher angezeigt werden
    * Schreibe `node --version` in die Eingabeaufforderung. Es sollte die Version 10.14 oder höher angezeigt werden
    * Schreibe `npm --version` in die Eingabeaufforderung. Es sollte die Version 6.4 oder höher angezeigt werden
    * Sollte git, node oder npm nicht gefunden werden können, überprüfe ob die Installationsordner der Path-Variable hinzugefügt worden sind.
    * Suche dafür im Startmenü nach `Umgebungsvariablen für dieses Konto bearbeiten`
    * Wähle unter Benutzervariablen `Path` aus und klicke auf Bearbeiten. Sollte keine Variable mit dem Namen Path existieren, erstelle ein.
    * Klicke auf Neu und füge dann jeweils den Installationspfad für den fehlenden Befehl ein. Sollte der Button Neu nicht vorhanden sein, füge den Pfad an den Ende des bisherigen Inhaltes an und trenne ihn mit einem Semikolon (;) ab. Standardmäßig sind handelt es sich um die folgenden Pfade:
      - Git: `C:\Program Files\Git\cmd`
      - Node.js und npm: `C:\Program Files\NodeJS`
4. Führe `+INSTALLATION.bat` aus. Es sollte sich ein schwarzes Konsolenfenster öffnen. Während dieses Vorgangs ist eine Internetverbindung erfordelrich. Die Installation kann je nach PC und Internetverbindung mehrere Minuten dauern. Die Installation ist beendet, sobald sich das schwarze Konsolenfenster von selbst wieder schließt. Sollten während der Installation Fehler (`ERR`) in der Konsole angezeigt werden, sollten diese kopiert und ein Adminsitrator um Hilfe gebeten werden.
5. Wenn die Installation erfolgreich abgeschlossen wurde, kann das Programm über `+START.bat` gestartet werden. Es sollte sich ein schwarzes Konsolenfenster und der Webbrowser öffnen. Das Programm läuft solange, wie die Konsole geöffnet ist.
6. Sollte versehntlich der Browser geschlossen werden, kann, solange die Konsole geöffnet ist, das Programm jederzeit durch aufrufen von `http://localhost:3303` im Browser geöffnet werden.
7. Zum Beenden der Anwendung muss die Konsole manuell geschlossen werden.

## FAQ
* **_An wen kann ich mich bei Fragen oder Problemen wenden?_**  
Daniel Högel (daniel.hoegel@hhu.de, hoegel.daniel@gmail.com)

* **_Können mehrere Personen das Programm gleichzeitig nutzen?_**  
<!-- Ja. Auf jedem PC, auf dem das Programm ausgeführt werden sollen, müssen die Schritte 1 bis 3 der Installation ausgeführt werden. Der Schritt 4 muss nur einmalig auf irgend einem PC ausgeführt werden. Die Schritte 5 bis 6 können anschließend auf jedem PC unabhängig voneinander ausgeführt werden. ACHTUNG: Änderungen auf einem PC werden nicht immer automatisch auf einem anderen PC übernommen. Dazu muss im Zweifelsfall in der Studentenliste der Aktualisierenbutton geklickt werden. Bei mehreren Änderungen an einem Datensatz wird jeweils nur der komplette Datensatz der letzten Bearbeitung übernommen.   -->
Derzeit ist dies NICHT möglich. Bevor an einem anderen PC gearbeitet wird, muss das Konsolenfenster geschlossen werden. Andernfalls überschreibt derjenige, der zuletzt die Datenbank verändert, die komplette Datenbank mit seinen Daten ohne die vorherigen Änderungen zu übernehmen. In einer zukünftigen Version soll dieses Problem behoben werden. 

* **_Wie kann ich das Programm aktualisieren?_**  
Führe dazu die Datei `+UPDATE.bat` aus. Eine Aktualisierung ist nur dann sinnvoll, wenn Sie dazu vorher von einem Adminsitrator aufgefordert wurden.

* **_Wie kann ich eine Sicherung der Datenbank erstellen?_**  
Alle Daten werden in der Datei `./server/datenbankd.json` gespeichert. Diese Datei kann jederzeit zur Sicherung an einen anderen Ort kopiert werden. Außerdem wird automatisch bei jedem Start des Programmes eine Sicherung in dem Ordner `.server/backups` angelegt.

* **_Wie kann ich die Daten manuell auslesen oder in ein anderes Programm importieren?_**  
Alle Daten liegen im Klartext in der Datei `./server/datenbank.json`. Dabei handelt es sich um eine Textdatei im JSON-Format. Diese Datei kann mit jedem normalen Texteditor wie z.B. dem Editor von Windows (notepad.exe) oder kostenloser Drittanbietersoftware wie z.B. [Notepad++](https://notepad-plus-plus.org/download/v7.6.3.html) oder [Atom](https://atom.io/) geöffnet werden. Wie das JSON-Format zu lesen ist, kann [hier](https://www.json.org/json-de.html) recherchiert werden. Bei Fragen, wie die Daten z.B. in eine Excel-Datei übertragen werden können, kann sicher das ZIM oder Google helfen.