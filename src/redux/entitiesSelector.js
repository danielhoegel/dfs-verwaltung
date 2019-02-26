/**
 * BASE SELECTORS
 */

function __entities(state) {
    if (state === undefined) {
        console.warn('STATE is undefined');
        return null;
    }
    return state.entities;
}

export function getStudents(state) {
    return Object.values(__entities(state).students) || [];
}

export function getStudentById(state, studentId) {
    return __entities(state).students[studentId] || {};
}

export function getStudentInformationsByStudentId(state, studentId) {
    return __entities(state).studentInformations[studentId] || {};
}

export function getStudiesByStudentId(state, studentId) {
    return __entities(state).studies[studentId] || [];
}

export function getGrades(state) {
    return Object.values(__entities(state).grades)
        .reduce((gradeArray, grades) => {
            return grades.concat(gradeArray);
        }, []);
}

export function getGradeById(state, gradeId) {
    console.log('getGradeById', gradeId, getGrades(state));
    return getGrades(state).find(({ id }) => id === gradeId);
};

export function getGradesByStudentId(state, studentId) {
    return __entities(state).grades[studentId] || [];
}

export function getStudyCourses(state) {
    return Object.values(__entities(state).studyCourses);
}

export function getStudyCourseById(state, studyCourseId) {
    return __entities(state).studyCourses[studyCourseId] || null;
}

export function getStudyRegulations(state) {
    return Object.values(__entities(state).studyRegulations)
        .reduce((studyRegulationArray, studyRegulations) => {
            return studyRegulations.concat(studyRegulationArray);
        }, []);
}

export function getStudyRegulationsByStudyCourseId(state, studyCourseId) {
    return __entities(state).studyRegulations[studyCourseId] || [];
}

export function getStudyRegulationById(state, studyRegulationId) {
    return getStudyRegulations(state).find(({ id }) => studyRegulationId === id);
}

export function getStudyRegulationByIds(state, studyCourseId, studyRegulationId) {
    return getStudyRegulationsByStudyCourseId(state, studyCourseId).filter(
        studyRegulation => studyRegulation.id === studyRegulationId
    )[0];
}

export function getSubjects(state) {
    return Object.values(__entities(state).subjects)
        .reduce((studyRegulationsArray, studyReggulations) => {
            return studyReggulations.concat(studyRegulationsArray);
        }, []);
}

export function getSubjectsByStudyRegulationId(state, studyRegulationId) {
    return __entities(state).subjects[studyRegulationId] || [];
}

export function getSubjectCourses(state) {
    return Object.values(__entities(state).subjectCourses)
        .reduce((subjectCoursesArray, subjectCourses) => {
            return subjectCourses.concat(subjectCoursesArray);
        }, []);
}

export function getSubjectCoursesBySubjectId(state, subjectId) {
    return __entities(state).subjectCourses[subjectId] || [];
}

export const getNotesByStudentId = state => studentId => {
    return __entities(state).notes[studentId] || [];
}


/**
 * COMPOSED SELECTORS
 */

export function getFullStudent(state, studentId) {
    const student = getStudentById(state, studentId);
    const studentInformation = getStudentInformationsByStudentId(state, studentId);
    const studies = getStudiesByStudentId(state, studentId);
    const notes = getNotesByStudentId(state)(studentId);
    return {
        ...student,
        studentInformation,
        studies,
        notes
    };
}

export function getFullStudents(state) {
    const students = getStudents(state);
    const results = [];
    for (let i = 0; i < students.length; i++) {
        results.push(getFullStudent(state, students[i].id))
    }
    return results;
}