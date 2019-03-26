/* eslint-disable no-console */

const fs = require('fs');

const database = './server/datenbank.json';
const backupDir = './server/backups';
const backup = `${backupDir}/datenbank-backup-${Date.now()}.json`;

if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir);
}

fs.copyFile(database, backup, (err) => {
    if (err) throw err;
    console.log(`${database} was backuped to ${backup}`);
});
