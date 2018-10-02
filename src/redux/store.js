import { createStore, applyMiddleware } from 'redux';
import reducer from './rootReducer';
import apiRequests from './middleware/apiRequestsMiddleware';
import logger from './middleware/loggerMiddleware';

const middleware = applyMiddleware(logger, apiRequests);

const store = createStore(reducer, middleware);

export default store;
