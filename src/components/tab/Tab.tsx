"use client";

import { usePageStore } from "@/store/usePageStore";
import { useRouter, useSearchParams } from "next/navigation";

interface TabProps {
  category: { id: number; name: string; value: string };
}

const Tab = ({ category }: TabProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryName = searchParams.get("category");
  const { currentPage } = usePageStore();
  const isSelected =
    category.value === "all"
      ? categoryName === null
      : category.value === categoryName;

  const handleCategoryClick = () => {
    if (category.value === "all") {
      router.push(`/?page=${currentPage}&limit=10`);
    } else {
      router.push(`/?category=${category.value}&page=${currentPage}&limit=10`);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        className={`whitespace-nowrap p-2 font-semibold ${isSelected ? "text-gray-900" : "text-gray-500"}`}
        onClick={() => handleCategoryClick()}
      >
        {category.name}
      </button>
      {isSelected && <div className="h-1 w-full bg-orange-400 rounded-xl" />}
    </div>
  );
};

export default Tab;
