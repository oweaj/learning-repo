import { clientAxios } from "@/lib/axios/clientAxios";
import type { IAuthFormType } from "@/types/auth.type";
import axios from "axios";

export const signinApi = async (formData: IAuthFormType) => {
  try {
    const { data } = await clientAxios.post("/api/auth/signin", formData);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      throw new Error(message);
    }
  }
};

export const signupApi = async (formData: IAuthFormType) => {
  try {
    const { data } = await clientAxios.post("/api/auth/signup", formData);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      throw new Error(message);
    }
  }
};

export const logoutApi = async () => {
  try {
    const { data } = await clientAxios.post("/api/auth/logout");
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      throw new Error(message);
    }
  }
};

export const refreshTokenApi = async () => {
  try {
    const { data } = await clientAxios.post("/api/auth/refresh");
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      throw new Error(message);
    }
  }
};

export const getUserApi = async () => {
  try {
    const { data } = await clientAxios.get("/api/auth/user");
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      throw new Error(message);
    }
  }
};
