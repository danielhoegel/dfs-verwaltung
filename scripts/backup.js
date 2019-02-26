const fs = require('fs');

const database = './server/db.json';
const backup = `./server/backups/db-${Date.now()}.json`;

// destination.txt will be created or overwritten by default.
fs.copyFile(database, backup, (err) => {
  if (err) throw err;
  console.log(`${database} was backuped to ${backup}`);
});
