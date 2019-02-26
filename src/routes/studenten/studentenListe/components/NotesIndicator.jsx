import React, { Component, Fragment } from 'react';

import InfoIcon from '@material-ui/icons/InfoOutlined';
import Modal from '../../../../components/Modal';

function NotesModal({ data }) {
    return (
        <ul>
            {data.map(note => (
                <li key={note.id} style={{ color: note.color }}>
                    {note.content}
                </li>
            ))}
        </ul>
    );
}

class NotesIndicator extends Component {
    state = {
        notesModalOpen: false
    }

    openNotesModal = () => this.setState({ notesModalOpen: true });
    closeNotesModal = () => this.setState({ notesModalOpen: false });

    render() {
        return (
            <Fragment>
                <InfoIcon onClick={this.openNotesModal} />
                <Modal
                    component={NotesModal}
                    title='Notizen'
                    open={this.state.notesModalOpen}
                    close={this.closeNotesModal}
                    data={this.props.notes}
                />
            </Fragment>
        );
    }
}

export default NotesIndicator;
