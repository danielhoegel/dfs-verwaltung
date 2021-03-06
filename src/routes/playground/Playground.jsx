import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

import HiddenDivider from '../../components/HiddenDivider';
import SearchSelectOld from '../../components/SearchSelect';
import SearchSelect from './SearchSelect';
import Divider from '../../components/Divider';
// import { generateLaenderOptions } from '../../helper/helper';


class Playground extends Component {
    state = {
        value: 'de',
        countries: 'de',
        someSelectOpen: true
    }

    changeHandlerOld = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    changeHandler = (option) => {
        if (option === null) {
            this.setState({ value: { value: '', label: '' }});
        } else {
            this.setState({ value: option });
        }
    }

    countries() {
        return [
            { value: 'de', label: 'Deutschland', group: 'Europa' },
            { value: 'fr', label: 'Frankreich', group: 'Europa' },
            { value: 'es', label: 'Spanien', group: 'Europa' },
            { value: 'nl', label: 'Niederlande', group: 'Europa' },
            { value: 'uk', label: 'Vereinigtes Königreich', group: 'Europa' },
            { value: 'us', label: 'Vereinigtes Staaten von Amerika', group: 'Amerika' },
            { value: 'mx', label: 'Mexiko', group: 'Amerika' },
            { value: 'ca', label: 'Kanada', group: 'Amerika' }
        ].sort((a, b) => a.label.localeCompare(b.label));
    }

    options() {
        const countries = this.countries();

        const groupedCountries = [];
        countries.forEach(country => {
            const option = { label: country.label, value: country.value };
            const group = groupedCountries.filter(_group => _group.label === country.group)[0];
            if (group) {
                groupedCountries[groupedCountries.indexOf(group)].options.push(option);
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
                <Typography variant='h4'>Playground</Typography>
                <HiddenDivider height={2} />
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
        );
    }
}

export default Playground;
