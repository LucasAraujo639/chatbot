import axios from "axios";
const baseUrl = "http://localhost:3001/api/login";

//Loguearse
const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials); //Las credentials son pasadas como un objeto JSON
  return response.data;
};

// eslint-disable-next-line
export default { login };
