import React, { Fragment } from 'react';

import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';

import FieldGroup from '../FieldGroup';
import Field from '../Field';
import { studyStatusList, isEmpty } from '../../helper/helper';


function StudyFields({ values, prefix, studyCourses, studyRegulations, onChange, classes }) {
    const __prefix = prefix || 'study';
    const year = new Date().getFullYear();

    function studyCourseOptions() {
        return studyCourses.map(({ id, title }) => (
            <MenuItem key={id} value={id}>
                {title}
            </MenuItem>
        ));
    }

    function studyRegulationOptions() {
        const results = [];
        for (let i = 0; i < studyRegulations.length; i++) {
            const { id, title, studyCourseId } = studyRegulations[i];
            if (isEmpty(values.studyCourseId) || values.studyCourseId === studyCourseId)  {
                results.push(
                    <MenuItem key={id} value={id}>
                        {title}
                    </MenuItem>
                );
            }
        }
        return results;
    }

    const studyCourseChangeHandler = (e) => {
        onChange(e);
        onChange({ target: { name: 'studyRegulationId', value: '' }});
    }

    return (
        <Fragment>
            <Paper className={classes.paper}>
                <FieldGroup>
                    <Field
                        select
                        name={`${__prefix}.studyCourseId`}
                        label='Studienkurs'
                        value={values.studyCourseId}
                        onChange={studyCourseChangeHandler}
                        required
                    >
                        {studyCourseOptions()}
                    </Field>
                    <Field
                        select
                        name={`${__prefix}.studyRegulationId`}
                        label='Studienordnung'
                        value={values.studyRegulationId}
                        onChange={onChange}
                        required
                    >
                        {studyRegulationOptions()}
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
                        {studyStatusList.map(({ id, value }) => (
                            <MenuItem key={id} value={id}>{value}</MenuItem>
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

export default withStyles(styles)(StudyFields);
