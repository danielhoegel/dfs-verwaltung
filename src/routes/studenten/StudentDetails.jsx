import React, { Component, Fragment } from 'react';

import studentenData from '../../data/studenten';
// import faecherData from '../../data/faecher';
// import veranstaltungenData from '../../data/veranstaltungen';
// import notenData from '../../data/noten';

import LESBListeStudent from '../lesb/components/LESBListeStudent';

class StudentDetails extends Component {
    translateStudienkurse(studienkurs) {
        switch (parseInt(studienkurs, 10)) {
            case 1: return 'Grundstudienkurs';
            case 2: return 'Aufbaustudienkurs';
            default: return studienkurs;
        }
    }

    render() {
        const student = studentenData.filter(s => s.id === parseInt(this.props.match.params.id, 10))[0];
        return (
            <Fragment>
                <button onClick={() => this.props.history.push('/studenten')}>Zurück</button>
                <table>
                    <thead>
                        <tr>
                            <th colSpan={2}>
                                <h2>{student.name}</h2>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{width: '20%'}}>Studienkurs</td>
                            <td>{this.translateStudienkurse(student.studienkurs)}</td>
                        </tr>
                        <tr>
                            <td>Jahrgang</td>
                            <td>{student.jahrgang}</td>
                        </tr>
                    </tbody>
                </table>
                <LESBListeStudent student={student} />
            </Fragment>
        );
    }
}

export default StudentDetails;
