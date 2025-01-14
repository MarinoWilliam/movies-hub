// src/components/MovieCard.tsx

import React from 'react';
import './MovieCard.css';
import FavButton from '../FavButton/FavButton';


interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
  Year: string;
  Favorite: boolean;
}

const MovieCard: React.FC<Movie> = ({ imdbID, Title, Poster, Year, Favorite=false}) => {
  

  return (
    <div>
      <div className="movie-card">
        <img
          src={Poster}
          alt={Title}
          className="movie-card__image"
        />
        <div className="movie-card__content">
          <h3 className="movie-card__title">{Title}</h3>
          <div className='movie-card__sub-title'>
            <p className="movie-card__year">{Year}</p>
            <FavButton Favorite={Favorite} imdbID={imdbID} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
