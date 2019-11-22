import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import cn from 'classnames';

import Fab from '@material-ui/core/Fab';
import PrintIcon from '@material-ui/icons/PrintOutlined';
import MenuItem from '@material-ui/core/MenuItem';
import { Divider } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';

import { getStudentenFilter } from '../../redux/studentenSelectors';

import Printing from '../../../../components/Printing';
import DropdownMenu from '../../../../components/DropdownMenu';

import StudentListReport from '../../../../reports/studentList/StudentListReport';
import studentListReportStyles from '../../../../reports/studentList/studentListReportStyles';
import StudentListSimpleReport from '../../../../reports/studentListSimple/StudentListSimpleReport';
import studentListSimpleReportStyles from '../../../../reports/studentListSimple/studentListSimpleReportStyles';
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
import { getReportSettingsModalOpen, getReportSettings } from '../../../../reports/redux/reportSelectors';
import { setSettings, openSettingsModal } from '../../../../reports/redux/reportActions';
import ReportSettingsModal from '../../../../reports/ReportSettingsModal';

const StudentPrintMenu = ({ style, className, ButtonComponent, classes, ...props }) => {
    return (
        <>
            <DropdownMenu
                button={ButtonComponent ||
                    <Fab
                        className={cn(classes.printButton, className)}
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
                            settings={props.settings}
                        />
                    }
                    styles={studentListReportStyles}
                    autoFileName='Studentenliste'
                    autoOrientation='landscape'
                    noDateSuffix
                >
                    <MenuItem>
                        <PrintIcon className={cn(classes.leftIcon, classes.subIcon)} />
                        Studentenliste
                    </MenuItem>
                </Printing>
                <Printing
                    component={
                        <StudentListSimpleReport
                            students={props.students}
                            filter={props.filter}
                            getStudyCourseById={props.getStudyCourseById}
                            settings={props.settings}
                        />
                    }
                    styles={studentListSimpleReportStyles}
                    autoFileName='Einfache Studentenliste'
                    autoOrientation='portrait'
                    noDateSuffix
                >
                    <MenuItem>
                        <PrintIcon className={cn(classes.leftIcon, classes.subIcon)} />
                        Einfache Studentenliste
                    </MenuItem>
                </Printing>
                <Printing
                    component={
                        <LESBListReport
                            students={props.students}
                            filter={props.filter}
                            subjects={props.subjectsGrouped}
                            getVeranstaltungenForFach={props.getVeranstaltungenForFach}
                            getGradesForStudentAndSubjectCourse={props.getGradesForStudentAndSubjectCourse}
                            settings={props.settings}
                        />
                    }
                    styles={lesbListReportStyles}
                    autoFileName='LESB-Liste'
                    autoOrientation='portrait'
                    noDateSuffix
                >
                    <MenuItem>
                        <PrintIcon className={cn(classes.leftIcon, classes.subIcon)} />
                        LESB-Liste
                    </MenuItem>
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
                            settings={props.settings}
                        />
                    }
                    styles={ergebnisseReportStyles}
                    autoFileName='Prüfungsergebnisse'
                    autoOrientation='portrait'
                    noDateSuffix
                >
                    <MenuItem>
                        <PrintIcon className={cn(classes.leftIcon, classes.subIcon)} />
                        Prüfungsergebnisse
                    </MenuItem>
                </Printing>
                <Divider />
                <MenuItem onClick={props.openSettingsModal}>
                    <SettingsIcon className={classes.leftIcon} />
                    Einstellungen
                </MenuItem>
            </DropdownMenu>
            <ReportSettingsModal />
        </>
    );
};

StudentPrintMenu.propTypes = {
    students: PropTypes.array.isRequired,
};

const styles = theme => ({
    leftIcon: {
        marginRight: theme.spacing.unit
    },
    subIcon: {
        opacity: 0.65
    },
    printButton: {
        marginLeft: 2 * theme.spacing.unit,
        boxShadow: theme.shadows[4],
        '&:hover': {
            boxShadow: theme.shadows[8],
        }
    },
});


const mapStateToProps = state => ({
    settings: getReportSettings(state),
    settingsModalOpen: getReportSettingsModalOpen(state),
    filter: getStudentenFilter(state),
    getVeranstaltungenForFach: getVeranstaltungenForFach(state),
    getGradesForStudentAndSubjectCourse: getGradesForStudentAndSubjectCourse(state),
    getPunkteForVeranstaltungAndStudent: getPunkteForVeranstaltungAndStudent(state),
    getFaecherDataForUEAndSemester: getFaecherDataForUEAndSemester(state),
    getStudyCourseById: getStudyCourseById(state),
    subjects: getSubjects(state),
    subjectsGrouped: getFaecherGroupedByTyp(state),
});

export default connect(mapStateToProps, {
    setSettings,
    openSettingsModal,
})(withStyles(styles)(StudentPrintMenu));
