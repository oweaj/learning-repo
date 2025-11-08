"use server";

import connectDB from "@/lib/database/db";
import { Blog } from "@/lib/schemas/blog-schema";
import type { IBlogDataType } from "@/types/blog.type";
import { requireSession } from "../requireSession";

// 블로그 상세
export const blogDetailAction = async (id: string) => {
  await connectDB();
  const user_id = await requireSession();

  const blogDetail = await Blog.findById(id)
    .populate("user_id", "email name")
    .lean<IBlogDataType>();

  if (!blogDetail) {
    throw new Error("해당 블로그를 찾을 수 없습니다.");
  }

  const isWriter = user_id === blogDetail.user_id._id.toString();
  const isLiked = user_id
    ? blogDetail.like_user.some((id: string) => id.toString() === user_id)
    : false;

  return { ...blogDetail, isWriter, isLiked };
};
