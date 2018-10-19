import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import exportToCSV from '../../../helper/exportToCSV';
import HiddenDivider from '../../../components/HiddenDivider';
import Placeholder from '../../../components/placeholder/Placeholder';

import StudentenActions from './components/StudentenActions';
import StudentenFilter from './components/StudentenFilter';
import StudentenTableToolbar from './components/StudentenTableToolbar';
import StudentenTableHead from './components/StudentenTableHead';
import StudentenRow from './components/StudentenRow';

import { getFilteredStudenten, getStudentenFetching } from '../redux/studentenSelectors';
import { fetchStudenten } from '../redux/studentenActions';


const StudentenlisteLoading = () => (
    <Placeholder>
        <Placeholder.Item height='2.5rem' />
        <Placeholder.Item height='2rem' width='70%' />
        <Placeholder.Item height='2rem' width='60%' />
        <Placeholder.Item height='2rem' width='90%' />
        <Placeholder.Item height='2rem' width='80%' />
    </Placeholder>
);


class StudentenListe extends Component {
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.filteredStudenten !== prevState.__filteredStudenten) {
            return { 
                selected: [],
                __filteredStudenten: nextProps.filteredStudenten
            };
        }
        return null;
    }

    state = {
        selected: []
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            (nextProps.filteredStudenten !== this.props.filteredStudenten) ||
            (nextProps.fetching !== this.props.fetching) ||
            (nextState.selected !== this.state.selected)

        );
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
            const { studentId, ...studentInformation } = studentInformations[0]
            return Object.assign({}, studentData, studentInformation);
        });
        exportToCSV(data);
    }

    columns = [
        {id: 'matrikelnummer', width: '10%', label: 'Matr.-Nr.' },
        {id: 'firstName', width: '15%', label: 'Vorname' },
        {id: 'lastName', width: '15%', label: 'Nachname' },
        {id: 'studyCourse', width: '50%', label: 'Studienkurs' },
        {id: 'mail', width: '5%', label: '', padding: 'checkbox' }
    ]

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
                        <StudentenActions exportPDF={this.exportPDF} />
                    </div>
                </div>
                <StudentenFilter />
               
                <HiddenDivider height={2} />
                <Paper className={classes.tablePaper}>
                    <StudentenTableToolbar
                        numSelected={this.state.selected.length}
                        selectedStudents={this.selectedStudents()}
                    />
                    <Table>
                        <StudentenTableHead
                            columns={this.columns}
                            onSelectAllClick={this.handleSelectAll}
                            numSelected={this.state.selected.length}
                            rowCount={this.props.filteredStudenten.length}
                        />
                        <TableBody>
                           {this.props.filteredStudenten.length
                                ? this.props.filteredStudenten.map(student =>
                                    <StudentenRow
                                        key={student.id}
                                        selected={this.isSelected(student.id)}
                                        student={student}
                                        handleSelection={this.handleSelection}
                                        goToDetails={this.goToDetails}
                                    />
                                )
                                : (
                                    <TableRow>
                                        <TableCell colSpan={6}>Keine Studenten gefunden</TableCell>
                                    </TableRow>
                                )
                            }
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
        alignItems: 'flex-start',
    },
    actionContainer: {
        display: 'flex',
        marginLeft: 'auto',
    },
    inputField: {
        margin: theme.spacing.unit
    },
    paper: {
        padding: 2 * theme.spacing.unit
    },
    tablePaper: {
        position: 'relative',
        overflowX: 'auto',
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

StudentenListe.propTypes = {
    filteredStudenten: PropTypes.array.isRequired,
    fetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles)(StudentenListe)
);
