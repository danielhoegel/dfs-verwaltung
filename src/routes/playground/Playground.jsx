import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

import HiddenDivider from '../../components/HiddenDivider';
import SearchSelectOld from '../../components/SearchSelect';
import SearchSelect from './SearchSelect';
import Divider from '../../components/Divider';
import GradeCreate from '../studenten/studentenDetails/components/GradeCreate';
import { Paper } from '@material-ui/core';
// import { generateLaenderOptions } from '../../helper/helper';


class Playground extends Component {
    state = {
        value: 'de',
        countries: 'de'
    }

    changeHandlerOld = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    changeHandler = (option) => {
        console.log('change', option);
        if (option === null) {
            this.setState({ value: { value: '', label: '' }})
        } else {
            this.setState({ value: option });
        }
    }

    countries() {
        return [
            {value: 'de', label: 'Deutschland', group: 'Europa'},
            {value: 'fr', label: 'Frankreich', group: 'Europa'},
            {value: 'es', label: 'Spanien', group: 'Europa'},
            {value: 'nl', label: 'Niederlande', group: 'Europa'},
            {value: 'uk', label: 'Vereinigtes Königreich', group: 'Europa'},
            {value: 'us', label: 'Vereinigtes Staaten von Amerika', group: 'Amerika'},
            {value: 'mx', label: 'Mexiko', group: 'Amerika'},
            {value: 'ca', label: 'Kanada', group: 'Amerika'}
        ].sort((a, b) => a.label.localeCompare(b.label));
    }

    options() {
        const countries = this.countries();

        const groupedCountries = [];
        countries.forEach(country => {
            const option = {label: country.label, value: country.value};
            const group = groupedCountries.filter(group => group.label === country.group)[0];
            if (group) {
                groupedCountries[groupedCountries.indexOf(group)].options.push(option)
            } else {
                groupedCountries.push({
                    label: country.group,
                    options: [option]
                });
            }
        });
        return groupedCountries;
    }

    render() {
        return (
            <div>
                <Typography variant='display1'>Playground</Typography>
                <HiddenDivider height={2} />
                <Paper style={{ padding: '1.5rem', maxWidth: '800px' }}>
                    <GradeCreate
                        closeModal={() => console.log('close')}
                        data={{
                            studentId: 0,
                            studyId: 13,
                            subjectCourseId: 0
                        }}
                    />
                </Paper>
                <Divider height='8rem' />
                <SearchSelectOld
                    name='countries'
                    value={this.state.countries}
                    label='Länder'
                    onSelect={this.changeHandlerOld}
                    options={this.countries()}
                /> 
                <HiddenDivider height={2} />
                <SearchSelect
                    value={this.state.value}
                    onChange={this.changeHandler}
                    options={this.countries()}
                    isClearable
                />
            </div>
        )
    }
}

export default Playground;
