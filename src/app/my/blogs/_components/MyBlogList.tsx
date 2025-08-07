"use client";

import BlogCard from "@/app/blog/_components/BlogCard";
import { useMyBlogList } from "@/lib/queries/my/useMyBlog";
import type { IBlogDataType } from "@/types/blog.type";
import { BlogSkeleton } from "./BlogSkeleton";

const MyBlogList = ({ preview = false }: { preview?: boolean }) => {
  const { data, isLoading, error } = useMyBlogList();

  const renderData = preview ? data?.slice(0, 3) : data;

  return (
    <div>
      {isLoading ? (
        <BlogSkeleton limit={preview ? 3 : 5} />
      ) : data && data.length > 0 ? (
        <ul className="space-y-8">
          {renderData?.map((item: IBlogDataType) => (
            <BlogCard key={item._id} {...item} />
          ))}
        </ul>
      ) : (
        <div className="text-center text-gray-500 py-10">{error?.message}</div>
      )}
    </div>
  );
};

export default MyBlogList;
