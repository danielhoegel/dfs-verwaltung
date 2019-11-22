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
import {
    getFaecherGroupedByTyp,
    getVeranstaltungenForFach,
    getPunkteForVeranstaltungAndStudent,
    getFaecherDataForUEAndSemester
} from '../helper/selectors';
import { getSubjects, getGradesForStudentAndSubjectCourse, getStudyCourseById } from '../redux/entitiesSelector';
import { getReportSettings } from './redux/reportSelectors';
import { openSettingsModal } from './redux/reportActions';
import ReportSettingsModal from './ReportSettingsModal';


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
        autoFileName: '',
        orientation: '',
        styles: '',
        html: '',
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

    componentDidUpdate(prevProps) {
        const { match, filteredStudenten, filter, settings } = this.props;
        if (
            prevProps.match !== match ||
            prevProps.filteredStudenten !== filteredStudenten ||
            prevProps.settings !== settings
        ) {
            switch (match.params.report) {
                case 'studenten': this.setState({
                    autoFileName: 'Studentenliste',
                    fileName: this.__fileName('Studentenliste'),
                    orientation: this.__orientation('landscape'),
                    styles: studentListReportStyles,
                    html: renderToString(
                        <StudentListReport
                            students={filteredStudenten}
                            filter={filter}
                            getStudyCourseById={this.props.getStudyCourseById}
                            settings={this.props.settings}
                        />
                    )
                });
                break;

                case 'studenten-einfach': this.setState({
                    autoFileName: 'Einfache Studentenliste',
                    fileName: this.__fileName('Einfache Studentenliste'),
                    orientation: this.__orientation('portrait'),
                    styles: studentListSimpleReportStyles,
                    html: renderToString(
                        <StudentListSimpleReport
                            students={filteredStudenten}
                            filter={filter}
                            getStudyCourseById={this.props.getStudyCourseById}
                            settings={this.props.settings}
                        />
                    )
                });
                break;

                case 'lesb': this.setState({
                    autoFileName: 'LESB-Liste',
                    fileName: this.__fileName('LESB-Liste'),
                    orientation: this.__orientation('portrait'),
                    styles: lesbListReportStyles,
                    html: renderToString(
                        <LESBListReport
                            students={filteredStudenten}
                            filter={filter}
                            subjects={this.props.subjectsGrouped}
                            getVeranstaltungenForFach={this.props.getVeranstaltungenForFach}
                            getGradesForStudentAndSubjectCourse={this.props.getGradesForStudentAndSubjectCourse}
                            settings={this.props.settings}
                        />
                    )
                });
                break;

                case 'ergebnisse': this.setState({
                    autoFileName: 'Prüfungsergebnisse',
                    fileName: this.__fileName('Prüfungsergebnisse'),
                    orientation: this.__orientation('portrait'),
                    styles: ergebnisseReportStyles,
                    html: renderToString(
                        <ErgebnisseReport
                            students={filteredStudenten}
                            filter={filter}
                            subjects={this.props.subjects}
                            getVeranstaltungenForFach={this.props.getVeranstaltungenForFach}
                            getPunkteForVeranstaltungAndStudent={this.props.getPunkteForVeranstaltungAndStudent}
                            getFaecherDataForUEAndSemester={this.props.getFaecherDataForUEAndSemester}
                            settings={this.props.settings}
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

    __fileName(autoFileName) {
        const { titleType, customTitle } = this.props.settings;
        return titleType === 'custom' ? customTitle
             : titleType === 'auto' ? autoFileName
             : '';
    }

    __orientation(autoOrientation) {
        const { orientation } = this.props.settings;
        return orientation === 'auto' ? autoOrientation : orientation;
    }

    render() {
        const { fetching, classes, match } = this.props;
        return (
            <div>
                {fetching ? <StudentenlisteLoading /> : (
                    <div>
                        <div className={classes.flexbox}>
                            <Typography variant="h4">
                                Bericht: {this.state.autoFileName}
                            </Typography>
                            <div className={classes.actionContainer}>
                                <Button
                                    className={classes.button}
                                    title='Einstellungen'
                                    onClick={this.props.openSettingsModal}
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

                        <ReportSettingsModal />
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
    settings: getReportSettings(state),
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

export default connect(mapStateToProps, {
    openSettingsModal,
    fetchStudenten,
    dispatch: action => action
})(
    withStyles(styles)(Reports)
);
