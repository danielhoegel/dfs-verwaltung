import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchIcon from '@material-ui/icons/Search';
import Search from '../../Search';

import { isNotEmpty } from '../../../helper/helper';
import { intersectionBy } from 'lodash';


const GROUPS = {
    'SUBJECTS': 'Fächer',
    'STUDENTS': 'Studenten'
};


class GlobalSearch extends Component {
    state = {
        searchValue: '',
        fetching: false,
        options: [],
        subjects: [], // stored just for reference
        students: [], // stored just for reference
    }

    changeHandler = (searchValue) => {
        // console.log('CHANGE', { searchValue });
        if (isNotEmpty(searchValue)) {
            this.queryData(searchValue);
            this.setState({ searchValue });
        } else {
            this.setState({
                searchValue: '',
                options: [],
            })
        }
    }

    selectHandler = (value, group) => {
        console.log('SELECT', { value, group });
        if (group === GROUPS.STUDENTS) {
            this.props.history.push(`/studenten/${value}`);
        } else if (group === GROUPS.SUBJECTS) {
            console.log('SELECT SUBJECT - subjects:', this.state.subjects);
            const { studyCourseId, studyRegulationId } = this.state.subjects.filter(subject => subject.id === value)[0];
            this.props.history.push(`/studienkurse/${studyCourseId}/studienordnung/${studyRegulationId}/${value}`);
        }
    }

    queryData(searchValue) {
        // this.setState({ fetching: true });

        // remove spaces at start and end, replace multiple spaces with single space
        const trimmedSearchValue = searchValue.trim().replace(/ +(?= )/g,'');
        
        const studentRequests = [];
        const searchWords = trimmedSearchValue.split(' ');
        searchWords.forEach(searchWord => {
            studentRequests.push(axios.get(`/students?q=${searchWord}&_limit=3`));
        });

        const subjectRequest = axios.get(`/subjects?_expand=studyCourse&_expand=studyRegulation&title_like=${trimmedSearchValue}&_limit=3`);

        // combine all requests
        axios.all(studentRequests.concat(subjectRequest))
            .then(results => {
                // remove the last element from results and save it in matchingSubjects
                const matchingSubjects = results.splice(-1)[0].data;
                
                // create intersection of all student requests
                const studentArrays = results.map(studentResult => studentResult.data);
                const matchingStudents = intersectionBy(...studentArrays, 'id');
                
                const studentOptions = matchingStudents.map(student => ({
                    label: `${student.firstName} ${student.lastName}`,
                    value: student.id,
                    secondary: `Matrikelnummer: ${student.matrikelnummer}`,
                    group: GROUPS.STUDENTS,
                }));

                const subjectOptions = matchingSubjects.map(subject => ({
                    label: `${subject.title}`,
                    value: subject.id,
                    secondary: `${subject.studyCourse.title}, ${subject.studyRegulation.title}`,
                    group: GROUPS.SUBJECTS,
                }));

                this.setState({ 
                    options: studentOptions.concat(subjectOptions),
                    fetching: false,
                    students: matchingStudents, // stored just for reference
                    subjects: matchingSubjects, // stored just for reference
                });
            });
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.search} title='Suche nach Student, Matrikelnummer oder Fach'>
                <div className={classes.searchIcon}>
                    {this.state.fetching
                        ? <CircularProgress color='inherit' size={24} />
                        : <SearchIcon />
                    }
                </div>

                <Search
                    searchValue={this.state.searchValue}
                    options={this.state.options}
                    onSelect={this.selectHandler}
                    onInputChange={this.changeHandler}
                    placeholder='Suchen...'
                    popperAlign='right'
                    maxHeight='320px'
                    fixedWidth='420px'
                    noClearIcon
                    noDropdownIcon
                    floatingMenu
                    grouped
                    inputProps={{
                        disableUnderline: true,
                        classes: { root: classes.inputRoot, input: classes.inputInput }
                    }}
                />
          </div>
        )
    }
}


const styles = theme => ({
    search: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit,
            width: 'auto',
        },
    },
    searchIcon: {
        margin: [[0, 3 * theme.spacing.unit]],
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        width: '100%',
        paddingRight: theme.spacing.unit,
        [theme.breakpoints.up('sm')]: {
            width: 120,
            transition: theme.transitions.create('width'),
            '&:focus': {
                    width: 200,
            },
        },
    },
});

export default withRouter(
    withStyles(styles)(GlobalSearch)
);
