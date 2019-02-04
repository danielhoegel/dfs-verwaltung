import React, { Fragment } from 'react';

import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';

import FieldGroup from '../FieldGroup';
import Field from '../Field';


function UpdateStudy({ values, prefix, studyCourses, studyRegulations, onChange, classes }) {
    const __prefix = prefix || 'study';
    const year = new Date().getFullYear();
    return (
        <Fragment>
            <Paper className={classes.paper}>
                <FieldGroup>
                    <Field
                        select
                        name={`${__prefix}.studyCourseId`}
                        label='Studienkurs'
                        value={values.studyCourseId}
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
                        select
                        name={`${__prefix}.studyRegulationId`}
                        label='Studienordnung'
                        value={values.studyRegulationId}
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
                <FieldGroup>
                    <Field
                        select
                        name={`${__prefix}.status`}
                        label='Status'
                        value={values.status}
                        onChange={onChange}
                        required
                    >
                        <MenuItem value={1}>Aktiv</MenuItem>
                        <MenuItem value={2}>Abgeschlossen</MenuItem>
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
                    />
                </FieldGroup>
            </Paper>
        </Fragment>
    );
};

const styles = theme => ({
    paper: {
        padding: 2 * theme.spacing.unit,
        margin: [[2 * theme.spacing.unit, 0]],
    }
})

export default withStyles(styles)(UpdateStudy);
