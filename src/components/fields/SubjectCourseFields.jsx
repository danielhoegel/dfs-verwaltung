import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import FieldGroup from '../FieldGroup';
import Field from '../Field';
import FieldSelect from '../FieldSelect';
import FieldCheckbox from '../FieldCheckbox';
import HiddenDivider from '../HiddenDivider';
import SearchSelect from '../SearchSelect';
import Autocomplete from '../Autocomplete';


const SubjectCourseFields = ({ change, values, onCancel, subjectOptions }) => {
    return (
        <Fragment>
            <Typography variant='title' style={{marginTop: '2rem'}}>Veranstaltung</Typography>
            <FieldGroup>
                <Field
                    name='title'
                    value={values.title}
                    label='Titel'
                    type='text'
                    onChange={change}
                />
                <FieldSelect
                    name='type'
                    value={values.type}
                    label='Typ'
                    options={[ 'Arbeitsgemeinschaft', 'Vorlesung', 'TD', 'CM' ]}
                    onChange={change}
                />
                <SearchSelect
                    name='subjectId'
                    value={values.subjectId}
                    label='Fach'
                    onSelect={change}
                    options={subjectOptions}
                    style={{margin: '8px'}}
                /> 
            </FieldGroup>
            <FieldGroup>
                <Autocomplete
                    name='subjectId'
                    value={values.subjectId}
                    placeholder='Fach'
                    onChange={change}
                    options={subjectOptions}
                    isClearable
                    style={{margin: '8px', width: '100%'}}
                />
            </FieldGroup>
            <FieldGroup>
                <Field
                    name='credits'
                    value={values.credits}
                    label='Credits'
                    type='number'
                    onChange={change}
                />
                <FieldSelect
                    name='participationType'
                    value={values.participationType}
                    label='Teilnahmeart'
                    options={[ 'Note', 'Teilnahme', 'Notenbgeleitend' ]}
                    onChange={change}
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
            <Button variant='raised' onClick={onCancel} style={{marginLeft: '1rem'}}>Speichern</Button>
        </Fragment>
    );
};

SubjectCourseFields.propTypes = {
    change: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    onCancel: PropTypes.func.isRequired,
    subjectOptions: PropTypes.array.isRequired,
};

export default SubjectCourseFields;
