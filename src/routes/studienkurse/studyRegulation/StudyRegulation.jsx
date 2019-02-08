import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import LinearProgress from '@material-ui/core/LinearProgress';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeftRounded';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/EditOutlined';

import { isNotEmpty } from '../../../helper/helper';
import HiddenDivider from '../../../components/HiddenDivider';
import Modal from '../../../components/Modal';

import { getStudyFetching, getSubjectsWithSubjectCourses, getStudyRegulationWithStudyCourse } from '../redux/studySelectors';
import SubjectListItem from './components/SubjectListItem';
import SubjectCreate from './components/SubjectCreate';
import SubjectUpdate from './components/SubjectUpdate';
import SubjectDelete from './components/SubjectDelete';
import SubjectCourseCreate from './components/SubjectCourseCreate';
import SubjectCourseUpdate from './components/SubjectCourseUpdate';
import SubjectCourseDelete from './components/SubjectCourseDelete';


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
        this.setState({
            deleteSubjectModalOpen: true,
            deleteSubjectModalData: subject
        });
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
        this.setState({
            deleteSubjectCourseModalOpen: true,
            deleteSubjectCourseModalData: subject
        });
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
    }
});

StudyRegulation.propTypes = {
    studyRegulation: PropTypes.object,
    subjects: PropTypes.array,
    fetching: PropTypes.bool,
}

const mapStateToProps = (state, props) => {
    const studyCourseId = Number(props.match.params.studyCourseId);
    const studyRegulationId = Number(props.match.params.studyRegulationId);
    return {
        studyRegulation: getStudyRegulationWithStudyCourse(state, studyCourseId, studyRegulationId),
        subjects: getSubjectsWithSubjectCourses(state, studyRegulationId),
        fetching: getStudyFetching(state),
    }
};

export default connect(mapStateToProps)(
    withStyles(styles)(StudyRegulation)
);
