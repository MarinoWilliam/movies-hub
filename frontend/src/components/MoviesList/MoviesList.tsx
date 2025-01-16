
import React, { useEffect } from 'react';
import MovieCard from '../MovieCard/MovieCard';

import './MoviesList.css'; // Import the specific CSS for MoviesList

interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
  Year: string;
  Favorite: boolean;
}

interface MoviesListProps {
  movies: Movie[];
}


const MoviesList: React.FC<MoviesListProps> = ({ movies }) => {
  


  return (
    <div className="movies-list">
      {movies.length > 0 ? (
        movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            imdbID={movie.imdbID}
            Title={movie.Title}
            Poster={movie.Poster}
            Year={movie.Year}
            Favorite={movie.Favorite}
          />
        ))
      ) : (
        <p className="no-movies-message"></p>
      )}
    </div>
  );
};

export default MoviesList;
