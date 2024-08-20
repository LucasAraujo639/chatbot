import { useState } from "react";
import PropTypes from "prop-types";
import './loginForm.css'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    handleLogin(username, password);
    setUsername("");
    setPassword("");
  };

  return (
    <div className="login-form-wrapper">
    <div className="iniciar-sesion-box">
      <h2>Iniciar Sesión</h2>
    </div>
    
    <form onSubmit={onSubmit}>
      <div className="username-box">
        <div className="username">Username</div>
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div className="password-box">
        <div className="password">Password</div>
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-btn" type="submit">Login</button>
    </form>
  </div>
  
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default LoginForm;
