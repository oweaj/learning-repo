"use client";

import DefaultProfile from "@/assets/images/default-profile.svg";
import { Button } from "@/components/ui/button";
import { deleteImageApi, uploadImageApi } from "@/lib/api/image";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { type ChangeEvent, useRef } from "react";

const MyProfileImage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { data: session, update } = useSession();

  const handleProfileImage = () => {
    inputRef.current?.click();
  };

  const handleFileChange = async (e: ChangeEvent) => {
    const { files } = e.target as HTMLInputElement;

    if (files) {
      try {
        const imageUpload = await uploadImageApi({
          file: files[0],
          prefix: "profile",
        });
        await update({
          user: { ...session?.user, profile_image: imageUpload },
        });
      } catch (error) {
        alert(`이미지 업로드 실패 : ${error}`);
      }
    }
  };

  const handleProfileImageDelete = async () => {
    if (session?.user.profile_image) {
      try {
        const imageDelete = await deleteImageApi({
          key: session?.user.profile_image,
          prefix: "profile",
        });
        await update({ user: { ...session?.user, profile_image: null } });
        alert(imageDelete.message);
      } catch (error) {
        alert(`이미지 삭제 실패 : ${error}`);
      }
    }
  };

  return (
    <div className="flex items-center gap-6 py-5 border-b">
      <div className="relative w-[60px] h-[60px] rounded-xl overflow-hidden">
        {session?.user.profile_image ? (
          <Image
            src={session?.user.profile_image}
            fill
            sizes="60px"
            className="object-cover"
            alt={"프로필 이미지"}
            priority
          />
        ) : (
          <DefaultProfile className="w-full h-full object-cover" />
        )}
      </div>
      <div className="flex flex-col justify-center gap-2">
        <span className="text-lg font-semibold">{session?.user.name}</span>
        <div className="space-x-3">
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
            data-testid={"profile-image-upload"}
          />
          <Button type="button" variant="outline" onClick={handleProfileImage}>
            이미지 변경
          </Button>
          <Button type="button" onClick={handleProfileImageDelete}>
            삭제
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MyProfileImage;
