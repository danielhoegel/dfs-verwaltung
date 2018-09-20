let VERANSTALTUNG_ID = 0;

class Veranstaltung {
    constructor({ name, typ, fachID }) {
        this.id = VERANSTALTUNG_ID;
        this.name = name;
        this.typ = typ;
        this.fachID = fachID;
        VERANSTALTUNG_ID++;
    }
}