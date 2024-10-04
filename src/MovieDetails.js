import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './MovieDetails.css'; // Scoped CSS for Movie Details Page

const MovieDetails = () => {
  const { movieId } = useParams(); // Extract movie ID from URL
  const [movieDetails, setMovieDetails] = useState(null);
  const [cast, setCast] = useState([]); // Store cast data here
  const apiKey = 'c45a857c193f6302f2b5061c3b85e743';

  // Fetch movie details and cast information
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`
        );
        setMovieDetails(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    const fetchMovieCast = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`
        );
        setCast(response.data.cast); // Set the cast data
      } catch (error) {
        console.error('Error fetching movie cast:', error);
      }
    };

    fetchMovieDetails(); // Fetch details when the movieId changes
    fetchMovieCast(); // Fetch cast when the movieId changes
  }, [movieId]);

  if (!movieDetails) {
    return <div>Loading...</div>; // Show loading state while fetching
  }

  return (
    <div className="movie-details">
      <div className="movie-header">
        <img
          src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
          alt={movieDetails.title}
          className="movie-poster"
        />
        <div className="movie-info">
          <h1>{movieDetails.title}</h1>
          <p><strong>Overview:</strong> {movieDetails.overview}</p>
          <p><strong>Release Date:</strong> {movieDetails.release_date}</p>
          <p><strong>Rating:</strong> {movieDetails.vote_average}</p>
          <p><strong>Genres:</strong> {movieDetails.genres.map(genre => genre.name).join(', ')}</p>
        </div>
      </div>

      {/* Cast Section */}
      <div className="cast-section">
        <h2>Cast</h2>
        <div className="cast-grid">
          {cast.slice(0, 10).map((actor) => (
            <div className="actor-card" key={actor.cast_id}>
              <img
                src={actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                  : 'https://via.placeholder.com/200x300?text=No+Image'} // Handle missing images
                alt={actor.name}
                className="actor-poster"
              />
              <p><strong>{actor.name}</strong></p>
              <p>{actor.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
