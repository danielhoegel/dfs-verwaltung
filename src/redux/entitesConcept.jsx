import { combineReducers } from 'redux';

/**
 * Returns a new promise, adds the resolve
 * and reject methods to the action
 * and dispatches the action (requires redux-thunk)
 * 
 * Can be used to make api requests through
 * the apiRequestMiddleware and get access to the
 * .then and .catch methods e.g. to chain requests
 * 
 * @param {object} action 
 */
const asyncAction = action => dispatch => new Promise(
    (resolve, reject) => dispatch({ ...action, resolve, reject })
);


// GENERATORS

// actions
const actions = {};
function generateActions(entity) {
    actions[entity.plural] = {
        readAll: () => asyncAction({
            type: `READ_ALL_${entity.typePlural}`,
            url: `/${entity.plural}`,
            method: 'get'
        }),
        readSingle: (id) => asyncAction({
            type: `READ_${entity.typeSingular}`,
            url: `/${entity.plural}/${id}`,
            method: 'get'
        }),
        create: (id) => asyncAction({
            type: `CREATE_${entity.typeSingular}`,
            url: `/${entity.plural}/${id}`,
            method: 'post'
        }),
        update: (id) => asyncAction({
            type: `UPDATE_${entity.typeSingular}`,
            url: `/${entity.plural}/${id}`,
            method: 'put'
        }),
        delete: (id) => asyncAction({
            type: `DELETE_${entity.typeSingular}`,
            url: `/${entity.plural}/${id}`,
            method: 'put'
        })
    }
}


// reducers
const reducers = {};
const defaultState = {
    byId: {},
    ids: [],
    reading: false,
    creating: false,
    updating: false,
    deleting: false
}
function generateReducer(entity) {
    reducers[entity.plural] = function(state = defaultState, action) {
        switch (action.type) {
            case `READ_ALL${entity.typePlural}`:
                return {
                    ...state,
                    reading: true,
                };
            case `READ_ALL${entity.typePlural}_SUCCESS`:
                const nextState = {
                    ...state,
                    reading: false,
                };
                action.data.forEach(item => {
                    nextState.byId[item.id] = item;
                    nextState.ids = [...nextState.ids, item.id]
                });
                return nextState;
    
            case `CREATE_ALL${entity.typePlural}`:
                return {
                    ...state,
                    creating: true,
                };
            case `CREATE_ALL${entity.typePlural}_SUCCESS`:
                const nextState = {
                    ...state,
                    creating: false,
                };
                nextState.byId[action.data.id] = action.data;
                nextState.ids = [...nextState.ids, action.data.id]
                return nextState;
        
            default:
                return state;
        }
    }
}


// selectors
class Selector {
    constructor(state) {
        this.state = state;
    }
    all = () => this.state.ids.map(id => this.state.byIds[id]);
    byId = (id) => this.state.byIds[id];
    byKey = (key, value, asArray = true) => {
        const results = this.all().filter(
            item => item[key] === value
        );
        return (results.length === 1 && !asArray)
            ? results[0]
            : results
    };
    reading = () => this.state.reading;
    creating = () => this.state.creating;
    updating = () => this.state.updating;
    deleting = () => this.state.deleting;
}

const selectors = {};
function generateSelectors(entity) {
    selectors[entitity.plural] = (state) => new Selector(state[entity.plural])
}


// ENTITIES

const apiEntities = [
    {singular: 'student', plural: 'students', typeSingular: 'STUDENT', typePlural: 'STUDENTS'},
    {singular: 'studentInfo', plural: 'studentInfos', typeSingular: 'STUDENT_INFO', typePlural: 'STUDENT_INFOS'}
]

for (let i = 0; i < apiEntities.length; i++) {
    const entity = apiEntites[i];
    
    generateActions(entity);
    generateReducer(entity);
    generateSelectors(entity);
}


// EXPORT
const combineReducers = combineReducers(reducers);
export {
    actions,
    selectors,
    combineReducers as reducers
};


// USAGE

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions, selectors } from './apiEntities';

class Example extends Component {

    componentDidMount() {
        Promise.all([
            this.props.readAllStudents(),
            this.props.readAllInfos()
        ]);
    }

    studentsWithInfos() {
        return this.props.allStudents.map(student => ({
            student,
            infos: this.props.infosbyKey('studentId', student.id, false)
        }));
    }

    loading() {
        return this.props.studentsReading || this.props.infosReading;
    }

    render() {
        return {
            <div>
                <h1>Studenten</h1>
                {!this.loading() && this.studentsWithInfos().map(student => {
                    <Student
                        key={student.student.id}
                        student={student}
                    />
                })}
            </div>
        }
    }
}

const mapStateToProps = state => {
    const studentSelector = selectors.student(state);
    const infosSelector = selectors.studentInfos(state);
    return {
        allStudents: studentSelector.all(),
        infosbyKey: (...args) => infosSelector.byKey(...args)
    };
};

const mapDispatchToProps = {
    readAllStudents: actions.students.readAll(),
    readAllInfos: actions.studentInfos.readAll(),
};

export default connect(mapStateToProps, mapDispatchToProps)(Example);
