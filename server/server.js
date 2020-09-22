/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const open = require('open');

require('./utils/db'); // initialize db
const routes = require('./routes/routes');
const { time } = require('./utils/utils');


// create server
const server = express();

// create a write stream (in append mode) for the logger
const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}
const accessLogStream = fs.createWriteStream(path.join(logDir, 'server_logs.log'), { flags: 'a' });

// setup logger
morgan.token('time', () => time());
const loggerFormat = '[:time] :method :url :status - :response-time ms';
const loggerOptions = {
    skip: req => req.baseUrl !== '/api' // skip logs for every route expect for /api/...
};
server.use(morgan(loggerFormat, { stream: accessLogStream, ...loggerOptions })); // log to file
server.use(morgan(loggerFormat, loggerOptions)); // log to console

// allow CORS
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

// parse json body
server.use(express.json());

// path for static files
server.use(express.static(path.join(__dirname, '../build')));

// add api routes
server.use('/api', routes);

// serve index.html
if (process.env.NODE_ENV !== 'development') {
    server.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../build/index.html'));
    });
}

// start server and open in frontend in browser
const PORT = process.env.PORT || 4444;
server.listen(PORT, () => {
    console.log(`[${time()}] Server startet at http://localhost:${PORT}`);

    if (process.env.NODE_ENV !== 'development') {
        // BUG: the browser is also opening in development mode
        open(`http://localhost:${PORT}`);
    }
});
