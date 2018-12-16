import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import StudyCourseFields from './fields/StudyCourseFields';
import StudyRegulationFields from './fields/StudyRegulationFields';

import MyForm from '../../components/MyForm';
import { isEmpty, isNotEmpty } from '../../helper/helper';
import { getStudyCourses, getStudyRegulations, getSubjects } from '../../redux/entitiesSelector';
import SubjectFields from './fields/SubjectFields';
import SubjectCourseFields from './fields/SubjectCourseFields';


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
        return (
            <div>
                <Typography variant='display1'>Formulare</Typography>
                <MyForm
                    fields={StudyCourseFields}
                    onSubmit={(values) => this.submitHandler(values, 'StudyCourse')}
                    defaultValues={{
                        title: '',
                        description: ''
                    }}
                    onCancel={this.cancelHandler}
                />
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
            </div>
        );
    }
}

export default connect(state => ({
    studyCourses: getStudyCourses(state),
    studyRegulations: getStudyRegulations(state),
    subjects: getSubjects(state),
}))(Forms);
