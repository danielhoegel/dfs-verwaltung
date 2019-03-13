import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import { getSubjectsByStudyRegulationIdGroupedBySemesterAndType } from '../../../../redux/entitiesSelector';
import SubjectListItem from './SubjectListItem';
import { isNotEmpty } from '../../../../helper/helper';


const TypeGroup = withStyles(theme => ({
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
}))(({
    type,
    subjects,
    studentId,
    openGradeModal,
    study,
    classes
}) => (
    <Table padding='dense' className={classes.table}>
        <TableHead className={classes.tableHead}>
            <TableRow className={classes.headRow}>
                <TableCell className={classes.headCell} style={{width: '30%'}}>Fach ({type.toUpperCase()})</TableCell>
                <TableCell className={classes.headCell} style={{width: '50%'}}>Veranstaltung</TableCell>
                <TableCell className={classes.headCell} style={{width: '20%'}}>(Punkte)</TableCell>
            </TableRow>
        </TableHead>
        {subjects    
            .sort((a, b) => (
                a.type.localeCompare(b.type) ||
                a.title.localeCompare(b.title) ||
                a.id - b.id
            ))
            .map(fach =>
                <SubjectListItem
                    key={fach.id}
                    subject={fach}
                    studentId={studentId}
                    openGradeModal={openGradeModal}
                    study={study}
                />
            )
        }
    </Table>
));


class SubjectList extends Component {
    static propTypes = {
        studentId: PropTypes.number.isRequired,
        openGradeModal: PropTypes.func.isRequired,
        study: PropTypes.object.isRequired,
        groupedSubjects: PropTypes.object.isRequired,
        classes: PropTypes.object.isRequired,
    }

    shouldComponentUpdate() {
        return false;
    }

    renderTypeGroups(groupedSubjects) {
        const typeGroupes = [];
        for (const type in groupedSubjects) {
            if (groupedSubjects.hasOwnProperty(type)) {
                typeGroupes.push(
                    <TypeGroup
                        key={type}
                        type={type}
                        subjects={groupedSubjects[type]}
                        studentId={this.props.studentId}
                        openGradeModal={this.props.openGradeModal}
                        study={this.props.study}
                    />
                )
            }
        }
        return typeGroupes;
    }

    renderSemesterGroups() {
        const semesterGroups = [];
        for (const semester in this.props.groupedSubjects) {
            if (this.props.groupedSubjects.hasOwnProperty(semester)) {
                semesterGroups.push(
                    <Fragment key={semester}>
                        <Typography
                            variant='h4'
                            component='h3'
                            gutterBottom
                            className={this.props.classes.header}
                        >
                            {semester}. Semester
                        </Typography>
                        {this.renderTypeGroups(this.props.groupedSubjects[semester])}
                    </Fragment>
                )
            }
        }
        return semesterGroups;
    }

    render() {
        return isNotEmpty(this.props.groupedSubjects)
            ? this.renderSemesterGroups()
            : 'Keine Fächer gefunden.';
    }
};

const mapStateToProps = (state, props) => ({
    groupedSubjects: getSubjectsByStudyRegulationIdGroupedBySemesterAndType(state, props.studyRegulationId)
});

const styles = theme => ({
    header: {
        fontSize: 2 * theme.spacing.unit
    }
});

export default connect(mapStateToProps)(
    withStyles(styles)(SubjectList)
);
