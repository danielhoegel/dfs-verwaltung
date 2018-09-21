let STUDENT_ID = 0;

class Student {
    constructor({ name, jahrgang, studienkurs }) {
        this.id = STUDENT_ID;
        this.name = name;
        this.jahrgang = jahrgang;
        this.studienkurs = studienkurs;
        
        STUDENT_ID++;
    }
}