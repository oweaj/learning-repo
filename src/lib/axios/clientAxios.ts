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
        const { accessToken } = await refreshTokenApi();

        if (accessToken) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }

        return clientAxios(originalRequest);
      } catch (refreshError) {
        window.location.href = "/auth/signin";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
