import studentenData from '../data/studenten';
import notenData from '../data/noten';
import faecherData from '../data/faecher';
import veranstaltungenData from '../data/veranstaltungen';

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
        fach.id === veranstaltung.fachID
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
        result[fach.typ].push(fach);
    });
    return result;
}

export function getFaecherGroupedBySemesterAndTyp() {
    const groupedFaecher = {};

    getFaecherData().forEach(fach => {
        if (groupedFaecher[fach.semester]) {
            if (groupedFaecher[fach.semester][fach.typ]) {
                groupedFaecher[fach.semester][fach.typ].push(fach);
            } else {
                groupedFaecher[fach.semester][fach.typ] = [fach];
            }
        } else {
            groupedFaecher[fach.semester] = {
                [fach.typ]: [fach]
            };
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
    return veranstaltungen.filter(v => v.fachID === fachId);
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

export function getNotenForStudentAndVeranstaltung(studentID, veranstaltungID) {
    return getNotenData().filter(note =>
        note.studentID === studentID &&
        note.veranstaltungID === veranstaltungID
    );
}

export function getPunkteForVeranstaltungAndStudent(veranstaltungID, studentID) {
    const noten = getNotenForStudentAndVeranstaltung(veranstaltungID, studentID);
    if (noten.length > 1) {
        let lastVersuch = noten[0];
        noten.forEach(note => {
            if (note.versuch > lastVersuch.versuch) {
                lastVersuch = note;
            }
        });
        return lastVersuch.punkte;
    } else if (noten.length > 0){
        return noten[0].punkte;
    } else {
        return null;
    }
}
