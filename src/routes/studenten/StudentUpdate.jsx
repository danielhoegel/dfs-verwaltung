import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeftRounded';

import { isNotEmpty, isEmpty } from '../../helper/helper';
import HiddenDivider from '../../components/HiddenDivider';

import { getStudentForId, getStudentenFetching } from './redux/studentenSelectors';
import { LinearProgress } from '@material-ui/core';


class StudentUpdate extends Component {
    
    componentDidMount() {
        if (isEmpty(this.props.student)) {
            this.props.dispatch({
                type: 'FETCH_STUDENT',
                request: {
                    url: `/students/${this.props.match.params.id}?_embed=studies&_embed=studentInformations`
                }
            });
        }
    }
    
    goBack = () => {
        this.props.history.goBack();
    }

    render() {
        const { student, fetching, classes } = this.props;
        return !fetching && isNotEmpty(student) ? (
            <div>
                <Typography variant="display1" gutterBottom>
                    Bearbeite {student.firstName} {student.lastName}
                </Typography>

                <HiddenDivider />
                <Button onClick={this.goBack} className={classes.button} >
                    <ChevronLeftIcon className={classes.leftIcon} />
                    Zurück
                </Button>
            </div>
        ) : <LinearProgress />;
    }
}

const styles = theme => ({
    button: {
        '&:not(:last-child)': {
            marginRight: theme.spacing.unit,
        },
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
});

const mapStateToProps = (state, ownProps) => ({
    student: getStudentForId(state, ownProps.match.params.id),
    fetching: getStudentenFetching(state)
});

export default connect(mapStateToProps, { dispatch: action => action })(
    withStyles(styles)(StudentUpdate)
)
