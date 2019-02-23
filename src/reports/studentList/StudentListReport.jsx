import React from 'react';
import { translateStudienkurse, translateStudyStatus } from '../../helper/helper';

function StudentListReport ({ students, filter: { studyCourse, year, status } }) {
    return (
        <div className='root'>
            <h1>Studentenliste</h1>
            <div>
                Studienkurs: {studyCourse ? translateStudienkurse(studyCourse) : 'Alle'}{', '}
                Status: {status ? translateStudyStatus(status) : 'Alle'}{', '}
                Jahrgang: {year || 'Alle'}
            </div>
            <br />
            <table border='1' className='table'>
                <thead>
                    <tr>
                        <th>Matr.-Nr.</th>
                        <th>Vorname</th>
                        <th>Nachname</th>
                        <th>Geburtsdatum</th>
                        <th>E-Mail (Uni)</th>
                        <th>E-Mail (Privat)</th>
                        <th>Festnetz</th>
                        <th>Mobiletelefon</th>
                    </tr>
                </thead>
                <tbody>
                    {students && students.map(student => (
                        <tr key={student.id}>
                            <td>{student.matrikelnummer}</td>
                            <td>{student.firstName}</td>
                            <td>{student.lastName}</td>
                            <td>{student.studentInformation.birthDate}</td>
                            <td>{student.studentInformation.mailUni}</td>
                            <td>{student.studentInformation.mailPrivate}</td>
                            <td>{student.studentInformation.phoneNumber}</td>
                            <td>{student.studentInformation.mobileNumber}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StudentListReport;
