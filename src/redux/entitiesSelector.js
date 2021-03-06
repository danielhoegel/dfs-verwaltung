import { groupItemsByKey } from '../helper/helper';

/**
 * BASE SELECTORS
 */

function __entities(state) {
    if (state === undefined) {
        // eslint-disable-next-line no-console
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

export function getStudies(state) {
    return Object.values(__entities(state).studies)
        .reduce((accumulator, studies) => accumulator.concat(studies), [])
        .sort((a, b) => b.year - a.year);
}

export function getStudiesByStudentId(state, studentId) {
    const studies = __entities(state).studies[studentId];
    return studies
        ? studies.sort((a, b) => b.year - a.year)
        : [];
}

export function getStudyById(state, studyId) {
    return getStudies(state).find(({ id }) => id === studyId);
}

export function getGrades(state) {
    return Object.values(__entities(state).grades)
        .reduce((accumulator, grades) => {
            return accumulator.concat(grades);
        }, []);
}

export function getGradeById(state, gradeId) {
    return getGrades(state).find(({ id }) => id === gradeId);
}

export function getGradesByStudyId(state, studyId) {
    const grades = __entities(state).grades[studyId] || [];
    return grades;
}

export function getGradesByStudentId(state, studentId) {
    const studies = getStudiesByStudentId(state, studentId);
    return studies.reduce((accumulator, study) => {
        const grades = getGradesByStudyId(state, study.id);
        return accumulator.concat(grades);
    }, []);
}

export const getGradesForStudentAndSubjectCourse = state => (studentId, subjectCourseId) => {
    const grades = getGradesByStudentId(state, studentId).filter(grade =>
        grade.subjectCourseId === subjectCourseId
    );
    return grades;
};

export function getStudyCourses(state) {
    return Object.values(__entities(state).studyCourses) || [];
}

export const getStudyCourseById = state => studyCourseId => {
    return __entities(state).studyCourses[studyCourseId] || {};
};

export function getStudyRegulations(state) {
    const studyRegulations = Object.values(__entities(state).studyRegulations)
        .reduce((accumulator, __studyRegulations) => {
            return accumulator.concat(__studyRegulations);
        }, []);
    return studyRegulations.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getStudyRegulationsByStudyCourseId(state, studyCourseId) {
    return __entities(state).studyRegulations[studyCourseId] || [];
}

export function getStudyRegulationById(state, studyRegulationId) {
    return getStudyRegulations(state).find(({ id }) => studyRegulationId === id) || {};
}

export function getStudyRegulationByIds(state, studyCourseId, studyRegulationId) {
    return getStudyRegulationsByStudyCourseId(state, studyCourseId).filter(
        studyRegulation => studyRegulation.id === studyRegulationId
    )[0];
}

export function getSubjects(state) {
    return Object.values(__entities(state).subjects)
        .reduce((accumulator, studyRegulations) => {
            return accumulator.concat(studyRegulations);
        }, []);
}

export function getSubjectsByStudyRegulationId(state, studyRegulationId) {
    return __entities(state).subjects[studyRegulationId] || [];
}

export function getSubjectCourses(state) {
    return Object.values(__entities(state).subjectCourses)
        .reduce((accumulator, subjectCourses) => {
            return accumulator.concat(subjectCourses);
        }, []);
}

export function getSubjectCoursesBySubjectId(state, subjectId) {
    return __entities(state).subjectCourses[subjectId] || [];
}

export const getNotesByStudentId = state => studentId => {
    return __entities(state).notes[studentId] || [];
};


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
        results.push(getFullStudent(state, students[i].id));
    }
    return results;
}

export function getSubjectsByStudyRegulationIdGroupedBySemesterAndType(state, studyRegulationId) {
    const subjects = getSubjectsByStudyRegulationId(state, studyRegulationId);
    const groupedSubjects = groupItemsByKey(subjects, 'semester');
    Object.keys(groupedSubjects).forEach(semester => {
        groupedSubjects[semester] = groupItemsByKey(groupedSubjects[semester], 'type');
    });
    return groupedSubjects;
}

export function getSubjectsWithStudyCourseAndStudyRegulation(state) {
    return getSubjects(state).map(subject => ({
        ...subject,
        studyCourse: getStudyCourseById(state)(subject.studyCourseId),
        studyRegulation: getStudyRegulationById(state, subject.studyRegulationId)
    }));
}
