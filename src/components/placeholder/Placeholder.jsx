import React from 'react';
import PropTypes from 'prop-types';

import './Placeholder.scss';


const PlaceholderItem = ({ width, height, inline, marginTop, marginBottom }) => (
    <div className='placeholder__item' style={{
        width,
        height,
        display: inline && 'inline-block',
        marginTop,
        marginBottom
    }} />
);

PlaceholderItem.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    inline: PropTypes.bool,
    marginTop: PropTypes.string,
    marginBottom: PropTypes.string,
};


class Placeholder extends React.Component {

    static Item = PlaceholderItem;

    render() {
        return (
            <div className='placeholder'>
                {this.props.children}
            </div>
        );
    }
}

Placeholder.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.arrayOf(PropTypes.object),
    ]),
}

export default Placeholder;
