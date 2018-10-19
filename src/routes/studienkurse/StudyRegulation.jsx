import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import RootRef from '@material-ui/core/RootRef';
import LinearProgress from '@material-ui/core/LinearProgress';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeftRounded';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';

import { isEmpty, isNotEmpty } from '../../helper/helper';
import HiddenDivider from '../../components/HiddenDivider';
import Expandable from '../../components/Expandable';

import { fetchStudyRegulationForId, fetchSubjectsWithSubjectCoursesForStudyRegulation } from './redux/studyActions';
import { getStudyRegulationForId, getSubjectsForRegulation, getStudyFetching } from './redux/studySelectors';


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


class Subject extends Component {
    shouldComponentUpdate(nextProps) {
        return (
            (nextProps.expanded !== this.props.expanded) ||
            (nextProps.expanded && (
                nextProps.allowDelete !== this.props.allowDelete
            ))
        );
    }

    toggleExpanded = () => {
        this.props.handleChange(this.props.subject.id);
    }

    render() {
        const { subject, classes } = this.props;
        return (
            <RootRef rootRef={this.props.rootRef}>
                <Expandable
                    header={
                        <Typography variant='subheading' className={classes.expandableHeader} >
                            {subject.title}
                        </Typography>
                    }
                    expanded={this.props.expanded}
                    toggleExpanded={this.toggleExpanded}
                >
                    {subject.type.toUpperCase()}, {subject.semester}. Semester, UE {subject.ue}
                    <List>
                        {isNotEmpty(subject.subjectCourses) && subject.subjectCourses.map(subjectCourse => (
                            <SubjectCourse
                                key={subjectCourse.id}
                                subjectCourse={subjectCourse}
                                classes={classes}
                                allowDelete={this.props.allowDelete}
                                subject={subject}
                            />
                        ))}
                    </List>
                    <div className={classes.subjectActions}>
                        <Button
                            variant='flat'
                            size='small'
                            title='Fach bearbeiten'
                            className={classes.actionButton}
                        >
                            <EditIcon className={classes.leftIcon} />
                            Bearbeiten
                        </Button>
                        <Button
                            variant='flat'
                            size='small'
                            title='Veranstaltung hinzufügen'
                            className={classes.actionButton}
                        >
                            <AddIcon className={classes.leftIcon} />
                            Veranstaltung
                        </Button>
                        <Button
                            variant='flat'
                            size='small'
                            title='Fach löschen'
                            className={classes.actionButton}
                            disabled={!this.props.allowDelete}
                        >
                            <DeleteIcon className={classes.leftIcon} />
                            Löschen
                        </Button>
                    </div>
                </Expandable>
            </RootRef>
        )
    }
}


class StudyRegulation extends Component {
    static getDerivedStateFromProps(nextProps, prevState) {
        const { subjectId } = nextProps.match.params;
        if (subjectId && subjectId !== prevState.__subjectId ) {
            const __subjectId = Number(subjectId);
            if (__subjectId !== prevState.__subjectId ) {
                return {
                    expandedSubject: isNotEmpty(__subjectId) ? __subjectId : null,
                    __subjectId
                };
            }
        }
        return null;
    }
    
    state = {
        expandedSubject: null,
        allowDelete: false
    }

    subjectRefs = {}
    
    componentDidMount() {
        const regulationId = Number(this.props.match.params.studyRegulationId);
        
        this.props.fetchStudyRegulationForId(regulationId);
        
        if (isEmpty(this.props.subjects)) {
            this.props.fetchSubjects(regulationId);
        } else if (isNotEmpty(this.props.match.params.subjectId)) {
            this.scrollToExpandedSubject();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            this.props.subjects !== prevProps.subjects ||
            this.props.match.params.subjectId !== prevProps.match.params.subjectId
        ) {
            this.scrollToExpandedSubject();
        }
    }

    scrollToExpandedSubject() {
        const { expandedSubject } = this.state;
        if (isNotEmpty(expandedSubject) && this.subjectRefs[expandedSubject]) {
            this.subjectRefs[expandedSubject].scrollIntoView();
        }
    }

    handleExpansionChange = (panelId) => {
        this.setState(state => ({
            expandedSubject: state.expandedSubject === panelId ? false : panelId,
        }));
    };

    toggleAllowDelete = () => {
        this.setState(state => ({
            allowDelete: !state.allowDelete
        }));
    }

    groupSubjectsBySemester() {
        const semesterGroup = {};
        this.props.subjects.forEach(subject => {
            if (semesterGroup[subject.semester]) {
                semesterGroup[subject.semester].push(subject);
            } else {
                semesterGroup[subject.semester] = [subject];
            }
        });
        return semesterGroup;
    }

    refHandler(ref, subjectId) {
        this.subjectRefs[subjectId] = ref;
    }

    goBack = () => {
        this.props.history.goBack();
    }
    
    render() {
        const { studyRegulation, subjects, classes, fetching } = this.props;
        return (
            <div>
                <Typography variant='display1'>
                    {studyRegulation && studyRegulation.studyCourse
                        ? `${studyRegulation.title} (${studyRegulation.studyCourse.title})`
                        : 'Studienordnung'
                    }
                </Typography>
                <HiddenDivider />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button onClick={this.goBack} className={classes.button}>
                        <ChevronLeftIcon className={classes.leftIcon} />
                        Zurück
                    </Button>
                    <Button
                        variant='flat'
                        title='Studienkurs bearbeiten'
                        className={classes.button}
                    >
                        <EditIcon className={classes.leftIcon} />
                        Bearbeiten
                    </Button>
                    <Button
                        variant='flat'
                        title='Fach hinzufügen'
                        className={classes.button}
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
                        />
                    </div>
                </div>
                <HiddenDivider />
                {!fetching 
                    ? isNotEmpty(subjects)
                        ? Object.entries(this.groupSubjectsBySemester()).map(([ semester, subjects ]) => (
                            <Fragment key={semester} >
                            <Typography variant='body2'>{semester}. Semester</Typography>
                            {subjects.map(subject => (
                                <Subject
                                    key={subject.id}
                                    subject={subject}
                                    classes={classes}
                                    handleChange={this.handleExpansionChange}
                                    expanded={this.state.expandedSubject === subject.id}
                                    allowDelete={this.state.allowDelete}
                                    rootRef={ref => this.refHandler(ref, subject.id)}
                                />
                            ))}
                            <HiddenDivider />
                            </Fragment>
                          ))
                        : 'Keine Fächer gefunden'
                    : <LinearProgress />
                }
            </div>
        );
    }
}

const styles = theme => ({
    button: {
        '&:not(:last-child)': {
            marginRight: theme.spacing.unit
        },
    },
    subjectActions: {
        display: 'flex',
    },
    actionButton: {
        paddingRight: 1.5 * theme.spacing.unit,
        '&:not(:last-child)': {
            marginRight: theme.spacing.unit
        },
    },
    leftIcon: {
        marginRight: theme.spacing.unit
    },
    expandableHeader: {
        fontWeight: 'inherit',
    },
    subjectDetails: {
        display: 'block'
    },
    subjectCourseTitle: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 0.5 * theme.spacing.unit,
    },
    subjectCourseEditIcon: {
        opacity: 0,
        color: 'rgba(0, 0, 0, 0.54)',
        marginLeft: 2 * theme.spacing.unit,
    },
    subjectCourseContent: {
        '&:hover $subjectCourseEditIcon': {
            opacity: 1,
        }
    }
});

StudyRegulation.propTypes = {
    studyRegulation: PropTypes.object,
    fetchStudyRegulationForId: PropTypes.func.isRequired,
    subjects: PropTypes.array.isRequired,
    fetchSubjects: PropTypes.func.isRequired,
    fetching: PropTypes.bool,
}

const mapStateToProps = (state, props) => ({
    studyRegulation: getStudyRegulationForId(state, Number(props.match.params.studyRegulationId)),
    subjects: getSubjectsForRegulation(state),
    fetching: getStudyFetching(state),
});

const mapDispatchToProps = {
    fetchStudyRegulationForId,
    fetchSubjects: fetchSubjectsWithSubjectCoursesForStudyRegulation
}

export default connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles)(StudyRegulation)
);
