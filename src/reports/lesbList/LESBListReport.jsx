import React, { Component } from 'react';

import LESBListeFaecher from './components/LESBListeFaecher';
import { getTodayDate } from '../../helper/helper';


class LESBListReport extends Component {
    state = {
        datum: getTodayDate(),
        faecher: this.props.subjects
    }

    render() {
        // const { filter: { studyCourse, status, year} } = this.props;
        return (
            <div className='lesb-liste'>
                {/* <h1>LESB-Listen</h1>
                <div>
                    Studienkurs: {studyCourse ? translateStudienkurse(studyCourse) : 'Alle'}{', '}
                    Status: {status ? translateStudyStatus(status) : 'Alle'}{', '}
                    Jahrgang: {year || 'Alle'}
                </div>
                <br /> */}
                {this.props.students
                    .map(student => (
                        <div className='student' key={student.id}>
                            <h2>
                                LESB - Anmeldung - Mtknr. {student.matrikelnummer} - {student.lastName}, {student.firstName} - Datum {this.state.datum}
                            </h2>
                            <LESBListeFaecher
                                student={student}
                                faecher={this.state.faecher.de}
                                getVeranstaltungenForFach={this.props.getVeranstaltungenForFach}
                                getNotenForStudentAndVeranstaltung={this.props.getNotenForStudentAndVeranstaltung}
                            />
                            <p className='anmerkung'>(aus den oben angegebenen Klausuren müssen 5 von den 6 fett gedruckten Klausuren bestanden werden, davon mindestens 1 in jedem Rechtsgebiet - sollte der/die Studierende den Studienkurs verlassen, müssen 9 von den 12 Klausuren bestanden sein)</p>
                            <LESBListeFaecher
                                student={student}
                                faecher={this.state.faecher.fr}
                                getVeranstaltungenForFach={this.props.getVeranstaltungenForFach}
                                getNotenForStudentAndVeranstaltung={this.props.getNotenForStudentAndVeranstaltung}
                            />
                            <p className='anmerkung'>(dür den deutsch-französischen Studienkurs müssen zusätzlich zu den oben geforderten 5 von 6 Klausuren noch 4 aus den angegebenen französischen Klausuren bestanden werden)</p>
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default LESBListReport;
