import { useState } from "react";

const Contacto = ({ contacto, deleteContacto, username }) => {
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
    <div className="blog">
      <div>
        <span className="nombre">{contacto.nombre} - </span>
        <span className="numero">{contacto.numero}</span>{" "}
        {/* Esto quiere decir que si el usuario que agrego el contacto puede eliminar los contactos si es igual al usuario autenticado */}
        {contacto.user.username === username && (
            <button id="delete-btn" onClick={handleDelete}>
              delete
            </button>
          )}
          {/* para ver mas detalles del contacto pero no hay asi que lo comento */}
        {/* <button id="view-btn" onClick={toggleVisibility}>
          {visible ? "hide" : "show"}
        </button> */}
      </div>

      {/* {visible && (
        <div className="blog-details">
          <div>{blog.url}</div>
          <div>{blog.user.name}</div> */}

          {/* Si este es el usuario que añadio el contacto entonces lo puede eliminar */}
          
    </div>
  );
};

export default Contacto;
