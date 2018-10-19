import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import PrintIcon from '@material-ui/icons/PrintOutlined';
import AddIcon from '@material-ui/icons/Add';
import CloudDownloadIcon from '@material-ui/icons/CloudDownloadOutlined';

import StudentPrintMenu from './StudentPrintMenu';

class StudentenActions extends Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <Fragment>
                <StudentPrintMenu ButtonComponent={
                    <IconButton title='PDF herunterladen oder drucken'>
                        <PrintIcon />
                    </IconButton>
                } />
                <IconButton onClick={this.props.exportPDF} title='CSV-/Excel-Datei herunterladen'>
                    <CloudDownloadIcon />
                </IconButton>
                <IconButton component={NavLink} to='/studenten/create' title='Student hinzufügen'>
                    <AddIcon />
                </IconButton>
            </Fragment>
        );
    }
}

export default StudentenActions;
