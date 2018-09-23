import React from 'react';

import Button from '../../../components/Button';
import {
    getFaecherData,
    getVeranstaltungenForFach,
    getNotenForStudentAndVeranstaltung,
} from '../../../helper/selectors';

const Faecher = ({ studentId, createNote }) => {
    const faecher = getFaecherData();

    const addNote = (veranstaltungId) => {
        createNote({ studentId, veranstaltungId });
    }

    const updateNote = (noteId) => {
        createNote({ noteId });
    }

    return (
        <table className='striped--body'>
            <thead>
                <tr>
                    <th>Fach</th>
                    <th>Veranstaltung</th>
                    <th>Semester</th>
                    <th>(Punkte)</th>
                </tr>
            </thead>
            {faecher
                .sort((a, b) => (
                    a.semester - b.semester ||
                    a.name.localeCompare(b.name) ||
                    a.id - b.id
                ))
                .map(fach => {
                    const veranstaltungen = getVeranstaltungenForFach(fach.id);
                    return (
                        <tbody key={fach.id}>
                            {veranstaltungen.map((veranstaltung, veranstaltungIndex) => {
                                const noten = getNotenForStudentAndVeranstaltung(studentId, veranstaltung.id);
                                return (
                                    <tr key={veranstaltung.id}>
                                        {veranstaltungIndex === 0 && (
                                            <td rowSpan={veranstaltungen.length}>
                                                {fach.name}
                                            </td>
                                        )}
                                        <td>
                                            {veranstaltung.typ}
                                            {veranstaltung.name && ` (${veranstaltung.name})`}
                                        </td>
                                        <td style={{textAlign: 'right'}}>
                                            {fach.semester}. Sem.
                                        </td>
                                        <td style={{textAlign: 'right'}}>
                                            {veranstaltung.teilnahmeart === 'Note' ? (
                                                <div>
                                                    {noten.map(note => (
                                                        <div
                                                            key={note.id}
                                                            className='clickable-note'
                                                            onClick={() => updateNote(note.id)}
                                                        >
                                                            <i className='fa fa-wrench' />
                                                            {note.punkte} Pkt.
                                                            {noten.length > 1 && ` (${note.versuch}. Versuch)`}
                                                        </div>
                                                    ))}
                                                    <Button
                                                        onClick={() => addNote(veranstaltung.id)}
                                                        style={{ marginTop: noten.length ? '0.25rem' : 0 }}
                                                        className='note-create-button'
                                                        content='Note hinzufügen'
                                                        icon='plus'
                                                    />
                                                </div>
                                            ) : (
                                                <span style={{
                                                    opacity: 0.5,
                                                    userSelect: 'none'
                                                }}>
                                                    Teilnahme
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    )
                })
            }
        </table>
    );
};

export default Faecher;
