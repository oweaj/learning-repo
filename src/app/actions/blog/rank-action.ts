"use server";

import connectDB from "@/lib/database/db";
import { Blog } from "@/lib/schemas/blog-schema";

// 블로그 공감 랭킹
export const blogLikeRankAction = async () => {
  await connectDB();

  const blogRank = await Blog.find({
    deleted_at: null,
    like_count: { $gt: 0 },
  })
    .sort({ like_count: -1, createdAt: -1 })
    .populate("user_id", "email name profile_image")
    .limit(10)
    .lean();

  return blogRank;
};
