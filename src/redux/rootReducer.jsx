import { combineReducers } from 'redux';

import studenten from '../routes/studenten/redux/studentenReducer'

const rootReducer = combineReducers({
    studenten
});

export default rootReducer;
