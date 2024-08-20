import React, { useEffect, useRef } from 'react'
import { contactoUtils } from '../utils/contactoUtils';
import contactoService from "../services/contactos";
import ContactoForm from '../components/contacto_form/ContactoForm';
import { Togglable } from '../components/togglable/Togglable';
import { Contacto } from '../components/contacto/Contacto';
import { Header } from '../components/header/Header';
import Notification from '../components/Notification';


export const ContactosNuevosPage = () => {
    
    const {deleteContacto, contactos, setContactos,message, setMessage, user,setUser} = contactoUtils();
    const contactoFormRef = useRef();


    //Guarda el token en el localStorgae y trata de obtenerlo de ahi para que el usuario no tenga que volver a iniciar sesion
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedContactoappUser");
        if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        setUser(user);
        contactoService.setToken(user.token);
        }
    }, []);

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
    //ACA EL PROBLEMA DE NO METERLO EN UTILS ES QUE LE TENGO QUE PASAR COMO PARAMETRO EL NOMBRE Y NUMERO, como hago para pasar parametro por context?
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
  return (
    <div>
        <Header/>
        
        <h2>Contactos Agregados al Chatbot</h2>
        <Togglable buttonLabel="Nuevo Contacto" ref={contactoFormRef}>
            <ContactoForm createContacto={createContacto} />
        </Togglable>
        <Notification message={message} />
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
  )
}
