"use server";

import axios from "axios";
import { cookies } from "next/headers";

export const serverAxios = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    withCredentials: true,
    headers: {
      Cookie: token,
    },
  });
};
