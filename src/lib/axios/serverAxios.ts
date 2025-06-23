"use server";

import axios from "axios";
import { cookies } from "next/headers";

export const serverAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

serverAxios.interceptors.request.use(async (config) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken")?.value;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.log(`서버 토큰 헤더 설정 에러 : ${error}`);
  }

  return config;
});
