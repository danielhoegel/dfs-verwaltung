import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import './App.scss';
import { FilterContextProvider } from './components/filter/FilterContext';
import Layout from './components/layout/Layout';

import StudentenListe from './routes/studenten/StudentenListe';
import StudentDetails from './routes/studenten/StudentDetails';
import LESBListe from './routes/lesb/LESBListe';
import Ergebnisse from './routes/ergebnisse/Ergebnisse';

class App extends Component {
    render() {
        return (
            <Router>
                <FilterContextProvider>
                    <Layout>
                        <Switch>
                            <Redirect from='/' to='/studenten' exact />
                            <Route path='/studenten' component={StudentenListe} exact />
                            <Route path='/studenten/:id' component={StudentDetails} />
                            <Route path='/lesb-liste' component={LESBListe} />
                            <Route path='/ergebnisse' component={Ergebnisse} />
                        </Switch>
                    </Layout>
                </FilterContextProvider>
            </Router>
        );
    }
}

export default App;
