import React, { Fragment } from 'react';

import FieldGroup from '../FieldGroup';
import Field from '../Field';
import NativeSelectField from '../NativeSelectField';
import HiddenDivider from '../HiddenDivider';
import { generateLaenderOptions } from '../../helper/helper';


const dateInputLabelProps = { shrink: true };

const laenderOptions = generateLaenderOptions().map(({ value, label }) => (
    <option key={value} value={value}>
        {label}
    </option>
));

function StudentInformationFields({ values, prefix, onChange }) {
    function prefixed(name) {
        return prefix ? `${prefix}.${name}` : name;
    }

    return (
        <Fragment>
            <FieldGroup>
                <Field
                    name={prefixed('birthDate')}
                    label='Geburtsdatum'
                    type='date'
                    placeholder='YYYY-MM-DD'
                    value={values.birthDate}
                    onChange={onChange}
                    InputLabelProps={dateInputLabelProps}
                />
                <Field
                    name={prefixed('birthPlace')}
                    label='Geburtsort'
                    value={values.birthPlace}
                    onChange={onChange}
                />
                <NativeSelectField
                    name={prefixed('birthCountry')}
                    label='Geburtsland'
                    value={values.birthCountry}
                    options={laenderOptions}
                    onChange={onChange}
                />
            </FieldGroup>

            <HiddenDivider height={2} />
            <FieldGroup>
                <Field
                    name={prefixed('mailPrimary')}
                    value={values.mailPrimary}
                    onChange={onChange}
                    placeholder='vorname.nachname@gmail.com'
                    label='Standard-E-Mail'
                    required
                    type='email'
                />
                <Field
                    name={prefixed('mailSecondary')}
                    value={values.mailSecondary}
                    onChange={onChange}
                    placeholder='vorname.nachname@hhu.de'
                    label='Extra-E-Mail (optional)'
                    type='email'
                />
            </FieldGroup>
            <FieldGroup>
                <Field
                    name={prefixed('mobileNumber')}
                    value={values.mobileNumber}
                    onChange={onChange}
                    placeholder='+49 123 456 789 10'
                    label='Mobil (optional)'
                    type='phone'
                />
                <Field
                    name={prefixed('phoneNumber')}
                    value={values.phoneNumber}
                    onChange={onChange}
                    placeholder='+49 1234 5678'
                    label='Festnetz (optional)'
                    type='phone'
                />
            </FieldGroup>

            <HiddenDivider height={2} />
            <FieldGroup>
                <Field
                    name={prefixed('address')}
                    value={values.address}
                    onChange={onChange}
                    label='Straße, Nr.'
                    width={2}
                />
                <Field
                    name={prefixed('addressExtra')}
                    value={values.addressExtra}
                    onChange={onChange}
                    label='Zusatz (optional)'
                />
            </FieldGroup>
            <FieldGroup>
                <Field
                    name={prefixed('postal')}
                    value={values.postal}
                    onChange={onChange}
                    label='Postleitzahl'
                    width={0.5}
                />
                <Field
                    name={prefixed('city')}
                    value={values.city}
                    onChange={onChange}
                    label='Ort'
                />
                <NativeSelectField
                    name={prefixed('country')}
                    label='Land'
                    value={values.country}
                    options={laenderOptions}
                    onChange={onChange}
                />
            </FieldGroup>

            <HiddenDivider height={2} />
            <FieldGroup>
                <Field
                    name={prefixed('bank')}
                    label='Bank'
                    value={values.bank}
                    onChange={onChange}
                />
                <Field
                    name={prefixed('accountHolder')}
                    label='Kontoinhaber'
                    value={values.accountHolder}
                    onChange={onChange}
                />
            </FieldGroup>
            <FieldGroup>
                <Field
                    name={prefixed('iban')}
                    label='IBAN'
                    value={values.iban}
                    onChange={onChange}
                    width={2}
                />
                <Field
                    name={prefixed('bic')}
                    label='BIC'
                    value={values.bic}
                    onChange={onChange}
                />
            </FieldGroup>
        </Fragment>
    );
}

export default StudentInformationFields;
