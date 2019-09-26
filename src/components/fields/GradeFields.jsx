import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/SaveOutlined';

import Field from '../Field';
import FieldGroup from '../FieldGroup';
import FieldRadioGroup from '../FieldRadioGroup';
import HiddenDivider from '../HiddenDivider';
import SearchSelect from '../../components/SearchSelect';
import { getStudiesByStudentId } from '../../redux/entitiesSelector';
import { translateStudyStatus } from '../../helper/helper';
import FieldSelect from '../FieldSelect';
import MessageBox from '../MessageBox';


const GradeFields = ({
    classes,
    change,
    values,
    onCancel,
    deleteGrade,
    students,
    study,
    studies,
    studyCourses,
    subjects,
    subjectCourses,
    grade,
    history
}) => {

    function studentOptions() {
        return students.map(({ id, firstName, lastName}) => ({
            value: id,
            label: `${firstName} ${lastName}`
        }));
    }

    function studyOptions() {
        const studyOptions = studies.map(({ id, studyCourseId, year, status }) => {
            const { title } = studyCourses.find(({ id }) => id === studyCourseId);
            return ({
                value: id,
                label: `${title} ${year} (${translateStudyStatus(status)})`
            })
        });
        if (studyOptions.length === 1 && values.studyId === '') {
            studyIdChange({ target: { name: 'studyId', value: studyOptions[0].value }});
        }
        return studyOptions;
    }

    function subjectOptions() {
        return subjects
            .filter(({ studyRegulationId }) =>
                !study || (studyRegulationId === study.studyRegulationId)
            )
            .map(({ id, title }) => ({
                value: id,
                label: title
            }));
    }

    function subjectCourseOptions() {
        const subjectCourseOptions = subjectCourses
            .filter(({ subjectId, participationType}) => 
                participationType === 'Note' && subjectId === values.subjectId
            )
            .map(({ id, type, title }) => ({
                value: id,
                label: type + (title && ` (${title})`),
            }));
        if (subjectCourseOptions.length === 1 && values.subjectCourseId === '') {
            change({ target: { name: 'subjectCourseId', value: subjectCourseOptions[0].value }});
        }
        return subjectCourseOptions;
    }

    const studentIdChange = e => {
        change(e, true);
        // reset studyId
        studyIdChange({ target: { name: 'studyId', value: '' }});
    }

    const studyIdChange = e => {
        change(e, true);
        // reset subjectId
        subjectIdChange({ target: { name: 'subjectId', value: '' }});
    }

    const subjectIdChange = e => {
        change(e, true);
        // reset subjectCourseId
        change({ target: { name: 'subjectCourseId', value: '' }}, true);
    }

    // check missing data
    if (!students.length) {
        return (
            <Fragment>
                <MessageBox
                    variant='warning'
                    message='Bitte fügen Sie zuerst mindestens einen Studenten hinzu.'
                    actions={[
                        <Button variant='text' onClick={() => {
                            history.push('/studenten/create');
                            onCancel();
                        }}>
                            Student hinzufügen
                        </Button>
                    ]}
                />
                <HiddenDivider />
            </Fragment>
        );
    }

    return (
        <Fragment>
            <FieldGroup>
                <SearchSelect
                    name='studentId'
                    value={values.studentId}
                    label='Student'
                    onSelect={studentIdChange}
                    options={studentOptions()}
                    style={{ margin: '8px', flex: 1 }}
                    noClearIcon
                    required
                /> 
                <FieldSelect
                    name='studyId'
                    value={values.studyId}
                    label='Studium'
                    onChange={studyIdChange}
                    options={studyOptions()}
                    disabled={values.studentId === ''}
                    required
                /> 
            </FieldGroup>
            <FieldGroup>
                <SearchSelect
                    name='subjectId'
                    value={values.subjectId}
                    label='Fach'
                    onSelect={subjectIdChange}
                    options={subjectOptions()}
                    style={{ margin: '8px', flex: 1 }}
                    noClearIcon
                    disabled={values.studyId === ''}
                    required
                /> 
                <FieldSelect
                    name='subjectCourseId'
                    value={values.subjectCourseId}
                    label='Veranstaltung'
                    onChange={change}
                    options={subjectCourseOptions()}
                    disabled={values.subjectId === ''}
                    required
                /> 
            </FieldGroup>
            <HiddenDivider />
            <FieldGroup>
                <FieldGroup
                    className={classes.stackedFieldGroup}
                    style={{ width: '30%'}}
                >
                    <Field
                        name='grade'
                        value={values.grade}
                        label={`Punkte (0 - ${values.gradingSystem === 'de' ? 18 : 20})`}
                        type='number'
                        onChange={e => change(e, true)}
                        autoFocus
                        required
                        variant='outlined'
                        InputLabelProps={{ shrink: true }}
                        InputProps={{ className: classes.punkteFieldInput }} // Properties applied to the InputBase element.
                        // eslint-disable-next-line
                        inputProps={{ // Attributes applied to the native input element.
                            min: 0,
                            max: values.gradingSystem === 'de' ? 18 : 20,
                            step: 'any' // allow integers and decimals; TODO: does not work in MS Edge
                        }}
                        margin='normal'
                    />
                </FieldGroup>
                <FieldGroup
                    className={classes.stackedFieldGroup}
                    style={{ width: '70%' }}
                >
                    <FieldGroup>
                        <FieldRadioGroup
                            name='gradingSystem'
                            value={values.gradingSystem}
                            label='Note'
                            onChange={change}
                            options={[
                                { value: 'de', label: 'DE' },
                                { value: 'fr', label: 'FR' },
                            ]}
                            required
                        />
                        <Field
                            name='try'
                            value={values.try}
                            label='Versuch'
                            type='number'
                            onChange={e => change(e, true)}
                            required
                            width={1.5}
                        />
                    </FieldGroup>
                    <FieldGroup>
                        <Field
                            name='date'
                            value={values.date}
                            label='Prüfungsdatum'
                            onChange={change}
                            type='date'
                            placeholder='YYYY-MM-DD'
                            InputLabelProps={{ shrink: true }}
                        />
                        <Field
                            name='lecturer'
                            value={values.lecturer}
                            label='Prüfer'
                            onChange={change}
                            width={1.5}
                        />
                    </FieldGroup>
                </FieldGroup>
            </FieldGroup>
            <HiddenDivider />
            <div style={{ display: 'flex' }}>
                <Button variant='contained' color='primary' type='submit'>
                    <SaveIcon className={classes.leftIcon} />
                    Speichern
                </Button>
                {/* <Button variant='contained' color='secondary' type='button' style={{marginLeft: '1rem'}}>
                    <SaveIcon className={classes.leftIcon} />
                    Nächste Note
                </Button>
                <Button variant='contained' color='secondary' type='button' style={{marginLeft: '1rem'}}>
                    <SaveIcon className={classes.leftIcon} />
                    Nächster Student
                </Button> */}
                <Button variant='contained' onClick={onCancel} style={{marginLeft: '1rem'}}>
                    Abbrechen
                </Button>
                {grade && (
                    <Button
                        variant='contained'
                        type='button'
                        onClick={() => deleteGrade(grade).then(onCancel)}
                        className={classes.deleteButton}
                    >
                        Löschen
                    </Button>
                )}
            </div>
        </Fragment>
    );
};

const styles = theme => ({
    stackedFieldGroup: {
        flexDirection: 'column'
    },
    punkteFieldInput: {
        height: '100%',
        fontSize: '2rem',
        marginRight: '1rem',
        '& input': {
            textAlign: 'center',
        }
    },
    leftIcon: {
        marginRight: theme.spacing.unit
    },
    deleteButton: {
        marginLeft: 'auto',
        color: theme.palette.getContrastText(theme.palette.red),
        backgroundColor: theme.palette.red,
        '&:hover': {
            backgroundColor: theme.palette.darkred,
        },
    },
});

GradeFields.propTypes = {
    classes: PropTypes.object.isRequired,
    values: PropTypes.object.isRequired,
    change: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    studyCourses: PropTypes.array.isRequired,
    studyRegulations: PropTypes.array.isRequired,
    subjects: PropTypes.array.isRequired,
    subjectCourses: PropTypes.array.isRequired,
    deleteGrade: PropTypes.func,
    grade: PropTypes.object,
    history: PropTypes.object.isRequired,
}

const mapStateToProps = (state, props) => ({
    studies: getStudiesByStudentId(state, props.values.studentId),
});

export default connect(mapStateToProps)(
    withRouter(withStyles(styles)(GradeFields))
);
