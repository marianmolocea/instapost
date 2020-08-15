import React from 'react';
import SignUp from './SignUp/SignUp'
import Login from './LogIn/Login'

import './LandingPage.css';

const LandingPage = () => {

  return (
    <div className="LandingPage">
      <h1>Welcome to InstaPost</h1>
      <div className="auth-form__wrapper">
        <Login />
        <SignUp />
      </div>
    </div>
  );
};

export default LandingPage;
