import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import { FilterContextConsumer } from '../../../components/filter/FilterContext';
import {
    getFaecherGroupedBySemesterAndTyp,
    getVeranstaltungenForFach,
    getNotenForStudentAndVeranstaltung,
} from '../../../helper/selectors';


const notenStyles = theme => ({
    noteCreateButton: {
        whiteSpace: 'nowrap',
        padding: '0 0.5rem 0 0.25rem',
        textTransform: 'none',
        textAlign: 'left',
        fontWeight: 400,
        fontSize: '0.75rem',
        minHeight: 0
    },
    addIcon: {
        opacity: 0.5,
        fontSize: '1rem'
    }
});

const Noten = withStyles(notenStyles)(({ veranstaltung, noten, studentId, openNoteModal, classes }) => {
    return veranstaltung.teilnahmeart === 'Note' ? (
        <div>
            {noten.map(note => (
                <div
                    key={note.id}
                    className='clickable-note'
                    onClick={() => openNoteModal({ noteId: note.id })}
                >
                    <i className='fa fa-wrench' />
                    {note.punkte} Pkt.
                    {noten.length > 1 && ` (${note.versuch}. Versuch)`}
                </div>
            ))}
            <Button
                onClick={() => openNoteModal({ studentId, veranstaltungId: veranstaltung.id })}
                style={{ marginTop: noten.length && '0.25rem' }}
                className={classes.noteCreateButton}
                size='small'
                variant='outlined'
            >
                <AddIcon className={classes.addIcon} />
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
    }
});

const Fach = withStyles(fachStyles)(({ fach, studentId, openNoteModal, classes }) => {
    const veranstaltungen = getVeranstaltungenForFach(fach.id);
    return (
        <TableBody>
            {veranstaltungen
                .sort((a, b) => (
                    a.typ.localeCompare(b.typ) ||
                    a.name.localeCompare(b.name) ||
                    a.id - b.id
                ))
                .map((veranstaltung, index) => {
                    const noten = getNotenForStudentAndVeranstaltung(studentId, veranstaltung.id);
                    return (
                        <TableRow key={veranstaltung.id} className={classes.bodyRow}>
                            {index === 0 && (
                                <TableCell rowSpan={veranstaltungen.length}>{fach.name}</TableCell>
                            )}
                            <TableCell>
                                {veranstaltung.typ}
                                {veranstaltung.name && ` (${veranstaltung.name})`}
                            </TableCell>
                            <TableCell style={{textAlign: 'right'}}>
                                <Noten
                                    noten={noten}
                                    veranstaltung={veranstaltung}
                                    studentId={studentId}
                                    openNoteModal={openNoteModal}
                                />
                            </TableCell>
                        </TableRow>
                    );
                })
            }
        </TableBody>
    );
});


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

const TypenGroup = withStyles(typenGroupStyles)(({ typ, faecher, studentId, openNoteModal, classes }) => (
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
                a.name.localeCompare(b.name) ||
                a.id - b.id
            ))
            .map(fach =>
                <Fach
                    key={fach.id}
                    fach={fach}
                    studentId={studentId}
                    openNoteModal={openNoteModal}
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

const SemesterGroup = withStyles(semesterGroupStyles)(({ semester, typen, studentId, openNoteModal, classes }) => (
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
            />
        ))}
    </Fragment>
));


class FaecherGrouped extends Component {
    static propTypes = {
        studentId: PropTypes.number.isRequired,
        openNoteModal: PropTypes.func.isRequired,
    }

    state = {
        faecher: getFaecherGroupedBySemesterAndTyp(),
    }

    render() {
        const { faecher } = this.state;
        return faecher ? (
            <FilterContextConsumer>
                {({ filter }) => filter.semester ? (
                    <SemesterGroup
                        semester={filter.semester}
                        typen={faecher[filter.semester]}
                        studentId={this.props.studentId}
                        openNoteModal={this.props.openNoteModal}
                    />
                ) : (
                    Object.entries(faecher).map(([semester, typen]) => (
                        <SemesterGroup
                            key={semester}
                            semester={semester}
                            typen={typen}
                            studentId={this.props.studentId}
                            openNoteModal={this.props.openNoteModal}
                        />
                    ))
                )}
            </FilterContextConsumer>
        ) : 'Keine Fächer gefunden.';
    }
};

export default FaecherGrouped;
