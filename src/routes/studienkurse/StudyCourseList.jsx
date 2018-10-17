import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import LinearProgress from '@material-ui/core/LinearProgress';

import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/EditOutlined';
import EventAvailableIcon from '@material-ui/icons/EventAvailableOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';

import { formatDate } from '../../helper/helper';
import HiddenDivider from '../../components/HiddenDivider';
import Expandable from '../../components/Expandable';

import { fetchStudyCoursesWithRegulations } from './redux/studyActions';
import { getStudyCourses, getStudyFetching } from './redux/studySelectors';


const StudyRegulation = withRouter(({
    regulation: { id, title, description, date },
    allowDelete,
    history,
    classes,
}) => {

    const openStudyRegulation = () => {
        history.push(`/studienkurse/studienordnung/${id}`)
    };

    const deleteStudyRegulation = () => {
        if (allowDelete) {
            window.confirm(`Sind Sie sicher, dass Sie die Studienordung ${title} und alle dazugehörigen Fächer löschen möchten?`);
        }
    };

    return (
        <ListItem button>
            <ListItemText
                secondary={description ? description : null}
                className={classes.regulationContent}
                onClick={openStudyRegulation}
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
                <IconButton onClick={deleteStudyRegulation} disabled={!allowDelete}>
                    <DeleteIcon title='Studienkurs löschen' />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
});


const StudyCourse = ({
    studyCourse: { id, title, description, studyRegulations },
    allowDelete,
    classes,
}) => {
    const createStudyRegulation = () => {
        window.alert('Studienordnung erstellen');
    };

    return (
        <Expandable
            defaultExpanded
            header={<Typography variant='subheading'>{title}</Typography>}
        >
            {description && (
                <Typography>{description}</Typography>
            )}
            <List>
                {studyRegulations.map(regulation => (
                    <StudyRegulation
                        regulation={regulation}
                        classes={classes}
                        key={regulation.id}
                        allowDelete={allowDelete}
                    />
                ))}
            </List>
            <Button
                variant='flat'
                size='small'
                title='Studienordnung hinzufügen'
                onClick={createStudyRegulation}
                className={classes.actionButton}
            >
                <AddIcon className={classes.leftIcon} />
                Hinzufügen
            </Button>
        </Expandable>
    );
};

class StudyCourseList extends Component {
    state = {
        allowDelete: false,
    }

    componentDidMount() {
        this.props.fetchStudyCoursesWithRegulations()
    }

    createStudyCourse = () => {
        window.alert('Studienkurs erstellen');
    }

    updateStudyCourse = () => {

    }

    deleteStudyCourse = () => {

    }

    toggleAllowDelete = () => {
        this.setState(state => ({
            allowDelete: !state.allowDelete
        }));
    }

    submitHandler = (e, data) => {
        console.log(data);
    }
    
    render() {
        const { studyCourses, classes } = this.props;
        const fetching = this.props.fetching;
        return (
            <div>
                {/* <Form onSubmit={this.submitHandler} data={{firstName: 'Daniel', lastName: 'Högel'}}>
                    <input name='firstName' />
                    <input name='lastName' />
                    <Form.Field>Hello World</Form.Field>
                    <button type='submit'>Submit</button>
                </Form> */}
                <Typography variant='display1'>Studienkursverwaltung</Typography>
                <HiddenDivider />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                        variant='flat'
                        title='Studienkurs hinzufügen'
                        onClick={this.createStudyCourse}
                    >
                        <AddIcon className={classes.leftIcon} />
                        Hinzufügen
                    </Button>
                    <div style={{ marginLeft: 'auto' }}>
                        Löschen von Datensätzen zulassen
                        <Switch
                            checked={this.state.allowDelete}
                            onChange={this.toggleAllowDelete}
                            color='primary'
                            disabled={fetching}
                        />

                    </div>
                </div>
                <HiddenDivider />
                {!fetching
                    ? studyCourses.length
                        ? (
                            studyCourses.map(studyCourse => (
                                <StudyCourse
                                    studyCourse={studyCourse}
                                    classes={classes}
                                    key={studyCourse.id}
                                    allowDelete={this.state.allowDelete}
                                />
                            ))
                          )
                        : 'Keine Studienkurse gefunden.'
                    : <LinearProgress variant='query' />
                }
            </div>
        );
    }
}

const styles = (theme) => ({
    actionButton: {
        paddingRight: 1.5 * theme.spacing.unit,
        '&:not(:last-child)': {
            marginRight: theme.spacing.unit
        },
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    studyCourseDetails: {
        display: 'block'
    },
    regulationTitle: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 0.5 * theme.spacing.unit,
    },
    regulationDate: {
        marginRight: 2 * theme.spacing.unit,
    },
    regulationEditIcon: {
        opacity: 0,
        color: 'rgba(0, 0, 0, 0.54)',
        marginLeft: 2 * theme.spacing.unit,
    },
    regulationContent: {
        '&:hover $regulationEditIcon': {
            opacity: 1,
        }
    }
});


StudyCourseList.propTypes = {
    studyCourses: PropTypes.array.isRequired,
    fetchStudyCoursesWithRegulations: PropTypes.func.isRequired,
    fetching: PropTypes.bool,
}

const mapStateToProps = (state) => ({
    studyCourses: getStudyCourses(state),
    fetching: getStudyFetching(state),
});

const mapDispatchToProps = {
    fetchStudyCoursesWithRegulations,
};

export default connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles)(StudyCourseList)
);
