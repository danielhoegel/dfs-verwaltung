import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import 'typeface-roboto';

import store from './redux/store';
import routes from './routes';
import { FilterContextProvider } from './components/filter/FilterContext';
import Layout from './components/layout/Layout';

const theme = createMuiTheme({
    palette: {
        primary: { main: '#006ab3' },
        secondary: { main: '#e2e3e3' },
    }
});

class App extends Component {
    render() {
        return (
            <Provider store={store} >
                <Router>
                    <FilterContextProvider>
                        <MuiThemeProvider theme={theme}>
                            <CssBaseline />
                            <Layout>
                                <Switch>
                                    <Redirect from='/' to='/studenten' exact />
                                    {routes.map(route => (
                                        <Route {...route} key={route.path} />
                                    ))}
                                </Switch>
                            </Layout>
                        </MuiThemeProvider>
                    </FilterContextProvider>
                </Router>
            </Provider>
        );
    }
}

export default App;
