// src/TopRated.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './App.css';

const TopRated = () => {
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const apiKey = 'c45a857c193f6302f2b5061c3b85e743';
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`);
        setTopRatedMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching top-rated movies:', error);
      }
    };

    fetchTopRatedMovies();
  }, []);

  return (
    <div className="movie-grid">
      {topRatedMovies.map((movie) => (
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
  );
};

export default TopRated;
