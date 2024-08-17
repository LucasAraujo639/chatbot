import React, { useContext } from 'react'
import { useEffect, useRef } from "react";

import Contacto from "../components/Contacto";
import Notification from "../components/Notification";
import ContactoForm from "../components/ContactoForm";
import Togglable from "../components/Togglable";
import { Navigate } from 'react-router-dom';

import contactoService from "../services/contactos";

import QRCodeComponent from "../components/QrCodeComponent";

import io from 'socket.io-client'
import { Context } from '../context/Context';
//Conectate al backend
const socket = io("http://localhost:3001");
export const HomePage = () => {
    const { message, setMessage, user, setUser, contactos, setContactos } = useContext(Context);
    
  //Traeme todo los contactos usando la funcion getAll que cree en contactos serivice
  useEffect(() => {
    contactoService.getAll().then((contactos) => setContactos(contactos));
  }, []);

  // Clear notification after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [message]);

  //Guarda el token en el localStorgae y trata de obtenerlo de ahi para que el usuario no tenga que volver a iniciar sesion
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedContactoappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      contactoService.setToken(user.token);
    }
  }, []);

  

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const createContacto = async (nombre,numero) => {
    try {
      contactoFormRef.current.toggleVisibility(); 
      const contacto = await contactoService.create({
        nombre,
        numero
      });
      setContactos(contactos.concat(contacto));
      setMessage(`El contacto ${nombre} de numero ${numero} fue añadido correctamenta a la lista`);
    } catch (exception) {
      setMessage("error" + exception.response.data.error);
    }
  };


  const deleteContacto = async (contactoId) => {
    try {
      await contactoService.remove(contactoId);

      const updatedContactos = contactos.filter((contacto) => contacto.id !== contactoId);
      setContactos(updatedContactos);
      setMessage("Contacto Eliminado");
    } catch (exception) {
      setMessage("error" + exception.response.data.error);
    }
  };

  const contactoFormRef = useRef();
  return (
    <div>
      <h1 className="header-title">Contactos Agregados Al Chatbot</h1>
      <Notification message={message} />
      {user === null ? (
        <Navigate to="/login"/>
      ) : (
        <div>
          <p>
            <span className="active-user">{user.name}</span> logged in{" "}
            <button id="logout-btn" onClick={handleLogout}>
              logout
            </button>
          </p>
          <QRCodeComponent socket={socket}/>
          <Togglable buttonLabel="Nuevo Contacto" ref={contactoFormRef}>
            <ContactoForm createContacto={createContacto} />
          </Togglable>
          {contactos
            .map((contacto) => (

              <Contacto
                key={contacto.id}
                contacto={contacto}
                deleteContacto={deleteContacto}
                username={user.username}
              />
            ))}
        </div>
      )}
    </div>
  )
}
