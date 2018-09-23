import React, { Component } from 'react';


import './StudentenFilter.scss';
import Button from '../Button';
import StudentSearch from './StudentSearch';
import studentenData from '../../data/studenten';
import { FilterContextConsumer } from '../filter/FilterContext';
import Dropdown from '../dropdown/Dropdown';

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
                            <Dropdown
                                label={ <i className='fa fa-plus-square' /> }
                                iconSize={'0.5rem'}
                                title='Hinzufügen'
                                basic
                                color='grey'
                                labelStyle={{padding: '0.25rem 0.5rem', }}
                            >
                                <div onClick={() => alert('Student hinzufügen')}>Student hinzufügen</div>
                                <div onClick={() => alert('Note hinzufügen')}>Note hinzufügen</div>
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
                                    <select
                                        name={filterName}
                                        key={filterName}
                                        onChange={({ target: { name, value }}) => change(name, value)}
                                        value={filterValue}
                                        className={filterValue ? 'active' : ''}
                                    >
                                        {filterOptions[filterName].map(filterOptions => (
                                            <option value={filterOptions.value} key={filterOptions.value} >
                                                {filterOptions.label}
                                            </option>
                                        ))}
                                    </select>
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


