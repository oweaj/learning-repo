"use client";

import BlogCard from "@/app/blog/_components/BlogCard";
import { useBlogLikeRank } from "@/app/hooks/blog/useBlog";
import type { IBlogDataType } from "@/types/blog.type";

const LikeRankList = () => {
  const { data } = useBlogLikeRank();

  return (
    <div>
      <ul className="space-y-8">
        {data?.map((item: IBlogDataType) => (
          <BlogCard key={item._id} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default LikeRankList;
