import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import FeaturedPlayListOutlineIcon from '@material-ui/icons/FeaturedPlayListOutlined';
import EditIcon from '@material-ui/icons/EditOutlined';

function Sidebar({ location }) {
    return (
        <List component="nav">
            <ListSubheader component='h2' >Datensätze</ListSubheader>
            <ListItem component={NavLink} to='/studenten' button selected={location.pathname.startsWith('/studenten')}>
                <ListItemIcon>
                    <PeopleOutlineIcon />
                </ListItemIcon>
                <ListItemText primary='Studenten' />
            </ListItem>
            <ListItem component={NavLink} to='/studienkurse' button selected={location.pathname.startsWith('/studienkurse')}>
                <ListItemIcon>
                    <FeaturedPlayListOutlineIcon />
                </ListItemIcon>
                <ListItemText primary='Studienkurse' />
            </ListItem>
            <ListItem component={NavLink} to='/forms' button selected={location.pathname.startsWith('/forms')}>
                <ListItemIcon>
                    <EditIcon />
                </ListItemIcon>
                <ListItemText primary='Formulare' />
            </ListItem>
            
            <Divider />

            <ListSubheader component='h2'>Berichte</ListSubheader>
            <ListItem component={NavLink} to='/berichte/studenten' button selected={location.pathname === '/berichte/studenten'}>
                <ListItemText primary='Studentenliste' />
            </ListItem>
            <ListItem component={NavLink} to='/berichte/lesb' button selected={location.pathname === '/berichte/lesb'}>
                <ListItemText primary='LESB-Liste' />
            </ListItem>
            <ListItem component={NavLink} to='/berichte/ergebnisse' button selected={location.pathname === '/berichte/ergebnisse'}>
                <ListItemText primary='Prüfungsergebnisse' />
            </ListItem>
        </List>
    );
}

export default withRouter(Sidebar);
