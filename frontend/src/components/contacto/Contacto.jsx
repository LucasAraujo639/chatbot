import { useState } from "react";
import './contacto.css'

export const Contacto = ({ contacto, deleteContacto, username }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleDelete = () => {
    if (window.confirm(`Seguro que quieres eliminar el contacto ${contacto.nombre} con el numero ${contacto.numero}?`)) {
      deleteContacto(contacto.id);
    }
  };

  return (
    <div className="blog-box">
      <div className="blog-table">
          <div className="blog-cell nombre">{contacto.nombre}</div>
          <div className="blog-cell numero">{contacto.numero}</div>
          {contacto.user.username === username && (
          <div className="blog-cell actions">
              <button id="delete-btn" onClick={handleDelete}>Eliminar</button>
          </div>
      )}
      </div>
    
          {/* para ver mas detalles del contacto pero no hay asi que lo comento */}
        {/* <button id="view-btn" onClick={toggleVisibility}>
          {visible ? "hide" : "show"}
        </button> */}
      
      {/* {visible && (
        <div className="blog-details">
          <div>{blog.url}</div>
          <div>{blog.user.name}</div> */}

          {/* Si este es el usuario que añadio el contacto entonces lo puede eliminar */}
          
    </div>
  );
};


