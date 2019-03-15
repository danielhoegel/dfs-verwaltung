import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import { hot } from 'react-hot-loader';
import CssBaseline from '@material-ui/core/CssBaseline';

import 'typeface-roboto';

import routes from './routes';
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
                <Fragment>
                    <CssBaseline />
                    <Layout>
                        <Switch>
                            <Redirect from='/' to='/studenten' exact />
                            {routes.map(route => (
                                <Route {...route} key={route.path} />
                            ))}
                        </Switch>
                    </Layout>
                </Fragment>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => ({
    entities: state.entities,
});

const AppContainer = connect(mapStateToProps)(App);

export default process.env.NODE_ENV === "development"
    ? hot(module)(AppContainer)
    : AppContainer
