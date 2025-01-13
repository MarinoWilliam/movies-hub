import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import FavoriteCard from '../../components/FavoriteCard/FavoriteCard';

import './FavoritesPage.css'

interface FavMovie {
  imdbID: string;
  title: string;
  posterUrl: string;
  year: string;
}

const FavoritesPage: React.FC = () => {
  const [movies, setMovies] = useState<FavMovie[]>([]);

  useEffect(() => {
    const validateToken = async () => {
      console.log('favorites called')
      const accessToken = Cookies.get('access_token') || '';
      try {
        const response = await axios.get('http://localhost:3333/favorites', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        console.log('favorites called', response.data)
        setMovies(response.data)

      } catch (error) {
        console.error('Token validation failed:', error);
      }
    };

    validateToken();
  }, []);



  return (
    <div className='favorites-container' >

      {movies.length > 0 ? (
        movies.map((movie) => (
          <FavoriteCard
            key={movie.imdbID}
            imdbID={movie.imdbID}
            title={movie.title}
            posterUrl={movie.posterUrl}
            year={movie.year}
          />
        ))
      ) : (
        <p className="no-movies-message"> Your Favorite List is currently Empty :(</p>
      )}
    </div>
  );
};

export default FavoritesPage;
