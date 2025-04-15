import axios from "axios";
import Cookies from "js-cookie";

const clientAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

clientAxios.interceptors.request.use((config) => {
  const token = Cookies.get("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default clientAxios;
