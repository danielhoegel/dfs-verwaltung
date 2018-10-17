module.exports = () => {
    return {
        students: require('./tables/students.json'),
        studentInformations: require('./tables/studentInformations.json'),
        studies: require('./tables/studies.json'),
        subjects: require('./tables/subjects.json'),
        subjectCourses: require('./tables/subjectCourses.json'),
        grades: require('./tables/grades.json'),
        studyCourses: require('./tables/studyCourses.json'),
        studyRegulations: require('./tables/studyRegulations.json'),
        gradingSystems: require('./tables/gradingSystems.json'),
    };
}
