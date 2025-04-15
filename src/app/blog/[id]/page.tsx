import { blogDetailApi } from "@/api/blog/blog";
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
  const idNumber = Number(id);

  await queryClient.prefetchQuery({
    queryKey: ["blogDetail", idNumber],
    queryFn: () => blogDetailApi(idNumber),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="max-w-screen-sm h-full py-6 mx-auto px-4">
        <BlogDetail id={idNumber} />
      </div>
    </HydrationBoundary>
  );
};

export default BlogDetailPage;
