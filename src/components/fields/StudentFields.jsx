import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// import Field from '../Field';
// import FieldGroup from '../FieldGroup';
import HiddenDivider from '../HiddenDivider';
import FieldArray from '../FieldArray';
import UpdateStudent from '../update/student';
import UpdateStudentInformation from '../update/studentInformation';
import UpdateStudy from '../update/studentStudy';


const StudentFields = ({
    change,
    values,
    onCancel,
    add,
    remove,
    studyRegulations,
    studyCourses
}) => {
    const addStudyHandler = (index) => {
        const item = {
            year: new Date().getFullYear(),
            studyCourseId: 1,
            studyRegulationId: '',
            status: 1,
        };
        add('studies', item);
    }

    const removeStudyHandler = (index) => {
        remove('studies', index);
    }

    return (
        <Fragment>
            <Typography variant='title' style={{marginTop: '2rem'}}>Student</Typography>
            <UpdateStudent
                onChange={change}
                values={values.student}
            />

            <UpdateStudentInformation
                onChange={change}
                values={values.studentInformation}
            />

            <HiddenDivider height={2} />
            <Typography component='h3' variant='title'>
                Studium
            </Typography>
            <FieldArray
                component={UpdateStudy}
                values={values.studies}
                onChange={change}
                addLabel='Studienkurs hinzufügen'
                removeLabel='Studienkurs entfernen'
                prefix='studies'
                addHandler={addStudyHandler}
                removeHandler={removeStudyHandler}
                min={1}
                studyRegulations={studyRegulations}
                studyCourses={studyCourses}
            />

            <HiddenDivider height={2} />
            <Button variant='raised' color='primary' type='submit'>
                Speichern
            </Button>
            <Button variant='raised' onClick={onCancel} style={{ marginLeft: '1rem' }}>
                Abbrechen
            </Button>
        </Fragment>
    );
};

StudentFields.propTypes = {
    change: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    onCancel: PropTypes.func.isRequired,
    add: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    studyRegulations: PropTypes.array.isRequired,
    studyCourses: PropTypes.array.isRequired,
};

export default StudentFields;
