import React, { Component } from 'react';

import apiRequest from '../../helper/apiRequest';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Divider from '../../components/Divider';
import Input from '../../components/Input';
import Select from '../../components/Select';
import InputGroup from '../../components/InputGroup';
import { generateLaenderOptions } from '../../helper/helper'

class StudentCreate extends Component {
    state = {
        firstName : '',
        lastName: '',
        anrede: 'Frau',
        geburtsdatum: '',
        geburtsort: '',
        geburtsland: 'Deutschland',

        matrikelnummer: '',
        jahrgang: new Date().getFullYear(),
        studienkurs: 1,
        studienordnung: '',
        
        straße: '',
        hausnummer: '',
        adresszusatz: '',
        plz: '',
        ort: '',
        land: 'Deutschland',

        maiPrivat: '',
        mailUni: '',
        festnetz: '',
        mobiltelefon: '',

        helper: {
            laenderOptions: generateLaenderOptions(),
            studienordnungOptions: [],
            studienkursOptions: []
        }
    }

    year = new Date().getFullYear()

    componentDidMount() {
        apiRequest('/studienordnungen')
            .then(studienordnungen => {
                this.setState(state => ({
                    helper: {
                        ...state.helper,
                        studienordnungOptions: studienordnungen
                            .sort((a, b) =>
                                (a.datum < b.datum) ? 1
                                    : (a.datum > b.datum) ? -1 : 0
                            )
                            .map(so => ({
                                value: so.id,
                                label: so.name
                            }))
                    }
                }));
            });

        apiRequest('/studienkurse')
            .then(studienkurse => {
                this.setState(state => ({
                    helper: {
                        ...state.helper,
                        studienkursOptions: studienkurse.map(sk => ({
                            value: sk.id,
                            label: sk.name
                        }))
                    }
                }));
            })
    }
    

    goBack = () => {
        this.props.history.goBack();
    }

    submitHandler = (e) => {
        e.preventDefault();

        const data = this.state;

        // validate input
        if (
            data.firstName && data.firstName.length > 1 &&
            data.lastName && data.lastName.length > 1 &&
            data.matrikelnummer && data.matrikelnummer.toString().length === 6 &&
            (data.jahrgang <=  this.year + 2 && data.jahrgang >= 1990) &&
            (data.studienkurs === 1 || data.studienkurs === 2)
        ) {
            data.name = `${data.firstName} ${data.lastName}`;
            console.log('SUBMIT', data);
            apiRequest('/studenten', { method: 'post', data });
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
        return (
            <div>
                <Header content='Neuer Student' />
                <form onSubmit={this.submitHandler} style={{ maxWidth: '640px' }}>
                    <InputGroup>
                        <Input
                            width={4}
                            name='firstName'
                            value={this.state.firstName}
                            onChange={this.changeHandler}
                            placeholder='Vorname'
                            label='Vorname'
                            required
                        />
                        <Input
                            width={5}
                            name='lastName'
                            value={this.state.lastName}
                            onChange={this.changeHandler}
                            placeholder='Nachname'
                            label='Nachname'
                            required
                        />
                        <Select
                            width={3}
                            name='anrede'
                            value={this.state.anrede}
                            onChange={this.changeHandler}
                            label='Anrede'
                            required
                            options={[
                                { value: 'Frau', label: 'Frau'},
                                { value: 'Herr', label: 'Herr'}
                            ]}
                        />
                    </InputGroup>
                    <InputGroup>
                        <Input
                            width={3}
                            name='geburtsdatum'
                            value={this.state.geburtsdatum}
                            onChange={this.changeHandler}
                            placeholder='Geburtsdatum'
                            label='Geburtsdatum'
                            type='date'
                            required
                        />
                        <Input
                            width={4}
                            name='geburtsort'
                            value={this.state.geburtsort}
                            onChange={this.changeHandler}
                            placeholder='Geburtsort'
                            label='Geurtsort'
                            type='text'
                            required
                        />
                        <Select
                            width={5}
                            name='geburtsland'
                            value={this.state.geburtsland}
                            onChange={this.changeHandler}
                            label='Geburtsland'
                            options={this.state.helper.laenderOptions}
                            required
                        />
                    </InputGroup>

                    <Header as='h3' content='Studium' />
                    <InputGroup>
                        <Input
                            width={4}
                            name='matrikelnummer'
                            value={this.state.matrikelnummer}
                            onChange={this.changeHandler}
                            placeholder='Matrikelnummer'
                            label='Matrikelnummer'
                            required
                            type='number'
                            />
                        <Input
                            width={3}
                            name='jahrgang'
                            value={this.state.jahrgang}
                            onChange={this.changeHandler}
                            placeholder='Jahrgang'
                            label='Jahrgang'
                            required
                            type='number'
                            min='1990'
                            max={this.year + 2}
                        />
                        <Select
                            width={5}
                            name='studienkurs'
                            value={this.state.studienkurs}
                            onChange={this.changeHandler}
                            label='Studienkurs'
                            required
                            options={this.state.helper.studienkursOptions}
                        />
                    </InputGroup>
                    <InputGroup>
                        <Select
                            width={7}
                            name='studienordnung'
                            value={this.state.studienordnung}
                            onChange={this.changeHandler}
                            label='Studienordnung'
                            required
                            options={this.state.helper.studienordnungOptions}
                        />
                    </InputGroup>

                    <Header as='h3' content='Kontaktdaten' />
                    <InputGroup>
                        <Input
                            width={6}
                            name='mailUni'
                            value={this.state.mailUni}
                            onChange={this.changeHandler}
                            placeholder='vorname.nachname@hhu.de'
                            label='E-Mail Uni'
                            required
                            type='email'
                        />
                        <Input
                            width={6}
                            name='mailPrivat'
                            value={this.state.mailPrivat}
                            onChange={this.changeHandler}
                            placeholder='vorname.nachname@gmail.com'
                            label='E-Mail Privat (optional)'
                            type='email'
                        />
                    </InputGroup>
                    <InputGroup>
                        <Input
                            width={6}
                            name='festnetz'
                            value={this.state.festnetz}
                            onChange={this.changeHandler}
                            placeholder='+49 1234 5678'
                            label='Festnetznummer (optional)'
                            type='phone'
                        />
                        <Input
                            width={6}
                            name='mobiltelefon'
                            value={this.state.mobiltelefon}
                            onChange={this.changeHandler}
                            placeholder='+49 123 456 789 10'
                            label='Mobiltelefon (optional)'
                            type='phone'
                        />
                    </InputGroup>
                    <Header as='h3' content='Adresse' />
                    <InputGroup>
                        <Input
                            width={6}
                            name='straße'
                            value={this.state.straße}
                            onChange={this.changeHandler}
                            placeholder='Straße'
                            label='Straße'
                            required
                        />
                        <Input
                            width={3}
                            name='hausnummer'
                            value={this.state.hausnummer}
                            onChange={this.changeHandler}
                            placeholder='Hausnummer'
                            label='Hausnummer'
                            required
                        />
                        <Input
                            width={3}
                            name='adresszusatz'
                            value={this.state.adresszusatz}
                            onChange={this.changeHandler}
                            placeholder='Zusatz'
                            label='Zusatz (optional)'
                        />
                    </InputGroup>
                    <InputGroup>
                        <Input
                            width={3}
                            name='plz'
                            value={this.state.plz}
                            onChange={this.changeHandler}
                            placeholder='Postleitzahl'
                            label='Postleitzahl'
                            required
                        />
                        <Input
                            width={4}
                            name='ort'
                            value={this.state.ort}
                            onChange={this.changeHandler}
                            placeholder='Ort'
                            label='Ort'
                            required
                        />
                        <Select
                            width={5}
                            name='land'
                            value={this.state.land}
                            onChange={this.changeHandler}
                            options={this.state.helper.laenderOptions}
                            label='Land'
                        />
                    </InputGroup>
                    <Divider hidden />
                    <Button type='submit' content='Student hinzufügen' primary />
                    <Button content='Abbrechen' onClick={this.goBack} />
                </form>
            </div>
        );
    }
}

export default StudentCreate;
