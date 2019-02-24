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

function UpdateStudentInformation({ values, prefix, onChange }) {
    const __prefix = prefix ? `${prefix}.studentInformation` : 'studentInformation';
    return (
        <Fragment>
            <FieldGroup>
                <Field
                    name={`${__prefix}.birthDate`}
                    label='Geburtsdatum'
                    type='date'
                    value={values.birthDate}
                    onChange={onChange}
                    InputLabelProps={dateInputLabelProps}
                />
                <Field
                    name={`${__prefix}.birthPlace`}
                    label='Geburtsort'
                    value={values.birthPlace}
                    onChange={onChange}
                />
                <NativeSelectField
                    name={`${__prefix}.birthCountry`}
                    label='Geburtsland'
                    value={values.birthCountry}
                    options={laenderOptions}
                    onChange={onChange}
                />
            </FieldGroup>

            <HiddenDivider height={2} />
            <FieldGroup>
                <Field
                    name={`${__prefix}.mailUni`}
                    value={values.mailUni}
                    onChange={onChange}
                    placeholder='vorname.nachname@hhu.de'
                    label='E-Mail Uni'
                    required
                    type='email'
                />
                <Field
                    name={`${__prefix}.mailPrivate`}
                    value={values.mailPrivate}
                    onChange={onChange}
                    placeholder='vorname.nachname@gmail.com'
                    label='E-Mail Privat (optional)'
                    type='email'
                />
            </FieldGroup>
            <FieldGroup>
                <Field
                    name={`${__prefix}.phoneNumber`}
                    value={values.phoneNumber}
                    onChange={onChange}
                    placeholder='+49 1234 5678'
                    label='Festnetznummer (optional)'
                    type='phone'
                />
                <Field
                    name={`${__prefix}.mobileNumber`}
                    value={values.mobileNumber}
                    onChange={onChange}
                    placeholder='+49 123 456 789 10'
                    label='Mobiltelefon (optional)'
                    type='phone'
                />
            </FieldGroup>

            <HiddenDivider height={2} />
            <FieldGroup>
                <Field
                    name={`${__prefix}.street`}
                    value={values.street}
                    onChange={onChange}
                    label='Straße'
                    width={2}
                />
                <Field
                    name={`${__prefix}.streetNumber`}
                    value={values.streetNumber}
                    onChange={onChange}
                    label='Hausnummer'
                />
                <Field
                    name={`${__prefix}.addressExtra`}
                    value={values.addressExtra}
                    onChange={onChange}
                    label='Zusatz (optional)'
                />
            </FieldGroup>
            <FieldGroup>
                <Field
                    name={`${__prefix}.postal`}
                    value={values.postal}
                    onChange={onChange}
                    label='Postleitzahl'
                    width={0.5}
                />
                <Field
                    name={`${__prefix}.city`}
                    value={values.city}
                    onChange={onChange}
                    label='Ort'
                />
                <NativeSelectField
                    name={`${__prefix}.country`}
                    label='Land'
                    value={values.country}
                    options={laenderOptions}
                    onChange={onChange}
                />
            </FieldGroup>

            <HiddenDivider height={2} />
            <FieldGroup>
                <Field
                    name={`${__prefix}.iban`}
                    label='IBAN'
                    value={values.iban}
                    onChange={onChange}
                    width={2}
                />
                <Field
                    name={`${__prefix}.bic`}
                    label='BIC'
                    value={values.bic}
                    onChange={onChange}
                />
            </FieldGroup>
        </Fragment>
    );
};

export default UpdateStudentInformation;
