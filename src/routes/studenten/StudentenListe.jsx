import React, { Component } from 'react';

import Placeholder from '../../components/placeholder/Placeholder';
import { FilterContextConsumer } from '../../components/filter/FilterContext';
import { translateStudienkurse } from '../../helper/helper';
import apiRequest from '../../helper/apiRequest';


const StudentenlisteLoading = () => (
    <Placeholder>
        <Placeholder.Item height='2.5rem' />
        <Placeholder.Item height='2rem' width='70%' />
        <Placeholder.Item height='2rem' width='60%' />
        <Placeholder.Item height='2rem' width='90%' />
        <Placeholder.Item height='2rem' width='80%' />
    </Placeholder>
)

class StudentenListe extends Component {
    state = {
        studenten: []
    }
    
    componentDidMount() {
        apiRequest('/studenten').then(studenten =>
            this.setState({ studenten })
        );
    }
    

    goToDetails = (id) => {
        this.props.history.push(`studenten/${id}`)
    }

    render() {
        return (
            <FilterContextConsumer>
                {({ filter }) => (
                    this.state.studenten.length ? (
                        <table className='hoverable striped'>
                            <thead>
                                <tr>
                                    <th style={{width: '10%'}}>ID</th>
                                    <th>Name</th>
                                    <th style={{width: '25%'}}>Studienkurs</th>
                                    <th style={{width: '15%'}}>Jahrgang</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.studenten
                                    .filter(student => (
                                        (!filter.jahrgang || parseInt(filter.jahrgang, 10) === student.jahrgang) &&
                                        (!filter.studienkurs || filter.studienkurs === student.studienkurs) &&
                                        (!filter.student || student.name.toLocaleLowerCase().indexOf(filter.student.toLocaleLowerCase()) !== -1)
                                    ))
                                    .map(student => (
                                        <tr
                                            key={student.id}
                                            onClick={() => this.goToDetails(student.id)}
                                        >
                                            <td>{student.id}</td>
                                            <td>{student.name}</td>
                                            <td>{translateStudienkurse(student.studienkurs)}</td>
                                            <td>{student.jahrgang}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    ) : <StudentenlisteLoading />
                )}
            </FilterContextConsumer>
        );
    }
}

export default StudentenListe;
