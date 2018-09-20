import React, { Component } from 'react';

import UEGruppe from './components/UEGruppe';

import studentenData from '../../data/studenten';
import faecherData from '../../data/faecher';

class Ergebnisse extends Component {
    state = {
        studenten: studentenData,
        faecher: faecherData,
        semester: 1
    }

    setSemester = ({ target }) => {
        this.setState({
            semester: parseInt(target.value, 10)
        });
    }

    ueGroups() {
        return [ ...new Set(this.state.faecher
            .filter(f => f.semester === this.state.semester)
            .map(f => f.ue))
        ];
    }

    semesterOptions() {
        const semesterValues = [1, 2, 3];
        return semesterValues.map(semester => (
            <option value={semester} key={semester} >
                {semester}. Semester
            </option>
        ));
    }

    render() {
        return (
            <div >
                <h1>Prüfungsergebnisse</h1>
                <label htmlFor='semester'>Semester auswählen: </label>
                <select
                    name='semester'
                    onChange={this.setSemester}
                    id='semester'
                    value={this.state.semester}
                >
                    {this.semesterOptions()}
                </select>
                {this.state.studenten.map(student => (
                    <div key={student.id}>
                        <h3 style={{textAlign: 'center', marginTop: '2rem'}}>{student.name}</h3>
                        {this.ueGroups().map(ue => (
                            <UEGruppe
                                ue={ue}
                                student={student}
                                semester={this.state.semester}
                                key={ue}
                            />
                        ))}
                    </div>
                ))}
            </div>
        );
    }
}

export default Ergebnisse;
