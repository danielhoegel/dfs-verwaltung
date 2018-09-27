import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import 'typeface-roboto';

// import '@fortawesome/fontawesome-free/css/all.min.css';
// import './styles/main.scss';
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
        );
    }
}

export default App;
