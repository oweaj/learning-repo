"use client";

import DefaultProfile from "@/assets/images/default-profile.svg";
import { useUser } from "@/lib/queries/blog/useUser";
import Image from "next/image";
import { useRouter } from "next/navigation";

const UserProfile = () => {
  const user = useUser();
  const router = useRouter();

  if (!user) return null;

  return (
    <div className="w-full border rounded-sm p-6 flex gap-6 items-center">
      {user.profile_image ? (
        <Image
          src={user.profile_image}
          fill
          sizes="60px"
          className="object-cover"
          alt={"프로필 이미지"}
          priority
        />
      ) : (
        <DefaultProfile width={60} height={60} />
      )}
      <div className="w-full flex items-center justify-between">
        <div>
          <span>{user.name}</span>
          <p>{user.email}</p>
        </div>
        <div className="border rounded-sm p-2">
          <button type="button" onClick={() => router.push("/my/profile-edit")}>
            프로필 수정
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
