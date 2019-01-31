import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';


const SubjectCourse = ({
    subjectCourse: { id, title, type, credits, zpk, participationType },
    subject,
    allowDelete,
    classes,
}) => {

    const updateSubjectCourse = () => {
        window.alert(`Veranstaltung ${subject.title} - ${type}${title && ` (${title})`} bearbeiten`)
    };

    const deleteSubjectCourse = () => {
        if (allowDelete) {
            window.confirm(`Sind Sie sicher, dass Sie die Veranstaltung ${subject.title} - ${type}${title && ` (${title})`} und alle dazugehörigen Noten löschen möchten?`);
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
    )
}

export default SubjectCourse;