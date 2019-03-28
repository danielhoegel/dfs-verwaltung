import React, { Component } from 'react';
import { connect } from 'react-redux';
import omit from 'lodash/omit';

import StudyCourseFields from '../../../../components/fields/StudyCourseFields';
import MyForm from '../../../../components/MyForm';
import entitiesActions from '../../../../redux/entitiesActions';

class StudyCourseUpdate extends Component {
    state = {
        loading: false,
        error: null
    }

    submitHandler = (data) => {
        this.setState({
            loading: true,
            error: null
        });

        this.props.updateStudyCourse(omit(data, ['studyRegulations']))
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
                    fields={StudyCourseFields}
                    onSubmit={this.submitHandler}
                    onCancel={this.props.closeModal}
                    defaultValues={this.props.data}
                    loading={this.state.loading}
                />
            </div>
        );
    }
}

const mapDispatchToProps = {
    updateStudyCourse: entitiesActions.studyCourse.update
};

export default connect(null, mapDispatchToProps)(StudyCourseUpdate);
