import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MovieGrid = ({ apiUrl }) => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(apiUrl).then((response) => setMovies(response.data));
  }, [apiUrl]);

  const filteredMovies = movies.filter((movie) =>
    movie.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="grid-container">
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="movie-grid">
        {filteredMovies.map((movie) => (
          <div
            className="movie-item"
            key={movie.name}
            onClick={() => navigate("/player", { state: { videoLink: movie.link } })}
          >
            <img src={movie.uri} alt={movie.name} className="movie-image" />
            <p>{movie.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieGrid;
