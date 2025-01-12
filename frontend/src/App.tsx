import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';


import './App.css';


const App: React.FC = () => {
  return (
    <div className='app_container'>
      <Router >
        <Routes>
          <Route index element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;