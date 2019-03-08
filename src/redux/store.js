import { createStore } from 'redux';
// import throttle from 'lodash/throttle';

import rootReducer from './rootReducer';
import middleware from './middleware/middleware';
// import { loadState, saveState } from '../helper/localStorage';

// const persistedState = {
//     entities: loadState()
// };


const store = createStore(rootReducer, /* persistedState,  */middleware);

// store.subscribe(throttle(() => {
//     saveState(store.getState().entities);
// }, 1000));

if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./rootReducer', () => {
        const nextReducer = require('./rootReducer');
        store.replaceReducer(nextReducer);
    });
}

export default store;
