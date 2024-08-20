import { useState } from "react";
import './contactoToChatbot.css'

export const ContactoToChatbot = ({ contacto, deleteContacto, username }) => {

  const handleDelete = () => {
    if (window.confirm(`Seguro que quieres eliminar el contacto ${contacto.nombre} con el numero ${contacto.numero}?`)) {
      deleteContacto(contacto.id);
    }
  };

  return (
    <div className="contact-item">
  <div className="contact-info">
    <span className="contact-name">Nombre del Contacto</span>
    <span className="contact-number">Número del Contacto</span>
  </div>
  <div className="contact-actions">
    <button className="action-btn ignore" onClick={() => handleDelete(contacto.id)}>Ignorar</button>
    <button className="action-btn add" onClick={() => handleAdd(contacto.id)}>Agregar</button>
  </div>
</div>

  );
};


