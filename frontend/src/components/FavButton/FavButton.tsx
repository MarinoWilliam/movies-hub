// src/components/MovieCard.tsx

import React, { useCallback, useEffect, useState } from 'react';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Cookies from 'js-cookie';
import axios from 'axios';
import SignPopUp from '../SignPopUp/SignPopUp';
import { color } from '@mui/system';
import { red } from '@mui/material/colors';


interface MovieCheck {
    imdbID: string;
    Favorite: boolean;
}

const FavButton: React.FC<MovieCheck> = ({ Favorite, imdbID }) => {
    const [isPopedUp, setIsPopedUp] = useState<boolean>(false);
    const [customeFavorite, setCustomeFavorite] = useState<boolean>(Favorite);

    useEffect(() => {
        setCustomeFavorite(Favorite)
    }, [Favorite]);


    const handleClosePopup = useCallback(() => {
        setIsPopedUp(false);
    }, []);

    const handleAddFav = async () => {
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
            setCustomeFavorite(true)

        } catch (error) {
            setIsPopedUp(true);
            console.error('Token validation failed:', error);
        }
    };

    
    const handleremoveFav = async () => {
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
            setCustomeFavorite(false)
    
        } catch (error) {
            console.error('Token validation failed:', error);
        }
    };





    return (
        <div>
            <SignPopUp open={isPopedUp} source={'log in'} onClose={handleClosePopup} />
            {customeFavorite ? (
                <FaHeart style={{color: '#b71c1c'}} onClick={handleremoveFav} />
            ) : (
                <FaRegHeart onClick={handleAddFav} />
            )}
        </div>
    );
};

export default FavButton;
