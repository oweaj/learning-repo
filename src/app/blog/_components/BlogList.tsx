"use client";

import { useBlogList } from "@/queries/blog/useBlogList";
import { useState } from "react";
import BlogCard from "./BlogCard";

const BlogList = ({ category }: { category: number }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useBlogList({ category, page: currentPage });

  // 데이터 개수 기본이 10개임
  if (!data) return null;

  const totalPage = Math.ceil(data.length / 10);
  const pageNumber = Array.from({ length: totalPage }, (_, i) => i + 1);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  console.log(data);

  return (
    <div className="space-y-10">
      <ul className="space-y-6">
        {data.map((item) => (
          <BlogCard key={item.id} {...item} />
        ))}
      </ul>
      <div className="text-center mt-4">
        <ul>
          {pageNumber.map((num) => (
            <li key={num}>
              <button
                type="button"
                onClick={() => handleChangePage(num)}
                className={`px-4 py-2 rounded ${num === currentPage ? "bg-orange-500 text-white" : "bg-gray-200"}`}
              >
                {num}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogList;
