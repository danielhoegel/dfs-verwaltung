import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

// import Field from '../Field';
// import FieldGroup from '../FieldGroup';
import HiddenDivider from '../HiddenDivider';
import FieldArray from '../FieldArray';
import StudentFields from './StudentFields';
import StudentInformationFields from './StudentInformationFields';
import StudyFields from './StudyFields';
import MessageBox from '../MessageBox';


const StudentCombinedFields = ({
    change,
    values,
    onCancel,
    add,
    remove,
    studyRegulations,
    studyCourses,
    classes,
    history
}) => {
    const addStudyHandler = (index) => {
        const item = {
            year: new Date().getFullYear(),
            studyCourseId: 1,
            studyRegulationId: '',
            status: 1,
        };
        add('studies', item);
    }

    const removeStudyHandler = (index) => {
        remove('studies', index);
    }

    // check missing data
    if (!studyRegulations.length || !studyCourses.length) {
        return (
            <Fragment>
                <MessageBox
                    variant='warning'
                    message='Bitte fügen Sie zuerst mindestens einen Studienkurs mit einer Studienordnung hinzu.'
                    actions={[
                        <Button variant='text' onClick={() => history.push('/studienkurse')}>
                            Studienkurs hinzufügen
                        </Button>
                    ]}
                />
                <HiddenDivider />
            </Fragment>
        );
    }

    return (
        <Fragment>
            <Paper className={classes.paper}>
                <StudentFields
                    onChange={change}
                    values={values.student}
                />

                <StudentInformationFields
                    onChange={change}
                    values={values.studentInformation}
                />
            </Paper>

            <HiddenDivider height={2} />
            <Typography component='h3' variant='h6'>
                Studium
            </Typography>
            <FieldArray
                component={StudyFields}
                values={values.studies}
                onChange={change}
                addLabel='Studienkurs hinzufügen'
                removeLabel='Studienkurs entfernen'
                prefix='studies'
                addHandler={addStudyHandler}
                removeHandler={removeStudyHandler}
                min={1}
                studyRegulations={studyRegulations}
                studyCourses={studyCourses}
            />

            <HiddenDivider height={2} />
            <Button variant='contained' color='primary' type='submit'>
                Speichern
            </Button>
            <Button variant='contained' onClick={onCancel} style={{ marginLeft: '1rem' }}>
                Abbrechen
            </Button>
        </Fragment>
    );
};

StudentCombinedFields.propTypes = {
    change: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    onCancel: PropTypes.func.isRequired,
    add: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    studyRegulations: PropTypes.array.isRequired,
    studyCourses: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired,
};

const styles = theme => ({
    paper: {
        padding: 2 * theme.spacing.unit,
        marginTop: 2 * theme.spacing.unit,
    },
});

export default withRouter(withStyles(styles)(StudentCombinedFields));
