import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import Layout from './pages/Layout/Layout';


import './App.css';


const App: React.FC = () => {
  return (
    <div className='app_container'>
      <Router >
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='/favorites' element={<FavoritesPage />} />
        </Route>
      </Routes>
    </Router>
    </div >
  );
}


export default App;