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
    return studenten.filter(student => (
        (!filter.jahrgang || filter.jahrgang === student.jahrgang) &&
        (!filter.studienkurs || filter.studienkurs === student.studienkurs) &&
        (!filter.student || (
            student.firstName.toLocaleLowerCase().indexOf(searchString) !== -1 ||
            student.lastName.toLocaleLowerCase().indexOf(searchString) !== -1 ||
            student.matrikelnummer.indexOf(parseInt(searchString, 10)) !== -1
        ))
    ))
};
