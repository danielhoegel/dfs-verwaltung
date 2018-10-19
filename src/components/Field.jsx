import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';

class Field extends Component {
    shouldComponentUpdate(nextProps) {
        return (
            (nextProps.value !== this.props.value) ||
            (nextProps.disabled !== this.props.disabled) ||
            (nextProps.required !== this.props.required) ||
            (nextProps.max !== this.props.max) ||
            (nextProps.min !== this.props.min) ||
            (nextProps.label !== this.props.label) ||
            (nextProps.children !== this.props.children)
        );
    }
    
    render() {
        return (
            <TextField {...this.props} />
        );
    }
}

export default Field;
