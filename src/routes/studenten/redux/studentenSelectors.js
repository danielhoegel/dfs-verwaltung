import { isNotEmpty } from "../../../helper/helper";

/* Base Selector */
export function getStudentenData(state) {
    return state.studenten;
}


/* Pure State */

export function getStudenten(state) {
    const studentenData = getStudentenData(state);
    return studentenData ? studentenData.list : null;
}

export function getStudentenFetching(state) {
    return getStudentenData(state).fetchint;
}

export function getStudentenFilter(state) {
    return getStudentenData(state).filter;
}


/* Derived State */

export function getStudentForId(state, id) {
    const studenten = getStudenten(state);
    return studenten
        ? studenten.filter(s => s.id === Number(id))[0]
        : null;
}

export function getFilteredStudenten(state) {
    const studenten = getStudenten(state);
    const { filter, searchString } = getStudentenData(state);

    return studenten.filter(student => {
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

        const studentMatch = (
            !filter.student ||
            student.firstName.toLocaleLowerCase().indexOf(searchString) !== -1 ||
            student.lastName.toLocaleLowerCase().indexOf(searchString) !== -1 ||
            student.matrikelnummer.indexOf(Number(searchString)) !== -1
        );
        return studentMatch;
    });
};
