import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://backend-school-api-pev2.onrender.com/api", // or use process.env for env-based URL
  withCredentials: true, // move this inside the main object
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("Token from localStorage:", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
