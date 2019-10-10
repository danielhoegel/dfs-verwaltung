import React, { Component } from 'react';
import { connect } from 'react-redux';
import { renderToString } from 'react-dom/server';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import PrintIcon from '@material-ui/icons/PrintOutlined';
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
        html: ''
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_STUDENTEN',
            request: {
                url: '/students?_embed=studies&_embed=studentInformations&_sort=lastName,firstName,matrikelnummer,id'
            }
        });
    }

    componentDidUpdate(prevProps) {
        const { match, filteredStudenten, filter } = this.props;
        if (prevProps.match !== match || prevProps.filteredStudenten !== filteredStudenten) {
            switch (match.params.report) {
                case 'studenten': this.setState({
                    fileName: 'Studentenliste',
                    orientation: 'landscape',
                    styles: studentListReportStyles,
                    html: renderToString(
                        <StudentListReport
                            students={filteredStudenten}
                            filter={filter}
                            getStudyCourseById={this.props.getStudyCourseById}
                        />
                    )
                });
                break;

                case 'lesb': this.setState({
                    fileName: 'LESB-Liste',
                    orientation: 'portrait',
                    styles: lesbListReportStyles,
                    html: renderToString(
                        <LESBListReport
                            students={filteredStudenten}
                            filter={filter}
                            subjects={this.props.subjectsGrouped}
                            getVeranstaltungenForFach={this.props.getVeranstaltungenForFach}
                            getGradesForStudentAndSubjectCourse={this.props.getGradesForStudentAndSubjectCourse}
                        />
                    )
                });
                break;

                case 'ergebnisse': this.setState({
                    fileName: 'Prüfungsergebnisse',
                    orientation: 'portrait',
                    styles: ergebnisseReportStyles,
                    html: renderToString(
                        <ErgebnisseReport
                            students={filteredStudenten}
                            filter={filter}
                            subjects={this.props.subjects}
                            getVeranstaltungenForFach={this.props.getVeranstaltungenForFach}
                            getPunkteForVeranstaltungAndStudent={this.props.getPunkteForVeranstaltungAndStudent}
                            getFaecherDataForUEAndSemester={this.props.getFaecherDataForUEAndSemester}
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
        console.log(reportStyles + styles);
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

    render() {
        const { fetching, classes, match } = this.props;
        return (
            <div>
                {fetching ? <StudentenlisteLoading /> : (
                    <div>
                        <Typography variant="h4">
                            Report: {this.state.fileName}
                        </Typography>
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
                    </div>
                )}
            </div>
        );
    }
}

const styles = theme => ({
    flexbox: {
        display: 'flex',
        alignItems: 'center',
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
