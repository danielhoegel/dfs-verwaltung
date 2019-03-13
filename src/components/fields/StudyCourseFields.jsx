import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';

import Field from '../Field';
import FieldGroup from '../FieldGroup';
import HiddenDivider from '../HiddenDivider';


const StudyCourseFields = ({ change, values, onCancel, disabled }) => {
    return (
        <Fragment>
            <FieldGroup width={`33.333`}>
                <Field
                    name='title'
                    label='Title'
                    type='text'
                    onChange={change}
                    value={values.title}
                    disabled={disabled}
                    required
                    autoFocus
                /> 
            </FieldGroup>
            <FieldGroup>
                <Field
                    name='description'
                    label='Beschreibung (optional)'
                    type='text'
                    multiline
                    onChange={change}
                    value={values.description}
                    disabled={disabled}
                /> 
            </FieldGroup>
            <HiddenDivider height={2} />
            <Button variant='contained' color='primary' type='submit' disabled={disabled}>Speichern</Button>
            <Button variant='text' onClick={onCancel} style={{marginLeft: '1rem'}} disabled={disabled}>Abbrechen</Button>
        </Fragment>
    );
};

StudyCourseFields.propTypes = {
    change: PropTypes.func.isRequired,
    values: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
    }).isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default StudyCourseFields;
