import React, { Component, Fragment } from 'react';
import PropTypes from "prop-types";
import { NavLink } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PrintIcon from '@material-ui/icons/PrintOutlined';
import AddIcon from '@material-ui/icons/Add';
import CloudDownloadIcon from '@material-ui/icons/CloudDownloadOutlined';

import StudentPrintMenu from './StudentPrintMenu';

class StudentenActions extends Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <StudentPrintMenu students={this.props.students} ButtonComponent={
                    <Button className={styles.button} title='PDF herunterladen oder drucken'>
                        <PrintIcon className={classes.leftIcon} />
                        Berichte
                    </Button>
                } />
                <Button className={styles.button} onClick={this.props.exportPDF} title='CSV-/Excel-Datei herunterladen'>
                    <CloudDownloadIcon className={classes.leftIcon} />
                    Export
                </Button>
                <Button className={styles.button} component={NavLink} to='/studenten/create' title='Student hinzufügen'>
                    <AddIcon className={classes.leftIcon} />
                    Student
                </Button>
            </Fragment>
        );
    }
}

const styles = theme => ({
    button: {
        '&:not(:last-child)': {
            marginRight: theme.spacing.unit
        },
    },
    leftIcon: {
        marginRight: theme.spacing.unit
    },
});

StudentenActions.propTypes = {
    classes: PropTypes.object.isRequired,
    exportPDF: PropTypes.func.isRequired,
    students: PropTypes.array.isRequired,
};

export default withStyles(styles)(StudentenActions);


