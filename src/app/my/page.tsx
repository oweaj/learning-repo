"use client";

import { getUserApi } from "@/lib/api/auth/auth";
import {
  myLikeBlogsApi,
  myblogListApi,
  noticeListApi,
} from "@/lib/api/my/mypage";
import { useQueries } from "@tanstack/react-query";
import MyBlogs from "./_components/MyBlogs";
import UserInfo from "./_components/UserInfo";
import UserProfile from "./_components/UserProfile";

const MyPage = () => {
  const result = useQueries({
    queries: [
      { queryKey: ["user"], queryFn: getUserApi },
      { queryKey: ["myBlogs"], queryFn: myblogListApi },
      { queryKey: ["myLikeBlogs"], queryFn: myLikeBlogsApi },
      { queryKey: ["notice_list"], queryFn: noticeListApi },
    ],
  });

  const isSuccess = result.every((query) => query.isSuccess);

  if (!isSuccess) return null;

  return (
    <div className="w-full space-y-8">
      <UserProfile />
      <UserInfo />
      <MyBlogs />
    </div>
  );
};

export default MyPage;
