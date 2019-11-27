import React from 'react';

import cn from 'classnames';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TableCell from '@material-ui/core/TableCell';
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

    return (
        <>
            <TableCell className={classes.tableCell} style={{ textAlign: 'right' }}>
                {subjectCourse.participationType === 'Note' ? (
                    <div>
                        {grades.length === 0 && '-'}
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
                    </div>
                ) : (
                    <span className='teilnahme-label'>
                        Teilnahme
                    </span>
                )}
            </TableCell>
            <TableCell className={classes.tableCell} style={{ paddingRight: 0, paddingLeft: 0 }}>
                {subjectCourse.participationType === 'Note' && (
                    <Button
                        onClick={openCreateGradeModal}
                        className={cn([
                            classes.noteCreateButton,
                            { [classes.noteCreateButtonSecondary]: grades.length > 0 }
                        ])}
                        size='small'
                        variant='outlined'
                        style={{ minWidth: 0 }}
                        title= {grades.length > 0 ? `${grades.length + 1}. Versuch hinzufügen` : 'Note hinzufügen'}
                    >
                        <AddIcon />
                    </Button>
                )}
            </TableCell>
        </>
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
