import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'


class DropdownMenu extends Component {
    state = {
        anchorEl: null
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    
    handleClose = (callback) => {
        this.setState({ anchorEl: null }, () => {
            if (typeof callback === 'function') {
                callback();
            }
        });
    };

    renderChildren() {
        return React.Children.map(this.props.children, (child =>
            React.cloneElement(child, {
                onClick: child.props.onClick
                    ? () => this.handleClose(child.props.onClick)
                    : this.handleClose
            })
        ));
    }

    renderItems() {
        return this.props.items.map(({ onClick, label, ...itemProps}, index) => (
            <MenuItem
                key={index}
                onClick={onClick
                    ? () => this.handleClose(onClick)
                    : this.handleClose
                }
                {...itemProps}
            >
                {label}
            </MenuItem>
        ));
    }
    
    render() {
        const { anchorEl } = this.state;
        const { classes } = this.props;

        const buttonProps = {
            'aria-owns': anchorEl ? this.props.id : null,
            'aria-haspopup': 'true',
            onClick: this.handleClick
        };
    
        return (
            <Fragment>
                {this.props.button
                    ? React.cloneElement(this.props.button, buttonProps)
                    : (
                        <Button
                            {...buttonProps}
                            color='inherit'
                            className={classes.addButton}
                        >
                            <this.props.icon className={classes.addIcon} />
                            Hinzufügen
                        </Button>
                    )
                }
                <Menu
                    id={this.props.id}
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    {this.props.children ? this.renderChildren() : this.renderItems()}
                </Menu>
            </Fragment>
        );
    }
};

DropdownMenu.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.array,
    items: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func,
    })),
};

const styles = theme => ({
    addButton: {
        marginLeft: theme.spacing.unit
    },
    addIcon: {
        marginRight: theme.spacing.unit
    }
});

export default withStyles(styles)(DropdownMenu);
