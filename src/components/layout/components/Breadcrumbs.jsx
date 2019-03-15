import React from 'react';
import { NavLink } from 'react-router-dom';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ChevronRightIcon from '@material-ui/icons/ChevronRightRounded';

import routes from '../../../routes.js';

// map & render your breadcrumb components however you want.
// each `breadcrumb` has the props `key`, `location`, and `match` included!
const Breadcrumbs = ({ breadcrumbs, classes }) => (
    <div className={classes.flexContainer}>
        {breadcrumbs.map(({ match, breadcrumb }, index) => (
            <span key={match.url} className={classes.flexContainer}>
                <Typography
                    variant='body2'
                    color='inherit'
                    component={(index === 0 || index === breadcrumbs.length -1 )
                        ? 'span' : NavLink
                    }
                    to={match.url}
                >
                    {breadcrumb}
                </Typography>
                {(index < breadcrumbs.length - 1) && (
                    <ChevronRightIcon />
                )}
            </span>
        ))}
    </div>
);

const styles = {
    flexContainer: {
        display: 'flex',
        alignItems: 'center'
    }
};

export default withBreadcrumbs(routes, { disableDefaults: true })(
    withStyles(styles)(Breadcrumbs)
);
