import { combineReducers } from 'redux';

import layout from '../components/layout/redux/layoutReducer';
import studenten from '../routes/studenten/redux/studentenReducer'
import study from '../routes/studienkurse/redux/studyReducer';

const rootReducer = combineReducers({
    layout,
    studenten,
    study
});

export default rootReducer;
