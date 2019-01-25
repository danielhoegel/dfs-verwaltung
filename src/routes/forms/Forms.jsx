import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import MyForm from '../../components/MyForm';
import { isEmpty, isNotEmpty } from '../../helper/helper';
import { getStudyCourses, getStudyRegulations, getSubjects } from '../../redux/entitiesSelector';

import StudyCourseFields from '../../components/fields/StudyCourseFields';
import StudyRegulationFields from '../../components/fields/StudyRegulationFields';
import SubjectFields from '../../components/fields/SubjectFields';
import SubjectCourseFields from '../../components/fields/SubjectCourseFields';
import StudentFields from '../../components/fields/StudentFields';


const studentDefaultValues = {
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
        
        street: '',
        streetNumber: '',
        addressExtra: '',
        postal: '',
        city: '',
        country: 'Deutschland',

        mailPrivate: '',
        mailUni: '',
        phoneNumber: '',
        mobileNumber: '',
    },
    studies: [
        {
            year: new Date().getFullYear(),
            studyCourseId: 1,
            studyRegulationId: '',
            status: 1,
        }
    ]
}


class Forms extends Component {
    
    componentDidMount() {
        if (isEmpty(this.props.studyCourses)) {
            this.props.dispatch({ type: 'FETCH_STUDY_COURSES' });
        }
    }
    
    submitHandler = (values, formName) => {
        console.log(`SUBMIT ${formName}:`, values);
    }

    cancelHandler = () => {
        // confirm('Sind Sie sicher, dass Sie abbrechen wollen?');
    }

    studyCourseOptions() {
        if (isNotEmpty(this.props.studyCourses)) {
            return this.props.studyCourses.map(studyCourse => ({
                value: studyCourse.id,
                label: studyCourse.title
            }));
        }
        return [];
    }

    subjectOptions() {
        if (isNotEmpty(this.props.subjects)) {
            return this.props.subjects.map(subject => ({
                value: subject.id,
                label: subject.title
            }));
        }
        return [];
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Typography variant='display1'>Formulare</Typography>
                <Paper className={classes.paper}>
                    <MyForm
                        fields={StudentFields}
                        onSubmit={(values) => this.submitHandler(values, 'Student')}
                        defaultValues={studentDefaultValues}
                        onCancel={this.cancelHandler}
                        studyRegulations={this.props.studyRegulations}
                        studyCourses={this.props.studyCourses}
                    />
                </Paper>
                <Paper className={classes.paper}>
                    <MyForm
                        fields={StudyCourseFields}
                        onSubmit={(values) => this.submitHandler(values, 'StudyCourse')}
                        defaultValues={{
                            title: '',
                            description: ''
                        }}
                        onCancel={this.cancelHandler}
                    />
                </Paper>
                <Paper className={classes.paper}>
                    <MyForm
                        fields={StudyRegulationFields}
                        onSubmit={(values) => this.submitHandler(values, 'StudyRegulation')}
                        defaultValues={{
                            title: '',
                            description: '',
                            date: '',
                            studyCourseId: ''
                        }}
                        onCancel={this.cancelHandler}
                        studyCourseOptions={this.studyCourseOptions()}
                    />
                </Paper>
                <Paper className={classes.paper}>
                    <MyForm
                        fields={SubjectFields}
                        onSubmit={(values) => this.submitHandler(values, 'StudyRegulation')}
                        defaultValues={{
                            ue: 1,
                            title: 'Zivilrecht II',
                            type: 'de',
                            studyCourseId: 1,
                            studyRegulationId: 2,
                            semester: 2
                        }}
                        onCancel={this.cancelHandler}
                        studyCourseOptions={this.studyCourseOptions()}
                        studyRegulations={this.props.studyRegulations}
                    />
                </Paper>
                <Paper className={classes.paper}>
                    <MyForm
                        fields={SubjectCourseFields}
                        onSubmit={(values) => this.submitHandler(values, 'StudyRegulation')}
                        defaultValues={{
                            subjectId: 0,
                            title: 'BGB AT',
                            type: 'Arbeitsgemeinschaft',
                            credits: 2,
                            zpk: false,
                            participationType: 'Teilnahme'
                        }}
                        onCancel={this.cancelHandler}
                        subjectOptions={this.subjectOptions()}
                    />
                </Paper>
            </div>
        );
    }
}

const styles = theme => ({
    paper: {
        margin: [[theme.spacing.unit * 6, 0]],
        padding: theme.spacing.unit * 3,
    }
})

export default connect(state => ({
    studyCourses: getStudyCourses(state),
    studyRegulations: getStudyRegulations(state),
    subjects: getSubjects(state),
}))(
    withStyles(styles)(Forms)
);
