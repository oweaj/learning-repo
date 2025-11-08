"use server";

import { authOptions } from "@/auth";
import { getServerSession } from "next-auth/next";

export const requireSession = async () => {
  const session = await getServerSession(authOptions);
  const user_id = session?.user?.id;

  if (!user_id) {
    throw new Error("로그인이 필요합니다.");
  }

  return user_id;
};
