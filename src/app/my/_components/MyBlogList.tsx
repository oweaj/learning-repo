"use client";

import BlogCard from "@/app/blog/_components/BlogCard";
import { useMyBlogList } from "@/lib/queries/my/useMyBlog";
import type { IBlogDataType } from "@/types/blog.type";

const MyBlogList = () => {
  const { data } = useMyBlogList("all");

  if (!data) return null;

  return (
    <ul className="space-y-8">
      {data.map((item: IBlogDataType) => (
        <BlogCard key={item._id} {...item} />
      ))}
    </ul>
  );
};

export default MyBlogList;
