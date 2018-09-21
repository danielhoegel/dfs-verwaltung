import React, { Component } from 'react';

import './StudentenFilter.scss';
import studentenData from '../../data/studenten';
import { FilterContextConsumer } from '../filter/FilterContext';

class StudentenFilter extends Component {
    state = {
        studenten: studentenData,
    }

    changeHandler = ({ target }) => {
        this.setState({
            [target.name]: target.value
        });
    }

    render() {
        const filterValues = {
            semester: [
                { value: '', label: 'Alle Semester' },
                { value: 1, label: '1. Semester' },
                { value: 2, label: '2. Semester' },
                { value: 3, label: '3. Semester' },
            ],
            studienkurs: [
                {value: '', label: 'Alle Studienkurse'},
                {value: 1, label: 'Grundstudienkurs'},
                {value: 2, label: 'Aufbaustudienkurs'},
            ],
            jahrgang: [ 
                {value: '', label: 'Alle Jahrgänge'},
                ...[...new Set(this.state.studenten.map(s => s.jahrgang)) ].map(jahrgang => (
                    {value: jahrgang, label: `Jahrgang ${jahrgang}`}
                ))
            ]
        };
    
        return (
            <FilterContextConsumer>
                {({ filter, change, reset }) => (
                    <div>
                        {Object.values(filter).some(filterValue => filterValue) && (
                            <button
                                className='clear-button'
                                onClick={reset}
                                title='Filter zurücksetzen'
                            >
                                Filter zurücksetzen
                            </button>
                        )} 
                        {Object.entries(filter).map(([filterName, filterValue]) => (
                            <select
                                name={filterName}
                                key={filterName}
                                onChange={({ target: { name, value }}) => change(name, value)}
                                value={filterValue}
                                className={filterValue ? 'active' : ''}
                            >
                                {filterValues[filterName].map(filterOptions => (
                                    <option value={filterOptions.value} key={filterOptions.value} >
                                        {filterOptions.label}
                                    </option>
                                ))}
                            </select>
                        ))}
                    </div>
                )} 
            </FilterContextConsumer>
        );
    }
}

export default StudentenFilter;


