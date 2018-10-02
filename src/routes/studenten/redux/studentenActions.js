export const fetchStudenten = () => ({
    type: 'FETCH_STUDENTEN',
    request: {
        url: '/studenten'
    }
});

export const fetchStudentForId = (id) => ({
    type: 'FETCH_STUDENT',
    request: {
        url: `/studenten/${id}`
    },
    id
});

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
