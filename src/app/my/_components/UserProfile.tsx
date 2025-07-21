"use client";

import DefaultProfile from "@/assets/images/default-profile.svg";
import { Button } from "@/components/ui/button";
import { useUser } from "@/lib/queries/blog/useUser";
import Image from "next/image";
import { useRouter } from "next/navigation";

const UserProfile = () => {
  const user = useUser();
  const router = useRouter();

  if (!user) return null;

  return (
    <div className="w-full border rounded-sm p-6 flex gap-6 items-center">
      <div className="min-w-[60px] min-h-[60px]">
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
      </div>
      <div className="w-full flex items-center max-[500px]:flex-col max-[500px]:items-start max-[500px]:gap-2">
        <div className="flex-1 w-0 min-w-0">
          <span>{user.name}</span>
          <p className="truncate">{user.email}</p>
        </div>
        <div className="flex gap-2 text-sm">
          <Button
            type="button"
            variant="outline"
            className="max-[500px]:py-1 max-[500px]:px-2"
            onClick={() => router.push("/my/profile-edit")}
          >
            프로필 수정
          </Button>
          <Button
            type="button"
            variant="outline"
            className="max-[500px]:py-1 max-[500px]:px-2"
            onClick={() => router.push("/my/blogs")}
          >
            내 블로그
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
