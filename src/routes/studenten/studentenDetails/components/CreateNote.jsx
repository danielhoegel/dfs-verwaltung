import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import Field from '../../../../components/Field';
import SearchSelect from '../../../../components/SearchSelect';
import Divider from '../../../../components/Divider';

import { shortVorlesungTyp } from '../../../../helper/helper';
import {
    getStudentenData,
    getFaecherData,
    getVeranstaltungenForFach,
    getFachForVeranstaltung,
    getNoteForId,
    getNotenForStudentAndVeranstaltung
} from '../../../../helper/selectors';
import FieldRadioGroup from '../../../../components/FieldRadioGroup';
import FieldGroup from '../../../../components/FieldGroup';


class NoteCreateUpdate extends Component {
    static propTypes = {
        closeModal: PropTypes.func.isRequired,
        data: PropTypes.shape({
            studentId: PropTypes.number,
            veranstaltungId: PropTypes.number,
        }).isRequired,
    }

    state = {
        studenten: getStudentenData(),
        faecher: getFaecherData(),

        form: {
            grade: '',
            try: 1,
            date: '',
            lecturer: '',
            studentId: this.props.data.studentId,
            subjectCourseId: '',
            subject: '',
            gradingSystemId: 0
        }
    }

    componentDidMount() {
        const { noteId, veranstaltungId, studentId } = this.props.data;
        console.log(this.props.data);
        if(noteId !== undefined) {
            const note = getNoteForId(noteId);
            this.setState(state => ({
                form: {
                    ...state.form,
                    grade: note.grade,
                    try: note.try,
                    subjectCourseId: note.subjectCourseId,
                    studentId: note.studentId
                }
            }));
        } else if (
            veranstaltungId !== undefined &&
            studentId !== undefined
        ) {
            const fach = getFachForVeranstaltung(veranstaltungId);
            const noten = getNotenForStudentAndVeranstaltung(
                studentId,
                veranstaltungId
            );
            this.setState(state => ({
                form: {
                    ...state.form,
                    veranstaltung: veranstaltungId,
                    subject: fach.id,
                    try: noten.length
                        ? noten[noten.length - 1].try + 1
                        : 1
                }
            }));
        } else if (studentId !== undefined) {
            this.setState(state => ({
                form: {
                    ...state.form,
                    studentId: studentId
                }
            }));
        }
    }
    
    submitHandler = (e) => {
        console.log('SUBMIT', {
            ...this.props.data,
            ...this.state.form
        });
        e.preventDefault();
    }

    changeHandler = (e) => {
        const { name, value } = e.target;
        console.log('change', { name, value });
        this.setState(state => ({
            form: {
                ...state.form,
                [name]: (isNaN(value) || value === '')
                    ? value
                    : Number(value)
            }
        }));
    }

    fachChangeHandler = (e) => {
        const fachId = Number(e.target.value);
        const veranstaltung = this.getVeranstaltungen(fachId)[0];
        this.setState(state => ({
            form: {
                ...state.form,
                subject: fachId,
                subjectCourseId: veranstaltung ? veranstaltung.id : '' 
            }
        }))
    }

    getVeranstaltungen(fachId) {
        return getVeranstaltungenForFach(fachId !== undefined ? fachId : this.state.form.subject)
            .filter(v => v.participationType === 'Note');
    }

    studentenOptions = this.state.studenten.map(s => (
        { value: s.id, label: `${s.firstName} ${s.lastName}` }
    ));

    faecherOptions = this.state.faecher.map(f => (
        { value: f.id, label: f.title }
    ));

    veranstaltungenOptions = () => this.getVeranstaltungen().map(v => ({
        value: v.id,
        label: shortVorlesungTyp(v.type) + (v.title && ` (${v.title})`)
    }));

    render() {
        const { classes } = this.props;
        return (
            <form onSubmit={this.submitHandler} >
                <FieldGroup>
                    <SearchSelect
                        name='studentId'
                        label='Student'
                        value={this.state.form.studentId}
                        onSelect={this.changeHandler}
                        options={this.studentenOptions}
                        className={classes.textField}
                        style={{ width: '35%'}}
                    />
                    <SearchSelect
                        name='subject'
                        label='Fach'
                        value={this.state.form.subject}
                        onSelect={this.fachChangeHandler}
                        options={this.faecherOptions}
                        className={classes.textField}
                    />
                    <Field
                        select
                        name='subjectCourseId'
                        label='Veranstaltung'
                        value={this.state.form.subjectCourseId}
                        onChange={this.changeHandler}
                        className={classes.textField}
                        disabled={
                            (!this.state.form.subject && this.state.form.subject !== 0) ||
                            this.veranstaltungenOptions().length === 1
                        }
                    >
                        {this.veranstaltungenOptions().map(({ value, label }) => (
                            <MenuItem key={value} value={value}>
                                {label}
                            </MenuItem>
                        ))}
                    </Field>
                </FieldGroup>
                <FieldGroup>
                    <FieldGroup
                        className={classes.stackedFieldGroup}
                        style={{ width: '35%'}}
                    >
                        <Field
                            name='grade'
                            label={`Punkte (0 - ${this.state.form.gradingSystemId === 0 ? 18 : 20})`}
                            type='number'
                            min={0}
                            max={this.state.form.gradingSystemId === 'de' ? 18 : 20}
                            step={1}
                            value={this.state.form.grade}
                            onChange={this.changeHandler}
                            autoFocus
                            required
                            className={classNames(classes.textField, classes.punkteField)}
                            variant='outlined'
                            InputLabelProps={{ shrink: true }}
                            InputProps={{ className: classes.punkteFieldInput }}
                            margin="normal"
                        />
                    </FieldGroup>
                    <FieldGroup
                        className={classes.stackedFieldGroup}
                        style={{ width: '65%'}}
                    >
                        <FieldGroup>
                            <FieldRadioGroup
                                name='gradingSystemId'
                                label='Note'
                                value={this.state.form.gradingSystemId}
                                onChange={this.changeHandler}
                                options={[
                                    { value: 0, label: 'DE' },
                                    { value: 1, label: 'FR' },
                                ]}
                            />
                            <Field
                                name='try'
                                label='Versuch'
                                type='number'
                                value={this.state.form.try}
                                onChange={this.changeHandler}
                                className={classes.textField}
                                width={2}
                            />
                        </FieldGroup>
                        <FieldGroup>
                            <Field
                                name='date'
                                label='Prüfungsdatum'
                                type='date'
                                value={this.state.form.datum}
                                onChange={this.changeHandler}
                                className={classes.textField}
                                InputLabelProps={{ shrink: true }}
                            />
                            <Field
                                name='lecturer'
                                label='Prüfer'
                                value={this.state.form.lecturer}
                                onChange={this.changeHandler}
                                className={classes.textField}
                                width={2}
                            />
                        </FieldGroup>
                    </FieldGroup>
                    </FieldGroup>
                <Divider hidden />
                <Button className={classes.button} type='submit' variant='contained' color='primary'>
                    <AddIcon className={classes.leftIcon} />
                    Note hinzufügen
                </Button>
                <Button className={classes.button} onClick={this.props.closeModal} variant='contained'>
                    Abbrechen
                </Button>
            </form>
        );
    }
}

const styles = theme => ({
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
    punkteField: {
        
    },
    punkteFieldInput: {
        height: '100%',
        fontSize: '2rem',
        '& input': {
            textAlign: 'center',
        }
    },
    button: {
        marginRight: theme.spacing.unit
    },
    leftIcon: {
        marginRight: theme.spacing.unit
    },
});

export default withStyles(styles)(NoteCreateUpdate);
