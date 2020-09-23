import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { generateGradeString } from '../../../helper/gradeConverter';

class LESBListeFach extends Component {
    static propTypes = {
        fach: PropTypes.object.isRequired,
        veranstaltung: PropTypes.object.isRequired,
        student: PropTypes.object.isRequired,
        getGradesForStudentAndSubjectCourse: PropTypes.func.isRequired,
    }

    render() {
        const { student, fach, veranstaltung } = this.props;
        const noten = this.props.getGradesForStudentAndSubjectCourse(student.id, veranstaltung.id);

        if (noten.length > 0) {
            return (
                <tbody>
                    {noten.map((note, index) => (
                        <tr key={note.id}>
                            {index === 0 && (
                                <Fragment>
                                    <td rowSpan={noten.length > 1 ? noten.length : null} >
                                        {fach.title} {veranstaltung.title && `(${veranstaltung.title})`}
                                    </td>
                                </Fragment>
                            )}
                            <td style={{ textAlign: 'center' }}>{note.grade >= 4 ? 'B' : 'NB'}</td>
                            <td style={{ textAlign: 'right' }}>
                                {generateGradeString(note.grade, note.gradingSystem)}
                            </td>
                            <td style={{ textAlign: 'right' }}>{note.try}</td>
                        </tr>
                    ))}
                </tbody>
            );
        }
        return (
            <tbody>
                <tr>
                    <td className={veranstaltung.zpk ? 'zpk' : ''} >
                        {fach.title} {veranstaltung.title && `(${veranstaltung.title})`}
                    </td>
                    <td style={{ textAlign: 'center' }}>–</td>
                    <td style={{ textAlign: 'center' }}>–</td>
                    <td style={{ textAlign: 'center' }}>–</td>
                </tr>
            </tbody>
        );
    }
}

export default LESBListeFach;
