import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/EditOutlined';

import GradesList from './GradesList';
import {
    getSubjectCoursesBySubjectId,
    getGradesByStudyId,
    getStudiesByStudentId
} from '../../../../redux/entitiesSelector';


const SubjectListItem = ({
    subject,
    studentId,
    openGradeModal,
    study,
    subjectCourses,
    grades,
    studies,
    classes,
}) => {
    function getGradesForSubjectCourse(subjectCourseId) {
        return grades.filter(grade =>
            grade.subjectCourseId === subjectCourseId
        );
    }

    function sortedSubjectCourses() {
        return subjectCourses.sort((a, b) => (
            a.type.localeCompare(b.type) ||
            a.title.localeCompare(b.title) ||
            a.id - b.id
        ));
    }

    return (
        <TableBody>
            {sortedSubjectCourses().map((subjectCourse, index) => (
                <TableRow key={subjectCourse.id} className={classes.bodyRow}>
                    {index === 0 && (
                        <TableCell className={classes.tableCell} rowSpan={subjectCourses.length}>
                            <Link
                                to={`/studienkurse/${study.studyCourseId}\
                                /studienordnung/${study.studyRegulationId}/${subject.id}`}
                                className={classes.subjectLink}
                            >
                                {subject.title}
                                <EditIcon className={classes.subjectEditIcon} />
                            </Link>
                        </TableCell>
                    )}
                    <TableCell className={classes.tableCell}>
                        {subjectCourse.type}
                        {subjectCourse.title && ` (${subjectCourse.title})`}
                    </TableCell>
                    
                    <GradesList
                        grades={getGradesForSubjectCourse(subjectCourse.id)}
                        subjectCourse={subjectCourse}
                        subject={subject}
                        studentId={studentId}
                        studyId={study.id}
                        openGradeModal={openGradeModal}
                        studies={studies}
                    />
                </TableRow>
            ))}
        </TableBody>
    );
};

const styles = theme => ({
    bodyRow: {
        height: 4 * theme.spacing.unit,
    },
    tableCell: {
        padding: `${theme.spacing.unit}px`
    },
    subjectEditIcon: {
        opacity: 0,
        color: 'rgba(0, 0, 0, 0.54)',
        marginLeft: theme.spacing.unit,
        fontSize: '1.5em',
    },
    subjectLink: {
        color: 'inherit',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        '&:hover': {
            textDecoration: 'underline',
            '& $subjectEditIcon': {
                opacity: 1,
            }
        },
    },
});

const mapStateToProps = (state, props) => ({
    subjectCourses: getSubjectCoursesBySubjectId(state, props.subject.id),
    grades: getGradesByStudyId(state, props.study.id),
    studies: getStudiesByStudentId(state, props.studentId),
});

export default connect(mapStateToProps)(
    withStyles(styles)(SubjectListItem)
);
