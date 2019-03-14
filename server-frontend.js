const express = require('express');
const open = require('opn');
const path = require('path');

const server = express();

// path for static files
server.use(express.static(path.join(__dirname, 'build')));

// always serve index.html
server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'));
});

const PORT = process.env.PORT || 3303;

server.listen(PORT, () => {
    console.log(`Frontend server startet on http://localhost:${PORT}`);
    open(`http://localhost:${PORT}`);
});
