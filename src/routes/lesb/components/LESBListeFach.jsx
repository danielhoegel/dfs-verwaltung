import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { getNotenForStudentAndVeranstaltung } from '../../../helper/selectors';

class LESBListeFach extends Component {
    static propTypes = {
        fach: PropTypes.object.isRequired,
        veranstaltung: PropTypes.object.isRequired,
        student: PropTypes.object.isRequired,
    }

    render() {
        const { student, fach, veranstaltung } = this.props;
        const noten = getNotenForStudentAndVeranstaltung(student.id, veranstaltung.id);

        if (noten.length > 0) {
            return (
                <tbody>
                    {noten.map((note, index) => (
                        <tr key={note.id}>
                            {index === 0 && (
                                <Fragment>
                                    <td
                                        rowSpan={noten.length > 1 ? noten.length : null}
                                        style={{fontWeight: veranstaltung.zpk ? '800' : 'inherit'}}
                                    >
                                        {fach.name} {veranstaltung.name && `(${veranstaltung.name})`}
                                    </td>
                                </Fragment>
                            )}
                            <td>{note.punkte >= 4 ? 'B' : 'NB'}</td>
                            <td>{note.punkte}</td>
                            <td>{note.versuch}</td>
                        </tr>
                    ))}
                </tbody>
            );
        } else {
            return (
                <tbody>
                    <tr>
                        <td style={{fontWeight: veranstaltung.zpk ? '800' : 'inherit'}}>
                            {fach.name} {veranstaltung.name && `(${veranstaltung.name})`}
                        </td>
                        <td>–</td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            )
        }
    }
}

export default LESBListeFach;
