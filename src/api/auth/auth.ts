import type { LoginDataType } from "@/types/auth.type";
import axios from "axios";
import clientAxios from "../clientAxios";

export const loginApi = async (formData: LoginDataType) => {
  const { data } = await axios.post("/api/v1/auth/login", formData);

  return data;
};

export const logoutApi = async () => {
  const { data } = await clientAxios.get("/api/v1/auth/logout");

  return data;
};

export const refreshTokenApi = async () => {
  const { data } = await clientAxios.post("/api/v1/auth/refresh");

  return data;
};
