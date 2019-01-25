import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import LinearProgress from '@material-ui/core/LinearProgress';
import AddIcon from '@material-ui/icons/Add';

import HiddenDivider from '../../components/HiddenDivider';
import Modal from '../../components/Modal';
import StudyCourseListItem from './components/StudyCourseListItem';
import StudyCourseCreate from './components/StudyCourseCreate';
import StudyCourseUpdate from './components/StudyCourseUpdate';
import StudyCourseDelete from './components/StudyCourseDelete';
import StudyRegulationCreate from './components/StudyRegulationCreate';
import StudyRegulationDelete from './components/StudyRegulationDelete';
import { getStudyCoursesWithRegulations, getStudyFetching } from './redux/studySelectors';



class StudyCourseList extends Component {
    state = {
        allowDelete: false,
        createModalOpen: false,
        updateModalOpen: false,
        updateModalData: null,
        deleteModalOpen: false,
        deleteModalData: null,
        createStudyRegulationModalOpen: false,
        createStudyRegulationModalData: null,
        deleteStudyRegulationModalOpen: false,
        deleteStudyRegulationModalData: null,
    }

    openCreateModal = () => {
        this.setState({ createModalOpen: true });
    }

    closeCreateModal = () => {
        this.setState({ createModalOpen: false });
    }

    openUpdateModal = (studyCourse) => {
        this.setState({
            updateModalOpen: true,
            updateModalData: studyCourse
        });
    }

    closeUpdateModal = () => {
        this.setState({
            updateModalOpen: false,
            updateModalData: null
        });
    }

    openDeleteModal = (studyCourse) => {
        if (this.state.allowDelete) {
            this.setState({
                deleteModalOpen: true,
                deleteModalData: studyCourse
            });
        }
    }

    closeDeleteModal = () => {
        this.setState({
            deleteModalOpen: false,
            deleteModalData: null
        });
    }
    
    openCreateStudyRegulationModal = (studyCourse) => {
        this.setState({
            createStudyRegulationModalOpen: true,
            createStudyRegulationModalData: {
                studyCourses: this.props.studyCourses,
                studyCourse
            }
        });
    }
    
    closeCreateStudyRegulationModal = () => {
        this.setState({
            createStudyRegulationModalOpen: false,
            createStudyRegulationModalData: null
        });
    }
    
    openDeleteStudyRegulationModal = (studyRegulation) => {
        if (this.state.allowDelete) {
            this.setState({
                deleteStudyRegulationModalOpen: true,
                deleteStudyRegulationModalData: studyRegulation
            });
        }
    }

    closeDeleteStudyRegulationModal = () => {
        this.setState({
            deleteStudyRegulationModalOpen: false,
            deleteStudyRegulationModalData: null
        });
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
                <Modal
                    component={StudyCourseCreate}
                    title='Studienkurs hinzufügen'
                    close={this.closeCreateModal}
                    open={this.state.createModalOpen}
                    preventClosing
                />
                <Modal
                    component={StudyCourseUpdate}
                    title='Studienkurs bearbeiten'
                    close={this.closeUpdateModal}
                    open={this.state.updateModalOpen}
                    data={this.state.updateModalData}
                    preventClosing
                />
                <Modal
                    component={StudyCourseDelete}
                    title='Studienkurs entfernen'
                    close={this.closeDeleteModal}
                    open={this.state.deleteModalOpen}
                    data={this.state.deleteModalData}
                    danger
                />
                <Modal
                    component={StudyRegulationCreate}
                    title='Studienordnung hinzufügen'
                    close={this.closeCreateStudyRegulationModal}
                    open={this.state.createStudyRegulationModalOpen}
                    data={this.state.createStudyRegulationModalData}
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
                <Typography variant='display1'>Studienkursverwaltung</Typography>
                <HiddenDivider />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                        variant='flat'
                        title='Studienkurs hinzufügen'
                        onClick={this.openCreateModal}
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
                                <StudyCourseListItem
                                    studyCourse={studyCourse}
                                    classes={classes}
                                    key={studyCourse.id}
                                    allowDelete={this.state.allowDelete}
                                    openUpdateModal={this.openUpdateModal}
                                    openDeleteModal={this.openDeleteModal}
                                    openCreateStudyRegulationModal={this.openCreateStudyRegulationModal}
                                    openDeleteStudyRegulationModal={this.openDeleteStudyRegulationModal}
                                />
                            ))
                          )
                        : 'Keine Studienkurse gefunden.'
                    : <LinearProgress />
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
    expandableHeader: {
        fontWeight: 'inherit',
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
    },
    preWrap: {
        whiteSpace: 'pre-wrap',
    },
});


StudyCourseList.propTypes = {
    studyCourses: PropTypes.array.isRequired,
    fetching: PropTypes.bool,
}

const mapStateToProps = (state) => ({
    studyCourses: getStudyCoursesWithRegulations(state),
    fetching: getStudyFetching(state),
});

export default connect(mapStateToProps)(
    withStyles(styles)(StudyCourseList)
);
