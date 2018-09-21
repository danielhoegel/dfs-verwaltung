import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LESBListeFach from './LESBListeFach'

import veranstaltungenData from '../../../data/veranstaltungen';
import faecherData from '../../../data/faecher';

class LESBListeStudent extends Component {
    static propTypes = {
        student: PropTypes.object.isRequired,
    }

    state = {
        veranstaltungen: veranstaltungenData,
        faecher: faecherData
    }

    render() {
        const student = this.props.student;
        
        return (
            <table className='lesb-table striped--body' style={{marginBottom: '2rem'}}>
                <thead>
                    <tr>
                        <th>Fach</th>
                        <th>Veranstaltung</th>
                        <th>(Punkte)</th>
                        <th>(Versuch)</th>
                    </tr>
                </thead>
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
            </table>
        );
    }
}

export default LESBListeStudent;
