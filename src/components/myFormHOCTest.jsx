import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';


const FieldGroup = withStyles(theme => ({
    formGroup: {
        backgroundColor: 'formField',
    }
}))(({ children, classes }) => {
    return (
        <div className={classes.formGroup}>
            {children}
        </div>
    );
});


const FormField = withStyles(theme => ({
    formField: {
        backgroundColor: 'blue',
    }
}))(({ children, classes, data }) => {
    console.log('FORM_FIELD', data);
    return (
        <div className={classes.formField}>
            {children}
        </div>
    );
});


const Form = ({ submitHandler, children }) => {
    return (
        <form onSubmit={submitHandler}>
            {/* {React.Children.map(children, child => {
                if (child.props.name) {
                    return React.cloneElement(child, {
                        value: this.state[child.props.name],
                        onChange: this.changeHandler
                    })
                }
                return child;
            })} */}
            {children}
        </form>
    )
}


function myForm(FormComponent) {
    const styles = theme => ({
        form: {
            border: '1px solid #000',
        }
    });

    return withStyles(styles)(class extends Component {
        state = this.defaultState();
        
        Form = props => <Form {...props} submitHandler={this.submitHandler} form={this} />;
        FieldGroup = props => <FieldGroup {...props} form={this} />;
        Field = props => <FormField {...props} form={this} />;
        
    
        defaultState() {
            return this.props.data
                ? this.props.data
                : this.emptyState();
        }
    
        emptyState() {
            const nextState = {};
            React.Children.map(this.props.children, child => {
                if (child.props.name) {
                    nextState[child.props.name] = '';
                }
            });
            return nextState;
        }
    
        changeHandler = e => {
            this.setState({
                [e.target.name]: e.target.value
            });
        }
    
        submitHandler = (e) => {
            e.preventDefault();
            this.props.onSubmit(e, this.state);
            if (!this.props.data) {
                this.setState(this.emptyState());
            }
    
        }
    
        render() {
            // const { children, classes } = this.props;
            return (
                <FormComponent
                    Form={this.Form}
                    Field={this.Field}
                    FieldGroup={this.Group}
                    {...this.props}
                />
            );
        }
    });
}

export default myForm;
