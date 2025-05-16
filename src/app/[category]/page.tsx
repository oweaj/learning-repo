import { blogListApi } from "@/api/blog/blog";
import BlogCreate from "@/assets/icons/icon_create.svg";
import NoticeBanner from "@/components/common/NoticeBanner";
import BottomNavbar from "@/components/home/BottomNavbar";
import Header from "@/components/home/Header";
import RankTopTen from "@/components/home/RankTopTen";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import Link from "next/link";
import BlogList from "../blog/_components/BlogList";
import BlogCategory from "./_components/BlogCategory";

const Home = async ({ params }: { params: Promise<{ category: string }> }) => {
  const queryClient = new QueryClient();
  const { category } = await params;
  const currentCategory = Number(category) || 0;

  await queryClient.prefetchQuery({
    queryKey: [
      "blogList",
      { category_id: currentCategory, page: 1, page_size: 10 },
    ],
    queryFn: () =>
      blogListApi({
        category_id: currentCategory,
        page: 1,
        page_size: 10,
      }),
  });

  return (
    <>
      <Header />
      <div className="relative px-4 max-w-screen-xl h-auto mx-auto pb-28">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <main className="space-y-6">
            <NoticeBanner
              subTitle="공지"
              notice="앱 출시 기념 각종 이벤트 진행 예정(공지사항 참고)"
            />
            <RankTopTen />
            <section className="space-y-6">
              <BlogCategory />
              <BlogList category={currentCategory} />
            </section>
          </main>
        </HydrationBoundary>
        <Link
          href={"/blog/create"}
          className="fixed bottom-20 right-4 flex items-center justify-center w-16 h-16 rounded-full bg-orange-400"
        >
          <BlogCreate className="w-8 h-8" />
        </Link>
        <BottomNavbar />
      </div>
    </>
  );
};

export default Home;
