import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import MenuItem from '@material-ui/core/MenuItem';
import { isNotEmpty } from '../helper/helper';
import Field from './Field';

const FieldSelect = ({ options, disabled, ...fieldProps }) => {
    function generateMenuItems() {
        if (isNotEmpty(options)) {
            return options.map(option => {
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

    function getTitle() {
        if (disabled) {
            if (options && options.length === 1) {
                return 'Keine weiteren Optionen zur Auswahl verfügbar.';
            } else if (!options || options.length === 0) {
                return 'Keine Optionen zur Auswahl verfügbar.';
            }
        }
        return null;
    }

    return (
        <Fragment>
            <Field
                select
                disabled={disabled}
                title={getTitle()}
                {...fieldProps}
            >
                {generateMenuItems()}
            </Field>
        </Fragment>
    );
};

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
};

export default FieldSelect;
