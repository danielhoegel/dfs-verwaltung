import React from 'react';
import { withRouter } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';

import StudyRegulationDateChip from './StudyRegulationDateChip';


const StudyRegulationListItem = ({
    regulation,
    openDeleteStudyRegulationModal,
    allowDelete,
    history,
    classes,
}) => {
    const { id, title, description, date, studyCourseId } = regulation;

    const openStudyRegulation = () => {
        history.push(`/studienkurse/${studyCourseId}/studienordnung/${id}`);
    };

    return (
        <ListItem button onClick={openStudyRegulation}>
            <ListItemText
                secondary={description || null}
                className={classes.regulationContent}
            >
                <div className={classes.regulationTitle}>
                    <StudyRegulationDateChip
                        date={date}
                        className={classes.regulationDate}
                    />
                    {title}
                    <EditIcon className={classes.regulationEditIcon} />
                </div>
            </ListItemText>
            <ListItemSecondaryAction>
                <IconButton
                    onClick={() => openDeleteStudyRegulationModal(regulation)}
                    disabled={!allowDelete}
                    title='Studienordnung löschen'
                    className={classes.deleteButton}
                >
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default withRouter(StudyRegulationListItem);
