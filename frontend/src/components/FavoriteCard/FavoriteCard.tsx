import React from 'react';
import { useNavigate } from 'react-router-dom'
import { FaHeart } from "react-icons/fa";
import Cookies from 'js-cookie';
import axios from 'axios';

import './FavoriteCard.css';

interface FavMovie {
    imdbID: string;
    title: string;
    posterUrl: string;
    year: string;
}

const FavoriteCard: React.FC<FavMovie> = ({ imdbID, title, posterUrl, year }) => {
    const navigate = useNavigate(); 


    const handleremoveFav = async () => {
        console.log('clicked on', title)
        const accessToken = Cookies.get('access_token') || '';
        try {
            const response = await axios.delete(
                `http://localhost:3333/favorites/${imdbID}`, // movieid is part of the URL
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`, // send token as header
                    },
                }
            );
            console.log('Removed from favorites: ', response.data);
            navigate(0);
    

        } catch (error) {
            console.error('Token validation failed:', error);
        }
    };




    return (
        <div className="favorite-card">
            <img
                src={posterUrl}
                alt={title}
                className="favorite-card__image"
            />
            <div className="favorite-card__content">
                <h3 className="favorite-card__title">{title}</h3>
                <div className='favorite-card__sub-title'>
                    <p className="favorite-card__year">{year}</p>
                    <FaHeart onClick={handleremoveFav} />
                </div>
            </div>
        </div>
    );
};

export default FavoriteCard;
