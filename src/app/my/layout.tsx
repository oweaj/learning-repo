import BottomNavbar from "@/components/home/BottomNavbar";
import Header from "@/components/home/Header";
import { getUserApi } from "@/lib/api/auth/auth";
import { myLikeBlogsApi, myblogListApi } from "@/lib/api/my/mypage";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import Sidebar from "./_components/Sidebar";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["user"],
      queryFn: getUserApi,
    }),
    queryClient.prefetchQuery({
      queryKey: ["myBlogs"],
      queryFn: myblogListApi,
    }),
    queryClient.prefetchQuery({
      queryKey: ["myLikeBlogs"],
      queryFn: myLikeBlogsApi,
    }),
  ]);

  return (
    <div className="pb-24">
      <Header />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="flex max-w-screen-xl p-4 pb-0 mx-auto">
          <Sidebar />
          {children}
        </div>
      </HydrationBoundary>
      <BottomNavbar />
    </div>
  );
};

export default Layout;
