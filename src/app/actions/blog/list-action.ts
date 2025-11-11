"use server";

import connectDB from "@/lib/database/db";
import { Blog } from "@/lib/schemas/blog-schema";

// 블로그 목록
export const blogListAction = async (
  category: string | null,
  page: number,
  keyword?: string | null,
) => {
  await connectDB();

  const limit = 10;
  const skip = (page - 1) * limit;

  const filterData: Record<string, any> = { deleted_at: null };

  if (category) {
    filterData.category_id = category;
  }

  if (keyword) {
    filterData.$or = [
      { title: { $regex: keyword, $options: "i" } },
      { content: { $regex: keyword, $options: "i" } },
    ];
  }

  const data = await Blog.find(filterData)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("user_id", "email name profile_image");

  const totalCount = await Blog.countDocuments(filterData);
  const bloglist = JSON.parse(JSON.stringify(data));

  return {
    bloglist,
    page,
    limit,
    totalPages: Math.max(1, Math.ceil(totalCount / limit)),
    totalCount,
  };
};
