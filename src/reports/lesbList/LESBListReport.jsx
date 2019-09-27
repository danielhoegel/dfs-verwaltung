import React from 'react';
import PropTypes from 'prop-types';

import LESBListeFaecher from './components/LESBListeFaecher';
import { getTodayDate } from '../../helper/helper';


function LESBListReport(props) {
    const __today = getTodayDate();

    return (
        <div className='lesb-liste'>
            {props.students.length ? props.students
                .map(student => (
                    <div className='student' key={student.id}>
                        <h2>
                            LESB - Anmeldung - Mtknr.{' '}
                            {student.matrikelnummer} - {student.lastName}, {student.firstName}{' '}
                            - Datum {__today}
                        </h2>
                        <LESBListeFaecher
                            student={student}
                            faecher={props.subjects.de}
                            getVeranstaltungenForFach={props.getVeranstaltungenForFach}
                            getGradesForStudentAndSubjectCourse={props.getGradesForStudentAndSubjectCourse}
                        />
                        <p className='anmerkung'>
                            (aus den oben angegebenen Klausuren müssen 5 von den 6 Klausuren bestanden werden,{' '}
                            davon mindestens eine in jedem Rechtsgebiet)
                        </p>
                        <LESBListeFaecher
                            student={student}
                            faecher={props.subjects.fr}
                            getVeranstaltungenForFach={props.getVeranstaltungenForFach}
                            getGradesForStudentAndSubjectCourse={props.getGradesForStudentAndSubjectCourse}
                        />
                        <p className='anmerkung'>
                            (für den deutsch-französischen Studienkurs müssen zusätzlich zu den{' '}
                            oben geforderten 5 von 6 Klausuren noch 4 aus den angegebenen{' '}
                            französischen Klausuren bestanden werden)
                        </p>
                    </div>
                ))
            : 'Keine Studenten gefunden.'}
        </div>
    );
}

LESBListReport.propTypes = {
    students: PropTypes.array.isRequired,
    subjects: PropTypes.object.isRequired,
    getVeranstaltungenForFach: PropTypes.func.isRequired,
    getGradesForStudentAndSubjectCourse: PropTypes.func.isRequired,
};

export default LESBListReport;
