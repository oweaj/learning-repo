import { blogDetailApi } from "@/lib/api/blog/blog";
import type { IBlogDataType } from "@/types/blog.type";
import { useQuery } from "@tanstack/react-query";

export const useBlogDetail = ({ id }: { id: string }) => {
  const data = useQuery<IBlogDataType>({
    queryKey: ["blogDetail", id],
    queryFn: () => blogDetailApi(id),
  });

  return data.data;
};
