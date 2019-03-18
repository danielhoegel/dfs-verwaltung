const fs = require('fs');

const database = './datenbank/datenbank.json';
const backupDir = './datenbank/backups';
const backup = `${backupDir}/datenbank-backup-${Date.now()}.json`;

if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir);
}

fs.copyFile(database, backup, (err) => {
    if (err) throw err;
    console.log(`${database} was backuped to ${backup}`);
});
