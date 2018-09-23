import React, { Component, Fragment } from 'react';

import './StudentDetails.scss';
import { translateStudienkurse } from '../../helper/helper';
import { getStudentForId } from '../../helper/selectors';
// import Faecher from './components/Faecher';
import FaecherGrouped from './components/FaecherGrouped';
import CreateNote from './components/CreateNote';
import Modal from '../../components/modal/Modal';
import Button from '../../components/Button';
import Divider from '../../components/Divider';


class StudentDetails extends Component {
    state = {
        noteModalOpen: false,
        noteUpdateModalOpen: false,
        noteUpdateModalData: null,
        noteModalData: null
    }

    goBack = () => {
        this.props.history.goBack();
    }

    updateStudent = () => {
        this.props.history.push(`/studenten/${this.props.match.params.id}/update`);
    }

    openNoteModal = (data) => {
        this.setState({
            noteModalOpen: true,
            noteModalData: data
        });
    }

    closeNoteModal = () => {
        this.setState({
            noteModalOpen: false,
            noteModalData: null
        });
    }

    createNote = () => {
        this.openNoteModal({
            studentId: parseInt(this.props.match.params.id, 10)
        });
    }

    render() {
        const student = getStudentForId(this.props.match.params.id);
        return (
            <Fragment>
                <div>
                    <h2>{student.name}</h2>
                    {translateStudienkurse(student.studienkurs)},{' '}
                    Jahrgang {student.jahrgang}
                </div>
                <Divider hidden height='1rem' />
                <div>
                    <Button onClick={this.goBack} content='Zurück' icon='chevron-left' />
                    <Button onClick={this.updateStudent} content='Bearbeiten' icon='edit' />
                    <Button onClick={this.createNote} content='Note hinzufügen' icon='plus' />
                </div>

                <FaecherGrouped
                    studentId={student.id}
                    openNoteModal={this.openNoteModal}
                />

                <Modal
                    component={CreateNote}
                    title='Note hinzufügen'
                    close={this.closeNoteModal}
                    open={this.state.noteModalOpen}
                    data={this.state.noteModalData}
                />
            </Fragment>
        );
    }
}

export default StudentDetails;
