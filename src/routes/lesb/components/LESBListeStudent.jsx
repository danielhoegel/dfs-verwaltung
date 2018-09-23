import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LESBListeFach from './LESBListeFach'
import {
    getFaecherGroupedByTyp,
    getVeranstaltungenForFach
} from '../../../helper/selectors';


class LESBListeStudent extends Component {
    static propTypes = {
        student: PropTypes.object.isRequired,
    }

    render() {
        const student = this.props.student;
        const groupedFaecher = getFaecherGroupedByTyp();
        return (
            Object.entries(groupedFaecher).map(([typ, faecher]) => (
                <table className='lesb-table striped--body' style={{marginBottom: '2rem'}} key={typ}>
                    <thead>
                        <tr>
                            <th>Fach</th>
                            <th>Status</th>
                            <th>(Punkte)</th>
                            <th>(Versuch)</th>
                        </tr>
                    </thead>
                    {faecher.map(fach =>
                        getVeranstaltungenForFach(fach.id)
                            .filter(veranstaltung =>
                                veranstaltung.typ === (typ === 'de' ? 'Vorlesung' : 'TD')
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
            ))
        );
    }
}

export default LESBListeStudent;
