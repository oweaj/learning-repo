"use client";

import { Search } from "lucide-react";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

const SearchBar = ({
  keyword,
  handleQueryChange,
}: {
  keyword: string | null;
  handleQueryChange: ({ newKeyword }: { newKeyword: string | null }) => void;
}) => {
  const [searchData, setSearchData] = useState(keyword || "");

  useEffect(() => {
    setSearchData(keyword || "");
  }, [keyword]);

  return (
    <div className="flex items-center gap-2 w-56 border border-gray-400 px-3 py-[6px] rounded-lg order-1 max-md:order-0 max-md:w-full">
      <button
        type="button"
        className="py-1 cursor-pointer"
        onClick={() => handleQueryChange({ newKeyword: searchData.trim() })}
      >
        <Search className="w-[18px] h-[18px] text-gray-500" />
      </button>
      <input
        type="text"
        className="w-full focus:outline-0 placeholder:text-sm"
        value={searchData}
        onChange={(e) => setSearchData(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleQueryChange({ newKeyword: searchData.trim() });
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
