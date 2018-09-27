import React, { Component } from 'react';

import './LESBListe.scss';
import LESBListeFaecher from './components/LESBListeFaecher';
import { FilterContextConsumer } from '../../components/filter/FilterContext';
import Header from '../../components/Header';
import { getTodayDate } from '../../helper/helper';
import {
    getStudentenData,
    getFaecherGroupedByTyp,
} from '../../helper/selectors';

class StudentenListe extends Component {
    state = {
        studenten: getStudentenData(),
        datum: getTodayDate(),
        faecher: getFaecherGroupedByTyp()
    }

    render() {
        return (
            <FilterContextConsumer>
                {({ filter }) => (
                    <div className='lesb-liste'>
                        <Header as='h2' content='LESB-Listen' align='center' />
                        {this.state.studenten
                            .filter(student => (
                                (!filter.jahrgang || parseInt(filter.jahrgang, 10) === student.jahrgang) &&
                                (!filter.studienkurs || filter.studienkurs === student.studienkurs) &&
                                (!filter.student || student.name.toLocaleLowerCase().indexOf(filter.student.toLocaleLowerCase()) !== -1)
                            ))
                            .map(student => (
                                <div className='student' key={student.id}>
                                    <Header
                                        as='h3'
                                        content={`LESB - Anmeldung - Mtknr. ${student.matrikelnummer} - ${student.lastName}, ${student.firstName} - Datum ${this.state.datum}`}
                                    />
                                    <LESBListeFaecher student={student} faecher={this.state.faecher.de} />
                                    <p className='anmerkung'>(aus den oben angegebenen Klausuren müssen 5 von den 6 fett gedruckten Klausuren bestanden werden, davon mindestens 1 in jedem Rechtsgebiet - sollte der/die Studierende den Studienkurs verlassen, müssen 9 von den 12 Klausuren bestanden sein)</p>
                                    <LESBListeFaecher student={student} faecher={this.state.faecher.fr} />
                                    <p className='anmerkung'>(dür den deutsch-französischen Studienkurs müssen zusätzlich zu den oben geforderten 5 von 6 Klausuren noch 4 aus den angegebenen französischen Klausuren bestanden werden)</p>
                                </div>
                            ))
                        }
                    </div>
                )}
            </FilterContextConsumer>
        );
    }
}

export default StudentenListe;
