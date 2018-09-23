import React, { Component } from 'react';

import { getStudentForId } from '../../helper/selectors';
import Button from '../../components/Button';

class StudentUpdate extends Component {
    state = {
        student: getStudentForId(this.props.match.params.id)
    }

    goBack = () => {
        this.props.history.goBack();
    }

    render() {
        const student = this.state.student;
        return (
            <div>
                <Button onClick={this.goBack} content='Zurück' />
                <h2>Update {student.name}</h2>
            </div>
        );
    }
}

export default StudentUpdate;
