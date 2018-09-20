import React, { Component } from 'react';


import './LESBListe.css';
import LESBListeStudent from './components/LESBListeStudent';
import studentenData from '../../data/studenten';

class StudentenListe extends Component {
    state = {
        studenten: studentenData
    }

    render() {
        return (
            <div>
                <h1>LESB-Liste</h1>
                <div className='studenten'>
                    {this.state.studenten.map(student =>
                        <LESBListeStudent student={student} key={student.id} />
                    )}
                </div>
            </div>
        );
    }
}

export default StudentenListe;
