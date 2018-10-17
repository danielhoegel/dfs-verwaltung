export const fetchStudyRegulations = () => ({
    type: 'FETCH_STUDY_REGULATIONS',
    request: { url: '/studyRegulations?_sort=date&_order=desc' }
});

export const fetchStudyRegulationForId = (regulationId) => ({
    type: 'FETCH_STUDY_REGULATION',
    request: { url: `/studyRegulations/${regulationId}?_expand=studyCourse`}
});

export const fetchStudyCourses = () => ({
    type: 'FETCH_STUDY_COURES',
    request: { url: '/studyCourses' }
});

export const fetchStudyCoursesWithRegulations = () => ({
    type: 'FETCH_STUDY_COURSE_WITH_REGULATIONS',
    request: { url: '/studyCourses?_embed=studyRegulations' }
});

export const fetchSubjectsWithSubjectCoursesForStudyRegulation = (regulationId) => ({
    type: 'FETCH_SUBJECT_WITH_SUBJECT_COURSES_FOR_STUDY_REGULATION',
    request: { url: '/studyRegulations/2/subjects?_embed=subjectCourses&_expand=studyRegulation&_expand=studyCourse&_sort=semester,type,title,' }
})

