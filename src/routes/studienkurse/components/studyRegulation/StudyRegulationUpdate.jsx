import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import omit from 'lodash/omit';

import StudyRegulationFields from '../../../../components/fields/StudyRegulationFields';
import MyForm from '../../../../components/MyForm';
import entitiesActions from '../../../../redux/entitiesActions';

class StudyRegulationUpdate extends Component {
    state = {
        loading: false,
        error: null
    }

    submitHandler = (data) => {
        this.setState({ loading: true, error: null });

        this.props.updateStudyRegulation(omit(data, 'subjectCourses'))
            .then(this.props.fetchAllStudyRegulations)
            .then(this.props.history.replace(
                `/studienkurse/${data.studyCourseId}/studienordnung/${data.id}`
            ))
            .then(this.props.closeModal)
            .catch(err => this.setState({ loading: false, error: err }));
    } 

    render() {
        return (
            <div>
                <MyForm
                    fields={StudyRegulationFields}
                    onSubmit={this.submitHandler}
                    onCancel={this.props.closeModal}
                    defaultValues={this.props.data.studyRegulation}
                    loading={this.state.loading}
                    studyCourses={this.props.data.studyCourses}
                />
            </div>
        );
    }
};

const mapDispatchToProps = {
    updateStudyRegulation: entitiesActions.studyRegulation.update,
    fetchAllStudyRegulations: entitiesActions.studyRegulation.fetchAll,
};

export default connect(null, mapDispatchToProps)(
    withRouter(StudyRegulationUpdate)
);
