import React, { Component, Fragment } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AddIcon from '@material-ui/icons/Add';

import SelectButton from '../../SelectButton';
import Modal from '../../Modal';
import GradeCreate from '../../../routes/studenten/studentenDetails/components/GradeCreate';


const VALUES = {
    createStudent: 'createStudent',
    createGrade: 'createGrade',
    createStudyRegulation: 'createStudyRegulation',
};

class GlobalAddMenu extends Component {
    state = {
        gradeCreateModalOpen: false,
    }

    closeGradeCreateModal = () => this.setState({ gradeCreateModalOpen: false, });

    clickHandler = value => {
        switch (value) {
            case VALUES.createStudent:
                this.props.history.push('/studenten/create');
                break;

            case VALUES.createGrade:
                this.setState({ gradeCreateModalOpen: true, });
                break;

            default:
                break;
        }
    }
    render() {
        return (
            <Fragment>
                <SelectButton
                    icon={<AddIcon />}
                    options={[
                        {value: VALUES.createStudent, label: 'Student'},
                        {value: VALUES.createGrade, label: 'Note'},
                    ]}
                    onClick={this.clickHandler}
                    className={this.props.className}
                />
                <Modal
                    component={GradeCreate}
                    title='Note hinzufügen'
                    open={this.state.gradeCreateModalOpen}
                    close={this.closeGradeCreateModal}
                    preventClosing
                />
            </Fragment>
        );
    }
};

GlobalAddMenu.propTypes = {
};

const mapDispatchToProps = {  
};

export default connect(null, mapDispatchToProps)(withRouter(GlobalAddMenu));
