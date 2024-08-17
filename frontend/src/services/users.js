import axios from "axios";
const baseUrl = "http://localhost:3001/api/users";

//Obtener user por id
const getUser = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

// eslint-disable-next-line
export default { getUser };
