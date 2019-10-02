import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import Fab from '@material-ui/core/Fab';
import PrintIcon from '@material-ui/icons/PrintOutlined';
import MenuItem from '@material-ui/core/MenuItem';

import { getStudentenFilter } from '../../redux/studentenSelectors';

import Printing from '../../../../components/Printing';
import DropdownMenu from '../../../../components/DropdownMenu';

import StudentListReport from '../../../../reports/studentList/StudentListReport';
import studentListReportStyles from '../../../../reports/studentList/studentListReportStyles';
import LESBListReport from '../../../../reports/lesbList/LESBListReport';
import lesbListReportStyles from '../../../../reports/lesbList/lesbListReportStyles';
import ErgebnisseReport from '../../../../reports/ergebnisse/ErgebnisseReport';
import ergebnisseReportStyles from '../../../../reports/ergebnisse/ergebnisseReportStyles';
import {
    getVeranstaltungenForFach,
    getPunkteForVeranstaltungAndStudent,
    getFaecherDataForUEAndSemester,
    getFaecherGroupedByTyp
} from '../../../../helper/selectors';
import {
    getSubjects,
    getGradesForStudentAndSubjectCourse,
    getStudyCourseById
} from '../../../../redux/entitiesSelector';

const StudentPrintMenu = ({ style, className, ButtonComponent, classes, ...props }) => {
    return (
        <DropdownMenu
            button={ButtonComponent ||
                <Fab
                    className={classNames(classes.printButton, className)}
                    title='Drucken oder als PDF speichern'
                    style={style}
                    color='primary'
                >
                    <PrintIcon />
                </Fab>
            }
        >
            <Printing
                component={
                    <StudentListReport
                        students={props.students}
                        filter={props.filter}
                        getStudyCourseById={props.getStudyCourseById}
                    />}
                styles={studentListReportStyles}
                fileName='Studentenliste'
                orientation='landscape'
                noDateSuffix
            >
                <MenuItem>Studentenliste</MenuItem>
            </Printing>
            <Printing
                component={
                    <LESBListReport
                        students={props.students}
                        filter={props.filter}
                        subjects={props.subjectsGrouped}
                        getVeranstaltungenForFach={props.getVeranstaltungenForFach}
                        getGradesForStudentAndSubjectCourse={props.getGradesForStudentAndSubjectCourse}
                    />
                }
                styles={lesbListReportStyles}
                fileName='LESB-Liste'
                orientation='portrait'
                noDateSuffix
            >
                <MenuItem>LESB-Liste</MenuItem>
            </Printing>
            <Printing
                component={
                    <ErgebnisseReport
                        students={props.students}
                        filter={props.filter}
                        subjects={props.subjects}
                        getVeranstaltungenForFach={props.getVeranstaltungenForFach}
                        getPunkteForVeranstaltungAndStudent={props.getPunkteForVeranstaltungAndStudent}
                        getFaecherDataForUEAndSemester={props.getFaecherDataForUEAndSemester}
                    />
                }
                styles={ergebnisseReportStyles}
                fileName='Prüfungsergebnisse'
                orientation='portrait'
                noDateSuffix
            >
                <MenuItem>Prüfungsergebnisse</MenuItem>
            </Printing>
        </DropdownMenu>
    );
};

StudentPrintMenu.propTypes = {
    students: PropTypes.array.isRequired,
};

const styles = theme => ({
    printButton: {
        marginLeft: 2 * theme.spacing.unit,
        boxShadow: theme.shadows[4],
        '&:hover': {
            boxShadow: theme.shadows[8],
        }
    },
});

const mapStateToProps = state => ({
    filter: getStudentenFilter(state),
    getVeranstaltungenForFach: getVeranstaltungenForFach(state),
    getGradesForStudentAndSubjectCourse: getGradesForStudentAndSubjectCourse(state),
    getPunkteForVeranstaltungAndStudent: getPunkteForVeranstaltungAndStudent(state),
    getFaecherDataForUEAndSemester: getFaecherDataForUEAndSemester(state),
    getStudyCourseById: getStudyCourseById(state),
    subjects: getSubjects(state),
    subjectsGrouped: getFaecherGroupedByTyp(state),
});

export default connect(mapStateToProps)(
    withStyles(styles)(StudentPrintMenu)
);
