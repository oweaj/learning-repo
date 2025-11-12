"use client";

import { blogListAction } from "@/app/actions/blog";
import { useQueryClient } from "@tanstack/react-query";

interface ITabProps {
  item: { id: number; name: string; value: string };
  category: string | null;
  handleQueryChange: ({ newCategory }: { newCategory: string | null }) => void;
}

const Tab = ({ item, category, handleQueryChange }: ITabProps) => {
  const queryClient = useQueryClient();
  const isSelected =
    item.value === "all" ? category === null : item.value === category;

  return (
    <div className="flex flex-col items-center max-mlg:flex-1 max-mlg:min-w-9">
      <button
        type="button"
        className={`whitespace-nowrap p-2 font-semibold cursor-pointer hover:text-gray-900 max-xs:text-sm ${
          isSelected ? "text-gray-900" : "text-gray-500"
        }`}
        onMouseEnter={() =>
          queryClient.prefetchQuery({
            queryKey: ["blog_list", item.value, 1, null],
            queryFn: () => blogListAction(item.value, 1, null),
          })
        }
        onClick={() =>
          handleQueryChange({
            newCategory: item.value === "all" ? null : item.value,
          })
        }
        data-testid={`${item.value}-${isSelected ? "selected" : "not-selected"}`}
      >
        {item.name}
      </button>
      {isSelected && <div className="h-1 w-full bg-orange-400 rounded-xl" />}
    </div>
  );
};

export default Tab;
