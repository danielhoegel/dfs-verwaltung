
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import RefreshIcon from '@material-ui/icons/Refresh';

import Breadcrumbs from './Breadcrumbs';
import GlobalSearch from './GlobalSearch';
import GlobalAddMenu from './GlobalAddMenu';
import { fetchAllData } from '../../../redux/entitiesActions';
import { getStudentenFetching } from '../../../routes/studenten/redux/studentenSelectors';

const Topbar = ({ classes, fetchAllData, fetching }) => {
    return (
        <Toolbar>
            <div className={classes.breadcrumbs}>
                <Breadcrumbs />
            </div>
            <GlobalSearch />
            <GlobalAddMenu className={classes.leftMargin} />
            <Button
                className={cn(
                    classes.leftMargin,
                    classes.refreshButton,
                )}
                disabled={fetching}
                color='inherit'
                size='small'
                onClick={fetchAllData}
            >
                <RefreshIcon className={cn({[classes.loadingIcon]: fetching})}/>
            </Button>
        </Toolbar>
    );
};

const styles = theme => ({
    breadcrumbs: {
        width: '50%',
        marginRight: 'auto'
    },
    leftMargin: {
        marginLeft: theme.spacing.unit * 2,
    },
    refreshButton: {
        fontSize: '1em',
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
    },
    '@keyframes loading-anim': {
        from: { transform: 'rotate(0)' },
        to:   { transform: 'rotate(360deg)' }
    },
    loadingIcon: {
        animationName: 'loading-anim',
        animationDuration: '300ms',
        animationTimingFunction: 'linear',
        animationIterationCount: 'infinite',
    }
});

Topbar.propTypes = {
    classes: PropTypes.object.isRequired,
    fetchAllData: PropTypes.func.isRequired,
    fetching: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    fetching: getStudentenFetching(state),
});

export default connect(mapStateToProps, { fetchAllData })(
    withStyles(styles)(Topbar)
);
