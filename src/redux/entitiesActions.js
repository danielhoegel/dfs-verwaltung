/**
 * Returns a new promise, adds the resolve
 * and reject methods to the action
 * and dispatches the action (requires redux-thunk)
 * 
 * Can be used to make api requests through
 * the apiRequestMiddleware and get access to the
 * .then and .catch methods e.g. to chain requests
 * 
 * @param {object} action 
 */
const asyncAction = action => dispatch => new Promise(
    (resolve, reject) => dispatch({ ...action, resolve, reject })
);

const entities = [
    { entity: 'student', route: 'students', type: 'STUDENT' },
    { entity: 'studentInformation', route: 'studentInformations', type: 'STUDENT_INFORMATION' },
    { entity: 'study', route: 'studies', type: 'STUDY' },
    { entity: 'grade', route: 'grades', type: 'GRADE' },
    { entity: 'studyCourse', route: 'studyCourses', type: 'STUDY_COURSE' },
    { entity: 'studyRegulation', route: 'studyRegulations', type: 'STUDY_REGULATION' },
    { entity: 'subject', route: 'subjects', type: 'SUBJECT' },
    { entity: 'subjectCourse', route: 'subjectCourses', type: 'SUBJECT_COURSE' },
];

/**
 * Generate async CREATE, UPDATE and DELETE actions for all entities
 */
const entitiesActions = {};
entities.forEach(({ entity, route, type }) => {
    entitiesActions[entity] = {
        create: data => asyncAction({
            type: `CREATE_${type}`,
            request: {
                url: `/${route}`,
                method: 'post',
                data
            }
        }),
        update: data => asyncAction({
            type: `UPDATE_${type}`,
            request: {
                url: `/${route}/${data.id}`,
                method: 'put',
                data
            },
        }),
        delete: data => asyncAction({
            type: `DELETE_${type}`,
            request: {
                url: `/${route}/${data.id}`,
                method: 'delete'
            },
            data
        })
    }
});

export default entitiesActions;
