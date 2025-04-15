const jokebookModel = require('../models/jokebook_model');

exports.getCategories = async (req, res) => {
  try {
    const categories = await jokebookModel.getCategories();
    res.json({ success: true, data: categories });
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ success: false, message: 'Failed to retrieve categories.' });
  }
};

exports.getJokesByCategory = async (req, res) => {
  const { category } = req.params;
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : null;

  try {
    const jokes = await jokebookModel.getJokesByCategory(category, limit);
    res.json({ success: true, category, data: jokes });
  } catch (err) {
    console.error('Error fetching jokes for category:', err);

    if (err.message.includes('not found')) {
      res.status(404).json({ success: false, message: err.message });
    } else {
      res.status(500).json({ success: false, message: 'Failed to retrieve jokes.' });
    }
  }
};

exports.getRandomJoke = async (req, res) => {
  try {
    const joke = await jokebookModel.getRandomJoke();
    if (!joke) {
      return res.status(404).json({ success: false, message: 'No jokes found.' });
    }
    res.json({ success: true, data: joke });
  } catch (err) {
    console.error('Error fetching a random joke:', err);
    res.status(500).json({ success: false, message: 'Failed to retrieve a random joke.' });
  }
};

exports.addNewJoke = async (req, res) => {
  const { category, setup, delivery } = req.body;
  if (!category || !setup || !delivery) {
    return res.status(400).json({
      success: false,
      message: 'Missing one or more required fields: category, setup, delivery.',
    });
  }

  try {
    const jokes = await jokebookModel.addNewJoke(category, setup, delivery);
    res.status(201).json({
      success: true,
      message: `New joke added to category '${category}'.`,
      data: jokes,
    });
  } catch (err) {
    console.error('Error adding new joke:', err);
    res.status(500).json({ success: false, message: 'Failed to add new joke.' });
  }
};
