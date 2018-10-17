import React, { Component, createContext } from 'react';

const { Provider, Consumer } = createContext();

export const FilterContextConsumer = Consumer;

export class FilterContextProvider extends Component {
    state = {
        semester: '',
        studienkurs: '',
        jahrgang: '',
        student: ''
    }

    changeFilter = (name, value) => {
        console.log('changeFilter', { name, value });
        this.setState({ [name]: value });
    }

    resetFilter = () => {
        this.setState({
            semester: '',
            studienkurs: '',
            jahrgang: '',
            student: ''
        });
    }

    render() {
        return (
            <Provider value={{
                filter: this.state,
                change: this.changeFilter,
                reset: this.resetFilter
            }}>
                {this.props.children}
            </Provider>
        )
    }
}