import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="flex items-center gap-2 w-56 border border-gray-400 px-3 py-[6px] rounded-lg order-1 max-md:order-0 max-md:w-full">
      <Search className="w-[18px] h-[18px] text-gray-500" />
      <input type="text" className="w-full focus:outline-0" />
    </div>
  );
};

export default SearchBar;
