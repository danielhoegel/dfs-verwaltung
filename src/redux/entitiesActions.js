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
 * Generate async CREATE, UPDATE and DELETE actions for all entities
 */
const entitiesActions = {};

for (let i = 0; i < entities.length; i++) {
    const { singular, plural, typeSingular } = entities[i];
    
    entitiesActions[singular] = {
        create: data => asyncAction({
            type: `CREATE_${typeSingular}`,
            request: {
                url: `/${plural}`,
                method: 'post',
                data
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
    }
}

export default entitiesActions;
