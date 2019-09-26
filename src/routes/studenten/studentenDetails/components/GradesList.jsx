import React from 'react';

import cn from 'classnames';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/EditOutlined';

import { formatGrade } from '../../../../helper/gradeConverter';


const GradesList = ({
    subjectCourse,
    subject,
    grades,
    studyId,
    openGradeModal,
    classes
}) => {
    const openUpdateGradeModal = (gradeId) => {
        openGradeModal({
            gradeId,
            studyId,
        });
    };
    const openCreateGradeModal = () => {
        openGradeModal({
            studyId,
            subjectCourseId: subjectCourse.id,
            try: grades.length + 1
        });
    };

    return subjectCourse.participationType === 'Note' ? (
        <div>
            {grades.map(grade => (
                <div
                    key={grade.id}
                    className={classes.grade}
                    onClick={() => openUpdateGradeModal(grade.id)}
                >
                    <EditIcon className={classes.gradeEditIcon} />
                    <div>
                        {formatGrade(grade, subject.type)}
                        {grades.length > 1 && ` (${grade.try}. Versuch)`}
                    </div>
                </div>
            ))}
            <Button
                onClick={openCreateGradeModal}
                style={{ marginTop: grades.length && '0.25rem' }}
                className={cn([classes.noteCreateButton, { [classes.noteCreateButtonSecondary]: grades.length > 0 }])}
                size='small'
                variant='outlined'
            >
                <AddIcon className={classes.leftIcon} />
                {grades.length > 0 ? `${grades.length + 1}. Versuch` : 'Note'}
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
    noteCreateButtonSecondary: {
        opacity: 0.4,
        '&:hover': {
            opacity: 1
        }
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    gradeEditIcon: {
        opacity: 0,
        color: 'rgba(0, 0, 0, 0.54)',
        marginRight: theme.spacing.unit,
        fontSize: '1.5em',
    },
    grade: {
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        '&:hover': {
            textDecoration: 'underline',
            '& $gradeEditIcon': {
                opacity: 1,
            }
        },
    },
});

export default withStyles(styles)(GradesList);
