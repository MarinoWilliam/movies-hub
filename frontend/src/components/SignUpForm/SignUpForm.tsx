import React, { Dispatch, SetStateAction, useState } from 'react';
import './SignUpForm.css'

interface SignUpFormProps {
  onSubmit: (userName: string, email: string, password: string) => void;
  onChangeSource: Dispatch<SetStateAction<string>>;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit, onChangeSource }) => {
  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(userName, email, password);
  };

  return (
    <form className="signupFormContainer" onSubmit={handleSubmit}>
      <h2 className='popUpSignUpLogo'>Welcome to Movies Hub !</h2>
      <div className="formSignUpGroup">
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className='formSignUpInput'
        />
      </div>
      <div className="formSignUpGroup">
        <input
          type="text"
          id="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="User Name"
          required
          className='formSignUpInput'
        />
      </div>
      <div className="formSignUpGroup">
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className='formSignUpInput'
        />
      </div>

      <button type="submit" className="submitSignUpButton">Sign Up</button>
      <span className='suggestLogIn'>
        already have an account? |
        <span className="suggestLogInButton" onClick={() => onChangeSource('log in')}>Log In</span>
      </span>
    </form>
  );
};

export default SignUpForm;
