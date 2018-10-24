import { createStore } from 'redux';
import throttle from 'lodash/throttle';
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage';
// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import rootReducer from './rootReducer';
import middleware from './middleware/middleware';
import { loadState, saveState } from '../helper/localStorage';

const persistedState = {
    entities: loadState()
};

// const persistConfig = {
//     key: 'data',
//     whitelist: ['data'],
//     storage,
//     // stateReconciler: autoMergeLevel2, // default: autoMergeLevel1
//     // debug: true
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(rootReducer, persistedState, middleware);
// export const persistor = persistStore(store);

store.subscribe(throttle(() => {
    saveState(store.getState().entities);
}, 1000));

if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./rootReducer', () => {
        const nextReducer = require('./rootReducer');
        store.replaceReducer(nextReducer);
    });
}

export default store;
