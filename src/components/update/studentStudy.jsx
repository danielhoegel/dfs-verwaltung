import React, { Fragment } from 'react';

import MenuItem from '@material-ui/core/MenuItem';

import FieldGroup from '../FieldGroup';
import Field from '../Field';
import { isEmpty } from '../../helper/helper';


function UpdateStudy({ values, prefix, studyCourses, studyRegulations, onChange }) {
    const __prefix = prefix || 'study';
    const year = new Date().getFullYear();
    return (
        <Fragment>
            <FieldGroup>
                <Field
                    select
                    name={`${__prefix}.studyCourse`}
                    label='Studienkurs'
                    value={values.studyCourse}
                    onChange={onChange}
                    required
                >
                    {studyCourses.map(({ id, title }) => (
                        <MenuItem key={id} value={id}>
                            {title}
                        </MenuItem>
                    ))}
                </Field>
                <Field
                    name={`${__prefix}.year`}
                    value={values.year}
                    onChange={onChange}
                    label='Jahrgang'
                    required
                    type='number'
                    min='1990'
                    max={year + 2}
                    width={0.3}
                /> 
                <Field
                    select
                    name={`${__prefix}.studyRegulation`}
                    label='Studienordnung'
                    value={
                        values.studyRegulation !== ''
                        ? values.studyRegulation
                        : !isEmpty(studyRegulations) && studyRegulations[0].id
                    }
                    onChange={onChange}
                    required
                >
                    {studyRegulations.map(({ id, title }) => (
                        <MenuItem key={id} value={id}>
                            {title}
                        </MenuItem>
                    ))}
                </Field>
            </FieldGroup>
        </Fragment>
    );
};

export default UpdateStudy;
