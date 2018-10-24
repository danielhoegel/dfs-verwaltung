import './polyfills';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react'
import { MuiThemeProvider } from '@material-ui/core/styles';

import theme from './theme';
import store/* , { persistor } */ from './redux/store';
import App from './App';

const render = (AppComponent) => {
    ReactDOM.render(
        <MuiThemeProvider theme={theme}>
            <AppContainer>
                <Provider store={store}>
                    {/* <PersistGate loading={'Loading....'} persistor={persistor}> */}
                        <AppComponent />
                    {/* </PersistGate> */}
                </Provider>
            </AppContainer>
        </MuiThemeProvider>,
        document.getElementById('root')
    );
};

// Render once
render(App);

// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./App', () => {
        const nextApp = require('./App').default;
        render(nextApp);
    });
}



