import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';

import { withStyles } from '@material-ui/core/styles';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import CloseIcon from '@material-ui/icons/Close';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';


function NoOptionsMessage({ innerProps, children, selectProps: { classes } }) {
    return (
        <Typography
            variant='body2'
            color="textSecondary"
            className={classes.noOptionsMessage}
            {...innerProps}
        >
            {children}
        </Typography>
    );
}

const IndicatorSeparator = () => null;

function DropdownIndicator({ innerProps, selectProps: { classes } }){
    return (
        <div {...innerProps} className={classes.dropdownIndicator} >
            <ArrowDropDownIcon />
        </div>
    );
}

function ClearIndicator({ innerProps, selectProps }) {
    return (
        <div {...innerProps} className={selectProps.classes.clearIndicator} >
            <CloseIcon />
        </div>
    );
}

function inputComponent({ shrink, inputRef, ...props }) {
    return <div ref={inputRef} {...props} />;
}

function Control({
    innerProps,
    innerRef,
    children,
    selectProps: { classes, label, textFieldProps }
}) {
    return (
        <TextField
            fullWidth
            label={label}
            InputLabelProps={{ shrink: true }}
            InputProps={{
                inputComponent,
                inputProps: {
                    className: classes.input,
                    inputRef: innerRef,
                    children: children,
                    shrink: true,
                    ...innerProps,
                },
            }}
            {...textFieldProps}
        />
    );
}

function formatLabel(label, inputValue) {
    if (inputValue.length > 0) {
        const startIndex = label.toLowerCase().indexOf(inputValue.toLowerCase());
        const matchingPart = label.slice(startIndex, startIndex + inputValue.length);
        const beforePart = label.slice(0, startIndex);
        const afterPart = label.slice(startIndex + inputValue.length);
        return (
            <Fragment>
                {beforePart}
                <strong>{matchingPart}</strong>
                {afterPart}
            </Fragment>
        );
    }
    return label;
};

function Option({
    innerRef,
    isFocused,
    isSelected,
    innerProps,
    children,
    selectProps
}) {
    return (
        <MenuItem
            buttonRef={innerRef}
            selected={isFocused}
            component="div"
            style={{
                fontWeight: isSelected ? 500 : 400,
            }}
            {...innerProps}
        >
            {formatLabel(children, selectProps.inputValue)}
        </MenuItem>
    );
}

function Placeholder({ innerProps, children, selectProps: { classes }}) {
    return (
        <Typography
            variant='body2'
            color="textSecondary"
            className={classes.placeholder}
            {...innerProps}
        >
            {children}
        </Typography>
    );
}

function SingleValue({ innerProps, children, selectProps: { classes }}) {
    return (
        <Typography variant='body2' className={classes.singleValue} {...innerProps}>
            {children}
        </Typography>
    );
}

function ValueContainer({ children, selectProps: { classes }}) {
    return (
        <div className={classes.valueContainer}>
            {children}
        </div>
    );
}

function MultiValue({ removeProps, isFocused, children, selectProps: { classes } }) {
    return (
        <Chip
            tabIndex={-1}
            label={children}
            className={classNames(classes.chip, {
                [classes.chipFocused]: isFocused,
            })}
            onDelete={removeProps.onClick}
            deleteIcon={<CancelIcon {...removeProps} />}
        />
    );
}

function Menu({ innerProps, children, selectProps: { classes } }) {
    return (
        <Paper className={classes.paper} elevation={8} {...innerProps}>
            {children}
        </Paper>
    );
}

const _components = {
    Control,
    Menu,
    MultiValue,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
    DropdownIndicator,
    ClearIndicator,
    IndicatorSeparator
};

const Autocomplete = ({
    classes,
    theme,
    options,
    onChange,
    isMulti,
    closeMenuOnSelect,
    value,
    style,
    ...props
}) => {
    const selectStyles = {
        container: base => ({
            ...base,
            ...style,
            backgroundColor: 'blue',
            padding: '10px'
        }),
        input: base => ({
            ...base,
            color: theme.palette.text.primary,
            '& input': {
                font: 'inherit',
            },
        }),
        menuList: base => ({
            ...base,
            maxHeight: '180px',
        }),
    };

    const _options = options.map(option => option.label
        ? option
        : { value: option.value, label: option.value }
    );

    const _closeMenuOnSelect = closeMenuOnSelect !== undefined
        ? closeMenuOnSelect
        : !isMulti;

    const _value = () => {
        return options.filter(option => option.value === value)[0];
    };

    const handleChange = (option) => {
        const fakeEvent = {
            target: {
                name: props.name,
                value: option ? option.value : '',
            }
        };
        onChange(fakeEvent);
    }

    // NoSsr = no server side rendering -> disables Ssr for this compnent
    return (
        <NoSsr>
            <Select
                classes={classes}
                styles={{selectStyles}}
                options={_options}
                components={_components}
                onChange={handleChange}
                isMulti={isMulti}
                closeMenuOnSelect={_closeMenuOnSelect}
                value={_value()}
                theme={{ borderRadius: '30px', spacing: { controlHeight: '60px'}}}
                {...props}
            />
        </NoSsr>
    );
};

Autocomplete.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]).isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]).isRequired,
        label: PropTypes.oneOfType([
            PropTypes.number,
                PropTypes.string,
                PropTypes.func,
            ]),
    })).isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    name: PropTypes.string.isRequired,
    isMulti: PropTypes.bool,
    closeMenuOnSelect: PropTypes.bool,
    isClearable: PropTypes.bool,
    style: PropTypes.object,
};

Autocomplete.defaultProps = {
    isMulti: false,
    isClearable: false,
    placeholder: 'Suchen...'
};

const styles = theme => ({
    input: {
        display: 'flex',
        padding: 0,
        '& p': {
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            maxWidth: 'calc(100% - 6px)' // 100 - (marginL + marginR + width of actual input)
        }
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    chipFocused: {
        backgroundColor: emphasize(
            theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
            0.08,
        ),
    },
    noOptionsMessage: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    singleValue: {
        fontSize: 16,
    },
    placeholder: {
        position: 'absolute',
        left: 2,
        fontSize: 16,
    },
    paper: {
        position: 'absolute',
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
        zIndex: 2,
        width: 'auto',
        minWidth: '100%',
        maxWidth: '200%',
        overflow: 'hidden'
    },
    dropdownIndicator: {
        cursor: 'pointer',
        padding: 0.5 * theme.spacing.unit,
        paddingLeft: 0,
        display: 'flex',
        alignItems: 'center',
        color: 'rgba(0, 0, 0, 0.54)',
    },
    clearIndicator: {
        cursor: 'pointer',
        padding: 0.5 * theme.spacing.unit,
        paddingRight: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgba(0, 0, 0, 0.54)',
        height: `calc(24px + ${theme.spacing.unit}px)`,
        width: `calc(24px + ${theme.spacing.unit}px)`,
        '& svg': {
            fontSize: '18px',
        }
    },
});

export default withStyles(styles, { withTheme: true })(Autocomplete);
