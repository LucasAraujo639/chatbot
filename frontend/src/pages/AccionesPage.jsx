import React, { useEffect } from 'react'
import contactoService from "../services/contactos";
import { contactoUtils } from '../utils/contactoUtils';
import { Header } from '../components/header/Header';
import { ContactoToChatbot } from '../components/contacto_to_chatbot/ContactoToChatbot';
export const AccionesPage = () => {
  const {deleteContacto, contactos, user,setUser} = contactoUtils();
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
        <Header></Header>
        {contactos
            .map((contacto) => (

              <ContactoToChatbot
                key={contacto.id}
                contacto={contacto}
                deleteContacto={deleteContacto}
                username={user.username}
              />
            ))}
    </div>
  )
}
