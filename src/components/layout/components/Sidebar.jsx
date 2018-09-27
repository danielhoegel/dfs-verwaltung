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

function Sidebar({ location }) {
    return (
        <List component="nav">
            <ListSubheader component='h2' >Datensätze</ListSubheader>
            <ListItem component={NavLink} to='/studenten' button selected={location.pathname === '/studenten'}>
                <ListItemIcon>
                    <PeopleOutlineIcon />
                </ListItemIcon>
                <ListItemText primary='Studenten' />
            </ListItem>
            <ListItem component={NavLink} to='/faecher' button selected={location.pathname === '/faecher'}>
                <ListItemIcon>
                    <FeaturedPlayListOutlineIcon />
                </ListItemIcon>
                <ListItemText primary='Fächer' />
            </ListItem>
            
            <Divider />

            <ListSubheader component='h2'>Berichte</ListSubheader>
            <ListItem component={NavLink} to='/lesb-liste' button selected={location.pathname === '/lesb-liste'}>
                <ListItemText primary='LESB-Liste' />
            </ListItem>
            <ListItem component={NavLink} to='/ergebnisse' button selected={location.pathname === '/ergebnisse'}>
                <ListItemText primary='Prüfungsergebnisse' />
            </ListItem>
        </List>
    );
}

export default withRouter(Sidebar);
