import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MUIModal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

class Modal extends Component {
    static propTypes = {
        component: PropTypes.func.isRequired,
        title: PropTypes.string,
        close: PropTypes.func.isRequired,
        data: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array,
            PropTypes.string,
            PropTypes.number,
        ]),
        open: PropTypes.bool.isRequired,
        preventClosing: PropTypes.bool,
        showCloseButton: PropTypes.bool,
        danger: PropTypes.bool,
    }

    static defaultProps = {
        title: 'Modal',
        preventClosing: false,
        showCloseButton: true,
    }

    render() {
        const { classes } = this.props;
        return (
            <MUIModal
                aria-labelledby={this.props.title}
                open={this.props.open}
                onClose={this.props.close}
                disableBackdropClick={this.props.preventClosing}
                disableEscapeKeyDown={this.props.preventClosing}
            >
                <div className={classes.wrapper}>
                    <Paper className={classes.inside} elevation={8}>
                        <Typography variant='title' className={classNames(
                            classes.header,
                            { [classes.headerWithCloseButton]: this.props.showCloseButton },
                            { [classes.dangerHeader]: this.props.danger }
                        )}>
                            {this.props.title}
                            {this.props.showCloseButton &&
                                <IconButton
                                    onClick={this.props.close}
                                    className={classes.closeButton}
                                    color='inherit'
                                >
                                    <CloseIcon fontSize='small' />
                                </IconButton>
                            }
                        </Typography>
                        <Typography component='div' className={classes.body}>
                            <this.props.component
                                closeModal={this.props.close}
                                data={this.props.data}
                            />
                        </Typography>
                    </Paper>
                </div>
            </MUIModal>
        );
    }
}

const styles = theme => ({
    wrapper: {
        position: 'absolute',
        width: '75%',
        maxWidth: theme.spacing.unit * 100,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        outline: 0,
        [theme.breakpoints.down('md')]: {
            width: 'calc(100% - 2rem)',
        },
    },
    inside: {
        overflow: 'hidden',
    },
    header: {
        paddingLeft: theme.spacing.unit * 3,
        paddingRight: theme.spacing.unit * 3,
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        backgroundColor: theme.palette.secondary.light,
        position: 'relative',
    },
    headerWithCloseButton: {
        paddingRight: theme.spacing.unit * 8,
    },
    dangerHeader: {
        backgroundColor: theme.palette.red,
        color: '#fff'
    },
    closeButton: {
        position: 'absolute',
        top: '50%',
        right: theme.spacing.unit,
        transform:'translateY(-50%)',
    },
    body: {
        padding: theme.spacing.unit * 3,
        position: 'relative',
    }
});

export default withStyles(styles)(Modal);
