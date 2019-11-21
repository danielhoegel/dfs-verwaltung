import React, { Component } from 'react';
import { connect } from 'react-redux';
import { renderToString } from 'react-dom/server';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import PrintIcon from '@material-ui/icons/PrintOutlined';
import Button from '@material-ui/core/Button';
import SettingsIcon from '@material-ui/icons/Settings';

import juice from 'juice';

import HiddenDivider from '../components/HiddenDivider';
import Placeholder from '../components/placeholder/Placeholder';

import StudentenFilter from '../routes/studenten/studentenListe/components/StudentenFilter';
import {
    getFilteredStudenten,
    getStudentenFetching,
    getStudentenFilter
} from '../routes/studenten/redux/studentenSelectors';
import { fetchStudenten } from '../routes/studenten/redux/studentenActions';

import reportStyles from './reportStyles';
import StudentListReport from './studentList/StudentListReport';
import studentListReportStyles from './studentList/studentListReportStyles';
import StudentListSimpleReport from './studentListSimple/StudentListSimpleReport';
import studentListSimpleReportStyles from './studentListSimple/studentListSimpleReportStyles';
import LESBListReport from './lesbList/LESBListReport';
import lesbListReportStyles from './lesbList/lesbListReportStyles';
import ErgebnisseReport from './ergebnisse/ErgebnisseReport';
import ergebnisseReportStyles from './ergebnisse/ergebnisseReportStyles';
import { printPage } from '../components/Printing';
import Modal from '../components/Modal';
import {
    getFaecherGroupedByTyp,
    getVeranstaltungenForFach,
    getPunkteForVeranstaltungAndStudent,
    getFaecherDataForUEAndSemester
} from '../helper/selectors';
import { getSubjects, getGradesForStudentAndSubjectCourse, getStudyCourseById } from '../redux/entitiesSelector';
import MyForm from '../components/MyForm';
import SettingsFields from './SettingsFields';


const StudentenlisteLoading = () => (
    <Placeholder>
        <Placeholder.Item height='2.5rem' />
        <Placeholder.Item height='2rem' width='70%' />
        <Placeholder.Item height='2rem' width='60%' />
        <Placeholder.Item height='2rem' width='90%' />
        <Placeholder.Item height='2rem' width='80%' />
    </Placeholder>
);

class Reports extends Component {
    state = {
        fileName: '',
        orientation: '',
        styles: '',
        html: '',
        settingsModalOpen: false,
        settings: {
            autoTitle: true,
            title: '',
            showTitle: true,
            showFilter: true,
            orientation: 'auto'
        }
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_STUDENTEN',
            request: {
                url: '/students?_embed=studies&_embed=studentInformations&_sort=lastName,firstName,matrikelnummer,id'
            }
        });

        try {
            const storedSettings = localStorage.getItem('dfs_print_settings');
            if (storedSettings) {
                this.setState({
                    settings: JSON.parse(storedSettings)
                });
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { match, filteredStudenten, filter } = this.props;
        const { orientation, title, autoTitle, showTitle } = this.state.settings;
        if (
            prevProps.match !== match ||
            prevProps.filteredStudenten !== filteredStudenten ||
            prevState.settings !== this.state.settings
        ) {
            switch (match.params.report) {
                case 'studenten': this.setState({
                    fileName: showTitle ? (autoTitle ? 'Studentenliste' : title) : '',
                    orientation: orientation === 'auto' ? 'landscape' : orientation,
                    styles: studentListReportStyles,
                    html: renderToString(
                        <StudentListReport
                            students={filteredStudenten}
                            filter={filter}
                            getStudyCourseById={this.props.getStudyCourseById}
                            settings={this.state.settings}
                        />
                    )
                });
                break;

                case 'studenten-einfach': this.setState({
                    fileName: showTitle ? (autoTitle ? 'Einfache Studentenliste' : title) : '',
                    orientation: orientation === 'auto' ? 'portrait' : orientation,
                    styles: studentListSimpleReportStyles,
                    html: renderToString(
                        <StudentListSimpleReport
                            students={filteredStudenten}
                            filter={filter}
                            getStudyCourseById={this.props.getStudyCourseById}
                            settings={this.state.settings}
                        />
                    )
                });
                break;

                case 'lesb': this.setState({
                    fileName: showTitle ? (autoTitle ? 'LESB-Liste' : title) : '',
                    orientation: orientation === 'auto' ? 'portrait' : orientation,
                    styles: lesbListReportStyles,
                    html: renderToString(
                        <LESBListReport
                            students={filteredStudenten}
                            filter={filter}
                            subjects={this.props.subjectsGrouped}
                            getVeranstaltungenForFach={this.props.getVeranstaltungenForFach}
                            getGradesForStudentAndSubjectCourse={this.props.getGradesForStudentAndSubjectCourse}
                            settings={this.state.settings}
                        />
                    )
                });
                break;

                case 'ergebnisse': this.setState({
                    fileName: showTitle ? (autoTitle ? 'Prüfungsergebnisse' : title) : '',
                    orientation: orientation === 'auto' ? 'portrait' : orientation,
                    styles: ergebnisseReportStyles,
                    html: renderToString(
                        <ErgebnisseReport
                            students={filteredStudenten}
                            filter={filter}
                            subjects={this.props.subjects}
                            getVeranstaltungenForFach={this.props.getVeranstaltungenForFach}
                            getPunkteForVeranstaltungAndStudent={this.props.getPunkteForVeranstaltungAndStudent}
                            getFaecherDataForUEAndSemester={this.props.getFaecherDataForUEAndSemester}
                            settings={this.state.settings}
                        />
                    )
                });
                break;

                default: break;
            }
        }
    }

    __styles() {
        const { styles } = this.state;
        return reportStyles + styles;
    }

    __htmlString() {
        const { html } = this.state;
        const styles = this.__styles();
        return juice(`<style>${styles}</style>\n${html}`);
    }

    __printPage = () => {
        const { fileName, orientation, html } = this.state;
        const styles = this.__styles();
        printPage({ fileName, orientation, styles, html });
    }

    saveSettingsAndCloseModal = settings => {
        this.setState({
            settings,
            settingsModalOpen: false
        });

        try {
            localStorage.setItem('dfs_print_settings', JSON.stringify(settings));
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
        }
    }

    render() {
        const { fetching, classes, match } = this.props;
        return (
            <div>
                {fetching ? <StudentenlisteLoading /> : (
                    <div>
                        <div className={classes.flexbox}>
                            <Typography variant="h4">
                                Report: {this.state.fileName}
                            </Typography>
                            <div className={classes.actionContainer}>
                                <Button
                                    className={classes.button}
                                    title='Einstellungen'
                                    onClick={() => this.setState({ settingsModalOpen: true })}
                                >
                                    <SettingsIcon className={classes.leftIcon} />
                                    Einstellungen
                                </Button>
                            </div>
                        </div>
                        <HiddenDivider height={2} />
                        <StudentenFilter />
                        <HiddenDivider height={2} />
                        <Paper className={classes.paper}>
                            {match.params.report
                                ? <div
                                    dangerouslySetInnerHTML={{ __html: this.__htmlString() }}
                                    className={classes.container}
                                />
                                : '404 - Kein Report gefunden.'
                            }
                        </Paper>
                        <Fab
                            color='primary'
                            className={classes.printButton}
                            onClick={this.__printPage}
                        >
                            <PrintIcon />
                        </Fab>

                        <Modal
                            component={({ closeModal }) => (
                                <MyForm
                                    fields={SettingsFields}
                                    // eslint-disable-next-line no-console
                                    onSubmit={this.saveSettingsAndCloseModal}
                                    defaultValues={this.state.settings}
                                    onCancel={closeModal}
                                />
                            )}
                            title='Einstellungen'
                            close={() => this.setState({ settingsModalOpen: false })}
                            open={this.state.settingsModalOpen}
                        />
                    </div>
                )}
            </div>
        );
    }
}

const styles = theme => ({
    flexbox: {
        display: 'flex',
        alignItems: 'flex-start',
    },
    actionContainer: {
        display: 'flex',
        marginLeft: 'auto',
    },
    button: {
        '&:not(:last-child)': {
            marginRight: theme.spacing.unit
        },
    },
    leftIcon: {
        marginRight: theme.spacing.unit
    },
    paper: {
        padding: 4 * theme.spacing.unit,
    },
    printButton: {
        position: 'absolute',
        bottom: 4 * theme.spacing.unit,
        right: 4 * theme.spacing.unit,
        boxShadow: theme.shadows[6],
        '&:hover': {
            boxShadow: theme.shadows[12],
        }
    },
    container: {
        overflow: 'auto'
    }
});

const mapStateToProps = state => ({
    getVeranstaltungenForFach: getVeranstaltungenForFach(state),
    getGradesForStudentAndSubjectCourse: getGradesForStudentAndSubjectCourse(state),
    getPunkteForVeranstaltungAndStudent: getPunkteForVeranstaltungAndStudent(state),
    getFaecherDataForUEAndSemester: getFaecherDataForUEAndSemester(state),
    getStudyCourseById: getStudyCourseById(state),
    filteredStudenten: getFilteredStudenten(state),
    fetching: getStudentenFetching(state),
    filter: getStudentenFilter(state),
    subjects: getSubjects(state),
    subjectsGrouped: getFaecherGroupedByTyp(state),
});

export default connect(mapStateToProps, { fetchStudenten, dispatch: action => action })(
    withStyles(styles)(Reports)
);
