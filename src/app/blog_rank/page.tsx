import BottomNavbar from "@/components/home/BottomNavbar";
import Header from "@/components/home/Header";
import { blogLikeRankApi } from "@/lib/api/blog/blog";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import LikeRankList from "./_components/LikeRankList";

const BlogRank = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["blog_rank"],
    queryFn: blogLikeRankApi,
  });

  return (
    <div>
      <Header />
      <div className="max-w-screen-xl p-4 mx-auto space-y-4 pb-24">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <div className="text-[22px] font-semibold border-b pb-2">
            블로그 공감 랭킹
          </div>
          <LikeRankList />
        </HydrationBoundary>
        <BottomNavbar />
      </div>
    </div>
  );
};

export default BlogRank;
