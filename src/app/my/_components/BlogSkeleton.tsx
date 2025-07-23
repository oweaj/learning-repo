import { Skeleton } from "@/components/ui/skeleton";

export const BlogSkeleton = () => {
  return (
    <div className="relative rounded-xl space-y-8">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={`skeleton-${i}`} className="flex gap-10 max-md:gap-4">
          <div className="relative w-[250px] rounded-xl overflow-hidden aspect-square">
            <Skeleton className="w-full h-full" />
          </div>
          <div className="w-3/4 flex flex-col justify-between overflow-hidden py-2">
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-5 w-11/12" />
            <Skeleton className="h-5 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
};
