import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './header.css'

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false) //Para el menu hamburgesa

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };
  return (
    <header>
      <Link to="/" className="logo">
        <img src={logo} alt="Logo" />
        <h2 className='logo-nombre'>C&O SERVICIOS</h2>
      </Link>
      <nav className={`enlaces ${isOpen && "open"}`}>
        <Link to="/">
          <div className='nav-container '>
            <img src={casita} alt="home"/>
            Inicio
            <img className="flecha" src={flecha} alt="arrow"/>
          </div>
        </Link>
      </nav>

      <div className="redes-sociales">
        <p>
            <span className="active-user">{user.name}</span> logged in{" "}
            <button id="logout-btn" onClick={handleLogout}>
              Logout
            </button>
        </p>
      </div>
      <div className={`nav_toggle ${isOpen && "open"}`} onClick={() => setIsOpen(!isOpen)}>
        {/* estas son las tres rayitas */}
      <span></span>     
      <span></span>     
      <span></span>      
    </div>
    </header>
  );
};
