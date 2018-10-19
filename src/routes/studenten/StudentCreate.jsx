import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import Field from '../../components/Field';
import NativeSelectField from '../../components/NativeSelectField';
import HiddenDivider from '../../components/HiddenDivider';
import { generateLaenderOptions, isEmpty } from '../../helper/helper'

import { fetchStudyRegulations, fetchStudyCourses } from '../studienkurse/redux/studyActions';
import { getStudyRegulations, getStudyCourses } from '../studienkurse/redux/studySelectors';
import { createStudent } from './redux/studentenActions';


class StudentCreate extends Component {
    static getDerivedStateFromProps(nextProps, prevState) {
        let nextState = {...prevState};
        if (nextProps.studyRegulations !== prevState.__prevProps.studyRegulations) {
            nextState = {
                ...nextState,
                __options: {
                    ...nextState.__options,
                    studyRegulationOptions: nextProps.studyRegulations.map(({ id, title }) => (
                        <MenuItem key={id} value={id}>
                            {title}
                        </MenuItem>
                    ))
                },
                __prevProps: {
                    ...nextState.__prevProps,
                    studyRegulations: nextProps.studyRegulations
                }
            }
        }

        if (nextProps.studyCourses !== prevState.__prevProps.studyCourses) {
            return {
                ...nextState,
                __options: {
                    ...nextState.__options,
                    studyCourseOptions: nextProps.studyCourses.map(({ id, title }) => (
                        <MenuItem key={id} value={id}>
                            {title}
                        </MenuItem>
                    ))
                },
                __prevProps: {
                    ...nextState.__prevProps,
                    studyCourses: nextProps.studyCourses
                }
            }
        }

        return nextState;
    }

    state = {
        firstName : '',
        lastName: '',
        prefix: 'Frau',
        birthDate: '',
        birthPlace: '',
        birthCountry: 'Deutschland',

        matrikelnummer: '',
        year: new Date().getFullYear(),
        studyCourse: 1,
        studyRegulation: '',
        
        street: '',
        streetNumber: '',
        addressExtra: '',
        postal: '',
        city: '',
        country: 'Deutschland',

        mailPrivate: '',
        mailUni: '',
        phoneNumber: '',
        mobileNumber: '',

        __options: {
            laenderOptions: generateLaenderOptions().map(({ value, label }) => (
                <option key={value} value={value}>
                    {label}
                </option>
            )),
            studyRegulationOptions: [],
            studyCourseOptions:  []
        },
        __prevProps: {}
    }

    year = new Date().getFullYear()

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

    submitHandler = (e) => {
        e.preventDefault();

        const { __options, __prevProps, ...data } = this.state;

        // validate input
        if (
            data.firstName && data.firstName.length > 1 &&
            data.lastName && data.lastName.length > 1 &&
            data.matrikelnummer && data.matrikelnummer.toString().length === 6 &&
            (data.year <=  this.year + 2 && data.year >= 1990) &&
            (data.studyCourse === 1 || data.studyCourse === 2)
        ) {
            data.name = `${data.firstName} ${data.lastName}`;
            console.log('SUBMIT', data);
            this.props.createStudent(data);
        } else {
            console.warn('VALIDATION FAILED', data);
        }
    }

    changeHandler = ({ target: { name, value } }) => {
        this.setState({
            [name]: (isNaN(value) || value === '')
                ? value
                : parseInt(value, 10)
        });
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
                    <div className={classes.fieldGroup}>
                        <Field
                            name='firstName'
                            label='Vorname'
                            value={this.state.firstName}
                            onChange={this.changeHandler}
                            className={classes.textField}
                            required
                        />
                        <Field
                            name='lastName'
                            label='Nachname'
                            value={this.state.lastName}
                            onChange={this.changeHandler}
                            className={classes.textField}
                            required
                        />
                        <Field
                            select
                            name='prefix'
                            label='Anrede'
                            value={this.state.prefix}
                            onChange={this.changeHandler}
                            className={classes.textField}
                            required
                        >
                            {['Frau', 'Mann'].map(prefix => (
                                <MenuItem key={prefix} value={prefix}>
                                    {prefix}
                                </MenuItem>
                            ))}
                        </Field>
                    </div>
                    <div className={classes.fieldGroup}>
                        <Field
                            name='birthDate'
                            label='Geburtsdatum'
                            type='date'
                            value={this.state.birthDate}
                            onChange={this.changeHandler}
                            className={classes.textField}
                            required
                            InputLabelProps={{ shrink: true }}
                        />
                        <Field
                            name='birthPlace'
                            label='Geburtsort'
                            value={this.state.birthPlace}
                            onChange={this.changeHandler}
                            className={classes.textField}
                            required
                        />
                        <NativeSelectField
                            name='birthCountry'
                            label='Geburtsland'
                            value={this.state.birthCountry}
                            options={this.state.__options.laenderOptions}
                            onChange={this.changeHandler}
                            required
                            rootProps={{ className: classes.textField }}
                        />
                    </div>

                    <HiddenDivider height={2} />
                    <Typography component='h3' variant='title'>
                        Studium
                    </Typography>
                    <div className={classes.fieldGroup}>
                        <Field
                            name='matrikelnummer'
                            value={this.state.matrikelnummer}
                            onChange={this.changeHandler}
                            label='Matrikelnummer'
                            required
                            type='number'
                            className={classes.textField}
                        />
                        <Field
                            select
                            name='studyCourse'
                            label='Studienkurs'
                            value={this.state.studyCourse}
                            onChange={this.changeHandler}
                            required
                            className={classes.textField}
                        >
                            {this.state.__options.studyCourseOptions}
                        </Field>
                        <Field
                            name='year'
                            value={this.state.year}
                            onChange={this.changeHandler}
                            label='Jahrgang'
                            required
                            type='number'
                            min='1990'
                            max={this.year + 2}
                            className={classes.textField}
                        /> 
                    </div>
                    <div className={classes.fieldGroup}>
                        <Field
                            select
                            name='studyRegulation'
                            label='Studienordnung'
                            value={
                                this.state.studyRegulation !== ''
                                ? this.state.studyRegulation
                                : !isEmpty(this.props.studyRegulations) && this.props.studyRegulations[0].id
                            }
                            onChange={this.changeHandler}
                            required
                            className={classes.textField}
                            InputProps={{ style: { width: '40%' }} }
                        >
                            {this.state.__options.studyRegulationOptions}
                        </Field>
                    </div>
    
                    <HiddenDivider height={2} />
                    <Typography component='h3' variant='title'>
                        Kontaktdaten
                    </Typography>
                    <div className={classes.fieldGroup}>
                        <Field
                            name='mailUni'
                            value={this.state.mailUni}
                            onChange={this.changeHandler}
                            placeholder='vorname.nachname@hhu.de'
                            label='E-Mail Uni'
                            required
                            type='email'
                            className={classes.textField}
                        />
                        <Field
                            name='mailPrivate'
                            value={this.state.mailPrivate}
                            onChange={this.changeHandler}
                            placeholder='vorname.nachname@gmail.com'
                            label='E-Mail Privat (optional)'
                            type='email'
                            className={classes.textField}
                        />
                    </div>
                    <div className={classes.fieldGroup}>
                        <Field
                            name='phoneNumber'
                            value={this.state.phoneNumber}
                            onChange={this.changeHandler}
                            placeholder='+49 1234 5678'
                            label='Festnetznummer (optional)'
                            type='phone'
                            className={classes.textField}
                        />
                        <Field
                            name='mobileNumber'
                            value={this.state.mobileNumber}
                            onChange={this.changeHandler}
                            placeholder='+49 123 456 789 10'
                            label='Mobiltelefon (optional)'
                            type='phone'
                            className={classes.textField}
                        />
                    </div>
                    <HiddenDivider height={2} />
                    <Typography component='h3' variant='title'>
                        Adresse
                    </Typography>
                    <div className={classes.fieldGroup}>
                        <Field
                            name='street'
                            value={this.state.street}
                            onChange={this.changeHandler}
                            label='Straße'
                            required
                            className={classes.textField}
                        />
                        <Field
                            name='streetNumber'
                            value={this.state.streetNumber}
                            onChange={this.changeHandler}
                            label='Hausnummer'
                            required
                            className={classes.textField}
                        />
                        <Field
                            name='addressExtra'
                            value={this.state.addressExtra}
                            onChange={this.changeHandler}
                            label='Zusatz (optional)'
                            className={classes.textField}
                        />
                    </div>
                    <div className={classes.fieldGroup}>
                        <Field
                            name='postal'
                            value={this.state.postal}
                            onChange={this.changeHandler}
                            label='Postleitzahl'
                            required
                            className={classes.textField}
                        />
                        <Field
                            name='city'
                            value={this.state.city}
                            onChange={this.changeHandler}
                            label='Ort'
                            required
                            className={classes.textField}
                        />
                        <NativeSelectField
                            name='country'
                            label='Land'
                            value={this.state.country}
                            options={this.state.__options.laenderOptions}
                            onChange={this.changeHandler}
                            required
                            rootProps={{ className: classes.textField }}
                        />
                    </div>
                </Paper>
                <HiddenDivider height={2} />
                <Button variant='raised' onClick={this.submitHandler} color='primary' className={classes.button}>
                    Student hinzufügen
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
    withStyles(styles)(StudentCreate)
);
