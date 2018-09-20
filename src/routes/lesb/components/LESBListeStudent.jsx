import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LESBListeFach from './LESBListeFach'

import veranstaltungenData from '../../../data/veranstaltungen';
import faecherData from '../../../data/faecher';

class LESBListeStudent extends Component {
    state = {
        veranstaltungen: veranstaltungenData,
        faecher: faecherData
    }

    render() {
        const student = this.props.student;
        
        return (
            <div className='student'>
                <div className='student__header'>
                    <h3>{student.name}</h3>
                </div>
                <table className='lesb-table'>
                    <thead>
                        <tr>
                            <th>Fach</th>
                            <th>Veranstaltung</th>
                            <th>Typ</th>
                            <th>(Note)</th>
                            <th>(Versuch)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.faecher.map(fach =>
                            this.state.veranstaltungen
                                .filter(veranstaltung =>
                                    veranstaltung.fachID === fach.id &&
                                    veranstaltung.typ === 'Vorlesung'
                                )
                                .map(veranstaltung => 
                                    <LESBListeFach
                                        fach={fach}
                                        veranstaltung={veranstaltung}
                                        student={student}
                                        key={`${fach.id}_${veranstaltung.id}`}
                                    />
                                )
                            )
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

LESBListeStudent.propTypes = {
    student: PropTypes.object.isRequired,
};

export default LESBListeStudent;
