import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://contesthubapi.onrender.com/api/v1",
});

export default apiClient;
