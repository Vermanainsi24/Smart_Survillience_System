import axios from "axios";

const API = axios.create({
  baseURL: "https://tamie-aglint-slightly.ngrok-free.dev/"
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;