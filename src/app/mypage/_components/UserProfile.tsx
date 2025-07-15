"use client";

import { useUser } from "@/lib/queries/blog/useUser";

const UserProfile = () => {
  const user = useUser();

  if (!user) return null;

  return <div className="w-full border rounded-sm p-6">{user.name}</div>;
};

export default UserProfile;
