import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.css'
import { loginUtils } from '../../utils/loginUtils';
import contactoService from "../../services/contactos";


export const Header = () => {
  const [isOpen, setIsOpen] = useState(false) //Para el menu hamburgesa
  const {user,setUser} = loginUtils();

  //Guarda el token en el localStorgae y trata de obtenerlo de ahi para que el usuario no tenga que volver a iniciar sesion
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedContactoappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      contactoService.setToken(user.token);
    }
  }, []);

  const navigate = useNavigate();
  const handleLogout = () => {
    window.localStorage.clear();
    
    setUser(null);
    navigate('/login');
    };
  return (
    <header>
      <nav className={`enlaces ${isOpen && "open"}`}>
        <Link to="/">
          <div className='nav-container '>
            Home
          </div>
        </Link>
        <Link to="/contactos">
          <div className='nav-container '>
            Contactos
          </div>
        </Link>
        <Link to="/acciones">
          <div className='nav-container'>
            Acciones
          </div>
        </Link>
      </nav>

      <div className="logout-box">
        <p className='logout-wrap'>
          <span className="active-user">
            <span className="user-name">{user?.name || 'Guest'}</span> logged in
          </span>
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
