"use client";

import BlogCard from "@/app/blog/_components/BlogCard";
import { Button } from "@/components/ui/button";
import { useMyBlogList } from "@/lib/queries/my/useMyBlog";
import type { IBlogDataType } from "@/types/blog.type";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { BlogSkeleton } from "./BlogSkeleton";

const MyBlogs = () => {
  const { data, isLoading, error } = useMyBlogList();
  const router = useRouter();

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">내 블로그</h3>
      {isLoading ? (
        <BlogSkeleton />
      ) : data && data.length > 0 ? (
        <div className="flex flex-col justify-center gap-15">
          <ul className="space-y-8">
            {data.map((item: IBlogDataType) => (
              <BlogCard key={item._id} {...item} />
            ))}
          </ul>
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => router.push("/my/blogs")}
          >
            <Plus />
            <span>내 블로그 전체보기</span>
          </Button>
        </div>
      ) : (
        <div className="text-center text-gray-500 py-10">{error?.message}</div>
      )}
    </div>
  );
};

export default MyBlogs;
