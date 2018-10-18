import React, { Component } from 'react';
import myForm from '../../components/myForm';

class Playground extends Component {
    
    render() {
        // const { Form, Field, FieldGroup } = this.props;
        return (
            <div>
                {/* <Form>
                    <Field>Some Field</Field>
                    <FieldGroup>Some Group</FieldGroup>
                </Form> */}
            </div>
        )
    }
}

export default myForm(Playground);
