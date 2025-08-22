"use server";

import { getUserApi } from "../api/auth/auth";

export const getUserAction = async () => {
  const user = await getUserApi();
  return user;
};
