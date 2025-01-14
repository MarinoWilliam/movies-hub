import React, { useState, useCallback, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

import SignPopUp from '../SignPopUp/SignPopUp';

import './NavBar.css';

const Navbar: React.FC = () => {
    const [isPopedUp, setIsPopedUp] = useState<boolean>(false);
    const [user, setUser] = useState<{ id: number; name: string } | null>(null);
    const [popUpSource, setPopUpSource] = useState<string>('');
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false); 

    const navigate = useNavigate(); 

    useEffect(() => {
        const validateToken = async () => {
            const accessToken = Cookies.get('access_token') || '';
            try {
                const response = await axios.get('http://localhost:3333/auth', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (response.data.valid) {
                    setUser(response.data.user);
                }
            } catch (error) {
                console.error('Token validation failed:', error);
            }
        };

        validateToken();
    }, [isPopedUp]);

    const handleOpenPopup = useCallback((source: string) => {
        setPopUpSource(source);
        setIsPopedUp(true);
    }, []);

    const handleClosePopup = useCallback(() => {
        setIsPopedUp(false);
        setPopUpSource('');
        setIsDropdownOpen(false); 
    }, []);

    const handleLogout = useCallback(() => {
        Cookies.remove('access_token'); 
        setUser(null);
        navigate(0)
    }, [navigate]);

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev); 
    };

    const goToFavorites = () => {
        navigate('/favorites'); 
        setIsDropdownOpen(false); 
    };
    const goToHome = () => {
        navigate('/'); 
        setIsDropdownOpen(false); 
    };

    return (
        <nav className="navbar">
            <SignPopUp open={isPopedUp} source={popUpSource} onClose={handleClosePopup} />
            <div className="container">
                <div className="logo" onClick={goToHome}>Movies Hub</div>
                {user ? (
                    <div className="auth-buttons flex justify-around">
                        <button className="profile-btn" onClick={toggleDropdown}>
                            {user.name} ▼ 
                        </button>
                        {isDropdownOpen && (
                            <div className="dropdown-menu">
                                <button className="dropdown-item" onClick={goToFavorites}>
                                    Go to Favorites
                                </button>
                                <button className="dropdown-item" onClick={handleLogout}>
                                    Log Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="auth-buttons flex justify-around">
                        <button className="login-btn" onClick={() => handleOpenPopup('log in')}>
                            Log In
                        </button>
                        <button className="signup-btn" onClick={() => handleOpenPopup('sign up')}>
                            Sign Up
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
