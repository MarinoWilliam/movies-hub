import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';

import MoviesList from '../../components/MoviesList/MoviesList';

import './HomePage.css'
import Cookies from 'js-cookie';
import { useUser } from '../../context/User.context';

interface FavMovie {
  imdbID: string;
  title: string;
  posterUrl: string;
  year: string;
}

interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
  Year: string;
  Favorite: boolean;
}

const HomePage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [favMoviesIds, setFavMoviesIds] = useState<string[]>([]);
  const { user } = useUser();

  const getFavIds = async () => {
    const accessToken = Cookies.get('access_token') || '';
    try {
      const response = await axios.get('http://localhost:3333/favorites', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const favIds = response.data.map((movie: FavMovie) =>  movie.imdbID);
      setFavMoviesIds(favIds)
    } catch (error) {
      console.error('Token validation failed:', error);
    }
  };


  useEffect(() => {
    if (user) {
      getFavIds();
    }
  }, [user]);


  useEffect(() => {
      fetchMovies(query)
  }, [favMoviesIds]);



  const fetchMovies = async (search: string) => {
    try {
      const response = await axios.get(`http://localhost:3333/movies/${search}`);
      let checkedMovies = response.data
      checkedMovies = checkedMovies.map((movie: Movie) => {
        movie.Favorite = favMoviesIds.includes(movie.imdbID);
        return movie
      })
      setMovies(checkedMovies);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleSearch = debounce((searchValue: string) => {
    if (searchValue.trim()) {
      fetchMovies(searchValue);
    } else {
      setMovies([]);
    }
  }, 500); 
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setQuery(searchValue);
    handleSearch(searchValue); 
  };



  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          className="search-input"
          placeholder="Search movies..."
        />
      </div>
      <MoviesList movies={movies} />
    </div>

  );
};

export default HomePage;
