/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');
const express = require('express');
const morgan = require('morgan');

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
server.use(morgan(loggerFormat, { stream: accessLogStream })); // log to file
server.use(morgan(loggerFormat)); // log to console

// allow CORS
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

// parse json body
server.use(express.json());

// add routes
server.use('/', routes);


// start server
const PORT = process.env.PORT || 4444;
server.listen(PORT, () => {
    console.log(`[${time()}] Backend server startet at http://localhost:${PORT}`);
});
