import { combineReducers } from 'redux';
import { isNotEmpty } from '../helper/helper';

/* util function */
function replaceItem(state, item, id = null) {
    const key = isNotEmpty(id) ? id : item.id;
    return {
        ...state,
        [key]: item
    };
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
                return replaceItem(state, action.data, key);
            default:
                return state;
        }
    };
}

export default combineReducers({
    students: entityReducer('STUDENT', 'STUDENTS', 'students', 'id'),
    studentInformations: entityReducer('STUDENT_INFORMATION', 'STUDENT_INFORMATIONS', 'studentInformations', 'studentId'),
    studies: entityReducer('STUDY', 'STUDIES', 'studies', 'studentId', true),
    grades: entityReducer('GRADE', 'GRADES', 'grades', 'studentId', true),
    studyCourses: entityReducer('STUDY_COURSE', 'STUDY_COURSES', 'studyCourses', 'id'),
    studyRegulations: entityReducer('STUDY_REGULATION', 'STUDY_REGULATIONS', 'studyRegulations', 'studyCourseId', true),
    subjects: entityReducer('SUBJECT', 'SUBJECTS', 'subjects', 'studyRegulationId', true),
    subjectCourses: entityReducer('SUBJECT_COURSE', 'SUBJECT_COURSES', 'subjectCourses', 'subjectId', true),
});
