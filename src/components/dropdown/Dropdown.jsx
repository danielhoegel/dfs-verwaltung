import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Dropdown.scss';
import { isDescendant } from '../../helper/helper';

class Dropdown extends Component {
    static propTypes = {
        label: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object,
            PropTypes.array,
        ]).isRequired,
        items: PropTypes.arrayOf(PropTypes.node),
        icon: PropTypes.string,
        noIcon: PropTypes.bool,
        iconSize: PropTypes.string,
        title: PropTypes.string,
        basic: PropTypes.bool,
        labelStyle: PropTypes.object,
        menuAlign: PropTypes.oneOf(['left', 'right', 'center']),
    }

    static defaultProps = {
        icon: 'chevron-down',
        noIcon: false
    }

    state = {
        isOpen: false
    }
    
    componentDidMount() {
        document.addEventListener('click', this.outsideClickHandler);
    }
    
    componentWillUnmount() {
        document.removeEventListener('click', this.outsideClickHandler);
    }
    
    outsideClickHandler = (e) => {
        if (!isDescendant(this.dropdown, e.target)) {
            this.setState({ isOpen: false });
        }
    }
    
    clickHandler = () => {
        this.setState(state => ({
            isOpen: !state.isOpen
        }));
    }

    render() {
        const items = this.props.children || this.props.items;
        
        const dropdownClassList = [
            'dropdown',
            this.state.isOpen && 'dropdown--open',
            this.props.menuAlign && `dropdown--${this.props.menuAlign}`
        ].join(' ');

        const labelClassList = [
            'dropdown__label',
            this.props.basic && 'basic',
            this.props.color
        ].join(' ');

        return (
            <div
                className={dropdownClassList}
                onClick={this.clickHandler}
                ref={node => { this.dropdown = node; }}
            >
                <div className={labelClassList} title={this.props.title} style={this.props.labelStyle}>
                    {this.props.label}
                    {!this.props.noIcon && (
                        <div className='dropdown__icon' style={{fontSize: this.props.iconSize}} >
                            <i className={`fa fa-${this.props.icon}`} />
                        </div>
                    )}
                </div>
                <div className='dropdown__menu'>
                    {items.map((item, index) => (
                        <div className='dropdown__item' key={index}>
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Dropdown;
