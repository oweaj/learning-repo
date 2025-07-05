import { getUserApi } from "@/lib/api/auth/auth";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  const data = useQuery({
    queryKey: ["user"],
    queryFn: getUserApi,
  });

  return data.data?.user;
};
