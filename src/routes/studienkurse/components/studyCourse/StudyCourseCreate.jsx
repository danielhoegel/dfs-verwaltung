import React, { Component } from 'react';
import { connect } from 'react-redux';

import StudyCourseFields from '../../../../components/fields/StudyCourseFields';
import MyForm from '../../../../components/MyForm';
import entitiesActions from '../../../../redux/entitiesActions';

class StudyCourseCreate extends Component {
    state = {
        loading: false,
        error: null
    }

    submitHandler = (data) => {
        this.setState({
            loading: true,
            error: null
        });

        this.props.createStudyCourse(data)
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
                    defaultValues={{
                        title: '',
                        description: ''
                    }}
                    loading={this.state.loading}
                />
            </div>
        );
    }
};

const mapDispatchToProps = {
    createStudyCourse: entitiesActions.studyCourse.create
};

export default connect(null, mapDispatchToProps)(StudyCourseCreate);
