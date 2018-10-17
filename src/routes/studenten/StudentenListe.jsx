import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import Toolbar from '@material-ui/core/Toolbar';
import MailIcon from '@material-ui/icons/MailOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import PrintIcon from '@material-ui/icons/PrintOutlined';
import AddIcon from '@material-ui/icons/Add';
import CloudDownloadIcon from '@material-ui/icons/CloudDownloadOutlined';

import exportToCSV from '../../helper/exportToCSV';
import { translateStudienkurse, translateStudyStatus } from '../../helper/helper';
import HiddenDivider from '../../components/HiddenDivider';
import Placeholder from '../../components/placeholder/Placeholder';

import StudentenFilter from './components/StudentenFilter';
import StudentPrintMenu from './components/StudentPrintMenu';
import { getFilteredStudenten, getStudentenFetching } from './redux/studentenSelectors';
import { fetchStudenten } from './redux/studentenActions';


const StudentenlisteLoading = () => (
    <Placeholder>
        <Placeholder.Item height='2.5rem' />
        <Placeholder.Item height='2rem' width='70%' />
        <Placeholder.Item height='2rem' width='60%' />
        <Placeholder.Item height='2rem' width='90%' />
        <Placeholder.Item height='2rem' width='80%' />
    </Placeholder>
);


const SelectableTableHead = withStyles(theme => ({
    tableHeadCell: {
        color: theme.palette.primary.main,
        borderBottom: `2px solid ${theme.palette.primary.main}`,
        whiteSpace: 'nowrap'
    },
}))(({ numSelected, rowCount, columns, onSelectAllClick, classes }) => {
    return (
        <TableHead>
            <TableRow>
                <TableCell
                    className={classes.tableHeadCell}
                    padding='checkbox'
                    aria-checked={numSelected === rowCount}
                    onClick={onSelectAllClick}
                >
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={numSelected === rowCount}
                        color='primary'
                    />
                </TableCell>
                {columns.map(column => (
                    <TableCell
                        key={column.id}
                        style={{ width: column.width }}
                        className={classes.tableHeadCell}
                        padding={column.padding ? column.padding : 'default'}
                    >
                        {column.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
});


const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.primary.main,
    },
    actions: {
        marginLeft: 'auto',
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
});
  
let EnhancedTableToolbar = (props) => {
    const { numSelected, classes, selectedStudents } = props;

    function mailDistributor() {
        return selectedStudents
            .map(student => {
                const { mailUni, mailPrivate } = student.studentInformations[0];
                return mailUni ? mailUni :
                    mailPrivate ? mailPrivate : null;
            })
            .join(';');
    }
  
    return (
        <Toolbar
            className={classNames(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            <div className={classes.title}>
                {numSelected > 0 ? (
                    <Typography color="inherit" variant="subheading">
                        {numSelected} Studenten ausgewählt
                    </Typography>
                ) : (
                    <Typography variant="title" id="tableTitle">
                        Studenten
                    </Typography>
                )}
            </div>
            <div className={classes.actions}>
                {numSelected > 0 && (
                    <>
                        <a href={`mailto:${mailDistributor()}`}>
                            <IconButton
                                aria-label='Mail'
                                title={`E-Mail an ${numSelected} Studenten senden`}
                            >
                                <MailIcon style={{color: '#fff'}} />
                            </IconButton>
                        </a>
                        <IconButton
                            aria-label='Print'
                            title={`Berichte für ${numSelected} Studenten drucken`}
                        >
                            <PrintIcon style={{color: '#fff'}} />
                        </IconButton>
                        <IconButton
                            aria-label='Delete'
                            title={`${numSelected} Studenten löschen`}
                        >
                            <DeleteIcon style={{color: '#fff'}} />
                        </IconButton>
                    </>
                )}
            </div>
        </Toolbar>
    );
}
  
EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
};
  
EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);


class StudentenListe extends Component {
    state = {
        selected: []
    }

    componentDidMount() {
        // this.props.fetchStudenten();
        this.props.dispatch({
            type: 'FETCH_STUDENTEN',
            request: {
                url: '/students?_embed=studies&_embed=studentInformations&_sort=lastName,firstName,matrikelnummer,id'
            }
        });
    }
    
    handleSelection = (e, studentId) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(studentId);
        let newSelected = [];
    
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, studentId);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
    
        this.setState({ selected: newSelected });
    };

    handleSelectAll = (e) => {
        if (e.target.checked) {
            this.setState({
                selected: this.props.filteredStudenten.map(
                    student => student.id
                )
            });
          return;
        }
        this.setState({ selected: [] });
    }

    isSelected = (studentId) => this.state.selected.includes(studentId);

    selectedStudents() {
        return this.props.filteredStudenten.filter(student => (
            this.state.selected.includes(student.id)
        ));
    }


    goToDetails = (id) => {
        this.props.history.push(`studenten/${id}`)
    }

    exportPDF = () => {
        const data = this.props.filteredStudenten.map(student => {
            const { studies, studentInformations, ...studentData } = student;
            return Object.assign({}, studentData, studies[0], studentInformations[0]);
        });
        exportToCSV(data);
    }

    columns = [
        {id: 'matrikelnummer', width: '1', label: 'Matr.-Nr.' },
        {id: 'firstName', width: '1', label: 'Vorname' },
        {id: 'lastName', width: '1', label: 'Nachname' },
        {id: 'studyCourse', width: '1', label: 'Studienkurs' },
        {id: 'mail', width: '1', label: '', padding: 'checkbox' }
    ]

    renderStudenten() {
        const { filteredStudenten, classes } = this.props;
        return filteredStudenten.length
            ? filteredStudenten.map(student => {
                const isSelected = this.isSelected(student.id);
                return (
                    <TableRow
                        key={student.id}
                        className={classes.row}
                        hover
                        tabIndex={-1}
                        selected={isSelected}
                    >
                        <TableCell
                            role='checkbox'
                            aria-checked={isSelected}
                            onClick={e => this.handleSelection(e, student.id)}
                            padding='checkbox'
                        >
                            <Checkbox
                                color='primary'
                                checked={isSelected}
                            />
                        </TableCell>
                        <TableCell onClick={() => this.goToDetails(student.id)}>{student.matrikelnummer}</TableCell>
                        <TableCell onClick={() => this.goToDetails(student.id)}>{student.firstName}</TableCell>
                        <TableCell onClick={() => this.goToDetails(student.id)}>{student.lastName}</TableCell>
                        <TableCell onClick={() => this.goToDetails(student.id)}>
                            {student.studies.map(study => (
                                <div key={`${study.studentId}_${study.studyCourseId}}`}>
                                    {translateStudienkurse(study.studyCourseId)}{' '}
                                    {study.year}{' '}
                                    ({translateStudyStatus(study.status)})
                                </div>
                            ))}
                        </TableCell>
                        <TableCell padding='checkbox'>
                            <a href={`mailto:${student.studentInformations[0].mailUni}`}>
                                <IconButton aria-label='E-Mail' title={`E-Mail an ${student.studentInformations[0].mailUni}`}>
                                    <MailIcon />
                                </IconButton>
                            </a>
                        </TableCell>
                    </TableRow>
                );
              })
            : (
                <TableRow>
                    <TableCell colSpan={4}>Keine Studenten gefunden</TableCell>
                </TableRow>
              );
    }

    studentenOptions() {
        return this.props.filteredStudenten.map(s => (
            { value: s.id, label: s.firstName }
        ));
    }

    render() {
        const { fetching, classes } = this.props;
        return fetching ? <StudentenlisteLoading /> :  (
            <div>
                <div className={classes.flexbox}>
                    <Typography variant="display1">
                        Studentenliste
                    </Typography>
                    <div className={classes.actionContainer}>
                        <StudentPrintMenu ButtonComponent={
                            <IconButton title='PDF herunterladen oder drucken'>
                                <PrintIcon />
                            </IconButton>
                        } />
                        <IconButton onClick={this.exportPDF} title='CSV-/Excel-Datei herunterladen'>
                            <CloudDownloadIcon />
                        </IconButton>
                        <IconButton title='Student hinzufügen'>
                            <AddIcon />
                        </IconButton>
                    </div>
                </div>
                <HiddenDivider height={2} />
                <StudentenFilter />
                <HiddenDivider height={2} />
                <Paper className={classes.tablePaper}>
                    <EnhancedTableToolbar
                        numSelected={this.state.selected.length}
                        selectedStudents={this.selectedStudents()}
                    />
                    <Table>
                        <SelectableTableHead
                            columns={this.columns}
                            onSelectAllClick={this.handleSelectAll}
                            numSelected={this.state.selected.length}
                            rowCount={this.props.filteredStudenten.length}
                        />
                        <TableBody>
                            {this.renderStudenten()}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    };
}

const styles = theme => ({
    flexbox: {
        display: 'flex',
        alignItems: 'center',
    },
    actionContainer: {
        display: 'flex',
        marginLeft: 'auto',
    },
    row: {
        cursor: 'pointer'
    },
    inputField: {
        margin: theme.spacing.unit
    },
    paper: {
        padding: 2 * theme.spacing.unit
    },
    tablePaper: {
        position: 'relative'
    },
    printMenuButton: {
        position: 'absolute',
        bottom: 4 * theme.spacing.unit,
        right: 4 * theme.spacing.unit,
        zIndex: 1,
        boxShadow: theme.shadows[6],
        '&:hover': {
            boxShadow: theme.shadows[12],
        }
    },
    link: {
        textDecoration: 'none'
    },
    leftIcon: {
        marginRight: theme.spacing.unit
    }
});

const mapStateToProps = state => ({
    filteredStudenten: getFilteredStudenten(state),
    fetching: getStudentenFetching(state),
});

const mapDispatchToProps = {
    fetchStudenten,
    dispatch: action => action
}

export default connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles)(StudentenListe)
);
