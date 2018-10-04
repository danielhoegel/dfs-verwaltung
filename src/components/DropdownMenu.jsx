import React, { Component } from 'react';
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
    
    handleClose = () => {
        this.setState({ anchorEl: null });
    };
    
    render() {
        const { anchorEl } = this.state;
        const { classes, children, items, id, icon: Icon } = this.props;
    
        return (
            <div>
                <Button
                    aria-owns={anchorEl ? id : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                    color='inherit'
                    className={classes.addButton}
                >
                    <Icon className={classes.addIcon} />
                    Hinzufügen
                </Button>
                <Menu
                    id={id}
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                {children || items.map(({ onClick, label, ...itemProps}, index) => (
                    <MenuItem
                        onClick={() => {
                            this.handleClose();
                            onClick();
                        }}
                        {...itemProps}
                    >
                        {label}
                    </MenuItem>
                ))}
                </Menu>
            </div>
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
