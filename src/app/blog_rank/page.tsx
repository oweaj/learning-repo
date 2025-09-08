import BottomNavbar from "@/components/home/BottomNavbar";
import Header from "@/components/home/Header";
import LikeRankList from "./_components/LikeRankList";

const BlogRank = async () => {
  return (
    <div>
      <Header />
      <div className="max-w-screen-xl p-4 mx-auto space-y-4 pb-24">
        <div className="text-[22px] font-semibold border-b pb-2">
          블로그 공감 TOP 10
        </div>
        <LikeRankList />
        <BottomNavbar />
      </div>
    </div>
  );
};

export default BlogRank;
