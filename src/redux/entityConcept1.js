const entites = [
    {  singular: 'student', plural: 'students', typeSingular: 'STUDENT', typePlural: 'STUDENTS' },
    {  singular: 'studentInfo', plural: 'studentInfos', typeSingular: 'STUDENT_INFO', typePlural: 'STUDENT_INFOS' },
    {  singular: 'study', plural: 'studies', typeSingular: 'STUDY', typePlural: 'STUDIES' }
];



const defaultState = {
    students: {
        byId: {
            1: { id: 1, name: 'Daniel'},
            2: { id: 2, name: 'Lea'}
        },
        ids: [1, 2],
        fetching: false,
        updating: false,
        deleting: false,
        creating: false
    }
};


function fetchReducer(state, action, singular, plural) {
    switch (action.type) {
        case `FETCH_${plural}`:
        case `FETCH_${singular}`:
            return {
                ...state,
                fetching: true
            };

        case `Fetch_${plural}_FAILURE`:
        case `Fetch_${singular}_FAILURE`:
            return {
                ...state,
                fetching: false
            };

        case `FETCH_${plural}_SUCCESS`:
            const nextState = {
                ...state,
                fetching: false,
                byId: {},
                ids: []
            }
            action.data.forEach(item => {
                nextState[item.id] = item;
                nextState.ids.push(item.id);
            });
            return nextState;

        case `FETCH_${singular}_SUCCESS`:
            const nextState = {
                ...state,
                fetching: false,
            }
            nextState.byId[action.data.id] = action.data;
            if (!nextState.ids.include(action.data.id)) {
                nextState.ids.push(action.data.id);
            }
            return nextState;
        
        default:
            return state;
    }
}


function createReducer(state, action, single, plural) {
    
}


class Selector {
    constructor(state) {
        this.state = state;
    }

    all() {
        const result = [];
        for (let i = 0; i < this.state.ids.length; i++) {
            const id = this.state.ids[i];
            result.push(this.state.byId[id]);
        }
        return result;
    }

    byId(id) {
        return this.state.byId[id];
    }

    byKey(key, value, asArray = true) {
        const result = [];
        for (let i = 0; i < this.state.ids.length; i++) {
            const id = this.state.ids[i];
            if (this.state.byId[id][key] === value) {
                result.push(this.state.byId[id]);
            }  
        }
        return (result.length === 1 && !asArray) ? result[0] : result
    }

    fetching() {
        return this.state.fetching;
    }

    creating() {
        return this.state.creating;
    }

    updating() {
        return this.state.updating;
    }

    deleting() {
        return this.state.deleting;
    }
}


function select(state) {
    const selectors = {};

    entites.forEach(entity => {
        /* generate reducers */
        fetchReducer(state, action, singular, plural) 

        /* generate selector */
        selectors[entity.singular] = new Selector(state[entity.plural]);
    });

    return selectors;
}


/* Composed Selectors */

function selectStudentWithInfosAndStudies(state, studentId) {
    const { student, studentInfo, study } = select(state);
    return {
        student: student.byId(studentId),
        infos: studentInfo.byKey('studentId', studentId, false),
        studies: study.byKey('studentId', studentId)
    }
}

function selectAllStudentsWithInfosAndStudies(state) {
    return select(state).student.all().map(
        ({ id }) => selectStudentWithInfosAndStudies(state, id)
    );
}
