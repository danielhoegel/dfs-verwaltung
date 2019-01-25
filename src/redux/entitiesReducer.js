import { combineReducers } from 'redux';

/* util function */
function replaceItem(state, item, key) {
    const id = item[key];
    return {
        ...state,
        [id]: item
    };
}

/* util function */
function replaceItemAsArray(state, item, idKey = 'id') {
    const key = item[idKey];
    const nextState = {...state};
    if (nextState[key]) {
        nextState[key] = [...state[key], item];
    } else {
        nextState[key] = [item];
    }
    return nextState;
}

/* util function */
function replaceAllItems(items, idKey = 'id' ) {
    const nextState = {};
    items.forEach(item => {
        nextState[item[idKey]] = item;
    });
    return nextState;
}

/* util function */
function replaceAllItemsAsArray(items, idKey = 'id' ) {
    const nextState = {};
    items.forEach(item => {
        const key = item[idKey];
        if (nextState[key]) {
            nextState[key].push(item);
        } else {
            nextState[key] = [ item ];
        }
    });
    return nextState;
}

/* util function */
function deleteItem(state, item, idKey = 'id') {
    const key = item[idKey];
    const nextState = {...state};
    delete nextState[key]
    return nextState;
}

/* util function */
function deleteItemAsArray(state, item, idKey = 'id') {
    const key = item[idKey];
    const nextState = {...state};
    nextState[key] = nextState[key].filter(
        stateItem => stateItem.id !== item.id
    );
    return nextState;
}


function entityReducer(typeSingular, typePlural, entity, key = 'id', asArray) {
    return function(state = {}, action) {
        switch(action.type) {
            case 'FETCH_ALL_DATA_SUCCESS':
                return asArray
                    ? replaceAllItemsAsArray(action.data[entity], key)
                    : replaceAllItems(action.data[entity], key);
            case `FETCH_${typePlural}_SUCCESS`:
                return asArray
                    ? replaceAllItemsAsArray(action.data, key)
                    : replaceAllItems(action.data, key);
            case `CREATE_${typeSingular}_SUCCESS`:
            case `UPDATE_${typeSingular}_SUCCESS`:
                return asArray
                    ? replaceItemAsArray(state, action.data, key)
                    : replaceItem(state, action.data, key);
            case `DELETE_${typeSingular}_SUCCESS`:
                return asArray
                    ? deleteItemAsArray(state, action.request.data, key)
                    : deleteItem(state, action.request.data, key)
            default:
                return state;
        }
    };
}

const defaultMetaState = {
    fetching: false,
    error: ''
};

function entitiesMetaReducer(state = defaultMetaState, action) {
    switch (action.type) {
        case 'FETCH_ALL_DATA':
            return {
                ...state,
                fetching: true,
                error: ''
            }
        case 'FETCH_ALL_DATA_SUCCESS':
            return {
                ...state,
                fetching: false,
                error: ''
            }
        case 'FETCH_ALL_DATA_FAILURE':
            return {
                ...state,
                fetching: false,
                error: action.error
            }
        default:
            return state;
    }
}

export default combineReducers({
    meta: entitiesMetaReducer,
    students: entityReducer('STUDENT', 'STUDENTS', 'students', 'id'),
    studentInformations: entityReducer('STUDENT_INFORMATION', 'STUDENT_INFORMATIONS', 'studentInformations', 'studentId'),
    studies: entityReducer('STUDY', 'STUDIES', 'studies', 'studentId', true),
    grades: entityReducer('GRADE', 'GRADES', 'grades', 'studentId', true),
    studyCourses: entityReducer('STUDY_COURSE', 'STUDY_COURSES', 'studyCourses', 'id'),
    studyRegulations: entityReducer('STUDY_REGULATION', 'STUDY_REGULATIONS', 'studyRegulations', 'studyCourseId', true),
    subjects: entityReducer('SUBJECT', 'SUBJECTS', 'subjects', 'studyRegulationId', true),
    subjectCourses: entityReducer('SUBJECT_COURSE', 'SUBJECT_COURSES', 'subjectCourses', 'subjectId', true),
});
