import { combineReducers } from 'redux';

import entities from './entities';

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
        let updated = false;
        nextState[key] = nextState[key].map(prevItem => {
            if (prevItem.id === item.id) {
                updated = true;
               return item; 
            }
            return prevItem;
        });
        if (!updated) {
            nextState[key] = [...nextState[key], item]
        }
    } else {
        nextState[key] = [item];
    }
    return nextState;
}

/* util function */
function replaceAllItems(items, idKey = 'id' ) {
    const nextState = {};
    if (items) {
        items.forEach(item => {
            nextState[item[idKey]] = item;
        });
    }
    return nextState;
}

/* util function */
function replaceAllItemsAsArray(items, idKey = 'id' ) {
    const nextState = {};
    if (items) {
        items.forEach(item => {
            const key = item[idKey];
            if (nextState[key]) {
                nextState[key].push(item);
            } else {
                nextState[key] = [ item ];
            }
        });
    }
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
            case `FETCH_${typeSingular}_SUCCESS`:
            case `FETCH_${typeSingular}_BY_KEY_SUCCESS`:
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



const reducers = {
    meta: entitiesMetaReducer
};

for (let i = 0; i < entities.length; i++) {
    const { plural, typeSingular, typePlural, key, isArray } = entities[i];
    reducers[plural] = entityReducer(typeSingular, typePlural, plural, key, isArray);
}

export default combineReducers(reducers);
