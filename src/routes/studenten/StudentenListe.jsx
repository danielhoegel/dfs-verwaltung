import React, { Component } from 'react';

import studentenData from '../../data/studenten';
import { FilterContextConsumer } from '../../components/filter/FilterContext';
import { translateStudienkurse } from '../../helper/helper';

class StudentenListe extends Component {
    state = {
        studenten: studentenData
    }

    goToDetails = (id) => {
        this.props.history.push(`studenten/${id}`)
    }

    render() {
        return (
            <FilterContextConsumer>
                {({ filter }) => (
                    <table className='hoverable striped'>
                        <thead>
                            <tr>
                                <th style={{width: '10%'}}>ID</th>
                                <th>Name</th>
                                <th style={{width: '25%'}}>Studienkurs</th>
                                <th style={{width: '15%'}}>Jahrgang</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.studenten
                                .filter(student => (
                                    (!filter.jahrgang || parseInt(filter.jahrgang, 10) === student.jahrgang) &&
                                    (!filter.studienkurs || filter.studienkurs === student.studienkurs) &&
                                    (!filter.student || student.name.toLocaleLowerCase().indexOf(filter.student.toLocaleLowerCase()) !== -1)
                                ))
                                .map(student => (
                                    <tr
                                        key={student.id}
                                        onClick={() => this.goToDetails(student.id)}
                                    >
                                        <td>{student.id}</td>
                                        <td>{student.name}</td>
                                        <td>{translateStudienkurse(student.studienkurs)}</td>
                                        <td>{student.jahrgang}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                )}
            </FilterContextConsumer>
        );
    }
}

export default StudentenListe;
