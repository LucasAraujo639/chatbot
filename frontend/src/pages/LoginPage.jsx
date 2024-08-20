import React, { useContext, useEffect } from 'react'
import LoginForm from '../components/login_form/LoginForm';
import { Navigate } from 'react-router-dom';
import { loginUtils } from '../utils/loginUtils';
import { Context } from '../context/Context';
import Notification from '../components/Notification';

export const LoginPage = () => {

//Maneja los campos handler de login
const {user,handleLogin} = loginUtils();
const { message} = useContext(Context);

// Clear notification after 5 seconds
useEffect(() => {
  const timer = setTimeout(() => {
  setMessage(null);
  }, 5000);
  return () => {
  clearTimeout(timer);
  };
}, [message]);

if (user != null) {
    return <Navigate to="/" />;
  }

return (
<div>
    <LoginForm handleLogin={handleLogin} />
    <Notification message={message} />
</div>
)
}
