"use client";

import { useBlogDetail } from "@/lib/queries/blog/useBlogDetail";
import { useSearchParams } from "next/navigation";
import BlogFormWrapper from "../../_components/FormWrapper";

const BlogEdit = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  if (!id) return null;
  const blogData = useBlogDetail({ id: Number(id) });

  return (
    <BlogFormWrapper title="글 수정" editMode defaultData={blogData} id={id} />
  );
};

export default BlogEdit;
