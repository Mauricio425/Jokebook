const express = require('express');
const router = express.Router();
const jokebookController = require('../controllers/jokebook_controller');

// Endpoint: Get list of joke categories.
router.get('/categories', jokebookController.getCategories);

// Endpoint: Get jokes from a specific category (with optional ?limit).
router.get('/joke/:category', jokebookController.getJokesByCategory);

// Endpoint: Get one random joke.
router.get('/random', jokebookController.getRandomJoke);

// Endpoint: Add a new joke.
router.post('/joke/add', jokebookController.addNewJoke);

module.exports = router;
