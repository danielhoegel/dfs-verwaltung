import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './StudentenFilter.scss';
import Button from '../Button';
import StudentSearch from './StudentSearch';
import studentenData from '../../data/studenten';
import { FilterContextConsumer } from '../filter/FilterContext';
import AddDropdown from './AddDropdown';

class StudentenFilter extends Component {
    state = {
        studenten: studentenData,
    }

    changeHandler = ({ target }) => {
        this.setState({
            [target.name]: target.value
        });
    }

    createStudent = () => {
        this.props.history.push('/studenten/create');
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
                            <AddDropdown createStudent={this.createStudent} />
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

export default withRouter(StudentenFilter);
