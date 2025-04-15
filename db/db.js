const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

async function connectToDatabase() {
  const db = await open({
    filename: './jokebook.db',
    driver: sqlite3.Database,
  });
  return db;
}

module.exports = connectToDatabase;
