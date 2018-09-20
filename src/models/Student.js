let STUDENT_ID = 0;

class Student {
    constructor({ name }) {
        STUDENT_ID++;
        this.name = name;
        this.id = STUDENT_ID;
    }
}