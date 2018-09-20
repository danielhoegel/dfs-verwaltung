let FACH_ID = 0;

class Fach {
    constructor({ name, semester }) {
        this.id = FACH_ID;
        this.name = name;
        this.semester = semester;
        FACH_ID++;
    }
}