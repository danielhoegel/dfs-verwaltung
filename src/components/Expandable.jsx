import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class Expandable extends Component {
    /**
     * Custom Expandable component inspired by material-ui ExpansionPanel
     * 
     * To use multiple Expandables as an accordion,
     * control the expansion in the parent state and pass
     * expanded (bool) and toggleExpanded (func) as props.
     * 
     * The internal state is only used, if no expanded prop is passed
     */

    state = {
        expanded: this.props.defaultExpanded || false,
    }

    bodyEl = React.createRef()
    bodyWrapperEl = React.createRef()

    toggleExpanded = () => {
        if (this.props.expanded !== undefined) {
            this.props.toggleExpanded();
        } else {
            this.setState(state => ({
                expanded: !state.expanded
            }))
        }
    }

    isExpanded() {
        return this.props.expanded !== undefined
            ? this.props.expanded
            : this.state.expanded;
    }

    bodyWrapperStyles() {
        const body = this.bodyEl.current;
        const styles = {
            height: !body ? (this.isExpanded() ? 'auto' : 0) : (this.isExpanded() ? body.offsetHeight : 0),
            duration: !body ? 200 : (Math.floor(body.offsetHeight / 1.5))
        }
        return styles;
    }

    componentDidUpdate() {
        const { height, duration } = this.bodyWrapperStyles();
        this.bodyWrapperEl.current.style.transition = `height ${duration}ms linear`;
        this.bodyWrapperEl.current.style.height = `${height}px`;
    }

    render() {
        const { header, children, classes } = this.props;
        const { height, duration } = this.bodyWrapperStyles();
        const expanded = this.isExpanded();
        return (
            <Paper
                className={classNames(classes.expandable, { [classes.expanded]: expanded })}
                elevation={1}
                square
            >
                <div className={classes.header} onClick={this.toggleExpanded}>
                    {header}
                    <ExpandMoreIcon className={classes.expandIcon} />
                </div>
                <div className={classes.bodyWrapper} ref={this.bodyWrapperEl} style={{
                    transition: `height ${duration}ms linear`,
                    height: `${height}px`
                }}>
                    <div className={classes.body} ref={this.bodyEl}>
                        {children}
                    </div>
                </div>
            </Paper>
        );
    }
}

const styles = theme => ({
    expandable: {
        margin: '0',
        transition: 'margin 0.2s linear',
        position: 'relative',
    },
    header: {
        padding: [[1.5 * theme.spacing.unit, 3 * theme.spacing.unit]],
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        userSelect: 'none',
        '&:before': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '1px',
            backgroundColor: theme.palette.secondary.main,
        }
    },
    expandIcon: {
        transform: 'rotate(0)',
        transition: 'transform 0.2s linear',
        marginLeft: 'auto',
        opacity: 0.5,
    },
    bodyWrapper: {
        overflow: 'hidden',
    },
    body: {
        padding: [[1.5 * theme.spacing.unit, 3 * theme.spacing.unit]],
        position: 'relative',
    },
    expanded: {
        margin: '1rem 0',
        '& $header': {
            fontWeight: theme.typography.fontWeightMedium,
            '&:before': {
                display: 'none',
            },
        },
        '& $expandIcon': {
            transform: 'rotate(180deg)'
        },
    },
});

Expandable.propTypes = {
    header: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
    defaultExpanded: PropTypes.bool,
    expanded: PropTypes.bool,
    toggleExpanded: PropTypes.func,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Expandable);
