import React from 'react';
import PropTypes from 'prop-types';

import UEGruppe from './components/UEGruppe';
import { getTodayDate } from '../../helper/helper';


function ErgebnisseReport(props) {
    function semesters() {
        return [ ...new Set(props.subjects.map(f => f.semester)) ];
    }

    function renderUEGruppen(student, semester) {
        const ueGroups = [...new Set(
            props.subjects
                .filter(f => !semester || f.semester === parseInt(semester, 10))
                .map(f => f.ue)
        )];
        return ueGroups.map(ue => (
            <UEGruppe
                ue={ue}
                student={student}
                semester={Number(semester)}
                key={ue}
                getVeranstaltungenForFach={props.getVeranstaltungenForFach}
                getPunkteForVeranstaltungAndStudent={props.getPunkteForVeranstaltungAndStudent}
                getFaecherDataForUEAndSemester={props.getFaecherDataForUEAndSemester}
            />
        ));
    }
    
    const __today = getTodayDate();
    
    return (
        <div>
            {props.students.length ? props.students.map(student => (
                <div key={student.id} className='student'>
                    <h2>
                        Prüfungsergebnisse - Mtknr. {student.matrikelnummer} - {student.lastName}, {student.firstName} - Datum {__today}
                    </h2>
                    {semesters().map(semester => (
                        <div key={semester}>
                            <h4 className='semester-title'>{semester}. Semester</h4>
                            {renderUEGruppen(student, semester)}
                        </div>
                    ))}
                </div>
            )) : 'Keine Studenten gefunden.'}
        </div>
    );
}

ErgebnisseReport.propTypes = {
    students: PropTypes.array.isRequired,
    subjects: PropTypes.array.isRequired,
    getVeranstaltungenForFach: PropTypes.func.isRequired,
    getPunkteForVeranstaltungAndStudent: PropTypes.func.isRequired,
    getFaecherDataForUEAndSemester: PropTypes.func.isRequired,
};

export default ErgebnisseReport;
