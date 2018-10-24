import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';

import 'typeface-roboto';

import routes from './routes';
import { FilterContextProvider } from './components/filter/FilterContext';
import Layout from './components/layout/Layout';
import { isEmpty } from './helper/helper';


class App extends Component {   
    componentDidMount() {
        // load all data
        if (isEmpty(this.props.entities.students)) {
            this.props.dispatch({
                type: 'FETCH_ALL_DATA',
                request: { url: '/db' }
            });
        }
    }

    render() {
        return (
            <BrowserRouter>
                <FilterContextProvider>
                    <CssBaseline />
                    <Layout>
                        <Switch>
                            <Redirect from='/' to='/studenten' exact />
                            {routes.map(route => (
                                <Route {...route} key={route.path} />
                            ))}
                        </Switch>
                    </Layout>
                </FilterContextProvider>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => ({
    entities: state.entities,
});

export default connect(mapStateToProps)(App);
