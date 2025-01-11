import React, { useState, useCallback } from 'react';
import SignPopUp from '../SignPopUp/SignPopUp';

import './NavBar.css'

const Navbar: React.FC = () => {
    const [isPopedUp, setIsPopedUp] = useState(false);
    const [popUpSource, setPopUpSource] = useState('');

    const handleOpenPopup = useCallback((source: string) => {
        setPopUpSource(source);
        setIsPopedUp(true);
    }, []);

    const handleClosePopup = useCallback(() => {
        setIsPopedUp(false);
        setPopUpSource('');
    }, []);

    return (
        <nav className="navbar">
            <SignPopUp open={isPopedUp} source={popUpSource} onClose={handleClosePopup} />
            <div className="container">
                <div className="logo">Movies Hub</div>
    
                <div className="auth-buttons flex justify-around">
                    <button className="login-btn" onClick={() => handleOpenPopup('log in')}>
                        Log In
                    </button>
                    <button className="signup-btn" onClick={() => handleOpenPopup('sign up')}>
                        Sign Up
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
