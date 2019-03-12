import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeftRounded';

import HiddenDivider from '../../components/HiddenDivider';
import MyForm from '../../components/MyForm';
import StudentCombinedFields from '../../components/fields/StudentCombinedFields';

import { getStudyCourses, getStudyRegulations } from '../../redux/entitiesSelector';
import entitiesActions from '../../redux/entitiesActions';

class StudentUpdate extends Component {
    state = {
        fetching: false,
        creating: false,
        errors: null
    }

    defaultValues = {
        student: {
            firstName : '',
            lastName: '',
            prefix: 'Frau',
            matrikelnummer: '',
        },
        studentInformation: {
            birthDate: '',
            birthPlace: '',
            birthCountry: 'Deutschland',
            
            address: '',
            addressExtra: '',
            postal: '',
            city: '',
            country: 'Deutschland',
    
            mailPrimary: '',
            mailSecondary: '',
            phoneNumber: '',
            mobileNumber: '',

            iban: '',
            bic: '',
            bank: '',
            accountHolder: '',
        },
        studies: [
            {
                year: new Date().getFullYear(),
                studyCourseId: 1551985404032, // TODO: get value from database (defaultValues entity?)
                studyRegulationId: 1551985442150, // TODO: get value from database (defaultValues entity?)
                status: 1,
            }
        ]
    }

    
    componentDidMount() {
        Promise.all([
            this.props.fetchStudyRegulations(),
            this.props.fetchStudyCourses(),
        ])
        .catch(err => this.setState({ fetching: false, errors: err.message }));
    }
    
    goBack = () => {
        this.props.history.goBack();
    }

    validate(data) {
        const errors = [];

        // RETURN
        if (errors.length) {
            this.setState({ errors });
            return false;
        }
        return true;
    }

    createStudent = (data) => {
        if (this.validate(data)) {
            this.setState({ creating: true, error: null });

            this.props.createStudent(data.student)
            .then(({ id: studentId }) => {
                const requests = [];
                requests.push(this.props.createStudentInformation({ ...data.studentInformation, studentId }));
                data.studies.forEach(study => {
                    requests.push(this.props.createStudy({ ...study, studentId }));
                });
                return Promise.all(requests);
            })
            .then(this.goBack)
            .catch( err => this.setState({ creating: false, error: err.message }));
        }
    }

    render() {
        if (!this.state.fetching) {
            const { classes } = this.props;

            return (
                <div>
                    <Typography variant="display1" gutterBottom>
                        Neuer Student
                    </Typography>

                    <HiddenDivider />
                    <Button onClick={this.goBack} className={classes.button} >
                        <ChevronLeftIcon className={classes.leftIcon} />
                        Zurück
                    </Button>

                    <MyForm
                        fields={StudentCombinedFields}
                        onSubmit={this.createStudent}
                        defaultValues={this.defaultValues}
                        onCancel={this.goBack}
                        studyCourses={this.props.studyCourses}
                        studyRegulations={this.props.studyRegulations}
                        loading={this.state.creating}
                        error={this.state.errors}
                    />
                </div>
            );
        } else {
            return <CircularProgress />;
        }
    }
}

const styles = theme => ({
    button: {
        '&:not(:last-child)': {
            marginRight: theme.spacing.unit,
        },
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    }
});

const mapStateToProps = state => ({
    studyCourses: getStudyCourses(state),
    studyRegulations: getStudyRegulations(state),
});

const mapDispatchToProps = {
    fetchStudyRegulations: entitiesActions.studyRegulation.fetchAll,
    fetchStudyCourses: entitiesActions.studyCourse.fetchAll,
    createStudent: entitiesActions.student.create,
    createStudentInformation: entitiesActions.studentInformation.create,
    createStudy: entitiesActions.study.create,
}

StudentUpdate.propTypes = {
    history: PropTypes.object.isRequired,
    studyCourses: PropTypes.array.isRequired,
    studyRegulations: PropTypes.array.isRequired,
    fetchStudyRegulations: PropTypes.func.isRequired,
    fetchStudyCourses: PropTypes.func.isRequired,
    createStudent: PropTypes.func.isRequired,
    createStudentInformation: PropTypes.func.isRequired,
    createStudy: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles)(StudentUpdate)
);
