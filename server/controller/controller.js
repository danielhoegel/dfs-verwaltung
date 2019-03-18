const db = require('../utils/db');


/**
 * DELETE STUDENT
 * cascade: STUDIES->(GRADES)
 */
function deleteStudent(id, write = true) {
    // delete student
    db.get('students').find({ id }).remove();

    // delete studies for student
    const studies = db.get('studies').filter({ studentId: id}).value();
    studies.forEach(study => {
        deleteStudy(study.id, false);
    });

    if (write) {
        db.write();
    }
}


/**
 * DELETE STUDY
 * cascade: GRADES
 */
function deleteStudy(id, write = true) {
    // delete study
    db.get('studies').find({ id }).remove();

    // delete grades for study
    db.get('grades').filter({ studyId: id}).remove();

    if (write) {
        db.write();
    }
}


/**
 * DELETE STUDY_COURSE
 * cascade: STUDY_REGULATIONS->(STUDIES, SUBJECTS->(SUBJECT_COURSES->(GRADES)))
 */
function deleteStudyCourse(id, write = true) {
    // delete studyCourse
    db.get('studyCourses').find({ id }).remove();

    // delete studyRegulations for studyCourse
    const studyRegulations = db.get('studyRegulations').filter({ studyCourseId: id }).value();
    studyRegulations.forEach(studyRegulation => {
        deleteStudyRegulation(studyRegulation.id, false);
    });

    if (write) {
        db.write();
    }
}


/**
 * DELETE STUDY_REGULATION
 * cascade: STUDIES, SUBJECTS->(SUBJECT_COURSES->(GRADES))
 */
function deleteStudyRegulation(id, write = true) {
    // delete studyRegulation
    db.get('studyRegulations').find({ id }).remove();

    // delete studies for studyRegulation
    db.get('studies').filter({ studyRegulationId: id}).remove();

    // delete subjects for studyRegulation
    const subjects = db.get('subjects').filter({ studyRegulationId: id }).value();
    subjects.forEach(subject => {
        deleteSubject(subject.id, false)
    });

    if (write) {
        db.write();
    }
}


/**
 * DELETE SUBJECT
 * cascade: SUBJECT_COURSES->(GRADES)
 */
function deleteSubject(id, write = true) {
    // delete subject
    db.get('subject').remove({ id });

    // delete subjectCourses
    const subjectsCourses = db.get('subjectCourses').filter({ subjectId: id }).value();
    subjectsCourses.forEach(subjectCourse => {
        deleteSubjectCourse(subjectCourse.id, false);
    })

    if (write) {
        db.write();
    }
}


/**
 * DELETE SUBJECT_COURSE
 * cascade: GRADES
 */
function deleteSubjectCourse(id, write = true) {
    // delete subjectCourse
    subjectsCourse = db.get('subjectCourses').find({ id }).remove();

    // delete grades for subjectCourse
    db.get('grades').filter({ subjectCourseId: id }).remove();

    if (write) {
        db.write();
    }
}

module.exports = {
    delete: {
        student: deleteStudent,
        study: deleteStudy,
        studyCourse: deleteStudyCourse,
        studyRegulation: deleteStudyRegulation,
        subject: deleteSubject,
        subjectCourse: deleteSubjectCourse,
    }
};
