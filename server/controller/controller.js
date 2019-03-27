const db = require('../utils/db');
const { getId } = require('../utils/utils');


/**
 * DELETE STUDENT
 * cascade: STUDENT_INFORMATIONS, STUDIES->(GRADES)
 */
function deleteStudent(_id) {
    const id = getId(_id);
    // delete student
    db.get('students').remove({ id }).write();

    // delete studentInformations
    db.get('studentInformations').remove({ studentId: id }).write();

    // delete studies for student
    const studies = db.get('studies').filter({ studentId: id }).value();
    studies.forEach(study => {
        deleteStudy(study.id);
    });
}


/**
 * DELETE STUDY
 * cascade: GRADES
 */
function deleteStudy(_id) {
    const id = getId(_id);
    // delete study
    db.get('studies').remove({ id }).write();

    // delete grades for study
    db.get('grades').remove({ studyId: id }).write();
}


/**
 * DELETE STUDY_COURSE
 * cascade: STUDY_REGULATIONS->(STUDIES, SUBJECTS->(SUBJECT_COURSES->(GRADES)))
 */
function deleteStudyCourse(_id) {
    const id = getId(_id);
    // delete studyCourse
    db.get('studyCourses').remove({ id }).write();

    // delete studyRegulations for studyCourse
    const studyRegulations = db.get('studyRegulations').filter({ studyCourseId: id }).value();
    studyRegulations.forEach(studyRegulation => {
        deleteStudyRegulation(studyRegulation.id);
    });
}


/**
 * DELETE STUDY_REGULATION
 * cascade: STUDIES, SUBJECTS->(SUBJECT_COURSES->(GRADES))
 */
function deleteStudyRegulation(_id) {
    const id = getId(_id);
    // delete studyRegulation
    db.get('studyRegulations').remove({ id }).write();

    // delete studies for studyRegulation
    db.get('studies').remove({ studyRegulationId: id }).write();

    // delete subjects for studyRegulation
    const subjects = db.get('subjects').filter({ studyRegulationId: id }).value();
    subjects.forEach(subject => {
        deleteSubject(subject.id);
    });
}


/**
 * DELETE SUBJECT
 * cascade: SUBJECT_COURSES->(GRADES)
 */
function deleteSubject(_id) {
    const id = getId(_id);
    // delete subject
    db.get('subjects').remove({ id }).write();

    // delete subjectCourses
    const subjectsCourses = db.get('subjectCourses').filter({ subjectId: id }).value();
    subjectsCourses.forEach(subjectCourse => {
        deleteSubjectCourse(subjectCourse.id);
    });
}


/**
 * DELETE SUBJECT_COURSE
 * cascade: GRADES
 */
function deleteSubjectCourse(_id) {
    const id = getId(_id);
    // delete subjectCourse
    db.get('subjectCourses').remove({ id }).write();

    // delete grades for subjectCourse
    db.get('grades').remove({ subjectCourseId: id }).write();
}


/**
 * Search inside every key of the entities in haystack
 * for every needle from the needleString
 * @param {array} haystack array of entities to search in
 * @param {string} needleString string of search words seperated by a space
 */
function searchFunction(haystack, needleString) {
    const needles = needleString.split(' ');
    const keys = Object.keys(haystack[0]);

    return haystack.filter(entity =>
        needles.every(needle =>
            keys.some(key =>
                entity[key] &&
                entity[key]
                    .toString()
                    .toLowerCase()
                    .indexOf(needle.toLowerCase()) > -1
            )
        )
    );
}


/* function oldschoolSearchFunction(haystack, needleString) {
    var needles = needleString.split(' ');
    var results = [];
    var keys = [];

    for (var key in haystack) {
        if (haystack.hasOwnProperty(key)) {
            keys.push(key);
        }
    }
    
    for (var i = 0; i < haystack.length; i++) {
        var entity = haystack[i];
        var entityMatch = true;

        for (var j = 0; j < needle.length; j++) {
            var needle = needle[j];
            var needleMatch = false
            
            for (var k = 0; k < keys.length; k++) {
                var key = keys[k];
                var keyMatch = entity[key].toString().toLowerCase().indexOf(needle.toLowerCase());
                if (keyMatch) {
                    needleMatch = true;
                    break;
                }
            }

            if (!needleMatch) {
                entityMatch = false;
            }
        }

        if (entityMatch) {
            results.push(item);
        }
    }

    return results;
} */


module.exports = {
    delete: {
        students: deleteStudent,
        studies: deleteStudy,
        studyCourses: deleteStudyCourse,
        studyRegulations: deleteStudyRegulation,
        subjects: deleteSubject,
        subjectCourses: deleteSubjectCourse,
    },
    search: searchFunction
};
