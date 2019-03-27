import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';

import FieldGroup from '../FieldGroup';
import Field from '../Field';
import { studyStatusList, isEmpty } from '../../helper/helper';
import FieldSelect from '../FieldSelect';


function StudyFields({
    values,
    prefix,
    // students,
    studyCourses,
    studyRegulations,
    change,
    // onCancel,
    classes,
}) {
    const year = new Date().getFullYear();

    function prefixed(name) {
        return prefix ? `${prefix}.${name}` : name;
    }

    function studyCourseOptions() {
        return studyCourses.map(({ id, title }) => ({
            value: id, label: title
        }));
    }

    function studyRegulationOptions() {
        const results = [];
        for (let i = 0; i < studyRegulations.length; i++) {
            const { id, title, studyCourseId } = studyRegulations[i];
            if (isEmpty(values.studyCourseId) || values.studyCourseId === studyCourseId) {
                results.push({ value: id, label: title });
            }
        }
        return results;
    }

    function StudyStatusOptions() {
        return studyStatusList.map(({ id, value }) => ({
            value: id, label: value
        }));
    }

    const studyCourseChangeHandler = (e) => {
        change(e, true);
        change({ target: { name: 'studyRegulationId', value: '' }}, true);
    };

    return (
        <Fragment>
            <Paper className={classes.paper}>
                {/* <FieldGroup>
                    <FieldSelect
                        name={prefixed('studentId')}
                        label='Student'
                        value={values.studentId}
                        onChange={e => change(e, true)}
                        options={studentOptions()}
                        required
                    />
                </FieldGroup> */}
                <FieldGroup>
                    <FieldSelect
                        name={prefixed('studyCourseId')}
                        label='Studienkurs'
                        value={values.studyCourseId}
                        onChange={studyCourseChangeHandler}
                        options={studyCourseOptions()}
                        required
                    />
                    <FieldSelect
                        name={prefixed('studyRegulationId')}
                        label='Studienordnung'
                        value={values.studyRegulationId}
                        onChange={e => change(e, true)}
                        options={studyRegulationOptions()}
                        required
                    />
                </FieldGroup>
                <FieldGroup>
                    <FieldSelect
                        name={prefixed('status')}
                        label='Status'
                        value={values.status}
                        onChange={e => change(e, true)}
                        options={StudyStatusOptions()}
                        required
                    />
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
