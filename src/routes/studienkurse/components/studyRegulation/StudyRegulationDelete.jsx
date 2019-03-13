import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import HiddenDivider from '../../../../components/HiddenDivider';
import entitiesActions from '../../../../redux/entitiesActions';
import Loader from '../../../../components/Loader';

class StudyRegulationDelete extends Component {
    state = {
        loading: false,
        error: null
    }

    deleteHandler = () => {
        this.setState({ loading: true, error: null });
        // TODO: delete subjects, subjectCourses and Grades
        this.props.deleteStudyRegulation(this.props.data)
            .then(this.props.history.replace('/studienkurse'))
            .then(this.props.closeModal)
            .catch(err => this.setState({ loading: false, error: err.message }));
    } 

    render() {
        const { data, closeModal, classes } = this.props;
        const { error, loading } = this.state;
        return (
            <div>
                <Loader loading={loading} />
                <Typography>
                    Sind Sie sicher, dass sie die Studienordnung <strong>{data.title}</strong> löschen möchten?
                </Typography>
                <HiddenDivider height={2} />
                <Button variant='raised' onClick={this.deleteHandler} className={classes.deleteButton}>
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
    }
})

const mapDispatchToProps = {
    deleteStudyRegulation: entitiesActions.studyRegulation.delete
};

StudyRegulationDelete.propTypes = {
    deleteStudyRegulation: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    closeModal: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
};

export default connect(null, mapDispatchToProps)(
    withRouter(withStyles(styles)(StudyRegulationDelete))
);
