import { createStore, applyMiddleware } from 'redux';
import reducer from './rootReducer';
import apiRequests from './middleware/apiRequestsMiddleware';
import logger from './middleware/loggerMiddleware';

const middleware = applyMiddleware(logger, apiRequests);

const store = createStore(reducer, middleware);

if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./rootReducer', () => {
        const nextReducer = require('./rootReducer');
        store.replaceReducer(nextReducer);
    });
}

export default store;
