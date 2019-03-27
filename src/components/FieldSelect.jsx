import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import MenuItem from '@material-ui/core/MenuItem';

import { isNotEmpty } from '../helper/helper';
import Field from './Field';

class FieldSelect extends Component {
    state = {
        open: false,
        hasFocus: false
    }

    generateMenuItems() {
        if (isNotEmpty(this.props.options)) {
            return this.props.options.map(option => {
                const { value, label } = (typeof option === 'string')
                    ? { value: option, label: option }
                    : option;

                return (
                    <MenuItem key={value} value={value}>
                        {label}
                    </MenuItem>
                );
            });
        }
        return (
            <MenuItem disabled>
                Keine Einträge gefunden :(<br />
            </MenuItem>
        );
    }

    getTitle() {
        if (this.props.disabled) {
            if (this.props.options && this.props.options.length === 1) {
                return 'Keine weiteren Optionen zur Auswahl verfügbar.';
            } else if (!this.props.options || this.props.options.length === 0) {
                return 'Keine Optionen zur Auswahl verfügbar.';
            }
        }
        return null;
    }

    openHandler = () => {
        this.setState({ open: true });
    }

    closeHandler = () => {
        this.setState({ open: false });
    }

    focusHandler = () => {
        if (this.props.openOnFocus && !this.state.hasFocus) {
            this.setState({ open: true });
        }
    }

    menuEnterHandler = () => {
        if (this.props.openOnFocus) {
            this.setState({ hasFocus: true });
        }
    }

    menuExitHandler = () => {
        if (this.props.openOnFocus) {
            this.setState({ hasFocus: false });
        }
    }

    render() {
        const { disabled, SelectProps, ...props } = this.props;
        return (
            <Fragment>
                <Field
                    select
                    disabled={disabled}
                    title={this.getTitle()}
                    onFocus={this.focusHandler}
                    SelectProps={{
                        open: this.state.open,
                        onOpen: this.openHandler,
                        onClose: this.closeHandler,
                        ...SelectProps,
                        MenuProps: {
                            onEntered: this.menuEnterHandler,
                            onExited: this.menuExitHandler,
                            ...(SelectProps ? SelectProps.MenuProps : {})
                        }
                    }}
                    {...omit(props, ['options', 'openOnFocus', 'native'])}
                >
                    {this.generateMenuItems()}
                </Field>
            </Fragment>
        );
    }
}

FieldSelect.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    options: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
            value: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]).isRequired,
            label: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]).isRequired,
            disabled: PropTypes.bool,
        })
    ])).isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    SelectProps: PropTypes.object,
    openOnFocus: PropTypes.bool,
};

FieldSelect.defaultProps = {
    openOnFocus: true
};

export default FieldSelect;
