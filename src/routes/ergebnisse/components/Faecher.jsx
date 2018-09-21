import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import notenData from '../../../data/noten';
import faecherData from '../../../data/faecher';
import veranstaltungenData from '../../../data/veranstaltungen';

class Faecher extends Component {
    static propTypes = {
        ue: PropTypes.number.isRequired,
        student: PropTypes.object.isRequired,
        semester: PropTypes.number.isRequired,
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.semester !== prevState.lastSemester) {
            return {
                ...prevState,
                faecher: faecherData.filter(fach =>
                    fach.ue === nextProps.ue &&
                    fach.semester === nextProps.semester
                ),
                lastSemester: nextProps.semester
            };
        }
        return prevState;
    }

    state = {
        faecher: faecherData,
        veranstaltungen: veranstaltungenData,
        noten: notenData,
    }

    veranstaltungenForFach(fachID) {
        return this.state.veranstaltungen.filter(veranstltung =>
          veranstltung.fachID === fachID  
        );
    }

    punkteForVeranstaltung(veranstaltungID) {
        const noten = this.state.noten.filter(note =>
            note.studentID === this.props.student.id &&
            note.veranstaltungID === veranstaltungID
        );
        if (noten.length > 1) {
            let lastVersuch = noten[0];
            noten.forEach(note => {
                if (note.versuch > lastVersuch.versuch) {
                    lastVersuch = note;
                }
            });
            return lastVersuch.punkte;
        } else if (noten.length > 0){
            return noten[0].punkte;
        } else {
            return null;
        }
    }

    render() {
        return (
            <Fragment>
                {this.state.faecher.map(fach => {
                    const veranstaltungen =  this.veranstaltungenForFach(fach.id);
                    return (
                        <tbody>
                            {veranstaltungen.map((veranstaltung, index) => (
                                <tr key={`${fach.id}_${veranstaltung.id}`}>
                                    {index === 0 && (
                                        <td rowSpan={veranstaltungen.length}>{fach.name}</td>
                                    )}
                                    <td>
                                        {veranstaltung.typ}
                                        {veranstaltung.name && `, (${veranstaltung.name})`}
                                    </td>
                                    <td>{veranstaltung.credits}</td>
                                    <td>{this.punkteForVeranstaltung(veranstaltung.id)}</td>
                                </tr>
                            ))}
                        </tbody>
                    )
                })}
            </Fragment>
        );
    }
}

export default Faecher;
