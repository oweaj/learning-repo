import type { TAuthFormType } from "@/types/auth.type";
import axios from "axios";

export const signinApi = async (formData: TAuthFormType) => {
  try {
    const { data } = await axios.post(
      "http://localhost:3001/api/auth/signin",
      formData,
      { withCredentials: true },
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.error || error.message;
      throw new Error(message);
    }
  }
};

export const signupApi = async (formData: TAuthFormType) => {
  try {
    const { data } = await axios.post(
      "http://localhost:3001/api/auth/signup",
      formData,
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.error || error.message;
      throw new Error(message);
    }
  }
};

export const logoutApi = async () => {
  try {
    const { data } = await axios.post("/api/auth/logout");
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.error || error.message;
      throw new Error(message);
    }
  }
};
