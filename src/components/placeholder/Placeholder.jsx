import React from 'react';
import PropTypes from 'prop-types';

import './Placeholder.scss';


const PlaceholderItem = ({ width, height, inline }) => (
    <div className='placeholder__item' style={{
        width,
        height,
        display: inline && 'inline-block'
    }} />
);

PlaceholderItem.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    inline: PropTypes.bool,
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
// export {
//     PlaceholderItem
// };
