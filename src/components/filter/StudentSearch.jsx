import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Search } from 'semantic-ui-react';

import { stringsMatch } from '../../helper/helper';


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
                _studentFilter: nextProps.studentFilter
            }
        }
        return null;
    }

    state = {
        activeItem: 0,
        isLoading: false,
        results: []
    }

    handleResultSelect = (e, { result }) => {
        this.props.setStudentFilter(result);
    }

    handleSearchChange = (e, { value }) => {
        this.setState({
            isLoading: true,
            results: this.props.studenten
                .filter(student =>
                    stringsMatch(student.name, this.props.studentFilter)
                )
                .slice(0, 6)
        }, () => {
            this.setState({ isLoading: false });
        });
      }

    render() {
        const { studentenFilter } = this.props;
        const { isLoading, results } = this.state

        return (
            <Search
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={this.handleSearchChange}
                results={results}
                value={studentenFilter}
          />
        );
    }
}

export default withRouter(StudentSearch);
