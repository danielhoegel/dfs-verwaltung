import { combineReducers } from 'redux';

import entities from './entitiesReducer';
import layout from '../components/layout/redux/layoutReducer';
import studenten from '../routes/studenten/redux/studentenReducer';
import report from '../reports/redux/reportReducer';

const rootReducer = combineReducers({
    entities,
    layout,
    studenten,
    report,
});

export default rootReducer;
