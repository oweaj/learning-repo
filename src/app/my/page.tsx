"use client";

import { useSession } from "next-auth/react";
import { useMyBlogList, useMyLikeBlogList } from "../hooks/my/useMy";
import MyBlogs from "./_components/MyBlogs";
import UserInfo from "./_components/UserInfo";
import UserProfile from "./_components/UserProfile";

const MyPage = () => {
  const { data: session } = useSession();
  const { data: queryBlogs } = useMyBlogList();
  const { data: queryLikeblogs } = useMyLikeBlogList();

  if (!session?.user || !queryBlogs || !queryLikeblogs) return null;

  return (
    <div className="w-full space-y-8">
      <UserProfile user={session?.user} />
      <UserInfo queryBlogs={queryBlogs} queryLikeblogs={queryLikeblogs} />
      <MyBlogs queryBlogs={queryBlogs} />
    </div>
  );
};

export default MyPage;
