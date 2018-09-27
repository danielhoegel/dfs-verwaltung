import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';


class GlobalAddMenu extends Component {
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
        const { classes } = this.props;
    
        return (
            <div>
                <Button
                    aria-owns={anchorEl ? 'simple-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                    color='inherit'
                    className={classes.addButton}
                >
                    <AddBoxOutlinedIcon className={classes.addIcon} />
                    Hinzufügen
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                    <MenuItem onClick={this.handleClose}>My account</MenuItem>
                    <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                </Menu>
            </div>
        );
    }
};

GlobalAddMenu.propTypes = {
    createStudent: PropTypes.func.isRequired,
};

const styles = theme => ({
    addButton: {
        marginLeft: theme.spacing.unit
    },
    addIcon: {
        marginRight: theme.spacing.unit
    }
});

export default withStyles(styles)(GlobalAddMenu);
