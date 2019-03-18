import { combineReducers } from 'redux';

import entities from './entitiesReducer';
import layout from '../components/layout/redux/layoutReducer';
import studenten from '../routes/studenten/redux/studentenReducer'

const rootReducer = combineReducers({
    entities,
    layout,
    studenten
});

export default rootReducer;
