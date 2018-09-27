import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Header from '../../../components/Header';
import Button from '../../../components/Button';
import { FilterContextConsumer } from '../../../components/filter/FilterContext';
import {
    getFaecherGroupedBySemesterAndTyp,
    getVeranstaltungenForFach,
    getNotenForStudentAndVeranstaltung,
} from '../../../helper/selectors';


const Noten = ({ veranstaltung, noten, studentId, openNoteModal }) => {
    return veranstaltung.teilnahmeart === 'Note' ? (
        <div>
            {noten.map(note => (
                <div
                    key={note.id}
                    className='clickable-note'
                    onClick={() => openNoteModal({ noteId: note.id })}
                >
                    <i className='fa fa-wrench' />
                    {note.punkte} Pkt.
                    {noten.length > 1 && ` (${note.versuch}. Versuch)`}
                </div>
            ))}
            <Button
                onClick={() => openNoteModal({ studentId, veranstaltungId: veranstaltung.id })}
                style={{ marginTop: noten.length ? '0.25rem' : 0 }}
                className='note-create-button'
                content='Note hinzufügen'
                icon='plus'
            />
        </div>
    ) : (
        <span className='teilnahme-label'>
            Teilnahme
        </span>
    );
};


const Fach = ({ fach, studentId, openNoteModal }) => {
    const veranstaltungen = getVeranstaltungenForFach(fach.id);
    return (
        <tbody>
            {veranstaltungen
                .sort((a, b) => (
                    a.typ.localeCompare(b.typ) ||
                    a.name.localeCompare(b.name) ||
                    a.id - b.id
                ))
                .map((veranstaltung, index) => {
                    const noten = getNotenForStudentAndVeranstaltung(studentId, veranstaltung.id);
                    return (
                        <tr key={veranstaltung.id}>
                            {index === 0 && (
                                <td rowSpan={veranstaltungen.length}>{fach.name}</td>
                            )}
                            <td>
                                {veranstaltung.typ}
                                {veranstaltung.name && ` (${veranstaltung.name})`}
                            </td>
                            <td style={{textAlign: 'right'}}>
                                <Noten
                                    noten={noten}
                                    veranstaltung={veranstaltung}
                                    studentId={studentId}
                                    openNoteModal={openNoteModal}
                                />
                            </td>
                        </tr>
                    );
                })
            }
        </tbody>
    );
}


const TypenGroup = ({ typ, faecher, studentId, openNoteModal }) => (
    <table>
        <thead>
            <tr>
                <th style={{width: '30%'}}>Fach ({typ.toUpperCase()})</th>
                <th style={{width: '50%'}}>Veranstaltung</th>
                <th style={{width: '20%'}}>(Punkte)</th>
            </tr>
        </thead>
        {faecher    
            .sort((a, b) => (
                a.name.localeCompare(b.name) ||
                a.id - b.id
            ))
            .map(fach =>
                <Fach
                    key={fach.id}
                    fach={fach}
                    studentId={studentId}
                    openNoteModal={openNoteModal}
                />
            )
        }
    </table>
);


const SemesterGroup = ({ semester, typen, studentId, openNoteModal }) => (
    <Fragment>
        <Header content={`${semester}. Semester`} as='h3' weight={400} style={{margin: '3rem 0 1rem'}} />
        {Object.entries(typen).map(([ typ, faecher ]) => (
            <TypenGroup
                key={typ}
                typ={typ}
                faecher={faecher}
                studentId={studentId}
                openNoteModal={openNoteModal}
            />
        ))}
    </Fragment>
);


class FaecherGrouped extends Component {
    static propTypes = {
        studentId: PropTypes.number.isRequired,
        openNoteModal: PropTypes.func.isRequired,
    }

    state = {
        faecher: getFaecherGroupedBySemesterAndTyp(),
    }

    render() {
        const { faecher } = this.state;
        return faecher ? (
            <FilterContextConsumer>
                {({ filter }) => filter.semester ? (
                    <SemesterGroup
                        semester={filter.semester}
                        typen={faecher[filter.semester]}
                        studentId={this.props.studentId}
                        openNoteModal={this.props.openNoteModal}
                    />
                ) : (
                    Object.entries(faecher).map(([semester, typen]) => (
                        <SemesterGroup
                            key={semester}
                            semester={semester}
                            typen={typen}
                            studentId={this.props.studentId}
                            openNoteModal={this.props.openNoteModal}
                        />
                    ))
                )}
            </FilterContextConsumer>
        ) : 'Keine Fächer gefunden.';
    }
};

export default FaecherGrouped;
