"use client";

import FormWrapper from "@/app/blog/_components/FormWrapper";
import { useBlogDetail } from "@/app/hooks/blog/useBlog";

const BlogEdit = ({ id }: { id: string }) => {
  if (!id) return null;
  const blogData = useBlogDetail({ id });

  return (
    <FormWrapper
      title="글 수정"
      editMode
      name="blog"
      defaultData={blogData}
      id={id}
    />
  );
};

export default BlogEdit;
