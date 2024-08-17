import axios from "axios";
const baseUrl = "http://localhost:3001/api/contactos";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

//Obtener post
const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

//Crear post
const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

//Actualizar post
const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  return response.data;
};

//Eliminar post
const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

// eslint-disable-next-line
export default {
  setToken,
  getAll,
  create,
  update,
  remove,
};
