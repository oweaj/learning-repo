import { clientAxios } from "@/lib/axios/clientAxios";
import type { IAuthFormType } from "@/types/auth.type";
import type { IMyProfileDataType } from "@/types/mypage.type";

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
    return data.user;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      throw new Error(message);
    }
    return { user: null };
  }
};

export const userUpdateApi = async (formData: IMyProfileDataType) => {
  try {
    const { data } = await clientAxios.patch("/api/auth/update", formData);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      throw new Error(message);
    }
  }
};

export const deleteUserApi = async () => {
  try {
    const result = await clientAxios.delete("/api/auth/delete");
    return result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      throw new Error(message);
    }
  }
};
