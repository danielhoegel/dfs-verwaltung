import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import { getSubjectsByStudyRegulationIdGroupedBySemesterAndType } from '../../../../redux/entitiesSelector';
import SubjectListItem from './SubjectListItem';
import { isNotEmpty } from '../../../../helper/helper';
import entitiesActions from '../../../../redux/entitiesActions';
import Placeholder from '../../../../components/placeholder/Placeholder';


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
                <TableCell className={classes.headCell} style={{ width: '30%' }}>Fach ({type.toUpperCase()})</TableCell>
                <TableCell className={classes.headCell} style={{ width: '40%' }}>Veranstaltung</TableCell>
                <TableCell className={classes.headCell} style={{ width: '30%' }}>(Punkte)</TableCell>
            </TableRow>
        </TableHead>
        {subjects
            .sort((a, b) => (
                a.type.localeCompare(b.type) ||
                a.title.localeCompare(b.title) ||
                a.id - b.id
            ))
            .map(subject =>
                <SubjectListItem
                    key={subject.id}
                    subject={subject}
                    studentId={studentId}
                    openGradeModal={openGradeModal}
                    study={study}
                />
            )
        }
    </Table>
));


const SubjectsLoading = () => (
    <Placeholder>
        <Placeholder.Item height='2rem' />
        <Placeholder.Item height='3rem' width='80%' />
        <Placeholder.Item height='4rem' width='90%' />
        <Placeholder.Item width='60%' />
        <Placeholder.Item height='2rem' width='80%' />
        <Placeholder.Item height='3rem' width='85%' />
        <Placeholder.Item height='4rem' width='75%' />
    </Placeholder>
);

class SubjectList extends Component {
    static propTypes = {
        studentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        openGradeModal: PropTypes.func.isRequired,
        study: PropTypes.object.isRequired,
        groupedSubjects: PropTypes.object.isRequired,
        classes: PropTypes.object.isRequired,
    }

    state = {
        fetchingGrades: true,
    }

    componentDidMount() {
        this.setState({ fetchingGrades: true });
        this.props.fetchGradesByStudyId(this.props.study.id)
        .then(() => this.setState({ fetchingGrades: false }));
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.fetchingGrades !== this.props.fetchingGrades;
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
                );
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
                );
            }
        }
        return semesterGroups;
    }

    render() {
        return this.state.fetchingGrades ? <SubjectsLoading /> : isNotEmpty(this.props.groupedSubjects)
            ? this.renderSemesterGroups()
            : 'Keine Fächer gefunden.';
    }
}

const styles = theme => ({
    header: {
        fontSize: 2 * theme.spacing.unit
    }
});


const mapStateToProps = (state, props) => ({
    groupedSubjects: getSubjectsByStudyRegulationIdGroupedBySemesterAndType(state, props.studyRegulationId)
});

const mapDispatchToProps = {
    fetchGradesByStudyId: entitiesActions.grade.fetchByKey('studyId'),
};

export default connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles)(SubjectList)
);
