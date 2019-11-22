let settings = {
    orientation: 'auto', // 'auto', 'landscape', 'portrait'
    titleType: 'auto', // 'auto', 'hidden', 'empty', 'custom'
    customTitle: '',
    showFilter: true
};

try {
    const storedSettings = localStorage.getItem('dfs_report_settings');
    if (storedSettings) {
        settings = JSON.parse(storedSettings);
    }
} catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
}

const defaultState = {
    settingsModalOpen: false,
    settings
};

function reportReducer(state = defaultState, action) {
    switch (action.type) {
        case 'OPEN_REPORT_SETTINGS_MODAL': return {
            ...state,
            settingsModalOpen: true
        };
        case 'CLOSE_REPORT_SETTINGS_MODAL': return {
            ...state,
            settingsModalOpen: false
        };
        case 'SET_REPORT_SETTINGS': return {
            ...state,
            settings: {
                ...state.settings,
                ...action.data
            }
        };
        default: return state;
    }
}

export default reportReducer;
