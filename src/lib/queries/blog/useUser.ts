import { getUserApi } from "@/lib/api/auth/auth";
import type { IUserDataType } from "@/types/auth.type";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  const data = useQuery<IUserDataType>({
    queryKey: ["user"],
    queryFn: getUserApi,
  });

  return data.data;
};
