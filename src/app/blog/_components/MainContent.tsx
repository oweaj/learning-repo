"use client";

import Header from "@/components/home/Header";
import SearchBar from "@/components/home/SearchBar";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import BlogCategory from "./BlogCategory";
import BlogList from "./BlogList";

export interface IMainProps {
  category: string | null;
  page: number;
  keyword: string | null;
}

const MainContent = ({
  category: initialCategory,
  page: initialPage,
  keyword: initialKeyword,
}: IMainProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const categoryQuery = searchParams.get("category") || initialCategory;
  const pageQuery = Number(searchParams.get("page")) || initialPage;
  const keywordQuery = searchParams.get("keyword") || initialKeyword;
  const [category, setCategory] = useState(categoryQuery);
  const [page, setPage] = useState(pageQuery);
  const [keyword, setKeyword] = useState(keywordQuery);

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      setCategory(params.get("category") || null);
      setPage(Number(params.get("page")) || 1);
      setKeyword(params.get("keyword") || null);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleQueryChange = ({
    newCategory,
    newPage,
    newKeyword,
  }: {
    newCategory?: string | null;
    newPage?: number;
    newKeyword?: string | null;
  }) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!newCategory) {
      params.delete("category");
    } else {
      params.set("category", newCategory);
      setCategory(newCategory);
    }

    if (newPage) {
      params.set("page", newPage.toString());
      setPage(newPage);
    }

    if (!newKeyword) {
      params.delete("keyword");
    } else {
      params.set("keyword", newKeyword);
      setKeyword(newKeyword);
    }

    const queryString = params.toString();
    const queryUrl = queryString ? `${pathname}?${queryString}` : pathname;
    window.history.pushState(null, "", queryUrl);
  };

  const handleQueryReset = () => {
    window.history.pushState(null, "", "/");
    setCategory(initialCategory);
    setPage(initialPage);
    setKeyword(initialKeyword);
  };

  return (
    <>
      <Header handleQueryReset={handleQueryReset} />
      <main>
        <div className="space-y-7">
          <div className="flex items-center justify-between max-md:flex-col max-md:items-start max-md:gap-4">
            <BlogCategory
              category={category}
              handleQueryChange={handleQueryChange}
            />
            <SearchBar
              keyword={keyword}
              handleQueryChange={handleQueryChange}
            />
          </div>
          <BlogList category={category} page={page} keyword={keyword} />
        </div>
      </main>
    </>
  );
};

export default MainContent;
