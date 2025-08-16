"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import MyBlogList from "../blogs/_components/MyBlogList";

const MyBlogs = () => {
  const router = useRouter();

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 pb-2 border-b-1">내 블로그</h3>
      <div className="flex flex-col justify-center gap-12">
        <MyBlogList preview />
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
    </div>
  );
};

export default MyBlogs;
