"use client";

import { Button } from "@/components/ui/button";
import { useMyBlogList } from "@/lib/queries/my/useMyBlogList";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import MyDataList from "../blogs/_components/MyDataList";

const MyBlogs = () => {
  const router = useRouter();
  const { data, isLoading } = useMyBlogList();

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 pb-2 border-b-1">
        작성한 블로그
      </h3>
      <div className="flex flex-col justify-center gap-12 min-h-56">
        <MyDataList preview data={data?.blogs} isLoading={isLoading} />
        {data?.blogs.length ? (
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
