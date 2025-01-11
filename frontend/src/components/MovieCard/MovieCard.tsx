// src/components/MovieCard.tsx

import React from 'react';
import './MovieCard.css'; // Import the specific CSS for MovieCard

interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
  Year: string;
}

const MovieCard: React.FC<Movie> = ({ imdbID, Title, Poster, Year }) => {
  return (
    <div className="movie-card">
      <img
        src={Poster}
        alt={Title}
        className="movie-card__image"
      />
      <div className="movie-card__content">
        <h3 className="movie-card__title">{Title}</h3>
        <p className="movie-card__year">{Year}</p>
      </div>
    </div>
  );
};

export default MovieCard;
