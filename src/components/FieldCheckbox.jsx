import React from 'react';
import cn from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel  from '@material-ui/core/FormControlLabel';

const FieldCheckbox = ({
    name,
    value,
    label,
    onChange,
    classes,
    width,
    style,
    className,
    labelProps,
    labelPlacement,
    color,
    ...checkboxProps
}) => {
    const handleChange = (e) => {
        const fakeEvent = { target: {
            name,
            value: Boolean(e.target.checked)
        }};
        onChange(fakeEvent);
    };
    
    return (
        <FormControlLabel
            className={cn(classes.field, className)}
            style={{ flex: width, ...style }}
            label={label}
            labelPlacement={labelPlacement}
            control={
                <Checkbox
                    onChange={handleChange}
                    value={name}
                    color={color}
                    {...checkboxProps}
                />
            }
            {...labelProps}
        />
    );
};

const styles = theme => ({
    field: {
        margin: theme.spacing.unit,
        userSelect: 'none'
    },
});

FieldCheckbox.defaultProps = {
    width: 1,
    color: 'primary',
    labelPlacement: 'end',
};

export default withStyles(styles)(FieldCheckbox);
