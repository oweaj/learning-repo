"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const PageTitle = ({ title }: { title: string }) => {
  const router = useRouter();

  const handleRouter = () => {
    return title.includes("수정") ? router.back() : router.push("/");
  };

  return (
    <button
      type="button"
      className="flex items-center gap-6 text-xl font-semibold cursor-pointer w-5/6"
      onClick={handleRouter}
    >
      <ChevronLeft />
      <span className="truncate">{title}</span>
    </button>
  );
};

export default PageTitle;
