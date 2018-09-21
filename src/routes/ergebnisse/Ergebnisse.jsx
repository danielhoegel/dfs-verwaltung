import React, { Component } from 'react';

import UEGruppe from './components/UEGruppe';
import { FilterContextConsumer } from '../../components/filter/FilterContext'

import studentenData from '../../data/studenten';
import faecherData from '../../data/faecher';

class Ergebnisse extends Component {
    state = {
        studenten: studentenData,
        faecher: faecherData,
    }

    semester() {
        return [ ...new Set(this.state.faecher.map(f => f.semester)) ];
    }

    renderUEGruppen(student, semester) {
        const ueGroups = [...new Set(
            this.state.faecher
                .filter(f => !semester || f.semester === parseInt(semester, 10))
                .map(f => f.ue)
        )];
        return ueGroups.map(ue => (
            <UEGruppe
                ue={ue}
                student={student}
                semester={parseInt(semester, 10)}
                key={ue}
            />
        ));
    }

    render() {
        return (
            <FilterContextConsumer>
                {({ filter }) => this.state.studenten
                    .filter(student => (
                        (!filter.jahrgang || parseInt(filter.jahrgang, 10) === student.jahrgang) &&
                        (!filter.studienkurs || filter.studienkurs === student.studienkurs)
                    ))
                    .map(student => (
                        <div key={student.id} style={{marginBottom: '2rem'}}>
                            <h3>{student.name}</h3>
                            {filter.semester
                                ? this.renderUEGruppen(student, filter.semester)
                                : this.semester().map(semester => (
                                    <div key={semester}>
                                        <h4>{semester}. Semester</h4>
                                        {this.renderUEGruppen(student, semester)}
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </FilterContextConsumer>
        );
    }
}

export default Ergebnisse;
