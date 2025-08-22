import BlogCreate from "@/assets/icons/icon_create.svg";
import BottomNavbar from "@/components/home/BottomNavbar";
import Header from "@/components/home/Header";
import SearchBar from "@/components/home/SearchBar";
import { getUserAction } from "@/lib/actions/getUser";
import { blogListApi } from "@/lib/api/blog/blog";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import Link from "next/link";
import BlogCategory from "./blog/_components/BlogCategory";
import BlogList from "./blog/_components/BlogList";

interface IPropsType {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

const Home = async ({ searchParams }: IPropsType) => {
  const queryClient = new QueryClient();
  const params = await searchParams;
  const category = params.category || null;
  const page = Number(params.page) || 1;
  const userAction = await getUserAction();

  await queryClient.prefetchQuery({
    queryKey: ["blog_list", category, page],
    queryFn: () => blogListApi(category, page),
  });

  return (
    <>
      <Header />
      <div className="relative px-4 max-w-screen-xl h-auto mx-auto pb-24">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <main>
            <section className="space-y-7">
              <div className="flex items-center justify-between max-md:flex-col max-md:items-start max-md:gap-4">
                <BlogCategory />
                <SearchBar />
              </div>
              <BlogList
                category={category}
                page={page}
                userAction={userAction}
              />
            </section>
          </main>
        </HydrationBoundary>
        <Link
          href={"/blog/create"}
          className="fixed bottom-20 right-4 flex items-center justify-center w-16 h-16 rounded-full bg-orange-400 hover:scale-105 hover:bg-black transition-all duration-300"
        >
          <BlogCreate className="w-8 h-8" />
        </Link>
        <BottomNavbar />
      </div>
    </>
  );
};

export default Home;
