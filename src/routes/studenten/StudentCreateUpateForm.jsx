import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import HiddenDivider from '../../components/HiddenDivider';
import { isEmpty, changeNestedObject, removeByIndex } from '../../helper/helper'
import FieldArray from '../../components/FieldArray';

import { fetchStudyRegulations, fetchStudyCourses } from '../studienkurse/redux/studyActions';
import { createStudent } from './redux/studentenActions';
import { getStudyCourses, getStudyRegulations } from '../../redux/entitiesSelector';
import UpdateStudent from '../../components/update/student';
import UpdateStudentInformation from '../../components/update/studentInformation';
import UpdateStudy from '../../components/update/studentStudy';


class StudentCreateUpdateForm extends Component {
    componentDidMount() {
        if (isEmpty(this.props.studyRegulations)) {
            this.props.fetchStudyRegulations();
        }
        
        if (isEmpty(this.props.studyCourses)) {
            this.props.fetchStudyCourses();
        }
    }
    
    goBack = () => {
        this.props.history.goBack();
    }

    parseValue(value) {
        return (isNaN(value) || value === '')
            ? value
            : Number(value);
    }

    changeHandler = ({ target: { name, value } }) => {
        this.setState({
            [name]: this.parseValue(value)
        });
    }

    deepChangeHandler = ({ target: { name, value } }) => {
        const [firstKey, ...keys] = name.split('.');
        const nextState = changeNestedObject(keys, value, this.state[firstKey]);
        // console.log('DEEP-CHANGE', {keys, nextState});
        this.setState({
            [firstKey]: nextState
        });
    }

    addStudy = () => {
        this.setState(state => ({
            studies: [
                ...state.studies,
                {
                    year: this.year,
                    studyCourse: '',
                    studyRegulation: '',
                }
            ]
        }));
    }

    removeStudy = (index) => {
        const nextStudies = removeByIndex(this.state.studies, index);
        this.setState({ studies: nextStudies });
    }

    render() {
        const { classes } = this.props;

        return (
            <form onSubmit={this.submitHandler} className={classes.form}>
                <Typography variant='display1' gutterBottom>
                    Neuer Student
                </Typography>
                <HiddenDivider />
                <Paper className={classes.paper} >
                    
                    <UpdateStudent
                        onChange={this.deepChangeHandler}
                        values={this.state.student}
                    />

                    <UpdateStudentInformation
                        onChange={this.deepChangeHandler}
                        values={this.state.studentInformation}
                    />

                    <HiddenDivider height={2} />
                    <Typography component='h3' variant='title'>
                        Studium
                    </Typography>
                    <FieldArray
                        component={UpdateStudy}
                        values={this.state.studies}
                        onChange={this.deepChangeHandler}
                        addlabel='Studienkurs hinzufügen'
                        prefix='studies'
                        addHandler={this.addStudy}
                        removeHandler={this.removeStudy}
                        min={1}
                        studyRegulations={this.props.studyRegulations}
                        studyCourses={this.props.studyCourses}
                    />
                </Paper>

                <HiddenDivider height={2} />
                <Button variant='raised' onClick={this.submitHandler} color='primary' className={classes.button}>
                    {this.props.submitLabel}
                </Button>
                <Button variant='raised' onClick={this.goBack} className={classes.button}>
                    Abbrechen
                </Button>
            </form>
        );
    }
}

const styles = theme => ({
    form: {
        maxWidth: '720px'
    },
    paper: {
        padding: 2 * theme.spacing.unit
    },
    fieldGroup: {
        display: 'flex'
    },
    stackedFieldGroup: {
        flexDirection: 'column'
    },
    textField: {
        margin: theme.spacing.unit,
        flex: 1
    },
    button: {
        marginRight: theme.spacing.unit
    },
    leftIcon: {
        marginRight: theme.spacing.unit
    },
});

const mapStateToProps = (state) => ({
    studyRegulations: getStudyRegulations(state),
    studyCourses: getStudyCourses(state),
});

const mapDispatchToProps = {
    fetchStudyRegulations,
    fetchStudyCourses,
    createStudent
};

export default connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles)(StudentCreateUpdateForm)
);
