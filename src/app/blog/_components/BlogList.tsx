"use client";

import { useBlogList } from "@/lib/queries/blog/useBlogList";
import type { IBlogDataType } from "@/types/blog.type";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import BlogCard from "./BlogCard";

const BlogList = ({
  category,
  page,
}: { category: string | null; page: number }) => {
  const router = useRouter();
  const { data } = useBlogList({ category, page });

  if (!data) return null;

  const pageNumberList = Array.from(
    { length: data.totalPages },
    (_, i) => 1 + i,
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
    } else if (move === "next" && page < data.totalPages) {
      handlePageChange(page + 1);
    }
  };

  return (
    <div>
      {!data.bloglist.length && (
        <div className="text-center text-gray-600 py-8">
          해당 카테고리의 데이터가 없습니다.
        </div>
      )}
      <ul className="space-y-8">
        {data.bloglist.map((item: IBlogDataType) => (
          <BlogCard key={item._id} {...item} />
        ))}
      </ul>
      {data.totalCount > 10 && (
        <ul className="flex items-center justify-center gap-4 mt-16">
          <li>
            <button
              type="button"
              className={`flex items-center ${page !== 1 && "cursor-pointer"}`}
              onClick={() => handleMovePage("prev")}
              disabled={page === 1}
              aria-label="이전 페이지"
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
              className={`flex items-center ${page !== data.totalCount && "cursor-pointer"}`}
              onClick={() => handleMovePage("next")}
              disabled={page === data.totalCount}
              aria-label="다음 페이지"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default BlogList;
