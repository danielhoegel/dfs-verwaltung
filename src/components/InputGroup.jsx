import React from 'react';
import PropTypes from 'prop-types';

const InputGroup = ({
    children,
    required,
    width,
    primary,
    stacked,
    style,
    className
}) => {
    return (
        <div
            className={
                'input-group' +
                (stacked ? ' stacked' : '') +
                (className ? ' ' + className : '')
            }
            style={{width: `${width / 12 * 100}%`, ...style}}
        >
            {children.length
                ? React.Children.map(children, (child) =>
                    React.cloneElement(child, { required })
                )
                : children
            }

        </div>
    );
};

InputGroup.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]).isRequired,
    required: PropTypes.bool,
    width: PropTypes.number,
};

InputGroup.defaultProps = {
    width: 12
};

export default InputGroup;
