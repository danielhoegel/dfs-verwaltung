const entities = [
    {
        singular: 'student',
        plural: 'students',
        typeSingular: 'STUDENT',
        typePlural: 'STUDENTS',
        isArray: false,
        key: 'id'
    },
    {
        singular: 'studentInformation',
        plural: 'studentInformations',
        typeSingular: 'STUDENT_INFORMATION',
        typePlural: 'STUDENT_INFORMATIONS',
        isArray: false,
        key: 'studentId'
    },
    {
        singular: 'study',
        plural: 'studies',
        typeSingular: 'STUDY',
        typePlural: 'STUDIES',
        isArray: true,
        key: 'studentId'
    },
    {
        singular: 'grade',
        plural: 'grades',
        typeSingular: 'GRADE',
        typePlural: 'GRADES',
        isArray: true,
        key: 'studyId'
    },
    {
        singular: 'studyCourse',
        plural: 'studyCourses',
        typeSingular: 'STUDY_COURSE',
        typePlural: 'STUDY_COURSES',
        isArray: false,
        key: 'id'
    },
    {
        singular: 'studyRegulation',
        plural: 'studyRegulations',
        typeSingular: 'STUDY_REGULATION',
        typePlural: 'STUDY_REGULATIONS',
        isArray: true,
        key: 'studyCourseId'
    },
    {
        singular: 'subject',
        plural: 'subjects',
        typeSingular: 'SUBJECT',
        typePlural: 'SUBJECTS',
        isArray: true,
        key: 'studyRegulationId'
    },
    {
        singular: 'subjectCourse',
        plural: 'subjectCourses',
        typeSingular: 'SUBJECT_COURSE',
        typePlural: 'SUBJECT_COURSES',
        isArray: true,
        key: 'subjectId'
    },
    {
        singular: 'note',
        plural: 'notes',
        typeSingular: 'NOTE',
        typePlural: 'NOTES',
        isArray: true,
        key: 'studentId'
    }
];

export default entities;

export function getEntityByKey(key, value) {
    return entities.filter(entity => entity[key] === value);
}

