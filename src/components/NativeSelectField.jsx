import React, { Component } from 'react';

import NativeSelect from '@material-ui/core/NativeSelect';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

class Field extends Component {
    shouldComponentUpdate(nextProps) {
        return (
            (nextProps.value !== this.props.value) ||
            (nextProps.disabled !== this.props.disabled) ||
            (nextProps.required !== this.props.required) ||
            (nextProps.label !== this.props.label)
        );
    }
    
    render() {
        const { rootProps, labelProps, name, options, ...selectProps } = this.props;
        return (
            <FormControl {...rootProps}>
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

export default Field;
