import React, { useState } from 'react';
import axios from 'axios';
import MoviesList from '../MoviesList/MoviesList';
import './SearchBar.css'

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const fetchMovies = async (search: string) => {
    try {
      const response = await axios.get(`http://localhost:3333/movies/${search}`);
      setMovies(response.data || []);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setQuery(searchValue);
    if (searchValue.trim()) {
        console.log(searchValue)
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

export default SearchBar;
