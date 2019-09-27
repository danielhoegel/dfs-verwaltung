import React from 'react';
import PropTypes from 'prop-types';

const Select = ({
    label: _label,
    width,
    options,
    ...inputProps
}) => {

    const _options = typeof options === 'function' ? options() : options;
    return (
        <div
            className={`input-wrapper${inputProps.required ? ' required' : ''}`}
            style={{ width: `${width / 12 * 100}%` }}
        >
            {_label && (
                <label htmlFor={_label}>
                    {_label}
                </label>
            )}
            <select {...inputProps}>
                {_options.map(({ value, label, disabled, selected }) => (
                    <option key={value} value={value} disabled={disabled} selected={selected}>
                        {label}
                    </option>
                ))}
            </select>
        </div>
    );
};

Select.propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]).isRequired,
            label: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]).isRequired,
            disabled: PropTypes.bool,
        }))
    ]).isRequired,
    onChange: PropTypes.func.isRequired,
};

Select.defaultProps = {
    width: 12
};

export default Select;
