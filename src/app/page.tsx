import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Suspense } from "react";
import { blogListAction } from "./actions/blog/list-action";
import MainContent from "./blog/_components/MainContent";

const Home = async () => {
  const queryClient = new QueryClient();
  const category = null;
  const page = 1;
  const keyword = null;

  await queryClient.prefetchQuery({
    queryKey: ["blog_list", category, page, keyword],
    queryFn: () => blogListAction(category, page, keyword),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div>Loading...</div>}>
        <MainContent category={category} page={page} keyword={keyword} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default Home;
