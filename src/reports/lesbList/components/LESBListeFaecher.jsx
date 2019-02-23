import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LESBListeFach from './LESBListeFach';


class LESBListeFaecher extends Component {
    static propTypes = {
        student: PropTypes.object.isRequired,
        faecher: PropTypes.array.isRequired,
    }

    render() {
        const { student, faecher } = this.props;
        return (
            <table className='striped--body'>
                <thead>
                    <tr>
                        <th style={{ width: '70%' }}>Fach</th>
                        <th style={{ width: '10%', textAlign: 'center' }}>Status</th>
                        <th style={{ width: '10%', textAlign: 'right' }}>(Punkte)</th>
                        <th style={{ width: '10%', textAlign: 'right' }}>(Versuch)</th>
                    </tr>
                </thead>
                {faecher.map(fach =>
                    this.props.getVeranstaltungenForFach(fach.id)
                        .filter(veranstaltung =>
                            ['Vorlesung', 'TD'].includes(veranstaltung.type)
                        )
                        .map(veranstaltung => 
                            <LESBListeFach
                                fach={fach}
                                veranstaltung={veranstaltung}
                                student={student}
                                key={veranstaltung.id}
                                getNotenForStudentAndVeranstaltung={this.props.getNotenForStudentAndVeranstaltung}
                            />
                        )
                    )
                }
            </table>
        );
    }
}

export default LESBListeFaecher;
