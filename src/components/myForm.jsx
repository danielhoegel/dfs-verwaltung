import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import omit from 'lodash/omit';
import set from 'lodash/set';
import get from 'lodash/get';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Loader from './Loader';

class MyForm extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        fields: PropTypes.any.isRequired, // React Component
        defaultValues: PropTypes.object,
        loading: PropTypes.bool,
        error: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.array
        ]),
    }

    static defaultProps = {
        loading: false,
        error: ''
    }

    state = this.props.defaultValues || {}

    __valueToNumber(value) {
        return (typeof value === 'boolean' || isNaN(value) || value === '')
            ? value
            : Number(value);
    }

    __isNested(name) {
        return name.indexOf('.') !== -1 || name.indexOf('[') !== -1;
    }

    changeHandler = (e, asNumber) => {
        const { name, value } = e.target;
        const __value = asNumber ? this.__valueToNumber(value) : value;
        if (this.__isNested(name)) {
            this.deepChangeHandler(name, __value);
        } else {
            this.flatChangeHandler(name, __value);
        }
    }

    flatChangeHandler(name, value) {
        this.setState({
            [name]: value
        });
    }

    deepChangeHandler(path, value) {
        const prevState = { ...this.state };
        const nextState = set(prevState, path, value);
        this.setState(nextState);
    }

    addHandler = (path, item) => {
        const nextState = { ...this.state };
        // create new array with items at path and new item
        const prevArray = get(nextState, path);
        const nextArray = prevArray ? [...prevArray, item] : [item];
        set(nextState, path, nextArray);
        this.setState(nextState);
    }

    removeHandler = (path, index) => {
        const nextState = { ...this.state };
        // remove item at index from array at path
        const nextArray = get(this.state, path).filter(
            (v, i) => i !== index
        );
        set(nextState, path, nextArray);
        this.setState(nextState);
    }

    submitHandler = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state);
    }

    render() {
        const { loading, error, classes, ...props } = this.props;
        const formProps = omit(props, ['fields', 'onSubmit', 'defaultValues', 'error']);
        return (
            <form onSubmit={this.submitHandler} className={classes.form}>
                <Loader loading={loading} />
                <this.props.fields
                    values={this.state}
                    change={this.changeHandler}
                    deepChange={this.deepChangeHandler}
                    add={this.addHandler}
                    remove={this.removeHandler}
                    disabled={loading}
                    {...formProps}
                />
                {error &&
                    <Typography variant='body2' className={classes.error}>
                        {typeof error === 'string'
                            ? error
                            : error.map((err, i) => <Fragment key={i}>{err}<br /></Fragment>)
                        }
                    </Typography>
                }
            </form>
        );
    }
}

const styles = theme => ({
    form: {
        position: 'relative',
    },
    error: {
        color: theme.palette.red,
        marginTop: theme.spacing.unit * 2
    },
});

export default withStyles(styles)(MyForm);
