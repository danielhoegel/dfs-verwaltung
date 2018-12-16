import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Field from '../../../components/Field';
import FieldGroup from '../../../components/FieldGroup';
import FieldSelect from '../../../components/FieldSelect';
import HiddenDivider from '../../../components/HiddenDivider';
import { Button, Typography } from '@material-ui/core';


const StudyRegulationFields = ({ onChange, values, onCancel, studyCourseOptions }) => {
    return (
        <Fragment>
            <Typography variant='title' style={{marginTop: '2rem'}}>Studienordnung</Typography>
            <FieldGroup>
                <Field
                    name='title'
                    label='Titel'
                    type='text'
                    onChange={onChange}
                    value={values.title}
                /> 
                <FieldSelect
                    name='studyCourseId'
                    label='Studienkurs'
                    onChange={onChange}
                    value={values.studyCourseId}
                    options={studyCourseOptions}
                /> 
                <Field
                    name='date'
                    label='Gültig ab (TT.MM.JJJJ)'
                    type='date'
                    onChange={onChange}
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
                    onChange={onChange}
                    value={values.description}
                /> 
            </FieldGroup>
            <HiddenDivider />
            <Button variant='raised' color='primary' type='submit'>Speichern</Button>
            <Button variant='raised' onClick={onCancel} style={{marginLeft: '1rem'}}>Abbrechen</Button>
        </Fragment>
    );
};

StudyRegulationFields.propTypes = {
    onChange: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    onCancel: PropTypes.func.isRequired,
    studyCourseOptions: PropTypes.array.isRequired,
};

export default StudyRegulationFields;
