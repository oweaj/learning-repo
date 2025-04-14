"use client";

import { usePathname, useRouter } from "next/navigation";

interface TabProps {
  category: { value: number; label: string };
}

const Tab = ({ category }: TabProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const currentId = pathname === "/" ? 0 : pathname.split("/").pop();
  const isSelected = category.value === Number(currentId);

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        className={`whitespace-nowrap p-2 font-semibold ${isSelected ? "text-gray-900" : "text-gray-500"}`}
        onClick={() => router.push(`/${category.value}`)}
      >
        {category.label}
      </button>
      {isSelected && <div className="h-1 w-full bg-orange-400 rounded-xl" />}
    </div>
  );
};

export default Tab;
