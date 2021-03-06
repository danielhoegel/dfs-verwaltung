import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import omit from 'lodash/omit';

import { getStudyCourses, getStudyRegulations } from '../../../../redux/entitiesSelector';
import SubjectFields from '../../../../components/fields/SubjectFields';
import MyForm from '../../../../components/MyForm';
import entitiesActions from '../../../../redux/entitiesActions';


class SubjectUpdate extends Component {
    state = { loading: false, error: null }

    submitHandler = (data) => {
        this.setState({ loading: true, error: null });
        this.props.updateSubject(omit(data, ['subjectCourses']))
            .then(this.props.closeModal)
            .catch(err => this.setState({ loading: false, error: err }));
    }

    render() {
        return (
            <div>
                <MyForm
                    fields={SubjectFields}
                    onSubmit={this.submitHandler}
                    onCancel={this.props.closeModal}
                    defaultValues={this.props.data}
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
    updateSubject: entitiesActions.subject.update
};

SubjectUpdate.propTypes = {
    studyCourses: PropTypes.array.isRequired,
    studyRegulations: PropTypes.array.isRequired,
    updateSubject: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SubjectUpdate);
