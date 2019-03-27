import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import cn from 'classnames';

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
            (nextProps.width !== this.props.width) ||
            (nextProps.style !== this.props.style) ||
            (nextProps.className !== this.props.className) ||
            (nextProps.children !== this.props.children)
        );
    }

    render() {
        const { width, style, classes, className, ...textFieldProps } = this.props;
        return (
            <TextField
                className={cn(classes.textField, className)}
                style={{ flex: width, ...style }}
                {...textFieldProps}
            />
        );
    }
}

const styles = theme => ({
    textField: {
        margin: theme.spacing.unit,
        userSelect: 'none',
        width: '100%',
    },
});

Field.defaultProps = {
    width: 1
};

export default withStyles(styles)(Field);
