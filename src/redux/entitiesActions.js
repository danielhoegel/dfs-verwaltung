/**
 * Returns a new promise, adds the resolve
 * and reject methods to the action
 * and dispatches the action
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
    { entity: 'studyCourse', route: 'studyCourses', type: 'STUDY_COURSE' },
    { entity: 'studyRegulation', route: 'studyRegulations', type: 'STUDY_REGULATION' },
];

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


// export const createStudyCourse = data => asyncAction({
//     type: 'CREATE_STUDY_COURSE',
//     request: {
//         url: '/studyCourses',
//         method: 'post',
//         data
//     },
// });

// export const updateStudyCourse = data => asyncAction({
//     type: 'CREATE_STUDY_COURSE',
//     request: {
//         url: `/studyCourses/${id}`,
//         method: 'put',
//         data
//     },
// });

// export const deleteStudyCourse = id => asyncAction({
//     type: 'DELETE_STUDY_COURSE',
//     request: {
//         url: `/studyCourses/${id}`,
//         method: 'delete'
//     }
// });
