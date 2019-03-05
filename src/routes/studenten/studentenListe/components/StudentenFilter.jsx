import React from 'react';
import { connect } from 'react-redux';

import { withStyles} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CloseIcon from '@material-ui/icons/Close';

import { getFullStudents, getStudyCourseById } from '../../../../redux/entitiesSelector';
import { getStudentenFilter } from '../../redux/studentenSelectors';
import { filterStudenten, resetStudentenFilter } from '../../redux/studentenActions';
import { translateStudyStatus } from '../../../../helper/helper';


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

const SelectFilter = withStyles(selectFilterStyles)(({
    classes,
    name,
    label,
    onChange,
    value,
    defaultLabel,
    options,
}) => (
    <FormControl className={classes.formControl}>
        <InputLabel shrink htmlFor={name}>
            {label}
        </InputLabel>
        <Select
            onChange={onChange}
            value={value}
            name={name}
            inputProps={{ name: name, id: name }}
            displayEmpty
        >
            <MenuItem value='' className={classes.denseItem}>
                <em>{defaultLabel ? defaultLabel : `Alle ${label}`}</em>
            </MenuItem>
            <Divider />
            {options.map(option =>
                <MenuItem key={option.value} value={option.value} >
                    {option.label}
                </MenuItem>
            )}
        </Select>
    </FormControl>
));


function multipleRenderValue(selected) {
    if (selected.every(item => !isNaN(item))) {
        const sorted = selected.sort((a, b) => Number(a) - Number(b));
        let res;
        for (let i = 0; i < sorted.length; i++) {
            const item = sorted[i];
            if (i === 0) res = item;
            else if (Number(item) - 1 === Number(sorted[i - 1])) {
                if (i < sorted.length - 1) continue;
                else res += ` - ${item}`;
            } else {
                res += (i > 1)
                    ? ` - ${sorted[i - 1]}, ${item}`
                    : `, ${item}`; 
            };
        }
        return res;
    }
    return selected.join(', ');
}


const multipleSelectFilterStyles = theme => ({
    ...selectFilterStyles(theme),
    checkboxItem: {
        paddingLeft: 0,
    },
    menuList: {
        maxHeight: 40 * theme.spacing.unit
    }
});

const MultipleSelectFilter = withStyles(multipleSelectFilterStyles)(({
    classes,
    name,
    label,
    defaultLabel,
    onChange,
    value,
    options,
}) => (
    <FormControl className={classes.formControl}>
        <InputLabel shrink htmlFor={name}>
            {label}
        </InputLabel>
        <Select
            onChange={onChange}
            value={value}
            name={name}
            inputProps={{ id: name, name }}
            displayEmpty
            multiple
            renderValue={multipleRenderValue}
            MenuProps={{
                MenuListProps: {
                    className: classes.menuList
                }
            }}
        >
            <MenuItem disabled className={classes.denseItem}>
                <em>{defaultLabel ? defaultLabel : `${label}`}</em>
            </MenuItem>
            <Divider />
            {options.map(option =>
                <MenuItem key={option.value} value={option.value} className={classes.checkboxItem}>
                    <Checkbox checked={value.includes(option.value)} color='primary' />
                    <ListItemText primary={option.label} />
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
    getStudyCourseById,
}) => {
    const changeHandler = ({ target }) => {
        console.log('onChange', target);
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
                { value: stuyCourse, label: getStudyCourseById(stuyCourse).title }
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
                { value: year, label: `${year}` }
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
            <MultipleSelectFilter
                name='year'
                label='Jahrgänge'
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
    studenten: getFullStudents(state),
    filter: getStudentenFilter(state),
    getStudyCourseById: getStudyCourseById(state)
});

export default connect(mapStateToProps, { filterStudenten, resetStudentenFilter })(
    withStyles(styles)(StudentenFilter)
);
