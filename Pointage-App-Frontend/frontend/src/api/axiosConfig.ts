import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});


api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.error("Accès refusé");
      sessionStorage.removeItem("token"); 
      window.location.href = "/Login"; 
    }
    return Promise.reject(error);
  }
);

export default api;
