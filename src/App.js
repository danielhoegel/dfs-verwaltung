import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';

import 'typeface-roboto';

import routes from './routes';
import { FilterContextProvider } from './components/filter/FilterContext';
import Layout from './components/layout/Layout';


class App extends Component {
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

export default App;
