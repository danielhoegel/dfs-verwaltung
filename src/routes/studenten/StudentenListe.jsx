import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Placeholder from '../../components/placeholder/Placeholder';
import { FilterContextConsumer } from '../../components/filter/FilterContext';
import { translateStudienkurse } from '../../helper/helper';
import apiRequest from '../../helper/apiRequest';
import StudentenFilter from './components/StudentenFilter';


const StudentenlisteLoading = () => (
    <Placeholder>
        <Placeholder.Item height='2.5rem' />
        <Placeholder.Item height='2rem' width='70%' />
        <Placeholder.Item height='2rem' width='60%' />
        <Placeholder.Item height='2rem' width='90%' />
        <Placeholder.Item height='2rem' width='80%' />
    </Placeholder>
)

class StudentenListe extends Component {
    state = {
        studenten: []
    }
    
    componentDidMount() {
        apiRequest('/studenten').then(studenten =>
            this.setState({ studenten })
        );
    }
    

    goToDetails = (id) => {
        this.props.history.push(`studenten/${id}`)
    }

    render() {
        const { classes } = this.props;
        return (
            <FilterContextConsumer>
                {({ filter }) => (
                    this.state.studenten.length ? (
                        <div>
                            <div style={{marginBottom: '1rem'}}>
                                <StudentenFilter />
                            </div>
                            <Paper>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className={classes.head} style={{widTableCell: '10%'}}>ID</TableCell>
                                            <TableCell className={classes.head}>Name</TableCell>
                                            <TableCell className={classes.head} style={{width: '25%'}}>Studienkurs</TableCell>
                                            <TableCell className={classes.head} style={{width: '15%'}}>Jahrgang</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.studenten
                                            .filter(student => (
                                                (!filter.jahrgang || parseInt(filter.jahrgang, 10) === student.jahrgang) &&
                                                (!filter.studienkurs || filter.studienkurs === student.studienkurs) &&
                                                (!filter.student || student.name.toLocaleLowerCase().indexOf(filter.student.toLocaleLowerCase()) !== -1)
                                            ))
                                            .map(student => (
                                                <TableRow
                                                    key={student.id}
                                                    onClick={() => this.goToDetails(student.id)}
                                                    className={classes.row}
                                                    hover
                                                >
                                                    <TableCell>{student.id}</TableCell>
                                                    <TableCell>{student.name}</TableCell>
                                                    <TableCell>{translateStudienkurse(student.studienkurs)}</TableCell>
                                                    <TableCell>{student.jahrgang}</TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </Paper>
                        </div>
                    ) : <StudentenlisteLoading />
                )}
            </FilterContextConsumer>
        );
    }
}

const styles = theme => ({
    head: {
        color: theme.palette.primary.main,
        borderBottom: `2px solid ${theme.palette.primary.main}`
    },
    row: {
        cursor: 'pointer'
    }
});

export default withStyles(styles)(StudentenListe);
