import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AddIcon from '@material-ui/icons/Add';

import SelectButton from '../../SelectButton';


const VALUES = {
    createStudent: 'createStudent',
    createGrade: 'createGrade',
    createStudyRegulation: 'createStudyRegulation',
};

class GlobalAddMenu extends Component {
    clickHandler = value => {
        switch (value) {
            case VALUES.createStudent:
                this.props.history.push('/studenten/create');
                break;

            case VALUES.createGrade:
                return alert('createGrade');

            case VALUES.createStudyRegulation:
                return alert('createStudyRegulation');

            default:
                break;
        }
    }
    render() {
        return (
            <SelectButton
                icon={<AddIcon />}
                options={[
                    {value: VALUES.createStudent, label: 'Student'},
                    {value: VALUES.createGrade, label: 'Note'},
                    {value: VALUES.createStudyRegulation, label: 'Prüfungsordnung'},
                ]}
                onClick={this.clickHandler}
                className={this.props.className}
            />
        );
    }
};

GlobalAddMenu.propTypes = {
};

const mapDispatchToProps = {  
};

export default connect(null, mapDispatchToProps)(withRouter(GlobalAddMenu));
