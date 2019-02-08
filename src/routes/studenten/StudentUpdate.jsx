import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeftRounded';

import { isNotEmpty, isEmpty } from '../../helper/helper';
import HiddenDivider from '../../components/HiddenDivider';
import MyForm from '../../components/MyForm';
import StudentFields from '../../components/fields/StudentFields';

import { getStudentForId, getStudentenFetching } from './redux/studentenSelectors';
import { getStudyCourses, getStudyRegulations } from '../../redux/entitiesSelector';
import entitiesActions from '../../redux/entitiesActions';

class StudentUpdate extends Component {

    state = {
        updating: false,
        error: null
    }
    
    componentDidMount() {
        // fetch student data if not already available
        if (isEmpty(this.props.student)) {
            this.props.dispatch({
                type: 'FETCH_STUDENT',
                request: {
                    url: `/students/${this.props.match.params.id}?_embed=studies&_embed=studentInformations`
                }
            });
        }
    }
    
    goBack = () => {
        this.props.history.goBack();
    }

    updateStudent = (data) => {
        this.setState({
            updating: true,
            error: null
        });

        const requests = [];

        // update student
        requests.push(this.props.updateStudent(data.student));
        requests.push(this.props.updateStudentInformation(data.studentInformation));

        // delete studies
        const nextStudiesWithId = data.studies.filter(({ id }) => id !== undefined );
        console.log({ 'this.props.student': this.props.student, 'data.studies': data.studies });
        this.props.student.studies.forEach(study => {
            if(!nextStudiesWithId.includes(study.id)) {
                requests.push(this.props.deleteStudy(study));
            }
        });

        // update & create studies
        data.studies.forEach(study => {
            if (study.id) {
                requests.push(this.props.updateStudy(study));
            } else {
                requests.push(this.props.createStudy({ ...study, studentId: data.student.id }));
            }
        });

        // requests finished
        Promise.all(requests)
        .then(this.goBack)
        .catch(err => {
            console.log('Error while updating!', err);
            this.setState({
                updating: false,
                error: err.message
            });
        })
    }

    render() {
        if (!this.props.fetching && isNotEmpty(this.props.student)) {
            const { classes } = this.props;
            const { studentInformation, studies, ...student } = this.props.student;
            return (
                <div>
                    <Typography variant="display1" gutterBottom>
                        Bearbeite {student.firstName} {student.lastName}
                    </Typography>

                    <HiddenDivider />
                    <Button onClick={this.goBack} className={classes.button} >
                        <ChevronLeftIcon className={classes.leftIcon} />
                        Zurück
                    </Button>

                    <MyForm
                        fields={StudentFields}
                        onSubmit={this.updateStudent}
                        defaultValues={{ studentInformation, studies, student }}
                        onCancel={this.goBack}
                        studyRegulations={this.props.studyRegulations}
                        studyCourses={this.props.studyCourses}
                        loading={this.state.updating}
                        error={this.state.error}
                    />
                </div>
            );
        } else {
            return <CircularProgress />;
        }
    }
}

const styles = theme => ({
    button: {
        '&:not(:last-child)': {
            marginRight: theme.spacing.unit,
        },
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    }
});

const mapStateToProps = (state, ownProps) => ({
    student: getStudentForId(state, ownProps.match.params.id),
    fetching: getStudentenFetching(state),
    studyCourses: getStudyCourses(state),
    studyRegulations: getStudyRegulations(state),
});

const mapDispatchToProps = {
    updateStudent: entitiesActions.student.update,
    updateStudentInformation: entitiesActions.studentInformation.update,
    deleteStudy: entitiesActions.study.delete,
    updateStudy: entitiesActions.study.update,
    createStudy: entitiesActions.study.create,
}

export default connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles)(StudentUpdate)
);
