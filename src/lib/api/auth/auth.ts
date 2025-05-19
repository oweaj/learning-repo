import type { ISignInType, ISignUpType } from "@/types/auth.type";
import axios from "axios";

export const signinApi = async (formData: ISignInType) => {
  const { data } = await axios.post("/api/auth/signin", formData);
  return data;
};

export const signupApi = async (formData: ISignUpType) => {
  const { data } = await axios.post("/api/auth/signup", formData);
  return data;
};

export const logoutApi = async () => {
  const { data } = await axios.get("/api/auth/logout");
  return data;
};
