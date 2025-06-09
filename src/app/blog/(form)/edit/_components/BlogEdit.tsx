"use client";

import BlogFormWrapper from "@/app/blog/_components/FormWrapper";
import { useBlogDetail } from "@/lib/queries/blog/useBlogDetail";

const BlogEdit = ({ id }: { id: string }) => {
  if (!id) return null;
  const blogData = useBlogDetail({ id: Number(id) });

  return (
    <BlogFormWrapper title="글 수정" editMode defaultData={blogData} id={id} />
  );
};

export default BlogEdit;
