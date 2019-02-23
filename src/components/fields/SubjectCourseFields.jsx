import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';

import { isNotEmpty } from '../../helper/helper';
import FieldGroup from '../FieldGroup';
import Field from '../Field';
import FieldSelect from '../FieldSelect';
import FieldCheckbox from '../FieldCheckbox';
import HiddenDivider from '../HiddenDivider';
import SearchSelect from '../SearchSelect';


const SubjectCourseFields = ({
    change,
    values,
    onCancel,
    subjects
}) => {
    function subjectOptions() {
        const options = [];
        if (isNotEmpty(subjects)) {
            subjects.forEach(subject => {
                options.push({
                    value: subject.id,
                    label: subject.title
                });
            });
        }
        return options;
    }

    const __subjectOptions = subjectOptions();

    return (
        <Fragment>
            <FieldGroup>
                <Field
                    name='title'
                    value={values.title}
                    label='Titel'
                    type='text'
                    onChange={change}
                    required
                />
                <FieldSelect
                    name='type'
                    value={values.type}
                    label='Typ'
                    options={[ 'Arbeitsgemeinschaft', 'Vorlesung', 'TD', 'CM' ]}
                    onChange={change}
                    required
                />
                <SearchSelect
                    name='subjectId'
                    value={values.subjectId}
                    label='Fach'
                    onSelect={change}
                    options={__subjectOptions}
                    style={{margin: '8px'}}
                    noClearIcon
                    required
                /> 
            </FieldGroup>
            <FieldGroup>
                <Field
                    name='credits'
                    value={values.credits}
                    label='Credits'
                    type='number'
                    onChange={change}
                    required
                />
                <FieldSelect
                    name='participationType'
                    value={values.participationType}
                    label='Teilnahmeart'
                    options={[ 'Note', 'Teilnahme', 'Notenbgeleitend' ]}
                    onChange={change}
                    required
                />
                <FieldCheckbox
                    name='zpk'
                    value={values.zpk}
                    label='ZPK-Fach'
                    onChange={change}
                />
            </FieldGroup>
            <HiddenDivider />
            <Button variant='raised' color='primary' type='submit'>Speichern</Button>
            <Button variant='flat' onClick={onCancel} style={{marginLeft: '1rem'}}>Abbrechen</Button>
        </Fragment>
    );
};

SubjectCourseFields.propTypes = {
    change: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    onCancel: PropTypes.func.isRequired,
    subjects: PropTypes.array.isRequired,
};

export default SubjectCourseFields;
