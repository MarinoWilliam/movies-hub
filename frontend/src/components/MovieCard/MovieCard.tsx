// src/components/MovieCard.tsx

import React, { useCallback, useState } from 'react';
import './MovieCard.css';
import { FaRegHeart } from "react-icons/fa";
import Cookies from 'js-cookie';
import axios from 'axios';
import SignPopUp from '../SignPopUp/SignPopUp';


interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
  Year: string;
}

const MovieCard: React.FC<Movie> = ({ imdbID, Title, Poster, Year }) => {
  const [isPopedUp, setIsPopedUp] = useState<boolean>(false);

  const handleClosePopup = useCallback(() => {
    setIsPopedUp(false);
  }, []);

  const handleAddFav = async () => {
    console.log('clicked on', Title)
    try {
      const accessToken = Cookies.get('access_token') || '';
      const response = await axios.post(
        'http://localhost:3333/favorites',
        { movieimdbID: imdbID },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log('added? ', response.data);

    } catch (error) {
      setIsPopedUp(true);
      console.error('Token validation failed:', error);
    }
  };




  return (
    <div>
      <SignPopUp open={isPopedUp} source={'log in'} onClose={handleClosePopup} />
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
            <FaRegHeart onClick={handleAddFav} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
