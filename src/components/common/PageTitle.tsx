"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const PageTitle = ({ title }: { title: string }) => {
  const router = useRouter();

  return (
    <button
      type="button"
      className="flex items-center gap-6 text-xl font-semibold cursor-pointer"
      onClick={() => router.back()}
    >
      <ChevronLeft />
      {title}
    </button>
  );
};

export default PageTitle;
