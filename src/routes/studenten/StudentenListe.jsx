import React, { Component } from 'react';

import studentenData from '../../data/studenten';

class StudentenListe extends Component {
    state = {
        studenten: studentenData
    }

    render() {
        return (
            <div>
                <h1>Studenten</h1>
                <ul>
                    {this.state.studenten.map(student =>
                        <li key={student.id}>{student.name}</li>    
                    )}
                </ul>
            </div>
        );
    }
}

export default StudentenListe;
