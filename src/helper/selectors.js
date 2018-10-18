import studentenData from '../data/studenten';
import notenData from '../data/grades.json';
import faecherData from '../data/subjects.json';
import veranstaltungenData from '../data/subjectCourses.json';
// import studyRegulationsData from '../data/studyRegulations.json';
// import studyCoursesData from '../data/studyCourses.json';

export const getStudentenData = () => studentenData;
export const getNotenData = () => notenData;
export const getFaecherData = () => faecherData;
export const getVeranstaltungenData = () => veranstaltungenData;


/**
 * STUDENTEN
 */

export function getStudentForId(id) {
    return studentenData.filter(student =>
        student.id === parseInt(id, 10)
    )[0];
}


/**
 * FÄCHER
 */

export function getFachForVeranstaltung(veranstaltungId) {
    const veranstaltung = getVeranstaltungForId(veranstaltungId);
    return getFaecherData().filter(fach =>
        fach.id === veranstaltung.subjectId
    )[0];
}

export function getFaecherDataForUEAndSemester(ue, semester) {
    return getFaecherData().filter(fach =>
        fach.ue === ue &&
        fach.semester === semester
    );
}

export function getFaecherGroupedByTyp() {
    const result = {de: [], fr: []};
    getFaecherData().forEach(fach => {
        result[fach.type].push(fach);
    });
    return result;
}

export function getFaecherForStudyCourseGroupedBySemesterAndTyp(studyCourseId) {
    const groupedFaecher = {};

    getFaecherData().forEach(fach => {
        if (fach.studyCourseId === studyCourseId) {
            if (groupedFaecher[fach.semester]) {
                if (groupedFaecher[fach.semester][fach.type]) {
                    groupedFaecher[fach.semester][fach.type].push(fach);
                } else {
                    groupedFaecher[fach.semester][fach.type] = [fach];
                }
            } else {
                groupedFaecher[fach.semester] = {
                    [fach.type]: [fach]
                };
            }
        }
    });

    return groupedFaecher;
}


/**
 * VERANSTALTUNGEN
 */

export function getVeranstaltungForId(veranstaltungId) {
    return getVeranstaltungenData().filter(v =>
        v.id === veranstaltungId
    )[0];
}

export function getVeranstaltungenForFach(fachId = null) {
    const veranstaltungen = getVeranstaltungenData();
    return veranstaltungen.filter(v => v.subjectId === fachId);
    // return fachId
    //     ? veranstaltungen.filter(v => v.fachID === fachId)
    //     : veranstaltungen;
}


/**
 * NOTEN
 */

export function getNoteForId(noteId) {
     return getNotenData().filter(note => note.id === noteId)[0];
 }

export function getNotenForStudentAndVeranstaltung(studentId, veranstaltungId) {
    return getNotenData().filter(note =>
        note.studentId === studentId &&
        note.subjectCourseId === veranstaltungId
    );
}

export function getPunkteForVeranstaltungAndStudent(veranstaltungID, studentID) {
    const noten = getNotenForStudentAndVeranstaltung(veranstaltungID, studentID);
    if (noten.length > 1) {
        let lastVersuch = noten[0];
        noten.forEach(note => {
            if (note.try > lastVersuch.try) {
                lastVersuch = note;
            }
        });
        return lastVersuch.grade;
    } else if (noten.length > 0){
        return noten[0].grade;
    } else {
        return null;
    }
}
