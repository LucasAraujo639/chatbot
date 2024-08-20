import { useState } from "react";
import './contactoForm.css'

const ContactoForm = ({ createContacto }) => {
  const [newContacto, setNewContacto] = useState({ nombre: "", numero: "" });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewContacto({ ...newContacto, [name]: value });
  };

  const handleCreateContacto = (event) => {
    event.preventDefault();
    console.log(newContacto.nombre)
    console.log(newContacto.numero)
    createContacto(newContacto.nombre, newContacto.numero);
    setNewContacto({ nombre: "", numero: ""});
  };

  return (
  <div className="contacto-form-wrapper">
    <h3>Agregar un nuevo Contacto para ser redirigido al chatbot</h3>
    <form onSubmit={handleCreateContacto}>
      <div className="input-group">
        <label htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          value={newContacto.nombre}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-group">
        <label htmlFor="numero">Número</label>
        <input
          id="numero"
          name="numero"
          type="text"
          value={newContacto.numero}
          onChange={handleInputChange}
        />
      </div>
      <button id="create-contacto-btn" type="submit">
        Agregar
      </button>
    </form>
  </div>
  
  );
};

export default ContactoForm;
