let NOTE_ID = 0;

class Note {
    constructor({ punkte, veranstaltungID }) {
        this.id = NOTE_ID;
        this.veranstaltungID = veranstaltungID;
        this.punkte = punkte;
        this.bestanden = this.punkte >= 4;
        NOTE_ID++;
    }
}