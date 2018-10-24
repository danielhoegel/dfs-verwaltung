import React, { Fragment } from 'react';
import FieldGroup from '../FieldGroup';
import Field from '../Field';
import MenuItem from '@material-ui/core/MenuItem';

function UpdateStuentInformation({ values, prefix, onChange }) {
    const __prefix = prefix ? `${prefix}.student` : 'student';
    return (
        <Fragment>
            <FieldGroup>
                <Field
                    select
                    name={`${__prefix}.prefix`}
                    label='Anrede'
                    value={values.prefix}
                    onChange={onChange}
                    required
                >
                    <MenuItem key='Frau' value='Frau'>Frau</MenuItem>
                    <MenuItem key='Herr' value='Herr'>Herr</MenuItem>
                </Field>
                <Field
                    name={`${__prefix}.firstName`}
                    label='Vorname'
                    value={values.firstName}
                    onChange={onChange}
                    width={2}
                    required
                />
                <Field
                    name={`${__prefix}.lastName`}
                    label='Nachname'
                    value={values.lastName}
                    onChange={onChange}
                    width={2}
                    required
                />
                <Field
                    name={`${__prefix}.matrikelnummer`}
                    value={values.matrikelnummer}
                    onChange={onChange}
                    label='Matrikelnummer'
                    type='number'
                    width={1.5}
                    required
                />
            </FieldGroup>
        </Fragment>
    );
};

export default UpdateStuentInformation;
