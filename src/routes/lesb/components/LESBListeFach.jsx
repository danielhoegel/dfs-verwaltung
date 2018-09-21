import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import notenData from '../../../data/noten';

class LESBListeFach extends Component {
    static propTypes = {
        fach: PropTypes.object.isRequired,
        veranstaltung: PropTypes.object.isRequired,
        student: PropTypes.object.isRequired,
    }

    state = {
        noten: notenData,
    }

    notenForVeranstaltung() {
        return this.state.noten.filter(note =>
            note.studentID === this.props.student.id &&
            note.veranstaltungID === this.props.veranstaltung.id
        );
    }

    render() {
        const { fach, veranstaltung } = this.props;
        const noten = this.notenForVeranstaltung();

        if (noten.length > 0) {
            return (
                <tbody>
                    {noten.map((note, index) => (
                        <tr key={note.id}>
                            {index === 0 && (
                                <Fragment>
                                    <td rowSpan={noten.length > 1 ? noten.length : null}>{fach.name}</td>
                                    <td rowSpan={noten.length > 1 ? noten.length : null}>{veranstaltung.name}</td>
                                </Fragment>
                            )}
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
                        <td>{fach.name}</td>
                        <td>{veranstaltung.name}</td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            )
        }
    }
}

export default LESBListeFach;
