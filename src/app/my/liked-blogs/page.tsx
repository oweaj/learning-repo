"use client";

import { useMyLikeBlogList } from "@/lib/queries/my/useMyLikeBlogList";
import MyDataList from "../blogs/_components/MyDataList";

const MyLikeBlogs = () => {
  const { data } = useMyLikeBlogList();

  return (
    <div className="w-full space-y-4">
      <div className="flex items-baseline gap-3 pb-3 border-b-1 max-[400px]:flex-col max-[400px]:gap-1">
        <h3 className="text-[22px] font-semibold">공감한 블로그</h3>
      </div>
      <MyDataList data={data?.likeBlogs} />
    </div>
  );
};

export default MyLikeBlogs;
