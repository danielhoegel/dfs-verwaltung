function layoutReducer(state = { pageLoading: false }, action) {
    switch (action.type) {
        case 'SET_PAGE_LOADING': return {
            ...state,
            pageLoading: true
        };

        case 'UNSET_PAGE_LOADING': return {
            ...state,
            pageLoading: false
        };

        default: return state;
    }
}

export default layoutReducer;
