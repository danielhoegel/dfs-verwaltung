import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import {
    getFaecherForStudyCourseGroupedBySemesterAndTyp,
    getVeranstaltungenForFach,
    getNotenForStudentAndVeranstaltung,
} from '../../../../helper/selectors';
import { formatNote } from '../../../../helper/gradeConverter';


const notenStyles = theme => ({
    noteCreateButton: {
        whiteSpace: 'nowrap',
        padding: '0 0.5rem 0 0.25rem',
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
});

const Noten = withStyles(notenStyles)(({
    veranstaltung,
    fach,
    noten,
    studentId,
    studyId,
    openNoteModal,
    classes
}) => {
    const openCreateGradeModal = () => {
        openNoteModal({
            studentId,
            studyId,
            subjectCourseId: veranstaltung.id,
            try: noten.length + 1
        })
    }

    return veranstaltung.participationType === 'Note' ? (
        <div>
            {noten.map(note => (
                <div
                    key={note.id}
                    className='clickable-note'
                    onClick={() => openNoteModal({ gradeId: note.id, studyId })}
                >
                    <i className='fa fa-wrench' />
                    {formatNote(note, fach.type)}
                    {noten.length > 1 && ` (${note.try}. Versuch)`}
                </div>
            ))}
            <Button
                onClick={openCreateGradeModal}
                style={{ marginTop: noten.length && '0.25rem' }}
                className={classes.noteCreateButton}
                size='small'
                variant='outlined'
            >
                <AddIcon className={classes.leftIcon} />
                Note hinzufügen
            </Button>
        </div>
    ) : (
        <span className='teilnahme-label'>
            Teilnahme
        </span>
    );
});



const fachStyles = theme => ({
    bodyRow: {
        height: 4 * theme.spacing.unit
    },
    subjectLink: {
        color: 'inherit',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    }
});

const Fach = connect(state => ({ state }))(
    withStyles(fachStyles)(({
        fach, studentId, openNoteModal, study, classes, state
    }) => {
        const veranstaltungen = getVeranstaltungenForFach(state)(fach.id);
        return (
            <TableBody>
                {veranstaltungen
                    .sort((a, b) => (
                        a.type.localeCompare(b.type) ||
                        a.title.localeCompare(b.title) ||
                        a.id - b.id
                    ))
                    .map((veranstaltung, index) => {
                        const noten = getNotenForStudentAndVeranstaltung(state)(studentId, veranstaltung.id);
                        return (
                            <TableRow key={veranstaltung.id} className={classes.bodyRow}>
                                {index === 0 && (
                                    <TableCell rowSpan={veranstaltungen.length}>
                                        <Link
                                            to={`/studienkurse/${study.studyCourseId}/studienordnung/${study.studyRegulationId}/${fach.id}`}
                                            className={classes.subjectLink}
                                        >
                                            {fach.title}
                                        </Link>
                                    </TableCell>
                                )}
                                <TableCell>
                                    {veranstaltung.type}
                                    {veranstaltung.title && ` (${veranstaltung.title})`}
                                </TableCell>
                                <TableCell style={{textAlign: 'right'}}>
                                    <Noten
                                        noten={noten}
                                        veranstaltung={veranstaltung}
                                        fach={fach}
                                        studentId={studentId}
                                        studyId={study.id}
                                        openNoteModal={openNoteModal}
                                    />
                                </TableCell>
                            </TableRow>
                        );
                    })
                }
            </TableBody>
        );
    })
);


const typenGroupStyles = theme => ({
    table: {
        '&:not(:last-child)': {
            marginBottom: 3 * theme.spacing.unit
        }
    },
    tableHead: {
        backgroundColor: theme.palette.secondary.light
    },
    headRow: {
        height: 'auto'
    },
    headCell: {}
});

const TypenGroup = withStyles(typenGroupStyles)(({
    typ, faecher, studentId, openNoteModal, study, classes
}) => (
    <Table padding='dense' className={classes.table}>
        <TableHead className={classes.tableHead}>
            <TableRow className={classes.headRow}>
                <TableCell className={classes.headCell} style={{width: '30%'}}>Fach ({typ.toUpperCase()})</TableCell>
                <TableCell className={classes.headCell} style={{width: '50%'}}>Veranstaltung</TableCell>
                <TableCell className={classes.headCell} style={{width: '20%'}}>(Punkte)</TableCell>
            </TableRow>
        </TableHead>
        {faecher    
            .sort((a, b) => (
                a.type.localeCompare(b.type) ||
                a.title.localeCompare(b.title) ||
                a.id - b.id
            ))
            .map(fach =>
                <Fach
                    key={fach.id}
                    fach={fach}
                    studentId={studentId}
                    openNoteModal={openNoteModal}
                    study={study}
                />
            )
        }
    </Table>
));


const semesterGroupStyles = theme => ({
    header: {
        fontSize: 2 * theme.spacing.unit
    }
})

const SemesterGroup = withStyles(semesterGroupStyles)(({
    semester, typen, studentId, openNoteModal, study, classes
}) => (
    <Fragment>
        <Typography variant='display1' component='h3' gutterBottom className={classes.header}>
            {semester}. Semester
        </Typography>
        {Object.entries(typen).map(([ typ, faecher ]) => (
            <TypenGroup
                key={typ}
                typ={typ}
                faecher={faecher}
                studentId={studentId}
                openNoteModal={openNoteModal}
                study={study}
            />
        ))}
    </Fragment>
));


class FaecherGrouped extends Component {
    static propTypes = {
        studentId: PropTypes.number.isRequired,
        studyCourseId: PropTypes.number.isRequired,
        openNoteModal: PropTypes.func.isRequired,
        study: PropTypes.object.isRequired,
        subjects: PropTypes.object.isRequired,
    }

    state = {
        faecher: this.props.subjects,
    }

    shouldComponentUpdate() {
        return false;
    }

    render() {
        const { faecher } = this.state;
        return faecher ? (
            Object.entries(faecher).map(([semester, typen]) => (
                <SemesterGroup
                    key={semester}
                    semester={semester}
                    typen={typen}
                    studentId={this.props.studentId}
                    openNoteModal={this.props.openNoteModal}
                    study={this.props.study}
                />
            ))
        ) : 'Keine Fächer gefunden.';
    }
};

export default connect((state, props) => ({
    subjects: getFaecherForStudyCourseGroupedBySemesterAndTyp(state, props.studyCourseId)
}))(FaecherGrouped);
