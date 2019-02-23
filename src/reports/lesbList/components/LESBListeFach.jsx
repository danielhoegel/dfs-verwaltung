import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class LESBListeFach extends Component {
    static propTypes = {
        fach: PropTypes.object.isRequired,
        veranstaltung: PropTypes.object.isRequired,
        student: PropTypes.object.isRequired,
    }

    render() {
        const { student, fach, veranstaltung } = this.props;
        const noten = this.props.getNotenForStudentAndVeranstaltung(student.id, veranstaltung.id);

        if (noten.length > 0) {
            return (
                <tbody>
                    {noten.map((note, index) => (
                        <tr key={note.id}>
                            {index === 0 && (
                                <Fragment>
                                    <td
                                        rowSpan={noten.length > 1 ? noten.length : null}
                                        className={veranstaltung.zpk ? 'zpk' : ''}
                                    >
                                        {fach.title} {veranstaltung.title && `(${veranstaltung.title})`}
                                    </td>
                                </Fragment>
                            )}
                            <td style={{ textAlign: 'center' }}>{note.grade >= 4 ? 'B' : 'NB'}</td>
                            <td style={{ textAlign: 'right' }}>{note.grade}</td>
                            <td style={{ textAlign: 'right' }}>{note.try}</td>
                        </tr>
                    ))}
                </tbody>
            );
        } else {
            return (
                <tbody>
                    <tr>
                        <td style={{fontWeight: veranstaltung.zpk ? '800' : 'inherit'}}>
                            {fach.title} {veranstaltung.title && `(${veranstaltung.title})`}
                        </td>
                        <td style={{ textAlign: 'center' }}>–</td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            )
        }
    }
}

export default LESBListeFach;
