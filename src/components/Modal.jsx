import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MUIModal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

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
        closeOnDimmerClick: PropTypes.bool,
    }

    static defaultProps = {
        title: 'Modal',
        closeOnDimmerClick: true
    }

    render() {
        const { classes } = this.props;
        return (
            <MUIModal
                aria-labelledby={this.props.title}
                open={this.props.open}
                onClose={this.props.close}
            >
                <Paper className={classes.wrapper} elevation={8}>
                    <Typography variant='title' className={classes.header}>
                        {this.props.title}
                    </Typography>
                    <div className={classes.body}>
                        <this.props.component
                            closeModal={this.props.close}
                            data={this.props.data}
                        />
                    </div>
                </Paper>
            </MUIModal>
        );
    }
}

const styles = theme => ({
    wrapper: {
        position: 'absolute',
        maxWidth: theme.spacing.unit * 100,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        overflow: 'hidden',
        outline: 0
    },
    header: {
        paddingLeft: theme.spacing.unit * 3,
        paddingRight: theme.spacing.unit * 3,
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        backgroundColor: theme.palette.secondary.light,
    },
    body: {
        padding: theme.spacing.unit * 3,
    }
});

export default withStyles(styles)(Modal);
