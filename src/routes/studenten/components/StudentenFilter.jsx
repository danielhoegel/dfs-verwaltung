import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CloseIcon from '@material-ui/icons/Close';

import studentenData from '../../../data/studenten';
import { FilterContextConsumer } from '../../../components/filter/FilterContext';


class StudentenFilter extends Component {
    state = {
        studenten: studentenData,
        semester: 2
    }

    changeHandler = ({ target }) => {
        this.setState({
            [target.name]: target.value
        });
    }

    createStudent = () => {
        this.props.history.push('/studenten/create');
    }

    render() {
        const { classes } = this.props;
    
        const filterOptions = {
            semester: {
                label: 'Semester',
                options: [
                    { value: 1, label: '1. Semester' },
                    { value: 2, label: '2. Semester' },
                    { value: 3, label: '3. Semester' },
                    { value: 4, label: '4. Semester' },
                ]
            },
            studienkurs: {
                label: 'Studienkurse',
                options: [
                    {value: 1, label: 'Grundstudienkurs'},
                    {value: 2, label: 'Aufbaustudienkurs'},
                ]
            },
            jahrgang: {
                label: 'Jahrgang',
                options: [
                    ...[...new Set(this.state.studenten.map(s => s.jahrgang)) ].map(jahrgang => (
                        {value: jahrgang, label: `Jahrgang ${jahrgang}`}
                    ))
                ]
            }
        };
    
        return (
            <div className='filter-container'>
                <FilterContextConsumer>
                    {({ filter, change, reset }) => (
                        Object.values(filter).some(filterValue => filterValue) && (
                            <Tooltip title='Test244'>
                                <IconButton
                                    onClick={reset}
                                    arial-label='Filter zurücksetzen'
                                    tooltip='Filter zurücksetzen'
                                >
                                    <CloseIcon />
                                </IconButton>
                            </Tooltip>
                        ),
                        Object.entries(filter).map(([filterName, filterValue]) => 
                            filterOptions[filterName] && (
                                <TextField
                                    key={filterName}
                                    select
                                    label={filterOptions.label}
                                    className={classes.textField}
                                    value={filterValue}
                                    name={this.state.filterName}
                                    onChange={({ target: { name, value }}) => change(name, value)}
                                    SelectProps={{
                                        MenuProps: { className: classes.menu, },
                                    }}
                                    margin="normal"
                                >
                                    {filterOptions[filterName].options.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )
                        )
                    )} 
                </FilterContextConsumer>
            </div>
        );
    }
}

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
  });

export default withRouter(withStyles(styles)(StudentenFilter));
