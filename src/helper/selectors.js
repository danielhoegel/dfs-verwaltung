import {
    getSubjects,
    getGradesForStudentAndSubjectCourse,
    getSubjectCoursesBySubjectId
} from '../redux/entitiesSelector';


// TODO: rename + move to entitesSelector
export const getFaecherDataForUEAndSemester = state => (ue, semester) => {
    return getSubjects(state).filter(fach =>
        fach.ue === ue &&
        fach.semester === semester
    );
};


// TODO: rename + move to entitesSelector
export function getFaecherGroupedByTyp(state) {
    const result = { de: [], fr: []};
    getSubjects(state).forEach(fach => {
        result[fach.type].push(fach);
    });
    return result;
}


// TODO: replace with getSubjectCoursesBySubjectId
export const getVeranstaltungenForFach = (state) => (subjectId) => {
    return getSubjectCoursesBySubjectId(state, subjectId);
};


// TODO: rename + move to entitesSelector
export const getPunkteForVeranstaltungAndStudent = state => (veranstaltungID, studentID) => {
    const noten = getGradesForStudentAndSubjectCourse(state)(studentID, veranstaltungID);
    if (noten.length > 1) {
        let lastVersuch = noten[0];
        noten.forEach(note => {
            if (note.try > lastVersuch.try) {
                lastVersuch = note;
            }
        });
        return lastVersuch.grade;
    }

    if (noten.length > 0) {
        return noten[0].grade;
    }

    return null;
};
