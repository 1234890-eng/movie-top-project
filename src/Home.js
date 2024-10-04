// Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './App.css';

function Home() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const apiKey = 'c45a857c193f6302f2b5061c3b85e743';

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  const fetchPopularMovies = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`);
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching popular movies:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm}`);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-flex">
          <h1 className="logo">MovieDb</h1>

          {/* Center the Category Links */}
          <div className="category-nav">
            <Link to="/">Popular</Link>
            <Link to="/top-rated">Top Rated</Link>
            <Link to="/upcoming">Upcoming</Link>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="search-bar">
            <input
              type="text"
              placeholder="Movie Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </header>

      {/* Display Popular Movies */}
      <div className="movie-grid">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.id} onClick={() => navigate(`/movie/${movie.id}`)}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
            <h2>{movie.title}</h2>
            <p>Rating: {movie.vote_average}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

