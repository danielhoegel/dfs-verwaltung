import React from 'react';
import PropTypes from 'prop-types';

const Divider = ({ width, height, hidden, align }) => {
    return (
        <hr style={{
            display: 'block',
            border: 'none',
            borderBottom: hidden ? 'none' : '1px solid #ccc',
            margin: `calc(${height} / 2) auto`,
            marginLeft: align === 'left' ? 0 : 'auto',
            marginRight: align === 'right' ? 0 : 'auto',
            textAlign: align,
            width
        }} />
    );
};

Divider.propTypes = {
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    hidden: PropTypes.bool.isRequired,
    align: PropTypes.string,
};

Divider.defaultProps = {
    width: '100%',
    height: '2rem',
    hidden: false,
    align: 'center',
};

export default Divider;
