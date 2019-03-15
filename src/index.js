import './polyfills';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
// import { PersistGate } from 'redux-persist/integration/react'

import theme from './theme';
import store/* , { persistor } */ from './redux/store';
import App from './App';

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <AppContainer>
            <Provider store={store}>
                {/* <PersistGate loading={'Loading....'} persistor={persistor}> */}
                    <App />
                {/* </PersistGate> */}
            </Provider>
        </AppContainer>
    </MuiThemeProvider>,
    document.getElementById('root')
);
