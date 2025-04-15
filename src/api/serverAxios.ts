"use server";

import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import { cookies } from "next/headers";

const serverAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

serverAxios.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("access")?.value;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
);

export default serverAxios;
