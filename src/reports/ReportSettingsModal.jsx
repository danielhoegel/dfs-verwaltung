import React from 'react';
import { connect } from 'react-redux';

import Modal from '../components/Modal';
import MyForm from '../components/MyForm';
import SettingsFields from './SettingsFields';
import { getReportSettings, getReportSettingsModalOpen } from './redux/reportSelectors';
import { setSettings, closeSettingsModal } from './redux/reportActions';


const ReportSettingsModal = (props) => {

    const saveSettingsAndCloseModal = settings => {
        props.setSettings(settings);
        props.closeSettingsModal();

        try {
            localStorage.setItem('dfs_report_settings', JSON.stringify(settings));
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
        }
    };

    return (
        <Modal
            component={({ closeModal }) => (
                <MyForm
                    fields={SettingsFields}
                    // eslint-disable-next-line no-console
                    onSubmit={saveSettingsAndCloseModal}
                    defaultValues={props.settings}
                    onCancel={closeModal}
                />
            )}
            title='Einstellungen'
            close={props.closeSettingsModal}
            open={props.settingsModalOpen}
        />
    );
};

const mapStateToProps = state => ({
    settings: getReportSettings(state),
    settingsModalOpen: getReportSettingsModalOpen(state),
});

export default connect(mapStateToProps, {
    setSettings,
    closeSettingsModal,
})(ReportSettingsModal);
