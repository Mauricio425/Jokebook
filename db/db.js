const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

const path = require('path');

async function connectToDatabase() {
  const dbFilePath = path.join(__dirname, 'jokebook.db');
  console.log('Using DB file at:', dbFilePath);

  const db = await open({
    filename: dbFilePath,
    driver: sqlite3.Database,
  });
  return db;
}


module.exports = connectToDatabase;
