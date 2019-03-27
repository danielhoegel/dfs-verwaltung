import entities from './entities';

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


/**
 * Generates a unique id as the primary key
 * The id is a timestamp in milliseconds
 */
// function uniqueId() {
//     return Date.now();
// }

/**
 * Generate async CREATE, UPDATE and DELETE actions for all entities
 */
const entitiesActions = {};

for (let i = 0; i < entities.length; i++) {
    const { singular, plural, typeSingular, typePlural } = entities[i];

    entitiesActions[singular] = {
        fetch: id => asyncAction({
            type: `FETCH_${typeSingular}`,
            request: {
                url: `/${plural}/${id}`,
                method: 'get',
            }
        }),
        fetchByKey: key => value => asyncAction({
            type: `FETCH_${typePlural}_BY_KEY`,
            request: {
                url: `/${plural}/${key}/${value}`,
                method: 'get',
            },
            key
        }),
        fetchAll: () => asyncAction({
            type: `FETCH_${typePlural}`,
            request: {
                url: `/${plural}`,
                method: 'get'
            }
        }),
        create: data => asyncAction({
            type: `CREATE_${typeSingular}`,
            request: {
                url: `/${plural}`,
                method: 'post',
                data: { ...data }
            }
        }),
        update: data => asyncAction({
            type: `UPDATE_${typeSingular}`,
            request: {
                url: `/${plural}/${data.id}`,
                method: 'put',
                data
            },
        }),
        delete: data => asyncAction({
            type: `DELETE_${typeSingular}`,
            request: {
                url: `/${plural}/${data.id}`,
                method: 'delete'
            },
            data
        })
    };
}

export default entitiesActions;

export const fetchAllData = () => asyncAction({
        type: 'FETCH_ALL_DATA',
        request: {
            url: '/db',
            method: 'get'
        }
});
