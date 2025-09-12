import axios from "axios";
import { refreshTokenApi } from "../api/auth/auth";

export const clientAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

clientAxios.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await refreshTokenApi();
        return clientAxios(originalRequest);
      } catch (error) {
        window.location.href = "/auth/signin";
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);
