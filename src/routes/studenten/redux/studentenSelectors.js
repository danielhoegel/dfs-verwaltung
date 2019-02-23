import { isNotEmpty } from "../../../helper/helper";
import { getFullStudents } from "../../../redux/entitiesSelector";

/* Base Selector */
export function getStudentenData(state) {
    return state.studenten;
}


/* Pure State */

export function getStudentenFetching(state) {
    return state.entities.meta.fetching;
}

export function getStudentenFilter(state) {
    return getStudentenData(state).filter;
}


/* Derived State */

export function getFilteredStudenten(state) {
    const studenten = getFullStudents(state);
    const { filter, searchString } = getStudentenData(state);

    return studenten.filter(student => {
        if (isNotEmpty(student.studies)) {
            const studyMatch = student.studies.some(study => {
                if (filter.year.length && !filter.year.includes(study.year) ) {
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
