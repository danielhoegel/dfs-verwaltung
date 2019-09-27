import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getSubjects } from '../../../../redux/entitiesSelector';
import SubjectCourseFields from '../../../../components/fields/SubjectCourseFields';
import MyForm from '../../../../components/MyForm';
import entitiesActions from '../../../../redux/entitiesActions';


class SubjectCourseCreate extends Component {
    state = { loading: false, error: null }

    submitHandler = (data) => {
        this.setState({ loading: true, error: null });
        this.props.createSubjectCourse(data)
            .then(this.props.closeModal)
            .catch(err => this.setState({ loading: false, error: err }));
    }

    defaultValues = {
        title: '',
        type: '',
        subjectId: this.props.data.id,
        credits: '',
        participationType: '',
        zpk: false,
    }

    render() {
        return (
            <div>
                <MyForm
                    fields={SubjectCourseFields}
                    onSubmit={this.submitHandler}
                    onCancel={this.props.closeModal}
                    defaultValues={this.defaultValues}
                    loading={this.state.loading}
                    studyCourses={this.props.subjects}
                    subjects={this.props.subjects}
                    mode='create'
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    subjects: getSubjects(state),
});

const mapDispatchToProps = {
    createSubjectCourse: entitiesActions.subjectCourse.create
};

SubjectCourseCreate.propTypes = {
    subjects: PropTypes.array.isRequired,
    createSubjectCourse: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SubjectCourseCreate);
