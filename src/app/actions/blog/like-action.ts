"use server";

import { authOptions } from "@/auth";
import connectDB from "@/lib/database/db";
import { Blog } from "@/lib/schemas/blog-schema";
import type { Types } from "mongoose";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";

export const blogLikeAction = async (id: string) => {
  await connectDB();
  const session = await getServerSession(authOptions);
  const user_id = session?.user?.id ?? null;

  const checkBlog = await Blog.findById(id);
  if (!checkBlog) {
    throw new Error("존재하지 않는 블로그입니다.");
  }

  const checkUserLike = checkBlog.like_user.some((user: Types.ObjectId) =>
    user.equals(user_id),
  );

  const updateBlogData = checkUserLike
    ? { $pull: { like_user: user_id }, $inc: { like_count: -1 } }
    : { $addToSet: { like_user: user_id }, $inc: { like_count: 1 } };

  await Blog.findOneAndUpdate({ _id: id }, updateBlogData, { new: true });
  revalidateTag("blog_list");
  revalidateTag("blogDetail");
  revalidateTag("blog_rank");

  return {
    message: checkUserLike
      ? "좋아요가 취소되었습니다."
      : "좋아요가 등록되었습니다.",
  };
};
