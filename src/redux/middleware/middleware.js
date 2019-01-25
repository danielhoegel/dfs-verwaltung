import { applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import apiRequests from './apiRequestsMiddleware';

const logger = createLogger({
    collapsed: true,
    timestamp: false,
    duration: false
});

export default composeWithDevTools(applyMiddleware(apiRequests, thunk, logger));
