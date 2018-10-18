import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger'

import reducer from './rootReducer';
import apiRequests from './middleware/apiRequestsMiddleware';

const logger = createLogger({
    collapsed: true,
    timestamp: false,
    duration: false
});

const middleware = applyMiddleware(apiRequests, logger);

const store = createStore(reducer, middleware);

if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./rootReducer', () => {
        const nextReducer = require('./rootReducer');
        store.replaceReducer(nextReducer);
    });
}

export default store;
