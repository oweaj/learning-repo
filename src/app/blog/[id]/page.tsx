import { getUserAction } from "@/lib/actions/getUser";
import { blogDetailApi } from "@/lib/api/blog/blog";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import BlogDetail from "./_components/BlogDetail";

const BlogDetailPage = async ({
  params,
}: { params: Promise<{ id: string }> }) => {
  const queryClient = new QueryClient();
  const { id } = await params;
  const userAction = await getUserAction();

  await queryClient.prefetchQuery({
    queryKey: ["blogDetail", id],
    queryFn: () => blogDetailApi(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="max-w-screen-sm h-full py-6 mx-auto px-4">
        <BlogDetail id={id} userAction={userAction} />
      </div>
    </HydrationBoundary>
  );
};

export default BlogDetailPage;
