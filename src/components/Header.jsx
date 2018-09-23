import React from 'react';
import PropTypes from 'prop-types';

const Header = ({
    as: DOMNode,
    weight,
    size,
    align,
    color,
    background,
    style: _style,
    content,
    children
}) => {
    const style = {
        fontWeight: weight,
        fontSize: size,
        textAlign: align,
        backgroundColor: background,
        color,
        ..._style
    };

    return (
        <DOMNode style={style} >
            {children || content}
        </DOMNode>
    );
};

Header.propTypes = {
    as: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'div', 'header', 'label', 'caption']),
    weight: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.oneOf(['normal', 'bold', 'bolder', 'lighter']),
    ]),
    size: PropTypes.string,
    align: PropTypes.string,
    color: PropTypes.string,
    background: PropTypes.string,
    style: PropTypes.object,
    content: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.object),
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.object,
        PropTypes.string,
    ]),
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.object),
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.object,
        PropTypes.string,
    ]),
}

Header.defaultProps = {
    as: 'h2'
}

export default Header;
