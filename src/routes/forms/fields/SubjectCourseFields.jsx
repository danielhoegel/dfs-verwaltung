import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import FieldGroup from '../../../components/FieldGroup';
import Field from '../../../components/Field';
import FieldSelect from '../../../components/FieldSelect';
import FieldCheckbox from '../../../components/FieldCheckbox';
import SearchSelect from '../../../components/SearchSelect';
import HiddenDivider from '../../../components/HiddenDivider';


const SubjectCourseFields = ({ onChange, values, onCancel, subjectOptions }) => {
    return (
        <Fragment>
            <Typography variant='title' style={{marginTop: '2rem'}}>Veranstaltung</Typography>
            <FieldGroup>
                <Field
                    name='title'
                    value={values.title}
                    label='Titel'
                    type='text'
                    onChange={onChange}
                />
                <FieldSelect
                    name='type'
                    value={values.type}
                    label='Typ'
                    options={[ 'Arbeitsgemeinschaft', 'Vorlesung', 'TD', 'CM' ]}
                    onChange={onChange}
                />
                <SearchSelect
                    name='subjectId'
                    value={values.subjectid}
                    label='Fach'
                    onSelect={onChange}
                    options={subjectOptions}
                />
            </FieldGroup>
            <FieldGroup>
                <Field
                    name='credits'
                    value={values.credits}
                    label='Credits'
                    type='number'
                    onChange={onChange}
                />
                <FieldSelect
                    name='participationType'
                    value={values.participationType}
                    label='Teilnahmeart'
                    options={[ 'Note', 'Teilnahme', 'Notenbgeleitend' ]}
                    onChange={onChange}
                />
                <FieldCheckbox
                    name='zpk'
                    value={values.zpk}
                    label='ZPK-Fach'
                    onChange={onChange}
                />
            </FieldGroup>
            <HiddenDivider />
            <Button variant='raised' color='primary' type='submit'>Speichern</Button>
            <Button variant='raised' onClick={onCancel} style={{marginLeft: '1rem'}}>Speichern</Button>
        </Fragment>
    );
};

SubjectCourseFields.propTypes = {
    onChange: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
};

export default SubjectCourseFields;
