"use client";

import BlogCard from "@/app/blog/_components/BlogCard";
import type { IBlogDataType } from "@/types/blog.type";
import { BlogSkeleton } from "./BlogSkeleton";

interface IMyBlogsType {
  preview?: boolean;
  data?: IBlogDataType[];
  isLoading: boolean;
}

const MyDataList = ({ preview, data, isLoading }: IMyBlogsType) => {
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
        <div className="text-center text-gray-500 py-10">
          해당 블로그가 없습니다
        </div>
      )}
    </div>
  );
};

export default MyDataList;
