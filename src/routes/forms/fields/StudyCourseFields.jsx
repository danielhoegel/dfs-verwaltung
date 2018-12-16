import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Field from '../../../components/Field';
import FieldGroup from '../../../components/FieldGroup';
import HiddenDivider from '../../../components/HiddenDivider';


const StudyCourseFields = ({ onChange, values, onCancel }) => {
    return (
        <Fragment>
            <Typography variant='title' style={{marginTop: '2rem'}}>Studienkurs</Typography>
            <FieldGroup width={`33.333`}>
                <Field
                    name='title'
                    label='Title'
                    type='text'
                    onChange={onChange}
                    value={values.title}
                /> 
            </FieldGroup>
            <FieldGroup>
                <Field
                    name='description'
                    label='Beschreibung'
                    type='text'
                    onChange={onChange}
                    values={values.description}
                /> 
            </FieldGroup>
            <HiddenDivider />
            <Button variant='raised' color='primary' type='submit'>Speichern</Button>
            <Button variant='raised' onClick={onCancel} style={{marginLeft: '1rem'}}>Abbrechen</Button>
        </Fragment>
    );
};

StudyCourseFields.propTypes = {
    onChange: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default StudyCourseFields;
