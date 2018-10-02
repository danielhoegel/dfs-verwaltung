import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined';
import DropdownMenu from '../../DropdownMenu';


class GlobalAddMenu extends Component {
    render() {
        return (
            <DropdownMenu id='global-add-menu' icon={AddBoxOutlinedIcon}>
                <MenuItem component={NavLink} to='/studenten/create'>
                    <ListItemIcon>
                        <PersonOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText inset primary='Neuer Student' />
                </MenuItem>
                <MenuItem onClick={() => alert('Neue Note')}>
                    <ListItemIcon>
                        <SpellcheckIcon />
                    </ListItemIcon>
                    <ListItemText inset primary='Neue Note' />
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => alert('Neue Note')}>
                    Neue Prüfungsordnung
                </MenuItem>
            </DropdownMenu>
        );
    }
};

GlobalAddMenu.propTypes = {
    createStudent: PropTypes.func.isRequired,
};

export default GlobalAddMenu;
