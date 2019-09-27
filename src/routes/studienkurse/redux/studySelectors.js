import {
    getStudyCourses,
    getStudyRegulationsByStudyCourseId,
    getSubjectsByStudyRegulationId,
    getSubjectCoursesBySubjectId,
    getStudyRegulationByIds,
    getStudyRegulationById,
    getStudyCourseById,
} from '../../../redux/entitiesSelector';

export function getStudyCoursesWithRegulations(state) {
    return getStudyCourses(state).map(studyCourse => ({
        ...studyCourse,
        studyRegulations: getStudyRegulationsByStudyCourseId(state, studyCourse.id)
    }));
}

export function getStudyRegulationWithStudyCourse(state, studyCourseId, studyRegulationId) {
    const studyRegulation = getStudyRegulationByIds(state, studyCourseId, studyRegulationId);
    studyRegulation.studyCourse = getStudyCourseById(state, studyRegulation.studyCourseId);
    return studyRegulation;
}

export function getStudyRegulationByIdWithStudyCourse(state, studyRegulationId) {
    const studyRegulation = getStudyRegulationById(state, studyRegulationId);
    studyRegulation.studyCourse = getStudyCourseById(state)(studyRegulation.studyCourseId);
    return studyRegulation;
}

export function getSubjectsWithSubjectCourses(state, studyRegulationId) {
    return getSubjectsByStudyRegulationId(state, studyRegulationId).map(subject => ({
        ...subject,
        subjectCourses: getSubjectCoursesBySubjectId(state, subject.id)
    }));
}
