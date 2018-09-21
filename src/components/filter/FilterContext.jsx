import React, { Component, createContext } from 'react';

const { Provider, Consumer } = createContext();

export const FilterContextConsumer = Consumer;

export class FilterContextProvider extends Component {
    state = {
        semester: '',
        studienkurs: '',
        jahrgang: ''
    }

    changeFilter = (name, value) => {
        this.setState({ [name]: value });
    }

    resetFilter = () => {
        this.setState({
            semester: '',
            studienkurs: '',
            jahrgang: ''
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