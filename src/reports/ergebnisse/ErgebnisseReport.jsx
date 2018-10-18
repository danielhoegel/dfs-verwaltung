import React, { Component } from 'react';

import UEGruppe from './components/UEGruppe';
import faecherData from '../../data/subjects.json';
import { getTodayDate } from '../../helper/helper';


class Ergebnisse extends Component {
    state = {
        datum: getTodayDate(),
        faecher: faecherData
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
                semester={Number(semester)}
                key={ue}
            />
        ));
    }

    render() {
        return (
            <div>
                {this.props.students.map(student => (
                    <div key={student.id} className='student'>
                        <h2>
                            Prüfungsergebnisse - Mtknr. {student.matrikelnummer} - {student.lastName}, {student.firstName} - Datum {this.state.datum}
                        </h2>
                        {this.semester().map(semester => (
                            <div key={semester}>
                                <h4 className='semester-title'>{semester}. Semester</h4>
                                {this.renderUEGruppen(student, semester)}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    }
}

export default Ergebnisse;
