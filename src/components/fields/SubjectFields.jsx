import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';

import Field from '../Field';
import FieldGroup from '../FieldGroup';
import FieldSelect from '../FieldSelect';
import FieldRadioGroup from '../FieldRadioGroup';
import HiddenDivider from '../HiddenDivider';
import { isNotEmpty } from '../../helper/helper';

const SubjectFields = ({
    change,
    values ,
    onCancel,
    studyCourses,
    studyRegulations
}) => {
    function studyCourseOptions() {
        const options = [];
        if (isNotEmpty(studyCourses)) {
            studyCourses.forEach(studyCourse => {
                options.push({
                    value: studyCourse.id,
                    label: studyCourse.title
                });
            });
        }
        return options;
    }

    
    function studyRegulationOptions() {
        const options = [];
        if (isNotEmpty(studyRegulations)) {
            studyRegulations.forEach(studyRegulation => {
                if (studyRegulation.studyCourseId === values.studyCourseId) {
                    options.push({
                        value: studyRegulation.id,
                        label: studyRegulation.title
                    });
                }
            });
        }
        return options;
    }

    const onStudyCourseChange = (e) => {
        // change studyCourseId
        change(e);

        // set latest studyRegulation for studyCourse 
        const studyCourseId = studyRegulations
            .filter(({ studyCourseId }) => studyCourseId === e.target.value)
            .sort((a, b) => new Date(b.date) - new Date(a.date))[0].id;

        const fakeEvent = { target: {
            name: 'studyRegulationId',
            value: studyCourseId || ''
        }}
        change(fakeEvent);
    }

    const __studyRegulationOptions = studyRegulationOptions();
    const __studyCourseOptions = studyCourseOptions();

    return (
        <Fragment>
            <FieldGroup>
                <Field
                    name='title'
                    value={values.title}
                    label='Titel'
                    type='text'
                    onChange={change}
                    required
                    width={1}
                />
                <FieldRadioGroup
                    name='type'
                    value={values.type}
                    label='Typ'
                    onChange={change}
                    options={[
                        { label: 'deutsch', value: 'de' },
                        { label: 'französich', value: 'fr' }
                    ]}
                    required
                />
            </FieldGroup>
            <FieldGroup>
                <FieldSelect
                    name='studyCourseId'
                    value={values.studyCourseId}
                    label='Studienkurs'
                    options={__studyCourseOptions}
                    onChange={onStudyCourseChange}
                    required
                />
                <FieldSelect
                    name='studyRegulationId'
                    value={values.studyRegulationId}
                    label='Studienordung'
                    options={__studyRegulationOptions}
                    onChange={change}
                    disabled={__studyRegulationOptions.length <= 1}
                    required
                />
            </FieldGroup>
            <FieldGroup>
                <Field
                    name='semester'
                    value={values.semester}
                    label='Semester'
                    type='number'
                    min={1}
                    onChange={change}
                    required
                />
                <Field
                    name='ue'
                    value={values.ue}
                    label='UE-Gruppe'
                    type='number'
                    onChange={change}
                    required
                />
            </FieldGroup>
            <HiddenDivider />
            <Button variant='raised' color='primary' type='submit'>Speichern</Button>
            <Button onClick={onCancel} style={{marginLeft: '1rem'}}>Abbrechen</Button>
        </Fragment>
    );
};

SubjectFields.propTypes = {
    change: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    onCancel: PropTypes.func.isRequired,
    studyCourseOptions: PropTypes.array.isRequired,
    studyRegulations: PropTypes.array.isRequired,
}

export default SubjectFields;
