import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getStudyCourses, getStudyRegulations } from '../../../../redux/entitiesSelector';
import SubjectFields from '../../../../components/fields/SubjectFields';
import MyForm from '../../../../components/MyForm';
import entitiesActions from '../../../../redux/entitiesActions';


class SubjectCreate extends Component {
    state = { loading: false, error: null }

    submitHandler = (data) => {
        this.setState({ loading: true, error: null });
        this.props.createSubject(data)
            .then(this.props.closeModal)
            .catch(err => this.setState({ loading: false, error: err }));
    }

    defaultValues = {
        title: '',
        description: '',
        type: 'de',
        studyCourseId: this.props.data.studyCourseId,
        studyRegulationId: this.props.data.studyRegulationId,
        semester: '',
        ue: ''
    }

    render() {
        return (
            <div>
                <MyForm
                    fields={SubjectFields}
                    onSubmit={this.submitHandler}
                    onCancel={this.props.closeModal}
                    defaultValues={this.defaultValues}
                    loading={this.state.loading}
                    studyCourses={this.props.studyCourses}
                    studyRegulations={this.props.studyRegulations}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    studyCourses: getStudyCourses(state),
    studyRegulations: getStudyRegulations(state),
});

const mapDispatchToProps = {
    createSubject: entitiesActions.subject.create
};

SubjectCreate.propTypes = {
    studyCourses: PropTypes.array.isRequired,
    studyRegulations: PropTypes.array.isRequired,
    createSubject: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SubjectCreate);
