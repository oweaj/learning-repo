"use client";

import DefaultProfile from "@/assets/images/default-profile.svg";
import { Button } from "@/components/ui/button";
import { useImageDelete } from "@/lib/queries/auth/useImageDelete";
import { useImageUpload } from "@/lib/queries/auth/useImageUpload";
import type { IUserDataType } from "@/types/auth.type";
import Image from "next/image";
import { type ChangeEvent, useRef } from "react";

const MyProfileImage = ({ user }: { user?: IUserDataType }) => {
  const { mutate: queryUploadImage } = useImageUpload();
  const { mutate: queryDeleteImage } = useImageDelete();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleProfileImage = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent) => {
    const { files } = e.target as HTMLInputElement;

    if (files) {
      const formData = new FormData();
      formData.append("file", files[0]);

      queryUploadImage({ prefix: "profile", formData });
    }
  };

  const handleProfileImageDelete = () => {
    if (user?.profile_image) {
      queryDeleteImage(user?.profile_image);
    }
  };

  return (
    <div className="flex items-center gap-6 py-5 border-b">
      <div className="relative w-[60px] h-[60px] rounded-xl overflow-hidden">
        {user?.profile_image ? (
          <Image
            src={user?.profile_image}
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
        <span className="text-lg font-semibold">{user?.name}</span>
        <div className="space-x-3">
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
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
