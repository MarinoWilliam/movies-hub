import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'; // Import axios
import LoginForm from '../LoginForm/LoginForm';
import SignUpForm from "../SignUpForm/SignUpForm";

import './SignPopUp.css';

interface SignPopUpProps {
  open: boolean;
  source: string;
  onClose: () => void;
}

const SignPopUp: React.FC<SignPopUpProps> = ({ open, source, onClose }) => {
  const [mySource, setMySource] = useState<string>(source);

  useEffect(() => {
    setMySource(source);
  }, [source]);

  if (!open) return null;

  const handleLoginSubmit = async (email: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:3333/auth/signin', {
        email,
        password,
      });

      console.log('Login successful:', response.data.access_token);
      localStorage.setItem('access_token', response.data.access_token);

      onClose();
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleSignUpSubmit = async (userName: string, email: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:3333/auth/signup', {
        userName,
        email,
        password,
      });

      console.log('Signup successful:', response.data.access_token);
      localStorage.setItem('access_token', response.data.access_token);

      onClose();
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return ReactDOM.createPortal(
    <>
      <div className="overLay" onClick={onClose}></div>
      <div className="SignPopUpContainer">
        <button className="closeButton" onClick={onClose}>&#10005;</button>
        {mySource === 'log in' ? (
          <LoginForm onSubmit={handleLoginSubmit} onChangeSource={setMySource} />
        ) : (
          <SignUpForm onSubmit={handleSignUpSubmit} onChangeSource={setMySource} />
        )}
      </div>
    </>,
    document.getElementById('portal') as HTMLElement
  );
};

export default SignPopUp;
