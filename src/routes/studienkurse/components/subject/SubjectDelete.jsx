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

class SubjectDelete extends Component {
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
            // TODO: delte subjectCourses and Grades
            this.props.deleteSubject(this.props.data)
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
                <Typography>
                    Sind Sie sicher, dass sie das Fach <strong>{data.title}</strong> entfernen möchten?
                    <br />
                    <strong>Dadurch werden auch alle mit dem Fach assozierten Veranstaltungen und Noten gelöscht.</strong> Diese Aktion kann nur durch eine manuelle Wiederherstellung des letzten Backups rückgängig gemacht werden.<br />
                    <br />
                    Geben Sie zur Bestätigung das Wort <span className={classes.controlValue}>{this.controlValue}</span> ein.
                </Typography>
                <Field
                    type='text'
                    value={this.state.controlValue}
                    onChange={e => this.setState({ controlValue: e.target.value })}
                    label='Bestätigungswort'
                />
                <HiddenDivider height={2} />
                <Button
                    variant='raised'
                    onClick={this.deleteHandler}
                    className={classes.deleteButton}
                    disabled={!this.controlCheck()}
                >
                    Löschen
                </Button>
                <Button onClick={closeModal}>
                    Abbrechen
                </Button>
                {error && <Typography className={classes.error}>{error}</Typography>}
            </div>
        );
    }
};

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
})

const mapDispatchToProps = {
    deleteSubject: entitiesActions.subject.delete
};

SubjectDelete.propTypes = {
    deleteSubject: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    closeModal: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
};

export default connect(null, mapDispatchToProps)(
    withStyles(styles)(SubjectDelete)
);
