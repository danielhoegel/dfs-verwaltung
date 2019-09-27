import { getLastYears } from '../../../helper/helper';

const defaultState = {
    list: [],
    fetching: false,
    error: null,
    filter: {
        studyCourse: 1551985404032, // TODO: get value from database (defaultValues entity?)
        status: 1,
        year: getLastYears(4)
    },
    searchString: '',
};

const studentenReducer = (state = defaultState, action) => {
    switch (action.type) {
        /* FETCH STUDENT */
        case 'FETCH_STUDENTEN':
        case 'FETCH_STUDENT': return {
            ...state,
            fetching: true,
            error: null
        };

        case 'FETCH_STUDENTEN_FAILURE':
        case 'FETCH_STUDENT_FAILURE': return {
            ...state,
            fetching: false,
            error: action.error
        };

        case 'FETCH_STUDENTEN_SUCCESS': return {
            ...state,
            fetching: false,
            list: action.data,
        };

        case 'FETCH_STUDENT_SUCCESS':
            const nextList = [...state.list];
            if (nextList.length) {
                let indexOfStudent = -1;
                for (let i = 0; i < nextList.length; i++) {
                    const student = nextList[i];
                    if (student.id === action.data.id) {
                        indexOfStudent = i;
                        break;
                    }
                }
                if (indexOfStudent !== -1) {
                    nextList[indexOfStudent] = action.data;
                } else {
                    nextList.push(action.data);
                }
            } else {
                nextList.push(action.data);
            }
            return {
                ...state,
                fetching: false,
                list: nextList
            };

        /* CREATE STUDENT */
        case 'CREATE_STUDENT_SUCCESS': return {
            ...state,
            list: [
                ...state.list,
                action.data
            ]
        };

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
            filter: {
                studyCourse: '',
                status: '',
                year: []
            },
        };

        case 'SEARCH_STUDENTEN': return {
            ...state,
            searchString: action.searchString
        };

        default: return state;
    }
};

export default studentenReducer;
