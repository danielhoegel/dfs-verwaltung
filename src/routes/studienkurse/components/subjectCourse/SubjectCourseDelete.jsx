import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import HiddenDivider from '../../../../components/HiddenDivider';
import Loader from '../../../../components/Loader';
import Field from '../../../../components/Field';
import entitiesActions from '../../../../redux/entitiesActions';

class SubjectCourseDelete extends Component {
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
            // TODO: delete grades
            this.props.deleteSubjectCourse(this.props.data)
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
                    Sind Sie sicher, dass sie die Veranstaltung <strong>{data.title}</strong> löschen möchten?<br />
                    <br />
                    <strong>Dadurch werden auch alle mit der Veranstaltung assozierten{' '}
                    Noten gelöscht.</strong> Diese Aktion kann nur durch eine manuelle{' '}
                    Wiederherstellung des letzten Backups rückgängig gemacht werden.<br />
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
    deleteSubjectCourse: entitiesActions.subjectCourse.delete
};

SubjectCourseDelete.propTypes = {
    deleteSubjectCourse: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    closeModal: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
};

export default connect(null, mapDispatchToProps)(
    withStyles(styles)(SubjectCourseDelete)
);
