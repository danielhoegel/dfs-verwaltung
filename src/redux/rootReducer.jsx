import { combineReducers } from 'redux';

import entities from './entitiesReducer';
import layout from '../components/layout/redux/layoutReducer';
import studenten from '../routes/studenten/redux/studentenReducer'
import study from '../routes/studienkurse/redux/studyReducer';

const rootReducer = combineReducers({
    entities,
    layout,
    studenten,
    study
});

export default rootReducer;
