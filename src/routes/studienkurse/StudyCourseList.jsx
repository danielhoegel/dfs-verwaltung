import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import AddIcon from '@material-ui/icons/Add';

import HiddenDivider from '../../components/HiddenDivider';
import Loader from '../../components/Loader';
import Modal from '../../components/Modal';
import StudyCourseListItem from './components/studyCourse/StudyCourseListItem';
import StudyCourseCreate from './components/studyCourse/StudyCourseCreate';
import StudyCourseUpdate from './components/studyCourse/StudyCourseUpdate';
import StudyCourseDelete from './components/studyCourse/StudyCourseDelete';
import StudyRegulationCreate from './components/studyRegulation/StudyRegulationCreate';
import StudyRegulationDelete from './components/studyRegulation/StudyRegulationDelete';
import { getStudyCoursesWithRegulations } from './redux/studySelectors';
import entitiesActions from '../../redux/entitiesActions';


class StudyCourseList extends Component {
    state = {
        loading: true,
        error: null,
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


    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        Promise.all([
            this.props.fetchStudies(),
            this.props.fetchStudyRegulations()
        ])
        .then(() => this.setState({ loading: false, error: null }))
        .catch(err => this.setState({ loading: false, error: err.message }));
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

    render() {
        const { studyCourses, classes } = this.props;
        return (
            <div>
                <Typography variant='h4'>Studienkursverwaltung</Typography>
                <HiddenDivider />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                        variant='text'
                        title='Studienkurs hinzufügen'
                        onClick={this.openCreateModal}
                    >
                        <AddIcon className={classes.leftIcon} />
                        Hinzufügen
                    </Button>
                    <div style={{ marginLeft: 'auto' }}>
                        Löschen zulassen
                        <Switch
                            checked={this.state.allowDelete}
                            onChange={this.toggleAllowDelete}
                            color='primary'
                            disabled={this.state.loading}
                            classes={{
                                switchBase: classes.colorSwitchBase,
                                checked: classes.colorSwitchChecked,
                                bar: classes.colorSwitchBar,
                            }}
                        />

                    </div>
                </div>
                <HiddenDivider />
                <div className={classes.listWrapper}>
                    <Loader loading={this.state.loading} />
                    {studyCourses.length
                        ? studyCourses.map(studyCourse => (
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
                        : 'Keine Studienkurse gefunden.'
                    }
                </div>
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


StudyCourseList.propTypes = {
    studyCourses: PropTypes.array.isRequired,
    fetchStudies: PropTypes.func.isRequired,
    fetchStudyRegulations: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    studyCourses: getStudyCoursesWithRegulations(state),
});

const mapDispatchToProps = {
    fetchStudies: entitiesActions.study.fetchAll,
    fetchStudyRegulations: entitiesActions.studyRegulation.fetchAll,
};

export default connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles)(StudyCourseList)
);
