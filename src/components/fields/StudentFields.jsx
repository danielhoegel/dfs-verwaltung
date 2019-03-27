import React, { Fragment } from 'react';
import MenuItem from '@material-ui/core/MenuItem';

import FieldGroup from '../FieldGroup';
import Field from '../Field';
import FieldSelect from '../FieldSelect';

function StudentFields({ values, prefix, onChange }) {
    function prefixed(name) {
        return prefix ? `${prefix}.${name}` : name;
    }

    return (
        <Fragment>
            <FieldGroup>
                <FieldSelect
                    name={prefixed('prefix')}
                    label='Anrede'
                    value={values.prefix}
                    onChange={onChange}
                    required
                    autoFocus
                    openOnFocus={false}
                    options={[
                        { value: 'Frau', label: 'Frau' },
                        { value: 'Herr', label: 'Herr' },
                    ]}
                />
                <Field
                    name={prefixed('firstName')}
                    label='Vorname'
                    value={values.firstName}
                    onChange={onChange}
                    width={2}
                    required
                />
                <Field
                    name={prefixed('lastName')}
                    label='Nachname'
                    value={values.lastName}
                    onChange={onChange}
                    width={2}
                    required
                />
                <Field
                    name={prefixed('matrikelnummer')}
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
}

export default StudentFields;
