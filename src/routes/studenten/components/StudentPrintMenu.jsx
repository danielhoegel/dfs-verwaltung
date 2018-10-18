import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import Button from '@material-ui/core/Button';
import PrintIcon from '@material-ui/icons/PrintOutlined';
import MenuItem from '@material-ui/core/MenuItem';

import { getFilteredStudenten, getStudentenFilter } from '../redux/studentenSelectors';

import Printing from '../../../components/Printing';
import DropdownMenu from '../../../components/DropdownMenu';

import StudentListReport from '../../../reports/studentList/StudentListReport';
import studentListReportStyles from '../../../reports/studentList/studentListReportStyles';
import LESBListReport from '../../../reports/lesbList/LESBListReport';
import lesbListReportStyles from '../../../reports/lesbList/lesbListReportStyles';
import ErgebnisseReport from '../../../reports/ergebnisse/ErgebnisseReport';
import ergebnisseReportStyles from '../../../reports/ergebnisse/ergebnisseReportStyles';


const StudentPrintMenu = ({ style, className, ButtonComponent, classes, ...props }) => {
    return (
        <DropdownMenu
            button={ButtonComponent ||
                <Button
                    variant='fab'
                    className={classNames(classes.printButton, className)}
                    title='Drucken oder als PDF speichern'
                    style={style}
                    color='primary'
                >
                    <PrintIcon />
                </Button>
            }
        >
            <Printing
                component={<StudentListReport students={props.filteredStudenten} filter={props.filter} />}
                styles={studentListReportStyles}
                fileName='Studentenliste'
                orientation='landscape'
            >
                <MenuItem>Studentenliste</MenuItem>
            </Printing>
            <Printing
                component={<LESBListReport students={props.filteredStudenten} filter={props.filter} />}
                styles={lesbListReportStyles}
                fileName='LESB-Liste'
                orientation='portrait'
                >
                <MenuItem>LESB-Liste</MenuItem>
            </Printing>
            <Printing
                component={<ErgebnisseReport students={props.filteredStudenten} filter={props.filter} />}
                styles={ergebnisseReportStyles}
                fileName='Prüfungsergebnisse'
                orientation='portrait'
                >
                <MenuItem>Prüfungsergebnisse</MenuItem>
            </Printing>
        </DropdownMenu>
    );
};

const styles = theme => ({
    printButton: {
        marginLeft: 2 * theme.spacing.unit,
        boxShadow: theme.shadows[4],
        '&:hover': {
            boxShadow: theme.shadows[8],
        }
    },
})

const mapStateToProps = state => ({
    filteredStudenten: getFilteredStudenten(state),
    filter: getStudentenFilter(state)
});

export default connect(mapStateToProps)(
    withStyles(styles)(StudentPrintMenu)
);