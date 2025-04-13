import type { LoginDataType } from "@/types/auth.type";
import { instance } from "../axios";

export const loginApi = async (formData: LoginDataType) => {
  const { data } = await instance.post("/api/v1/auth/login", formData);

  return data;
};
