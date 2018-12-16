import React, { Component } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';

class MyForm extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        fields: PropTypes.func.isRequired,
        defaultValues: PropTypes.object,
    }

    state = this.props.defaultValues || {}

    changeHandler = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: (typeof value === 'boolean' || isNaN(value)) ? value : Number(value)
        });
    }

    submitHandler = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state);
    }

    render() {
        const formProps = omit(this.props, ['fields', 'onSubmit', 'defaultValues']);
        return (
            <form onSubmit={this.submitHandler}>
                <this.props.fields
                    onChange={this.changeHandler}
                    values={this.state}
                    {...formProps}
                />
            </form>
        );
    }
}



export default MyForm;
