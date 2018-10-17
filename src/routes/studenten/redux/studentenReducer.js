const defaultFilter = {
    studyCourse: 1,
    status: 1,
    year: ''
};

const defaultState = {
    list: [],
    fetching: true,
    error: null,
    filter: defaultFilter,
    searchString: ''
};

const studentenReducer = (state = defaultState, action) => {
    switch (action.type) {
        /* FETCH */
        case 'FETCH_STUDENTEN':
        case 'FETCH_STUDENT': return {
            ...state,
            fetching: true,
            error: null
        };

        case 'FETCH_STUDENTEN_SUCCESS': return {
            ...state,
            fetching: false,
            list: action.data,
        };

        case 'FETCH_STUDENTEN_FAILURE':
        case 'FETCH_STUDENT_FAILURE': return {
            ...state,
            fetching: false,
            error: action.error
        };

        case 'FETCH_STUDENT_SUCCESS': return {
            ...state,
            fetching: false,
            list: state.list.length
                ? state.list.map(student =>
                    student.id === action.request.id ? action.data : student
                )
                : [ action.data ]
        }

        /* FILTER + SEARCH */
        case 'FILTER_STUDENTEN': return {
            ...state,
            filter: {
                ...state.filter,
                [action.key]: action.value
            }
        };

        case 'RESET_STUDENTEN_FILTER': return {
            ...state,
            filter: defaultFilter,
        }

        case 'SEARCH_STUDENTEN': return {
            ...state,
            searchString: action.searchString
        }

        default: return state;
    }
}

export default studentenReducer;
