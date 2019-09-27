import React, { Component } from 'react';
import { connect } from 'react-redux';

import StudyRegulationFields from '../../../../components/fields/StudyRegulationFields';
import MyForm from '../../../../components/MyForm';
import entitiesActions from '../../../../redux/entitiesActions';

class StudyCourseCreate extends Component {
    state = {
        loading: false,
        error: null
    }

    submitHandler = (data) => {
        this.setState({ loading: true, error: null });

        this.props.createStudyRegulation(data)
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
                    defaultValues={{
                        title: '',
                        description: '',
                        date: '',
                        studyCourseId: this.props.data.studyCourse.id
                    }}
                    loading={this.state.loading}
                    studyCourses={this.props.data.studyCourses}
                />
            </div>
        );
    }
}

const mapDispatchToProps = {
    createStudyRegulation: entitiesActions.studyRegulation.create
};

export default connect(null, mapDispatchToProps)(StudyCourseCreate);
