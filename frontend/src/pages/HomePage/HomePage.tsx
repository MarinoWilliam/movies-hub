import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MoviesList from '../../components/MoviesList/MoviesList';

import './HomePage.css'
import Cookies from 'js-cookie';

interface FavMovie {
  imdbID: string;
  title: string;
  posterUrl: string;
  year: string;
}

const HomePage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [favMoviesIds, setFavMoviesIds] = useState<string[]>([]);
  
  useEffect(() => {
    const validateToken = async () => {
      const accessToken = Cookies.get('access_token') || '';
      try {
        const response = await axios.get('http://localhost:3333/favorites', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const favIds = response.data.map((movie: FavMovie) => {
          return movie.imdbID;
        });
        setFavMoviesIds(favIds)

      } catch (error) {
        console.error('Token validation failed:', error);
      }
    };

    validateToken();
  }, []);
  


  const fetchMovies = async (search: string) => {
    try {
      const response = await axios.get(`http://localhost:3333/movies/${search}`);
      let checkedMovies = response.data
      if (true) {
        checkedMovies = checkedMovies.map((movie: any) => {
          if (favMoviesIds.includes(movie.imdbID)) {
            movie.Favorite = true
          }else{
            movie.Favorite = false
          }
          return movie
        })
      }
      setMovies(checkedMovies || []);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setQuery(searchValue);
    if (searchValue.trim()) {
      fetchMovies(searchValue);
    } else {
      setMovies([]);
    }
  };

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          className="search-input"
          placeholder="Search movies..."
        />
      </div>
      <MoviesList movies={movies} />
    </div>

  );
};

export default HomePage;
