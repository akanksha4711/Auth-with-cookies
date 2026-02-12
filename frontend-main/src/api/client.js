import axios from "axios";

// Axios client
export const api = axios.create({
  baseURL: "http://localhost:8000/auth",
  timeout: 10000,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (!originalRequest._retry && error.response?.status === 401) {
      originalRequest._retry = true;
      try {
        await api.post("/refresh");
        return api(originalRequest);
      } catch (refreshErr) {
        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(error);
  },
);
