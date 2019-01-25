import React from 'react';

import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/EditOutlined';
import AddIcon from '@material-ui/icons/AddOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';

import Expandable from '../../../components/Expandable';
import StudyRegulationListItem from './StudyRegulationListItem';


const StudyCourseListItem = ({
    studyCourse,
    allowDelete,
    openUpdateModal,
    openDeleteModal,
    openCreateStudyRegulationModal,
    openDeleteStudyRegulationModal,
    classes,
}) => {
    const openCreateStudyRegulationModalHandler = () => {
        openCreateStudyRegulationModal(studyCourse);
    };

    return (
        <Expandable
            defaultExpanded
            header={
                <>
                    <Typography variant='subheading' className={classes.expandableHeader}>
                        {studyCourse.title}
                    </Typography>
                </>
            }
        >
            {studyCourse.description && (
                <Typography className={classes.preWrap}>{studyCourse.description}</Typography>
            )}
            <List>
                {studyCourse.studyRegulations &&
                    studyCourse.studyRegulations.map(regulation => (
                        <StudyRegulationListItem
                            regulation={regulation}
                            classes={classes}
                            key={regulation.id}
                            allowDelete={allowDelete}
                            openDeleteStudyRegulationModal={openDeleteStudyRegulationModal}
                        />
                    ))
                }
            </List>
            <Button
                variant='flat'
                size='small'
                title='Studienordnung hinzufügen'
                onClick={openCreateStudyRegulationModalHandler}
                className={classes.actionButton}
            >
                <AddIcon className={classes.leftIcon} />
                Hinzufügen
            </Button>
            <Button
                variant='flat'
                size='small'
                title='Studienkurs bearbeiten'
                onClick={() => openUpdateModal(studyCourse)}
                className={classes.actionButton}
            >
                <EditIcon className={classes.leftIcon} />
                Bearbeiten
            </Button>
            <Button
                variant='flat'
                size='small'
                title='Studienkurs entfernen'
                onClick={() => openDeleteModal(studyCourse)}
                className={classes.actionButton}
                disabled={!allowDelete}
            >
                <DeleteIcon className={classes.leftIcon} />
                Entfernen
            </Button>
        </Expandable>
    );
};

export default StudyCourseListItem;