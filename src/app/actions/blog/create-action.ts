"use server";

import connectDB from "@/lib/database/db";
import { Blog } from "@/lib/schemas/blog-schema";
import type { IBlogFormDataType } from "@/types/blog.type";
import { revalidateTag } from "next/cache";
import { requireSession } from "../requireSession";

export const blogCreateAction = async (data: IBlogFormDataType) => {
  try {
    await connectDB();
    const user_id = await requireSession();

    const { title, main_image, category_id, content } = data;

    if (!title || !main_image || !category_id || !content) {
      throw new Error("필수 항목을 모두 입력해주세요.");
    }

    const blog = new Blog({
      ...data,
      user_id: user_id,
    });

    await blog.save();
    revalidateTag("blog_list");

    return { ok: true, message: "블로그 등록이 되었습니다." };
  } catch (error) {
    return { ok: false, message: `서버 에러 발생 : ${error}` };
  }
};
