const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const entities = require('./entities');


// Create Database
const adapter = new FileSync('server/datenbank.json')
const db = low(adapter)

// Set some database defaults (required if your JSON file is empty)
const defaults = {};

entities.forEach(entity => {
    defaults[entity] = [];
});

db.defaults(defaults).write();

module.exports = db;
