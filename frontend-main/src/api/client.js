import axios from "axios";

// Axios client
export const api = axios.create({
  baseURL: "http://localhost:8000/auth",
  timeout: 10000,
  withCredentials: true,
});
