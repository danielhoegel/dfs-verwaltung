import React from 'react';
import { translateStudyStatus } from '../../helper/helper';

function StudentListReport ({ students, filter, getStudyCourseById }) {
    return (
        <div className='root'>
            <h1>Studentenliste</h1>
            <div>
                Studienkurs: {filter.studyCourse ? getStudyCourseById(filter.studyCourse).title : 'Alle'}{', '}
                Status: {filter.status ? translateStudyStatus(filter.status) : 'Alle'}{', '}
                Jahrgang: {filter.year.length ? filter.year.join(', ') : 'Alle'}
            </div>
            <br />
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
                                <td>{student.studentInformation.birthDate}</td>
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
