import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import HiddenDivider from '../../../../components/HiddenDivider';
import Loader from '../../../../components/Loader';
import entitiesActions from '../../../../redux/entitiesActions';
import Field from '../../../../components/Field';

class StudyCourseDelete extends Component {
    state = {
        loading: false,
        error: null,
        controlValue: ''
    }

    controlValue = 'ENTFERNEN'

    controlCheck() {
        return this.state.controlValue === this.controlValue;
    }

    deleteHandler = () => {
        if (this.controlCheck()) {
            this.setState({ loading: true, error: null });
            // TODO: delete studies, studyRegulations, subjects, subjectCourses and Grades
            this.props.deleteStudyCourse(this.props.data)
                .then(this.props.closeModal)
                .catch(err => this.setState({ loading: false, error: err.message }));
        }
    }

    render() {
        const { data, closeModal, classes } = this.props;
        const { error, loading } = this.state;
        return (
            <div>
                <Loader loading={loading} />
                <Typography variant='body2'>
                    Sind Sie sicher, dass sie den Studienkurs <strong>{data.title}</strong> löschen möchten?<br />
                    <br />
                    <strong>Dadurch werden auch alle mit dem Studienkurs assozierten{' '}
                    Studiengänge, Studienordnungen, Fächer, Veranstaltungen und Noten gelöscht.</strong>{' '}
                    Diese Aktion kann nur durch eine manuelle Wiederherstellung des letzten{' '}
                    Backups rückgängig gemacht werden.<br />
                    <br />
                    Geben Sie zur Bestätigung das Wort{' '}
                    <span className={classes.controlValue}>{this.controlValue}</span> ein.
                </Typography>
                <Field
                    type='text'
                    value={this.state.controlValue}
                    onChange={e => this.setState({ controlValue: e.target.value })}
                    label='Bestätigungswort'
                />
                <HiddenDivider height={2} />
                <Button
                    variant='contained'
                    onClick={this.deleteHandler}
                    className={classes.deleteButton}
                    disabled={!this.controlCheck()}
                >
                    Löschen
                </Button>
                <Button variant='text' onClick={closeModal}>
                    Abbrechen
                </Button>
                {error && <Typography variant='body2' className={classes.error}>{error}</Typography>}
            </div>
        );
    }
}

const styles = theme => ({
    deleteButton: {
        marginRight: theme.spacing.unit * 2,
        color: theme.palette.getContrastText(theme.palette.red),
        backgroundColor: theme.palette.red,
        '&:hover': {
            backgroundColor: theme.palette.darkred,
        },
    },
    error: {
        color: theme.palette.red,
        marginTop: theme.spacing.unit * 2
    },
    controlValue: {
        backgroundColor: '#eee',
        fontFamily: 'monospace',
        fontSize: '1.25em',
    },
});

const mapDispatchToProps = {
    deleteStudyCourse: entitiesActions.studyCourse.delete
};

StudyCourseDelete.propTypes = {
    deleteStudyCourse: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    closeModal: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
};

export default connect(null, mapDispatchToProps)(
    withStyles(styles)(StudyCourseDelete)
);
