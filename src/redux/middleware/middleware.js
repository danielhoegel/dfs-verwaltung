import { applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import apiRequests from './apiRequestsMiddleware';

const logger = createLogger({
    collapsed: true,
    timestamp: false,
    duration: false
});

const middleware = applyMiddleware(apiRequests, thunk, logger);

export default composeWithDevTools(middleware);
