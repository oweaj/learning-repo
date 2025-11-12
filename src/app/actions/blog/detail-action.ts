"use server";

import { authOptions } from "@/auth";
import connectDB from "@/lib/database/db";
import { Blog } from "@/lib/schemas/blog-schema";
import type { IBlogDataType } from "@/types/blog.type";
import { getServerSession } from "next-auth";

// 블로그 상세
export const blogDetailAction = async (id: string) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ?? null;

  await connectDB();

  const data = await Blog.findById(id)
    .populate("user_id", "email name")
    .lean<IBlogDataType>();

  if (!data) {
    throw new Error("해당 블로그를 찾을 수 없습니다.");
  }

  const isWriter = userId ? userId === data.user_id?.id?.toString() : null;
  const isLiked = userId
    ? data.like_user.some((id: string) => id.toString() === userId)
    : false;
  const blogDetail = JSON.parse(JSON.stringify(data));

  return { ...blogDetail, isWriter, isLiked };
};
