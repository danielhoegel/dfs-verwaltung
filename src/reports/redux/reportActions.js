export const setSettings = settings => ({
    type: 'SET_REPORT_SETTINGS',
    data: settings,
});

export const openSettingsModal = () => ({
    type: 'OPEN_REPORT_SETTINGS_MODAL'
});

export const closeSettingsModal = () => ({
    type: 'CLOSE_REPORT_SETTINGS_MODAL'
});
