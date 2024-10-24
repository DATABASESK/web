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

    // Add click event to show video links when the movie is clicked
    movieItem.addEventListener('click', () => {
      displayVideos(movie.videos, movie.name);
    });

    return movieItem;
  };

  // Display videos for the selected movie
  const displayVideos = (videos, movieName) => {
    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = ''; // Clear previous videos

    const title = document.createElement('h2');
    title.textContent = `Videos for: ${movieName}`;
    videoContainer.appendChild(title);

    videos.forEach(video => {
      const videoItem = document.createElement('div');
      videoItem.classList.add('video-item');

      const videoLink = document.createElement('a');
      videoLink.href = video.link;
      videoLink.target = '_blank';
      videoLink.textContent = video.title;

      videoItem.appendChild(videoLink);
      videoContainer.appendChild(videoItem);
    });
  };
});
