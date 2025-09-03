import BlogCreate from "@/assets/icons/icon_create.svg";
import BottomNavbar from "@/components/home/BottomNavbar";

import { blogListApi } from "@/lib/api/blog/blog";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import Link from "next/link";
import MainContent from "./blog/_components/MainContent";

const Home = async () => {
  const queryClient = new QueryClient();
  const category = null;
  const page = 1;
  const keyword = null;

  await queryClient.prefetchQuery({
    queryKey: ["blog_list", category, page, keyword],
    queryFn: () => blogListApi(category, page, keyword),
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MainContent category={category} page={page} keyword={keyword} />
      </HydrationBoundary>
      <Link
        href={"/blog/create"}
        className="fixed bottom-20 right-4 flex items-center justify-center w-16 h-16 rounded-full bg-orange-400 hover:scale-105 hover:bg-black transition-all duration-300"
      >
        <BlogCreate className="w-8 h-8" />
      </Link>
      <BottomNavbar />
    </div>
  );
};

export default Home;
