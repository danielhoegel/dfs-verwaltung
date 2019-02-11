import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cn from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import LinearProgress from '@material-ui/core/LinearProgress';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeftRounded';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/Delete';

import { isNotEmpty } from '../../helper/helper';
import HiddenDivider from '../../components/HiddenDivider';
import Modal from '../../components/Modal';

import { getStudyFetching, getSubjectsWithSubjectCourses, getStudyRegulationWithStudyCourse, getStudyCoursesWithRegulations } from './redux/studySelectors';
import SubjectListItem from './components/subject/SubjectListItem';
import StudyRegulationUpdate from './components/studyRegulation/StudyRegulationUpdate';
import StudyRegulationDelete from './components/studyRegulation/StudyRegulationDelete';
import SubjectCreate from './components/subject/SubjectCreate';
import SubjectUpdate from './components/subject/SubjectUpdate';
import SubjectDelete from './components/subject/SubjectDelete';
import SubjectCourseCreate from './components/subjectCourse/SubjectCourseCreate';
import SubjectCourseUpdate from './components/subjectCourse/SubjectCourseUpdate';
import SubjectCourseDelete from './components/subjectCourse/SubjectCourseDelete';


class StudyRegulation extends Component {
    static getDerivedStateFromProps(nextProps, prevState) {
        const { subjectId } = nextProps.match.params;
        if (subjectId && subjectId !== prevState.__subjectId ) {
            const __subjectId = Number(subjectId);
            if (__subjectId !== prevState.__subjectId ) {
                return {
                    ...prevState,
                    expandedSubject: isNotEmpty(__subjectId) ? __subjectId : null,
                    __subjectId
                };
            }
        }
        return null;
    }
    
    state = {
        expandedSubject: null,
        allowDelete: false,
        
        // StudyRegulation modals
        updateStudyRegulationModalOpen: false,
        updateStudyRegulationModalData: null,
        deleteStudyRegulationModalOpen: false,
        deleteStudyRegulationModalData: null,

        // Subject modals
        createSubjectModalOpen: false,
        updateSubjectModalOpen: false,
        updateSubjectModalData: null,
        deleteSubjectModalOpen: false,
        deleteSubjectModalData: null,
        
        // SubjectCourse Modals
        createSubjectCourseModalOpen: false,
        createSubjectCourseModalData: null,
        updateSubjectCourseModalOpen: false,
        updateSubjectCourseModalData: null,
        deleteSubjectCourseModalOpen: false,
        deleteSubjectCourseModalData: null,
    }

    subjectRefs = {}
    
    componentDidMount() {
        if (isNotEmpty(this.props.match.params.subjectId)) {
            this.scrollToExpandedSubject();
        }
    }

    componentDidUpdate(prevProps) {
        if (
            this.props.subjects !== prevProps.subjects ||
            this.props.match.params.subjectId !== prevProps.match.params.subjectId
        ) {
            this.scrollToExpandedSubject();
        }
    }

    scrollToExpandedSubject() {
        const { expandedSubject } = this.state;
        console.log('scroll', { expandedSubject, refs: this.subjectRefs});
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


    /* StudyRegulation Modals */

    openUpdateStudyRegulationModal = () => {
        this.setState({
            updateStudyRegulationModalOpen: true,
            updateStudyRegulationModalData: {
                studyRegulation: this.props.studyRegulation,
                studyCourses: this.props.studyCourses
            }
        });
    }

    closeUpdateStudyRegulationModal = () => {
        this.setState({
            updateStudyRegulationModalOpen: false,
            updateStudyRegulationModalData: null
        });
    }

    openDeleteStudyRegulationModal = () => {
        if (this.state.allowDelete) {
            this.setState({
                deleteStudyRegulationModalOpen: true,
                deleteStudyRegulationModalData: this.props.studyRegulation
            });
        }
    }

    closeDeleteStudyRegulationModal = () => {
        this.setState({
            deleteStudyRegulationModalOpen: false,
            deleteStudyRegulationModalData: null
        });
    }


    /* Subject Modals */

    openCreateSubjectModal = () => {
        this.setState({ createSubjectModalOpen: true });
    }

    closeCreateSubjectModal = () => {
        this.setState({ createSubjectModalOpen: false });
    }

    openUpdateSubjectModal = (subject) => {
        this.setState({
            updateSubjectModalOpen: true,
            updateSubjectModalData: subject
        });
    }

    closeUpdateSubjectModal = () => {
        this.setState({
            updateSubjectModalOpen: false,
            updateSubjectModalData: null
        });
    }

    openDeleteSubjectModal = (subject) => {
        if (this.state.allowDelete) {
            this.setState({
                deleteSubjectModalOpen: true,
                deleteSubjectModalData: subject
            });
        }
    }

    closeDeleteSubjectModal = () => {
        this.setState({
            deleteSubjectModalOpen: false,
            deleteSubjectModalData: null
        });
    }


    /* SubjectCourse Modals */

    openCreateSubjectCourseModal = (subject) => {
        this.setState({
            createSubjectCourseModalOpen: true,
            createSubjectCourseModalData: subject
        });
    }

    closeCreateSubjectCourseModal = () => {
        this.setState({
            createSubjectCourseModalOpen: false,
            createSubjectCourseModalData: null
        });
    }

    openUpdateSubjectCourseModal = (subject) => {
        this.setState({
            updateSubjectCourseModalOpen: true,
            updateSubjectCourseModalData: subject
        });
    }

    closeUpdateSubjectCourseModal = () => {
        this.setState({
            updateSubjectCourseModalOpen: false,
            updateSubjectCourseModalData: null
        });
    }

    openDeleteSubjectCourseModal = (subject) => {
        if (this.state.allowDelete) {
            this.setState({
                deleteSubjectCourseModalOpen: true,
                deleteSubjectCourseModalData: subject
            });
        }
    }

    closeDeleteSubjectCourseModal = () => {
        this.setState({
            deleteSubjectCourseModalOpen: false,
            deleteSubjectCourseModalData: null
        });
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
                        onClick={this.openUpdateStudyRegulationModal}
                    >
                        <EditIcon className={classes.leftIcon} />
                        Bearbeiten
                    </Button>
                    <Button
                        variant='flat'
                        title='Fach hinzufügen'
                        className={classes.button}
                        onClick={this.openCreateSubjectModal}
                    >
                        <AddIcon className={classes.leftIcon} />
                        Hinzufügen
                    </Button>
                    <Button
                        variant='flat'
                        title='Fach entfernen'
                        className={cn(classes.button, classes.deleteButton)}
                        onClick={this.openCreateSubjectModal}
                        disabled={!this.state.allowDelete}
                    >
                        <DeleteIcon className={classes.leftIcon} />
                        Entfernen
                    </Button>
                    <div style={{ marginLeft: 'auto' }}>
                        Löschen zulassen
                        <Switch
                            checked={this.state.allowDelete}
                            onChange={this.toggleAllowDelete}
                            color='primary'
                            classes={{
                                switchBase: classes.colorSwitchBase,
                                checked: classes.colorSwitchChecked,
                                bar: classes.colorSwitchBar,
                            }}
                        />
                    </div>
                </div>
                <HiddenDivider />

                {/* Subject List */}
                {!fetching 
                    ? isNotEmpty(subjects)
                        ? Object.entries(this.groupSubjectsBySemester()).map(([ semester, subjects ]) => (
                            <Fragment key={semester} >
                            <Typography variant='body2'>{semester}. Semester</Typography>
                            {subjects.map(subject => (
                                <SubjectListItem
                                    key={subject.id}
                                    subject={subject}
                                    classes={classes}
                                    handleChange={this.handleExpansionChange}
                                    expanded={this.state.expandedSubject === subject.id}
                                    allowDelete={this.state.allowDelete}
                                    rootRef={ref => this.refHandler(ref, subject.id)}
                                    openUpdateSubjectModal={this.openUpdateSubjectModal}
                                    openDeleteSubjectModal={this.openDeleteSubjectModal}
                                    openCreateSubjectCourseModal={this.openCreateSubjectCourseModal}
                                    openUpdateSubjectCourseModal={this.openUpdateSubjectCourseModal}
                                    openDeleteSubjectCourseModal={this.openDeleteSubjectCourseModal}
                                />
                            ))}
                            <HiddenDivider />
                            </Fragment>
                          ))
                        : 'Keine Fächer gefunden'
                    : <LinearProgress />
                }

                {/* StudyRegulation Modals */}
                <Modal
                    component={StudyRegulationUpdate}
                    title='Studienordnung bearbeiten'
                    close={this.closeUpdateStudyRegulationModal}
                    open={this.state.updateStudyRegulationModalOpen}
                    data={this.state.updateStudyRegulationModalData}
                    preventClosing
                />
                <Modal
                    component={StudyRegulationDelete}
                    title='Studienordnung entfernen'
                    close={this.closeDeleteStudyRegulationModal}
                    open={this.state.deleteStudyRegulationModalOpen}
                    data={this.state.deleteStudyRegulationModalData}
                    danger
                />

                {/* Subject Modals */}
                <Modal
                    component={SubjectCreate}
                    title='Fach hinzufügen'
                    close={this.closeCreateSubjectModal}
                    open={this.state.createSubjectModalOpen}
                    data={{
                        studyRegulationId: studyRegulation.id, 
                        studyCourseId: studyRegulation.studyCourse.id
                    }}
                    preventClosing
                />
                <Modal
                    component={SubjectUpdate}
                    title='Fach bearbeiten'
                    close={this.closeUpdateSubjectModal}
                    open={this.state.updateSubjectModalOpen}
                    data={this.state.updateSubjectModalData}
                    preventClosing
                />
                <Modal
                    component={SubjectDelete}
                    title='Fach löschen'
                    close={this.closeDeleteSubjectModal}
                    open={this.state.deleteSubjectModalOpen}
                    data={this.state.deleteSubjectModalData}
                    danger
                />

                {/* SubjectCourse Modals */}
                <Modal
                    component={SubjectCourseCreate}
                    title='Veranstaltung hinzufügen'
                    close={this.closeCreateSubjectCourseModal}
                    open={this.state.createSubjectCourseModalOpen}
                    data={this.state.createSubjectCourseModalData}
                    preventClosing
                />
                <Modal
                    component={SubjectCourseUpdate}
                    title='Veranstaltung bearbeiten'
                    close={this.closeUpdateSubjectCourseModal}
                    open={this.state.updateSubjectCourseModalOpen}
                    data={this.state.updateSubjectCourseModalData}
                    preventClosing
                />
                <Modal
                    component={SubjectCourseDelete}
                    title='Veranstaltung löschen'
                    close={this.closeDeleteSubjectCourseModal}
                    open={this.state.deleteSubjectCourseModalOpen}
                    data={this.state.deleteSubjectCourseModalData}
                    danger
                />
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
    },
    deleteButton: {
        '&:hover': {
            color: theme.palette.darkred,
        }
    },
    colorSwitchBase: {
        '&$colorSwitchChecked': {
            color: theme.palette.darkred,
            '& + $colorSwitchBar': {
              backgroundColor: theme.palette.darkred,
            },
        },
    },
    colorSwitchChecked: {},
    colorSwitchBar: {},
});

StudyRegulation.propTypes = {
    studyRegulation: PropTypes.object,
    subjects: PropTypes.array,
    studyCourses: PropTypes.array.isRequired,
    fetching: PropTypes.bool,
}

const mapStateToProps = (state, props) => {
    const studyCourseId = Number(props.match.params.studyCourseId);
    const studyRegulationId = Number(props.match.params.studyRegulationId);
    return {
        studyRegulation: getStudyRegulationWithStudyCourse(state, studyCourseId, studyRegulationId),
        subjects: getSubjectsWithSubjectCourses(state, studyRegulationId),
        studyCourses: getStudyCoursesWithRegulations(state),
        fetching: getStudyFetching(state),
    }
};

export default connect(mapStateToProps)(
    withStyles(styles)(StudyRegulation)
);