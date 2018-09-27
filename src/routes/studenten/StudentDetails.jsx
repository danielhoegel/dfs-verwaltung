import React, { Component, Fragment } from 'react';

import './StudentDetails.scss';

import apiRequest from '../../helper/apiRequest';
import { translateStudienkurse } from '../../helper/helper';
// import Faecher from './components/Faecher';
import FaecherGrouped from './components/FaecherGrouped';
import CreateNote from './components/CreateNote';
import Modal from '../../components/modal/Modal';
import Button from '../../components/Button';
import Divider from '../../components/Divider';
import Placeholder from '../../components/placeholder/Placeholder';
import Tabs from '../../components/tabs/Tabs';


const StudentDetailsLoading = () => (
    <Placeholder>
        <Placeholder.Item width='20%' height='1.25rem' />
        <Placeholder.Item width='35%' />
        <Placeholder.Item width='100px' height='2rem' inline />
        <Placeholder.Item width='125px' height='2rem' inline />
        <Placeholder.Item width='150px' height='2rem' inline />
        <Divider hidden height='2.5rem' />
        <Placeholder.Item width='15%' height='1.5rem' />
        <Placeholder.Item height='2rem' />
        <Placeholder.Item height='3rem' width='80%' />
        <Placeholder.Item height='4rem' width='90%' />
        <Placeholder.Item               width='60%' />
        <Placeholder.Item height='2rem' width='80%' />
        <Placeholder.Item height='3rem' width='85%' />
        <Placeholder.Item height='4rem' width='75%' />
    </Placeholder>
)


class StudentDetails extends Component {
    state = {
        student: null,
        noteModalOpen: false,
        noteUpdateModalOpen: false,
        noteUpdateModalData: null,
        noteModalData: null
    }

    componentDidMount() {
        const studentId = this.props.match.params.id;
        apiRequest(`/studenten/${studentId}`).then(student =>
            this.setState({ student })
        );
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
        const { student } = this.state;
        return student ? (
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

                <Divider hidden height='1rem' />
                
                <Tabs tabs={[
                    { key: 0, title: 'Fächer', body: (
                        <FaecherGrouped
                            studentId={student.id}
                            openNoteModal={this.openNoteModal}
                        />
                    )},
                    { key: 1, title: 'Kontaktdaten', body: (
                        <div>
                            <h3>Kontaktdaten</h3>
                        </div>
                    )}
                ]} />

                

                <Modal
                    component={CreateNote}
                    title='Note hinzufügen'
                    close={this.closeNoteModal}
                    open={this.state.noteModalOpen}
                    data={this.state.noteModalData}
                />
            </Fragment>
        ) : <StudentDetailsLoading />;
    }
}

export default StudentDetails;
