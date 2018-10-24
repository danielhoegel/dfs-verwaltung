function __entities(state) {
    if (state === undefined) {
        console.warn('STATE is undefined');
        return null;
    }
    return state.entities;
}

export function getStudents(state) {
    return Object.values(__entities(state).students);
}

export function getStudentById(state, studentId) {
    return __entities(state).students[studentId] || null;
}

export function getStudentDetailsByStudentId(state, studentId) {
    return __entities(state).studentDetails[studentId] || null;
}

export function getStudiesByStudentId(state, studentId) {
    return __entities(state).studies[studentId] || [];
}

export function getGradesByStudentId(state, studentId) {
    return __entities(state).grades[studentId] || [];
}

export function getStudyCourses(state) {
    return Object.values(__entities(state).studyCourses);
}

export function getStudyCoursById(state, studyCourseId) {
    return __entities(state).studyCourses[studyCourseId] || null;
}

export function getStudyRegulations(state) {
    const studyRegulations = [];
    Object.values(__entities(state).studyRegulations).forEach(studyRegulationArray => {
        studyRegulations.concat(studyRegulationArray);
    });
    return studyRegulations;
}

export function getStudyRegulationsByStudyCourseId(state, studyCourseId) {
    return __entities(state).studyRegulations[studyCourseId] || [];
}

export function getStudyRegulationByIds(state, studyCourseId, studyRegulationId) {
    return getStudyRegulationsByStudyCourseId(state, studyCourseId).filter(
        studyRegulation => studyRegulation.id === studyRegulationId
    )[0];
}

export function getSubjectsByStudyRegulationId(state, studyRegulationId) {
    return __entities(state).subjects[studyRegulationId] || [];
}

export function getSubjectCoursesBySubjectId(state, subjectId) {
    return __entities(state).subjectCourses[subjectId] || [];
}