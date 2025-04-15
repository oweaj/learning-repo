"use client";

import { useBlogList } from "@/queries/blog/useBlogList";
import BlogCard from "./BlogCard";

const BlogList = ({ category, page }: { category: number; page: number }) => {
  const { data } = useBlogList({ category, page });
  if (!data) return null;

  return (
    <div>
      <ul className="space-y-6">
        {data.map((item) => (
          <BlogCard key={item.id} {...item} />
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
