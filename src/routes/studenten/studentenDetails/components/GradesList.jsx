import React from 'react';

import { withStyles } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import { formatGrade } from '../../../../helper/gradeConverter';


const GradesList = ({
    subjectCourse,
    subject,
    grades,
    studentId,
    studyId,
    openGradeModal,
    classes
}) => {
    const openUpdateGradeModal = (gradeId) => {
        openGradeModal({
            gradeId,
            studyId,
        });
    } 
    const openCreateGradeModal = () => {
        openGradeModal({
            studentId,
            studyId,
            subjectCourseId: subjectCourse.id,
            try: grades.length + 1
        })
    }

    return subjectCourse.participationType === 'Note' ? (
        <div>
            {grades.map(grade => (
                <div
                    key={grade.id}
                    className='clickable-note'
                    onClick={() => openUpdateGradeModal(grade.id)}
                >
                    <i className='fa fa-wrench' />
                    {formatGrade(grade, subject.type)}
                    {grades.length > 1 && ` (${grade.try}. Versuch)`}
                </div>
            ))}
            <Button
                onClick={openCreateGradeModal}
                style={{ marginTop: grades.length && '0.25rem' }}
                className={classes.noteCreateButton}
                size='small'
                variant='outlined'
            >
                <AddIcon className={classes.leftIcon} />
                {grades.length > 0 ? `${grades.length + 1}. Versuch`: 'Note'}
            </Button>
        </div>
    ) : (
        <span className='teilnahme-label'>
            Teilnahme
        </span>
    );
};

const styles = theme => ({
    noteCreateButton: {
        whiteSpace: 'nowrap',
        padding: '0 0.5rem 0 0.25rem',
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
});

export default withStyles(styles)(GradesList);