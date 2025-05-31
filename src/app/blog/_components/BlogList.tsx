"use client";

import { useBlogList } from "@/lib/queries/blog/useBlogList";
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
  const pageNumber = Array.from({ length: totalPage }, (_, i) => i + 1);

  const handlePageChange = (pageNumber: number) => {
    const query = category
      ? `/?category=${category}&page=${pageNumber}&limit=10`
      : `/?page=${pageNumber}&limit=10`;
    router.push(query);
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
        {pageNumber.map((num) => (
          <li key={num}>
            <button
              type="button"
              onClick={() => handlePageChange(num)}
              className={`px-4 py-2 rounded ${num === page ? "bg-orange-500 text-white" : "bg-gray-200"}`}
            >
              {num}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
