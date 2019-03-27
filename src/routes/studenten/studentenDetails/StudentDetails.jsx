import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeftRounded';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import {
    getFullStudent,
    getStudyCourseById,
    getStudyCourses,
    getStudyRegulations,
    getStudents
} from '../../../redux/entitiesSelector';

import { translateStudyStatus, getId, isEmpty } from '../../../helper/helper';
import SubjectList from './components/SubjectList';
import StudentInformation from './components/StudentInformation';
import GradeCreate from './components/GradeCreate';
import Modal from '../../../components/Modal';
import Divider from '../../../components/Divider';
import Placeholder from '../../../components/placeholder/Placeholder';
import StudentDelete from './components/StudentDelete';
// import StudyCreate from './components/StudyCreate';
import entitiesActions from '../../../redux/entitiesActions';


const StudentDetailsLoading = () => (
    <Placeholder>
        <Placeholder.Item width='20%' height='2.5rem' />
        <Placeholder.Item width='35%' />
        <Placeholder.Item width='100px' height='2rem' inline />
        <Placeholder.Item width='125px' height='2rem' inline />
        <Placeholder.Item width='150px' height='2rem' inline />
        <Divider hidden height='1rem' />
        <Placeholder.Item height='2rem' />
        <Placeholder.Item height='3rem' width='80%' />
        <Placeholder.Item height='4rem' width='90%' />
        <Placeholder.Item width='60%' />
        <Placeholder.Item height='2rem' width='80%' />
        <Placeholder.Item height='3rem' width='85%' />
        <Placeholder.Item height='4rem' width='75%' />
    </Placeholder>
);

class StudentDetails extends Component {
    static getDerivedStateFromProps(nextProps, prevState) {
        const studentId = getId(nextProps.match.params.id);
        if (studentId !== prevState.studentId) {
            return { ...prevState, studentId };
        }
        return null;
    }

    state = {
        fetching: true,
        tab: 'contact',
        studentDeleteModalOpen: false,
        studyCreateModalOpen: false,
        gradeCreateModalOpen: false,
        noteUpdateModalOpen: false,
        noteUpdateModalData: null,
        gradeCreateModalData: null,
    }

    studentId = getId(this.props.match.params.id);

    componentDidMount() {
        this.fetchStudent();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.fetchStudent();
        }
    }

    fetchStudent() {
        this.setState({ fetching: true });
        Promise.all([
            this.props.fetchStudent(this.studentId),
            this.props.fetchStudiesByStudentId(this.studentId),
            this.props.fetchStudentInformationByStudentId(this.studentId)
        ])
        .then(([student, studies, studentInformation]) => {
            this.setState({
                fetching: false,
                tab: studies.length ? studies[0].id : 'contact'
            });
        });
    }

    goBack = () => {
        this.props.history.goBack();
    }

    updateStudent = () => {
        this.props.history.push(`/studenten/${this.studentId}/update`);
    }

    openDeleteStudentModal = () => { this.setState({ studentDeleteModalOpen: true }); }

    closeStudentDeleteModal = () => { this.setState({ studentDeleteModalOpen: false }); }

    // openStudyCreateModal = () => this.setState({ studyCreateModalOpen: true });
    // closeStudyCreateModal = () => this.setState({ studyCreateModalOpen: false });

    openGradeModal = (data) => {
        this.setState({
            gradeCreateModalOpen: true,
            gradeCreateModalData: data
        });
    }

    closeGradeCreateModal = () => {
        this.setState({
            gradeCreateModalOpen: false,
            gradeCreateModalData: null
        });
    }

    createNote = () => {
        const data = {};
        if (this.state.tab !== 'contact') {
            data.studyId = this.state.tab;
        } else {
            data.studentId = this.studentId;
        }
        this.openGradeModal(data);
    }

    tabChange = (e, tab) => {
        this.setState({ tab });
    };

    render() {
        const { fetching, tab } = this.state;
        const { student, classes } = this.props;
        return (fetching || isEmpty(student)) ? <StudentDetailsLoading /> : (
            <Fragment>
                <div>
                    <Typography variant="h4" gutterBottom>
                        {student.prefix} {student.firstName} {student.lastName}
                    </Typography>
                    <Typography variant='body2' gutterBottom>
                        Matrikelnummer: {student.matrikelnummer}
                    </Typography>
                </div>
                <Divider hidden height='1rem' />
                <div style={{ display: 'flex' }}>
                    <Button variant='text' onClick={this.goBack} className={classes.button} >
                        <ChevronLeftIcon className={classes.leftIcon} />
                        Zurück
                    </Button>
                    <Button variant='text' onClick={this.updateStudent} className={classes.button} >
                        <EditIcon className={classes.leftIcon} />
                        Bearbeiten
                    </Button>
                    {/* <Button variant='text' onClick={this.openStudyCreateModal} className={classes.button} >
                        <AddIcon className={classes.leftIcon} />
                        Studium
                    </Button> */}
                    <Button variant='text' onClick={this.createNote} className={classes.button} >
                        <AddIcon className={classes.leftIcon} />
                        Note
                    </Button>
                    <Button
                        variant='text'
                        title='Student entfernen'
                        className={cn(classes.button, classes.deleteButton)}
                        onClick={this.openDeleteStudentModal}
                    >
                        <DeleteIcon className={classes.leftIcon} />
                        Entfernen
                    </Button>
                </div>

                <Divider hidden height='1rem' />

                <Paper component="div" className={classes.tabsContainer}>
                    <Fragment>
                        <Tabs
                            value={tab}
                            onChange={this.tabChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant={(window.innerWidth < this.props.theme.breakpoints.values.lg)
                                ? 'scrollable'
                                : 'standard'
                            }
                            scrollButtons='auto'
                            className={classes.tabsHeader}
                        >
                            <Tab value='contact' label='Kontaktdaten' />
                            {student.studies.map(study => (
                                <Tab
                                    key={study.id}
                                    value={study.id}
                                    label={
                                        `${this.props.getStudyCourseById(study.studyCourseId).title} ${study.year} \
                                        (${translateStudyStatus(study.status)})`
                                    }
                                />
                            ))}
                        </Tabs>
                        <div className={classes.tabContainer}>
                            <div className={classes.tabContainerInside}>
                                {tab === 'contact' && <StudentInformation student={this.props.student} />}
                                {student.studies.map(study =>
                                    tab === study.id && (
                                        <SubjectList
                                            key={study.id}
                                            studentId={student.id}
                                            studyRegulationId={study.studyRegulationId}
                                            openGradeModal={this.openGradeModal}
                                            study={study}
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    </Fragment>
                </Paper>

                <Modal
                    component={StudentDelete}
                    title='Student entfernen'
                    close={this.closeStudentDeleteModal}
                    open={this.state.studentDeleteModalOpen}
                    data={student}
                    danger
                />
                {/* <Modal
                    component={StudyCreate}
                    title='Studium hinzufüge '
                    close={this.closeStudyCreateModal}
                    open={this.state.studyCreateModalOpen}
                    data={{
                        student,
                        students: this.props.students,
                        studyCourses: this.props.studyCourses,
                        studyRegulations: this.props.studyRegulations
                    }}
                /> */}
                <Modal
                    component={GradeCreate}
                    title='Note hinzufügen'
                    close={this.closeGradeCreateModal}
                    open={this.state.gradeCreateModalOpen}
                    data={this.state.gradeCreateModalData}
                    preventClosing
                />
            </Fragment>
        );
    }
}

const styles = theme => ({
    button: {
        '&:not(:last-child)': {
            marginRight: theme.spacing.unit
        },
    },
    deleteButton: {
        marginLeft: 'auto',
        '&:hover': {
            color: theme.palette.darkred,
        }
    },
    leftIcon: {
        marginRight: theme.spacing.unit
    },
    tabsContainer: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    tabsHeader: {
        borderBottom: `1px solid ${theme.palette.secondary.main}`
    },
    tabContainer: {
        padding: theme.spacing.unit * 3,
    },
    tabContainerInside: {
        overflowX: 'auto',
    },
    loader: {
        margin: `${2 * theme.spacing.unit} auto`,

    }
});

const mapStateToProps = (state, ownProps) => ({
    student: getFullStudent(state, ownProps.match.params.id),
    getStudyCourseById: getStudyCourseById(state),
    students: getStudents(state),
    studyCourses: getStudyCourses(state),
    studyRegulations: getStudyRegulations(state)
});

const mapDispatchToProps = {
    fetchStudent: entitiesActions.student.fetch,
    fetchStudentInformationByStudentId: entitiesActions.studentInformation.fetchByKey('studentId'),
    fetchStudiesByStudentId: entitiesActions.study.fetchByKey('studentId'),
};

export default connect(mapStateToProps, mapDispatchToProps)(
    withRouter(withStyles(styles, { withTheme: true })(StudentDetails))
);
