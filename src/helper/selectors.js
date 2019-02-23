import { getGrades, getSubjectCourses, getSubjects } from '../redux/entitiesSelector';

export const getNotenData = state => getGrades(state);
export const getFaecherData = state => getSubjects(state);
export const getVeranstaltungenData = state => getSubjectCourses(state);


/**
 * FÄCHER
 */

export const getFaecherDataForUEAndSemester = state => (ue, semester) => {
    return getFaecherData(state).filter(fach =>
        fach.ue === ue &&
        fach.semester === semester
    );
};

export function getFaecherGroupedByTyp(state) {
    const result = {de: [], fr: []};
    getFaecherData(state).forEach(fach => {
        result[fach.type].push(fach);
    });
    return result;
}

export function getFaecherForStudyCourseGroupedBySemesterAndTyp(state, studyCourseId) {
    const groupedFaecher = {};

    getFaecherData(state).forEach(fach => {
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

export const getVeranstaltungenForFach = state => (fachId = null) => {
    const veranstaltungen = getVeranstaltungenData(state);
    return veranstaltungen.filter(v => v.subjectId === fachId);
    // return fachId
    //     ? veranstaltungen.filter(v => v.fachID === fachId)
    //     : veranstaltungen;
};


/**
 * NOTEN
 */

export function getNoteForId(state, noteId) {
     return getNotenData(state).filter(note => note.id === noteId)[0];
 }

export const getNotenForStudentAndVeranstaltung = state => (studentId, veranstaltungId) => {
    return getNotenData(state).filter(note =>
        note.studentId === studentId &&
        note.subjectCourseId === veranstaltungId
    );
};

export const getPunkteForVeranstaltungAndStudent = state => (veranstaltungID, studentID) => {
    const noten = getNotenForStudentAndVeranstaltung(state)(studentID, veranstaltungID);
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
};
