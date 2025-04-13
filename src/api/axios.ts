import axios from "axios";
import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const isClient = typeof window !== "undefined";

export const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

const getToken = async (
  config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> => {
  if (isClient) {
    const Cookies = require("js-cookie");
    const token = Cookies.get("access");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  } else {
    const { cookies } = require("next/headers");
    const cookieStore = await cookies();
    const token = cookieStore.get("access")?.value;
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

// 토큰 갱신
const refreshAccessToken = async () => {
  if (!isClient) return null;

  try {
    const response = await axios.post(`${BASE_URL}/api/v1/auth/refresh`, {
      refresh: Cookies.get("refresh"),
    });
    Cookies.set("access", response.data.access);

    return response.data.access;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

instance.interceptors.request.use(
  (config) => getToken(config),
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomInternalAxiosRequestConfig;

    if (
      originalRequest &&
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        return instance(originalRequest);
      } catch (error) {
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);
