import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import HiddenDivider from '../../components/HiddenDivider';
import Placeholder from '../../components/placeholder/Placeholder';
import { translateStudienkurse, translateStudyStatus } from '../../helper/helper';
import StudentenFilter from './components/StudentenFilter';
import { fetchStudenten } from './redux/studentenActions';
import { getFilteredStudenten, getStudentenFetching } from './redux/studentenSelectors';


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
    componentDidMount() {
        // this.props.fetchStudenten();
        this.props.dispatch({
            type: 'FETCH_STUDENTEN',
            request: {
                url: '/students?_embed=studies'
            }
        });
    }    

    goToDetails = (id) => {
        this.props.history.push(`studenten/${id}`)
    }

    renderStudenten() {
        const { filteredStudenten, classes } = this.props;
        return filteredStudenten.length
            ? filteredStudenten.map(student => (
                <TableRow
                    key={student.id}
                    onClick={() => this.goToDetails(student.id)}
                    className={classes.row}
                    hover
                >
                    <TableCell>{student.matrikelnummer}</TableCell>
                    <TableCell>{student.firstName}</TableCell>
                    <TableCell>{student.lastName}</TableCell>
                    <TableCell>
                        {student.studies.map(study => (
                            <div key={`${study.studentId}_${study.studyCourseId}}`}>
                                {translateStudienkurse(study.studyCourseId)}{' '}
                                {study.year}{' '}
                                ({translateStudyStatus(study.status)})
                            </div>
                        ))}
                    </TableCell>
                </TableRow>
            ))
            :  (
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
                <Typography variant="display1" gutterBottom>
                    Studentenliste
                </Typography>

                <StudentenFilter />
                <HiddenDivider height={2} />
                <HiddenDivider height={2} />
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.head} style={{width: '10%'}}>Matr.-Nr.</TableCell>
                                <TableCell className={classes.head} style={{width: '20%'}}>Vorname</TableCell>
                                <TableCell className={classes.head} style={{width: '25%'}}>Nachname</TableCell>
                                <TableCell className={classes.head} style={{width: '45%'}}>Studienkurs</TableCell>
                            </TableRow>
                        </TableHead>
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
    head: {
        color: theme.palette.primary.main,
        borderBottom: `2px solid ${theme.palette.primary.main}`,
        whiteSpace: 'nowrap'
    },
    row: {
        cursor: 'pointer'
    },
    inputField: {
        margin: theme.spacing.unit
    }
});

const mapStateToProps = state => ({
    filteredStudenten: getFilteredStudenten(state),
    fetching: getStudentenFetching(state)
});

export default connect(mapStateToProps, { fetchStudenten, dispatch: action => action })(
    withStyles(styles)(StudentenListe)
);
