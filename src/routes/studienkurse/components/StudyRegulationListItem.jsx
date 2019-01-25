import React from 'react';
import { withRouter } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import EventAvailableIcon from '@material-ui/icons/EventAvailableOutlined';
import EditIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';

import { formatDate } from '../../../helper/helper';


const StudyRegulationListItem = ({
    regulation,
    openDeleteStudyRegulationModal,
    allowDelete,
    history,
    classes,
}) => {

    const openStudyRegulation = () => {
        history.push(`/studienkurse/${studyCourseId}/studienordnung/${id}`)
    };

    const { id, title, description, date, studyCourseId } = regulation;
    return (
        <ListItem button onClick={openStudyRegulation}>
            <ListItemText
                secondary={description ? description : null}
                className={classes.regulationContent}
            >
                <div className={classes.regulationTitle}>
                    <Chip
                        label={formatDate(date)}
                        icon={<EventAvailableIcon />}
                        variant='outlined'
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
                >
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default withRouter(StudyRegulationListItem);
