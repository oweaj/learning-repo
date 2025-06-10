"use client";

import { imageUploadApi } from "@/lib/api/image/upload";
import type { TBlogFormType } from "@/types/blog.type";
import { Plus } from "lucide-react";
import Image from "next/image";
import type { ChangeEvent } from "react";
import type { UseFormReturn } from "react-hook-form";

const BlogImageUpload = ({
  form,
  field,
  tag,
}: {
  form: UseFormReturn<TBlogFormType>;
  field: {
    value: string;
    onChange: (value: string | null) => void;
  };
  tag: "main" | "sub";
}) => {
  const currentTag = tag === "main" ? "main_image" : "sub_image";
  const imageUrl = form.watch(currentTag);

  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files) {
      const uploadImage = await imageUploadApi(files[0]);
      field.onChange(uploadImage);
    }
  };

  return (
    <div className="relative w-full h-64 text-center text-gray-500 font-semibold space-y-2">
      <input
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="absolute inset-0 opacity-0 cursor-pointer z-10"
        data-testid="image-upload-input"
      />
      <div className="relative w-[270px] h-[200px] border rounded-xl bg-gray-50 overflow-hidden max-[580px]:w-[300px]">
        {imageUrl ? (
          <Image
            src={imageUrl || ""}
            fill
            sizes="270px"
            className="object-cover"
            alt={`${tag} 이미지`}
            priority
          />
        ) : (
          <Plus className="w-8 h-8 absolute top-1/2 left-1/2 -translate-1/2 text-gray-400" />
        )}
      </div>
      {tag === "main" ? <span>대표사진</span> : <span>서브</span>}
    </div>
  );
};

export default BlogImageUpload;
