import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';

import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
import { getPageLoading } from './redux/layoutSelectors';


const Layout = ({ pageLoading, children, classes }) => {
    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Topbar />
            </AppBar>

            <Drawer variant="permanent" classes={{ paper: classes.drawerPaper }}>
                <div className={classes.toolbar} />
                <Sidebar />
            </Drawer>

            {pageLoading && (
                <LinearProgress
                    classes={{
                        root: classes.linearProgress,
                        colorPrimary: classes.colorPrimary,
                        barColorPrimary: classes.barColorPrimary,
                    }}
                />
            )}

            <main className={classes.content}>
                <div className={classes.toolbar} />
                <div className={classes.contentScrollWrapper}>
                    <Typography component='div' className={classes.contentInside}>
                        { children }
                    </Typography>
                </div>
            </main>
        </div>
    );
};

const drawerWidth = 240;

const styles = theme => ({
    '@global': {
        body: {
            overflow: 'hidden', // FIX for shifted popper in GlobalSearch in Topbar 
        }
    },
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
        display: 'flex',
        flexDirection: 'column'
    },
    contentScrollWrapper: {
        overflow: 'auto',
        flexGrow: 1,
        width: `calc(100vw - ${drawerWidth}px)`
    },
    contentInside: {
        maxWidth: '960px',
        padding: theme.spacing.unit * 4,
    },
    toolbar: theme.mixins.toolbar,
    linearProgress: {
        position: 'absolute',
        top: '64px',
        left: 0,
        width: '100%',
        // height: '10px'
    },
    colorPrimary: {
        backgroundColor: 'rgb(250, 180, 220)',
    },
    barColorPrimary: {
        backgroundColor: 'rgb(225, 0, 80)',
    },
});

const mapStateToProps = (state) => ({
    pageLoading: getPageLoading(state)
});

export default withRouter(connect(mapStateToProps)(
    withStyles(styles)(Layout)
));
