import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MailIcon from '@material-ui/icons/MailOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import PrintIcon from '@material-ui/icons/PrintOutlined';
import { isNotEmpty } from '../../../../helper/helper';

class StudentenTableToolbar extends Component {
    shouldComponentUpdate(nextProps) {
        return (
            (nextProps.numStudents !== this.props.numStudents) ||
            (nextProps.numSelected !== this.props.numSelected)
        );
    }

    mailDistributor() {
        return this.props.selectedStudents
            .map(student => {
                if (isNotEmpty(student.studentInformation)) {
                    const { mailUni, mailPrivate } = student.studentInformation;
                    return mailUni ? mailUni :
                        mailPrivate ? mailPrivate : null;
                }
                return null;
            })
            .join(';');
    }

    render() {
        const { numSelected, numStudents, classes } = this.props;
        return (
            <Toolbar
                className={classNames(classes.root, {
                    [classes.highlight]: numSelected > 0,
                })}
            >
                <div className={classes.title}>
                    {numSelected > 0 ? (
                        <Typography color="inherit" variant="subheading">
                            {numSelected} Studenten ausgewählt
                        </Typography>
                    ) : (
                        <Typography variant="title">
                            Studenten ({numStudents})
                        </Typography>
                    )}
                </div>
                <div className={classes.actions}>
                    {numSelected > 0 && (
                        <Fragment>
                            <IconButton
                                component='a'
                                href={`mailto:${this.mailDistributor()}`}
                                aria-label='Mail'
                                title={`E-Mail an ${numSelected} Studenten senden`}
                                color='inherit'
                            >
                                <MailIcon />
                            </IconButton>
                            {/* <IconButton
                                aria-label='Print'
                                title={`Berichte für ${numSelected} Studenten drucken`}
                                color='inherit'
                            >
                                <PrintIcon />
                            </IconButton>
                            <IconButton
                                aria-label='Delete'
                                title={`${numSelected} Studenten löschen`}
                                color='inherit'
                            >
                                <DeleteIcon />
                            </IconButton> */}
                        </Fragment>
                    )}
                </div>
            </Toolbar>
        );
    }
}

const styles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.primary.main,
    },
    actions: {
        marginLeft: 'auto',
    },
    title: {
        flex: '0 0 auto',
    },
    '@keyframes loading-anim': {
        from: { transform: 'rotate(0)' },
        to:   { transform: 'rotate(360deg)' }
    },
    loadingButton: {
        animationName: 'loading-anim',
        animationDuration: '300ms',
        animationTimingFunction: 'linear',
        animationIterationCount: 'infinite',
    }
});
  
StudentenTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numStudents: PropTypes.number.isRequired,
    numSelected: PropTypes.number.isRequired,
    selectedStudents: PropTypes.array.isRequired,
};
  
export default withStyles(styles)(StudentenTableToolbar);
