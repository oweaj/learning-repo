"use client";

import { useBlogList } from "@/lib/queries/blog/useBlogList";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import BlogCard from "./BlogCard";

const BlogList = ({
  category,
  page,
}: { category: string | null; page: number }) => {
  const router = useRouter();
  const { data, count } = useBlogList({ category, page });

  if (!data || !count) return null;

  const totalPage = Math.ceil(count / 10);
  const groupPage = 5;
  const currentGroup = Math.floor((page - 1) / groupPage);
  const startPage = currentGroup * groupPage + 1;
  const endPage = Math.min(startPage + groupPage - 1, totalPage);
  const pageNumberList = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  const handlePageChange = (pageNumber: number) => {
    const query = category
      ? `/?category=${category}&page=${pageNumber}&limit=10`
      : `/?page=${pageNumber}&limit=10`;
    router.push(query);
  };

  const handleMovePage = (move: "prev" | "next") => {
    if (move === "prev" && page > 1) {
      handlePageChange(page - 1);
    } else if (move === "next" && page < totalPage) {
      handlePageChange(page + 1);
    }
  };

  return (
    <div>
      {!data.length && (
        <div className="text-center text-gray-600 py-8">
          해당 카테고리의 데이터가 없습니다.
        </div>
      )}
      <ul className="space-y-8">
        {data.map((item) => (
          <BlogCard key={item.id} {...item} />
        ))}
      </ul>

      <ul className="flex items-center justify-center gap-4 mt-16">
        <li>
          <button
            type="button"
            className={`flex items-center ${page !== 1 && "cursor-pointer"}`}
            onClick={() => handleMovePage("prev")}
            disabled={page === 1}
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
        </li>
        {pageNumberList.map((num) => (
          <li key={num}>
            <button
              type="button"
              onClick={() => handlePageChange(num)}
              className={`px-4 py-2 rounded cursor-pointer ${
                num === page ? "bg-orange-500 text-white" : "bg-gray-200"
              }`}
            >
              {num}
            </button>
          </li>
        ))}
        <li>
          <button
            type="button"
            className={`flex items-center ${page !== totalPage && "cursor-pointer"}`}
            onClick={() => handleMovePage("next")}
            disabled={page === totalPage}
          >
            <ChevronRight className="w-7 h-7" />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default BlogList;
