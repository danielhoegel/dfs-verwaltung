import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import { stringsMatch } from '../../helper/helper';


const SuggestionItem = withRouter(({
    student,
    history,
    setStudentFilter,
    active,
    detailsActive
}) => {
    const goToDetails = () => {
        history.push(`/studenten/${student.id}`);
    };

    const replaceSearch = () => {
        setStudentFilter(student.name);
    }
    
    return (
        // use onMouseDown because onClick fires after the blur event of the parent
        <li onMouseDown={replaceSearch} className={active ? 'active' : ''}>
            <span title='Nach Name suchen (Enter)'>
                {student.name}
            </span>
            <Link
                to={`/studenten/${student.id}`} onMouseDown={goToDetails}
                className={(active && detailsActive) ? 'active' : ''}
                title='Zur Detailansicht wechseln (Strg + Enter)'
            >
                Details
            </Link>
        </li>
    );
});


const Suggestions = ({
    studenten,
    setStudentFilter,
    activeItem,
    detailsActive
}) => (
    <ul className='suggestions'>
        {studenten.map((student, index) => (
            <SuggestionItem
                student={student}
                key={student.id}
                setStudentFilter={setStudentFilter}
                active={index === activeItem}
                detailsActive={detailsActive}
            />
        ))}
    </ul>
);


class StudentSearch extends Component {
    static propTypes = {
        studenten: PropTypes.array.isRequired,
        setStudentFilter: PropTypes.func.isRequired,
        studentenFilter: PropTypes.string,
        history: PropTypes.object.isRequired,
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.studentFilter !== prevState._studentFilter) {
            return {
                ...prevState,
                activeItem: 0,
                detailsActive: false,
                _studentFilter: nextProps.studentFilter
            }
        }
        return null;
    }

    state = {
        suggestionsOpen: false,
        activeItem: 0,
        detailsActive: false
    }

    focusHandler = () => { this.setState({ suggestionsOpen: true }); }
    blurHandler = () => {
        this.setState({
            suggestionsOpen: false,
            activeItem: 0,
            detailsActive: false
        });
    }
        
    changeHandler = e => {
        this.props.setStudentFilter(e.target.value);
        if (!this.state.suggestionsOpen) {
            this.setState({ suggestionsOpen: true });
        }
    }

    suggestionsVisible = () => (
        this.state.suggestionsOpen &&
        this.props.studentFilter &&
        this.props.studentFilter.length >= 2
    );

    goDown() {
        this.setState(state => ({
            activeItem: (state.activeItem === this.filteredStudenten.length - 1)
                ? 0
                : state.activeItem += 1
        }));
    }

    goUp() {
        this.setState(state => ({
            activeItem: (state.activeItem === 0)
                ? this.filteredStudenten.length - 1
                : state.activeItem -= 1
        }));
    }

    toggleDetails() {
        this.setState(state => ({
            detailsActive: !state.detailsActive
        }));
    }

    activeItemHandler = (e) => {
        switch (e.key) {
            case 'ArrowDown': this.goDown(); break;
            case 'ArrowUp':   this.goUp(); break;

            case 'ArrowLeft':
            case 'ArrowRight': this.toggleDetails(); break;
            
            case 'Tab':
                e.preventDefault();
                if (e.shiftKey) this.goUp();
                else            this.goDown();
                break; 

            case 'Enter':
                const activeStudent = this.filteredStudenten[this.state.activeItem];
                if (e.ctrlKey || this.state.detailsActive) {
                    this.props.history.push(`/studenten/${activeStudent.id}`);
                }
                this.props.setStudentFilter(activeStudent.name);
                this.setState({ suggestionsOpen: false });
                break;
        
            default:
                break;
        }
    }

    filterStudenten() {
        this.filteredStudenten = this.props.studenten
            .filter(student =>
                stringsMatch(student.name, this.props.studentFilter)
            )
            .slice(0, 6);
    }

    render() {
        this.filterStudenten();
        const { studentFilter, setStudentFilter } = this.props;
        return (
            <div
                className='search'
                onFocus={this.focusHandler}
                onBlur={this.blurHandler}
                onKeyDown={this.activeItemHandler}
            >
                <input
                    type='text'
                    name='student'
                    value={studentFilter}
                    placeholder='Nach Student suchen...'
                    onChange={this.changeHandler}
                    className={studentFilter ? 'active' : ''}
                />
                {this.suggestionsVisible() && (
                    <Suggestions
                        studentFilter={studentFilter}
                        studenten={this.filteredStudenten}
                        setStudentFilter={setStudentFilter}
                        activeItem={this.state.activeItem}
                        detailsActive={this.state.detailsActive}
                    />
                )}
            </div>
        );
    }
}

export default withRouter(StudentSearch);
