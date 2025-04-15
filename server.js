// server.js
const express = require('express');
const app = express();
const PORT = 3000;

// Import the jokebook router.
const jokebookRoutes = require('./routes/jokebook_routes');

// Middleware: Parse JSON bodies.
app.use(express.json());

// Middleware: Serve static files from the "public" folder.
app.use(express.static('public'));

// Mount the jokebook router on the /jokebook path.
app.use('/jokebook', jokebookRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
