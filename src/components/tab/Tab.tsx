"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface TabProps {
  category: { id: number; name: string; value: string };
}

const Tab = ({ category }: TabProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryName = searchParams.get("category");
  const isSelected =
    category.value === "all"
      ? categoryName === null
      : category.value === categoryName;

  const handleCategoryClick = () => {
    if (category.value === "all") {
      router.push("/?page=1&limit=10");
    } else {
      router.push(`/?category=${category.value}&page=1&limit=10`);
    }
  };

  return (
    <div className="flex flex-col items-center max-mlg:flex-1 max-mlg:min-w-9">
      <button
        type="button"
        className={`whitespace-nowrap p-2 font-semibold cursor-pointer hover:text-gray-900 max-xs:text-sm ${
          isSelected ? "text-gray-900" : "text-gray-500"
        }`}
        onClick={() => handleCategoryClick()}
        data-testid={`${category.value}-${isSelected ? "selected" : "not-selected"}`}
      >
        {category.name}
      </button>
      {isSelected && <div className="h-1 w-full bg-orange-400 rounded-xl" />}
    </div>
  );
};

export default Tab;
