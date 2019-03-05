import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/EditOutlined';

import GradesList from "./GradesList";
import {
    getSubjectCoursesBySubjectId,
    getGradesByStudyId,
    getStudiesByStudentId
} from '../../../../redux/entitiesSelector';


const SubjectListItem = ({
    subject,
    studentId,
    openNoteModal,
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
        <TableBody className={classes.subject}>
            {sortedSubjectCourses().map((subjectCourse, index) => (
                <TableRow key={subjectCourse.id} className={classes.bodyRow}>
                    {index === 0 && (
                        <TableCell rowSpan={subjectCourses.length}>
                            <Link
                                to={`/studienkurse/${study.studyCourseId}/studienordnung/${study.studyRegulationId}/${subject.id}`}
                                className={classes.subjectLink}
                            >
                                {subject.title}
                                <EditIcon className={classes.subjectEditIcon} />
                            </Link>
                        </TableCell>
                    )}
                    <TableCell>
                        {subjectCourse.type}
                        {subjectCourse.title && ` (${subjectCourse.title})`}
                    </TableCell>
                    <TableCell style={{textAlign: 'right'}}>
                        <GradesList
                            grades={getGradesForSubjectCourse(subjectCourse.id)}
                            subjectCourse={subjectCourse}
                            subject={subject}
                            studentId={studentId}
                            studyId={study.id}
                            openGradeModal={openNoteModal}
                            studies={studies}
                        />
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
};

const styles = theme => ({
    bodyRow: {
        height: 4 * theme.spacing.unit,
    },
    subject: {
        '&:hover $subjectEditIcon': {
            opacity: 1,
        }
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
