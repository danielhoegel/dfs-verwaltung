const defaultState = {
    error: null,
    fetching: false,
    studyRegulations: [],
    studyCourses: [],
    subjectsForRegulation: []
}

function studyReducer(state = defaultState, action) {
    switch(action.type) {

        /* FETCHING */
        case 'FETCH_STUDY_COURSE_WITH_REGULATIONS':
        case 'FETCH_STUDY_REGULATIONS':
        case 'FETCH_STUDY_REGULATION':
        case 'FETCH_SUBJECT_WITH_SUBJECT_COURSES_FOR_STUDY_REGULATION':
        case 'FETCH_STUDY_COURES': return {
            ...state,
            fetching: true
        };

        /* FAILURE */
        case 'FETCH_STUDY_COURSE_WITH_REGULATIONS_FAILURE':
        case 'FETCH_STUDY_REGULATIONS_FAILURE':
        case 'FETCH_STUDY_REGULATION_FAILURE':
        case 'FETCH_SUBJECT_WITH_SUBJECT_COURSES_FOR_STUDY_REGULATION_FAILURE':
        case 'FETCH_STUDY_COURES_FAILURE': return {
            ...state,
            fetching: false,
            error: action.error
        };
        
        /* SUCCESS */
        case 'FETCH_STUDY_REGULATIONS_SUCCESS': return {
            ...state,
            fetching: false,
            studyRegulations: action.data,
        };

        case 'FETCH_STUDY_REGULATION_SUCCESS':
            let index;
            const regulations = [...state.studyRegulations];
            for (let i = 0; i < regulations.length; i++) {
                const regulation = regulations[i];
                if (regulation.id === action.data.id) {
                    index = i;
                    break;
                }
            }
            if (index || index === 0) {
                regulations[index] = action.data;
            } else {
                regulations.push(action.data);
            }
            return {
                ...state,
                fetching: false,
                studyRegulations: regulations
            };

        case 'FETCH_STUDY_COURES_SUCCESS': return {
            ...state,
            fetching: false,
            studyCourses: action.data,
        };

        case 'FETCH_STUDY_COURSE_WITH_REGULATIONS_SUCCESS': return {
            ...state,
            fetching: false,
            studyCourses: action.data,
            studyRegulations: [].concat.apply([], action.data.map(s =>
                s.studyRegulations
            ))
        };

        case 'FETCH_SUBJECT_WITH_SUBJECT_COURSES_FOR_STUDY_REGULATION_SUCCESS':
            return {
                ...state,
                fetchi: false,
                subjectsForRegulation: action.data
            }

        default: return state;
    }
}

export default studyReducer;
