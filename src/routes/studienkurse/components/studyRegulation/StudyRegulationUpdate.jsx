import React, { Component } from 'react';
import { connect } from 'react-redux';

import StudyRegulationFields from '../../../../components/fields/StudyRegulationFields';
import MyForm from '../../../../components/MyForm';
import { isNotEmpty } from '../../../../helper/helper';
import entitiesActions from '../../../../redux/entitiesActions';

class StudyCourseCreate extends Component {
    state = {
        loading: false,
        error: null
    }

    submitHandler = (data) => {
        console.log('CREATE', data);
        this.setState({ loading: true, error: null });

        this.props.updateStudyRegulation(data)
            .then(this.props.closeModal)
            .catch(err => this.setState({ loading: false, error: err }));
    } 

    studyCourseOptions() {
        if (isNotEmpty(this.props.data.studyCourses)) {
            return this.props.data.studyCourses.map(studyCourse => ({
                value: studyCourse.id,
                label: studyCourse.title
            }));
        }
        return [];
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
                    studyCourseOptions={this.studyCourseOptions()}
                />
            </div>
        );
    }
};

const mapDispatchToProps = {
    updateStudyRegulation: entitiesActions.studyRegulation.update
};

export default connect(null, mapDispatchToProps)(StudyCourseCreate);
