const searchButton = document.querySelector('#searchIcon');
const searchInput = document.querySelector('#searchBar');
const searchResults = document.querySelector('#searchResults');
const searchHeader = document.querySelector('#searchHeader');
const nominations = document.querySelector('#nominations');
const nominees = document.querySelector('#nominees');
const movieArea = document.querySelector('#movieArea');
let movieData = [];

const movieGET = (movie) => fetch(`http://www.omdbapi.com/?apikey=d09e9ca9&t=${movie}`)
  .then(response => response.json())
  .then(data => movieData.push(data))
  .then(data => checkValidMovies())
  .then(data => displayResults())
  .catch(err => err.message)

searchInput.addEventListener('input', searchMovie);
searchInput.addEventListener('keydown', checkButtonHit);
movieArea.addEventListener('click', nominateMovie);

function searchMovie() {
  movieGET(searchInput.value);
  searchResults.innerHTML = ' ';
}

function checkValidMovies() {
  for (let i = 0; i < movieData.length; i++) {
    if (movieData[i].Response === 'False') {
      movieData.splice(i, 1);
    }
  }
}

function displayResults() {
  searchHeader.innerText = `Results for ${searchInput.value}`;
  movieData.map(movie => {
    searchResults.innerHTML += `
    <ul class="movie-container">
      <li id="movieInfo">${movie.Title} (${movie.Year})</li>
      <button id="nominateButton" class="nominate-button">Nominate</button>
    <ul>
    `;
  });
  nominations.innerText = 'Nominations'
}

function checkButtonHit() {
  if (event.keyCode === 8 || event.keyCode === 46) {
    movieData = [];
    searchMovie();
  }
}

function nominateMovie() {
  event.preventDefault();
  if (event.target.classList.contains('nominate-button')) {
    console.log(event.target.previousSibling);
    nominees.innerHTML += `
    <ul class="movie-container">
    <li>${event.target.previousSibling.previousSibling.innerText}</li>
    <button class="remove-button">Remove</button>
    <ul>
    `;
  }
}
