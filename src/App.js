import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'semantic-ui-css/semantic.min.css';
import './styles/main.scss';
import routes from './routes';
import { FilterContextProvider } from './components/filter/FilterContext';
import Layout from './components/layout/Layout';

class App extends Component {
    render() {
        return (
            <Router>
                <FilterContextProvider>
                    <Layout>
                        <Switch>
                            <Redirect from='/' to='/studenten' exact />
                            {routes.map(route => (
                                <Route {...route} key={route.path} />
                            ))}
                        </Switch>
                    </Layout>
                </FilterContextProvider>
            </Router>
        );
    }
}

export default App;
