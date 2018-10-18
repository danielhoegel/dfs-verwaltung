/* STUDENT */
export const fetchStudenten = () => ({
    type: 'FETCH_STUDENTEN',
    request: { url: '/students' }
});

export const fetchStudentForId = (id) => ({
    type: 'FETCH_STUDENT',
    request: { url: `/students/${id}` },
    id
});

export const createStudent = (data) => ({
    type: 'CREATE_STUDENT',
    request: {
        url: '/students',
        method: 'post',
        data
    }
});


/* FILTER + SEARCH */

export const filterStudenten = (key, value) => ({
    type: 'FILTER_STUDENTEN',
    key,
    value
});

export const searchStudenten = (searchString) => ({
    type: 'SEARCH_STUDENTEN',
    searchString
});

export const resetStudentenFilter = () => ({
    type: 'RESET_STUDENTEN_FILTER'
});
