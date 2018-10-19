import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CircularProgress from '@material-ui/core/CircularProgress';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeftRounded';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';

import { fetchStudentForId } from '../redux/studentenActions';
import { getStudentForId } from '../redux/studentenSelectors';

import { translateStudienkurse, translateStudyStatus, isNotEmpty } from '../../../helper/helper';
import FaecherGrouped from './components/FaecherGrouped';
import StudentInformation from './components/StudentInformation';
import CreateNote from './components/CreateNote';
import Modal from '../../../components/Modal';
import Divider from '../../../components/Divider';
// import Placeholder from '../../components/placeholder/Placeholder';


/* const StudentDetailsLoading = () => (
    <Placeholder>
        <Placeholder.Item width='20%' height='1.25rem' />
        <Placeholder.Item width='35%' />
        <Placeholder.Item width='100px' height='2rem' inline />
        <Placeholder.Item width='125px' height='2rem' inline />
        <Placeholder.Item width='150px' height='2rem' inline />
        <Divider hidden height='2.5rem' />
        <Placeholder.Item width='15%' height='1.5rem' />
        <Placeholder.Item height='2rem' />
        <Placeholder.Item height='3rem' width='80%' />
        <Placeholder.Item height='4rem' width='90%' />
        <Placeholder.Item               width='60%' />
        <Placeholder.Item height='2rem' width='80%' />
        <Placeholder.Item height='3rem' width='85%' />
        <Placeholder.Item height='4rem' width='75%' />
    </Placeholder>
) */


class StudentDetails extends Component {
    static getDerivedStateFromProps(nextProps, prevState){
        const studentId = Number(nextProps.match.params.id);
        if (studentId !== prevState.studentId) {
            return { ...prevState, studentId }
        }
        return null;
    }

    state = {
        studentId: Number(this.props.match.params.id),
        noteModalOpen: false,
        noteUpdateModalOpen: false,
        noteUpdateModalData: null,
        noteModalData: null,
        tab: 0
    }

    componentDidMount() {
        if (!this.props.student) {
            // this.props.fetchStudentForId(this.state.studentId);
            this.fetchStudent();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.fetchStudent();
        }
    }

    fetchStudent() {
        this.props.dispatch({
            type: 'FETCH_STUDENT',
            request: {
                url: `/students/${this.state.studentId}?_embed=studies&_embed=studentInformations`
            }
        });
    }

    goBack = () => {
        this.props.history.goBack();
    }

    updateStudent = () => {
        this.props.history.push(`/studenten/${this.state.studentId}/update`);
    }

    openNoteModal = (data) => {
        this.setState({
            noteModalOpen: true,
            noteModalData: data
        });
    }

    closeNoteModal = () => {
        this.setState({
            noteModalOpen: false,
            noteModalData: null
        });
    }

    createNote = () => {
        this.openNoteModal({
            studentId: this.state.studentId
        });
    }

    tabChange = (e, tab) => {
        this.setState({ tab });
    };

    sortStudies() {
        return this.props.student && isNotEmpty(this.props.student)
            ? this.props.student.studies.sort(
                (a, b) => b.year - a.year
            ) : [];
    }

    render() {
        const { tab } = this.state;
        const { student, classes } = this.props;
        const sortedStudies = this.sortStudies();
        return student ? (
            <Fragment>
                <div>
                    <Typography variant="display1" gutterBottom>
                        {student.prefix} {student.firstName} {student.lastName}
                    </Typography>
                    <Typography gutterBottom>
                        Matrikelnummer: {student.matrikelnummer}
                    </Typography>
                </div>
                <Divider hidden height='1rem' />
                <div>
                    <Button onClick={this.goBack} className={classes.button} >
                        <ChevronLeftIcon className={classes.leftIcon} />
                        Zurück
                    </Button>
                    <Button onClick={this.updateStudent} className={classes.button} >
                        <EditIcon className={classes.leftIcon} />
                        Bearbeiten
                    </Button>
                    <Button onClick={this.createNote} className={classes.button} >
                        <AddIcon className={classes.leftIcon} />
                        Note hinzufügen
                    </Button>
                </div>

                <Divider hidden height='1rem' />
                {(isNotEmpty(this.props.student.studentInformations) || isNotEmpty(this.props.student.studies)) && (
                    <Paper component="div" className={classes.tabsContainer}>
                        <Tabs
                            value={tab}
                            onChange={this.tabChange}
                            indicatorColor="primary"
                            textColor="primary"
                            scrollable={window.innerWidth < this.props.theme.breakpoints.values.lg}
                            scrollButtons='auto'
                            className={classes.tabsHeader}
                        >
                            {isNotEmpty(this.props.student.studentInformations) && (
                                <Tab value='contact' label='Kontaktdaten' />
                            )}
                            {sortedStudies.map((study, index) => (
                                <Tab
                                    key={index}
                                    value={index}
                                    label={`${translateStudienkurse(study.studyCourseId)} ${study.year} (${translateStudyStatus(study.status)})`}
                                />
                            ))}
                        </Tabs>
                        <div className={classes.tabContainer}>
                            <div className={classes.tabContainerInside}>
                                {tab === 'contact' && isNotEmpty(this.props.student.studentInformations) && (
                                    <StudentInformation student={this.props.student} />
                                )}
                                {sortedStudies.map((study, index) => (
                                    <Fragment key={index}>
                                        {tab === index && (
                                            <FaecherGrouped
                                                studentId={student.id}
                                                studyCourseId={study.studyCourseId}
                                                openNoteModal={this.openNoteModal}
                                                study={study}
                                            />
                                        )}
                                    </Fragment>
                                ))}
                            </div>
                        </div>
                    </Paper>
                )}
                
                <Modal
                    component={CreateNote}
                    title='Note hinzufügen'
                    close={this.closeNoteModal}
                    open={this.state.noteModalOpen}
                    data={this.state.noteModalData}
                    preventClosing
                />
            </Fragment>
        ) : <CircularProgress className={classes.loader} />;
    }
}

const styles = theme => ({
    button: {
        '&:not(:last-child)': {
            marginRight: theme.spacing.unit
        },
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
        margin: 2 * theme.spacing.unit + ' auto',

    }
})

const mapStateToProps = (state, ownProps) => ({
    student: getStudentForId(state, ownProps.match.params.id)
});

export default connect(mapStateToProps, { fetchStudentForId, dispatch: action => action })(
    withStyles(styles, { withTheme: true })(StudentDetails)
);
