import { blogDetailApi } from "@/lib/api/blog/blog";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import BlogEdit from "./_components/BlogEdit";

const EditPage = async ({
  searchParams,
}: { searchParams: Promise<{ id: string }> }) => {
  const { id } = await searchParams;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["blogDetail", id],
    queryFn: () => blogDetailApi(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BlogEdit id={id} />
    </HydrationBoundary>
  );
};

export default EditPage;
