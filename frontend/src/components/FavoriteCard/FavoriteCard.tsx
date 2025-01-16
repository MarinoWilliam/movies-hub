import React from 'react';
import FavButton from '../FavButton/FavButton';


import './FavoriteCard.css';

interface FavMovie {
    imdbID: string;
    title: string;
    posterUrl: string;
    year: string;
}

const FavoriteCard: React.FC<FavMovie> = ({ imdbID, title, posterUrl, year }) => {

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
                    <FavButton Favorite={true} imdbID={imdbID} />
                </div>
            </div>
        </div>
    );
};

export default FavoriteCard;
