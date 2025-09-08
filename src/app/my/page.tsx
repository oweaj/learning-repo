"use client";

import { useUser } from "@/lib/queries/auth/useUser";
import { useMyBlogList } from "@/lib/queries/my/useMyBlogList";
import { useMyLikeBlogList } from "@/lib/queries/my/useMyLikeBlogList";
import MyBlogs from "./_components/MyBlogs";
import UserInfo from "./_components/UserInfo";
import UserProfile from "./_components/UserProfile";

const MyPage = () => {
  const { data: user } = useUser();
  const { data: queryBlogs } = useMyBlogList();
  const { data: queryLikeblogs } = useMyLikeBlogList();

  if (!user || !queryBlogs || !queryLikeblogs) return null;

  return (
    <div className="w-full space-y-8">
      <UserProfile user={user} />
      <UserInfo queryBlogs={queryBlogs} queryLikeblogs={queryLikeblogs} />
      <MyBlogs queryBlogs={queryBlogs} />
    </div>
  );
};

export default MyPage;
