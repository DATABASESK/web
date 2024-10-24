document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = 'https://final-rj4x.onrender.com/netflix'; // API URL for movies
  const movieGrid = document.getElementById('movies-grid');

  // Fetch movies from API
  fetch(apiUrl)
    .then(response => response.json())
    .then(movies => {
      movies.forEach(movie => {
        const movieItem = renderMovie(movie);
        movieGrid.appendChild(movieItem);
      });
    })
    .catch(error => {
      console.error('Error fetching movies:', error);
    });

  // Truncate movie name to 15 characters and add ellipsis if needed
  const truncateText = (text, limit) => {
    if (text.length > limit) {
      return text.substring(0, limit) + '...';
    }
    return text;
  };

  // Render individual movie item
  const renderMovie = (movie) => {
    const movieItem = document.createElement('div');
    movieItem.classList.add('movie-item');

    const movieImage = document.createElement('img');
    movieImage.src = movie.uri;
    movieImage.alt = movie.name;
    movieImage.classList.add('movie-image');

    const movieTitle = document.createElement('p');
    movieTitle.classList.add('movie-title');
    movieTitle.textContent = truncateText(movie.name, 15); // Apply truncation

    movieItem.appendChild(movieImage);
    movieItem.appendChild(movieTitle);

    // Add click event to open the movie's video link
    movieItem.addEventListener('click', () => {
      window.open(movie.link, '_blank');
    });

    return movieItem;
  };
});
