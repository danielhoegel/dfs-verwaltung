import React, { Component } from 'react';
import cn from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

class NativeSelectField extends Component {
    shouldComponentUpdate(nextProps) {
        return (
            (nextProps.value !== this.props.value) ||
            (nextProps.disabled !== this.props.disabled) ||
            (nextProps.required !== this.props.required) ||
            (nextProps.label !== this.props.label) ||
            (nextProps.width !== this.props.width) ||
            (nextProps.style !== this.props.style) ||
            (nextProps.className !== this.props.className)
        );
    }

    render() {
        const { rootProps, labelProps, name, options, width, className, style, classes, ...selectProps } = this.props;
        return (
            <FormControl
                className={cn(classes.textField, className)}
                style={{ flex: width, ...style }}
                {...rootProps}
            >
                <InputLabel shrink htmlFor={name} {...labelProps}>
                    {this.props.label}
                </InputLabel>
                <NativeSelect inputProps={{ name, id: name }} {...selectProps}>
                    {options}
                </NativeSelect>
            </FormControl>
        );
    }
}

const styles = theme => ({
    textField: {
        margin: theme.spacing.unit,
    },
});

NativeSelectField.defaultProps = {
    width: 1
};

export default withStyles(styles)(NativeSelectField);
