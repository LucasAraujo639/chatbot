import { useContext } from "react";
import { Context } from "../context/Context";
import contactoService from "../services/contactos";

export const contactoUtils = () => {
 
const { contactos, setContactos, message, setMessage,user,setUser  } = useContext(Context);

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
  
  return { deleteContacto,contactos, setContactos, message, setMessage,user,setUser  };
}

 