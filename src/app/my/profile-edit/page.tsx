"use client";

import { useUser } from "@/lib/queries/auth/useUser";
import MyProfileImage from "./_components/MyProfileImage";
import ProfileEditForm from "./_components/ProfileEditForm";

const ProfileEdit = () => {
  const user = useUser();

  if (!user) return null;

  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between gap-3 pb-5 border-b-2 border-gray-700">
        <h3 className="text-[22px] font-semibold">프로필 수정</h3>
      </div>
      <MyProfileImage user={user} />
      <ProfileEditForm user={user} />
    </div>
  );
};

export default ProfileEdit;
