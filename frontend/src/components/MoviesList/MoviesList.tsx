import React from 'react';

interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
  Year: string;
}

interface MoviesListProps {
  movies: Movie[];
}

const MoviesList: React.FC<MoviesListProps> = ({ movies }) => {
  return (
    <div>
      {movies.length > 0 ? (
        movies.map((movie) => (
          <div key={movie.imdbID}>
            <h3>{movie.Title}</h3>
            <img src={movie.Poster} alt={movie.Title} />
            <p>{movie.Year}</p>
          </div>
        ))
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  );
};

export default MoviesList;
