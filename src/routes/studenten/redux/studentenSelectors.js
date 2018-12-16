import { isNotEmpty } from "../../../helper/helper";

/* Base Selector */
export function getStudentenData(state) {
    return state.studenten;
}


/* Pure State */
let studentsWithInformationAndStudies = null;
export function getStudenten(state) {
    studentsWithInformationAndStudies = Object.values(state.entities.students).map(student => ({
        ...student,
        studentInformations: [ state.entities.studentInformations[student.id] ],
        studies: state.entities.studies[student.id]
    }));
    return studentsWithInformationAndStudies;
}


export function getStudentenFetching(state) {
    // return state.studenten.fetching;
    return state.entities.meta.fetching;
}

export function getStudentenFilter(state) {
    return state.studenten.filter;
}


/* Derived State */

export function getStudentForId(state, id) {
    const studenten = studentsWithInformationAndStudies || getStudenten(state);
    return studenten ? studenten[id] : null;
}

export function getFilteredStudenten(state) {
    const studenten = studentsWithInformationAndStudies || getStudenten(state);
    const { filter, searchString } = getStudentenData(state);

    return studenten.filter(student => {
        if (isNotEmpty(student.studies)) {
            const studyMatch = student.studies.some(study => {
                if (filter.year && filter.year !== study.year ) {
                    return false;
                }
                if (isNotEmpty(filter.studyCourse) && filter.studyCourse !== study.studyCourseId) {
                    return false;
                }
                if (isNotEmpty(filter.status) && filter.status !== study.status) {
                    return false;
                }
                return true;
            });
            if (!studyMatch) return false;            
        } else if (filter.studies || isNotEmpty(filter.studyCourse) || isNotEmpty(filter.status)) {
            return false;
        }

        const studentMatch = (
            !filter.student ||
            student.firstName.toLocaleLowerCase().indexOf(searchString) !== -1 ||
            student.lastName.toLocaleLowerCase().indexOf(searchString) !== -1 ||
            student.matrikelnummer.indexOf(Number(searchString)) !== -1
        );
        return studentMatch;
    });
};
