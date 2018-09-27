
import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Breadcrumbs from './Breadcrumbs';
import GlobalSearch from './GlobalSearch';
import GlobalAddMenu from './GlobalAddMenu';

const Topbar = ({ classes }) => {
    return (
        <Toolbar>
            <Typography color="inherit" className={classes.menuGrow}>
                <Breadcrumbs />
            </Typography>
            <div style={{ width: '30%'}}>
                <GlobalSearch />
            </div>
            <div style={{marginLeft: 'auto'}}>
                <GlobalAddMenu />
            </div>
        </Toolbar>
    );
};

const styles = theme => ({
    menuGrow: {
        width: '30%'
    },
    menuCenter: {
        marginLeft: 'auto',
        marginRight: 'auto'
    }
});

export default withStyles(styles)(Topbar);
