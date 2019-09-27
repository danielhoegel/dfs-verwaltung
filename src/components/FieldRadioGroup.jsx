import React from 'react';
import cn from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';

import { isNotEmpty } from '../helper/helper';

const FieldRadioGroup = ({
    name,
    value,
    label,
    onChange,
    options,
    inline,
    classes,
    width,
    style,
    className,
    color,
    required,
    disabled,
    labelProps,
    radioProps,
    ...radioGroupProps
}) => {
    function generateRadios() {
        if (isNotEmpty(options)) {
            return options.map(option => {
                const { value, label, disabled } = (typeof option === 'string')
                    ? { value: option, label: option, disabled: false }
                    : option;
                return (
                    <FormControlLabel
                        key={value}
                        control={<Radio color={color} />}
                        value={value}
                        label={label}
                        disabled={disabled}
                        classes={{ label: classes.radioLabel }}
                        {...radioProps}
                    />
                );
            });
        }
        return null;
    }

    return (
        <FormControl
            component='fieldset'
            className={cn(classes.field, className)}
            style={{ flex: width, ...style }}
        >
            <FormLabel
                component='legend'
                className={classes.label}
                required={required}
                {...labelProps}
            >
                {label}
            </FormLabel>
            <RadioGroup
                aria-label={label}
                name={name}
                value={value.toString()}
                onChange={onChange}
                row={inline}
                required={required}
                {...radioGroupProps}
            >
                {generateRadios()}
            </RadioGroup>
        </FormControl>
    );
};

const styles = theme => ({
    field: {
        margin: theme.spacing.unit,
        userSelect: 'none',
    },
    label: {
        fontSize: '0.75rem',
    },
    radioLabel: {
        fontSize: '1rem',
    },
});

FieldRadioGroup.defaultProps = {
    width: 1,
    color: 'primary',
    inline: true,
};

export default withStyles(styles)(FieldRadioGroup);
