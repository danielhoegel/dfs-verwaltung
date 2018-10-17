function getStudyData(state) {
    return state.study;
}

export function getStudyFetching(state) {
    return getStudyData(state).fetching;
}

export function getStudyRegulations(state) {
    return getStudyData(state).studyRegulations;
}

export function getStudyCourses(state) {
    return getStudyData(state).studyCourses;
}

export function getSubjectsForRegulation(state) {
    return getStudyData(state).subjectsForRegulation;
}

export function getStudyRegulationForId(state, regulationId) {
    return getStudyRegulations(state).filter(
        regulation => regulation.id === regulationId
    )[0];
}
