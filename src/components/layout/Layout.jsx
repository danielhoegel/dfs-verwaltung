import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
// import Button from '@material-ui/core/Button';
// import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';

import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';

// import './Layout.scss';

const Layout = ({ children, classes }) => {
    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
               <Topbar />
            </AppBar>

            <Drawer variant="permanent" classes={{ paper: classes.drawerPaper }}>
                <div className={classes.toolbar} />
                <Sidebar />
            </Drawer>

            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography component='div' className={classes.contentInside}>
                    { children }
                </Typography>
            </main>
        </div>
    );
};

const drawerWidth = 240;

const styles = theme => ({
    root: {
        flexGrow: 1,
        zIndex: 1,
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 4,
        overflow: 'auto',
    },
    contentInside: {
        maxWidth: '960px'
    },
    toolbar: theme.mixins.toolbar,
});

export default withStyles(styles)(Layout);
