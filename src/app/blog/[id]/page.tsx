import { blogDetailAction } from "@/app/actions/blog";
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

  await queryClient.prefetchQuery({
    queryKey: ["blogDetail", id],
    queryFn: () => blogDetailAction(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="max-w-screen-sm h-full py-6 mx-auto px-4">
        <BlogDetail id={id} />
      </div>
    </HydrationBoundary>
  );
};

export default BlogDetailPage;
