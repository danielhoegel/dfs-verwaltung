import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getStudyCourses, getStudyRegulations } from '../../../../redux/entitiesSelector';
import SubjectFields from '../../../../components/fields/SubjectFields';
import MyForm from '../../../../components/MyForm';
import entitiesActions from '../../../../redux/entitiesActions';

class SubjectCreate extends Component {
    state = {
        loading: false,
        error: null
    }

    submitHandler = (data) => {
        this.setState({
            loading: true,
            error: null
        });

        this.props.createSubject(data)
            .then(() => {
                this.props.closeModal();
            })
            .catch(err => {
                this.setState({
                    loading: false,
                    error: err
                });
            });
    }

    render() {
        return (
            <div>
                <MyForm
                    fields={SubjectFields}
                    onSubmit={this.submitHandler}
                    onCancel={this.props.closeModal}
                    defaultValues={{
                        title: '',
                        description: ''
                    }}
                    loading={this.state.loading}
                    studyCourseOptions={this.props.studyCourses}
                    studyRegulations={this.props.studyRegulations}
                />
            </div>
        );
    }
};

const mapStateToProps = state => ({
    studyCourses: getStudyCourses(state),
    studyRegulations: getStudyRegulations(state),
})

const mapDispatchToProps = {
    createSubject: entitiesActions.subject.create
};

export default connect(mapStateToProps, mapDispatchToProps)(SubjectCreate);
