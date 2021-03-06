import React from 'react';
import { translateStudyStatus, formatDate } from '../../helper/helper';

function StudentListReport({ students, filter, getStudyCourseById, settings }) {
    const { titleType, customTitle, showFilter } = settings;
    return (
        <div className='root'>
            {titleType !== 'hidden' && (
                <h1 className={titleType === 'empty' ? 'empty-title' : ''}>{
                        titleType === 'empty' ? <span>&nbsp;</span>
                    : titleType === 'custom' ? customTitle
                    : 'Studentenliste'
                }</h1>
            )}
            {showFilter && (
                <div style={{ marginBottom: '1.5rem' }}>
                    Studienkurs: {filter.studyCourse ? getStudyCourseById(filter.studyCourse).title : 'Alle'}{', '}
                    Status: {filter.status ? translateStudyStatus(filter.status) : 'Alle'}{', '}
                    Jahrgang: {filter.year.length ? filter.year.join(', ') : 'Alle'}
                </div>
            )}
            {students.length ? (
                <table border='1' className='table'>
                    <thead>
                        <tr>
                            <th>Matr.-Nr.</th>
                            <th>Vorname</th>
                            <th>Nachname</th>
                            <th>Geburtsdatum</th>
                            <th>E-Mail (Standard)</th>
                            <th>E-Mail (Extra)</th>
                            <th>Festnetz</th>
                            <th>Mobiletelefon</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => (
                            <tr key={student.id}>
                                <td>{student.matrikelnummer}</td>
                                <td>{student.firstName}</td>
                                <td>{student.lastName}</td>
                                <td>{formatDate(student.studentInformation.birthDate)}</td>
                                <td>{student.studentInformation.mailPrimary}</td>
                                <td>{student.studentInformation.mailSecondary}</td>
                                <td>{student.studentInformation.phoneNumber}</td>
                                <td>{student.studentInformation.mobileNumber}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : 'Keine Studenten gefunden.'}
            </div>
    );
}

export default StudentListReport;
