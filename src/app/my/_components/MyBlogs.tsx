"use client";

import { Button } from "@/components/ui/button";
import type { IMyBlogDataType } from "@/types/blog.type";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import MyDataList from "./MyDataList";

interface IMyBlogsType {
  queryBlogs: IMyBlogDataType;
}

const MyBlogs = ({ queryBlogs }: IMyBlogsType) => {
  const router = useRouter();

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 pb-2 border-b-1">
        작성한 블로그
      </h3>
      <div className="flex flex-col justify-center gap-12 min-h-56">
        <MyDataList preview data={queryBlogs?.blogs} />
        {queryBlogs?.blogs.length ? (
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => router.push("/my/blogs")}
          >
            <Plus />
            <span>작성한 블로그 전체보기</span>
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default MyBlogs;
