import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Divider from '../../../components/Divider';
import Input from '../../../components/Input';
import Select from '../../../components/Select';
import InputGroup from '../../../components/InputGroup';
import Button from '../../../components/Button';

import {
    getStudentenData,
    getFaecherData,
    // getStudentForId,
    // getVeranstaltungForId,
    getVeranstaltungenForFach,
    getFachForVeranstaltung,
    getNoteForId,
    getNotenForStudentAndVeranstaltung
} from '../../../helper/selectors';

import { shortVorlesungTyp } from '../../../helper/helper';

const EMPTY_VALUE = 'EMPTY_VALUE';

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
                punkte: '',
                versuch: 1,
                datum: '',
                pruefer: '',
                student: this.props.data.studentId || EMPTY_VALUE,
                veranstaltung: '',
                fach: EMPTY_VALUE,
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
                    punkte: note.punkte,
                    versuch: note.versuch,
                    veranstaltung: note.veranstaltungID,
                    student: note.studentID
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
                    fach: fach.id,
                    versuch: noten.length
                        ? noten[noten.length - 1].versuch + 1
                        : 1
                }
            }));
        } else if (studentId !== undefined) {
            this.setState(state => ({
                form: {
                    ...state.form,
                    student: studentId
                }
            }));
        }
    }
    
    submitHandler = (e) => {
        console.log('SUBMIT', {
            ...this.state.form,
            ...this.props.data
        });
        e.preventDefault();
    }

    changeHandler = (e) => {
        const { name, value } = e.target;
        this.setState(state => ({
            form: {
                ...state.form,
                [name]: (isNaN(value) || value === '')
                    ? value
                    : parseInt(value, 10)
            }
        }));
    }

    fachChangeHandler = (e) => {
        const fachId = parseInt(e.target.value, 10);
        this.setState(state => ({
            form: {
                ...state.form,
                fach: fachId,
                veranstaltung: this.getVeranstaltungen(fachId)[0].id
            }
        }))
    }

    getVeranstaltungen(fach) {
        return getVeranstaltungenForFach(fach || this.state.form.fach)
            .filter(v => v.teilnahmeart === 'Note');
    }

    studentenOptions = () => ([
        { value: EMPTY_VALUE, label: 'Student auswählen', disabled: true },
        ...this.state.studenten
            .map(s => ({ value: s.id, label: s.name }))
    ]);
    
    veranstaltungenOptions = () => this.getVeranstaltungen()
        .map(v => ({
            value: v.id,
            label: shortVorlesungTyp(v.typ) + (v.name && ` (${v.name})`)
        }));

    faecherOptions = () => ([
        { value: EMPTY_VALUE, label: 'Fach auswählen', disabled: true },
        ...this.state.faecher
            .map(f => ({ value: f.id, label: f.name }))]);

    render() {
        return (
            <div>
                {/* <h2>{student.name}</h2>
                <strong>{fach.name}</strong> (
                    {veranstaltung.typ}
                    {veranstaltung.name && `: ${veranstaltung.name}`}
                ) */}
                {/* <Divider hidden /> */}
                
                <form onSubmit={this.submitHandler} >
                    <InputGroup>
                        <Select
                            width={4}
                            name='student'
                            label='Student'
                            placeholder='Student'
                            value={this.state.form.student}
                            onChange={this.changeHandler}
                            options={this.studentenOptions()}
                        />
                        <Select
                            width={4}
                            name='fach'
                            label='Fach'
                            placeholder='Fach'
                            value={this.state.form.fach}
                            onChange={this.fachChangeHandler}
                            options={this.faecherOptions()}
                        />
                        <Select
                            width={4}
                            name='veranstaltung'
                            label='Veranstaltung'
                            placeholder='Veranstaltung'
                            value={this.state.form.veranstaltung}
                            onChange={this.changeHandler}
                            options={this.veranstaltungenOptions()}
                            disabled={!this.state.form.fach || this.state.form.fach === EMPTY_VALUE}
                        />
                    </InputGroup>
                    <InputGroup>
                        <InputGroup width={4}>
                            <Input
                                name='punkte'
                                label='Punkte (0 - 18)'
                                placeholder='Punkte'
                                type='number'
                                value={this.state.form.punkte}
                                onChange={this.changeHandler}
                                autoFocus
                                required
                                style={{fontSize: '2rem', textAlign: 'center'}}
                            />    
                        </InputGroup>
                        <InputGroup width={8} stacked>
                            <InputGroup>
                                <Input
                                    name='versuch'
                                    label='Versuch'
                                    placeholder='Versuch'
                                    type='number'
                                    value={this.state.form.versuch}
                                    onChange={this.changeHandler}
                                />
                                <Input
                                    name='datum'
                                    label='Prüfungsdatum'
                                    type='date'
                                    value={this.state.form.datum}
                                    onChange={this.changeHandler}
                                />
                            </InputGroup>
                            <InputGroup>
                                <Input
                                    name='pruefer'
                                    label='Prüfer'
                                    placeholder='Prüfer'
                                    value={this.state.form.pruefer}
                                    onChange={this.changeHandler}
                                />
                            </InputGroup>
                        </InputGroup>
                    </InputGroup>

                    <Divider hidden />

                    <Button primary type='submit' content='Note hinzufügen' icon='plus' />
                    <Button onClick={this.props.closeModal} content='Abbrechen' />
                </form>
                
            </div>
        );
    }
}

export default NoteCreateUpdate;
