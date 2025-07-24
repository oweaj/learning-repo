"use client";

import { useUser } from "@/lib/queries/auth/useUser";
import MyBlogs from "./_components/MyBlogs";
import UserInfo from "./_components/UserInfo";
import UserProfile from "./_components/UserProfile";

const MyPage = () => {
  const user = useUser();

  if (!user) return null;

  return (
    <div className="w-full space-y-8">
      <UserProfile user={user} />
      <UserInfo />
      <MyBlogs />
    </div>
  );
};

export default MyPage;
