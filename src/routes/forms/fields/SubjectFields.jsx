import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import FieldGroup from '../../../components/FieldGroup';
import Field from '../../../components/Field';
import FieldSelect from '../../../components/FieldSelect';
import Typography from '@material-ui/core/Typography';
import { isNotEmpty } from '../../../helper/helper';
import HiddenDivider from '../../../components/HiddenDivider';
import { Button } from '@material-ui/core';
import FieldRadioGroup from '../../../components/FieldRadioGroup';

const SubjectFields = ({ onChange, values , onCancel, studyCourseOptions, studyRegulations }) => {
    function studyRegulationOptions() {
        const options = [];
        if (isNotEmpty(studyRegulations)) {
            for (let i = 0; i < studyRegulations.length; i++) {
                const studyRegulation = studyRegulations[i];
                if (studyRegulation.studyCourseId === values.studyCourseId) {
                    options.push({
                        value: studyRegulation.id,
                        label: studyRegulation.title
                    });
                }
            } 
        }
        return options;
    }

    const onStudyCourseChange = (e) => {
        // change studyCourseId
        onChange(e);

        // set latest studyRegulation for studyCourse 
        const studyCourseId = studyRegulations
            .filter(({ studyCourseId }) => studyCourseId === e.target.value)
            .sort((a, b) => new Date(b.date) - new Date(a.date))[0].id;

        const fakeEvent = { target: {
            name: 'studyRegulationId',
            value: studyCourseId || ''
        }}
        onChange(fakeEvent);
    }

    const __studyRegulationOptions = studyRegulationOptions();

    return (
        <Fragment>
            <Typography variant='title' style={{marginTop: '2rem'}}>Fach</Typography>
            <FieldGroup>
                <Field
                    name='title'
                    value={values.title}
                    label='Titel'
                    type='text'
                    onChange={onChange}
                />
                <FieldSelect
                    name='studyCourseId'
                    value={values.studyCourseId}
                    label='Studienkurs'
                    options={studyCourseOptions}
                    onChange={onStudyCourseChange}
                />
                <FieldSelect
                    name='studyRegulationId'
                    value={values.studyRegulationId}
                    label='Studienordung'
                    options={__studyRegulationOptions}
                    onChange={onChange}
                    disabled={__studyRegulationOptions.length <= 1}
                />
            </FieldGroup>
            <FieldGroup>
                <Field
                    name='semester'
                    value={values.semester}
                    label='Semester'
                    type='number'
                    min={1}
                    onChange={onChange}
                />
                <Field
                    name='ue'
                    value={values.ue}
                    label='UE-Gruppe'
                    type='number'
                    onChange={onChange}
                />
                <FieldRadioGroup
                    name='type'
                    value={values.type}
                    label='Typ'
                    onChange={onChange}
                    options={[
                        { label: 'deutsch', value: 'de' },
                        { label: 'französich', value: 'fr' }
                    ]}
                />
            </FieldGroup>
            <HiddenDivider />
            <Button variant='raised' color='primary' type='submit'>Speichern</Button>
            <Button variant='raised' onClick={onCancel} style={{marginLeft: '1rem'}}>Abbrechen</Button>
        </Fragment>
    );
};

SubjectFields.propTypes = {
    onChange: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
}

export default SubjectFields;
