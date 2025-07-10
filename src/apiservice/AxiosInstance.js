// utils/axiosInstance.js

import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

// Create Axios instance
// baseURL: import.meta.env.VITE_API_BASE_URL || "https://backend-school-api-pev2.onrender.com/api",
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://backend-school-api-pev2.onrender.com/api",
  withCredentials: true,
});

// Request Interceptor: Attach Access Token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded = jwtDecode(token);
      const isExpired = dayjs.unix(decoded.exp).isBefore(dayjs());

      if (!isExpired) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Refresh Token on 401
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite loop
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          import.meta.env.VITE_API_BASE_URL + "/auth/refresh-token",
          {},
          { withCredentials: true }
        );

        const newAccessToken = res.data.token;
        localStorage.setItem("token", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token expired. Logging out...");

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("userId");
        localStorage.removeItem("message");

        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
