// public/js/app.js

// Helper function: Render a random joke into the DOM
async function loadRandomJoke() {
    try {
      const res = await fetch('/jokebook/random');
      const data = await res.json();
      if (data.success) {
        const { setup, delivery } = data.data;
        document.getElementById('random-joke').textContent = `${setup} - ${delivery}`;
      } else {
        document.getElementById('random-joke').textContent = 'No joke found.';
      }
    } catch (err) {
      console.error('Error loading random joke:', err);
      document.getElementById('random-joke').textContent = 'Error loading joke.';
    }
  }
  
  // Helper function: Load categories and display them as buttons
  async function loadCategories() {
    try {
      const res = await fetch('/jokebook/categories');
      const data = await res.json();
      const listDiv = document.getElementById('categories-list');
      listDiv.innerHTML = ''; // clear current list
  
      if (data.success) {
        data.data.forEach(category => {
          const btn = document.createElement('button');
          btn.textContent = category;
          btn.addEventListener('click', () => loadJokesByCategory(category));
          listDiv.appendChild(btn);
        });
      } else {
        listDiv.textContent = 'Failed to load categories.';
      }
    } catch (err) {
      console.error('Error loading categories:', err);
      document.getElementById('categories-list').textContent = 'Error loading categories.';
    }
  }
  
  // Helper function: Load jokes for a given category and display them
  async function loadJokesByCategory(category) {
    try {
      const res = await fetch(`/jokebook/joke/${category}`);
      const data = await res.json();
      const jokesContainer = document.getElementById('jokes-container');
      jokesContainer.innerHTML = `<h3>Jokes in ${category}</h3>`;
      if (data.success) {
        data.data.forEach(joke => {
          const p = document.createElement('p');
          p.textContent = `${joke.setup} — ${joke.delivery}`;
          jokesContainer.appendChild(p);
        });
      } else {
        jokesContainer.textContent = data.message;
      }
    } catch (err) {
      console.error('Error loading jokes for category:', err);
      document.getElementById('jokes-container').textContent = 'Error loading jokes.';
    }
  }
  
  // Event listener for refresh random joke button
  document.getElementById('refresh-random').addEventListener('click', loadRandomJoke);
  
  // Event listener for Load Categories button
  document.getElementById('load-categories').addEventListener('click', loadCategories);
  
  // Event listener for Search Form submission
  document.getElementById('search-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const category = document.getElementById('search-category').value.trim();
    if (category) {
      loadJokesByCategory(category);
    }
  });
  
  // Event listener for Add New Joke Form submission
  document.getElementById('add-joke-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const category = document.getElementById('new-category').value.trim();
    const setup = document.getElementById('new-setup').value.trim();
    const delivery = document.getElementById('new-delivery').value.trim();
  
    if (!category || !setup || !delivery) {
      alert('All fields are required.');
      return;
    }
  
    try {
      const res = await fetch('/jokebook/joke/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, setup, delivery })
      });
      const data = await res.json();
      if (data.success) {
        // Provide feedback by reloading the jokes for the category
        document.getElementById('new-joke-feedback').innerHTML = `<h3>Updated jokes in ${category}</h3>`;
        data.data.forEach(joke => {
          const p = document.createElement('p');
          p.textContent = `${joke.setup} — ${joke.delivery}`;
          document.getElementById('new-joke-feedback').appendChild(p);
        });
        // Optionally, clear the form fields
        e.target.reset();
      } else {
        document.getElementById('new-joke-feedback').textContent = data.message;
      }
    } catch (err) {
      console.error('Error adding new joke:', err);
      document.getElementById('new-joke-feedback').textContent = 'Error adding joke.';
    }
  });
  
  // Initial load: fetch and display a random joke when the page loads
  loadRandomJoke();
  