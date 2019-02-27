import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import MailIcon from '@material-ui/icons/MailOutlined';

import { translateStudienkurse, translateStudyStatus, isNotEmpty } from '../../../../helper/helper';
import NotesIndicator from './NotesIndicator';

class StudentenRow extends Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.selected !== this.props.selected;
    }

    goToDetails = () => {
        this.props.goToDetails(this.props.student.id);
    }

    render() {
        const { student } = this.props;
        return (
            <TableRow
                key={student.id}
                className={this.props.classes.row}
                hover
                tabIndex={-1}
                selected={this.props.selected}
            >
                <TableCell
                    role='checkbox'
                    aria-checked={this.props.selected}
                    onClick={e => this.props.handleSelection(e, student.id)}
                    padding='checkbox'
                >
                    <Checkbox
                        color='primary'
                        checked={this.props.selected}
                    />
                </TableCell>
                <TableCell onClick={this.goToDetails}>{student.matrikelnummer}</TableCell>
                <TableCell onClick={this.goToDetails}>{student.firstName}</TableCell>
                <TableCell onClick={this.goToDetails}>{student.lastName}</TableCell>
                <TableCell onClick={this.goToDetails}>
                    {student.studies && student.studies.map(study => (
                        <div key={`${study.id}`}>
                            {translateStudienkurse(study.studyCourseId)}{' '}
                            {study.year}{' '}
                            ({translateStudyStatus(study.status)})
                        </div>
                    ))}
                </TableCell>
                {/* <TableCell padding='checkbox'>
                    {student.notes.length > 0 && <NotesIndicator notes={student.notes} />}
                </TableCell> */}
                <TableCell padding='checkbox'>
                    {isNotEmpty(student.studentInformation) && student.studentInformation.mailUni && (
                        <a href={`mailto:${student.studentInformation.mailUni}`}>
                            <IconButton aria-label='E-Mail' title={`E-Mail an ${student.studentInformation.mailUni}`}>
                                <MailIcon />
                            </IconButton>
                        </a>
                    )}
                </TableCell>
            </TableRow>
        );
    }
}

StudentenRow.propTypes = {
    student: PropTypes.object.isRequired,
    selected: PropTypes.bool.isRequired,
    handleSelection: PropTypes.func.isRequired,
    goToDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
};

const styles = theme => ({
    row: {
        cursor: 'pointer'
    },
});

export default withStyles(styles)(StudentenRow);
