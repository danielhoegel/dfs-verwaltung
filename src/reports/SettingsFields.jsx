import React, { Fragment } from 'react';

import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

import FieldGroup from '../components/FieldGroup';
import FieldRadioGroup from '../components/FieldRadioGroup';
import Field from '../components/Field';
import FieldCheckbox from '../components/FieldCheckbox';
import HiddenDivider from '../components/HiddenDivider';


const SettingsFields = ({
    values,
    change,
    onCancel,
    classes
}) => {

    return (
        <Fragment>
            <FieldGroup>
                <Field
                    name='title'
                    value={values.title}
                    label='Überschrift'
                    onChange={change}
                    disabled={!values.showTitle || values.autoTitle}
                />
            </FieldGroup>
            <FieldGroup>
                <FieldCheckbox
                    name='showTitle'
                    value={values.showTitle}
                    label='Überschrift anzeigen'
                    onChange={change}
                />
                <FieldCheckbox
                    name='autoTitle'
                    value={values.autoTitle}
                    label='Überschrift automatisch generieren'
                    onChange={change}
                    disabled={!values.showTitle}
                />
            </FieldGroup>
            <FieldGroup>
                <FieldCheckbox
                    name='showFilter'
                    value={values.showFilter}
                    label='Filter anzeigen'
                    onChange={change}
                />
            </FieldGroup>
            <FieldGroup>
                <FieldRadioGroup
                    name='orientation'
                    value={values.orientation}
                    label='Orientierung'
                    onChange={change}
                    options={[
                        { value: 'auto', label: 'Automatisch' },
                        { value: 'landscape', label: 'Querformat' },
                        { value: 'portrait', label: 'Hochformat' }
                    ]}
                    disabled={false}
                />
            </FieldGroup>
            <HiddenDivider />
            <div style={{ display: 'flex' }}>
                <Button
                    variant='contained'
                    color='primary'
                    type='submit'
                >
                    <SaveIcon className={classes.leftIcon} />
                    Speichern
                </Button>
                <Button
                    variant='contained'
                    onClick={onCancel}
                    style={{ marginLeft: '1rem' }}
                >
                    Abbrechen
                </Button>
            </div>
        </Fragment>
    );
};

const styles = theme => ({
    leftIcon: {
        marginRight: theme.spacing.unit
    },
});

export default withStyles(styles)(SettingsFields);
