"use server";

import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";

export const requireSession = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    throw new Error("로그인이 필요합니다.");
  }

  return user;
};
