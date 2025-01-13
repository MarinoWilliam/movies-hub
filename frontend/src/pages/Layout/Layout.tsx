import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/NavBar/NavBar';

const Layout = () => {
    return (
        <div >
            <Navbar />
            <main  >
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
