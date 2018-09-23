import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
    label: _label,
    width,
    ...inputProps
}) => {
    return (
        <div
            className={'input-wrapper' + (inputProps.required ? ' required' : '')}
            style={{ width: `${width / 12 * 100}%`}}
        >
            {_label && (
                <label htmlFor={_label}>
                    {_label}
                </label>
            )}
            <input {...inputProps} />
        </div>
    );
};

Input.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}

Input.defaultProps = {
    type: 'text',
    width: 12
}

export default Input;
