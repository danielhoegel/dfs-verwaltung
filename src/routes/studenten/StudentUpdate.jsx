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

class StudentUpdate extends Component {
    
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
        console.log('SUBMIT', data);

        // update student
        this.props.dispatch({
            type: 'UPDATE_STUDENT',
            request: {
                url: '/students/' + data.student.id,
                method: 'put',
                data: data.student
            }
        });
        // update student information
        this.props.dispatch({
            type: 'UPDATE_STUDENT_INFORMATION',
            request: {
                url: '/studentInformations/' + data.studentInformation.id,
                method: 'put',
                data: data.studentInformation
            }
        });

        // delete studies
        const studiesToDelete = [];
        const nextStudies = data.studies
            .map(study => study.id)
            .filter(id => id !== undefined);
        console.log({ 'this.props.student': this.props.student, 'data.studies': data.studies });
        this.props.student.studies.forEach(study => {
            if(!nextStudies.includes(study.id)) {
                studiesToDelete.push(study.id);
            }
        });
        studiesToDelete.forEach(studyId => {
            this.props.dispatch({
                type: 'DELETE_STUDY',
                request: {
                    url: '/studies/' + studyId,
                    method: 'delete',
                    id: studyId
                }
            })
        })
        data.studies.forEach(study => {
            if (study.id) {
                // update studies
                this.props.dispatch({
                    type: 'UPDATE_STUDY',
                    request: {
                        url: '/studies/' + study.id,
                        method: 'put',
                        data: study
                    }
                });
            } else {
                // create studies
                this.props.dispatch({
                    type: 'CREATE_STUDY',
                    request: {
                        url: '/studies/',
                        method: 'post',
                        data: { ...study, studentId: data.student.id }
                    }
                });
            }
        });
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
    },
});

const mapStateToProps = (state, ownProps) => ({
    student: getStudentForId(state, ownProps.match.params.id),
    fetching: getStudentenFetching(state),
    studyCourses: getStudyCourses(state),
    studyRegulations: getStudyRegulations(state),
});

export default connect(mapStateToProps, { dispatch: action => action })(
    withStyles(styles)(StudentUpdate)
);
