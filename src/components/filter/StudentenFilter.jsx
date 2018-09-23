import React, { Component } from 'react';
import { Button, Dropdown, Select } from 'semantic-ui-react';

import './StudentenFilter.scss';
import StudentSearch from './StudentSearch';
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
        const filterOptions = {
            semester: [
                { value: '', label: 'Alle Semester' },
                { value: 1, label: '1. Semester' },
                { value: 2, label: '2. Semester' },
                { value: 3, label: '3. Semester' },
                { value: 4, label: '4. Semester' },
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
            <div className='filter-container'>
                <FilterContextConsumer>
                    {({ filter, change, reset }) => (
                        <div>
                            <Dropdown text='Add' basic title='Hinzufügen'>
                                <Dropdown.Menu>
                                    <Dropdown.Item text='Student hinzufügen' onClick={() => alert('Student hinzufügen')} />
                                    <Dropdown.Item text='Note hinzufügen' onClick={() => alert('Note hinzufügen')} />
                                </Dropdown.Menu>
                            </Dropdown>
                            {Object.values(filter).some(filterValue => filterValue) && (
                                <Button
                                    className='clear-button'
                                    onClick={reset}
                                    title='Filter zurücksetzen'
                                    content='Filter zurücksetzen'
                                />
                            )}
                            <StudentSearch
                                studentFilter={filter.student}
                                studenten={this.state.studenten}
                                setStudentFilter={value => change('student', value)}
                            />
                            {Object.entries(filter).map(([filterName, filterValue]) => 
                                filterOptions[filterName] && (
                                    <Select
                                        key={filterName}
                                        onChange={({ target: { name, value }}) => change(name, value)}
                                        value={filterValue}
                                        className={filterValue ? 'active' : ''}
                                        text={filterName}
                                        options={filterOptions[filterName].map(f => ({key: f.value, value: f.value, text: f.label}))}
                                        style={{marginLeft: '0.5rem'}}
                                    />
                                )
                            )}
                        </div>
                    )} 
                </FilterContextConsumer>
            </div>
        );
    }
}

export default StudentenFilter;


