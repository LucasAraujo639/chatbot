import { useState } from "react";


const ContactoForm = ({ createContacto }) => {
  const [newContacto, setNewContacto] = useState({ nombre: "", numero: "" });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewContacto({ ...newContacto, [name]: value });
  };

  const handleCreateContacto = (event) => {
    event.preventDefault();
    createContacto(newContacto.nombre, newContacto.numero);
    setNewContacto({ nombre: "", numero: ""});
  };

  return (
    <div>
      <h2>Agregar un nuevo Contacto para ser redirigdo al chatbot</h2>
      <form onSubmit={handleCreateContacto}>
        <div>
          nombre
          <input
            name="nombre"
            type="text"
            value={newContacto.nombre}
            onChange={handleInputChange}
          />
        </div>
        <div>
          numero
          <input
            name="numero"
            type="text"
            value={newContacto.numero}
            onChange={handleInputChange}
          />
        </div>
        <button id="create-blog-btn" type="submit">
          Agregar
        </button>
      </form>
    </div>
  );
};

export default ContactoForm;
