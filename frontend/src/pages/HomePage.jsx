import React, { useContext } from 'react'
import { useEffect} from "react";
import Notification from "../components/Notification";
import { Navigate } from 'react-router-dom';
import contactoService from "../services/contactos";
import QRCodeComponent from "../components/QrCodeComponent";
import io from 'socket.io-client'
import { Context } from '../context/Context';
import { Header } from '../components/header/Header';

//Conectate al backend
const socket = io("http://localhost:3001");

export const HomePage = () => {
  const { message, user, setUser} = useContext(Context);
    
  //Guarda el token en el localStorgae y trata de obtenerlo de ahi para que el usuario no tenga que volver a iniciar sesion
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedContactoappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      contactoService.setToken(user.token);
    }
  }, []);

  return (
    <div>
      <Notification message={message} />
      {user === null ? (
        <Navigate to="/login"/>
      ) : (
        <div>
          <Header/>
          <QRCodeComponent socket={socket}/>
          
        </div>
      )}
    </div>
  )
}
