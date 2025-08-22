import { getUserAction } from "@/lib/actions/getUser";
import { myLikeBlogsApi, myblogListApi } from "@/lib/api/my/mypage";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import MyBlogs from "./_components/MyBlogs";
import UserInfo from "./_components/UserInfo";
import UserProfile from "./_components/UserProfile";

const MyPage = async () => {
  const queryClient = new QueryClient();
  const user = await getUserAction();

  await Promise.all([
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
    <div className="w-full space-y-8">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UserProfile user={user} />
        <UserInfo />
        <MyBlogs />
      </HydrationBoundary>
    </div>
  );
};

export default MyPage;
