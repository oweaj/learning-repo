"use client";

import { Search } from "lucide-react";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchBar = ({ keyword }: { keyword: string | null }) => {
  const [searchData, setSearchData] = useState(keyword || "");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.has("category") || !searchParams.size) {
      setSearchData("");
    }
  }, [searchParams]);

  const handleOnSearch = () => {
    const params = new URLSearchParams();

    if (searchData.trim()) {
      params.set("keyword", searchData.trim());
    }
    params.set("page", "1");
    params.set("limit", "10");

    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2 w-56 border border-gray-400 px-3 py-[6px] rounded-lg order-1 max-md:order-0 max-md:w-full">
      <button
        type="button"
        className="py-1 cursor-pointer"
        onClick={handleOnSearch}
      >
        <Search className="w-[18px] h-[18px] text-gray-500" />
      </button>
      <input
        type="text"
        className="w-full focus:outline-0"
        value={searchData}
        onChange={(e) => setSearchData(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleOnSearch();
          }
        }}
        placeholder="검색어를 입력해주세요"
      />
      {searchData && (
        <button
          type="button"
          className="py-1 cursor-pointer"
          onClick={() => setSearchData("")}
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
