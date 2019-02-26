import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import HiddenDivider from '../../components/HiddenDivider';
import { isEmpty, changeNestedObject, removeByIndex, isNotEmpty } from '../../helper/helper'

import { fetchStudyRegulations, fetchStudyCourses } from '../studienkurse/redux/studyActions';
import { getStudyCourses, getStudyRegulations } from '../../redux/entitiesSelector';
import UpdateStuent from '../../components/update/student';
import UpdateStudentInformation from '../../components/update/studentInformation';
import FieldArray from '../../components/FieldArray';
import UpdateStudy from '../../components/update/studentStudy';
import entitiesActions from '../../redux/entitiesActions';


class StudentCreate extends Component {
    year = new Date().getFullYear()
    state = {
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
    
            mailPrivate: '',
            mailUni: '',
            phoneNumber: '',
            mobileNumber: '',

            iban: '',
            bic: ''
        },
        studies: [
            {
                year: this.year,
                studyCourseId: 1,
                studyRegulationId: '',
                status: 1,
            }
        ]

    }

    componentDidMount() {
        if (isEmpty(this.props.studyRegulations)) {
            this.props.fetchStudyRegulations();
        }
        
        if (isEmpty(this.props.studyCourses)) {
            this.props.fetchStudyCourses();
        }

        if (isNotEmpty(this.props.values) ) {
            this.setState(this.props.values);
        }
    }
    
    goBack = () => {
        this.props.history.goBack();
    }

    submitHandler = (e) => {
        e.preventDefault();

        const { __options, __prevProps, ...data } = this.state;

        // validate input
        if (true || (// TODO: fix implementation with new data structure
            data.firstName && data.firstName.length > 1 &&
            data.lastName && data.lastName.length > 1 &&
            data.matrikelnummer && data.matrikelnummer.toString().length === 6 &&
            (data.year <=  this.year + 2 && data.year >= 1990) &&
            (data.studyCourse === 1 || data.studyCourse === 2)
        )) {
            console.log('SUBMIT', data);
            // apiRequest('/students', { method: 'post', data: data.student })
            //     .then(({ id: studentId }) => {
            //         apiRequest('/studentInformations', {
            //             method: 'post',
            //             data: { ...data.studentInformation, studentId }
            //         });
            //         data.studies.forEach(study => {
            //             apiRequest('/studies', {
            //                 method: 'post',
            //                 data: { ...study, studentId }
            //             });
            //         })
            //     })
            //     .catch(err => {
            //         console.log('Error while creating new Student', { err, data });
            //     });
            this.props.createStudent(data.student)
                .then(({ id: studentId }) => {
                    const studentInformationRequest= this.props.createStudentInformation({ ...data.studentInformation, studentId });
                    const studyRequests = [];
                    data.studies.forEach(study => {
                        studyRequests.push(this.props.createStudy({ ...study, studentId }));
                    });
                    Promise.all([studentInformationRequest, ...studyRequests])
                        .then(res => {
                            console.log('CREATE STUDENT + EXTRAS SUCCESS', res);
                        })
                });
        } else {
            console.warn('VALIDATION FAILED', data);
        }
    }

    parseValue(value) {
        return (isNaN(value) || value === '')
            ? value
            : Number(value);
    }

    changeHandler = ({ target: { name, value } }) => {
        this.setState({
            [name]: this.parseValue(value)
        });
    }

    deepChangeHandler = ({ target: { name, value } }) => {
        const [firstKey, ...keys] = name.split('.');
        const nextState = changeNestedObject(keys, value, this.state[firstKey]);
        // console.log('DEEP-CHANGE', {keys, nextState});
        this.setState({
            [firstKey]: nextState
        });
    }

    addStudy = () => {
        this.setState(state => ({
            studies: [
                ...state.studies,
                {
                    year: this.year,
                    studyCourse: '',
                    studyRegulation: '',
                }
            ]
        }));
    }

    removeStudy = (index) => {
        const nextStudies = removeByIndex(this.state.studies, index);
        this.setState({ studies: nextStudies });
    }

    render() {
        const { classes } = this.props;

        return (
            <form onSubmit={this.submitHandler} className={classes.form}>
                <Typography variant='display1' gutterBottom>
                    Neuer Student
                </Typography>
                <HiddenDivider />
                <Paper className={classes.paper} >
                    
                    <UpdateStuent
                        onChange={this.deepChangeHandler}
                        values={this.state.student}
                    />

                    <UpdateStudentInformation
                        onChange={this.deepChangeHandler}
                        values={this.state.studentInformation}
                    />

                    <HiddenDivider height={2} />
                    <Typography component='h3' variant='title'>
                        Studium
                    </Typography>
                    <FieldArray
                        component={UpdateStudy}
                        values={this.state.studies}
                        onChange={this.deepChangeHandler}
                        addlabel='Studienkurs hinzufügen'
                        prefix='studies'
                        addHandler={this.addStudy}
                        removeHandler={this.removeStudy}
                        min={1}
                        studyRegulations={this.props.studyRegulations}
                        studyCourses={this.props.studyCourses}
                    />
                </Paper>

                <HiddenDivider height={2} />
                <Button variant='raised' onClick={this.submitHandler} color='primary' className={classes.button}>
                    Student hinzufügen
                </Button>
                <Button variant='raised' onClick={this.goBack} className={classes.button}>
                    Abbrechen
                </Button>
            </form>
        );
    }
}

const styles = theme => ({
    form: {
        maxWidth: '720px'
    },
    paper: {
        padding: 2 * theme.spacing.unit
    },
    fieldGroup: {
        display: 'flex'
    },
    stackedFieldGroup: {
        flexDirection: 'column'
    },
    textField: {
        margin: theme.spacing.unit,
        flex: 1
    },
    button: {
        marginRight: theme.spacing.unit
    },
    leftIcon: {
        marginRight: theme.spacing.unit
    },
});


const mapStateToProps = (state) => ({
    studyRegulations: getStudyRegulations(state),
    studyCourses: getStudyCourses(state),
});

const mapDispatchToProps = {
    fetchStudyRegulations,
    fetchStudyCourses,
    createStudent: entitiesActions.student.create,
    createStudentInformation: entitiesActions.studentInformation.create,
    createStudy: entitiesActions.study.create,
};

export default connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles)(StudentCreate)
);
