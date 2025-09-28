"use client";

import BlogCreate from "@/assets/icons/icon_create.svg";
import BottomNavbar from "@/components/home/BottomNavbar";
import Header from "@/components/home/Header";
import SearchBar from "@/components/home/SearchBar";
import { useUser } from "@/lib/queries/auth/useUser";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
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
  const category = searchParams.get("category") || initialCategory;
  const page = Number(searchParams.get("page")) || initialPage;
  const keyword = searchParams.get("keyword") || initialKeyword;
  const { data: user } = useUser();

  const handleQueryChange = async ({
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
    }

    if (newPage) {
      params.set("page", newPage.toString());
    }

    if (!newKeyword) {
    } else {
      params.set("keyword", newKeyword);
    }

    const queryString = params.toString();
    const queryUrl = queryString ? `${pathname}?${queryString}` : pathname;
    window.history.pushState(null, "", queryUrl);
    window.scrollTo({ top: 0 });
  };

  const handleQueryReset = () => {
    window.history.pushState(null, "", "/");
  };

  return (
    <>
      <Header handleQueryReset={handleQueryReset} />
      <div className="relative p-4 max-w-screen-xl h-auto mx-auto pb-24">
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
            <BlogList
              category={category}
              page={page}
              keyword={keyword}
              handleQueryChange={handleQueryChange}
            />
          </div>
        </main>
      </div>
      {user?._id && (
        <Link
          href={"/blog/create"}
          className="fixed bottom-20 right-4 flex items-center justify-center w-16 h-16 rounded-full bg-orange-400 hover:scale-105 hover:bg-black transition-all duration-300"
        >
          <BlogCreate className="w-8 h-8" />
        </Link>
      )}
      <BottomNavbar />
    </>
  );
};

export default MainContent;
