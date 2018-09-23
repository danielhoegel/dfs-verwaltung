import React, { Component, Fragment } from 'react';

import LESBListeStudent from './components/LESBListeStudent';
import studentenData from '../../data/studenten';
import { FilterContextConsumer } from '../../components/filter/FilterContext';

class StudentenListe extends Component {
    state = {
        studenten: studentenData
    }

    render() {
        return (
            <FilterContextConsumer>
                {({ filter }) => (
                    <div className='studenten'>
                        {this.state.studenten
                            .filter(student => (
                                (!filter.jahrgang || parseInt(filter.jahrgang, 10) === student.jahrgang) &&
                                (!filter.studienkurs || filter.studienkurs === student.studienkurs) &&
                                (!filter.student || student.name.toLocaleLowerCase().indexOf(filter.student.toLocaleLowerCase()) !== -1)
                            ))
                            .map(student => (
                                <Fragment key={student.id}>
                                    <h3>{student.name}</h3>
                                    <LESBListeStudent student={student} />
                                </Fragment>
                            ))
                        }
                    </div>
                )}
            </FilterContextConsumer>
        );
    }
}

export default StudentenListe;
