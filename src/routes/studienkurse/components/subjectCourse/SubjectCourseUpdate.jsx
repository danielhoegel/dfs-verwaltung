import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getSubjects } from '../../../../redux/entitiesSelector';
import SubjectCourseFields from '../../../../components/fields/SubjectCourseFields';
import MyForm from '../../../../components/MyForm';
import entitiesActions from '../../../../redux/entitiesActions';


class SubjectCourseUpdate extends Component {
    state = { loading: false, error: null }

    submitHandler = (data) => {
        this.setState({ loading: true, error: null });
        this.props.updateSubjectCourse(data)
            .then(this.props.closeModal)
            .catch(err => this.setState({ loading: false, error: err.message }));
    }

    render() {
        return (
            <div>
                <MyForm
                    fields={SubjectCourseFields}
                    onSubmit={this.submitHandler}
                    onCancel={this.props.closeModal}
                    defaultValues={this.props.data}
                    loading={this.state.loading}
                    subjects={this.props.subjects}
                    error={this.state.error}
                    mode='update'
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    subjects: getSubjects(state),
});

const mapDispatchToProps = {
    updateSubjectCourse: entitiesActions.subjectCourse.update
};

SubjectCourseUpdate.propTypes = {
    subjects: PropTypes.array.isRequired,
    updateSubjectCourse: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SubjectCourseUpdate);
