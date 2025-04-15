const connectToDatabase = require('../db/db.js');

async function getCategories() {
  const db = await connectToDatabase();
  const rows = await db.all('SELECT name FROM categories');
  return rows.map(row => row.name);
}

async function getJokesByCategory(category, limit = null) {
  const db = await connectToDatabase();

  const categoryRow = await db.get('SELECT id FROM categories WHERE name = ?', [category]);
  if (!categoryRow) {
    throw new Error(`Category '${category}' not found.`);
  }
  const query = 'SELECT setup, delivery FROM jokes WHERE category_id = ?' + (limit ? ' LIMIT ?' : '');
  return limit
    ? await db.all(query, [categoryRow.id, limit])
    : await db.all(query, [categoryRow.id]);
}

async function getRandomJoke() {
  const db = await connectToDatabase();
  const joke = await db.get('SELECT setup, delivery FROM jokes ORDER BY RANDOM() LIMIT 1');
  return joke;
}

async function addNewJoke(category, setup, delivery) {
  const db = await connectToDatabase();

  await db.run('INSERT OR IGNORE INTO categories (name) VALUES (?)', [category]);
  const categoryRow = await db.get('SELECT id FROM categories WHERE name = ?', [category]);
  await db.run('INSERT INTO jokes (category_id, setup, delivery) VALUES (?, ?, ?)', [categoryRow.id, setup, delivery]);
  return await db.all('SELECT setup, delivery FROM jokes WHERE category_id = ?', [categoryRow.id]);
}

module.exports = {
  getCategories,
  getJokesByCategory,
  getRandomJoke,
  addNewJoke,
};
