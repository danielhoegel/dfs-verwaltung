import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import RootRef from '@material-ui/core/RootRef';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';

import { isNotEmpty } from '../../../../helper/helper';
import Expandable from '../../../../components/Expandable';

import SubjectCourseListItem from '../subjectCourse/SubjectCourseListItem';


class SubjectListItem extends Component {
    shouldComponentUpdate(nextProps) {
        const update = (
            (nextProps.subject !== this.props.subject) ||
            (nextProps.subject.subjectCourses.length !== this.props.subject.subjectCourses.length) ||
            (nextProps.expanded !== this.props.expanded) ||
            (nextProps.expanded && (
                nextProps.allowDelete !== this.props.allowDelete
                )
            )
        );
        return update;
    }

    toggleExpanded = () => {
        this.props.handleChange(this.props.subject.id);
    }

    openUpdateSubjectModal = () => {
        this.props.openUpdateSubjectModal(this.props.subject);
    }

    openDeleteSubjectModal = () => {
        this.props.openDeleteSubjectModal(this.props.subject);
    }

    openCreateSubjectCourseModal = () => {
        this.props.openCreateSubjectCourseModal(this.props.subject);
    }

    renderSubjectCourses() {
        const { subjectCourses } = this.props.subject;
        if (isNotEmpty(subjectCourses)) {
            return subjectCourses.map(subjectCourse => (
                <SubjectCourseListItem
                    key={subjectCourse.id}
                    subjectCourse={subjectCourse}
                    classes={this.props.classes}
                    allowDelete={this.props.allowDelete}
                    subject={this.props.subject}
                    openUpdateSubjectCourseModal={this.props.openUpdateSubjectCourseModal}
                    openDeleteSubjectCourseModal={this.props.openDeleteSubjectCourseModal}
                />
            ));
        }
        return null;
    }

    render() {
        const { subject, classes } = this.props;
        return (
            <RootRef rootRef={this.props.rootRef}>
                <Expandable
                    header={
                        <Typography variant='subtitle1' className={classes.expandableHeader} >
                            {subject.title}
                        </Typography>
                    }
                    expanded={this.props.expanded}
                    toggleExpanded={this.toggleExpanded}
                >
                    {subject.type.toUpperCase()}, {subject.semester}. Semester, UE {subject.ue}
                    <List>
                        {this.renderSubjectCourses()}
                    </List>
                    <div className={classes.subjectActions}>
                        <Button
                            variant='text'
                            size='small'
                            title='Fach bearbeiten'
                            className={classes.actionButton}
                            onClick={this.openUpdateSubjectModal}
                        >
                            <EditIcon className={classes.leftIcon} />
                            Bearbeiten
                        </Button>
                        <Button
                            variant='text'
                            size='small'
                            title='Veranstaltung hinzufügen'
                            className={classes.actionButton}
                            onClick={this.openCreateSubjectCourseModal}
                        >
                            <AddIcon className={classes.leftIcon} />
                            Veranstaltung
                        </Button>
                        <Button
                            variant='text'
                            size='small'
                            title='Fach löschen'
                            className={cn(classes.actionButton, classes.deleteButton)}
                            disabled={!this.props.allowDelete}
                            onClick={this.openDeleteSubjectModal}
                        >
                            <DeleteIcon className={classes.leftIcon} />
                            Löschen
                        </Button>
                    </div>
                </Expandable>
            </RootRef>
        );
    }
}

SubjectListItem.propTypes = {
    openUpdateSubjectModal: PropTypes.func.isRequired,
    openDeleteSubjectModal: PropTypes.func.isRequired,
    openCreateSubjectCourseModal: PropTypes.func.isRequired,
    openUpdateSubjectCourseModal: PropTypes.func.isRequired,
    openDeleteSubjectCourseModal: PropTypes.func.isRequired,
    subject: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    expanded: PropTypes.bool.isRequired,
    allowDelete: PropTypes.bool.isRequired,
    rootRef: PropTypes.func.isRequired,
};

export default SubjectListItem;
