import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import RootRef from '@material-ui/core/RootRef';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';

import { isNotEmpty } from '../../../../helper/helper';
import Expandable from '../../../../components/Expandable';

import SubjectCourse from './SubjectCourse';


class Subject extends Component {
    shouldComponentUpdate(nextProps) {
        return (
            (nextProps.expanded !== this.props.expanded) ||
            (nextProps.expanded && (
                nextProps.allowDelete !== this.props.allowDelete
            ))
        );
    }

    toggleExpanded = () => {
        this.props.handleChange(this.props.subject.id);
    }

    render() {
        const { subject, classes } = this.props;
        return (
            <RootRef rootRef={this.props.rootRef}>
                <Expandable
                    header={
                        <Typography variant='subheading' className={classes.expandableHeader} >
                            {subject.title}
                        </Typography>
                    }
                    expanded={this.props.expanded}
                    toggleExpanded={this.toggleExpanded}
                >
                    {subject.type.toUpperCase()}, {subject.semester}. Semester, UE {subject.ue}
                    <List>
                        {isNotEmpty(subject.subjectCourses) && subject.subjectCourses.map(subjectCourse => (
                            <SubjectCourse
                                key={subjectCourse.id}
                                subjectCourse={subjectCourse}
                                classes={classes}
                                allowDelete={this.props.allowDelete}
                                subject={subject}
                            />
                        ))}
                    </List>
                    <div className={classes.subjectActions}>
                        <Button
                            variant='flat'
                            size='small'
                            title='Fach bearbeiten'
                            className={classes.actionButton}
                        >
                            <EditIcon className={classes.leftIcon} />
                            Bearbeiten
                        </Button>
                        <Button
                            variant='flat'
                            size='small'
                            title='Veranstaltung hinzufügen'
                            className={classes.actionButton}
                        >
                            <AddIcon className={classes.leftIcon} />
                            Veranstaltung
                        </Button>
                        <Button
                            variant='flat'
                            size='small'
                            title='Fach löschen'
                            className={classes.actionButton}
                            disabled={!this.props.allowDelete}
                        >
                            <DeleteIcon className={classes.leftIcon} />
                            Löschen
                        </Button>
                    </div>
                </Expandable>
            </RootRef>
        )
    }
}

export default Subject;