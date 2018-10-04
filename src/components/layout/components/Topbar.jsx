
import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';

import Breadcrumbs from './Breadcrumbs';
import GlobalSearch from './GlobalSearch';
import GlobalAddMenu from './GlobalAddMenu';

const Topbar = ({ classes }) => {
    return (
        <Toolbar>
            <div className={classes.breadcrumbs}>
                <Breadcrumbs />
            </div>
            <GlobalSearch />
            <GlobalAddMenu createStudent={data => { console.log(data); }} />
        </Toolbar>
    );
};

const styles = theme => ({
    breadcrumbs: {
        width: '50%',
        marginRight: 'auto'
    }
});

export default withStyles(styles)(Topbar);
