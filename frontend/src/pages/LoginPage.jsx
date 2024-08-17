import React from 'react'

import LoginForm from '../components/LoginForm';

import { Navigate } from 'react-router-dom';
import { loginUtils } from '../utils/loginUtils';
export const LoginPage = () => {

//Maneja los campos handler de login
const {user,handleLogin} = loginUtils();


if (user != null) {
    return <Navigate to="/" />;
  }

return (
<div>
    <LoginForm handleLogin={handleLogin} />
</div>
)
}
