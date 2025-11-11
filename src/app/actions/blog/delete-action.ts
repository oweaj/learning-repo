"use server";

import connectDB from "@/lib/database/db";
import { Blog } from "@/lib/schemas/blog-schema";
import { revalidateTag } from "next/cache";
import { requireSession } from "../requireSession";

export const blogDeleteAction = async (id: string) => {
  try {
    await connectDB();
    const user_id = await requireSession();

    const blog = await Blog.findById(id);
    if (!blog) {
      throw new Error("존재하지 않는 블로그입니다.");
    }

    if (blog.user_id.toString() !== user_id.toString()) {
      throw new Error("블로그 삭제 권한이 없습니다.");
    }

    blog.deleted_at = new Date();
    await blog.save();
    revalidateTag("blog_list");

    return { ok: true, message: "블로그가 삭제 되었습니다." };
  } catch (error) {
    return { ok: false, message: `서버 에러 발생 : ${error}` };
  }
};
