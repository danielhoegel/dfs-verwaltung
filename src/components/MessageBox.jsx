import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';

import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';


const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const snackbarContentWrapperStyles = theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.dark,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
});

const SnackbarContentWrapper = withStyles(snackbarContentWrapperStyles)(
({ classes, className, message, variant, actions, ...other }) => {
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={classNames(classes[variant], className)}
            message={
                <span className={classes.message}>
                    <Icon className={classNames(classes.icon, classes.iconVariant)} />
                    {message}
                </span>
            }
            action={actions.map((action, i) => React.cloneElement(action, { key: i }))}
            {...other}
        />
    );
});


function MessageBox({ classes, className, ...props }) {
    return (
        <SnackbarContentWrapper
            className={classNames(classes.margin, className)}
            {...props}
        />
    );
}

MessageBox.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    message: PropTypes.string.isRequired,
    variant: PropTypes.oneOf(['error', 'warning', 'info', 'success']).isRequired,
    actions: PropTypes.array,
};

MessageBox.defaultProps = {
    variant: 'info'
};

const styles = theme => ({
    margin: {
      margin: theme.spacing.unit,
    },
});

export default withStyles(styles)(MessageBox);
