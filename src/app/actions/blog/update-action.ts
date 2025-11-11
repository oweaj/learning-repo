"use server";

import connectDB from "@/lib/database/db";
import { Blog } from "@/lib/schemas/blog-schema";
import type { IBlogFormDataType } from "@/types/blog.type";
import { revalidateTag } from "next/cache";
import { requireSession } from "../requireSession";

// 블로그 수정
export const blogUpdateAction = async ({
  id,
  data,
}: { id: string; data: IBlogFormDataType }) => {
  try {
    await connectDB();
    const user_id = await requireSession();

    const { title, main_image, sub_image, category_id, content } = data;

    const blogData = await Blog.findById(id);
    if (!blogData) {
      throw new Error("존재하지 않는 블로그입니다.");
    }

    if (blogData.user_id.toString() !== user_id.toString()) {
      throw new Error("블로그 수정 권한이 없습니다.");
    }

    const updateBlogData = {
      title: title ?? blogData.title,
      main_image: main_image ?? blogData.main_image,
      sub_image: sub_image ?? blogData.sub_image,
      category_id: category_id ?? blogData.category_id,
      content: content ?? blogData.content,
    };

    await Blog.findOneAndUpdate(
      { _id: id, user_id },
      { $set: updateBlogData },
      { new: true },
    );
    revalidateTag("blog_list");
    revalidateTag("blogDetail");

    return { ok: true, message: "블로그 수정이 완료되었습니다." };
  } catch (error) {
    return { ok: false, message: `서버 에러 발생 : ${error}` };
  }
};
