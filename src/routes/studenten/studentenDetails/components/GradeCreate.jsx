import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import omit from 'lodash/omit';

import entitiesActions from '../../../../redux/entitiesActions';
import { getStudents, getSubjects, getSubjectCourses, getStudyCourses, getStudyRegulations, getGradeById } from '../../../../redux/entitiesSelector';
import MyForm from '../../../../components/MyForm';
import GradeFields from '../../../../components/fields/GradeFields';
import { isNotEmpty, isDate } from '../../../../helper/helper';

class GradeCreate extends Component {
    state = { loading: false, error: null }

    submitHandler = (data) => {
        const cleanData = omit(data, ['studyId', 'subjectId']);
        
        if (this.validate(data)) {
            console.log('CREATE GRADE', { data, cleanData });
            this.setState({ loading: true, error: null });
            if (data.id) {
                // update
                this.props.updateGrade(data)
                    .then(this.props.closeModal)
                    .catch(err => this.setState({ loading: false, error: err.message }));
            } else {
                // create
                this.props.createGrade(data)
                    .then(this.props.closeModal)
                    .catch(err => this.setState({ loading: false, error: err.message }));
            }
        };

    }

    defaultValues = () => {
        const { grade, subjectCourses, subjects, data } = this.props;
        
        // get subject
        let subject = {};
        if ((data && isNotEmpty(data.subjectCourseId)) || isNotEmpty(grade)) {
            const __subjectCourseId = isNotEmpty(grade) ? grade.subjectCourseId : data.subjectCourseId;
            const subjectCourse = subjectCourses.find(
                ({ id }) => id === __subjectCourseId
            );
            subject = subjects.find(
                ({ id }) => id === subjectCourse.subjectId
            );
            console.log({ subject, subjectCourse });
        }

        // study and subject are needed to filter subjectCourses
        const extraValues = {
            studyId: (data && isNotEmpty(data.studyId)) ? data.studyId :  '',
            subjectId: isNotEmpty(subject.id) ? subject.id : '',
        }

        if (isNotEmpty(grade)) {
            return {
                ...grade,
                ...extraValues
            };
        }

        return {
            studentId: (data && isNotEmpty(data.studentId)) ? data.studentId : '',
            subjectCourseId: (data && isNotEmpty(data.subjectCourseId)) ? data.subjectCourseId : '',
            grade: '',
            gradingSystem: isNotEmpty(subject.type) ? subject.type : 'de',
            try: (data && data.try) || 1,
            date: '',
            lecturer: '',
            ...extraValues
        }
    }

    validate({ studentId, subjectCourseId, grade, gradingSystem, try: _try, date, lecturer }) {
        let error = [];

        if (typeof studentId !== 'number' || studentId < 0)
            error.push('Bitte wähle einen Studenten aus.');

        if (typeof subjectCourseId !== 'number' || subjectCourseId < 0)
            error.push('Bitte wähle eine Veranstaltung aus.');

        if (!['de', 'fr'].includes(gradingSystem))
            error.push('Bitte wähle ein Notensystem aus.');

        if (typeof grade !== 'number' || grade < 0 || (gradingSystem === 'de' ? grade > 18 : grade > 20))
            error.push(`Bitte gib eine gültige Note zwischen 0 und ${gradingSystem === 'de' ? 18 : 20} ein.`);

        if (typeof _try !== 'number' || _try < 0 )
            error.push('Bitte gib an, um den wievielten Versuch es sich handelt.');

        if (date !== '' && !isDate(date))
            error.push('Bitte gib ein gültiges Datumsformat in der Form YYYY-MM-DD an.');
        
        // RETURN
        if (error.length) {
            this.setState({ error });
            return false;
        }
        return true;
    }

    render() {
        return (
            <div>
                <MyForm
                    fields={GradeFields}
                    onSubmit={this.submitHandler}
                    onCancel={this.props.closeModal}
                    defaultValues={this.defaultValues()}
                    loading={this.state.loading}
                    error={this.state.error}
                    students={this.props.students}
                    studyCourses={this.props.studyCourses}
                    studyRegulations={this.props.studyRegulations}
                    subjects={this.props.subjects}
                    subjectCourses={this.props.subjectCourses}
                    grade={this.props.grade}
                    deleteGrade={this.props.deleteGrade}
                />
            </div>
        );
    }
};

const mapStateToProps = (state, props) => ({
    grade: getGradeById(state, props.data && props.data.gradeId),
    students: getStudents(state),
    studyCourses: getStudyCourses(state),
    studyRegulations: getStudyRegulations(state),
    subjects: getSubjects(state),
    subjectCourses: getSubjectCourses(state),
});

const mapDispatchToProps = {
    createGrade: entitiesActions.grade.create,
    updateGrade: entitiesActions.grade.update,
    deleteGrade: entitiesActions.grade.delete,
};

GradeCreate.propTypes = {
    students: PropTypes.array.isRequired,
    studyCourses: PropTypes.array.isRequired,
    studyRegulations: PropTypes.array.isRequired,
    subjects: PropTypes.array.isRequired,
    subjectCourses: PropTypes.array.isRequired,
    createGrade: PropTypes.func.isRequired,
    updateGrade: PropTypes.func.isRequired,
    deleteGrade: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    data: PropTypes.object,
}

export default connect(mapStateToProps, mapDispatchToProps)(GradeCreate);
