const API_URL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const loader = document.getElementById('loader');
const errorMessage = document.getElementById('error-message');

// Show loader while fetching data
function showLoader() {
  loader.classList.remove('hidden');
}

// Hide loader after data is fetched
function hideLoader() {
  loader.classList.add('hidden');
}

// Display error messages
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove('hidden');
  // Hide error after 3 seconds
  setTimeout(() => errorMessage.classList.add('hidden'), 3000);
}

// Fetch movies from API
async function getMovies(url) {
  showLoader();
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Failed to fetch movies.');
    }
    const data = await res.json();
    if (data.results.length === 0) {
      main.innerHTML = '<p class="no-results">No movies found.</p>';
    } else {
      showMovies(data.results);
    }
  } catch (error) {
    showError(error.message);
  } finally {
    hideLoader();
  }
}

// Create and display movie cards
function showMovies(movies) {
  main.innerHTML = '';
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');

    movieEl.innerHTML = `
      <img src="${
        poster_path ? IMG_PATH + poster_path : 'placeholder.jpg'
      }" alt="${title}">
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
      </div>
      <div class="overview">
        <h3>Overview</h3>
        <p>${overview}</p>
      </div>
    `;

    main.appendChild(movieEl);

    // Add fade-in animation
    setTimeout(() => movieEl.classList.add('show'), 100);
  });
}

// Return a class based on movie rating
function getClassByRate(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}

// Handle search form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = search.value.trim();

  if (searchTerm) {
    getMovies(SEARCH_API + encodeURIComponent(searchTerm));
    search.value = '';
  } else {
    // Reload popular movies if search is empty
    getMovies(API_URL);
  }
});

// Initial load of movies
getMovies(API_URL);
