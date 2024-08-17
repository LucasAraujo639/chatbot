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
