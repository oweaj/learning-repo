"use client";

import { BLOG_CATEGORY } from "@/constants/blog/blog";
import { cn } from "@/lib/utils";
import type { IMyProfileDataType } from "@/types/mypage.type";
import type { UseFormReturn } from "react-hook-form";

interface ILikeCategoryProps {
  form: UseFormReturn<IMyProfileDataType>;
}

const LikeCategoryButton = ({ form }: ILikeCategoryProps) => {
  const filterCategory = BLOG_CATEGORY.filter((item) => item.value !== "all");
  const selectCategory = form.watch("like_category") || [];

  const handleClick = (value: string) => {
    if (selectCategory.includes(value)) {
      form.setValue(
        "like_category",
        selectCategory.filter((category) => category !== value),
        { shouldValidate: true, shouldDirty: true },
      );
    } else {
      form.setValue("like_category", [...selectCategory, value], {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  return (
    <ul className="flex flex-wrap gap-3">
      {filterCategory.map((category) => (
        <li key={category.id}>
          <button
            type="button"
            className={cn(
              "rounded-xl border border-gray-400 px-4 py-3 text-sm font-medium text-gray-700",
              selectCategory.includes(category.value) &&
                "border border-orange-500 text-orange-500",
            )}
            onClick={() => handleClick(category.value)}
          >
            {category.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default LikeCategoryButton;
