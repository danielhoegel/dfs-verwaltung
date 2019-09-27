import React from 'react';
import PropTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';


const SubjectCourseListItem = ({
    subjectCourse,
    subject,
    allowDelete,
    openUpdateSubjectCourseModal,
    openDeleteSubjectCourseModal,
    classes,
}) => {
    const { title, type, credits, zpk, participationType } = subjectCourse;

    const updateSubjectCourse = () => {
        openUpdateSubjectCourseModal(subjectCourse);
        // window.alert(`Veranstaltung ${subject.title} - ${type}${title && ` (${title})`} bearbeiten`)
    };

    const deleteSubjectCourse = () => {
        if (allowDelete) {
            openDeleteSubjectCourseModal(subjectCourse);
        }
    };

    return (
        <ListItem button title='Veranstaltung bearbeiten' onClick={updateSubjectCourse}>
            <ListItemText
                secondary={`${participationType}, ${credits} Credits${zpk ? ', ZPK' : ''}`}
                className={classes.subjectCourseContent}
            >
                <div className={classes.subjectCourseTitle}>
                    {type}{title && ` (${title})`}
                    <EditIcon className={classes.subjectCourseEditIcon} />
                </div>
            </ListItemText>
            <ListItemSecondaryAction>
                <IconButton
                    disabled={!allowDelete}
                    onClick={deleteSubjectCourse}
                    title='Veranstaltung löschen'
                >
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

SubjectCourseListItem.propTypes = {
    subjectCourse: PropTypes.object.isRequired,
    subject: PropTypes.object.isRequired,
    allowDelete: PropTypes.bool,
    openUpdateSubjectCourseModal: PropTypes.func.isRequired,
    openDeleteSubjectCourseModal: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
};

export default SubjectCourseListItem;
