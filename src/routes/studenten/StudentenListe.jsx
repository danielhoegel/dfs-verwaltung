import React, { Component } from 'react';

import studentenData from '../../data/studenten';
import { FilterContextConsumer } from '../../components/filter/FilterContext';

class StudentenListe extends Component {
    state = {
        studenten: studentenData
    }

    translateStudienkurse(studienkurs) {
        switch (parseInt(studienkurs, 10)) {
            case 1: return 'Grundstudienkurs';
            case 2: return 'Aufbaustudienkurs';
            default: return studienkurs;
        }
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
                                    (!filter.studienkurs || filter.studienkurs === student.studienkurs)
                                ))
                                .map(student => (
                                    <tr
                                        key={student.id}
                                        onClick={() => this.props.history.push(`studenten/${student.id}`)}
                                    >
                                        <td>{student.id}</td>
                                        <td>{student.name}</td>
                                        <td>{this.translateStudienkurse(student.studienkurs)}</td>
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
