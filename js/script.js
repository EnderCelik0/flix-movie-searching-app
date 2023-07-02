const global = {
  currentPage: window.location.pathname,
};

function higlightText() {
  const links = document.querySelectorAll('.nav-link');

  links.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  });
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}
function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

async function displayPopularShows() {
  const { results } = await fetchApiData('tv/popular');
  const popularShows = document.getElementById('popular-shows');

  results.forEach((show) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
          <a href="tv-details.html?id=${show.id}">
            ${
              show.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.name}"
            />`
                : `
            <img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="Show Title"
            />
            `
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Aired: ${show.first_air_date}</small>
            </p>
          </div>
           `;
    popularShows.appendChild(div);
  });
}

async function displayPopularMovies() {
  const { results } = await fetchApiData('movie/popular');
  const popularMovies = document.getElementById('popular-movies');

  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <a href="movie-details.html?id=${movie.id}">
      ${
        movie.poster_path
          ? `<img
            src='https://image.tmdb.org/t/p/w500${movie.poster_path}'
            class='card-img-top'
            alt='${movie.title}'
          />`
          : ` <img
              src='images/no-image.jpg'
              class='card-img-top'
              alt='Movie Title'
          />`
      }
    </a>
    <div class="card-body">
      <h5 class="card-title">${movie.original_title}</h5>
      <p class="card-text">
        <small class="text-muted">Release: ${movie.release_date}</small>
      </p>
    </div>
  `;
    popularMovies.appendChild(div);
  });
}

async function fetchApiData(endpoint) {
  const API_KEY = '2e2dc2ccd6f7b1cfb97af89884f4c929';
  const API_URL = 'https://api.themoviedb.org/3/';
  showSpinner();

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-EN`
  );
  const data = await response.json();

  hideSpinner();
  return data;
}

function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displayPopularMovies();
      break;

    case '/shows.html':
      displayPopularShows();
      break;

    case '/movie-details.html':
      break;

    case '/tv-details.html':
      break;

    case '/search.html':
      break;
  }

  higlightText();
}

document.addEventListener('DOMContentLoaded', init);
