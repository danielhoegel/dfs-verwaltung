import React from 'react';
import { translateStudyStatus } from '../../helper/helper';

function StudentListReportSimple({ students, filter, getStudyCourseById, settings }) {
    // TODO: apply settings for other reports
    const { titleType, customTitle, showFilter } = settings;
    return (
        <div className='root'>
            {titleType !== 'hidden' && (
                <h1 className={titleType === 'empty' ? 'empty-title' : ''}>{
                        titleType === 'empty' ? <span>&nbsp;</span>
                    : titleType === 'custom' ? customTitle
                    : 'Einfache Studentenliste'
                }</h1>
            )}
            {showFilter && (
                <div style={{ marginBottom: '1.5rem' }}>
                    Studienkurs: {filter.studyCourse
                        ? getStudyCourseById(filter.studyCourse).title
                        : 'Alle'
                    }{', '}
                    Status: {filter.status
                        ? translateStudyStatus(filter.status)
                        : 'Alle'
                    }{', '}
                    Jahrgang: {filter.year.length
                        ? filter.year.join(', ')
                        : 'Alle'
                    }
                </div>
            )}
            {students.length ? (
                <table border='1' className='table'>
                    <thead>
                        <tr>
                            <th style={{ width: '5%' }}>Nr.</th>
                            <th style={{ width: '15%' }}>Matr.-Nr.</th>
                            <th style={{ width: '20%' }}>Vorname</th>
                            <th style={{ width: '20%' }}>Nachname</th>
                            <th style={{ width: 'auto' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={student.id}>
                                <td style={{ textAlign: 'right' }}>{index + 1}</td>
                                <td>{student.matrikelnummer}</td>
                                <td>{student.firstName}</td>
                                <td>{student.lastName}</td>
                                <td></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : 'Keine Studenten gefunden.'}
        </div>
    );
}

export default StudentListReportSimple;
