let VERANSTALTUNG_ID = 0;

class Veranstaltung {
    constructor({ name, typ, fachID, credits }) {
        this.id = VERANSTALTUNG_ID;
        this.name = name;
        this.typ = typ;
        this.credits = credits;
        this.fachID = fachID;
        VERANSTALTUNG_ID++;
    }
}