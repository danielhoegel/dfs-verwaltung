import React from 'react';
import { connect } from 'react-redux';

import { withStyles} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CloseIcon from '@material-ui/icons/Close';

import { getStudenten, getStudentenFilter } from '../../redux/studentenSelectors';
import { filterStudenten, resetStudentenFilter } from '../../redux/studentenActions';
import { translateStudienkurse, translateStudyStatus } from '../../../../helper/helper';


const selectFilterStyles = theme => ({
    formControl: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        minWidth: 180, 
    },
    denseItem: {
        paddingTop: 0.75 * theme.spacing.unit,
        paddingBottom: 0.75 * theme.spacing.unit,
    }
});

const SelectFilter = withStyles(selectFilterStyles)(props => (
    <FormControl className={props.classes.formControl}>
        <InputLabel shrink htmlFor={props.name}>
            {props.label}
        </InputLabel>
        <Select
            onChange={props.onChange}
            value={props.value}
            name={props.name}
            inputProps={{ name: props.name, id: props.name }}
            displayEmpty
        >
            <MenuItem value='' className={props.classes.denseItem}>
                <em>{props.defaultLabel ? props.defaultLabel : `Alle ${props.label}`}</em>
            </MenuItem>
            <Divider />
            {props.options.map(option =>
                <MenuItem key={option.value} value={option.value} >
                    {option.label}
                </MenuItem>
            )}
        </Select>
    </FormControl>
));


const StudentenFilter = ({
    classes,
    studenten,
    filter,
    filterStudenten,
    resetStudentenFilter,
}) => {
    const changeHandler = ({ target }) => {
        filterStudenten(target.name, target.value);
    };

    const studienkursOptions = () => {
        const stuyCourses = [];
        studenten.forEach(student => {
            if (student.studies) {
                student.studies.forEach(study => {
                    stuyCourses.push(study.studyCourseId);
                });
            }
        });

        return [...new Set(stuyCourses)]
            .map(stuyCourse => (
                { value: stuyCourse, label: translateStudienkurse(stuyCourse) }
            ));
    };

    const jahrgangOptions = () => {
        const years = [];
        studenten.forEach(student => {
            if (student.studies) {
                student.studies.forEach(study => {
                    years.push(study.year);
                });
            }
        });

        return [...new Set(years)]
            .sort()
            .reverse()
            .map(year => (
                { value: year, label: `Jahrgang ${year}` }
            ));
    };

    const studyStatusOptions = () => {
        const statuses = [];
        studenten.forEach(student => {
            if (student.studies) {
                student.studies.forEach(study => {
                    statuses.push(study.status);
                });
            }
        });

        return [...new Set(statuses)]
            .map(status => (
                { value: status, label: translateStudyStatus(status) }
            ));
    };

    return (
        <div className={classes.container}>
            <SelectFilter
                name='studyCourse'
                label='Studienkurs'
                defaultLabel='Alle Studienkurse'
                value={filter.studyCourse}
                options={studienkursOptions()}
                onChange={changeHandler}
            />
            <SelectFilter
                name='status'
                label='Status'
                defaultLabel='Alle Status'
                value={filter.status}
                options={studyStatusOptions()}
                onChange={changeHandler}
            />
            <SelectFilter
                name='year'
                label='Jahrgang'
                defaultLabel='Alle Jahrgänge'
                value={filter.year}
                options={jahrgangOptions()}
                onChange={changeHandler}
            />
            {Object.values(filter).some(filterValue => filterValue) && (
                <Tooltip title='Filter zurücksetzen'>
                    <IconButton
                        onClick={resetStudentenFilter}
                        arial-label='Filter zurücksetzen'
                        className={classes.iconButton}
                    >
                        <CloseIcon />
                    </IconButton>
                </Tooltip>
            )}
        </div>
    );
};

const styles = theme => ({
    container: {
        display: 'flex',
        alignItems: 'flex-end'
    },
    iconButton: {
        // padding: 0.5 * theme.spacing.unit
    }
});

const mapStateToProps = state => ({
    studenten: getStudenten(state),
    filter: getStudentenFilter(state)
});

export default connect(mapStateToProps, { filterStudenten, resetStudentenFilter })(
    withStyles(styles)(StudentenFilter)
);
