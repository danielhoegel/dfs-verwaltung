import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';

import Field from '../Field';
import FieldGroup from '../FieldGroup';
import FieldSelect from '../FieldSelect';
import HiddenDivider from '../HiddenDivider';


const StudyRegulationFields = ({
    change, values, onCancel, studyCourses
}) => {
    function studyCourseOptions() {
        return studyCourses.map(studyCourse => ({
            value: studyCourse.id,
            label: studyCourse.title
        }));
    }

    return (
        <Fragment>
            <FieldGroup>
                <FieldSelect
                    name='studyCourseId'
                    label='Studienkurs'
                    onChange={change}
                    value={values.studyCourseId}
                    options={studyCourseOptions()}
                    disabled
                /> 
            </FieldGroup>
            <FieldGroup>
                <Field
                    name='title'
                    label='Titel'
                    type='text'
                    onChange={change}
                    value={values.title}
                    required
                    autoFocus
                /> 
                <Field
                    name='date'
                    label='Gültig ab'
                    type='date'
                    placeholder='YYYY-MM-DD'
                    onChange={change}
                    value={values.date}
                    InputLabelProps={{ shrink: true }}
                /> 
            </FieldGroup>
            <FieldGroup>
                
            </FieldGroup>
            <FieldGroup>
                <Field
                    name='description'
                    label='Beschreibung'
                    type='text'
                    onChange={change}
                    value={values.description}
                    multiline
                /> 
            </FieldGroup>
            <HiddenDivider />
            <Button variant='contained' color='primary' type='submit'>Speichern</Button>
            <Button variant='text' onClick={onCancel} style={{ marginLeft: '1rem' }}>Abbrechen</Button>
        </Fragment>
    );
};

StudyRegulationFields.propTypes = {
    change: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    onCancel: PropTypes.func.isRequired,
    studyCourses: PropTypes.array.isRequired,
};

export default StudyRegulationFields;
