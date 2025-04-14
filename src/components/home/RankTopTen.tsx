import TopRank from "@/assets/icons/icon_rank.svg";
import { ChevronRight } from "lucide-react";

const RankTopTen = () => {
  return (
    <section>
      <div className="flex gap-1 font-semibold cursor-pointer">
        <TopRank className="w-6 h-6" />
        <span>조회수 TOP 10</span>
        <ChevronRight className="text-gray-700" />
      </div>
      {/* <div>
        <BlogCard title="테스트" main_image="" />
      </div> */}
    </section>
  );
};

export default RankTopTen;
