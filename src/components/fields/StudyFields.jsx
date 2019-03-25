import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';

import FieldGroup from '../FieldGroup';
import Field from '../Field';
import { studyStatusList, isEmpty } from '../../helper/helper';


function StudyFields({
    values, prefix, /* students,  */studyCourses, studyRegulations, change, /* onCancel,  */classes
}) {
    const year = new Date().getFullYear();

    // function studentOptions() {
    //     return students.map(({ id, firstName, lastName }) => (
    //         <MenuItem key={id} value={id}>
    //             {firstName} {lastName}
    //         </MenuItem>
    //     ));
    // }

    function studyCourseOptions() {
        return studyCourses.map(({ id, title }) => (
            <MenuItem key={id} value={id}>
                {title}
            </MenuItem>
        ));
    }

    function prefixed(name) {
        return prefix ? `${prefix}.${name}` : name;
    }

    function studyRegulationOptions() {
        const results = [];
        for (let i = 0; i < studyRegulations.length; i++) {
            const { id, title, studyCourseId } = studyRegulations[i];
            if (isEmpty(values.studyCourseId) || values.studyCourseId === studyCourseId) {
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
        change(e, true);
        change({ target: { name: 'studyRegulationId', value: '' }}, true);
    };

    return (
        <Fragment>
            <Paper className={classes.paper}>
                {/* <FieldGroup>
                    <Field
                        select
                        name={prefixed('studentId')}
                        label='Student'
                        value={values.studentId}
                        onChange={e => change(e, true)}
                        required
                    >
                        {studentOptions()}
                    </Field>
                </FieldGroup> */}
                <FieldGroup>
                    <Field
                        select
                        name={prefixed('studyCourseId')}
                        label='Studienkurs'
                        value={values.studyCourseId}
                        onChange={studyCourseChangeHandler}
                        required
                    >
                        {studyCourseOptions()}
                    </Field>
                    <Field
                        select
                        name={prefixed('studyRegulationId')}
                        label='Studienordnung'
                        value={values.studyRegulationId}
                        onChange={e => change(e, true)}
                        required
                    >
                        {studyRegulationOptions()}
                    </Field>
                </FieldGroup>
                <FieldGroup>
                    <Field
                        select
                        name={prefixed('status')}
                        label='Status'
                        value={values.status}
                        onChange={e => change(e, true)}
                        required
                    >
                        {studyStatusList.map(({ id, value }) => (
                            <MenuItem key={id} value={id}>{value}</MenuItem>
                        ))}
                    </Field>
                    <Field
                        name={prefixed('year')}
                        value={values.year}
                        onChange={e => change(e, true)}
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
}

const styles = theme => ({
    paper: {
        padding: 2 * theme.spacing.unit,
        margin: [[2 * theme.spacing.unit, 0]],
    }
});

StudyFields.propTypes = {
    change: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    onCancel: PropTypes.func,
    studyCourses: PropTypes.array.isRequired,
    studyRegulations: PropTypes.array.isRequired,
    prefix: PropTypes.string,
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(StudyFields);
